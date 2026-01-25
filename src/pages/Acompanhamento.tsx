import { useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import type { Ticket } from "../types/queue";
import { listenCurrentTicket, listenLastCalledTickets } from "../services/queueRealtime";

export default function Acompanhamento() {
  const [current, setCurrent] = useState<Ticket | null>(null);
  const [lastCalled, setLastCalled] = useState<Ticket[]>([]);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const searchNormalized = useMemo(() => normalizeCode(search), [search]);

  useEffect(() => {
    const unsubCurrent = listenCurrentTicket(
      (t) => setCurrent(t),
      (err) => setError(String(err))
    );

    const unsubLast = listenLastCalledTickets(
      (list) => setLastCalled(list),
      (err) => setError(String(err))
    );

    return () => {
      unsubCurrent?.();
      unsubLast?.();
    };
  }, []);

  const searchedInHistory = useMemo(() => {
    if (!searchNormalized) return null;
    return lastCalled.find((t) => normalizeCode(t.code) === searchNormalized) ?? null;
  }, [searchNormalized, lastCalled]);

  return (
    <Container>
      <section className="py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Acompanhamento <span className="text-[#C89B3C]">ao vivo</span>
            </h2>
            <p className="mt-1 text-sm text-[#B5B5B5]">
              Veja a senha atual e as últimas chamadas.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-[380px]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar sua senha (ex: N001, P003, R010)"
              className="rounded-xl border border-[#2A2A2A] bg-[#151515] px-4 py-2 text-sm text-white placeholder:text-[#6E6E6E] focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
            />
            {searchNormalized ? (
              <div className="text-xs text-[#B5B5B5]">
                {searchedInHistory
                  ? `Sua senha apareceu nas últimas chamadas: ${searchedInHistory.code}`
                  : "Ainda não apareceu no histórico de chamadas."}
              </div>
            ) : null}
          </div>
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-[#2A2A2A] bg-[#151515] p-4 text-sm text-red-200">
            Erro: {error}
          </div>
        ) : null}

        {/* Senha atual */}
        <div className="mt-6 rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6">
          <div className="text-sm font-semibold text-white">Senha atual</div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="text-5xl font-bold tracking-tight text-white">
              {current ? current.code : "—"}
            </div>

            <div className="text-sm text-[#B5B5B5]">
              {current ? (
                <>
                  Tipo: <span className="text-white">{current.type}</span> • Pessoas:{" "}
                  <span className="text-white">{current.total}</span>
                </>
              ) : (
                "Aguardando uma chamada..."
              )}
            </div>

            <div className="text-xs text-[#6E6E6E]">
              {current ? `Gerada em: ${new Date(current.createdAt).toLocaleString()}` : ""}
            </div>
          </div>
        </div>

        {/* Últimas chamadas */}
        <div className="mt-6 rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-white">Últimas chamadas</div>
            <span className="text-xs text-[#6E6E6E]">últimas {lastCalled.length}</span>
          </div>

          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {lastCalled.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-2xl border border-[#2A2A2A] bg-[#0B0B0B] p-4"
              >
                <div>
                  <div className="text-sm font-semibold text-white">{t.code}</div>
                  <div className="text-xs text-[#B5B5B5]">
                    {t.type} • Total: {t.total} ({t.adults}A / {t.kids}C)
                  </div>
                </div>
                <div className="text-xs text-[#6E6E6E]">
                  {new Date(t.createdAt).toLocaleTimeString()}
                </div>
              </div>
            ))}

            {lastCalled.length === 0 ? (
              <div className="rounded-2xl border border-[#2A2A2A] bg-[#0B0B0B] p-4 text-sm text-[#B5B5B5]">
                Sem chamadas ainda.
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </Container>
  );
}

function normalizeCode(v: string) {
  return v.trim().toUpperCase();
}
