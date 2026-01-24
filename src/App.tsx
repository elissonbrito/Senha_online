import { HashRouter, Routes, Route } from "react-router-dom";
import Atendente from "./pages/Atendente";
import Painel from "./pages/Painel";
import Cliente from "./pages/Cliente";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Cliente />} />
        <Route path="/atendente" element={<Atendente />} />
        <Route path="/painel" element={<Painel />} />
      </Routes>
    </HashRouter>
  );
}
