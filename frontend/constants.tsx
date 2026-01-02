
import { Laptop, User, Order } from './types';

export const BRANDS = ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'MSI', 'Razer'];
export const CATEGORIES = ['Gaming', 'Ultrabook', 'Workstation', 'Business', 'Student'];

export const INITIAL_LAPTOPS: Laptop[] = [
  {
    id: '1',
    brand: 'Apple',
    model: 'MacBook Pro 16" M3 Max',
    price: 3499,
    cpu: 'M3 Max 14-core',
    gpu: '30-core GPU',
    ram: '36GB',
    storage: '1TB SSD',
    images: ['https://picsum.photos/seed/mbp1/800/600', 'https://picsum.photos/seed/mbp2/800/600'],
    description: 'The most advanced Mac laptop ever built for workflows that demand peak performance.',
    stock: 12,
    isFeatured: true,
    category: 'Workstation'
  },
  {
    id: '2',
    brand: 'Razer',
    model: 'Blade 16',
    price: 2999,
    cpu: 'Intel Core i9-13950HX',
    gpu: 'NVIDIA RTX 4080',
    ram: '32GB',
    storage: '1TB SSD',
    images: ['https://picsum.photos/seed/razer1/800/600', 'https://picsum.photos/seed/razer2/800/600'],
    description: 'Experience pure performance with the world\'s first 16" Dual Mode Mini-LED Display.',
    stock: 5,
    isFeatured: true,
    category: 'Gaming'
  },
  {
    id: '3',
    brand: 'Asus',
    model: 'ROG Zephyrus G14',
    price: 1599,
    cpu: 'AMD Ryzen 9 7940HS',
    gpu: 'RTX 4060',
    ram: '16GB',
    storage: '512GB SSD',
    images: ['https://picsum.photos/seed/zeph1/800/600'],
    description: 'Potent performance meets a sleek, portable 14-inch chassis.',
    stock: 20,
    isFeatured: false,
    category: 'Gaming'
  }
];

export const INITIAL_USERS: User[] = [
  { id: 'admin-1', name: 'System Admin', email: 'admin@luxelaptops.com', role: 'ADMIN', isActive: true },
  { id: 'user-1', name: 'John Doe', email: 'john@example.com', role: 'USER', isActive: true }
];

export const MOCK_REVENUE = [
  { month: 'Jan', amount: 45000 },
  { month: 'Feb', amount: 52000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 61000 },
  { month: 'May', amount: 55000 },
  { month: 'Jun', amount: 67000 },
];

export const MOCK_VISITORS = [
  { date: '2023-10-01', count: 1200 },
  { date: '2023-10-02', count: 1500 },
  { date: '2023-10-03', count: 1100 },
  { date: '2023-10-04', count: 1800 },
  { date: '2023-10-05', count: 2100 },
];
