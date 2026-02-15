import { db } from "./firebase";
import { doc, onSnapshot, type Unsubscribe } from "firebase/firestore";
import { getDayKey } from "../utils/daykey";

export function listenPriorityTables(
  onChange: (tables: { "25": string | null; "27": string | null }) => void,
  onError?: (err: unknown) => void
): Unsubscribe {
  const dayKey = getDayKey();
  const ref = doc(db, "days", dayKey);

  return onSnapshot(
    ref,
    (snap) => {
      const data = snap.exists() ? snap.data() : {};
      const tables = (data?.priorityTables ?? {}) as Record<string, string | null>;
      onChange({
        "25": tables["25"] ?? null,
        "27": tables["27"] ?? null,
      });
    },
    (err) => onError?.(err)
  );
}
