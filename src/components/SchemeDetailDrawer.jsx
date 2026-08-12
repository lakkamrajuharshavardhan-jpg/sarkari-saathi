import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, CheckCircle2, FileText, ListOrdered, Award, Building2, MapPin, Printer } from 'lucide-react';
import { translations } from '../data/translations';
import TrustBadge from './TrustBadge';

export default function SchemeDetailDrawer({
  scheme,
  lang,
  isOpen,
  onClose,
  onOpenPrintModal
}) {
  const [activeTab, setActiveTab] = useState('overview');
  if (!isOpen || !scheme) return null;

  const t = translations[lang];

  const title = lang === 'hi' ? scheme.titleHi : scheme.titleEn;
  const category = lang === 'hi' ? scheme.categoryHi : scheme.category;
  const benefit = lang === 'hi' ? scheme.benefitHi : scheme.benefitEn;
  const shortDesc = lang === 'hi' ? scheme.shortDescHi : scheme.shortDescEn;
  const offeredBy = lang === 'hi' ? scheme.offeredByHi : scheme.offeredBy;
  const matchCriteria = lang === 'hi' ? scheme.matchCriteriaHi : scheme.matchCriteriaEn;
  const documents = lang === 'hi' ? scheme.documentsHi : scheme.documentsEn;
  const applicationSteps = lang === 'hi' ? scheme.applicationStepsHi : scheme.applicationStepsEn;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end animate-fadeIn">
      
      {/* Click Backdrop to Close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container (Span right) */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E7E2D8] z-10">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E7E2D8] bg-[#F4EFEB] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#963628] text-white">
                {scheme.code}
              </span>
              <span className="text-xs font-semibold text-[#57534E]">
                {category} • {offeredBy}
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1C1917]">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#E7E2D8] text-[#57534E] hover:text-[#1C1917] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex border-b border-[#E7E2D8] bg-[#FAF7F2] px-6 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', label: t.tabOverview },
            { id: 'eligibility', label: t.tabEligibility },
            { id: 'documents', label: t.tabDocuments },
            { id: 'steps', label: t.tabSteps }
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

        {/* Drawer Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Highlight Benefit Box */}
              <div className="p-5 rounded-2xl bg-[#F4EFEB] border border-[#E7E2D8] space-y-2">
                <span className="text-xs font-mono font-bold text-[#2D5A43] uppercase flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  {t.benefitLabel}
                </span>
                <p className="text-xl font-serif font-bold text-[#1C1917]">
                  {benefit}
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-[#57534E] uppercase">
                  Description
                </h4>
                <p className="text-sm text-[#1C1917] leading-relaxed">
                  {shortDesc}
                </p>
              </div>

              {/* Verified Source Freshness */}
              <div className="p-4 rounded-xl border border-[#E7E2D8] bg-white flex items-center justify-between text-xs text-[#57534E]">
                <span className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#2D5A43]" />
                  {t.officialSource}
                </span>
                <TrustBadge url={scheme.officialUrl || "https://india.gov.in"} />
              </div>
            </div>
          )}

          {/* TAB 2: ELIGIBILITY */}
          {activeTab === 'eligibility' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-3">
                <h4 className="text-sm font-mono font-bold text-[#963628] uppercase flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  {t.whyMatchTitle}
                </h4>
                <div className="space-y-2">
                  {matchCriteria.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#E7E2D8] flex items-start gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#2D5A43] shrink-0 mt-0.5" />
                      <span className="text-[#1C1917] font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rule Summary */}
              <div className="p-4 rounded-xl bg-[#F4EFEB] border border-[#E7E2D8] text-xs space-y-1 text-[#57534E]">
                <span className="font-bold text-[#1C1917] block">Eligibility Snapshot:</span>
                <p>Eligible Occupations: {scheme.eligibilityRules.occupations.join(', ')}</p>
                <p>Eligible Target Groups: {scheme.eligibilityRules.categories.join(', ')}</p>
              </div>
            </div>
          )}

          {/* TAB 3: DOCUMENTS REQUIRED */}
          {activeTab === 'documents' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-3">
                <h4 className="text-sm font-serif font-bold text-[#1C1917] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#963628]" />
                  {t.documentsChecklistHeader}
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

              {/* Printable Callout */}
              <button
                onClick={onOpenPrintModal}
                className="w-full p-3 bg-[#F4EFEB] hover:bg-[#E7E2D8] border border-[#D4CDC1] rounded-xl text-xs font-bold text-[#1C1917] flex items-center justify-center gap-2 transition-all"
              >
                <Printer className="w-4 h-4 text-[#963628]" />
                <span>{t.btnPrintChecklist}</span>
              </button>
            </div>
          )}

          {/* TAB 4: APPLICATION STEPS */}
          {activeTab === 'steps' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-3">
                <h4 className="text-sm font-serif font-bold text-[#1C1917] flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-[#2D5A43]" />
                  {t.stepsHeader}
                </h4>
                <div className="space-y-3">
                  {applicationSteps.map((step, idx) => (
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

              {/* CSC Offline Guidance */}
              <div className="p-4 rounded-xl bg-[#2D5A43]/10 border border-[#2D5A43]/20 space-y-1">
                <span className="text-xs font-bold text-[#2D5A43] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  {t.offlineGuidanceTitle}
                </span>
                <p className="text-xs text-[#1C1917]">
                  {t.offlineGuidanceBody}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 border-t border-[#E7E2D8] bg-[#F4EFEB] flex items-center justify-between gap-4">
          <a
            href={scheme.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 bg-[#963628] hover:bg-[#7D2C1F] text-white text-xs sm:text-sm font-semibold rounded-xl text-center flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>{t.officialPortalBtn}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
