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
  get_discounted_price: number;
  created_at: string;
}

export interface Banner {
  id: number;
  title: string;
  image?: string;
  link: string;
  position: string;
  is_active: boolean;
}

export interface CartItem {
  id: number;
  product: ProductBase;
  quantity: number;
  total_price: number;
  items: [];
}

export interface Cart {
  id: number;
  user: {
    id: number;
    email: string;
  };
  items: CartItem[];
  total_price: number;
  created_at: string;
  updated_at: string;
}

export interface ProductDetail {
  params: { slug: string };
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Order {
  id: number;
  user: User;
  total_price: number;
  order_reference: string;
  items: CartItem[];
  shipping_address: ShippingAddress;
  shipping_cost: number;
  status: string;
  created_at: string;
}

export interface PaymentHistory {
  id: number; // Automatically added by Django as primary key
  user: User; // ForeignKey to User
  amount_paid: number; // IntegerField
  reference_code: string; // CharField
  payment_date: string; // DateTimeField (auto_now_add=True)
}

export interface ShippingAddress {
  id: number;
  user: User;
  order: Order;
  first_name: string;
  last_name: string;
  email: string;
  street_address: string;
  apartment: string;
  city: string;
  county: string;
  country: string;
  postal_code: string;
  phone_number: string;
  created_at: string;
}
