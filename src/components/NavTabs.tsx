export type Screen = "home" | "cardapio" | "reservas" | "pedidos" | "contato";

type Props = {
  screen: Screen;
  onChange: (s: Screen) => void;
};

export default function NavTabs({ screen, onChange }: Props) {
  const tabs: { id: Screen; label: string }[] = [
    { id: "home", label: "Início" },
    { id: "cardapio", label: "Cardápio" },
    { id: "reservas", label: "Reservas" },
    { id: "pedidos", label: "Pedidos" },
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
