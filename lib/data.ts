export type MenuCategory =
  | "Starters"
  | "Main Course"
  | "Pasta"
  | "Seafood"
  | "Dessert"
  | "Drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  signature?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: "burrata-garden",
    name: "Burrata Garden",
    description:
      "Creamy burrata, heirloom tomatoes, basil oil, aged balsamic, toasted sourdough crumb.",
    price: 18,
    category: "Starters",
    image:
      "https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=1200&auto=format&fit=crop",
    signature: true,
  },
  {
    id: "tuna-tartare",
    name: "Yellowfin Tartare",
    description:
      "Hand-cut yellowfin tuna, avocado, citrus ponzu, crisp taro, chive oil.",
    price: 21,
    category: "Starters",
    image:
      "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "roasted-beet-salad",
    name: "Roasted Beet & Goat Cheese",
    description:
      "Slow-roasted heirloom beets, whipped goat cheese, candied walnuts, sherry vinaigrette.",
    price: 16,
    category: "Starters",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "grilled-ribeye",
    name: "Grilled Ribeye",
    description:
      "28-day dry-aged ribeye, charred shallots, bone marrow butter, red wine jus.",
    price: 28,
    category: "Main Course",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    signature: true,
  },
  {
    id: "wagyu-steak",
    name: "Wagyu Steak",
    description:
      "A5 Wagyu striploin, roasted garlic confit, truffle jus, seasonal greens.",
    price: 42,
    category: "Main Course",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",
    signature: true,
  },
  {
    id: "herb-roasted-chicken",
    name: "Herb-Roasted Chicken",
    description:
      "Free-range chicken breast, wild mushroom jus, confit potato, charred leek.",
    price: 24,
    category: "Main Course",
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "truffle-pasta",
    name: "Truffle Pasta",
    description:
      "Hand-rolled tagliatelle, black truffle, aged parmesan, brown butter.",
    price: 22,
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop",
    signature: true,
  },
  {
    id: "lobster-linguine",
    name: "Lobster Linguine",
    description:
      "Fresh linguine, butter-poached lobster, cherry tomato, chili, bisque reduction.",
    price: 32,
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "mushroom-risotto",
    name: "Wild Mushroom Risotto",
    description:
      "Carnaroli rice, porcini, thyme, parmesan crisp, black truffle oil.",
    price: 24,
    category: "Pasta",
    image:
      "https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "salmon-royale",
    name: "Salmon Royale",
    description:
      "Pan-seared salmon, saffron beurre blanc, charred asparagus, herb oil.",
    price: 26,
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
    signature: true,
  },
  {
    id: "seared-scallops",
    name: "Seared Scallops",
    description:
      "Hokkaido scallops, cauliflower puree, brown butter, crispy pancetta.",
    price: 29,
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "whole-branzino",
    name: "Whole Roasted Branzino",
    description:
      "Mediterranean branzino, lemon, capers, olive oil, roasted fennel.",
    price: 34,
    category: "Seafood",
    image:
      "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "chocolate-fondant",
    name: "Chocolate Fondant",
    description:
      "Warm dark chocolate fondant, molten center, vanilla bean gelato, gold leaf.",
    price: 14,
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1200&auto=format&fit=crop",
    signature: true,
  },
  {
    id: "creme-brulee",
    name: "Classic Crème Brûlée",
    description:
      "Madagascar vanilla custard, caramelized sugar crust, fresh berries.",
    price: 12,
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "tiramisu",
    name: "House Tiramisu",
    description:
      "Espresso-soaked savoiardi, mascarpone cream, cocoa dust.",
    price: 13,
    category: "Dessert",
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "velora-old-fashioned",
    name: "VELORA Old Fashioned",
    description: "Bourbon, demerara, orange bitters, smoked cedar.",
    price: 16,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "garden-spritz",
    name: "Garden Spritz",
    description: "Elderflower, prosecco, cucumber, mint, soda.",
    price: 14,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "reserve-red",
    name: "Reserve Red — Glass",
    description: "Rotating selection of Old World reserve reds, ask your host.",
    price: 18,
    category: "Drinks",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
  },
];

export const signatureDishIds = [
  "grilled-ribeye",
  "truffle-pasta",
  "salmon-royale",
  "wagyu-steak",
  "burrata-garden",
  "chocolate-fondant",
];

export const signatureDishes = signatureDishIds
  .map((id) => menuItems.find((item) => item.id === id))
  .filter((item): item is MenuItem => Boolean(item));

export const menuCategories: MenuCategory[] = [
  "Starters",
  "Main Course",
  "Pasta",
  "Seafood",
  "Dessert",
  "Drinks",
];

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "Interior" | "Chef" | "Dishes" | "Table" | "Drinks" | "Kitchen";
}

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
    alt: "VELORA dining room with warm ambient lighting",
    category: "Interior",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1400&auto=format&fit=crop",
    alt: "Executive chef finishing a plate in the kitchen",
    category: "Chef",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1400&auto=format&fit=crop",
    alt: "Wagyu steak plated with truffle jus",
    category: "Dishes",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1400&auto=format&fit=crop",
    alt: "Candlelit table set for two",
    category: "Table",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1400&auto=format&fit=crop",
    alt: "Old fashioned cocktail on the bar",
    category: "Drinks",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1400&auto=format&fit=crop",
    alt: "Kitchen brigade plating during dinner service",
    category: "Kitchen",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1400&auto=format&fit=crop",
    alt: "Restaurant entrance at dusk",
    category: "Interior",
  },
  {
    id: "g8",
    src: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1400&auto=format&fit=crop",
    alt: "Hand-rolled truffle tagliatelle",
    category: "Dishes",
  },
  {
    id: "g9",
    src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1400&auto=format&fit=crop",
    alt: "Private dining table detail",
    category: "Table",
  },
];

export interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  avatar?: string;
}

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Amara Chen",
    rating: 5,
    review:
      "An unforgettable dining experience. Every dish was beautifully presented and full of flavor.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "r2",
    name: "Daniel Reyes",
    rating: 5,
    review:
      "The Wagyu was cooked to perfection and the service felt genuinely attentive without ever being intrusive.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "r3",
    name: "Sofia Marchetti",
    rating: 5,
    review:
      "VELORA has become our anniversary spot. The truffle pasta alone is worth the reservation.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "r4",
    name: "James Whitfield",
    rating: 4,
    review:
      "Elegant room, thoughtful wine pairings, and a dessert menu that closes the night perfectly.",
    avatar:
      "https://images.unsplash.com/photo-1500522144261-ea64433bbe27?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "r5",
    name: "Priya Nair",
    rating: 5,
    review:
      "From the bread service to the last spoon of crème brûlée, everything felt intentional.",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
  },
];