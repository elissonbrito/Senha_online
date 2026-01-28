import React, { useMemo, useState } from "react";
import Topbar from "./components/Topbar";
import Acompanhamento from "./pages/Acompanhamento";
import Pedidos from "./pages/Pedidos";
import Atendente from "./pages/Atendente";
type Screen = "home" | "painel" | "contato" | "pedidos" | "atendente";

function NavTabs({
  screen,
  onChange,
}: {
  screen: Screen;
  onChange: (s: Screen) => void;
}) {
  const tabs: { id: Screen; label: string }[] = [
    { id: "home", label: "Início" },
    { id: "painel", label: "Acompanhamento" },
    { id: "atendente", label: "Atendente" },
    { id: "contato", label: "Contato" },
  ];

  return (
    <div className="border-b border-[#2A2A2A] bg-[#0B0B0B]">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => {
            const active = t.id === screen;
            return (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-[#9E1B1B] text-white"
                    : "border border-[#2A2A2A] bg-[#151515] text-[#B5B5B5] hover:bg-[#1C1C1C] hover:text-white",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-5xl px-4">{children}</div>;
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6">
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm text-[#B5B5B5]">{children}</div>
    </div>
  );
}

function Home({ goPainel }: { goPainel: () => void }) {
  return (
    <Container>
      <section className="py-8">
        <div className="rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#0B0B0B] px-3 py-1 text-xs text-[#B5B5B5]">
            <span className="h-2 w-2 rounded-full bg-[#C89B3C]" />
            Minimalista • Parrilla • Direto
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Acompanhamento do Cliente
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-[#B5B5B5]">
            Estrutura pronta para acompanhar pedidos/senhas de forma simples e objetiva.
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={goPainel}
              className="rounded-xl bg-[#9E1B1B] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Ir para Acompanhamento
            </button>
            <button className="rounded-xl border border-[#2A2A2A] bg-[#0B0B0B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1C1C1C]">
              Ver instruções
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card title="Rápido">
            Cliente encontra a senha/pedido sem navegar em mil telas.
          </Card>
          <Card title="Minimalista">
            Identidade escura + vermelho parrilla + dourado discreto.
          </Card>
          <Card title="Pronto pra evoluir">
            Depois dá para ligar em Firebase/DB e mostrar status em tempo real.
          </Card>
        </div>
      </section>
    </Container>
  );
}

function Contato() {
  return (
    <Container>
      <section className="py-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Contato <span className="text-[#C89B3C]">e apoio</span>
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6">
            <div className="text-sm font-semibold text-white">Informações</div>
            <div className="mt-3 space-y-2 text-sm text-[#B5B5B5]">
              <div>📍 Maricá/RJ</div>
              <div>📱 WhatsApp: (colocar número)</div>
              <div>🕒 Horário: (colocar horário)</div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6">
            <div className="text-sm font-semibold text-white">Mapa</div>
            <div className="mt-3 rounded-2xl border border-[#2A2A2A] bg-[#0B0B0B] p-6 text-xs text-[#B5B5B5]">
              Placeholder do mapa
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const page = useMemo(() => {
    if (screen === "home") return <Home goPainel={() => setScreen("painel")} />;
    if (screen === "painel") return <Acompanhamento />;
    if (screen === "atendente") return <Atendente />;
    if (screen === "pedidos") return <Pedidos />;
    return <Contato />;
  }, [screen]);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5]">
      {/* ✅ Usa o Topbar do components */}
      <Topbar onPrimaryCTA={() => setScreen("pedidos")} />

      <NavTabs screen={screen} onChange={setScreen} />

      {page}

      <footer className="border-t border-[#2A2A2A] py-8">
        <div className="mx-auto max-w-5xl px-4 text-xs text-[#B5B5B5]">
          © {new Date().getFullYear()} Toca do Espanhol • Parrilla
        </div>
      </footer>
    </div>
  );
}
