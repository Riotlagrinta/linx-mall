export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  badge?: string;
  category: string;
  specs: string[];
  stock: number;
  shop: {
    id: number;
    name: string;
  };
}
