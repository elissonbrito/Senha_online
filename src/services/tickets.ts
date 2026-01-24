import { db } from "./firebase";
import { doc, getDoc, runTransaction, collection } from "firebase/firestore";
import type { TicketType, Ticket } from "../types/queue";
import { getDayKey, formatTicketCode } from "../utils/dayKey";

const MAX_PRIORITY_SIZE = 6;

function assertNonNegativeInt(value: number, label: string) {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${label} deve ser um inteiro >= 0`);
  }
}

export async function createTicket(params: {
  type: TicketType;
  adults: number;
  kids: number;
}): Promise<Ticket> {
  const { type, adults, kids } = params;

  assertNonNegativeInt(adults, "adultos");
  assertNonNegativeInt(kids, "criancas");

  const total = adults + kids;
  if (total <= 0) throw new Error("Informe pelo menos 1 pessoa.");

  if (type === "PRIORITY" && total > MAX_PRIORITY_SIZE) {
    throw new Error(`Prioridade permite no máximo ${MAX_PRIORITY_SIZE} pessoas (incluindo crianças).`);
  }

  const dayKey = getDayKey();
  const dayRef = doc(db, "days", dayKey);

  // Transaction garante que dois atendentes não gerem o mesmo N001 ao mesmo tempo
  const result = await runTransaction(db, async (tx) => {
    const daySnap = await tx.get(dayRef);

    const counters = daySnap.exists()
      ? (daySnap.data().counters as Record<TicketType, number>)
      : { NORMAL: 0, PRIORITY: 0, PICKUP: 0 };

    const nextCounter = (counters[type] ?? 0) + 1;
    const code = formatTicketCode(type, nextCounter);

    // atualiza o contador do dia
    const newCounters = { ...counters, [type]: nextCounter };
    if (!daySnap.exists()) {
      tx.set(dayRef, { dayKey, counters: newCounters, createdAt: Date.now() });
    } else {
      tx.update(dayRef, { counters: newCounters });
    }

    // cria a senha (ticket)
    const ticketRef = doc(collection(db, "days", dayKey, "tickets")); // id auto
    const ticket: Ticket = {
      id: ticketRef.id,
      dayKey,
      type,
      code,
      adults,
      kids,
      total,
      status: "WAITING",
      createdAt: Date.now(),
    };

    tx.set(ticketRef, ticket);

    return ticket;
  });

  return result;
}
