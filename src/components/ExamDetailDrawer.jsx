import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, CheckCircle2, Clock, Calendar, GraduationCap, FileText, ListOrdered, Award, Building2, Printer, BookOpen } from 'lucide-react';
import { translations } from '../data/translations';
import ExamPrepHub from './ExamPrepHub';
import TrustBadge from './TrustBadge';

export default function ExamDetailDrawer({
  exam,
  lang,
  matchResult,
  isOpen,
  onClose,
  onOpenPrintModal
}) {
  const [activeTab, setActiveTab] = useState('overview');
  if (!isOpen || !exam) return null;

  const t = translations[lang];

  const name = lang === 'hi' ? exam.nameHi : exam.nameEn;
  const jobLevel = lang === 'hi' ? exam.jobLevelHi : exam.jobLevelEn;
  const shortDesc = lang === 'hi' ? exam.shortDescHi : exam.shortDescEn;
  const requiredDegree = lang === 'hi' ? exam.requiredDegreeHi : exam.requiredDegreeEn;
  const documents = lang === 'hi' ? exam.documentsHi : exam.documentsEn;
  const otrSteps = lang === 'hi' ? exam.otrStepsHi : exam.otrStepsEn;
  const fees = lang === 'hi' ? exam.feesHi : exam.feesEn;

  const relaxedMaxAge = matchResult?.relaxedMaxAge || exam.baseAgeMax;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end animate-fadeIn">
      
      {/* Click Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E7E2D8] z-10">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E7E2D8] bg-[#F4EFEB] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#963628] text-white">
                {exam.code}
              </span>
              <span className="text-xs font-semibold text-[#57534E]">
                {exam.conductingBody} • {jobLevel}
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1C1917]">
              {name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#E7E2D8] text-[#57534E] hover:text-[#1C1917] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#E7E2D8] bg-[#FAF7F2] px-6 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', label: "Overview & Dates" },
            { id: 'prephub', label: "Syllabus & Prep Hub" },
            { id: 'eligibility', label: "Age & Qualification" },
            { id: 'fees', label: "Fees & Documents" },
            { id: 'steps', label: "How to Apply (OTR)" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#963628] text-[#963628] font-bold'
                  : 'border-transparent text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW & DATES */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Description Box */}
              <div className="p-5 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-2">
                <span className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  Official Exam Overview
                </span>
                <p className="text-sm text-[#1C1917] leading-relaxed font-medium">
                  {shortDesc}
                </p>
              </div>

              {/* Key Timeline Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-[#57534E] uppercase flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#963628]" />
                  {t.keyDatesLabel}
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-[#E7E2D8] space-y-1">
                    <span className="text-[#57534E] block font-mono uppercase text-[10px]">{t.notificationDateLabel}</span>
                    <span className="font-bold text-[#1C1917]">{exam.keyDates.notificationDateEn}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#E7E2D8] space-y-1">
                    <span className="text-[#57534E] block font-mono uppercase text-[10px]">{t.applicationStartLabel}</span>
                    <span className="font-bold text-[#1C1917]">{exam.keyDates.applicationStartEn}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#E7E2D8] space-y-1">
                    <span className="text-[#57534E] block font-mono uppercase text-[10px]">{t.applicationEndLabel}</span>
                    <span className="font-bold text-[#963628]">{exam.keyDates.applicationEndEn}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-[#E7E2D8] space-y-1">
                    <span className="text-[#57534E] block font-mono uppercase text-[10px]">{t.examDateLabel}</span>
                    <span className="font-bold text-[#2D5A43]">{exam.keyDates.examDateEn}</span>
                  </div>
                </div>
              </div>

              {/* Verified Source */}
              <div className="p-4 rounded-xl border border-[#E7E2D8] bg-white flex items-center justify-between text-xs text-[#57534E]">
                <span className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#2D5A43]" />
                  {t.officialSource}
                </span>
                <TrustBadge url={exam.officialUrl} />
              </div>
            </div>
          )}

          {/* TAB: SYLLABUS & PREP HUB */}
          {activeTab === 'prephub' && (
            <div className="animate-fadeIn">
              <ExamPrepHub examId={exam.id} examTitle={name} lang={lang} />
            </div>
          )}

          {/* TAB 2: ELIGIBILITY & AGE RELAXATION */}
          {activeTab === 'eligibility' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Age Limits Box */}
              <div className="p-5 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-3">
                <h4 className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  Age Limit & Relaxation Breakdown
                </h4>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-[#E7E2D8]">
                    <span className="text-[#57534E] block text-[10px] uppercase font-mono">{t.baseAgeLimitLabel}</span>
                    <span className="text-base font-bold font-serif text-[#1C1917]">{exam.baseAgeMin} - {exam.baseAgeMax} years</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#E7E2D8]">
                    <span className="text-[#57534E] block text-[10px] uppercase font-mono">{t.relaxedAgeLimitLabel}</span>
                    <span className="text-base font-bold font-serif text-[#2D5A43]">Up to {relaxedMaxAge} years</span>
                  </div>
                </div>

                {/* Age Relaxation Rules */}
                <div className="pt-2 text-xs text-[#57534E] space-y-1">
                  <span className="font-bold text-[#1C1917] block">Standard Age Relaxations:</span>
                  <p>• OBC: +3 years | SC/ST: +5 years | PwD: +10 to +15 years</p>
                  <p>• Ex-Servicemen: +3 years after deduction of military service</p>
                </div>
              </div>

              {/* Qualification Box */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-[#1C1917] uppercase flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#963628]" />
                  Educational Qualification Requirement
                </h4>

                <div className="p-4 rounded-xl bg-white border border-[#E7E2D8] space-y-2 text-sm">
                  <p className="font-bold text-[#1C1917]">
                    {requiredDegree}
                  </p>
                  <p className="text-xs text-[#57534E]">
                    Minimum Percentage Required: {exam.minPercentage > 0 ? `${exam.minPercentage}%` : "No minimum % required (Pass Class eligible)"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FEES & DOCUMENTS */}
          {activeTab === 'fees' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Application Fees */}
              <div className="p-5 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-3">
                <h4 className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  {t.applicationFeeLabel}
                </h4>

                <div className="space-y-2 text-xs font-semibold">
                  <div className="p-3 bg-white rounded-xl border border-[#E7E2D8] flex items-center justify-between">
                    <span className="text-[#57534E]">{t.feeGenObc}</span>
                    <span className="text-[#1C1917] font-bold text-sm">{fees.genObc}</span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#E7E2D8] flex items-center justify-between">
                    <span className="text-[#57534E]">{t.feeScStFemale}</span>
                    <span className="text-[#2D5A43] font-bold text-sm">{fees.scStFemalePwd}</span>
                  </div>
                </div>
              </div>

              {/* Documents Required */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-[#1C1917] uppercase flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#963628]" />
                  Required Documents Checklist
                </h4>

                <div className="space-y-2">
                  {documents.map((doc, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#E7E2D8] flex items-center gap-3 text-sm font-medium">
                      <div className="w-6 h-6 rounded-full bg-[#F4EFEB] text-[#963628] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-[#1C1917]">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HOW TO APPLY (OTR) */}
          {activeTab === 'steps' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
                  <ListOrdered className="w-4 h-4" />
                  {t.howToApplyLabel}
                </h4>

                <div className="space-y-3">
                  {otrSteps.map((step, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white border border-[#E7E2D8] space-y-1 text-sm">
                      <span className="text-xs font-mono font-bold text-[#963628] uppercase block">
                        Step 0{idx + 1}
                      </span>
                      <p className="text-[#1C1917] font-medium leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-[#E7E2D8] bg-[#F4EFEB] flex items-center justify-between gap-4">
          <a
            href={exam.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 bg-[#963628] hover:bg-[#7D2C1F] text-white text-xs sm:text-sm font-semibold rounded-xl text-center flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>{t.officialRegistrationBtn}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
