
import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap, Globe, ShoppingBag, Terminal, Sparkles, Star, Gift, Cpu, Snowflake } from 'lucide-react';

interface LandingPageProps {
  onPageChange: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onPageChange }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="bg-luxe-light dark:bg-luxe-dark overflow-x-hidden transition-colors duration-1000 min-h-screen">
      {/* Background Magical Glow */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 transition-transform duration-75"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 113, 227, 0.15) 0%, transparent 50%)`
        }}
      />

      {/* Mega Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 pb-20 z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] dark:opacity-[0.05] select-none">
          <h1 className="text-[20vw] font-black leading-none whitespace-nowrap text-luxe-text-brandLight dark:text-luxe-text-brandDark">WONDER</h1>
        </div>

        <div className="container mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative">
          <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center space-x-3 bg-red-600/10 px-6 py-2.5 rounded-full border border-red-500/30">
              <Gift size={18} className="text-red-600 animate-pulse" />
              <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em]">Signature Holiday Tier 2025</span>
            </div>
            
            <h1 className="text-7xl md:text-8xl lg:text-[8.5rem] font-black leading-[0.85] tracking-tighter text-luxe-text-brandLight dark:text-luxe-text-brandDark">
              UNWRAP THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-luxe-accent-light to-luxe-accent-dark dark:via-luxe-accent-dark">MAGIC OF PRO.</span>
            </h1>

            <p className="text-2xl text-slate-500 dark:text-luxe-text-bodyDark max-w-xl leading-relaxed font-medium">
              Elite hardware presented with timeless wonder. <br /> 
              <span className="text-luxe-accent-light dark:text-luxe-accent-dark font-bold">Discover the pinnacle of technical achievement for every generation.</span>
            </p>

            <div className="flex flex-wrap gap-6 pt-6">
              <button 
                onClick={() => onPageChange('login')}
                className="bg-luxe-accent-light dark:bg-luxe-accent-dark hover:opacity-90 text-white px-12 py-5 rounded-3xl font-black text-lg flex items-center space-x-3 transition-all shadow-2xl hover:-translate-y-1 active:scale-95 group"
              >
                <span>Initialize Access</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={() => onPageChange('shop')}
                className="bg-luxe-card-light dark:bg-luxe-card-dark border border-slate-300 dark:border-white/10 px-12 py-5 rounded-3xl font-black text-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-luxe-text-brandLight dark:text-luxe-text-brandDark shadow-sm"
              >
                Explore Catalog
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block relative group animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-luxe-accent-light/10 rounded-full blur-[120px] -z-10" />
            
            <div className="relative glass p-6 rounded-[5rem] bg-luxe-card-light dark:bg-luxe-card-dark border-slate-200 dark:border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.2)] transform transition-all duration-700 group-hover:scale-[1.03] overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1543589077-47d81606c1ad?q=80&w=2070&auto=format&fit=crop" 
                 alt="Santa and children with laptop"
                 className="rounded-[4rem] w-full h-[700px] object-cover shadow-2xl"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-40 container mx-auto px-10 relative">
         <div className="border-t-4 border-luxe-text-brandLight dark:border-luxe-text-brandDark pt-20 mb-32 flex flex-col md:flex-row justify-between items-baseline gap-10">
            <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter uppercase leading-none text-luxe-text-brandLight dark:text-luxe-text-brandDark">LEGACY</h2>
            <p className="text-2xl max-w-md text-slate-500 font-medium italic border-l-4 border-luxe-accent-light dark:border-luxe-accent-dark pl-8">
              "We don't sell machines. We deliver the tools that shape the next generation's imagination."
            </p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <FeatureCard 
               icon={<Zap size={32}/>} 
               title="Velocity" 
               desc="Sub-zero latency and peak performance metrics. Built for those who demand the fastest response times."
               color="blue"
            />
            <FeatureCard 
               icon={<ShieldCheck size={32}/>} 
               title="Fortress" 
               desc="Hardware-level biometric encryption. Your creative IP stays protected within our secure silicon vaults."
               color="blue"
            />
            <FeatureCard 
               icon={<Sparkles size={32}/>} 
               title="Wonder" 
               desc="Obsidian glass displays and hand-sculpted aluminum. A tactile experience that transcends utility."
               color="blue"
            />
         </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => {
  return (
    <div className="space-y-8 group hover:-translate-y-4 transition-transform duration-500">
      <div className="w-20 h-20 bg-luxe-accent-light dark:bg-luxe-accent-dark text-white rounded-[2rem] flex items-center justify-center group-hover:rotate-12 transition-transform shadow-2xl">
        {icon}
      </div>
      <h3 className="text-5xl font-black uppercase tracking-tighter text-luxe-text-brandLight dark:text-luxe-text-brandDark group-hover:text-luxe-accent-light dark:group-hover:text-luxe-accent-dark transition-colors">{title}</h3>
      <p className="text-xl text-slate-500 dark:text-luxe-text-bodyDark leading-relaxed font-medium">{desc}</p>
    </div>
  );
};
