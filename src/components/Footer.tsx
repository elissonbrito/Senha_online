import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[#2A2A2A] bg-[#0B0B0B] py-8">
      <Container>
        <div className="flex flex-col gap-2 text-xs text-[#B5B5B5] md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} <span className="text-white">Toca do Espanhol</span> •
            Parrilla
          </div>
          <div className="text-[#B5B5B5]">
            Feito para ser simples, rápido e intuitivo.
          </div>
        </div>
      </Container>
    </footer>
  );
}
