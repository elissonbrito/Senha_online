import Container from "./Container";
import Button from "./Button";
import logo from "../assets/logo.jpeg";

type Props = {
  onPrimaryCTA?: () => void;
};

export default function Topbar({ onPrimaryCTA }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#2A2A2A] bg-[#0B0B0B]/90 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-3">
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

          <Button onClick={onPrimaryCTA}>Pedir Senha</Button>
        </div>
      </Container>
    </header>
  );
}
