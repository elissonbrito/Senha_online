import { db } from "./firebase";
import {
  doc,
  runTransaction,
  collection,
} from "firebase/firestore";
import type { TicketType } from "../types/queue";
import { getDayKey } from "../utils/daykey";

function pad3(n: number) {
  return String(n).padStart(3, "0");
}

function makeCode(type: TicketType, n: number) {
  if (type === "PRIORITY") return `P${pad3(n)}`;
  if (type === "PICKUP") return `R${pad3(n)}`; // você usa R010 no comentário
  return `N${pad3(n)}`;
}

export async function createTicket(params: {
  type: TicketType;
  adults: number;
  kids: number;
}) {
  const dayKey = getDayKey();
  const dayRef = doc(db, "days", dayKey);

  // tickets ficam em: days/{dayKey}/tickets
  const ticketsCol = collection(db, "days", dayKey, "tickets");

  const { type, adults, kids } = params;
  const total = adults + kids;

  const created = await runTransaction(db, async (tx) => {
    const daySnap = await tx.get(dayRef);

    const counters = daySnap.exists()
      ? (daySnap.data()?.counters as any) ?? { NORMAL: 0, PRIORITY: 0, PICKUP: 0 }
      : { NORMAL: 0, PRIORITY: 0, PICKUP: 0 };

    const next = (Number(counters[type]) || 0) + 1;

    // atualiza counters no doc days/{dayKey}
    tx.set(
      dayRef,
      {
        dayKey,
        counters: {
          ...counters,
          [type]: next,
        },
      },
      { merge: true }
    );

    const code = makeCode(type, next);

    // cria ticket
    const ticketRef = doc(ticketsCol); // id automático
    tx.set(ticketRef, {
      dayKey,
      type,
      code,
      adults,
      kids,
      total,
      status: "WAITING",
      createdAt: Date.now(),
      // opcional (se quiser no futuro): createdAtServer: serverTimestamp(),
    });

    return { id: ticketRef.id, code };
  });

  return created; // { id, code }
}
