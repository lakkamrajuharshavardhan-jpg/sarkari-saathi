import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EligibilityWizard from './components/EligibilityWizard';
import EligibilityResults from './components/EligibilityResults';
import SchemeDirectory from './components/SchemeDirectory';
import SchemeCard from './components/SchemeCard';
import SchemeDetailDrawer from './components/SchemeDetailDrawer';
import PrintableChecklistModal from './components/PrintableChecklistModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

import { schemesData } from './data/schemes';
import { translations } from './data/translations';
import { Bookmark, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' | 'hi'
  const [currentTab, setCurrentTab] = useState('hero'); // 'hero' | 'checker' | 'results' | 'directory' | 'saved'

  // User Auth & Persistent Bookmarks State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sarkari_saathi_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [savedSchemeIds, setSavedSchemeIds] = useState(() => {
    try {
      const saved = localStorage.getItem('sarkari_saathi_saved');
      return saved ? JSON.parse(saved) : ['pm-kisan', 'ayushman-pmjay'];
    } catch (e) {
      return ['pm-kisan', 'ayushman-pmjay'];
    }
  });

  // Save bookmarked schemes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sarkari_saathi_saved', JSON.stringify(savedSchemeIds));
    } catch (e) {}
  }, [savedSchemeIds]);

  // Profile & Matching State
  const [userProfile, setUserProfile] = useState(null);
  const [matchedResults, setMatchedResults] = useState([]);

  // Modals & Drawers
  const [selectedSchemeForDrawer, setSelectedSchemeForDrawer] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Toggle Save Scheme Bookmark
  const handleToggleSave = (schemeId) => {
    setSavedSchemeIds(prev => {
      if (prev.includes(schemeId)) {
        return prev.filter(id => id !== schemeId);
      } else {
        return [...prev, schemeId];
      }
    });
  };

  // Deterministic AI Matching Algorithm
  const handleCalculateMatches = (profile) => {
    setUserProfile(profile);

    // Map income key to numeric upper bound
    const incomeMap = {
      incomeBelow1L: 100000,
      income1to3L: 300000,
      income3to6L: 600000,
      incomeAbove6L: 1000000
    };
    const numericIncome = incomeMap[profile.income] || 300000;

    // Map category key to standard label
    const categoryMap = {
      catGeneral: 'General',
      catOBC: 'OBC',
      catSC: 'SC',
      catST: 'ST',
      catEWS: 'EWS',
      catPwD: 'PwD',
      catWidow: 'Widow'
    };
    const userCat = categoryMap[profile.category] || 'General';

    // Evaluate each scheme against rules
    const matches = schemesData.map(scheme => {
      let score = 0;
      let totalCriteria = 4;
      const reasons = [];

      const rules = scheme.eligibilityRules;

      // 1. Age check
      if (profile.age >= rules.minAge && profile.age <= rules.maxAge) {
        score += 25;
        reasons.push(`Age ${profile.age} is within eligible age limit (${rules.minAge}-${rules.maxAge} yrs).`);
      }

      // 2. Income check
      if (numericIncome <= rules.maxIncome) {
        score += 25;
        reasons.push(`Household income matches subsidy threshold (<= ₹${(rules.maxIncome/100000).toFixed(1)} Lakhs).`);
      }

      // 3. Category / Gender check
      if (!rules.gender || rules.gender === profile.gender) {
        if (rules.categories.includes(userCat) || rules.categories.includes('General')) {
          score += 25;
          reasons.push(`Target group (${userCat} / ${profile.gender}) is eligible.`);
        }
      }

      // 4. Occupation / Sector check
      const occMap = {
        occFarmer: 'Farmer / Agriculture Worker',
        occStudent: 'Student / Youth Scholar',
        occArtisan: 'Artisan / Small Business / Micro-entrepreneur',
        occSalaried: 'Salaried / Service Worker',
        occUnemployed: 'Unemployed / Looking for Work',
        occSenior: 'Senior Citizen / Retired',
        occHomemaker: 'Homemaker / Domestic Worker'
      };
      const userOccLabel = occMap[profile.occupation];
      if (rules.occupations.includes(userOccLabel)) {
        score += 25;
        reasons.push(`Occupation (${userOccLabel}) matches scheme target sector.`);
      } else {
        score += 15; // partial points for general public accessibility
      }

      return {
        scheme,
        score: Math.min(score, 100),
        reasons
      };
    });

    // Sort by highest match score
    const sortedMatches = matches.sort((a, b) => b.score - a.score);
    setMatchedResults(sortedMatches);
    setCurrentTab('results');

    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const t = translations[lang];

  // Filter schemes saved by user for the Saved Shelf tab
  const savedSchemesList = schemesData.filter(s => savedSchemeIds.includes(s.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917]">
      
      {/* Top Navbar Component */}
      <Navbar
        lang={lang}
        setLang={setLang}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        savedCount={savedSchemeIds.length}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onSignOut={() => {
          localStorage.removeItem('sarkari_saathi_user');
          setUser(null);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: HERO / LANDING PAGE */}
        {currentTab === 'hero' && (
          <HeroSection
            lang={lang}
            onStartEligibility={() => setCurrentTab('checker')}
            onExploreDirectory={() => setCurrentTab('directory')}
          />
        )}

        {/* VIEW 2: 5-QUESTION ELIGIBILITY CHECKER WIZARD */}
        {currentTab === 'checker' && (
          <EligibilityWizard
            lang={lang}
            onSubmitProfile={handleCalculateMatches}
            onCancel={() => setCurrentTab('hero')}
          />
        )}

        {/* VIEW 3: MATCHED RESULTS VIEW */}
        {currentTab === 'results' && (
          <EligibilityResults
            lang={lang}
            profile={userProfile || { age: 28, gender: 'Female', state: 'Uttar Pradesh', category: 'OBC', area: 'areaRural' }}
            matchedSchemes={matchedResults.length > 0 ? matchedResults : schemesData.map(s => ({ scheme: s, score: 90, reasons: ['Profile matches general criteria'] }))}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSave}
            onOpenDetails={(scheme) => setSelectedSchemeForDrawer(scheme)}
            onReCheck={() => setCurrentTab('checker')}
            onOpenPrintModal={() => setIsPrintModalOpen(true)}
          />
        )}

        {/* VIEW 4: SCHEME DIRECTORY */}
        {currentTab === 'directory' && (
          <SchemeDirectory
            schemes={schemesData}
            lang={lang}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSave}
            onOpenDetails={(scheme) => setSelectedSchemeForDrawer(scheme)}
          />
        )}

        {/* VIEW 5: SAVED SCHEMES SHELF */}
        {currentTab === 'saved' && (
          <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E2D8] pb-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 fill-current" />
                  {t.savedTitle}
                </span>
                <h2 className="text-3xl font-serif font-bold text-[#1C1917]">
                  {t.savedSubtitle}
                </h2>
              </div>

              {savedSchemesList.length > 0 && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPrintModalOpen(true)}
                    className="px-4 py-2 bg-[#963628] text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    {t.btnPrintChecklist}
                  </button>
                  <button
                    onClick={() => setSavedSchemeIds([])}
                    className="text-xs text-[#57534E] hover:text-[#963628] underline"
                  >
                    {t.clearSaved}
                  </button>
                </div>
              )}
            </div>

            {/* Saved Grid */}
            {savedSchemesList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedSchemesList.map(scheme => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    lang={lang}
                    isSaved={true}
                    onToggleSave={handleToggleSave}
                    onOpenDetails={(s) => setSelectedSchemeForDrawer(s)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 p-8 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-4">
                <AlertCircle className="w-10 h-10 text-[#963628] mx-auto" />
                <h3 className="text-xl font-serif font-bold text-[#1C1917]">
                  {t.noSavedTitle}
                </h3>
                <p className="text-sm text-[#57534E]">
                  {t.noSavedDesc}
                </p>
                <button
                  onClick={() => setCurrentTab('directory')}
                  className="px-5 py-2.5 bg-[#963628] text-white text-xs font-semibold rounded-lg"
                >
                  {t.navExplore}
                </button>
              </div>
            )}
          </section>
        )}

      </main>

      {/* Footer Component */}
      <Footer lang={lang} />

      {/* MODAL 1: SCHEME DETAIL DRAWER */}
      <SchemeDetailDrawer
        scheme={selectedSchemeForDrawer}
        lang={lang}
        isOpen={Boolean(selectedSchemeForDrawer)}
        onClose={() => setSelectedSchemeForDrawer(null)}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
      />

      {/* MODAL 2: PRINTABLE HELP DESK CHECKLIST MODAL */}
      <PrintableChecklistModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        lang={lang}
        profile={userProfile}
        schemes={matchedResults.length > 0 ? matchedResults.map(m => m.scheme) : savedSchemesList}
      />

      {/* MODAL 3: AUTH LOGIN/REGISTER MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        lang={lang}
        onLoginSuccess={(u) => setUser(u)}
      />

    </div>
  );
}
