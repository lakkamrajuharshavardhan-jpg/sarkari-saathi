import React, { useState } from 'react';
import { Search, Filter, Sparkles, RefreshCw, GraduationCap, Award, ShieldCheck, Building2, Briefcase } from 'lucide-react';
import ExamCard from './ExamCard';
import { translations } from '../data/translations';

export default function ExamsDirectory({
  exams,
  lang,
  savedExamIds,
  onToggleSave,
  onOpenDetails
}) {
  const t = translations[lang];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroupTrack, setSelectedGroupTrack] = useState('all'); // 'all' | 'catA' | 'catB' | 'catC' | 'catD' | 'catE'
  const [selectedBodyFilter, setSelectedBodyFilter] = useState('all');

  const filteredExams = exams.filter(exam => {
    // 1. Category Group Track filter
    if (selectedGroupTrack !== 'all' && exam.categoryGroup !== selectedGroupTrack) {
      return false;
    }

    // 2. Search query matching
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchNameEn = exam.nameEn.toLowerCase().includes(q);
      const matchNameHi = exam.nameHi.toLowerCase().includes(q);
      const matchCode = exam.code.toLowerCase().includes(q);
      const matchBody = exam.conductingBody.toLowerCase().includes(q);
      if (!matchNameEn && !matchNameHi && !matchCode && !matchBody) {
        return false;
      }
    }

    // 3. Body filter
    if (selectedBodyFilter !== 'all' && !exam.conductingBody.toLowerCase().includes(selectedBodyFilter.toLowerCase())) {
      return false;
    }

    return true;
  });

  const categoryTracks = [
    { id: 'all', label: t.trackAll },
    { id: 'catA', label: "Cat A: Income Tax & Civil Services" },
    { id: 'catB', label: "Cat B: Public Banks & Regulatory" },
    { id: 'catC', label: "Cat C: Private Banking Pathways" },
    { id: 'catD', label: "Cat D: MPSC, PMC & Local Admin" },
    { id: 'catE', label: "Cat E: Railways, Defence & GATE PSU" }
  ];

  const bodies = [
    { id: 'all', label: "All Bodies" },
    { id: 'UPSC', label: "UPSC" },
    { id: 'SSC', label: "SSC (CBDT / CGL)" },
    { id: 'SBI', label: "SBI & IBPS" },
    { id: 'MPSC', label: "MPSC & Maharashtra" },
    { id: 'PMC', label: "PMC & PCMC Pune" },
    { id: 'Railway', label: "Railways RRB" },
    { id: 'ICICI', label: "Private Banks" }
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {t.directoryTitleExams}
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">
          {t.directoryTitleExams}
        </h2>
      </div>

      {/* Category Track Tabs (A, B, C, D, E) */}
      <div className="flex border-b border-[#E7E2D8] bg-[#FAF7F2] overflow-x-auto text-xs font-semibold scrollbar-none">
        {categoryTracks.map(track => (
          <button
            key={track.id}
            onClick={() => setSelectedGroupTrack(track.id)}
            className={`py-3.5 px-4 whitespace-nowrap border-b-2 transition-all ${
              selectedGroupTrack === track.id
                ? 'border-[#963628] text-[#963628] font-bold bg-[#F4EFEB]'
                : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            {track.label}
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#57534E] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholderExams}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-[#D4CDC1] text-sm text-[#1C1917] placeholder-[#57534E] focus:outline-none focus:border-[#963628] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#57534E] hover:text-[#963628] font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Conducting Body Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
          {bodies.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBodyFilter(b.id)}
              className={`px-3.5 py-2 rounded-full whitespace-nowrap transition-all border ${
                selectedBodyFilter === b.id
                  ? 'bg-[#963628] text-white border-[#963628] shadow-sm'
                  : 'bg-white text-[#57534E] border-[#E7E2D8] hover:border-[#963628] hover:text-[#1C1917]'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#57534E] pt-2 border-t border-[#E7E2D8]">
          <span>Showing <strong>{filteredExams.length}</strong> verified recruitment examinations</span>
        </div>

      </div>

      {/* Grid */}
      {filteredExams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map(exam => (
            <ExamCard
              key={exam.id}
              exam={exam}
              lang={lang}
              isSaved={savedExamIds.includes(exam.id)}
              onToggleSave={onToggleSave}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-4">
          <h3 className="text-xl font-serif font-bold text-[#1C1917]">
            No competitive exams found matching your search criteria
          </h3>
          <button
            onClick={() => { setSearchQuery(''); setSelectedGroupTrack('all'); setSelectedBodyFilter('all'); }}
            className="px-4 py-2 bg-[#963628] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 mx-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}

    </section>
  );
}
