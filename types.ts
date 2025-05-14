import { JSX } from "react";

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  [x: string]: any;
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {

  id: string;
  name: string;
  description: string;
  variants: Variant[];
  images: Image[];
  isNewlaunch: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  isArchived: boolean;

  category?: {
    id: string;
    name: string;
  };
  categoryId?: string;

  face?: Face;
  hair?: Hair;
  makeup?: Makeup;
  body?: Body;
  combos?: Combos;
  ingredient?: Ingredient;
  fragrance?: Fragrance;
  price?: Price;
}

export interface Variant {
  id: string;
  name: string;
  variantsepQuant: string;
  price: number;
  inventory?: number;
  images: Image[];
  ingredients: Ingredient[];
  productId: string;
  product: Product;
}
export interface Image {
  id: string;
  productId: string;
  url: string;
  cratedAt: string; // Or Date, depending on your actual data
  updatedAt: string; // Or Date
  variantId: string | null | undefined; // Make it nullable or optional if needed
  ingredientId: string | null | undefined;
  alt: string;

}

export interface Face {
  id: string;
  name: string;
}
export interface Hair {
  id: string;
  name: string;
}
export interface Makeup {
  id: string;
  name: string;
}
export interface Body {
  id: string;
  name: string;
}
export interface Combos {
  id: string;
  name: string;
}
export interface Ingredient {

  id: string;
  name: string;
  images: Image[];
  description: string;
}
export interface Fragrance {
  id: string;
  name: string;
}
export interface Price {
  id: string;
  name: string;
}

export interface Order {
  id: string;
  storeId: string;
  customerId: string;
  createdAt: Date;
  updatedAt: Date;

  orderItems: {
    id: string;
    orderId: string;
    variantId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
    status: string;
   varient:Variant[];
  }[];

  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
};
