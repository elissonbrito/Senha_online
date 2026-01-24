import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  type Unsubscribe,
} from "firebase/firestore";
import type { Ticket } from "../types/queue";
import { getDayKey } from "../utils/daykey";

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
      const tickets = snap.docs.map((d) => d.data() as Ticket);
      onChange(tickets);
    },
    (err) => onError?.(err)
  );
}
