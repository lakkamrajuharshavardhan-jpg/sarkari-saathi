import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import EligibilityWizard from './components/EligibilityWizard';
import EligibilityResults from './components/EligibilityResults';
import SchemeDirectory from './components/SchemeDirectory';
import ExamsDirectory from './components/ExamsDirectory';
import SchemeCard from './components/SchemeCard';
import ExamCard from './components/ExamCard';
import SchemeDetailDrawer from './components/SchemeDetailDrawer';
import ExamDetailDrawer from './components/ExamDetailDrawer';
import PrintableChecklistModal from './components/PrintableChecklistModal';
import AuthModal from './components/AuthModal';
import AlertSettingsModal from './components/AlertSettingsModal';
import CommunityForum from './components/CommunityForum';
import GovChatbot from './components/GovChatbot';
import TopNewsTicker from './components/TopNewsTicker';
import Footer from './components/Footer';

import { schemesData } from './data/schemes';
import { examsData } from './data/exams';
import { translations } from './data/translations';
import { auth, onAuthStateChanged, signOut, syncUserProfile } from './lib/firebase';
import { Bookmark, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' | 'hi'
  const [currentTab, setCurrentTab] = useState('hero'); // 'hero' | 'checker' | 'results' | 'directory-schemes' | 'directory-exams' | 'saved'

  // User Auth & Bookmarks
  const [user, setUser] = useState(null);

  // Subscribe to Firebase Auth State Changes & Auto Sync Profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await syncUserProfile(firebaseUser);
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || profile?.name || firebaseUser.email?.split('@')[0] || 'Citizen Candidate',
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          isLoggedIn: true
        });
      } else {
        const saved = localStorage.getItem('sarkari_saathi_user');
        if (saved) {
          try { setUser(JSON.parse(saved)); } catch (e) {}
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const [savedSchemeIds, setSavedSchemeIds] = useState(() => {
    try {
      const saved = localStorage.getItem('sarkari_saathi_saved_schemes');
      return saved ? JSON.parse(saved) : ['pm-kisan', 'ayushman-pmjay'];
    } catch (e) {
      return ['pm-kisan', 'ayushman-pmjay'];
    }
  });

  const [savedExamIds, setSavedExamIds] = useState(() => {
    try {
      const saved = localStorage.getItem('sarkari_saathi_saved_exams');
      return saved ? JSON.parse(saved) : ['upsc-cse', 'ssc-cgl-incometax'];
    } catch (e) {
      return ['upsc-cse', 'ssc-cgl-incometax'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sarkari_saathi_saved_schemes', JSON.stringify(savedSchemeIds));
    } catch (e) {}
  }, [savedSchemeIds]);

  useEffect(() => {
    try {
      localStorage.setItem('sarkari_saathi_saved_exams', JSON.stringify(savedExamIds));
    } catch (e) {}
  }, [savedExamIds]);

  // Profile & Matching Engine Results
  const [userProfile, setUserProfile] = useState(null);
  const [matchedSchemesResults, setMatchedSchemesResults] = useState([]);
  const [matchedExamsResults, setMatchedExamsResults] = useState([]);

  // Modals & Drawers
  const [selectedSchemeForDrawer, setSelectedSchemeForDrawer] = useState(null);
  const [selectedExamForDrawer, setSelectedExamForDrawer] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);

  // Toggle Save Hooks
  const handleToggleSaveScheme = (schemeId) => {
    setSavedSchemeIds(prev => prev.includes(schemeId) ? prev.filter(id => id !== schemeId) : [...prev, schemeId]);
  };

  const handleToggleSaveExam = (examId) => {
    setSavedExamIds(prev => prev.includes(examId) ? prev.filter(id => id !== examId) : [...prev, examId]);
  };

  // DUAL AI MATCHING ENGINE LOGIC
  const handleCalculateAllMatches = (profile) => {
    setUserProfile(profile);

    // ----------------------------------------------------
    // MODULE A: WELFARE SCHEME MATCHING ENGINE
    // ----------------------------------------------------
    const incomeMap = {
      incomeBelow1L: 100000,
      income1to3L: 300000,
      income3to6L: 600000,
      incomeAbove6L: 1000000
    };
    const numericIncome = incomeMap[profile.income] || 300000;

    const categoryMap = {
      catGeneral: 'General',
      catOBC: 'OBC',
      catSC: 'SC',
      catST: 'ST',
      catEWS: 'EWS'
    };
    const userCat = categoryMap[profile.category] || 'General';

    const schemeMatches = schemesData.map(scheme => {
      let score = 0;
      const reasons = [];
      const rules = scheme.eligibilityRules;

      if (profile.age >= rules.minAge && profile.age <= rules.maxAge) {
        score += 25;
        reasons.push(`Age ${profile.age} is within eligible age limit (${rules.minAge}-${rules.maxAge} yrs).`);
      }

      if (numericIncome <= rules.maxIncome) {
        score += 25;
        reasons.push(`Household income matches subsidy threshold (<= ₹${(rules.maxIncome/100000).toFixed(1)} Lakhs).`);
      }

      if (!rules.gender || rules.gender === profile.gender) {
        if (rules.categories.includes(userCat) || rules.categories.includes('General')) {
          score += 25;
          reasons.push(`Target group (${userCat} / ${profile.gender}) is eligible.`);
        }
      }

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
        score += 15;
      }

      return {
        scheme,
        score: Math.min(score, 100),
        reasons
      };
    }).sort((a, b) => b.score - a.score);

    setMatchedSchemesResults(schemeMatches);

    // ----------------------------------------------------
    // MODULE B: COMPETITIVE GOVT EXAMS MATCHING ENGINE
    // ----------------------------------------------------
    const examMatches = examsData.map(exam => {
      const reasons = [];

      // Calculate Category & Status Age Relaxation
      let totalAgeRelaxation = 0;
      if (userCat === 'OBC') totalAgeRelaxation += (exam.ageRelaxations.OBC || 3);
      if (userCat === 'SC' || userCat === 'ST') totalAgeRelaxation += (exam.ageRelaxations.SC || 5);
      if (profile.isPwd) totalAgeRelaxation += (exam.ageRelaxations.PwD || 10);
      if (profile.isExServiceman) totalAgeRelaxation += (exam.ageRelaxations.ExServiceman || 3);

      const relaxedMaxAge = exam.baseAgeMax + totalAgeRelaxation;

      // Age Verification
      let ageEligible = false;
      if (profile.age >= exam.baseAgeMin && profile.age <= relaxedMaxAge) {
        ageEligible = true;
        if (totalAgeRelaxation > 0 && profile.age > exam.baseAgeMax) {
          reasons.push(`Eligible under category age relaxation: Age is ${profile.age}, base limit is ${exam.baseAgeMax}, but relaxed limit is ${relaxedMaxAge} yrs.`);
        } else {
          reasons.push(`Age ${profile.age} is within base age limit (${exam.baseAgeMin}-${exam.baseAgeMax} yrs).`);
        }
      } else if (profile.age > relaxedMaxAge) {
        reasons.push(`Ineligible: Age is ${profile.age}, which exceeds maximum relaxed age limit of ${relaxedMaxAge} yrs for ${userCat} category.`);
      } else {
        reasons.push(`Ineligible: Age is ${profile.age}, minimum required age is ${exam.baseAgeMin} yrs.`);
      }

      // Educational Degree Verification
      let degreeEligible = false;
      const degreeLabelMap = {
        degree10th: "10th Pass / High School",
        degree12th: "12th Pass / Intermediate",
        degreeGrad: "Bachelor's Degree",
        degreeTech: "B.Tech / B.E",
        degreeScienceCom: "B.Sc / B.Com / B.A",
        degreePostGrad: "Master's Degree / Ph.D"
      };
      const userDegreeLabel = degreeLabelMap[profile.degree];

      if (exam.degreeCategory.includes(userDegreeLabel) || exam.degreeCategory.includes("Bachelor's Degree")) {
        degreeEligible = true;
        reasons.push(`Educational qualification (${userDegreeLabel}) matches exam requirement.`);
      } else {
        reasons.push(`Requires minimum qualification: ${exam.requiredDegreeEn}`);
      }

      // State PSC Domicile Verification
      let stateEligible = true;
      if (exam.applicableStates[0] !== "Pan-India") {
        if (exam.applicableStates.includes(profile.state)) {
          reasons.push(`Domicile State (${profile.state}) matches State PSC eligibility.`);
        } else {
          stateEligible = false;
          reasons.push(`State PSC exam primary quota applies for ${exam.applicableStates.join(', ')} domicile.`);
        }
      }

      // Determine Overall Status
      let status = 'Ineligible';
      if (ageEligible && degreeEligible && stateEligible) {
        status = 'Eligible';
      } else if (ageEligible && (userDegreeLabel.includes('12th') || userDegreeLabel.includes('Bachelor'))) {
        status = 'Conditionally Eligible';
      }

      return {
        exam,
        matchResult: {
          status,
          relaxedMaxAge,
          reasons
        }
      };
    }).sort((a, b) => {
      const order = { 'Eligible': 3, 'Conditionally Eligible': 2, 'Ineligible': 1 };
      return order[b.matchResult.status] - order[a.matchResult.status];
    });

    setMatchedExamsResults(examMatches);
    setCurrentTab('results');

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const t = translations[lang];

  const savedSchemesList = schemesData.filter(s => savedSchemeIds.includes(s.id));
  const savedExamsList = examsData.filter(e => savedExamIds.includes(e.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917]">
      
      {/* Top Breaking News & Live Updates Ticker Bar */}
      <TopNewsTicker
        lang={lang}
        onOpenSchemeDetails={(s) => setSelectedSchemeForDrawer(s)}
        onOpenExamDetails={(e) => setSelectedExamForDrawer(e)}
      />

      {/* Navbar */}
      <Navbar
        lang={lang}
        setLang={setLang}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        savedCount={savedSchemeIds.length + savedExamIds.length}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenAlertsModal={() => setIsAlertsModalOpen(true)}
        onSignOut={() => {
          signOut(auth).catch(() => {});
          localStorage.removeItem('sarkari_saathi_user');
          setUser(null);
        }}
      />

      {/* Main Container */}
      <main className="flex-1">
        
        {/* VIEW 1: HERO */}
        {currentTab === 'hero' && (
          <HeroSection
            lang={lang}
            onStartEligibility={() => setCurrentTab('checker')}
            onExploreDirectory={() => setCurrentTab('directory-schemes')}
          />
        )}

        {/* VIEW 2: 5-QUESTION WIZARD */}
        {currentTab === 'checker' && (
          <EligibilityWizard
            lang={lang}
            onSubmitProfile={handleCalculateAllMatches}
            onCancel={() => setCurrentTab('hero')}
          />
        )}

        {/* VIEW 3: DUAL RESULTS DASHBOARD */}
        {currentTab === 'results' && (
          <EligibilityResults
            lang={lang}
            profile={userProfile || { age: 26, gender: 'Female', state: 'Uttar Pradesh', category: 'catOBC', area: 'areaRural' }}
            matchedSchemes={matchedSchemesResults.length > 0 ? matchedSchemesResults : schemesData.map(s => ({ scheme: s, score: 90, reasons: ['Profile matches criteria'] }))}
            matchedExams={matchedExamsResults.length > 0 ? matchedExamsResults : examsData.map(e => ({ exam: e, matchResult: { status: 'Eligible', relaxedMaxAge: 35, reasons: ['Age and degree match'] } }))}
            savedSchemeIds={savedSchemeIds}
            savedExamIds={savedExamIds}
            onToggleSaveScheme={handleToggleSaveScheme}
            onToggleSaveExam={handleToggleSaveExam}
            onOpenSchemeDetails={(scheme) => setSelectedSchemeForDrawer(scheme)}
            onOpenExamDetails={(exam) => setSelectedExamForDrawer(exam)}
            onReCheck={() => setCurrentTab('checker')}
            onOpenPrintModal={() => setIsPrintModalOpen(true)}
          />
        )}

        {/* VIEW 4: SCHEMES DIRECTORY */}
        {currentTab === 'directory-schemes' && (
          <SchemeDirectory
            schemes={schemesData}
            lang={lang}
            savedSchemeIds={savedSchemeIds}
            onToggleSave={handleToggleSaveScheme}
            onOpenDetails={(scheme) => setSelectedSchemeForDrawer(scheme)}
          />
        )}

        {/* VIEW 5: EXAMS DIRECTORY */}
        {currentTab === 'directory-exams' && (
          <ExamsDirectory
            exams={examsData}
            lang={lang}
            savedExamIds={savedExamIds}
            onToggleSave={handleToggleSaveExam}
            onOpenDetails={(exam) => setSelectedExamForDrawer(exam)}
          />
        )}

        {/* VIEW 6: COMMUNITY FORUM */}
        {currentTab === 'forum' && (
          <CommunityForum
            lang={lang}
            user={user}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {/* VIEW 6: SAVED SHELF */}
        {currentTab === 'saved' && (
          <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
            
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

              {(savedSchemesList.length > 0 || savedExamsList.length > 0) && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPrintModalOpen(true)}
                    className="px-4 py-2 bg-[#963628] text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    {t.btnPrintChecklist}
                  </button>
                  <button
                    onClick={() => { setSavedSchemeIds([]); setSavedExamIds([]); }}
                    className="text-xs text-[#57534E] hover:text-[#963628] underline"
                  >
                    {t.clearSaved}
                  </button>
                </div>
              )}
            </div>

            {/* Saved Schemes Section */}
            {savedSchemesList.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-[#1C1917]">
                  {t.tabMatchedSchemes} ({savedSchemesList.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedSchemesList.map(scheme => (
                    <SchemeCard
                      key={scheme.id}
                      scheme={scheme}
                      lang={lang}
                      isSaved={true}
                      onToggleSave={handleToggleSaveScheme}
                      onOpenDetails={(s) => setSelectedSchemeForDrawer(s)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Saved Exams Section */}
            {savedExamsList.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-[#E7E2D8]">
                <h3 className="text-xl font-serif font-bold text-[#1C1917]">
                  {t.tabMatchedExams} ({savedExamsList.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedExamsList.map(exam => (
                    <ExamCard
                      key={exam.id}
                      exam={exam}
                      lang={lang}
                      isSaved={true}
                      onToggleSave={handleToggleSaveExam}
                      onOpenDetails={(e) => setSelectedExamForDrawer(e)}
                    />
                  ))}
                </div>
              </div>
            )}

            {savedSchemesList.length === 0 && savedExamsList.length === 0 && (
              <div className="text-center py-16 p-8 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-4">
                <AlertCircle className="w-10 h-10 text-[#963628] mx-auto" />
                <h3 className="text-xl font-serif font-bold text-[#1C1917]">
                  {t.noSavedTitle}
                </h3>
                <p className="text-sm text-[#57534E]">
                  {t.noSavedDesc}
                </p>
                <button
                  onClick={() => setCurrentTab('directory-schemes')}
                  className="px-5 py-2.5 bg-[#963628] text-white text-xs font-semibold rounded-lg"
                >
                  {t.navExploreSchemes}
                </button>
              </div>
            )}

          </section>
        )}

      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* DRAWER 1: SCHEME DETAILS */}
      <SchemeDetailDrawer
        scheme={selectedSchemeForDrawer}
        lang={lang}
        isOpen={Boolean(selectedSchemeForDrawer)}
        onClose={() => setSelectedSchemeForDrawer(null)}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
      />

      {/* DRAWER 2: EXAM DETAILS */}
      <ExamDetailDrawer
        exam={selectedExamForDrawer}
        lang={lang}
        matchResult={matchedExamsResults.find(m => m.exam.id === selectedExamForDrawer?.id)?.matchResult}
        isOpen={Boolean(selectedExamForDrawer)}
        onClose={() => setSelectedExamForDrawer(null)}
        onOpenPrintModal={() => setIsPrintModalOpen(true)}
      />

      {/* MODAL 3: PRINTABLE CHECKLIST */}
      <PrintableChecklistModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        lang={lang}
        profile={userProfile}
        schemes={matchedSchemesResults.length > 0 ? matchedSchemesResults.map(m => m.scheme) : savedSchemesList}
      />

      {/* MODAL 4: AUTH MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        lang={lang}
        onLoginSuccess={(u) => setUser(u)}
      />

      {/* MODAL 5: DEADLINE ALERT SETTINGS */}
      <AlertSettingsModal
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
        lang={lang}
        user={user}
        savedSchemes={savedSchemesList}
        savedExams={savedExamsList}
      />

      {/* FLOATING RAG AI CHATBOT WIDGET */}
      <GovChatbot lang={lang} />

    </div>
  );
}
