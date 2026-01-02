
import { Laptop, User, Order, AnalyticsData, Review } from '../types';
import { INITIAL_LAPTOPS, INITIAL_USERS, MOCK_REVENUE, MOCK_VISITORS, BRANDS } from '../constants';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isAdmin: boolean;
}

class MockStore {
  private laptops: Laptop[] = [];
  private users: User[] = [];
  private orders: Order[] = [];
  private reviews: Review[] = [];
  private messages: Message[] = [];
  private currentUser: User | null = null;

  constructor() {
    this.loadData();
  }

  private loadData() {
    const storedLaptops = localStorage.getItem('luxe_laptops');
    const storedUsers = localStorage.getItem('luxe_users');
    const storedOrders = localStorage.getItem('luxe_orders');
    const storedReviews = localStorage.getItem('luxe_reviews');
    const storedMessages = localStorage.getItem('luxe_messages');
    const storedUser = localStorage.getItem('luxe_auth');

    this.laptops = storedLaptops ? JSON.parse(storedLaptops) : INITIAL_LAPTOPS;
    this.users = storedUsers ? JSON.parse(storedUsers) : INITIAL_USERS;
    this.orders = storedOrders ? JSON.parse(storedOrders) : [];
    this.reviews = storedReviews ? JSON.parse(storedReviews) : [];
    this.messages = storedMessages ? JSON.parse(storedMessages) : [];
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;

    this.saveData();
  }

  private saveData() {
    localStorage.setItem('luxe_laptops', JSON.stringify(this.laptops));
    localStorage.setItem('luxe_users', JSON.stringify(this.users));
    localStorage.setItem('luxe_orders', JSON.stringify(this.orders));
    localStorage.setItem('luxe_reviews', JSON.stringify(this.reviews));
    localStorage.setItem('luxe_messages', JSON.stringify(this.messages));
    if (this.currentUser) {
      localStorage.setItem('luxe_auth', JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem('luxe_auth');
    }
  }

  // Auth
  login(email: string): User | null {
    const user = this.users.find(u => u.email === email && u.isActive);
    if (user) {
      this.currentUser = user;
      this.saveData();
      return user;
    }
    return null;
  }

  register(name: string, email: string): User {
    const newUser: User = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'USER',
      isActive: true
    };
    this.users.push(newUser);
    this.saveData();
    return newUser;
  }

  logout() {
    this.currentUser = null;
    this.saveData();
  }

  getCurrentUser() { return this.currentUser; }

  updateUser(id: string, updates: Partial<User>) {
    this.users = this.users.map(u => u.id === id ? { ...u, ...updates } : u);
    if (this.currentUser && this.currentUser.id === id) {
      this.currentUser = { ...this.currentUser, ...updates };
    }
    this.saveData();
    return this.currentUser;
  }

  // Laptops (Admin CRUD)
  getLaptops() { return this.laptops; }
  getLaptopById(id: string) { return this.laptops.find(l => l.id === id); }
  
  addLaptop(laptop: Omit<Laptop, 'id'>) {
    const newLaptop = { ...laptop, id: Math.random().toString(36).substr(2, 9) };
    this.laptops.push(newLaptop as Laptop);
    this.saveData();
    return newLaptop;
  }

  updateLaptop(id: string, updates: Partial<Laptop>) {
    this.laptops = this.laptops.map(l => l.id === id ? { ...l, ...updates } : l);
    this.saveData();
    return this.laptops.find(l => l.id === id);
  }

  deleteLaptop(id: string) {
    this.laptops = this.laptops.filter(l => l.id !== id);
    this.saveData();
  }

  // Messaging
  getMessages() { return this.messages; }
  sendMessage(text: string, isAdmin: boolean = false) {
    const user = this.getCurrentUser();
    const msg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: user?.id || 'guest',
      senderName: user?.name || 'Guest',
      text,
      timestamp: new Date().toISOString(),
      isAdmin
    };
    this.messages.push(msg);
    this.saveData();
    return msg;
  }

  // Analytics
  getAnalytics(): AnalyticsData {
    const positive = this.reviews.filter(r => r.rating >= 4).length;
    return {
      revenue: MOCK_REVENUE,
      visitors: MOCK_VISITORS,
      salesByBrand: BRANDS.map(brand => ({
        brand,
        count: this.orders.reduce((acc, order) => 
          acc + order.items.filter(item => item.brand === brand).length, 0)
      })),
      reviewSentiment: [
        { label: 'Positive', value: positive || 10 },
        { label: 'Neutral', value: 2 },
        { label: 'Negative', value: 1 }
      ]
    };
  }

  getUsers() { return this.users; }
  getOrders() { return this.orders; }
  getReviews() { return this.reviews; }
  toggleUserActive(id: string) {
    this.users = this.users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u);
    this.saveData();
  }
  deleteReview(id: string) {
    this.reviews = this.reviews.filter(r => r.id !== id);
    this.saveData();
  }
  getUserOrders(userId: string) { return this.orders.filter(o => o.userId === userId); }
  createOrder(order: Omit<Order, 'id' | 'createdAt'>) {
    const newOrder: Order = {
      ...order,
      id: 'ORD-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      createdAt: new Date().toISOString()
    };
    this.orders.unshift(newOrder);
    this.saveData();
    return newOrder;
  }
}

export const mockStore = new MockStore();
