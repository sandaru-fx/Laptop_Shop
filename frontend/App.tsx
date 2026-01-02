
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { CheckoutPage } from './pages/CheckoutPage';
import { LogoutPage } from './pages/LogoutPage';
import { Toast, ToastType } from './components/Toast';
import { LiveConcierge } from './components/LiveConcierge';
import { AIChatWidget } from './components/AIChatWidget';
import { mockStore } from './services/mockStore';
import { Laptop, CartItem, User, Order, Review } from './types';
import { 
  Trash2, Plus, Minus, ShoppingBag, CheckCircle2, Star, 
  MessageSquare, ShieldCheck, User as UserIcon, Mail, Edit3, Save, 
  AlertCircle, ChevronRight, Receipt, X, LogOut, ArrowRight, Lock, Key,
  Sparkles, Zap, Cpu, Monitor
} from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(mockStore.getCurrentUser());
  const [currentPage, setCurrentPage] = useState(currentUser ? (currentUser.role === 'ADMIN' ? 'admin' : 'home') : 'landing');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<{message: string, type: ToastType} | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>((localStorage.getItem('luxe_theme') as 'dark' | 'light') || 'dark');
  const [isLiveConciergeOpen, setIsLiveConciergeOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('luxe_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('luxe_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('luxe_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const notify = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
  };

  const handlePageChange = (page: string) => {
    if ((page === 'admin' || page === 'profile' || page === 'logout') && !currentUser) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (email: string) => {
    const u = mockStore.login(email);
    if (u) {
      setCurrentUser(u);
      notify(`Welcome back, ${u.name}`, 'success');
      if (u.role === 'ADMIN') {
        handlePageChange('admin');
      } else {
        handlePageChange('home');
      }
    } else {
      notify('Access denied. Please check credentials.', 'error');
    }
  };

  const handleLogout = () => {
    mockStore.logout();
    setCurrentUser(null);
    handlePageChange('landing');
    notify('Securely logged out.', 'info');
  };

  const addToCart = (laptop: Laptop) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === laptop.id);
      if (existing) {
        return prev.map(item => item.id === laptop.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...laptop, quantity: 1 }];
    });
    notify(`Added ${laptop.model} to cart`);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const renderContent = () => {
    switch (currentPage) {
      case 'landing': return <LandingPage onPageChange={handlePageChange} />;
      case 'home': return <HomePage onPageChange={handlePageChange} onProductClick={(id) => { setSelectedProductId(id); setCurrentPage('details'); }} onOpenConcierge={() => setIsLiveConciergeOpen(true)} />;
      case 'shop': return <ShopPage onProductClick={(id) => { setSelectedProductId(id); setCurrentPage('details'); }} />;
      case 'about': return <AboutPage />;
      case 'admin': return currentUser?.role === 'ADMIN' ? <AdminDashboard /> : <LandingPage onPageChange={handlePageChange} />;
      case 'profile': return <ProfilePage user={currentUser} onPageChange={handlePageChange} onUpdateUser={(u: any) => { setCurrentUser(mockStore.updateUser(u.id, u)); notify('Identity updated.'); }} onLogout={() => handlePageChange('logout')} />;
      case 'cart': return <CartPage cart={cart} total={cartTotal} onUpdateQty={(id: string, d: number) => setCart(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity+d)} : i))} onRemove={(id: string) => setCart(prev => prev.filter(i => i.id !== id))} onCheckout={() => handlePageChange('checkout')} />;
      case 'login': return <LoginPage onLogin={handleLogin} onPageChange={handlePageChange} />;
      case 'logout': return <LogoutPage onConfirm={handleLogout} onCancel={() => handlePageChange(currentUser?.role === 'ADMIN' ? 'admin' : 'home')} />;
      case 'register': return <RegisterPage onRegister={(n, e) => { mockStore.register(n, e); notify('Identity Registered.'); handlePageChange('login'); }} onPageChange={handlePageChange} />;
      case 'details': 
        const laptop = mockStore.getLaptopById(selectedProductId || '');
        return laptop ? <ProductDetailsPage laptop={laptop} user={currentUser} onAddToCart={() => addToCart(laptop)} notify={notify} onOpenConcierge={() => setIsLiveConciergeOpen(true)} /> : <HomePage onPageChange={handlePageChange} onProductClick={() => {}} onOpenConcierge={() => setIsLiveConciergeOpen(true)} />;
      case 'checkout': return <CheckoutPage cart={cart} total={cartTotal} onPlaceOrder={(addr, pay) => { mockStore.createOrder({ userId: currentUser?.id || 'guest', items: cart, total: cartTotal, status: 'Pending', paymentMethod: pay, shippingAddress: addr }); setCart([]); notify('Order Transmitted.'); handlePageChange('profile'); }} onCancel={() => handlePageChange('cart')} />;
      default: return <LandingPage onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-luxe-light dark:bg-luxe-dark text-luxe-text-brandLight dark:text-luxe-text-bodyDark transition-colors duration-500">
      <Navbar 
        onPageChange={handlePageChange} 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        user={currentUser}
        onLogout={() => handlePageChange('logout')}
        onOpenConcierge={() => setIsLiveConciergeOpen(true)}
      />
      <main className="flex-1">{renderContent()}</main>
      
      <Footer onPageChange={handlePageChange} isAdmin={currentUser?.role === 'ADMIN'} />
      
      <LiveConcierge isOpen={isLiveConciergeOpen} onClose={() => setIsLiveConciergeOpen(false)} />
      {currentUser && <AIChatWidget />}
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

