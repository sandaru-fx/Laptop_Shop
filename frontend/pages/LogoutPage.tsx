
import React, { useState } from 'react';
import { LogOut, ArrowLeft, ShieldCheck, Lock, Loader2 } from 'lucide-react';

interface LogoutPageProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const LogoutPage: React.FC<LogoutPageProps> = ({ onConfirm, onCancel }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleLogout = () => {
    setIsExiting(true);
    setTimeout(() => {
      onConfirm();
    }, 1500);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full text-center opacity-[0.02] dark:opacity-[0.05] pointer-events-none select-none -translate-y-1/2">
        <h1 className="text-[25vw] font-black">EXIT</h1>
      </div>

      <div className="glass w-full max-w-lg p-12 md:p-16 rounded-[4rem] border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 shadow-2xl relative z-10 animate-in zoom-in duration-500">
        <div className="text-center space-y-6 mb-12">
          <div className="mx-auto w-24 h-24 bg-red-600/10 rounded-[2.5rem] flex items-center justify-center text-red-500 shadow-xl shadow-red-500/10 mb-8 animate-pulse">
            <Lock size={40} />
          </div>
          <h2 className="text-5xl font-black tracking-tighter">Terminate Session</h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed italic">
            "Every legacy begins with a single step, and every session must securely end."
          </p>
        </div>

        <div className="space-y-6">
          <button 
            onClick={handleLogout}
            disabled={isExiting}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-[2rem] font-black text-xl transition-all active:scale-95 shadow-2xl shadow-red-900/30 flex items-center justify-center space-x-3 disabled:opacity-50 group"
          >
            {isExiting ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <LogOut size={24} className="group-hover:-translate-x-1 transition-transform" />
            )}
            <span>{isExiting ? 'Purging Session Data...' : 'Confirm Logout'}</span>
          </button>

          <button 
            onClick={onCancel}
            disabled={isExiting}
            className="w-full glass border-slate-200 dark:border-white/10 py-5 rounded-[2rem] font-black text-slate-800 dark:text-white hover:bg-white/5 transition-all flex items-center justify-center space-x-2"
          >
            <ArrowLeft size={18} />
            <span>Return to Workspace</span>
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center space-x-3 opacity-30">
          <ShieldCheck size={14} className="text-green-500" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Encryption Active</span>
        </div>
      </div>
    </div>
  );
};
