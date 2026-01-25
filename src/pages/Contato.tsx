import Container from "../components/Container";
import Button from "../components/Button";

export default function Contato() {
  const phoneDisplay = "(21) 99393-6610";
  const address = "Av. Maysa, esquina c/ Rua Newton Estillac (ant 80) - Cordeirinho, Maricá, Rio de Janeiro 24921312";

  function openMaps() {
    const q = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank");
  }

  return (
    <Container>
      <section className="py-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Contato <span className="text-[#C89B3C]">e localização</span>
        </h2>
        <p className="mt-1 text-sm text-[#B5B5B5]">O essencial, bem organizado.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6">
            <div className="text-sm font-semibold text-white">Informações</div>

            <div className="mt-4 space-y-3 text-sm text-[#B5B5B5]">
              <div>
                <div className="text-xs text-[#6E6E6E]">Endereço</div>
                <div className="text-white">{address}</div>
              </div>

              <div>
                <div className="text-xs text-[#6E6E6E]">WhatsApp</div>
                <div className="text-white">{phoneDisplay}</div>
              </div>

              <div>
                <div className="text-xs text-[#6E6E6E]">Horário</div>
                <div className="text-white">Qua–Dom • 11:30 horas às 17:00 horas</div>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <Button onClick={openMaps}>Abrir no Maps</Button>
              <Button
                variant="secondary"
                onClick={() => window.open("hhttps://www.instagram.com/tocadoespanhol/", "_blank")}
              >
                Instagram
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6">
            <div className="text-sm font-semibold text-white">Mapa</div>
            <p className="mt-2 text-sm text-[#B5B5B5]">
              Você pode substituir esse bloco por um iframe do Google Maps (fica lindo, mas mantém
              leve).
            </p>

            <div className="mt-4 rounded-2xl border border-[#2A2A2A] bg-[#0B0B0B] p-6 text-xs text-[#6E6E6E]">
              Placeholder do mapa (iframe ou imagem).
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
