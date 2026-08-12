import React from 'react';
import { Bookmark, ShieldCheck, CheckCircle2, ArrowUpRight, Sparkles, Award } from 'lucide-react';
import { translations } from '../data/translations';
import TrustBadge from './TrustBadge';

export default function SchemeCard({
  scheme,
  lang,
  isSaved,
  onToggleSave,
  onOpenDetails,
  matchScore,
  matchReasons
}) {
  const t = translations[lang];

  const title = lang === 'hi' ? scheme.titleHi : scheme.titleEn;
  const category = lang === 'hi' ? scheme.categoryHi : scheme.category;
  const benefit = lang === 'hi' ? scheme.benefitHi : scheme.benefitEn;
  const shortDesc = lang === 'hi' ? scheme.shortDescHi : scheme.shortDescEn;
  const offeredBy = lang === 'hi' ? scheme.offeredByHi : scheme.offeredBy;

  return (
    <div className="rounded-2xl bg-[#FAF7F2] border border-[#E7E2D8] p-6 card-warm flex flex-col justify-between space-y-5 relative group">
      
      {/* Top Header Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          
          {/* Category Badge */}
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F4EFEB] border border-[#E7E2D8] text-[#963628] flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#963628]" />
            {category}
          </span>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleSave(scheme.id)}
            title={isSaved ? t.savedScheme : t.saveScheme}
            className={`p-2 rounded-full border transition-all ${
              isSaved
                ? 'bg-[#963628] text-white border-[#963628]'
                : 'bg-white text-[#57534E] border-[#E7E2D8] hover:border-[#963628] hover:text-[#963628]'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Scheme Title & Code */}
        <div>
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#57534E] uppercase">
            {scheme.code} • {offeredBy}
          </span>
          <h3 className="text-xl font-serif font-bold text-[#1C1917] mt-1 group-hover:text-[#963628] transition-colors leading-snug">
            {title}
          </h3>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#57534E] line-clamp-2 leading-relaxed">
          {shortDesc}
        </p>
      </div>

      {/* Middle Section: Financial Benefit Pill & Match Score */}
      <div className="space-y-3 pt-2">
        <div className="p-3 rounded-xl bg-[#F4EFEB] border border-[#E7E2D8] flex items-start gap-2.5">
          <Award className="w-5 h-5 text-[#2D5A43] shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-mono font-bold text-[#2D5A43] uppercase block">
              {t.benefitLabel}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#1C1917]">
              {benefit}
            </span>
          </div>
        </div>

        {/* Optional Eligibility Match Reason Pill */}
        {matchScore !== undefined && (
          <div className="flex items-center justify-between text-xs font-semibold px-1 text-[#2D5A43]">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5A43]" />
              <span>{t.whyMatchTitle}</span>
            </span>
            <span className="bg-[#2D5A43]/10 px-2 py-0.5 rounded text-[11px] font-mono font-bold">
              {matchScore}% {t.criteriaMet}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Footer Action */}
      <div className="pt-3 border-t border-[#E7E2D8] flex items-center justify-between gap-2">
        <TrustBadge url={scheme.officialUrl || "https://india.gov.in"} compact={true} />

        <button
          onClick={() => onOpenDetails(scheme)}
          className="flex items-center gap-1 text-xs font-bold text-[#963628] hover:text-[#7D2C1F] group-hover:translate-x-0.5 transition-all"
        >
          <span>{t.viewDetails}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
