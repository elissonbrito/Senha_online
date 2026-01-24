import { BrowserRouter, Routes, Route } from "react-router-dom";
import Atendente from "./pages/Atendente";
import Painel from "./pages/Painel";
import Cliente from "./pages/Cliente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cliente />} />
        <Route path="/atendente" element={<Atendente />} />
        <Route path="/painel" element={<Painel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
