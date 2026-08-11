import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { translations } from '../data/translations';

export default function AuthModal({ isOpen, onClose, lang, onLoginSuccess }) {
  if (!isOpen) return null;

  const t = translations[lang];
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: name || (email ? email.split('@')[0] : 'Citizen User'),
      email: email || 'user@example.com',
      isLoggedIn: true
    };
    localStorage.setItem('sarkari_saathi_user', JSON.stringify(userData));
    onLoginSuccess(userData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn">
      
      {/* Click Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E7E2D8] p-6 sm:p-8 space-y-6 z-10">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="w-9 h-9 rounded-lg bg-[#963628] text-white flex items-center justify-center font-serif font-bold text-xl">
              स
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#1C1917] pt-2">
              {t.authTitle}
            </h3>
            <p className="text-xs text-[#57534E]">
              {t.authSubtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#E7E2D8] text-[#57534E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isRegister && (
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#1C1917]">
                {t.labelFullName}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#57534E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Harsha Vardhan"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#D4CDC1] text-xs text-[#1C1917] focus:outline-none focus:border-[#963628]"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#1C1917]">
              {t.labelEmail}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#57534E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mobile / email"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#D4CDC1] text-xs text-[#1C1917] focus:outline-none focus:border-[#963628]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#1C1917]">
              {t.labelPassword}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#57534E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#D4CDC1] text-xs text-[#1C1917] focus:outline-none focus:border-[#963628]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#963628] hover:bg-[#7D2C1F] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-all mt-2"
          >
            <span>{isRegister ? t.btnRegister : t.btnSignIn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Switches */}
        <div className="pt-4 border-t border-[#E7E2D8] text-center space-y-3 text-xs">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-[#963628] font-semibold hover:underline"
          >
            {isRegister ? t.authSwitchToSignIn : t.authSwitchToRegister}
          </button>

          <div>
            <button
              onClick={onClose}
              className="text-[#57534E] hover:text-[#1C1917] underline text-[11px]"
            >
              {t.btnGuest}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
