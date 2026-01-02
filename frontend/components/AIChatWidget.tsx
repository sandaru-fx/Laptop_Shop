
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { MessageSquare, Send, X, Bot, Loader2, Brain, Zap, BrainCircuit, User } from 'lucide-react';
import { mockStore, Message } from '../services/mockStore';

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState<'ai' | 'support'>('ai');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; isThinking?: boolean }[]>([]);
  const [liveMessages, setLiveMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, liveMessages, isLoading]);

  useEffect(() => {
    if (chatMode === 'support') {
      const interval = setInterval(() => {
        setLiveMessages([...mockStore.getMessages()]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [chatMode]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput = input;
    setInput('');

    if (chatMode === 'support') {
      mockStore.sendMessage(userInput, false);
      setLiveMessages([...mockStore.getMessages()]);
      return;
    }

    // AI Mode
    setMessages(prev => [...prev, { role: 'user', text: userInput }]);
    setIsLoading(true);

    try {
      // Fix: Always use process.env.API_KEY directly for GoogleGenAI initialization
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const config: any = {
        tools: [{ googleSearch: {} }],
        systemInstruction: `You are the LuxeLaptops AI Assistant. Focus on technical hardware specs and professional advice.`,
      };
      if (isThinkingMode) config.thinkingConfig = { thinkingBudget: 16000 };

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userInput,
        config: config
      });

      // Correctly access .text property from GenerateContentResponse
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: response.text || 'Protocol error.',
        isThinking: isThinkingMode
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Uplink offline. Try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[150] flex flex-col items-end">
      {isOpen ? (
        <div className="bg-luxe-card-light dark:bg-luxe-card-dark w-[400px] h-[600px] rounded-[3rem] border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8">
          {/* Toggle Header */}
          <div className="p-6 border-b border-slate-200 dark:border-white/5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-widest text-luxe-text-brandLight dark:text-luxe-text-brandDark">Support Interface</h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-red-500 transition-colors"><X size={20} /></button>
            </div>
            <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl">
              <button 
                onClick={() => setChatMode('ai')}
                className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${chatMode === 'ai' ? 'bg-luxe-accent-light text-white shadow-lg' : 'text-slate-500'}`}
              >
                G3 AI Bot
              </button>
              <button 
                onClick={() => setChatMode('support')}
                className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${chatMode === 'support' ? 'bg-luxe-accent-light text-white shadow-lg' : 'text-slate-500'}`}
              >
                Live Support
              </button>
            </div>
          </div>

          {/* Chat Container */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-luxe-light dark:bg-luxe-dark/50">
            {chatMode === 'ai' ? (
              messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-luxe-accent-light text-white rounded-tr-none' : 'bg-slate-200 dark:bg-white/10 text-luxe-text-brandLight dark:text-luxe-text-brandDark rounded-tl-none'}`}>
                    <p className="text-sm font-medium">{m.text}</p>
                  </div>
                </div>
              ))
            ) : (
              liveMessages.map((m, i) => (
                <div key={i} className={`flex ${!m.isAdmin ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl ${!m.isAdmin ? 'bg-luxe-accent-light text-white rounded-tr-none' : 'bg-slate-200 dark:bg-white/10 text-luxe-text-brandLight dark:text-luxe-text-brandDark rounded-tl-none'}`}>
                    <p className="text-sm font-medium">{m.text}</p>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start items-center space-x-2 text-luxe-accent-light">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-[10px] font-black uppercase">Thinking...</span>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <form onSubmit={handleSendMessage} className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-white/5 flex gap-3">
            <input 
              className="flex-1 bg-luxe-card-light dark:bg-luxe-card-dark border border-slate-200 dark:border-white/10 p-4 rounded-2xl text-sm outline-none"
              placeholder={chatMode === 'ai' ? "Ask the AI..." : "Message Admin..."}
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit" className="bg-luxe-accent-light text-white p-4 rounded-2xl shadow-lg">
              <Send size={20} />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-luxe-accent-light p-6 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all text-white border-4 border-luxe-light dark:border-luxe-dark"
        >
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
};
