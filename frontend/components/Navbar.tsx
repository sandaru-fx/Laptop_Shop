
import React, { useState, useEffect } from 'react';
import { ShoppingBag, User, LogOut, Menu, X, LayoutDashboard, Monitor, Sun, Moon, ChevronRight, Sparkles } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  onPageChange: (page: string) => void;
  cartCount: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  user: UserType | null;
  onLogout: () => void;
  onOpenConcierge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onPageChange, cartCount, theme, onToggleTheme, user, onLogout, onOpenConcierge }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-4 backdrop-blur-xl bg-luxe-light/90 dark:bg-luxe-dark/90 border-b border-slate-200 dark:border-white/5 shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-10 flex items-center justify-between">
        {/* Branding */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => onPageChange(user ? 'home' : 'landing')}
        >
          <div className="bg-luxe-accent-light dark:bg-luxe-accent-dark p-2 rounded-xl group-hover:scale-110 transition-transform">
            <Monitor className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-luxe-text-brandLight dark:text-luxe-text-brandDark uppercase">Luxe<span className="text-luxe-accent-light dark:text-luxe-accent-dark">Laptops</span></span>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center space-x-12">
          {user ? (
            <>
              <button onClick={() => onPageChange('home')} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-luxe-accent-light dark:hover:text-luxe-accent-dark transition-colors">Workspace</button>
              <button onClick={() => onPageChange('shop')} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-luxe-accent-light dark:hover:text-luxe-accent-dark transition-colors">Catalog</button>
              <button onClick={onOpenConcierge} className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 flex items-center space-x-2 group">
                <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                <span>AI Concierge</span>
              </button>
              {user.role === 'ADMIN' && (
                <button onClick={() => onPageChange('admin')} className="text-[10px] font-black uppercase tracking-[0.2em] text-luxe-accent-light dark:text-luxe-accent-dark flex items-center space-x-1 group">
                  <LayoutDashboard size={14} />
                  <span>Command Center</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </>
          ) : (
            <>
              <button onClick={() => onPageChange('landing')} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-luxe-accent-light dark:hover:text-luxe-accent-dark transition-colors">Philosophy</button>
              <button onClick={() => onPageChange('about')} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-luxe-accent-light dark:hover:text-luxe-accent-dark transition-colors">Precision</button>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <button onClick={onToggleTheme} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-all text-slate-500">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={() => onPageChange('cart')}
            className="relative p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-all text-slate-500"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-luxe-accent-light dark:bg-luxe-accent-dark text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-white/10" />

          {user ? (
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onPageChange('profile')}
                className="flex items-center space-x-3 bg-luxe-card-light dark:bg-luxe-card-dark px-5 py-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all border border-slate-200 dark:border-white/10 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-luxe-accent-light dark:bg-luxe-accent-dark flex items-center justify-center text-white text-xs font-black">
                  {user.name[0]}
                </div>
                <span className="text-xs font-black uppercase tracking-widest hidden md:block text-luxe-text-brandLight dark:text-luxe-text-brandDark">{user.name.split(' ')[0]}</span>
              </button>
              <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onPageChange('login')}
              className="bg-luxe-accent-light dark:bg-luxe-accent-dark hover:opacity-90 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.1em] shadow-lg transition-all active:scale-95"
            >
              Initialize Access
            </button>
          )}

          <button className="lg:hidden p-2 text-luxe-text-brandLight dark:text-luxe-text-brandDark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
};
