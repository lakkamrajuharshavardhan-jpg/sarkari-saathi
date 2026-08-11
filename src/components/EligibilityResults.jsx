import React, { useState } from 'react';
import { ArrowLeft, Printer, Share2, Filter, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import SchemeCard from './SchemeCard';
import { translations } from '../data/translations';

export default function EligibilityResults({
  lang,
  profile,
  matchedSchemes,
  savedSchemeIds,
  onToggleSave,
  onOpenDetails,
  onReCheck,
  onOpenPrintModal
}) {
  const t = translations[lang];
  const [filterType, setFilterType] = useState('all'); // 'all' | 'high' | 'partial'
  const [copiedLink, setCopiedLink] = useState(false);

  // Helper matching filter logic
  const filteredSchemes = matchedSchemes.filter(item => {
    if (filterType === 'high') return item.score >= 80;
    if (filterType === 'partial') return item.score < 80;
    return true;
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sarkari Saathi Scheme Results',
        text: `I checked my government scheme eligibility on Sarkari Saathi and matched ${matchedSchemes.length} schemes!`,
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
      <div className="p-6 sm:p-8 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#2D5A43] text-white flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {matchedSchemes.length} {t.matchedCount}
            </span>
            <span className="text-xs text-[#57534E]">
              {profile.state} • {profile.gender} ({profile.age} yrs)
            </span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#1C1917]">
            {t.resultsTitle}
          </h2>
          <p className="text-sm text-[#57534E]">
            {t.resultsSubtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onReCheck}
            className="px-4 py-2.5 rounded-lg border border-[#D4CDC1] bg-white text-xs font-semibold text-[#1C1917] hover:border-[#963628] flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.reCheckEligibility}</span>
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2.5 rounded-lg border border-[#D4CDC1] bg-white text-xs font-semibold text-[#1C1917] hover:border-[#963628] flex items-center gap-1.5 transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-[#963628]" />
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

      {/* Filter Tabs & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E2D8] pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold">
          <Filter className="w-4 h-4 text-[#57534E]" />
          {[
            { id: 'all', label: t.filterAllMatches },
            { id: 'high', label: t.filterHighMatch },
            { id: 'partial', label: t.filterPartialMatch }
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
      </div>

      {/* Scheme Cards Grid */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map(({ scheme, score, reasons }) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              lang={lang}
              isSaved={savedSchemeIds.includes(scheme.id)}
              onToggleSave={onToggleSave}
              onOpenDetails={onOpenDetails}
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
            Show All Matches
          </button>
        </div>
      )}

    </section>
  );
}
