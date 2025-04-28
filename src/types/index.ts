
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  stock: number;
  variants?: ProductVariant[];
  reviews?: Review[];
  isInWishlist?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
  wishlist?: string[];
}

