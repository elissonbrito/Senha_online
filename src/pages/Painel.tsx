import { useEffect, useMemo, useState } from "react";
import type { Ticket } from "../types/queue";
import { listenWaitingTickets } from "../services/queueRealtime";
import { callTicket, callPriorityTicket } from "../services/tickets";

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

  // Separação por tipo (para exibir e também para chamar corretamente)
  const grouped = useMemo(() => {
    return {
      PRIORITY: tickets.filter((t) => t.type === "PRIORITY"),
      NORMAL: tickets.filter((t) => t.type === "NORMAL"),
      PICKUP: tickets.filter((t) => t.type === "PICKUP"),
    };
  }, [tickets]);

  // Regra simples: botão "Chamar próxima" só chama NORMAL/PICKUP (não chama prioridade)
  const nextNormalOrPickup = grouped.NORMAL[0] ?? grouped.PICKUP[0] ?? null;

  // Prioridade só por botão especial (mesa 25/27)
  const nextPriority = grouped.PRIORITY[0] ?? null;

  async function handleCallNext() {
    setError("");
    if (!nextNormalOrPickup) return;

    try {
      await callTicket(nextNormalOrPickup.id);
    } catch (e: any) {
      setError(e?.message ?? "Erro ao chamar senha");
    }
  }

  async function handleCallPriority(table: 25 | 27) {
    setError("");
    if (!nextPriority) return;

    try {
      await callPriorityTicket(nextPriority.id, table);
    } catch (e: any) {
      setError(e?.message ?? "Erro ao chamar prioridade");
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Painel - Fila em tempo real</h2>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      <div style={{ margin: "12px 0", padding: 12, border: "1px solid #ddd" }}>
        <h3>Próxima senha (Normal/Retirada)</h3>

        {nextNormalOrPickup ? (
          <>
            <p style={{ fontSize: 24, margin: 0 }}>
              <b>{nextNormalOrPickup.code}</b> — {nextNormalOrPickup.total} pessoas (
              {nextNormalOrPickup.type})
            </p>

            <button onClick={handleCallNext} style={{ marginTop: 10 }}>
              Chamar próxima
            </button>
          </>
        ) : (
          <p>Fila normal/retirada vazia ✅</p>
        )}

        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #eee" }}>
          <h3>Chamar prioridade (somente quando mesa estiver livre)</h3>

          {nextPriority ? (
            <>
              <p style={{ margin: "6px 0" }}>
                Próxima prioridade: <b>{nextPriority.code}</b> — {nextPriority.total} pessoas
              </p>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => handleCallPriority(25)}>
                  Chamar Prioridade (Mesa 25)
                </button>
                <button onClick={() => handleCallPriority(27)}>
                  Chamar Prioridade (Mesa 27)
                </button>
              </div>
            </>
          ) : (
            <p>Sem prioridade na fila ✅</p>
          )}
        </div>
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
