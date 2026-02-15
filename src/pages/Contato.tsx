import Container from "../components/Container";
import Button from "../components/Button";
import ContactActions from "../components/ContactActions";

export default function Contato() {
  const phoneDisplay = "(21) 99393-6610";
  const address =
    "Av. Maysa, esquina c/ Rua Newton Estillac (ant 80) - Cordeirinho, Maricá, Rio de Janeiro 24921312";

  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`;

  function openMaps() {
    const q = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${q}`,
      "_blank"
    );
  }

  return (
    <Container>
      <section className="py-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Contato <span className="text-[#C89B3C]">e localização</span>
        </h2>
        <p className="mt-1 text-sm text-[#B5B5B5]">
          O essencial, bem organizado.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* COLUNA INFORMAÇÕES */}
          <div className="rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6">
            <div className="text-sm font-semibold text-white">
              Informações
            </div>

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
                <div className="text-white">
                  Qua–Dom • 11:30 às 17:00
                </div>
              </div>
            </div>

            {/* BOTÕES DE CONTATO */}
            <div className="mt-5">
              <div className="text-xs text-[#6E6E6E] mb-2">
                Fale com a gente
              </div>
              <ContactActions />
            </div>

            <div className="mt-5 flex gap-2">
              <Button onClick={openMaps}>Abrir no Maps</Button>

              <Button
                variant="secondary"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/tocadoespanhol/",
                    "_blank"
                  )
                }
              >
                Instagram
              </Button>
            </div>
          </div>

          {/* COLUNA MAPA */}
          <div className="rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6">
            <div className="text-sm font-semibold text-white">Mapa</div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-[#2A2A2A]">
              <iframe
                src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.812674961346!2d-42.766843728710036!3d-22.95712499372187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99f1dc8fe4dca7%3A0xa150f0d672586581!2sToca%20do%20Espanhol!5e0!3m2!1spt-BR!2sbr!4v1771177700161!5m2!1spt-BR!2sbr"}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <p className="mt-3 text-xs text-[#6E6E6E]">
              Toque no mapa para ampliar no Google Maps.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
