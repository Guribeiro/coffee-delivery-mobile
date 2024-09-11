import CremosoImage from "../assets/cremoso.png";
import CapuccinoImage from "../assets/capuccino.png";
import CubanoImage from "../assets/cubano.png";

export type COFFEE_HIGHLIGHT = {
  id: number
  title: string
  description: string
  price: number
  sizes: string[],
  type: number,
  type_label: string
  image: string
}

export const COFFEES_HIGHTLIGHT:COFFEE_HIGHLIGHT[] = [
  {
    id: 3,
    title: "Expresso Cremoso",
    description: "Café expresso tradicional com espuma cremosa",
    price: 9.9,
    sizes: ["114ml", "140ml", "227ml"],
    type: 1,
    type_label: "Tradicional",
    image: CremosoImage,
  },
  {
    id: 6,
    title: "Capuccino",
    description: "Bebida com canela feita de doses de café, leite e espuma",
    price: 9.9,
    sizes: ["114ml", "140ml", "227ml"],
    type: 2,
    type_label: "Doce",
    image: CapuccinoImage,
  },
  {
    id: 9,
    title: "Cubano",
    description:
      "Drink gelado de café expresso com rum, creme de leite e hortelã",
    price: 9.9,
    sizes: ["114ml", "140ml", "227ml"],
    type: 3,
    type_label: "Especial",
    image: CubanoImage,
  },
];
