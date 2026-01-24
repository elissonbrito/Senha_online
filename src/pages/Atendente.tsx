import { useState } from "react";
import { createTicket } from "../services/tickets";
import type { TicketType } from "../types/queue";

export default function Atendente() {
  const [type, setType] = useState<TicketType>("NORMAL");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [lastCode, setLastCode] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function handleCreate() {
    setError("");
    try {
      const ticket = await createTicket({ type, adults, kids });
      setLastCode(ticket.code);
    } catch (e: any) {
      setError(e?.message ?? "Erro ao criar senha");
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
    </div>
  );
}
