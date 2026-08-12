import React, { useState } from 'react';
import { Languages, Bookmark, User, Menu, X, ArrowRight, Check, GraduationCap, Building2, MessageSquare, Bell, Sparkles, LogOut } from 'lucide-react';
import { translations } from '../data/translations';

// Brand Logo Component
export function BrandLogo() {
  return (
    <div className="flex items-center gap-3.5 group">
      {/* Emblem SVG */}
      <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md group-hover:scale-105 transition-transform duration-300">
          <defs>
            <linearGradient id="sealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B33E2B" />
              <stop offset="50%" stopColor="#963628" />
              <stop offset="100%" stopColor="#6E2318" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D77F" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#AA7C11" />
            </linearGradient>
          </defs>

          <circle cx="50" cy="50" r="48" fill="url(#sealGrad)" stroke="url(#goldGrad)" strokeWidth="3" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="url(#goldGrad)" strokeWidth="1" strokeDasharray="3 3" />
          
          <text
            x="50"
            y="64"
            fontFamily="'Playfair Display', 'Noto Sans Devanagari', Georgia, serif"
            fontSize="52"
            fontWeight="bold"
            fill="url(#goldGrad)"
            textAnchor="middle"
          >
            स
          </text>

          <polygon points="50,11 53,17 59,17 54,21 56,27 50,23 44,27 46,21 41,17 47,17" fill="url(#goldGrad)" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div>
        <div className="flex items-center gap-1.5">
          <span className="font-serif text-2xl sm:text-3xl font-black tracking-tight text-[#1C1917]">
            Sarkari<span className="text-[#963628]">Saathi</span>
          </span>
        </div>
        <div className="text-[10px] tracking-widest uppercase font-bold text-[#57534E]">
          YOUR BENEFITS & EXAMS, MADE FINDABLE.
        </div>
      </div>
    </div>
  );
}

export default function Navbar({
  lang,
  setLang,
  currentTab,
  setCurrentTab,
  savedCount,
  user,
  onOpenAuth,
  onSignOut,
  onOpenAlertsModal
}) {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'checker', label: t.navEligibility, icon: Sparkles },
    { id: 'directory-schemes', label: t.navExploreSchemes, icon: Building2 },
    { id: 'directory-exams', label: t.navExploreExams, icon: GraduationCap },
    { id: 'forum', label: t.navForum, icon: MessageSquare },
    { id: 'saved', label: t.navSaved, icon: Bookmark, badge: savedCount }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7E2D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <button
            onClick={() => { setCurrentTab('hero'); setMobileMenuOpen(false); }}
            className="text-left focus:outline-none"
          >
            <BrandLogo />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#57534E]">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? 'text-[#963628] font-bold border-b-2 border-[#963628] pb-1'
                      : 'hover:text-[#963628]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className="ml-1 px-2 py-0.5 text-xs bg-[#963628] text-white rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Notification Alert Center Button */}
            <button
              onClick={onOpenAlertsModal}
              title={t.navAlerts}
              className="p-2.5 rounded-full bg-[#F4EFEB] hover:bg-[#963628] text-[#963628] hover:text-white border border-[#E7E2D8] transition-all shadow-sm relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" />
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-[#F4EFEB] rounded-full p-1 border border-[#E7E2D8]">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1 ${
                  lang === 'en'
                    ? 'bg-[#963628] text-white shadow-sm font-bold'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {lang === 'en' && <Check className="w-3 h-3" />}
                English
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1 ${
                  lang === 'hi'
                    ? 'bg-[#963628] text-white shadow-sm font-bold'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {lang === 'hi' && <Check className="w-3 h-3" />}
                <Languages className="w-3.5 h-3.5" />
                हिन्दी
              </button>
            </div>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-[#E7E2D8]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#2D5A43] text-white flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-[#1C1917] max-w-[100px] truncate">
                    {user.name || t.guestUser}
                  </span>
                </div>
                <button
                  onClick={onSignOut}
                  className="text-xs text-[#57534E] hover:text-[#963628] underline"
                >
                  {t.signOut}
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-[#1C1917] bg-[#FAF7F2] border border-[#D4CDC1] rounded-lg hover:border-[#963628] hover:text-[#963628] transition-all"
              >
                <ArrowRight className="w-4 h-4" />
                <span>{t.signIn}</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAlertsModal}
              className="p-2 rounded-full bg-[#F4EFEB] border border-[#E7E2D8] text-[#963628]"
            >
              <Bell className="w-4 h-4" />
            </button>

            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="px-2.5 py-1 text-xs font-bold bg-[#F4EFEB] border border-[#E7E2D8] rounded-md text-[#963628]"
            >
              {lang === 'en' ? 'हिन्दी' : 'ENG'}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1C1917] hover:text-[#963628]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E7E2D8] bg-[#FAF7F2] px-4 pt-4 pb-6 space-y-4 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { setCurrentTab(item.id); setMobileMenuOpen(false); }}
                  className={`flex items-center justify-between py-2 font-semibold text-xs transition-all ${
                    currentTab === item.id
                      ? 'text-[#963628] font-bold'
                      : 'text-[#1C1917] hover:text-[#963628]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-[#963628] text-white rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E7E2D8]">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{t.welcomeUser} {user.name}</span>
                <button onClick={onSignOut} className="text-xs text-[#963628] underline">
                  {t.signOut}
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 bg-[#963628] text-white text-sm font-semibold rounded-lg text-center shadow-sm"
              >
                {t.signIn}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
