import React from 'react';
import { Calendar, Building2, GraduationCap, Clock, ExternalLink, ShieldCheck, CheckCircle2, AlertTriangle, XCircle, ArrowUpRight, Bookmark } from 'lucide-react';
import { translations } from '../data/translations';
import TrustBadge from './TrustBadge';

export default function ExamCard({
  exam,
  lang,
  matchResult,
  isSaved,
  onToggleSave,
  onOpenDetails
}) {
  const t = translations[lang];

  const name = lang === 'hi' ? exam.nameHi : exam.nameEn;
  const jobLevel = lang === 'hi' ? exam.jobLevelHi : exam.jobLevelEn;
  const shortDesc = lang === 'hi' ? exam.shortDescHi : exam.shortDescEn;
  const requiredDegree = lang === 'hi' ? exam.requiredDegreeHi : exam.requiredDegreeEn;

  // Destructure computed match status
  const status = matchResult?.status || 'Eligible'; // 'Eligible' | 'Conditionally Eligible' | 'Ineligible'
  const relaxedMaxAge = matchResult?.relaxedMaxAge || exam.baseAgeMax;
  const reasons = matchResult?.reasons || [];

  return (
    <div className="rounded-2xl bg-[#FAF7F2] border border-[#E7E2D8] p-6 card-warm flex flex-col justify-between space-y-5 relative group">
      
      {/* Header Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          
          {/* Status Badge */}
          {status === 'Eligible' && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2D5A43] text-white flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t.examStatusEligible}
            </span>
          )}
          {status === 'Conditionally Eligible' && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-600 text-white flex items-center gap-1.5 shadow-sm">
              <AlertTriangle className="w-3.5 h-3.5" />
              {t.examStatusConditional}
            </span>
          )}
          {status === 'Ineligible' && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-700 text-white flex items-center gap-1.5 shadow-sm">
              <XCircle className="w-3.5 h-3.5" />
              {t.examStatusIneligible}
            </span>
          )}

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleSave(exam.id)}
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

        {/* Exam Title & Conducting Body */}
        <div>
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#963628] uppercase block">
            {exam.code} • {jobLevel}
          </span>
          <h3 className="text-xl font-serif font-bold text-[#1C1917] mt-1 group-hover:text-[#963628] transition-colors leading-snug">
            {name}
          </h3>
          <span className="text-xs text-[#57534E] font-medium flex items-center gap-1 mt-0.5">
            <Building2 className="w-3.5 h-3.5 text-[#57534E]" />
            {exam.conductingBody}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#57534E] line-clamp-2 leading-relaxed">
          {shortDesc}
        </p>
      </div>

      {/* Middle Section: Eligibility Breakdown & Age Relaxation Calculator */}
      <div className="space-y-3 pt-2">
        <div className="p-3.5 rounded-xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-2 text-xs">
          
          {/* Age Limit & Relaxation Pill */}
          <div className="flex items-center justify-between">
            <span className="text-[#57534E] font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#963628]" />
              {t.baseAgeLimitLabel}: <strong>{exam.baseAgeMin}-{exam.baseAgeMax} yrs</strong>
            </span>
            <span className="text-[#2D5A43] font-mono font-bold bg-white px-2 py-0.5 rounded border border-[#E7E2D8]">
              Max: {relaxedMaxAge} yrs
            </span>
          </div>

          {/* Qualification Requirement Pill */}
          <div className="pt-1 border-t border-[#E7E2D8] text-[#1C1917] font-medium flex items-start gap-1.5">
            <GraduationCap className="w-4 h-4 text-[#963628] shrink-0 mt-0.5" />
            <span className="line-clamp-1">{requiredDegree}</span>
          </div>

          {/* Breakdown Reason Bullets */}
          {reasons.length > 0 && (
            <div className="pt-1 text-[11px] text-[#57534E] space-y-1 font-sans">
              {reasons.slice(0, 2).map((r, i) => (
                <div key={i} className="flex items-start gap-1">
                  <span className="text-[#963628] font-bold">•</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Dates Timeline Preview */}
        <div className="p-3 rounded-xl bg-white border border-[#E7E2D8] grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <span className="text-[#57534E] block font-mono uppercase">{t.applicationEndLabel}</span>
            <span className="font-bold text-[#1C1917]">{exam.keyDates.applicationEndEn}</span>
          </div>
          <div className="border-l border-[#E7E2D8] pl-2">
            <span className="text-[#57534E] block font-mono uppercase">{t.examDateLabel}</span>
            <span className="font-bold text-[#963628]">{exam.keyDates.examDateEn}</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="pt-3 border-t border-[#E7E2D8] flex items-center justify-between gap-2">
        <TrustBadge url={exam.officialUrl} compact={true} />

        <button
          onClick={() => onOpenDetails(exam)}
          className="flex items-center gap-1 text-xs font-bold text-[#963628] hover:text-[#7D2C1F] group-hover:translate-x-0.5 transition-all"
        >
          <span>{t.viewExamDetails}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
