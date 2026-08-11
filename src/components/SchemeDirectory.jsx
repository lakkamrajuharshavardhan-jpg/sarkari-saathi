import React, { useState } from 'react';
import { Search, Filter, Sparkles, RefreshCw } from 'lucide-react';
import SchemeCard from './SchemeCard';
import { translations } from '../data/translations';

export default function SchemeDirectory({
  schemes,
  lang,
  savedSchemeIds,
  onToggleSave,
  onOpenDetails
}) {
  const t = translations[lang];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStateFilter, setSelectedStateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  // Filter & Search Logic
  const filteredSchemes = schemes.filter(scheme => {
    // Search query matching
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      const matchTitleEn = scheme.titleEn.toLowerCase().includes(q);
      const matchTitleHi = scheme.titleHi.toLowerCase().includes(q);
      const matchCode = scheme.code.toLowerCase().includes(q);
      const matchCategory = scheme.category.toLowerCase().includes(q);
      const matchDocs = scheme.documentsEn.some(d => d.toLowerCase().includes(q)) || scheme.documentsHi.some(d => d.includes(q));
      if (!matchTitleEn && !matchTitleHi && !matchCode && !matchCategory && !matchDocs) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'all' && scheme.category !== selectedCategory) {
      return false;
    }

    // State filter
    if (selectedStateFilter === 'central' && !scheme.offeredBy.includes('Central')) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortedSchemes = [...filteredSchemes].sort((a, b) => {
    if (sortBy === 'popular') return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    return 0;
  });

  const categories = [
    { id: 'all', label: t.catAll },
    { id: 'Agriculture', label: t.catAgriculture },
    { id: 'Health', label: t.catHealth },
    { id: 'Education', label: t.catEducation },
    { id: 'Housing', label: t.catHousing },
    { id: 'Women', label: t.catWomen },
    { id: 'Loans', label: t.catLoans },
    { id: 'Pension', label: t.catPension }
  ];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Directory Title Banner */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {t.directoryTitle}
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">
          {t.directorySubtitle}
        </h2>
      </div>

      {/* Search & Main Filter Controls Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-4">
        
        {/* Search Bar Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#57534E] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
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

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-full whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-[#963628] text-white border-[#963628] shadow-sm'
                  : 'bg-white text-[#57534E] border-[#E7E2D8] hover:border-[#963628] hover:text-[#1C1917]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* State & Sort Dropdowns */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#E7E2D8] text-xs font-medium">
          <div className="flex items-center gap-3">
            <span className="text-[#57534E] flex items-center gap-1 font-semibold">
              <Filter className="w-3.5 h-3.5" />
              Filter Scope:
            </span>
            <select
              value={selectedStateFilter}
              onChange={(e) => setSelectedStateFilter(e.target.value)}
              className="p-2 rounded-lg bg-white border border-[#D4CDC1] text-[#1C1917] focus:outline-none"
            >
              <option value="all">{t.stateAll}</option>
              <option value="central">{t.stateCentral}</option>
            </select>
          </div>

          <div className="text-[#57534E] font-mono">
            Showing <span className="font-bold text-[#1C1917]">{sortedSchemes.length}</span> schemes
          </div>
        </div>

      </div>

      {/* Grid of Scheme Cards */}
      {sortedSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSchemes.map(scheme => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              lang={lang}
              isSaved={savedSchemeIds.includes(scheme.id)}
              onToggleSave={onToggleSave}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-4">
          <h3 className="text-xl font-serif font-bold text-[#1C1917]">
            No schemes found matching your search criteria
          </h3>
          <p className="text-sm text-[#57534E]">
            Try clearing filters or searching for terms like "Kisan", "Pension", "Health", or "Loan".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedStateFilter('all'); }}
            className="px-4 py-2 bg-[#963628] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 mx-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

    </section>
  );
}
