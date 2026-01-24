import { useEffect, useMemo, useState } from "react";
import type { Ticket } from "../types/queue";
import { listenWaitingTickets } from "../services/queueRealtime";
import { callTicket } from "../services/tickets";

export default function Painel() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const unsub = listenWaitingTickets(
      (list) => setTickets(list),
      (err) => setError(String(err))
    );
    return () => unsub();
  }, []);

  const nextTicket = tickets[0];

  const grouped = useMemo(() => {
    return {
      PRIORITY: tickets.filter((t) => t.type === "PRIORITY"),
      NORMAL: tickets.filter((t) => t.type === "NORMAL"),
      PICKUP: tickets.filter((t) => t.type === "PICKUP"),
    };
  }, [tickets]);

  async function handleCallNext() {
    setError("");
    if (!nextTicket) return;
    try {
      await callTicket(nextTicket.id);
    } catch (e: any) {
      setError(e?.message ?? "Erro ao chamar senha");
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Painel - Fila em tempo real</h2>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      <div style={{ margin: "12px 0", padding: 12, border: "1px solid #ddd" }}>
        <h3>Próxima senha</h3>
        {nextTicket ? (
          <>
            <p style={{ fontSize: 24, margin: 0 }}>
              <b>{nextTicket.code}</b> — {nextTicket.total} pessoas ({nextTicket.type})
            </p>
            <button onClick={handleCallNext} style={{ marginTop: 10 }}>
              Chamar próxima
            </button>
          </>
        ) : (
          <p>Fila vazia ✅</p>
        )}
      </div>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(3, 1fr)" }}>
        <Column title="Prioridade" items={grouped.PRIORITY} />
        <Column title="Normal" items={grouped.NORMAL} />
        <Column title="Retirada" items={grouped.PICKUP} />
      </div>
    </div>
  );
}

function Column({ title, items }: { title: string; items: Ticket[] }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 12 }}>
      <h3 style={{ marginTop: 0 }}>
        {title} ({items.length})
      </h3>
      {items.length === 0 ? (
        <p>—</p>
      ) : (
        <ol>
          {items.map((t) => (
            <li key={t.id}>
              <b>{t.code}</b> — {t.total} pessoas
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
