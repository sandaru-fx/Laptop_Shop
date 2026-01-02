
import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, X, Bell } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: { icon: <CheckCircle2 className="text-green-400" />, border: 'border-l-green-500' },
    error: { icon: <XCircle className="text-red-400" />, border: 'border-l-red-500' },
    info: { icon: <Bell className="text-blue-400" />, border: 'border-l-blue-500' }
  };

  return (
    <div className={`fixed bottom-8 right-8 z-[100] px-6 py-4 rounded-2xl glass flex items-center space-x-4 shadow-2xl animate-in slide-in-from-right duration-500 border-l-4 ${styles[type].border}`}>
      <div className="flex-shrink-0">{styles[type].icon}</div>
      <div className="flex-1">
        <p className="font-bold text-sm leading-tight">{message}</p>
      </div>
      <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors">
        <X size={16} />
      </button>
    </div>
  );
};
