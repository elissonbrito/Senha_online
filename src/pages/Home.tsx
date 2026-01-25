import Container from "../components/Container";
import Button from "../components/Button";

export default function Home({
  onGoCardapio,
  onGoReservas,
}: {
  onGoCardapio: () => void;
  onGoReservas: () => void;
}) {
  return (
    <Container>
      <section className="py-8">
        <div className="rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#0B0B0B] px-3 py-1 text-xs text-[#B5B5B5]">
            <span className="h-2 w-2 rounded-full bg-[#C89B3C]" />
            Identidade Parrilla • Clássico • Direto
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Toca do Espanhol <span className="text-[#C89B3C]">Parrilla</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#B5B5B5]">
            Um site minimalista, pensado para o cliente decidir rápido: ver cardápio, reservar ou
            pedir no delivery.
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button onClick={onGoReservas}>Reservar mesa</Button>
            <Button variant="secondary" onClick={onGoCardapio}>
              Ver cardápio
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#2A2A2A] bg-[#151515] p-5">
            <div className="text-sm font-semibold text-white">Destaques</div>
            <p className="mt-2 text-sm text-[#B5B5B5]">
              Use poucos itens aqui (3 no máximo). Isso mantém o layout premium.
            </p>
          </div>

          <div className="rounded-2xl border border-[#2A2A2A] bg-[#151515] p-5">
            <div className="text-sm font-semibold text-white">Horários</div>
            <p className="mt-2 text-sm text-[#B5B5B5]">
              Ter–Dom • 18h–23h <br />
              <span className="text-xs">(ajuste conforme o real)</span>
            </p>
          </div>

          <div className="rounded-2xl border border-[#2A2A2A] bg-[#151515] p-5">
            <div className="text-sm font-semibold text-white">Localização</div>
            <p className="mt-2 text-sm text-[#B5B5B5]">
              Maricá • endereço e mapa na tela de Contato.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
