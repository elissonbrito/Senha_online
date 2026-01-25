import { useState } from "react";
import Container from "../components/Container";
import Button from "../components/Button";

export default function Reservas() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(2);
  const [name, setName] = useState("");
  const [whats, setWhats] = useState("");

  function handleSubmit() {
    // Aqui você pode ligar num backend depois.
    // Por enquanto: abre WhatsApp com mensagem pronta (troque o número).
    const phone = "5521999999999"; // <-- TROQUE AQUI (DDI+DDD+numero, sem símbolos)
    const msg = `Olá! Gostaria de reservar uma mesa na Toca do Espanhol.%0A
Nome: ${encodeURIComponent(name || "—")}%0A
Data: ${encodeURIComponent(date || "—")}  Horário: ${encodeURIComponent(time || "—")}%0A
Pessoas: ${encodeURIComponent(String(people))}%0A
WhatsApp: ${encodeURIComponent(whats || "—")}`;
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  }

  return (
    <Container>
      <section className="py-8">
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Reservas <span className="text-[#C89B3C]">rápidas</span>
        </h2>
        <p className="mt-1 text-sm text-[#B5B5B5]">
          Preencha o essencial e envie direto para o WhatsApp.
        </p>

        <div className="mt-6 rounded-3xl border border-[#2A2A2A] bg-[#151515] p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="text-[#B5B5B5]">Nome</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border border-[#2A2A2A] bg-[#0B0B0B] px-3 py-2 text-white placeholder:text-[#6E6E6E] focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
                placeholder="Seu nome"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-[#B5B5B5]">WhatsApp</span>
              <input
                value={whats}
                onChange={(e) => setWhats(e.target.value)}
                className="rounded-xl border border-[#2A2A2A] bg-[#0B0B0B] px-3 py-2 text-white placeholder:text-[#6E6E6E] focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
                placeholder="(21) 9xxxx-xxxx"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-[#B5B5B5]">Data</span>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border border-[#2A2A2A] bg-[#0B0B0B] px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
                type="date"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-[#B5B5B5]">Horário</span>
              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="rounded-xl border border-[#2A2A2A] bg-[#0B0B0B] px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
                type="time"
              />
            </label>

            <label className="grid gap-2 text-sm md:col-span-2">
              <span className="text-[#B5B5B5]">Quantidade de pessoas</span>
              <input
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                className="rounded-xl border border-[#2A2A2A] bg-[#0B0B0B] px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
                type="number"
                min={1}
              />
            </label>
          </div>

          <div className="mt-5">
            <Button full onClick={handleSubmit}>
              Solicitar reserva no WhatsApp
            </Button>
            <p className="mt-3 text-xs text-[#6E6E6E]">
              Depois, se quiser, a gente troca isso por envio para o banco + painel administrativo.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
