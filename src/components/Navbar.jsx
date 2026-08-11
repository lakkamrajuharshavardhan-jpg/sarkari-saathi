import React, { useState } from 'react';
import { Languages, Bookmark, User, Menu, X, ArrowRight, Check } from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({
  lang,
  setLang,
  currentTab,
  setCurrentTab,
  savedCount,
  user,
  onOpenAuth,
  onSignOut
}) {
  const t = translations[lang];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7E2D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <button
            onClick={() => { setCurrentTab('hero'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-[#963628] flex items-center justify-center text-[#FAF7F2] font-serif font-bold text-2xl shadow-sm group-hover:bg-[#7D2C1F] transition-colors">
              स
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917]">
                {t.brandName}
              </div>
              <div className="text-[10px] tracking-widest uppercase font-semibold text-[#57534E]">
                {t.brandTagline}
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#57534E]">
            <button
              onClick={() => setCurrentTab('checker')}
              className={`hover:text-[#963628] transition-colors ${
                currentTab === 'checker' ? 'text-[#963628] font-semibold border-b-2 border-[#963628] pb-1' : ''
              }`}
            >
              {t.navEligibility}
            </button>
            <button
              onClick={() => setCurrentTab('directory')}
              className={`hover:text-[#963628] transition-colors ${
                currentTab === 'directory' ? 'text-[#963628] font-semibold border-b-2 border-[#963628] pb-1' : ''
              }`}
            >
              {t.navExplore}
            </button>
            <button
              onClick={() => setCurrentTab('saved')}
              className={`flex items-center gap-1.5 hover:text-[#963628] transition-colors ${
                currentTab === 'saved' ? 'text-[#963628] font-semibold border-b-2 border-[#963628] pb-1' : ''
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{t.navSaved}</span>
              {savedCount > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-[#963628] text-white rounded-full font-bold">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Bar (Language Toggle & Auth) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Language Control Switcher */}
            <div className="flex items-center bg-[#F4EFEB] rounded-full p-1 border border-[#E7E2D8]">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1 ${
                  lang === 'en'
                    ? 'bg-[#963628] text-white shadow-sm'
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
                    ? 'bg-[#963628] text-white shadow-sm'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {lang === 'hi' && <Check className="w-3 h-3" />}
                <Languages className="w-3.5 h-3.5" />
                हिन्दी
              </button>
            </div>

            {/* User Auth Control */}
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
          <div className="flex items-center gap-2 md:hidden">
            {/* Language Quick Toggle Mobile */}
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
        <div className="md:hidden border-t border-[#E7E2D8] bg-[#FAF7F2] px-4 pt-4 pb-6 space-y-4 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => { setCurrentTab('checker'); setMobileMenuOpen(false); }}
              className="text-left py-2 font-semibold text-[#1C1917] hover:text-[#963628]"
            >
              {t.navEligibility}
            </button>
            <button
              onClick={() => { setCurrentTab('directory'); setMobileMenuOpen(false); }}
              className="text-left py-2 font-semibold text-[#1C1917] hover:text-[#963628]"
            >
              {t.navExplore}
            </button>
            <button
              onClick={() => { setCurrentTab('saved'); setMobileMenuOpen(false); }}
              className="flex items-center justify-between py-2 font-semibold text-[#1C1917] hover:text-[#963628]"
            >
              <span>{t.navSaved}</span>
              {savedCount > 0 && (
                <span className="px-2 py-0.5 text-xs bg-[#963628] text-white rounded-full font-bold">
                  {savedCount}
                </span>
              )}
            </button>
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
