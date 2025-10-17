import { Product } from "@/contexts/CartContext";
import burger1 from "@/assets/burger-1.jpg";
import burger2 from "@/assets/burger-2.jpg";
import burger3 from "@/assets/burger-3.jpg";
import burger4 from "@/assets/burger-4.jpg";
import fries from "@/assets/fries.jpg";
import drinkCola from "@/assets/drink-cola.jpg";
import milkshake from "@/assets/milkshake.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "Burger Giga",
    description: "Pão preto artesanal, 2 carnes 150g, queijo cheddar, alface, tomate, cebola roxa",
    price: 26.90,
    image: burger1,
    category: "burgers",
  },
  {
    id: "2",
    name: "Burger Bacon Supreme",
    description: "Pão brioche, 2 carnes 150g, bacon crocante, queijo cheddar, alface, tomate",
    price: 29.90,
    image: burger2,
    category: "burgers",
  },
  {
    id: "3",
    name: "Burger Picante",
    description: "Pão brioche, frango empanado, jalapeños, queijo pepper jack, alface",
    price: 24.90,
    image: burger3,
    category: "burgers",
  },
  {
    id: "4",
    name: "Burger Clássico",
    description: "Pão com gergelim, 2 carnes 150g, queijo cheddar, picles, cebola, molho especial",
    price: 22.90,
    image: burger4,
    category: "burgers",
  },
  {
    id: "5",
    name: "Batata Frita Grande",
    description: "Porção generosa de batatas fritas crocantes",
    price: 12.90,
    image: fries,
    category: "sides",
  },
  {
    id: "6",
    name: "Refrigerante 500ml",
    description: "Coca-Cola, Guaraná ou Sprite gelado",
    price: 6.90,
    image: drinkCola,
    category: "drinks",
  },
  {
    id: "7",
    name: "Milkshake de Chocolate",
    description: "Cremoso milkshake com cobertura de chocolate",
    price: 14.90,
    image: milkshake,
    category: "drinks",
  },
  {
    id: "8",
    name: "Combo Giga",
    description: "Burger Giga + Batata Frita + Refrigerante",
    price: 39.90,
    image: burger1,
    category: "combos",
  },
  {
    id: "9",
    name: "Combo Bacon",
    description: "Burger Bacon Supreme + Batata Frita + Refrigerante",
    price: 42.90,
    image: burger2,
    category: "combos",
  },
];

export const getCategorizedProducts = () => {
  return {
    burgers: products.filter((p) => p.category === "burgers"),
    drinks: products.filter((p) => p.category === "drinks"),
    sides: products.filter((p) => p.category === "sides"),
    combos: products.filter((p) => p.category === "combos"),
  };
};

export const getMostOrdered = () => products.slice(0, 4);
