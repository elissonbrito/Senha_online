import { db } from "./firebase";
import {
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
  limit,
  getDocs,
  updateDoc,
  serverTimestamp,
  type Unsubscribe,
} from "firebase/firestore";
import type { Ticket } from "../types/queue";
import { getDayKey } from "../utils/daykey";

/**
 * Extrai dayKey do caminho do documento quando vier de collectionGroup:
 * ex: days/2026-01-27/tickets/abc123
 */
function getDayKeyFromRefPath(refPath: string): string | null {
  const parts = refPath.split("/"); // ["days", "2026-01-27", "tickets", "abc123"]
  const idx = parts.indexOf("days");
  if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
  return null;
}

function withIdAndDayKey(d: any): Ticket {
  const data = d.data() as Omit<Ticket, "id" | "dayKey"> & { dayKey?: string };

  // prioridade: campo dayKey no doc > inferir do path > fallback getDayKey()
  const inferred = getDayKeyFromRefPath(d.ref?.path ?? "");
  const dayKey = data.dayKey ?? inferred ?? getDayKey();

  return {
    id: d.id,
    dayKey,
    ...(data as any),
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
      const tickets = snap.docs.map((d) => withIdAndDayKey(d));
      onChange(tickets);
    },
    (err) => onError?.(err)
  );
}

/**
 * Senha atual (última que foi "CALLED")
 * Melhor: usar calledAt desc. Aqui mantemos createdAt desc como fallback.
 */
export function listenCurrentTicket(
  onChange: (ticket: Ticket | null) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const qCalled = query(
    collectionGroup(db, "tickets"),
    where("status", "==", "CALLED"),
    orderBy("createdAt", "desc"),
    limit(1)
  );

  const qCreated = query(
    collectionGroup(db, "tickets"),
    orderBy("createdAt", "desc"),
    limit(1)
  );

  let lastCalledSnap: any = null;
  let lastCreatedSnap: any = null;

  const computeAndEmit = () => {
    try {
      if (lastCalledSnap && !lastCalledSnap.empty) {
        onChange(withIdAndDayKey(lastCalledSnap.docs[0]));
        return;
      }
      if (lastCreatedSnap && !lastCreatedSnap.empty) {
        onChange(withIdAndDayKey(lastCreatedSnap.docs[0]));
        return;
      }
      onChange(null);
    } catch (err) {
      onError?.(err);
    }
  };

  const unsubCalled = onSnapshot(
    qCalled,
    (snap) => {
      lastCalledSnap = snap;
      computeAndEmit();
    },
    (err) => onError?.(err)
  );

  const unsubCreated = onSnapshot(
    qCreated,
    (snap) => {
      lastCreatedSnap = snap;
      computeAndEmit();
    },
    (err) => onError?.(err)
  );

  return () => {
    try {
      unsubCalled?.();
    } catch {}
    try {
      unsubCreated?.();
    } catch {}
  };
}

/**
 * Últimas chamadas (histórico): últimos tickets "CALLED"
 */
export function listenLastCalledTickets(
  onChange: (tickets: Ticket[]) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const q = query(
    collectionGroup(db, "tickets"),
    where("status", "==", "CALLED"),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  return onSnapshot(
    q,
    (snap) => {
      const tickets = snap.docs.map((d) => withIdAndDayKey(d));
      onChange(tickets);
    },
    (err) => onError?.(err)
  );
}

// --- funções auxiliares para a tela de Atendente ---

export function subscribeTickets(
  onChange: (tickets: Ticket[]) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const dayKey = getDayKey();

  const q = query(
    collection(db, "days", dayKey, "tickets"),
    where("status", "in", ["WAITING", "CALLED"]),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(
    q,
    (snap) => {
      const tickets = snap.docs.map((d) => withIdAndDayKey(d));
      onChange(tickets);
    },
    (err) => onError?.(err)
  );
}

export async function callNextTicket(): Promise<Ticket | null> {
  const dayKey = getDayKey();

  const q = query(
    collection(db, "days", dayKey, "tickets"),
    where("status", "==", "WAITING"),
    orderBy("createdAt", "asc"),
    limit(1)
  );

  const snap = await getDocs(q);
  if (snap.empty) return null;

  const d = snap.docs[0];
  await updateDoc(d.ref, { status: "CALLED", calledAt: serverTimestamp() });

  // importante: devolve o ticket já com status atualizado localmente
  return { ...withIdAndDayKey(d), status: "CALLED" } as Ticket;
}

/**
 * ✅ CORREÇÃO PRINCIPAL:
 * Não use collectionGroup + documentId para concluir.
 * Atualize direto no caminho do dia atual.
 */
export async function markTicketDone(ticketId: string): Promise<void> {
  const dayKey = getDayKey();
  const ref = doc(db, "days", dayKey, "tickets", ticketId);
  await updateDoc(ref, { status: "DONE", finishedAt: serverTimestamp() });
}
