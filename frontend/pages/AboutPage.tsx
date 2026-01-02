
import React from 'react';
import { AboutVisual } from '../components/ThreeElements';
import { ShieldCheck, Cpu, Globe, Users, Zap, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pb-24">
      <section className="relative pt-20 overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full border border-blue-500/30">
              <Award size={16} className="text-blue-400" />
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-widest">Est. 2024</span>
            </div>
            <h1 className="text-6xl font-black leading-tight">
              Our Vision for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Future of Tech</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              LuxeLaptops isn't just a store; it's a movement. We believe that everyone deserves access to high-performance computing without compromise.
            </p>
          </div>
          <div className="relative animate-in zoom-in duration-1000">
            <AboutVisual />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Cpu className="text-blue-400" />, title: "Precision Hardware", desc: "Every unit is inspected for thermal efficiency and performance stability." },
            { icon: <Globe className="text-purple-400" />, title: "Global Reach", desc: "Shipping premium hardware to over 50 countries with local support hubs." },
            { icon: <ShieldCheck className="text-green-400" />, title: "Luxe Secure", desc: "Industry-leading data protection and device authentication standards." }
          ].map((item, i) => (
            <div key={i} className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-blue-500/30 transition-all group">
              <div className="bg-white/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass border-y border-white/5 py-24">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="text-5xl font-black text-blue-400 mb-2">15k+</p>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Happy Users</p>
          </div>
          <div>
            <p className="text-5xl font-black text-purple-400 mb-2">250+</p>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Laptop Models</p>
          </div>
          <div>
            <p className="text-5xl font-black text-indigo-400 mb-2">99.9%</p>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Reliability Rate</p>
          </div>
          <div>
            <p className="text-5xl font-black text-blue-600 mb-2">24/7</p>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Expert Support</p>
          </div>
        </div>
      </section>
    </div>
  );
};
