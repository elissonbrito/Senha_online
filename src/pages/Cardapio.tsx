import { useMemo, useState } from "react";
import Container from "../components/Container";
import Button from "../components/Button";
import { menuItems, type MenuItem } from "../data/menu";

type Category = MenuItem["category"] | "Todos";

export default function Cardapio({ onPrimaryCTA }: { onPrimaryCTA: () => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("Todos");

  const categories: Category[] = ["Todos", "Entradas", "Parrilla", "Guarnições", "Drinks", "Executivos", "Bebidas"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      const matchesCategory = category === "Todos" || item.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <Container>
      <section className="py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Cardápio <span className="text-[#C89B3C]">Parrilla</span>
            </h2>
            <p className="mt-1 text-sm text-[#B5B5B5]">
              Encontre rápido o que você quer — sem poluição visual.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar prato, bebida..."
              className="w-full rounded-xl border border-[#2A2A2A] bg-[#151515] px-4 py-2 text-sm text-white placeholder:text-[#6E6E6E] focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
            />
            <Button variant="secondary" onClick={onPrimaryCTA}>
              Fazer pedido
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-[#9E1B1B] text-white"
                    : "border border-[#2A2A2A] bg-[#151515] text-[#B5B5B5] hover:bg-[#1C1C1C] hover:text-white",
                ].join(" ")}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#2A2A2A] bg-[#151515] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                    {item.highlight ? (
                      <span className="rounded-full border border-[#2A2A2A] bg-[#0B0B0B] px-2 py-0.5 text-xs text-[#C89B3C]">
                        destaque
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-[#B5B5B5]">{item.description}</p>
                  <div className="mt-3 text-xs text-[#6E6E6E]">{item.category}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-semibold text-[#C89B3C]">
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </div>
                  <button className="mt-2 rounded-xl border border-[#2A2A2A] bg-[#0B0B0B] px-3 py-2 text-xs font-semibold text-white hover:bg-[#151515]">
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-[#2A2A2A] bg-[#151515] p-6 text-sm text-[#B5B5B5]">
            Nenhum item encontrado com esses filtros.
          </div>
        ) : null}
      </section>
    </Container>
  );
}
