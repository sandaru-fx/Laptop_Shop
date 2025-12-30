import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, LogIn, Cpu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-7xl px-8 py-4 flex justify-between items-center backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl">
      <Link to="/" className="flex items-center gap-3 text-2xl font-black tracking-tighter">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
          <Cpu className="text-black" size={24} />
        </div>
        <span className="hidden sm:block">PCC CORE</span>
      </Link>

      <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-gray-400">
        <Link to="/" className="hover:text-white transition-colors">Innovations</Link>
        <Link to="/products" className="hover:text-white transition-colors">Inventory</Link>
        <Link to="/about" className="hover:text-white transition-colors">Legacy</Link>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-white transition-colors relative">
          <ShoppingCart size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></span>
        </button>
        <Link to="/login" className="flex items-center gap-2 px-6 py-2 bg-white text-black hover:bg-white/90 rounded-full font-bold transition-all text-sm">
          <LogIn size={16} />
          <span>Access</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
