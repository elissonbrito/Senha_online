export type MenuItem = {
  id: string;
  category: "Entradas" | "Parrilla" | "Paellas" | "Tapas" | "Sobremesas" | "Bebidas";
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
    description: "Tradicional, tostado na brasa e finalizado com manteiga temperada.",
    price: 18.9,
    highlight: true,
  },
  {
    id: "ent-2",
    category: "Entradas",
    name: "Provoleta na chapa",
    description: "Queijo derretido, ervas e toque levemente picante.",
    price: 34.9,
  },
  {
    id: "par-1",
    category: "Parrilla",
    name: "Picanha na brasa",
    description: "Corte alto, suculento, finalizado no ponto.",
    price: 129.9,
    highlight: true,
  },
  {
    id: "par-2",
    category: "Parrilla",
    name: "Chorizo argentino",
    description: "Linguiça artesanal com tempero marcante.",
    price: 39.9,
  },
  {
    id: "pae-1",
    category: "Paellas",
    name: "Paella tradicional",
    description: "Arroz, frutos do mar e especiarias (ajuste conforme seu cardápio real).",
    price: 169.9,
    highlight: true,
  },
  {
    id: "tap-1",
    category: "Tapas",
    name: "Batatas bravas",
    description: "Crocantes, com molho levemente picante.",
    price: 29.9,
  },
  {
    id: "sob-1",
    category: "Sobremesas",
    name: "Churros com doce de leite",
    description: "Crocante por fora, macio por dentro.",
    price: 24.9,
  },
  {
    id: "beb-1",
    category: "Bebidas",
    name: "Sangria (taça)",
    description: "Refrescante e aromática.",
    price: 29.9,
    highlight: true,
  },
];