// --- LoginPage ---
const LoginPage = ({ onLogin, onPageChange }: { onLogin: (email: string) => void, onPageChange: (p: string) => void }) => {
  const [email, setEmail] = useState('');
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full text-center opacity-[0.02] dark:opacity-[0.05] pointer-events-none select-none -translate-y-1/2">
        <h1 className="text-[25vw] font-black">ACCESS</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl relative z-10">
        <div className="glass p-10 md:p-14 rounded-[3.5rem] bg-luxe-card-light dark:bg-luxe-card-dark border-slate-200 dark:border-white/10 shadow-2xl animate-in fade-in slide-in-from-left duration-700">
          <div className="space-y-2 mb-12">
            <h2 className="text-5xl font-black tracking-tighter text-luxe-text-brandLight dark:text-luxe-text-brandDark">Sign In</h2>
            <p className="text-slate-500 font-medium text-lg italic">The portal to elite performance.</p>
          </div>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-[0.3em]">Identity Endpoint</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-luxe-accent-light dark:text-luxe-accent-dark" size={20} />
                <input 
                  type="email" 
                  placeholder="name@workstation.com" 
                  className="w-full bg-luxe-light dark:bg-luxe-dark border border-slate-200 dark:border-white/10 rounded-[1.5rem] pl-14 pr-6 py-5 outline-none focus:ring-4 focus:ring-luxe-accent-light/20 dark:focus:ring-luxe-accent-dark/20 transition-all text-lg font-medium text-luxe-text-brandLight dark:text-luxe-text-brandDark" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
            </div>
            <button 
              onClick={() => onLogin(email)} 
              className="w-full bg-luxe-accent-light dark:bg-luxe-accent-dark hover:opacity-90 text-white py-5 rounded-[1.5rem] font-black text-xl transition-all active:scale-95 shadow-2xl shadow-blue-900/40 flex items-center justify-center space-x-3 group"
            >
              <span>Initialize Session</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-sm text-slate-500 pt-4">
              New explorer? <button onClick={() => onPageChange('register')} className="text-luxe-accent-light dark:text-luxe-accent-dark font-black hover:underline underline-offset-4">Register Identity</button>
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-right duration-700 delay-200">
           <div className="glass p-10 rounded-[3rem] border-luxe-accent-light/20 bg-luxe-accent-light/5 backdrop-blur-3xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-luxe-accent-light dark:bg-luxe-accent-dark rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <Key size={24} />
                </div>
                <h3 className="text-2xl font-black tracking-tight uppercase text-luxe-text-brandLight dark:text-luxe-text-brandDark">Demo Workspaces</h3>
              </div>
              <div className="space-y-5">
                <button 
                  className="w-full group glass bg-white/5 p-6 rounded-2xl border-white/5 hover:border-luxe-accent-light/30 transition-all text-left"
                  onClick={() => setEmail('admin@luxelaptops.com')}
                >
                  <p className="text-[10px] font-black uppercase text-luxe-accent-light dark:text-luxe-accent-dark tracking-widest mb-1">Administrative Node</p>
                  <p className="text-xl font-bold flex justify-between items-center text-luxe-text-brandLight dark:text-luxe-text-brandDark">
                    <span>admin@luxelaptops.com</span>
                    <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                </button>
                <button 
                  className="w-full group glass bg-white/5 p-6 rounded-2xl border-white/5 hover:border-luxe-accent-light/30 transition-all text-left"
                  onClick={() => setEmail('john@example.com')}
                >
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">General User Node</p>
                  <p className="text-xl font-bold flex justify-between items-center text-luxe-text-brandLight dark:text-luxe-text-brandDark">
                    <span>john@example.com</span>
                    <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- RegisterPage ---
const RegisterPage = ({ onRegister, onPageChange }: { onRegister: (name: string, email: string) => void, onPageChange: (p: string) => void }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full text-center opacity-[0.02] dark:opacity-[0.05] pointer-events-none select-none -translate-y-1/2">
        <h1 className="text-[25vw] font-black">IDENTITY</h1>
      </div>
      <div className="glass w-full max-w-md p-10 rounded-[3rem] bg-luxe-card-light dark:bg-luxe-card-dark border-slate-200 dark:border-white/10 shadow-2xl relative z-10 animate-in zoom-in duration-500">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-4xl font-black tracking-tighter text-luxe-text-brandLight dark:text-luxe-text-brandDark">New Account</h2>
          <p className="text-slate-500 font-medium">Join the technological elite</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="John Wick" className="w-full bg-luxe-light dark:bg-luxe-dark border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-luxe-accent-light" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="email" placeholder="john@example.com" className="w-full bg-luxe-light dark:bg-luxe-dark border border-slate-200 dark:border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-luxe-accent-light" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <button onClick={() => onRegister(name, email)} className="w-full bg-luxe-accent-light dark:bg-luxe-accent-dark hover:opacity-90 text-white py-4 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all">Create Identity</button>
          <p className="text-center text-sm text-slate-500">Already a member? <button onClick={() => onPageChange('login')} className="text-luxe-accent-light dark:text-luxe-accent-dark font-black hover:underline">Log In</button></p>
        </div>
      </div>
    </div>
  );
};

