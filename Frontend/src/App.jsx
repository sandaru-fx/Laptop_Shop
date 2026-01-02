import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboards - Minimal Implementation for now */}
        <Route path="/user-dashboard" element={<div className="min-h-screen flex flex-col items-center justify-center text-white bg-slate-950 p-10"><h1 className="text-5xl font-black mb-4">USER DASHBOARD</h1><p className="text-gray-400">Welcome to your personal tech space.</p></div>} />
        <Route path="/admin-dashboard" element={<div className="min-h-screen flex flex-col items-center justify-center text-white bg-slate-950 p-10 font-mono"><h1 className="text-5xl font-black mb-4 border-b-2 border-white pb-2">ADMIN PANEL</h1><p className="text-emerald-400">System Authenticated: Level 1 Access Granted.</p></div>} />
      </Routes>
    </Router>
  );
}

export default App;
