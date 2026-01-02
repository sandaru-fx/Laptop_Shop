import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ThreeBackground from '../components/ThreeBackground';
import { Laptop, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-slate-950">
      <ThreeBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-20 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-tight"
        >
          FUTURE OF <br /> PERFORMANCE.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light tracking-wide"
        >
          Experience the pinnacle of computing technology. Handcrafted for enthusiasts, powered by innovation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Link to="/signup" className="px-10 py-4 bg-white text-black hover:bg-white/90 rounded-full font-bold transition-all flex items-center justify-center gap-2 group">
            Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
          <button className="px-10 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full font-bold border border-white/10 transition-all">
            Explore Collection
          </button>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-24 grid md:grid-cols-3 gap-10 relative z-10">
        {[
          { icon: <Laptop className="text-white" size={32} />, title: "Elite Hardware", desc: "Sourced from the most reliable tech giants globally." },
          { icon: <Cpu className="text-white" size={32} />, title: "Extreme Power", desc: "Configured for maximum efficiency and speed." },
          { icon: <ShieldCheck className="text-white" size={32} />, title: "Secure Trust", desc: "Official warranty and 24/7 dedicated tech support." }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-10 bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] hover:bg-white/10 transition-all cursor-default"
          >
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default LandingPage;
