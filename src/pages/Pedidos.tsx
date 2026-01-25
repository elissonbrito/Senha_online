import { useState } from "react";
import Container from "../components/Container";
import { createTicket } from "../services/ticketCreate";
import type { TicketType } from "../types/queue";

export default function Pedidos() {
  const [type, setType] = useState<TicketType>("NORMAL");
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>("");

  async function onSubmit() {
    setLoading(true);
    setMsg("");
    try {
      const res = await createTicket({ type, adults, kids });
      setMsg(`Senha criada com sucesso: ${res.code}`);
    } catch (e: any) {
      setMsg(`Erro ao criar senha: ${String(e?.message ?? e)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <section className="py-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Gerar senha
        </h2>
        <p className="mt-1 text-sm text-[#B5B5B5]">
          Cria uma senha e envia para a fila (WAITING).
        </p>

        <div className="mt-6 rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-xs text-[#B5B5B5]">Tipo</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TicketType)}
                className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#0B0B0B] px-3 py-2 text-sm text-white"
              >
                <option value="NORMAL">Normal</option>
                <option value="PRIORITY">Prioridade</option>
                <option value="PICKUP">Retirada</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-[#B5B5B5]">Adultos</label>
              <input
                type="number"
                min={0}
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#0B0B0B] px-3 py-2 text-sm text-white"
              />
            </div>

            <div>
              <label className="text-xs text-[#B5B5B5]">Crianças</label>
              <input
                type="number"
                min={0}
                value={kids}
                onChange={(e) => setKids(Number(e.target.value))}
                className="mt-2 w-full rounded-xl border border-[#2A2A2A] bg-[#0B0B0B] px-3 py-2 text-sm text-white"
              />
            </div>
          </div>

          <button
            disabled={loading}
            onClick={onSubmit}
            className="mt-6 rounded-xl bg-[#9E1B1B] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Gerando..." : "Gerar senha"}
          </button>

          {msg ? (
            <div className="mt-4 rounded-2xl border border-[#2A2A2A] bg-[#0B0B0B] p-4 text-sm text-[#F5F5F5]">
              {msg}
            </div>
          ) : null}
        </div>
      </section>
    </Container>
  );
}
