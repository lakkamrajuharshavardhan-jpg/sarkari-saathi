import React, { useState } from 'react';
import { ArrowLeft, Printer, Share2, Filter, CheckCircle2, Sparkles, AlertCircle, Building2, GraduationCap } from 'lucide-react';
import SchemeCard from './SchemeCard';
import ExamCard from './ExamCard';
import { translations } from '../data/translations';

export default function EligibilityResults({
  lang,
  profile,
  matchedSchemes,
  matchedExams,
  savedSchemeIds,
  savedExamIds,
  onToggleSaveScheme,
  onToggleSaveExam,
  onOpenSchemeDetails,
  onOpenExamDetails,
  onReCheck,
  onOpenPrintModal
}) {
  const t = translations[lang];

  // Active Dashboard Sub-Tab ('schemes' | 'exams')
  const [activeDashboardTab, setActiveDashboardTab] = useState('schemes');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'eligible' | 'conditional'
  const [copiedLink, setCopiedLink] = useState(false);

  // Helper filter logic for Schemes
  const filteredSchemes = matchedSchemes.filter(item => {
    if (filterType === 'eligible') return item.score >= 80;
    if (filterType === 'conditional') return item.score < 80;
    return true;
  });

  // Helper filter logic for Exams
  const filteredExams = matchedExams.filter(item => {
    if (filterType === 'eligible') return item.matchResult.status === 'Eligible';
    if (filterType === 'conditional') return item.matchResult.status === 'Conditionally Eligible';
    return true;
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sarkari Saathi Eligibility Results',
        text: `I checked my government scheme & exam eligibility on Sarkari Saathi and matched ${matchedSchemes.length} schemes & ${matchedExams.length} exams!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#F4EFEB] border border-[#E7E2D8] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden card-warm">
        <div className="space-y-2.5 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#2D5A43] text-white flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              {matchedSchemes.length} {t.matchedCountSchemes}
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#963628] text-white flex items-center gap-1.5 shadow-sm">
              <GraduationCap className="w-3.5 h-3.5" />
              {matchedExams.length} {t.matchedCountExams}
            </span>
            <span className="text-xs text-[#57534E] font-medium bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E7E2D8]">
              {profile.state} • {profile.gender} ({profile.age} yrs)
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">
            {t.resultsTitle}
          </h2>
          <p className="text-sm text-[#57534E]">
            {t.resultsSubtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={onReCheck}
            className="px-4 py-2.5 rounded-xl border border-[#D4CDC1] bg-white hover:bg-[#FAF7F2] text-xs font-bold text-[#1C1917] hover:border-[#963628] flex items-center gap-1.5 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#963628]" />
            <span>{t.reCheckEligibility}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2.5 rounded-xl border border-[#D4CDC1] bg-white hover:bg-[#FAF7F2] text-xs font-bold text-[#1C1917] hover:border-[#963628] flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Share2 className="w-4 h-4 text-[#963628]" />
            <span>{copiedLink ? 'Link Copied!' : t.btnShareResults}</span>
          </button>

          <button
            onClick={onOpenPrintModal}
            className="px-5 py-2.5 rounded-lg bg-[#963628] hover:bg-[#7D2C1F] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{t.btnPrintChecklist}</span>
          </button>
        </div>
      </div>

      {/* DUAL DASHBOARD MAIN TAB NAVIGATION (Schemes vs Competitive Exams) */}
      <div className="flex border-b-2 border-[#E7E2D8] bg-[#FAF7F2] font-serif">
        <button
          onClick={() => { setActiveDashboardTab('schemes'); setFilterType('all'); }}
          className={`py-4 px-6 text-lg sm:text-xl font-bold flex items-center gap-2 border-b-4 -mb-[2px] transition-all ${
            activeDashboardTab === 'schemes'
              ? 'border-[#963628] text-[#963628]'
              : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
          }`}
        >
          <Building2 className="w-5 h-5" />
          <span>{t.tabMatchedSchemes}</span>
          <span className="ml-1 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F4EFEB] border border-[#E7E2D8] text-[#1C1917]">
            {matchedSchemes.length}
          </span>
        </button>

        <button
          onClick={() => { setActiveDashboardTab('exams'); setFilterType('all'); }}
          className={`py-4 px-6 text-lg sm:text-xl font-bold flex items-center gap-2 border-b-4 -mb-[2px] transition-all ${
            activeDashboardTab === 'exams'
              ? 'border-[#963628] text-[#963628]'
              : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
          }`}
        >
          <GraduationCap className="w-5 h-5" />
          <span>{t.tabMatchedExams}</span>
          <span className="ml-1 text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F4EFEB] border border-[#E7E2D8] text-[#1C1917]">
            {matchedExams.length}
          </span>
        </button>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 text-xs font-semibold pt-2">
        <Filter className="w-4 h-4 text-[#57534E]" />
        {[
          { id: 'all', label: t.filterAllMatches },
          { id: 'eligible', label: t.filterEligible },
          { id: 'conditional', label: t.filterConditional }
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`px-3 py-1.5 rounded-full border transition-all ${
              filterType === f.id
                ? 'bg-[#1C1917] text-white border-[#1C1917]'
                : 'bg-[#F4EFEB] text-[#57534E] border-[#E7E2D8] hover:text-[#1C1917]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* VIEW CONTENT 1: MATCHED SCHEMES */}
      {activeDashboardTab === 'schemes' && (
        filteredSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredSchemes.map(({ scheme, score, reasons }) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                lang={lang}
                isSaved={savedSchemeIds.includes(scheme.id)}
                onToggleSave={onToggleSaveScheme}
                onOpenDetails={onOpenSchemeDetails}
                matchScore={score}
                matchReasons={reasons}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-4">
            <AlertCircle className="w-10 h-10 text-[#963628] mx-auto" />
            <h3 className="text-xl font-serif font-bold text-[#1C1917]">
              No schemes found under this filter
            </h3>
            <button
              onClick={() => setFilterType('all')}
              className="px-4 py-2 bg-[#963628] text-white text-xs font-semibold rounded-lg"
            >
              Show All Scheme Matches
            </button>
          </div>
        )
      )}

      {/* VIEW CONTENT 2: MATCHED COMPETITIVE EXAMS */}
      {activeDashboardTab === 'exams' && (
        filteredExams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredExams.map(({ exam, matchResult }) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                lang={lang}
                matchResult={matchResult}
                isSaved={savedExamIds.includes(exam.id)}
                onToggleSave={onToggleSaveExam}
                onOpenDetails={onOpenExamDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 p-8 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-4">
            <AlertCircle className="w-10 h-10 text-[#963628] mx-auto" />
            <h3 className="text-xl font-serif font-bold text-[#1C1917]">
              No competitive exams found under this filter
            </h3>
            <button
              onClick={() => setFilterType('all')}
              className="px-4 py-2 bg-[#963628] text-white text-xs font-semibold rounded-lg"
            >
              Show All Exam Matches
            </button>
          </div>
        )
      )}

    </section>
  );
}
