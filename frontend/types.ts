
export type Role = 'ADMIN' | 'USER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  avatar?: string;
}

export interface Review {
  id: string;
  laptopId: string;
  userId: string;
  userName: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Laptop {
  id: string;
  brand: string;
  model: string;
  price: number;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  images: string[];
  description: string;
  stock: number;
  isFeatured: boolean;
  category: string;
}

export interface CartItem extends Laptop {
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: 'COD' | 'Stripe';
  createdAt: string;
  shippingAddress: string;
}

export interface AnalyticsData {
  revenue: { month: string; amount: number }[];
  salesByBrand: { brand: string; count: number }[];
  visitors: { date: string; count: number }[];
  reviewSentiment: { label: string; value: number }[];
}
