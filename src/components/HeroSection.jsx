import React from 'react';
import { ArrowRight, Search, ShieldCheck, Clock, FileCheck, Sparkles, Heart, CheckCircle2, Award, Zap } from 'lucide-react';
import { translations } from '../data/translations';

export default function HeroSection({ lang, onStartEligibility, onExploreDirectory }) {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 border-b border-[#E7E2D8] bg-gradient-to-b from-[#FAF7F2] via-[#F6F1E9] to-[#FAF7F2]">
      
      {/* Background Decorative Mesh Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#963628]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#2D5A43]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Left Hero Content & Right "Today's Note" Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Hero Text Column (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#D4CDC1] text-[11px] font-bold tracking-widest text-[#963628] uppercase shadow-sm animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-[#963628]" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Massive Typography Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-[#1C1917] leading-[1.08]">
              {t.heroTitlePrefix}
              <span className="italic font-normal text-[#963628] relative inline-block">
                {t.heroTitleItalic}
                <svg className="absolute -bottom-1 left-0 w-full h-2 text-[#963628]/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,0 100,15" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-lg sm:text-xl text-[#57534E] font-normal leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onStartEligibility}
                className="px-7 py-4 bg-[#963628] hover:bg-[#7D2C1F] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 text-base group transform hover:-translate-y-0.5"
              >
                <span>{t.btnCheckEligibility}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreDirectory}
                className="px-7 py-4 bg-[#FAF7F2] hover:bg-[#F4EFEB] text-[#1C1917] font-semibold rounded-xl border border-[#D4CDC1] hover:border-[#963628] transition-all duration-300 flex items-center gap-2.5 text-base shadow-sm"
              >
                <Search className="w-4 h-4 text-[#963628]" />
                <span>{t.btnBrowseSchemes}</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#57534E] font-medium border-t border-[#E7E2D8]/80 max-w-xl">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2D5A43]" />
                {t.badgeFree}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#963628]" />
                {t.badgeNoAadhaar}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#57534E]" />
                {t.badgeFast}
              </span>
            </div>
          </div>

          {/* Right Highlight Box Column (Span 5) - "TODAY'S NOTE" */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-[#F4EFEB] border border-[#E7E2D8] shadow-xl relative space-y-6 overflow-hidden card-warm">
              
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#963628]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header Note Info */}
              <div className="flex items-center justify-between text-xs font-mono font-bold tracking-widest text-[#57534E] uppercase border-b border-[#E7E2D8] pb-4">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#963628]" />
                  {t.todaysNoteLabel}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E7E2D8] text-[#963628]">
                  {t.todaysNoteCounter}
                </span>
              </div>

              {/* Note Heading & Subtext */}
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1917] leading-tight">
                  Good support shouldn’t be <span className="italic font-normal text-[#963628]">hard to find.</span>
                </h2>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  {t.todaysNoteBody}
                </p>
              </div>

              {/* Card Footer Tag */}
              <div className="pt-4 border-t border-[#E7E2D8] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#2D5A43] uppercase">
                  <Heart className="w-4 h-4 fill-current text-[#2D5A43]" />
                  <span>{t.todaysNoteTag}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#963628] bg-[#963628]/10 px-2.5 py-1 rounded-full">
                  VERIFIED .GOV.IN PORTALS
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Feature Stat Grid Section */}
        <div className="mt-20 pt-12 border-t border-[#E7E2D8]">
          <div className="text-center sm:text-left mb-8 space-y-1">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#963628] uppercase flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#963628]" />
              {t.discoverHeader}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
              {t.discoverTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Stat Card 1 */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7E2D8] space-y-3 card-warm shadow-sm">
              <div className="font-serif text-5xl text-[#963628] font-bold">
                {t.stat1Number}
              </div>
              <div className="text-xs font-mono font-bold tracking-wider text-[#1C1917] uppercase">
                {t.stat1Label}
              </div>
              <p className="text-sm text-[#57534E] leading-relaxed">
                {t.stat1Desc}
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7E2D8] space-y-3 card-warm shadow-sm">
              <div className="font-serif text-5xl text-[#2D5A43] font-bold">
                {t.stat2Number}
              </div>
              <div className="text-xs font-mono font-bold tracking-wider text-[#1C1917] uppercase">
                {t.stat2Label}
              </div>
              <p className="text-sm text-[#57534E] leading-relaxed">
                {t.stat2Desc}
              </p>
            </div>

            {/* Stat Card 3 */}
            <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E7E2D8] space-y-3 card-warm shadow-sm">
              <div className="font-serif text-5xl text-[#963628] font-bold">
                {t.stat3Number}
              </div>
              <div className="text-xs font-mono font-bold tracking-wider text-[#1C1917] uppercase">
                {t.stat3Label}
              </div>
              <p className="text-sm text-[#57534E] leading-relaxed">
                {t.stat3Desc}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
