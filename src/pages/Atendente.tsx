import { useState, useEffect } from "react";
import { createTicket } from "../services/tickets";
import { subscribeTickets, callNextTicket, markTicketDone } from "../services/queueRealtime";
import type { TicketType } from "../types/queue";

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

  useEffect(() => {
    const unsub = subscribeTickets((list: Ticket[]) => {
      setTickets(list);
      const called = list.find((t) => t.status === "CALLED") ?? null;
      setCurrent(called);
      setLoading(false);
    }, (err) => setError(String(err)));

    return () => unsub?.();
  }, []);

  async function handleCreate() {
    setError("");
    try {
      const ticket = await createTicket({ type, adults, kids });
      setLastCode(ticket.code);
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
          <input type="number" value={adults} min={0} onChange={(e) => setAdults(Number(e.target.value))} />
        </label>
      </div>

      <div>
        <label>
          Crianças:
          <input type="number" value={kids} min={0} onChange={(e) => setKids(Number(e.target.value))} />
        </label>
      </div>

      <button onClick={handleCreate} style={{ marginTop: 12 }}>
        Gerar senha
      </button>

      {lastCode && <p>✅ Última senha: <b>{lastCode}</b></p>}
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
            <button onClick={handleNext} disabled={loading}>Chamar próxima</button>
          </div>
        )}
      </section>

      <section style={{ marginTop: 16 }}>
        <h3>Próximas</h3>
        {loading ? <div>Carregando...</div> : (
          <ul>
            {tickets.map(t => (
              <li key={t.id}>{t.code} {t.status ? `— ${t.status}` : ""}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
