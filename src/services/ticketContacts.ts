import { db } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getDayKey } from "../utils/daykey";

export type ContactChannel = "WHATSAPP" | "SMS";

export async function saveTicketContact(params: {
  ticketId: string;
  phoneE164: string;
  channel: ContactChannel;
  optIn: boolean;
  customerName?: string;
}) {
  const dayKey = getDayKey();
  const ref = doc(db, "days", dayKey, "ticket_contacts", params.ticketId);

  await setDoc(
    ref,
    {
      phoneE164: params.phoneE164,
      channel: params.channel,
      optIn: params.optIn,
      customerName: params.customerName ?? "",
      createdAt: serverTimestamp(),
      notifyState: {
        nearAt: null,
        calledAt: null,
      },
    },
    { merge: true }
  );
}