// --- ProfilePage ---
const ProfilePage = ({ user, onPageChange, onUpdateUser, onLogout }: any) => {
  if (!user) return null;
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const orders = mockStore.getUserOrders(user.id);

  const handleSave = () => {
    onUpdateUser({ ...user, name: editedName, email: editedEmail });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-6 py-24 space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="flex items-center space-x-8">
          <div className="w-32 h-32 rounded-[2.5rem] bg-luxe-accent-light dark:bg-luxe-accent-dark flex items-center justify-center text-5xl font-black text-white shadow-2xl">
            {user.name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div className="space-y-3">
            {isEditing ? (
              <div className="space-y-4 max-w-md">
                <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="w-full bg-luxe-light dark:bg-luxe-dark border border-slate-200 dark:border-white/10 rounded-xl px-6 py-3 font-bold text-3xl outline-none text-luxe-text-brandLight dark:text-luxe-text-brandDark" />
                <input type="email" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} className="w-full bg-luxe-light dark:bg-luxe-dark border border-slate-200 dark:border-white/10 rounded-xl px-6 py-2 text-slate-500 outline-none" />
              </div>
            ) : (
              <>
                <h1 className="text-6xl font-black tracking-tighter text-luxe-text-brandLight dark:text-luxe-text-brandDark">{user.name}</h1>
                <p className="text-xl text-slate-500 font-medium">{user.email}</p>
                <div className="flex items-center space-x-2">
                   <span className="bg-luxe-accent-light/10 text-luxe-accent-light dark:text-luxe-accent-dark px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{user.role}</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={onLogout} className="glass border-red-500/20 text-red-500 px-8 py-4 rounded-2xl font-black hover:bg-red-500/10 transition-all flex items-center space-x-2">
            <LogOut size={18} />
            <span>Secure Logout</span>
          </button>
          {isEditing ? (
            <button onClick={handleSave} className="bg-luxe-accent-light dark:bg-luxe-accent-dark text-white px-8 py-4 rounded-2xl font-black flex items-center space-x-2 shadow-xl"><Save size={18} /><span>Apply Changes</span></button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="glass border-slate-200 dark:border-white/10 px-8 py-4 rounded-2xl font-black text-luxe-text-brandLight dark:text-luxe-text-brandDark hover:bg-white/10 transition-all flex items-center space-x-2"><Edit3 size={18} /><span>Edit Identity</span></button>
          )}
        </div>
      </div>
      <div className="space-y-12">
        <h2 className="text-8xl md:text-[8rem] font-black tracking-tighter uppercase leading-[0.8] opacity-10">TRANSFERS</h2>
        <div className="grid grid-cols-1 gap-6">
          {orders.map((o: Order) => (
            <div key={o.id} className="bg-luxe-card-light dark:bg-luxe-card-dark p-10 rounded-[2rem] border border-slate-200 dark:border-white/5 flex justify-between items-center group">
               <div>
                  <p className="text-luxe-accent-light dark:text-luxe-accent-dark font-black text-xs uppercase tracking-widest mb-2">{o.id}</p>
                  <p className="text-2xl font-bold text-luxe-text-brandLight dark:text-luxe-text-brandDark">{o.items.length} Machines Transferred</p>
                  <p className="text-slate-500 text-sm">{new Date(o.createdAt).toLocaleDateString()}</p>
               </div>
               <div className="text-right">
                  <p className="text-3xl font-black text-luxe-text-brandLight dark:text-luxe-text-brandDark">${o.total}</p>
                  <span className="text-[10px] font-black uppercase bg-luxe-accent-light/10 text-luxe-accent-light dark:text-luxe-accent-dark px-2 py-1 rounded-lg">{o.status}</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- CartPage ---
const CartPage = ({ cart, total, onUpdateQty, onRemove, onCheckout }: any) => {
  return (
    <div className="container mx-auto px-6 py-24 min-h-[70vh]">
       <div className="border-t-4 border-luxe-text-brandLight dark:border-luxe-text-brandDark pt-12 mb-20">
          <h2 className="text-8xl font-black tracking-tighter uppercase leading-[0.8]">BAG</h2>
       </div>
       {cart.length === 0 ? (
         <div className="text-center py-20">
           <ShoppingBag size={64} className="mx-auto text-slate-300 mb-6" />
           <p className="text-2xl font-bold text-slate-500">Your bag is currently empty.</p>
         </div>
       ) : (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2 space-y-8">
               {cart.map((item: CartItem) => (
                 <div key={item.id} className="bg-luxe-card-light dark:bg-luxe-card-dark p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 flex items-center space-x-10">
                    <img src={item.images[0]} className="w-32 h-32 object-contain" />
                    <div className="flex-1 space-y-2">
                       <h3 className="text-2xl font-black text-luxe-text-brandLight dark:text-luxe-text-brandDark">{item.model}</h3>
                       <p className="text-luxe-accent-light dark:text-luxe-accent-dark font-bold">${item.price}</p>
                       <div className="flex items-center space-x-4">
                          <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 glass border border-slate-200 dark:border-white/10 rounded-lg text-luxe-text-brandLight dark:text-luxe-text-brandDark"><Minus size={16}/></button>
                          <span className="font-bold text-luxe-text-brandLight dark:text-luxe-text-brandDark">{item.quantity}</span>
                          <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 glass border border-slate-200 dark:border-white/10 rounded-lg text-luxe-text-brandLight dark:text-luxe-text-brandDark"><Plus size={16}/></button>
                       </div>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-red-500 hover:bg-red-500/10 p-4 rounded-full transition-all"><Trash2 /></button>
                 </div>
               ))}
            </div>
            <div className="bg-luxe-card-light dark:bg-luxe-card-dark p-10 rounded-[3rem] h-fit sticky top-32 border border-luxe-accent-light/10 bg-luxe-accent-light/5 shadow-xl">
               <h3 className="text-3xl font-black mb-8 text-luxe-text-brandLight dark:text-luxe-text-brandDark">Summary</h3>
               <div className="space-y-4 mb-10">
                  <div className="flex justify-between font-bold text-slate-500 uppercase text-xs"><span>Subtotal</span><span>${total}</span></div>
                  <div className="flex justify-between font-bold text-slate-500 uppercase text-xs"><span>Express Delivery</span><span>Included</span></div>
                  <div className="h-[1px] bg-slate-900/10 dark:bg-white/10" />
                  <div className="flex justify-between text-4xl font-black pt-4 text-luxe-text-brandLight dark:text-luxe-text-brandDark"><span>Total</span><span>${total}</span></div>
               </div>
               <button onClick={onCheckout} className="w-full bg-luxe-accent-light dark:bg-luxe-accent-dark hover:opacity-90 text-white py-6 rounded-2xl font-black text-xl shadow-2xl">Checkout Now</button>
            </div>
         </div>
       )}
    </div>
  );
};

// --- ProductDetailsPage ---
const ProductDetailsPage = ({ laptop, user, onAddToCart, notify, onOpenConcierge }: any) => {
  return (
    <div className="container mx-auto px-6 py-24 space-y-24 min-h-[80vh]">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="bg-luxe-card-light dark:bg-luxe-card-dark p-20 rounded-[4rem] border border-slate-200 dark:border-white/5 flex items-center justify-center shadow-2xl">
             <img src={laptop.images[0]} className="max-w-full drop-shadow-2xl" />
          </div>
          <div className="space-y-10">
             <div className="space-y-4">
                <p className="text-luxe-accent-light dark:text-luxe-accent-dark font-black tracking-widest uppercase text-xs">{laptop.brand}</p>
                <h1 className="text-7xl font-black tracking-tighter leading-none text-luxe-text-brandLight dark:text-luxe-text-brandDark">{laptop.model}</h1>
                <p className="text-5xl font-black text-luxe-text-brandLight dark:text-luxe-text-brandDark">${laptop.price}</p>
             </div>
             <p className="text-xl text-slate-500 leading-relaxed font-medium">{laptop.description}</p>
             <div className="grid grid-cols-2 gap-6">
                <div className="bg-luxe-card-light dark:bg-luxe-card-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 flex items-center space-x-4">
                   <Cpu className="text-luxe-accent-light dark:text-luxe-accent-dark" />
                   <div><p className="text-[10px] font-black uppercase text-slate-500">Processor</p><p className="font-bold text-luxe-text-brandLight dark:text-luxe-text-brandDark">{laptop.cpu}</p></div>
                </div>
                <div className="bg-luxe-card-light dark:bg-luxe-card-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 flex items-center space-x-4">
                   <Monitor className="text-purple-500" />
                   <div><p className="text-[10px] font-black uppercase text-slate-500">Memory</p><p className="font-bold text-luxe-text-brandLight dark:text-luxe-text-brandDark">{laptop.ram} Elite</p></div>
                </div>
             </div>
             <div className="flex flex-col space-y-4">
                <button onClick={onAddToCart} className="w-full bg-luxe-accent-light dark:bg-luxe-accent-dark text-white py-6 rounded-3xl font-black text-2xl flex items-center justify-center space-x-4 shadow-2xl transition-all hover:scale-105 active:scale-95">
                    <ShoppingBag size={28} />
                    <span>Add to Bag</span>
                </button>
                <button onClick={onOpenConcierge} className="w-full glass bg-luxe-accent-light/10 border border-luxe-accent-light/20 text-luxe-accent-light dark:text-luxe-accent-dark py-4 rounded-2xl font-black text-sm flex items-center justify-center space-x-2">
                    <Sparkles size={18} />
                    <span>Voice Consult Concierge</span>
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default App;
