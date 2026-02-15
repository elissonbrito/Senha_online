import React, { useMemo, useState } from "react";
import Topbar from "./components/Topbar";
import Acompanhamento from "./pages/Acompanhamento";
import Pedidos from "./pages/Pedidos";
import Atendente from "./pages/Atendente";
import ContatoPage from "./pages/Contato";
import Cardapio from "./pages/Cardapio";
import HomePage from "./pages/Home";

type Screen = "home" | "painel" | "pedidos" | "atendente" | "contato" | "cardapio";

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
    { id: "cardapio", label: "Cardápio" },
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

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");

  const page = useMemo(() => {
    if (screen === "home") {
      return (
        <HomePage
          onGoCardapio={() => setScreen("cardapio")}
          onGoReservas={() => setScreen("contato")}
        />
      );
    }
    if (screen === "painel") return <Acompanhamento />;
    if (screen === "atendente") return <Atendente />;
    if (screen === "pedidos") return <Pedidos />;
    if (screen === "cardapio") return <Cardapio />;
    if (screen === "contato") return <ContatoPage />;

    return (
      <HomePage
        onGoCardapio={() => setScreen("cardapio")}
        onGoReservas={() => setScreen("contato")}
      />
    );
  }, [screen]);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5]">
      <Topbar onPrimaryCTA={() => setScreen("pedidos")} onNavigate={(s) => setScreen(s)} />

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
