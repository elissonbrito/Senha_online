export type MenuItem = {
  id: string;
  category: "Entradas" | "Parrilla" | "Guarnições" | "Drinks" | "Executivos" | "Bebidas";
  name: string;
  description: string;
  price: number;
  highlight?: boolean;
};

export const menuItems: MenuItem[] = [
  {
    id: "ent-1",
    category: "Entradas",
    name: "Pão de alho da casa",
    description: "Tradicional, tostado na brasa e finalizado com Maionese temperada.",
    price: 10.00,
    highlight: true,
  },
  {
    id: "ent-2",
    category: "Entradas",
    name: "Porção de Pastel 8 uni.",
    description: "Escolha as opções: carne seca, queijo (catupiry), costela, ou cupim. (Todas as opções levam queijo catupiry junto)",
    price: 45.00,
  },
  {
    id: "ent-3",
    category: "Entradas",
    name: "Pão de Alho com Linguiça",
    description: "Nosso imcomparável Pão de Alho com Maionese temperada, com linguiça para os amantes de um sabor mais robusto.",
    price: 45.00,
  },
  {
    id: "par-1",
    category: "Parrilla",
    name: "Picanha Para 2 Pessoas",
    description: "Aproximadamente 1Kg de Picanha Fatiada, acompanhada de farofa, batata frita, banana empanada, molho a campanha, feijão, arroz e Cortesias de casa de acordo com a disponibilidade do dia.",
    price: 265.00,
    highlight: true,
  },
  {
    id: "par-2",
    category: "Parrilla",
    name: "Chorizo argentino",
    description: "Aproximadamente 1Kg de Chorizo, acompanhada de farofa, batata frita, banana empanada, molho a campanha, feijão, arroz e Cortesias de casa de acordo com a disponibilidade do dia.",
    price: 285.00,
  },
  {
    id: "guar-01",
    category: "Guarnições",
    name: "Maionese temperada",
    description: "Maionese caseira com um toque especial de temperos, perfeita para acompanhar nossos pratos.",
    price: 25.00,
    highlight: true,
  },
  {
    id: "drink-1",
    category: "Drinks",
    name: "Caipirinha clássica",
    description: "Nossa Caipirinha é preparada com cachaça de qualidade, limão, maracujá, morango ou abacaxi fresco e glicose, proporcionando um equilíbrio perfeito entre doçura e acidez. Refrescante e ideal para os dias quentes.",
    price: 29.9,
  },
  {
    id: "exec-1",
    category: "Executivos",
    name: "Picanha",
    description: "Acompanhada de arroz, feijão, batata frita, farofa e molho a campanha.",
    price: 95.00,
  },
  {
    id: "beb-1",
    category: "Bebidas",
    name: "Refrigerante lata",
    description: "Guaraná, Pepsi, Fanta ou Sprite.",
    price: 8.00,
    highlight: true,
  },
];
