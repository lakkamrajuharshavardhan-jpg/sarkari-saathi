import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, User, Sparkles, MapPin, Briefcase, IndianRupee, Layers } from 'lucide-react';
import { translations } from '../data/translations';

export default function EligibilityWizard({ lang, onSubmitProfile, onCancel }) {
  const t = translations[lang];
  const [currentStep, setCurrentStep] = useState(1);

  // Profile Form State
  const [profile, setProfile] = useState({
    age: 28,
    gender: 'Female',
    income: 'incomeBelow1L',
    occupation: 'occFarmer',
    category: 'catOBC',
    state: 'Uttar Pradesh',
    area: 'areaRural'
  });

  // Pre-fill sample personas
  const applySamplePersona = (type) => {
    if (type === 'farmer') {
      setProfile({
        age: 42,
        gender: 'Male',
        income: 'incomeBelow1L',
        occupation: 'occFarmer',
        category: 'catOBC',
        state: 'Uttar Pradesh',
        area: 'areaRural'
      });
    } else if (type === 'student') {
      setProfile({
        age: 20,
        gender: 'Female',
        income: 'income1to3L',
        occupation: 'occStudent',
        category: 'catSC',
        state: 'Bihar',
        area: 'areaUrban'
      });
    } else if (type === 'entrepreneur') {
      setProfile({
        age: 34,
        gender: 'Female',
        income: 'income1to3L',
        occupation: 'occArtisan',
        category: 'catEWS',
        state: 'Rajasthan',
        area: 'areaRural'
      });
    }
  };

  const statesList = [
    "Uttar Pradesh", "Bihar", "Rajasthan", "Madhya Pradesh", "Maharashtra",
    "West Bengal", "Tamil Nadu", "Karnataka", "Gujarat", "Odisha",
    "Punjab", "Haryana", "Telangana", "Kerala", "Assam", "Jharkhand", "Pan-India / All States"
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      onSubmitProfile(profile);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Wizard Header */}
      <div className="text-center space-y-3 mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4EFEB] border border-[#E7E2D8] text-xs font-mono font-bold text-[#963628] uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          {t.wizardTitle}
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1917]">
          {t.wizardSubtitle}
        </h2>
      </div>

      {/* Pre-fill Sample Personas Bar */}
      <div className="mb-8 p-4 rounded-xl bg-[#F4EFEB] border border-[#E7E2D8] flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-[#57534E] flex items-center gap-1.5">
          <User className="w-4 h-4 text-[#963628]" />
          {t.samplePersonasLabel}
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applySamplePersona('farmer')}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#D4CDC1] hover:border-[#963628] text-[#1C1917] font-medium transition-all"
          >
            {t.personaFarmer}
          </button>
          <button
            onClick={() => applySamplePersona('student')}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#D4CDC1] hover:border-[#963628] text-[#1C1917] font-medium transition-all"
          >
            {t.personaStudent}
          </button>
          <button
            onClick={() => applySamplePersona('entrepreneur')}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#D4CDC1] hover:border-[#963628] text-[#1C1917] font-medium transition-all"
          >
            {t.personaEntrepreneur}
          </button>
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="mb-8 space-y-2">
        <div className="flex justify-between items-center text-xs font-mono font-semibold text-[#57534E]">
          <span>{t.stepOf} 0{currentStep} / 05</span>
          <span>{Math.round((currentStep / 5) * 100)}% Completed</span>
        </div>
        <div className="w-full h-2.5 bg-[#E7E2D8] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#963628] transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Container Card */}
      <div className="p-6 sm:p-10 rounded-2xl bg-[#FAF7F2] border border-[#E7E2D8] shadow-sm space-y-8 min-h-[420px] flex flex-col justify-between">
        
        {/* QUESTION STEP 1: Age & Gender */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
                <User className="w-4 h-4" />
                Step 1 of 5
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
                {t.step1Title}
              </h3>
              <p className="text-sm text-[#57534E]">
                {t.step1Desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {/* Age Slider / Input */}
              <div className="space-y-3 p-4 rounded-xl bg-[#F4EFEB] border border-[#E7E2D8]">
                <label className="block text-sm font-semibold text-[#1C1917]">
                  {t.labelAge}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="14"
                    max="85"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                    className="w-full accent-[#963628] cursor-pointer"
                  />
                  <span className="w-12 text-center text-xl font-bold font-serif text-[#963628] bg-white px-2 py-1 rounded border border-[#E7E2D8]">
                    {profile.age}
                  </span>
                </div>
              </div>

              {/* Gender Radio Grid */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-[#1C1917]">
                  {t.labelGender}
                </label>
                <div className="space-y-2">
                  {[
                    { key: 'Female', label: t.genderFemale },
                    { key: 'Male', label: t.genderMale },
                    { key: 'Other', label: t.genderOther }
                  ].map((g) => (
                    <button
                      key={g.key}
                      type="button"
                      onClick={() => setProfile({ ...profile, gender: g.key })}
                      className={`w-full p-3 text-left rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                        profile.gender === g.key
                          ? 'border-[#963628] bg-white text-[#963628] font-bold shadow-sm'
                          : 'border-[#E7E2D8] bg-[#F4EFEB] text-[#1C1917] hover:border-[#D4CDC1]'
                      }`}
                    >
                      <span>{g.label}</span>
                      {profile.gender === g.key && <CheckCircle2 className="w-4 h-4 text-[#963628]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QUESTION STEP 2: Annual Household Income */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4" />
                Step 2 of 5
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
                {t.step2Title}
              </h3>
              <p className="text-sm text-[#57534E]">
                {t.step2Desc}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { key: 'incomeBelow1L', label: t.incomeBelow1L },
                { key: 'income1to3L', label: t.income1to3L },
                { key: 'income3to6L', label: t.income3to6L },
                { key: 'incomeAbove6L', label: t.incomeAbove6L }
              ].map((inc) => (
                <button
                  key={inc.key}
                  type="button"
                  onClick={() => setProfile({ ...profile, income: inc.key })}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                    profile.income === inc.key
                      ? 'border-[#963628] bg-white text-[#963628] font-bold shadow-sm'
                      : 'border-[#E7E2D8] bg-[#F4EFEB] text-[#1C1917] hover:border-[#D4CDC1]'
                  }`}
                >
                  <span className="text-base">{inc.label}</span>
                  {profile.income === inc.key && <CheckCircle2 className="w-5 h-5 text-[#963628]" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* QUESTION STEP 3: Occupation */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" />
                Step 3 of 5
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
                {t.step3Title}
              </h3>
              <p className="text-sm text-[#57534E]">
                {t.step3Desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { key: 'occFarmer', label: t.occFarmer },
                { key: 'occStudent', label: t.occStudent },
                { key: 'occArtisan', label: t.occArtisan },
                { key: 'occSalaried', label: t.occSalaried },
                { key: 'occUnemployed', label: t.occUnemployed },
                { key: 'occSenior', label: t.occSenior },
                { key: 'occHomemaker', label: t.occHomemaker }
              ].map((occ) => (
                <button
                  key={occ.key}
                  type="button"
                  onClick={() => setProfile({ ...profile, occupation: occ.key })}
                  className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                    profile.occupation === occ.key
                      ? 'border-[#963628] bg-white text-[#963628] font-bold shadow-sm'
                      : 'border-[#E7E2D8] bg-[#F4EFEB] text-[#1C1917] hover:border-[#D4CDC1]'
                  }`}
                >
                  <span>{occ.label}</span>
                  {profile.occupation === occ.key && <CheckCircle2 className="w-4 h-4 text-[#963628]" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* QUESTION STEP 4: Category */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                Step 4 of 5
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
                {t.step4Title}
              </h3>
              <p className="text-sm text-[#57534E]">
                {t.step4Desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { key: 'catGeneral', label: t.catGeneral },
                { key: 'catOBC', label: t.catOBC },
                { key: 'catSC', label: t.catSC },
                { key: 'catST', label: t.catST },
                { key: 'catEWS', label: t.catEWS },
                { key: 'catPwD', label: t.catPwD },
                { key: 'catWidow', label: t.catWidow }
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setProfile({ ...profile, category: cat.key })}
                  className={`p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                    profile.category === cat.key
                      ? 'border-[#963628] bg-white text-[#963628] font-bold shadow-sm'
                      : 'border-[#E7E2D8] bg-[#F4EFEB] text-[#1C1917] hover:border-[#D4CDC1]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {profile.category === cat.key && <CheckCircle2 className="w-4 h-4 text-[#963628]" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* QUESTION STEP 5: State & Area */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                Step 5 of 5
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917]">
                {t.step5Title}
              </h3>
              <p className="text-sm text-[#57534E]">
                {t.step5Desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Select State */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#1C1917]">
                  {t.labelState}
                </label>
                <select
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-white border border-[#D4CDC1] text-sm text-[#1C1917] font-medium focus:outline-none focus:border-[#963628]"
                >
                  {statesList.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* Select Area */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#1C1917]">
                  {t.labelArea}
                </label>
                <div className="space-y-2">
                  {[
                    { key: 'areaRural', label: t.areaRural },
                    { key: 'areaUrban', label: t.areaUrban }
                  ].map((ar) => (
                    <button
                      key={ar.key}
                      type="button"
                      onClick={() => setProfile({ ...profile, area: ar.key })}
                      className={`w-full p-3 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${
                        profile.area === ar.key
                          ? 'border-[#963628] bg-white text-[#963628] font-bold shadow-sm'
                          : 'border-[#E7E2D8] bg-[#F4EFEB] text-[#1C1917] hover:border-[#D4CDC1]'
                      }`}
                    >
                      <span>{ar.label}</span>
                      {profile.area === ar.key && <CheckCircle2 className="w-4 h-4 text-[#963628]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls Footer */}
        <div className="pt-6 border-t border-[#E7E2D8] flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[#57534E] hover:text-[#1C1917] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.btnBack}</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-[#963628] hover:bg-[#7D2C1F] text-white text-sm font-semibold rounded-lg shadow-md transition-all"
          >
            <span>{currentStep === 5 ? t.btnFindMatches : t.btnNext}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </section>
  );
}
