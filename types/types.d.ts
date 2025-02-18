export interface Category {
  name: string;
  slug: string;
}

export interface Image {
  id: number;
  image: string;
}

export interface Feature {
  id: number;
  feature: string;
}

export interface ProductBase {
  id: number;
  title: string;
  description: string;
  price: number;
  main_category: string;
  category: Category | null;
  stock: number;
  discount: number;
  featured: boolean;
  best_seller: boolean;
  status: string;
  slug: string;
  features: Feature[];
  images: Image[];
}
