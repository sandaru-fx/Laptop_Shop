
import React, { useState } from 'react';
import { ContactVisual } from '../components/ThreeElements';
import { Mail, Phone, MapPin, Send, MessageSquare, Linkedin, Twitter } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-6xl font-black">Get in <span className="text-blue-500">Touch</span></h1>
            <p className="text-slate-400 text-xl max-w-md">
              Have questions about your next workstation? Our elite support team is ready to assist you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-6 glass p-6 rounded-3xl border-white/5 hover:border-blue-500/20 transition-all">
              <div className="bg-blue-600/20 p-4 rounded-2xl text-blue-400">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Support Email</p>
                <p className="text-lg font-bold">concierge@luxelaptops.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 glass p-6 rounded-3xl border-white/5 hover:border-purple-500/20 transition-all">
              <div className="bg-purple-600/20 p-4 rounded-2xl text-purple-400">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Hotline</p>
                <p className="text-lg font-bold">+1 (888) LUXE-TECH</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 glass p-6 rounded-3xl border-white/5 hover:border-indigo-500/20 transition-all">
              <div className="bg-indigo-600/20 p-4 rounded-2xl text-indigo-400">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Headquarters</p>
                <p className="text-lg font-bold">Infinite Loop, Silicon Valley, CA</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
             <button className="p-4 glass rounded-2xl hover:bg-blue-600/20 transition-all"><Linkedin /></button>
             <button className="p-4 glass rounded-2xl hover:bg-blue-400/20 transition-all"><Twitter /></button>
          </div>
        </div>

        <div className="relative">
          {submitted ? (
            <div className="glass p-12 rounded-[3rem] text-center space-y-6 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto text-green-400">
                <Send size={40} />
              </div>
              <h2 className="text-3xl font-black">Message Sent!</h2>
              <p className="text-slate-400">Your signal has been received. We'll get back to you within 4 hours.</p>
              <button onClick={() => setSubmitted(false)} className="text-blue-400 font-bold hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass p-10 rounded-[3rem] border-white/10 space-y-6 shadow-2xl relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500 ml-1">Full Name</label>
                  <input type="text" required className="w-full glass bg-slate-900 border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-slate-500 ml-1">Email</label>
                  <input type="email" required className="w-full glass bg-slate-900 border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 ml-1">Subject</label>
                <select className="w-full glass bg-slate-900 border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/50">
                   <option>General Inquiry</option>
                   <option>Sales Support</option>
                   <option>Technical Assistance</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500 ml-1">Message</label>
                <textarea rows={4} required className="w-full glass bg-slate-900 border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 resize-none" />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-5 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 shadow-xl shadow-blue-900/40 transition-all active:scale-95">
                <Send size={20} />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
          <div className="absolute -top-24 -right-24 -z-10 opacity-50">
            <ContactVisual />
          </div>
        </div>
      </div>
    </div>
  );
};
