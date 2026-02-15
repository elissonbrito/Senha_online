import { useState, useEffect } from "react";
import { createTicket } from "../services/tickets";
import { subscribeTickets, callNextTicket, markTicketDone } from "../services/queueRealtime";
import type { TicketType } from "../types/queue";
import { saveTicketContact } from "../services/ticketContacts";

type Ticket = {
  id: string;
  code: string;
  type?: string;
  adults?: number;
  kids?: number;
  total?: number;
  status?: string;
  createdAt?: number;
  dayKey?: string;
};

export default function Atendente() {
  const [type, setType] = useState<TicketType>("NORMAL");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [lastCode, setLastCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [current, setCurrent] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  // NOVO: dados de contato (opcional)
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [channel, setChannel] = useState<"WHATSAPP" | "SMS">("WHATSAPP");

  useEffect(() => {
    const unsub = subscribeTickets(
      (list: Ticket[]) => {
        setTickets(list);
        const called = list.find((t) => t.status === "CALLED") ?? null;
        setCurrent(called);
        setLoading(false);
      },
      (err) => setError(String(err))
    );

    return () => unsub?.();
  }, []);

  async function handleCreate() {
    setError("");

    // validação mínima
    if (optIn && !phone.trim()) {
      setError("Informe o telefone para receber notificações.");
      return;
    }

    try {
      const ticket = await createTicket({ type, adults, kids });

      setLastCode(ticket.code);

      // salva contato APENAS se o cliente optou por receber
      if (optIn && phone.trim()) {
        await saveTicketContact({
          ticketId: ticket.id,
          phoneE164: phone.trim(), // depois a gente normaliza E.164 certinho
          channel,
          optIn,
          customerName: customerName.trim() || undefined,
        });
      }

      // limpa campos de contato (opcional)
      setCustomerName("");
      setPhone("");
      setOptIn(false);
      setChannel("WHATSAPP");
    } catch (e: any) {
      setError(e?.message ?? "Erro ao criar senha");
    }
  }

  async function handleNext() {
    setError("");
    setLoading(true);
    try {
      const called = await callNextTicket();
      if (called) setCurrent(called);
    } catch (e: any) {
      setError(e?.message ?? "Erro ao chamar próxima");
    } finally {
      setLoading(false);
    }
  }

  async function handleDone() {
    if (!current) return;
    try {
      await markTicketDone(current.id);
      setCurrent(null);
    } catch (e: any) {
      setError(e?.message ?? "Erro ao concluir atendimento");
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Atendente - Gerar Senha</h2>

      <label>
        Tipo:
        <select value={type} onChange={(e) => setType(e.target.value as TicketType)}>
          <option value="NORMAL">Normal</option>
          <option value="PRIORITY">Prioridade</option>
          <option value="PICKUP">Retirada</option>
        </select>
      </label>

      <div>
        <label>
          Adultos:
          <input
            type="number"
            value={adults}
            min={0}
            onChange={(e) => setAdults(Number(e.target.value))}
          />
        </label>
      </div>

      <div>
        <label>
          Crianças:
          <input
            type="number"
            value={kids}
            min={0}
            onChange={(e) => setKids(Number(e.target.value))}
          />
        </label>
      </div>

      <hr style={{ margin: "16px 0" }} />

      <h3 style={{ marginBottom: 8 }}>Contato do cliente (opcional)</h3>

      <div style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <label>
          Nome (opcional):
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Ex.: João"
          />
        </label>

        <label>
          Telefone (WhatsApp/SMS):
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ex.: +5521999999999 ou 21999999999"
            disabled={!optIn}
          />
        </label>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={optIn}
            onChange={(e) => setOptIn(e.target.checked)}
          />
          Aceita receber mensagem quando a vez estiver chegando
        </label>

        <label>
          Canal:
          <select value={channel} onChange={(e) => setChannel(e.target.value as any)} disabled={!optIn}>
            <option value="WHATSAPP">WhatsApp</option>
            <option value="SMS">SMS</option>
          </select>
        </label>
      </div>

      <button onClick={handleCreate} style={{ marginTop: 12 }}>
        Gerar senha
      </button>

      {lastCode && (
        <p>
          ✅ Última senha: <b>{lastCode}</b>
        </p>
      )}
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      <hr style={{ margin: "16px 0" }} />

      <section>
        <h3>Atendimento atual</h3>
        {current ? (
          <div>
            <div style={{ fontSize: 48 }}>{current.code}</div>
            <button onClick={handleDone}>Concluir</button>
          </div>
        ) : (
          <div>
            <div>Nenhuma senha em atendimento</div>
            <button onClick={handleNext} disabled={loading}>
              Chamar próxima
            </button>
          </div>
        )}
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Próximas</h3>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <ul>
            {tickets.map((t) => (
              <li key={t.id}>
                {t.code} {t.status ? `— ${t.status}` : ""}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
