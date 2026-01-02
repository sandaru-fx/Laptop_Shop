
import React from 'react';
import { Monitor, Mail, Phone, MapPin, Linkedin, Twitter, Github, Instagram, ArrowUpRight, Cpu } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: string) => void;
  isAdmin?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onPageChange, isAdmin }) => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/5 pt-24 pb-12 transition-colors duration-500">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => onPageChange('home')}>
              <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
                <Monitor className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">Luxe<span className="text-blue-500">Laptops</span></span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">
              Redefining premium computing since 2024. Providing the world's elite with verified, high-performance hardware.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 glass rounded-xl text-slate-400 hover:text-blue-500 hover:border-blue-500/30 transition-all"><Twitter size={18} /></a>
              <a href="#" className="p-3 glass rounded-xl text-slate-400 hover:text-blue-700 hover:border-blue-700/30 transition-all"><Linkedin size={18} /></a>
              <a href="#" className="p-3 glass rounded-xl text-slate-400 hover:text-pink-500 hover:border-pink-500/30 transition-all"><Instagram size={18} /></a>
              <a href="#" className="p-3 glass rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"><Github size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Navigation</h4>
            <ul className="space-y-4">
              <li><button onClick={() => onPageChange('shop')} className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-white font-bold transition-colors flex items-center group">Catalog <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all" /></button></li>
              <li><button onClick={() => onPageChange('about')} className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-white font-bold transition-colors flex items-center group">About Us <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all" /></button></li>
              <li><button onClick={() => onPageChange('home')} className="text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-white font-bold transition-colors flex items-center group">Philosophy <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all" /></button></li>
              {isAdmin && <li><button onClick={() => onPageChange('admin')} className="text-blue-500 font-bold hover:underline transition-colors flex items-center group">Admin Command <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all" /></button></li>}
            </ul>
          </div>

          {/* Contact Node */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">Contact Node</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <MapPin className="text-blue-500 mt-1" size={18} />
                <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">Infinite Loop, 1, Silicon Valley, CA 95014</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="text-blue-500" size={18} />
                <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">+1 (888) LUXE-TECH</span>
              </li>
              <li className="flex items-center space-x-4">
                <Mail className="text-blue-500" size={18} />
                <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">concierge@luxelaptops.com</span>
              </li>
            </ul>
          </div>

          {/* Status Panel */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">System Status</h4>
            <div className="glass p-6 rounded-[2rem] border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Core Network</span>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black text-green-500 uppercase">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Global Logistics</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Fast Transfer Active</span>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center space-x-2 text-blue-400">
                <Cpu size={14} />
                <span className="text-[9px] font-black uppercase tracking-widest">Powered by G3 Pro</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
            © 2024 LuxeLaptops Industrial. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 transition-colors">Privacy Protocol</button>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 transition-colors">Service Terms</button>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 transition-colors">Cookie Vault</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
