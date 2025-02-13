export interface Category {
  name: string;
  slug: string;
}

export interface Image {
  id: number;
  image: string;
}

export interface Feature {
  feature: string;
}

export interface ProductBase {
  name: string;
  description: string;
  price: number;
  category: Category | null;
  stock: number;
  discount: number;
  featured: boolean;
  status: string;
  slug: string;
  images: Image[];
}

export type Book = ProductBase;

export type Stationery = ProductBase;

export type LabEquipment = ProductBase;

export interface Device extends ProductBase {
  features: Feature[];
}

export type ProductList = (Book | Stationery | LabEquipment | Device)[];
