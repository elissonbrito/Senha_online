import { RESTAURANT } from "../config/restaurant";

function onlyDigitsE164(phoneE164: string) {
  // wa.me exige só dígitos (sem +)
  return phoneE164.replace(/[^\d]/g, "");
}

export default function ContactActions() {
  const wa = `https://wa.me/${onlyDigitsE164(RESTAURANT.phoneE164)}?text=${encodeURIComponent(
    RESTAURANT.whatsappDefaultText
  )}`;

  const sms = `sms:${RESTAURANT.phoneE164}?body=${encodeURIComponent(
    RESTAURANT.smsDefaultText
  )}`;

  const tel = `tel:${RESTAURANT.phoneE164}`;

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <a href={wa} target="_blank" rel="noreferrer">
        <button>WhatsApp</button>
      </a>

      <a href={sms}>
        <button>SMS</button>
      </a>

      <a href={tel}>
        <button>Ligar</button>
      </a>
    </div>
  );
}
