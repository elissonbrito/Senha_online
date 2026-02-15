import Container from "./Container";
import Button from "./Button";
import logo from "../assets/logo.jpeg";
import ContactActions from "../components/ContactActions";

type Screen = "home" | "painel" | "pedidos" | "atendente" | "contato" | "cardapio";
type Props = {
  onPrimaryCTA?: () => void;
  onNavigate?: (screen: Screen) => void;
};

export default function Topbar({ onPrimaryCTA, onNavigate }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#2A2A2A] bg-[#0B0B0B]/90 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between gap-3 py-3">
          {/* Logo + Nome */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo Toca do Espanhol"
              className="h-10 w-10 rounded-xl border border-[#2A2A2A] bg-[#151515] object-contain p-1"
            />

            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-[#F5F5F5]">
                Toca do Espanhol
              </div>
              <div className="text-xs text-[#B5B5B5]">
                Parrilla • Desde <span className="text-[#C89B3C]">2002</span>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2">
            <Button onClick={() => onNavigate?.("cardapio")}>Cardápio</Button>
            <Button onClick={() => onNavigate?.("contato")}>Contato</Button>
            <Button onClick={() => onNavigate?.("painel")}>Painel</Button>
            <Button onClick={onPrimaryCTA} disabled={!onPrimaryCTA}>
              Pedir Senha
            </Button>
          </div>
        </div>

        {/* Se você quiser os botões de contato no topo SEM virar "página":
            pode deixar o ContactActions aqui, discreto, ou só na tela Contato */}
        {/* <div className="pb-3">
          <ContactActions />
        </div> */}
      </Container>
    </header>
  );
}
