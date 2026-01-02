import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import ThreeBackground from '../components/ThreeBackground';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (res.data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white p-6 bg-slate-950">
      <ThreeBackground />
      <Link to="/" className="absolute top-10 left-10 flex items-center gap-2 text-gray-500 hover:text-white transition-all font-medium">
        <ArrowLeft size={20} /> Return to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[3rem] shadow-2xl relative z-10"
      >
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black mb-3 italic">SIGN IN</h2>
          <p className="text-gray-400 font-light">Access your digital workstation</p>
        </div>

        {error && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-8 text-sm text-center font-medium">{error}</motion.div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:border-white focus:bg-white/10 outline-none transition-all placeholder:text-gray-600"
                placeholder="Email Address"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:border-white focus:bg-white/10 outline-none transition-all placeholder:text-gray-600"
                placeholder="Secure Password"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-5 bg-white text-black hover:bg-gray-200 disabled:bg-gray-500 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5 uppercase tracking-wider"
          >
            {loading ? "Authenticating..." : "Establish Session"} <ChevronRight size={20} />
          </button>
        </form>

        <p className="text-center mt-10 text-gray-400 font-light">
          New operative? <Link to="/signup" className="text-white font-bold hover:underline">Register Identity</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
