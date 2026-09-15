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
  signature: boolean;
}

export const menuCategories: MenuCategory[] = [
  "Starters",
  "Main Course",
  "Pasta",
  "Seafood",
  "Dessert",
  "Drinks",
];

const CATEGORY_LABELS: Record<string, MenuCategory> = {
  Starters: "Starters",
  MainCourse: "Main Course",
  Pasta: "Pasta",
  Seafood: "Seafood",
  Dessert: "Dessert",
  Drinks: "Drinks",
};

export function toCategoryLabel(dbCategory: string): MenuCategory {
  return CATEGORY_LABELS[dbCategory] ?? (dbCategory as MenuCategory);
}

export function toDbCategory(label: MenuCategory): string {
  return label.replace(" ", "");
}

export type GalleryCategory =
  | "Interior"
  | "Chef"
  | "Dishes"
  | "Table"
  | "Drinks"
  | "Kitchen";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  avatar: string | null;
}
