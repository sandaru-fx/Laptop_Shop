
import React, { useState } from 'react';
import { MapPin, CreditCard, ShoppingBag, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  total: number;
  onPlaceOrder: (address: string, paymentMethod: 'COD' | 'Stripe') => void;
  onCancel: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, total, onPlaceOrder, onCancel }) => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('123 Luxe Street, Beverly Hills, CA 90210');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Stripe'>('COD');

  const steps = [
    { id: 1, name: 'Shipping', icon: <MapPin size={18} /> },
    { id: 2, name: 'Payment', icon: <CreditCard size={18} /> },
    { id: 3, name: 'Review', icon: <ShoppingBag size={18} /> }
  ];

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-8 text-center">Secure Checkout</h1>
        <div className="flex items-center justify-between relative max-w-lg mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 -z-10" />
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center space-y-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${step >= s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'glass bg-slate-900 text-slate-500'}`}>
                {step > s.id ? <CheckCircle2 size={20} /> : s.icon}
              </div>
              <span className={`text-xs font-bold uppercase tracking-widest ${step >= s.id ? 'text-blue-400' : 'text-slate-500'}`}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass p-8 md:p-12 rounded-[3rem] border-white/10 min-h-[400px]">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Shipping Address</h2>
              <textarea 
                className="w-full glass bg-slate-900/50 border-white/10 rounded-2xl p-6 outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[120px] resize-none"
                placeholder="Enter your full delivery address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Phone Number" className="glass bg-slate-900/50 border-white/10 rounded-xl px-6 py-3" />
              <input type="text" placeholder="Postal Code" className="glass bg-slate-900/50 border-white/10 rounded-xl px-6 py-3" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
            <h2 className="text-2xl font-bold">Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => setPaymentMethod('COD')}
                className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${paymentMethod === 'COD' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'glass border-white/5 hover:bg-white/5'}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white/5 p-3 rounded-xl"><CreditCard /></div>
                  <div className="text-left">
                    <p className="font-bold">Cash on Delivery</p>
                    <p className="text-xs text-slate-500">Pay when you receive</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'COD' ? 'border-blue-400' : 'border-slate-700'}`}>
                  {paymentMethod === 'COD' && <div className="w-2.5 h-2.5 bg-blue-400 rounded-full" />}
                </div>
              </button>
              <button 
                onClick={() => setPaymentMethod('Stripe')}
                className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${paymentMethod === 'Stripe' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'glass border-white/5 hover:bg-white/5'}`}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-white/5 p-3 rounded-xl"><CheckCircle2 /></div>
                  <div className="text-left">
                    <p className="font-bold">Stripe Payment</p>
                    <p className="text-xs text-slate-500">Credit / Debit Card</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'Stripe' ? 'border-blue-400' : 'border-slate-700'}`}>
                  {paymentMethod === 'Stripe' && <div className="w-2.5 h-2.5 bg-blue-400 rounded-full" />}
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
            <h2 className="text-2xl font-bold">Review Order</h2>
            <div className="space-y-4">
              <div className="glass bg-white/5 p-6 rounded-2xl space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">{item.model} x {item.quantity}</span>
                    <span className="font-bold">${item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t border-white/5 pt-4 flex justify-between">
                  <span className="font-bold">Grand Total</span>
                  <span className="font-black text-xl text-blue-400">${total}</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm text-slate-400">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <p>Delivering to: <span className="text-white font-medium">{address}</span></p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-between items-center pt-8 border-t border-white/5">
          {step > 1 ? (
            <button 
              onClick={() => setStep(step - 1)}
              className="flex items-center space-x-2 text-slate-400 font-bold hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
          ) : (
            <button onClick={onCancel} className="text-slate-500 font-bold hover:text-red-400 transition-colors">Cancel Checkout</button>
          )}

          {step < 3 ? (
            <button 
              onClick={() => setStep(step + 1)}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-lg shadow-blue-900/20"
            >
              <span>Continue</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <button 
              onClick={() => onPlaceOrder(address, paymentMethod)}
              className="bg-green-600 hover:bg-green-700 px-10 py-4 rounded-2xl font-black text-lg shadow-xl shadow-green-900/20 transition-all transform hover:scale-105"
            >
              Place Order (${total})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
