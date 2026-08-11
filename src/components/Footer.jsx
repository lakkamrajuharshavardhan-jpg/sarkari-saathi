import React from 'react';
import { ShieldCheck, PhoneCall, Heart } from 'lucide-react';
import { translations } from '../data/translations';

export default function Footer({ lang }) {
  const t = translations[lang];

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E7E2D8] text-[#57534E]">
      
      {/* Honest Source State Banner */}
      <div className="bg-[#F4EFEB] border-b border-[#E7E2D8] py-3 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 text-xs font-mono font-bold text-[#963628]">
          <ShieldCheck className="w-4 h-4 text-[#2D5A43]" />
          <span>{t.sourceBannerText}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info (Span 6) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#963628] text-white flex items-center justify-center font-serif font-bold text-xl">
                स
              </div>
              <span className="font-serif font-bold text-2xl text-[#1C1917]">
                {t.brandName}
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed max-w-md">
              {t.footerText}
            </p>
          </div>

          {/* Government Helplines (Span 6) */}
          <div className="md:col-span-6 space-y-3 p-5 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8]">
            <span className="text-xs font-mono font-bold text-[#1C1917] uppercase flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#963628]" />
              {t.helplineTitle}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-[#1C1917]">
              <div className="p-2 bg-white rounded border border-[#E7E2D8]">
                {t.helplineNational}
              </div>
              <div className="p-2 bg-white rounded border border-[#E7E2D8]">
                {t.helplineSenior}
              </div>
              <div className="p-2 bg-white rounded border border-[#E7E2D8] col-span-1 sm:col-span-2">
                {t.helplineKisan}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-6 border-t border-[#E7E2D8] flex flex-wrap items-center justify-between gap-4 text-xs">
          <span>© 2026 Sarkari Saathi • Built for Everyday India</span>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">CSC Locator</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
