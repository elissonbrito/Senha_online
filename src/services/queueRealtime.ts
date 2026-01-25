import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  limit,
  type Unsubscribe,
} from "firebase/firestore";
import type { Ticket } from "../types/queue";
import { getDayKey } from "../utils/daykey";

function withIdAndDayKey(doc: any, dayKey: string): Ticket {
  const data = doc.data() as Omit<Ticket, "id" | "dayKey">;
  return {
    id: doc.id,
    dayKey,
    ...data,
  } as Ticket;
}

export function listenWaitingTickets(
  onChange: (tickets: Ticket[]) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const dayKey = getDayKey();

  const q = query(
    collection(db, "days", dayKey, "tickets"),
    where("status", "==", "WAITING"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(
    q,
    (snap) => {
      const tickets = snap.docs.map((d) => withIdAndDayKey(d, dayKey));
      onChange(tickets);
    },
    (err) => onError?.(err)
  );
}

/**
 * Senha atual (última que foi "CALLED")
 * Como você não tem "calledAt", usamos createdAt desc como aproximação.
 * Se quiser perfeito: adicionar calledAt no momento que chamar.
 */
export function listenCurrentTicket(
  onChange: (ticket: Ticket | null) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const dayKey = getDayKey();

  const q = query(
    collection(db, "days", dayKey, "tickets"),
    where("status", "==", "CALLED"),
    orderBy("createdAt", "desc"),
    limit(1)
  );

  return onSnapshot(
    q,
    (snap) => {
      if (snap.empty) return onChange(null);
      onChange(withIdAndDayKey(snap.docs[0], dayKey));
    },
    (err) => onError?.(err)
  );
}

/**
 * Últimas chamadas (histórico): últimos tickets "CALLED"
 */
export function listenLastCalledTickets(
  onChange: (tickets: Ticket[]) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const dayKey = getDayKey();

  const q = query(
    collection(db, "days", dayKey, "tickets"),
    where("status", "==", "CALLED"),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  return onSnapshot(
    q,
    (snap) => {
      const tickets = snap.docs.map((d) => withIdAndDayKey(d, dayKey));
      onChange(tickets);
    },
    (err) => onError?.(err)
  );
}
