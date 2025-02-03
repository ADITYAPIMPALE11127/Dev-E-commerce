export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'website' | 'api' | 'other';
}

export interface CartItem extends Product {
  quantity: number;
}