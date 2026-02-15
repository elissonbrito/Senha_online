import Container from "../components/Container";
import Button from "../components/Button";

// ✅ imports diretos das imagens (mais estável no Vite)
import fachada from "../assets/restaurant/fachada.png";
import salao from "../assets/restaurant/salao.png";
import parrilla from "../assets/restaurant/parrilla.png";
import prato1 from "../assets/restaurant/prato1.png";
import prato2 from "../assets/restaurant/prato2.png";
import equipe from "../assets/restaurant/equipe.png";

type Props = {
  onGoCardapio: () => void;
  onGoReservas: () => void;
};

export default function Home({ onGoCardapio, onGoReservas }: Props) {
  const photos = [
    { src: fachada, alt: "Fachada da Toca do Espanhol" },
    { src: salao, alt: "Salão do restaurante" },
    { src: parrilla, alt: "Parrilla" },
    { src: prato1, alt: "Prato da casa" },
    { src: prato2, alt: "Prato da casa" },
    { src: equipe, alt: "Equipe / família" },
  ];

  return (
    <Container>
      <section className="py-8">
        {/* HERO */}
        <div className="rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#0B0B0B] px-3 py-1 text-xs text-[#B5B5B5]">
            <span className="h-2 w-2 rounded-full bg-[#C89B3C]" />
            Identidade Parrilla • Clássico • Direto
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Toca do Espanhol <span className="text-[#C89B3C]">Parrilla</span>
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#B5B5B5]">
            Mais que um restaurante desde 2002, a Toca do Espanhol é uma casa de família onde sabor,
            fartura e atendimento acolhedor caminham juntos.
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button onClick={onGoReservas}>Reservar mesa</Button>
            <Button variant="secondary" onClick={onGoCardapio}>
              Ver cardápio
            </Button>
          </div>
        </div>

        {/* GALERIA */}
        <div className="mt-6">
          <div className="mb-3 flex items-end justify-between">
            <div className="text-sm font-semibold text-white">
              Um pouco da <span className="text-[#C89B3C]">Toca</span>
            </div>
            <div className="text-xs text-[#6E6E6E]">Ambiente • Parrilla • Pratos</div>
          </div>

          <div className="grid gap-3 md:grid-cols-12">
            {/* Foto grande */}
            <div className="md:col-span-7">
              <div className="overflow-hidden rounded-3xl border border-[#2A2A2A] bg-[#0B0B0B]">
                <img
                  src={photos[0].src}
                  alt={photos[0].alt}
                  className="h-[280px] w-full object-cover md:h-[380px]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Fotos menores */}
            <div className="md:col-span-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {photos.slice(1, 5).map((p) => (
                  <div
                    key={p.src}
                    className="overflow-hidden rounded-3xl border border-[#2A2A2A] bg-[#0B0B0B]"
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      className="h-[160px] w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Foto extra */}
          <div className="mt-3 overflow-hidden rounded-3xl border border-[#2A2A2A] bg-[#0B0B0B]">
            <img
              src={photos[5].src}
              alt={photos[5].alt}
              className="h-[200px] w-full object-cover md:h-[240px]"
              loading="lazy"
            />
          </div>
        </div>

        {/* HISTÓRIA RECENTE + CARDS */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-[#2A2A2A] bg-[#151515] p-5 md:col-span-2">
            <div className="text-sm font-semibold text-white">Nossa história recente</div>

            <div className="mt-3 space-y-4 text-sm leading-relaxed text-[#B5B5B5]">
              <p>
                Fundada em 2002, a Toca do Espanhol nasceu com um propósito simples e verdadeiro:
                oferecer mais do que uma refeição. Sob a liderança de José Carlos, carinhosamente
                conhecido como Espanhol, e sua esposa Geanne, o restaurante construiu sua trajetória
                com dedicação, trabalho familiar e amor pelo que faz.
              </p>

              <p>
                Ao longo dos anos, a Toca se tornou um espaço onde cada cliente é recebido como parte
                da casa. Aqui, comer bem significa fartura, qualidade e sabor marcante — sempre
                acompanhado de uma boa música e de um atendimento que faz você querer voltar.
              </p>

              <p>
                Hoje, o restaurante conta com ambiente climatizado, carnes selecionadas, pratos
                generosos e uma gestão familiar conduzida pela família Santaballa. A matriarca segue
                presente no dia a dia, garantindo o padrão de qualidade e o cuidado com cada detalhe.
                As filhas do casal também participam ativamente do atendimento, trazendo simpatia,
                alegria e um toque pessoal que faz toda a diferença.
              </p>

              <p>
                Mais do que tradição, a Toca do Espanhol é uma experiência construída em família — e
                compartilhada com todos que passam por aqui.
              </p>
            </div>

            <div className="mt-3 text-xs text-[#6E6E6E]">
              * Se quiser, a gente ajusta esse texto para ficar 100% com a sua voz.
            </div>
          </div>

          <div className="rounded-2xl border border-[#2A2A2A] bg-[#151515] p-5">
            <div className="text-sm font-semibold text-white">Horários</div>
            <p className="mt-2 text-sm text-[#B5B5B5]">
              Qua–Dom • 11:30 às 17:00 <br />
              <span className="text-xs text-[#6E6E6E]">(ajuste se mudar)</span>
            </p>
          </div>

          <div className="rounded-2xl border border-[#2A2A2A] bg-[#151515] p-5">
            <div className="text-sm font-semibold text-white">Destaques</div>
            <p className="mt-2 text-sm text-[#B5B5B5]">
              Carnes selecionadas • Pratos fartos • Atendimento de família
            </p>
          </div>

          <div className="rounded-2xl border border-[#2A2A2A] bg-[#151515] p-5">
            <div className="text-sm font-semibold text-white">Localização</div>
            <p className="mt-2 text-sm text-[#B5B5B5]">
              Cordeirinho, Maricá • mapa na tela de Contato.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
