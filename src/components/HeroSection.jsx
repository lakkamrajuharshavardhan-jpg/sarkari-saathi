import React from 'react';
import { ArrowRight, Search, ShieldCheck, Clock, FileCheck, Sparkles, Heart } from 'lucide-react';
import { translations } from '../data/translations';

export default function HeroSection({ lang, onStartEligibility, onExploreDirectory }) {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Hero Content & Right "Today's Note" Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Hero Text Column (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4EFEB] border border-[#E7E2D8] text-[11px] font-bold tracking-wider text-[#57534E] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#963628]" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Massive Typography Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-[#1C1917] leading-[1.1]">
              {t.heroTitlePrefix}
              <span className="italic font-normal text-[#963628]">
                {t.heroTitleItalic}
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
                className="px-6 py-3.5 bg-[#963628] hover:bg-[#7D2C1F] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-base group"
              >
                <span>{t.btnCheckEligibility}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreDirectory}
                className="px-6 py-3.5 bg-transparent hover:bg-[#F4EFEB] text-[#1C1917] font-semibold rounded-lg border border-[#D4CDC1] hover:border-[#1C1917] transition-all flex items-center gap-2 text-base"
              >
                <span>{t.btnBrowseSchemes}</span>
                <Search className="w-4 h-4 text-[#57534E]" />
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#57534E] font-medium">
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
            <div className="p-8 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] shadow-sm relative space-y-6">
              
              {/* Header Note Info */}
              <div className="flex items-center justify-between text-xs font-mono font-semibold tracking-wider text-[#57534E] uppercase border-b border-[#E7E2D8] pb-3">
                <span>{t.todaysNoteLabel}</span>
                <span>{t.todaysNoteCounter}</span>
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
              <div className="pt-4 flex items-center gap-2 text-xs font-bold tracking-widest text-[#2D5A43] uppercase">
                <Heart className="w-4 h-4 fill-current text-[#2D5A43]" />
                <span>{t.todaysNoteTag}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Feature Stat Grid Section */}
        <div className="mt-20 pt-12 border-t border-[#E7E2D8]">
          <div className="text-center sm:text-left mb-8">
            <span className="text-[11px] font-mono font-bold tracking-widest text-[#963628] uppercase">
              {t.discoverHeader}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917] mt-1">
              {t.discoverTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Stat Card 1 */}
            <div className="p-6 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8] space-y-2 card-warm">
              <div className="font-serif text-4xl text-[#963628] font-bold">
                {t.stat1Number}
              </div>
              <div className="text-xs font-mono font-bold tracking-wider text-[#1C1917] uppercase">
                {t.stat1Label}
              </div>
              <p className="text-sm text-[#57534E] leading-snug">
                {t.stat1Desc}
              </p>
            </div>

            {/* Stat Card 2 */}
            <div className="p-6 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8] space-y-2 card-warm">
              <div className="font-serif text-4xl text-[#2D5A43] font-bold">
                {t.stat2Number}
              </div>
              <div className="text-xs font-mono font-bold tracking-wider text-[#1C1917] uppercase">
                {t.stat2Label}
              </div>
              <p className="text-sm text-[#57534E] leading-snug">
                {t.stat2Desc}
              </p>
            </div>

            {/* Stat Card 3 */}
            <div className="p-6 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8] space-y-2 card-warm">
              <div className="font-serif text-4xl text-[#963628] font-bold">
                {t.stat3Number}
              </div>
              <div className="text-xs font-mono font-bold tracking-wider text-[#1C1917] uppercase">
                {t.stat3Label}
              </div>
              <p className="text-sm text-[#57534E] leading-snug">
                {t.stat3Desc}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
