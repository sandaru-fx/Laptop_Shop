
import React from 'react';
import { ArrowRight, Star, ShieldCheck, Zap, Truck, ShoppingBag, Sparkles, Cpu, Layers, MessageCircle, Mic } from 'lucide-react';
import { INITIAL_LAPTOPS } from '../constants';
import { Laptop } from '../types';

interface HomePageProps {
  onPageChange: (page: string) => void;
  onProductClick: (id: string) => void;
  onOpenConcierge: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onPageChange, onProductClick, onOpenConcierge }) => {
  const featured = INITIAL_LAPTOPS.filter(l => l.isFeatured);

  return (
    <div className="space-y-32 pb-40 pt-20 animate-in fade-in duration-1000">
      {/* Official Header Banner */}
      <section className="container mx-auto px-10">
        <div className="glass bg-white/40 dark:bg-slate-900/40 p-16 rounded-[4rem] border-slate-200 dark:border-white/5 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-10">
            <div className="inline-flex items-center space-x-3 bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-blue-600/20">
              <Sparkles size={14} />
              <span>Flagship Curation v2.5</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.85] text-slate-900 dark:text-white">
              UNCOMPROMISED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">POWER.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
              Authorized access to the world's most capable hardware. Performance metrics validated. Ready for deployment.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <button 
                onClick={() => onPageChange('shop')}
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-12 py-6 rounded-[2rem] font-black text-xl flex items-center space-x-4 shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <span>View Full Catalog</span>
                <ArrowRight size={24} />
              </button>
              <button 
                onClick={onOpenConcierge}
                className="glass bg-indigo-600/10 text-indigo-500 border-indigo-500/20 px-10 py-6 rounded-[2rem] font-black text-sm flex items-center space-x-3 transition-all hover:bg-indigo-600 hover:text-white group"
              >
                <div className="relative">
                  <Mic size={20} className="group-hover:scale-110 transition-transform" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </div>
                <span>Neural Voice Consult</span>
              </button>
            </div>
          </div>
          <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-[60%] opacity-20 dark:opacity-40 group-hover:scale-110 transition-transform duration-[4s] pointer-events-none">
             <h1 className="text-[30rem] font-black tracking-tighter select-none">M3</h1>
          </div>
        </div>
      </section>

      {/* Discovery Categories */}
      <section className="container mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           <CategoryCard title="Workstations" count="12 Models" icon={<Cpu />} color="from-blue-600" />
           <CategoryCard title="Gaming Hub" count="8 Models" icon={<Zap />} color="from-purple-600" />
           <CategoryCard title="UltraPortables" count="15 Models" icon={<Layers />} color="from-indigo-600" />
        </div>
      </section>

      {/* Recommended Selection */}
      <section className="container mx-auto px-10">
        <div className="border-t border-slate-200 dark:border-white/10 pt-20 flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="space-y-4">
             <h2 className="text-8xl font-black tracking-tighter uppercase leading-[0.8] opacity-10 mb-4">ELITE TIER</h2>
             <h3 className="text-4xl font-black uppercase tracking-tight">Verified Performance</h3>
             <p className="text-xl text-slate-500 font-medium italic">"Precision isn't an option, it's the standard."</p>
          </div>
          <button onClick={() => onPageChange('shop')} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-3 hover:opacity-80 transition-all">
            <span>Access Global Vault</span>
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {featured.map((laptop: Laptop) => (
            <div 
              key={laptop.id}
              onClick={() => onProductClick(laptop.id)}
              className="group cursor-pointer space-y-10"
            >
              <div className="aspect-[4/3] glass bg-slate-50 dark:bg-white/5 rounded-[4rem] overflow-hidden border-slate-200 dark:border-white/5 p-16 flex items-center justify-center transition-all group-hover:shadow-[0_40px_100px_rgba(59,130,246,0.15)] group-hover:-translate-y-4 duration-500">
                <img 
                  src={laptop.images[0]} 
                  alt={laptop.model}
                  className="max-w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="space-y-6 px-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] mb-2">{laptop.brand}</p>
                    <h3 className="text-4xl font-black tracking-tighter leading-none">{laptop.model}</h3>
                  </div>
                  <p className="text-3xl font-light text-slate-400 font-mono">${laptop.price}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
                   <div className="flex space-x-1 text-orange-400">
                     {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                   </div>
                   <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-green-500 tracking-widest">
                      <ShieldCheck size={14} />
                      <span>Verified Hardware</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Infrastructure */}
      <section className="py-32 border-y border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="flex items-start space-x-10 group">
              <div className="w-24 h-24 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center flex-shrink-0 shadow-2xl shadow-blue-600/30 group-hover:rotate-12 transition-transform duration-500"><Truck size={40}/></div>
              <div className="space-y-3">
                <h4 className="text-2xl font-black uppercase tracking-tight">LOGISTICS</h4>
                <p className="text-slate-500 font-medium leading-relaxed">Priority global transfer nodes ensuring 48-hour delivery across all continents.</p>
              </div>
            </div>
            <div className="flex items-start space-x-10 group">
              <div className="w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center flex-shrink-0 shadow-2xl shadow-indigo-600/30 group-hover:rotate-12 transition-transform duration-500"><ShieldCheck size={40}/></div>
              <div className="space-y-3">
                <h4 className="text-2xl font-black uppercase tracking-tight">ASSURANCE</h4>
                <p className="text-slate-500 font-medium leading-relaxed">36-Month Hardware Protection Plan included with every verified purchase.</p>
              </div>
            </div>
            <div className="flex items-start space-x-10 group">
              <div className="w-24 h-24 bg-purple-600 text-white rounded-[2rem] flex items-center justify-center flex-shrink-0 shadow-2xl shadow-purple-600/30 group-hover:rotate-12 transition-transform duration-500"><ShoppingBag size={40}/></div>
              <div className="space-y-3">
                <h4 className="text-2xl font-black uppercase tracking-tight">CURATION</h4>
                <p className="text-slate-500 font-medium leading-relaxed">Only devices that meet our strict "Zero-Defect" performance benchmarks are listed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CategoryCard = ({ title, count, icon, color }: any) => (
  <div className={`glass p-12 rounded-[3.5rem] border-white/10 bg-gradient-to-br ${color}/10 to-transparent hover:scale-[1.03] hover:-translate-y-2 transition-all cursor-pointer group shadow-xl`}>
    <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${color} to-indigo-600 flex items-center justify-center text-white mb-10 shadow-2xl shadow-indigo-600/20 group-hover:scale-110 transition-transform`}>
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <h3 className="text-4xl font-black tracking-tighter leading-none mb-4">{title}</h3>
    <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] opacity-60">{count} Available Units</p>
  </div>
);
