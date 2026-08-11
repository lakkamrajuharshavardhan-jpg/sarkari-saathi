import React from 'react';
import { X, Printer, CheckSquare, ShieldCheck, Building2, User, FileText } from 'lucide-react';
import { translations } from '../data/translations';

export default function PrintableChecklistModal({
  isOpen,
  onClose,
  lang,
  profile,
  schemes
}) {
  if (!isOpen) return null;

  const t = translations[lang];
  const currentDate = new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Extract all unique documents across the shortlisted schemes
  const masterDocSet = new Set();
  schemes.forEach(s => {
    const docList = lang === 'hi' ? s.documentsHi : s.documentsEn;
    docList.forEach(d => masterDocSet.add(d));
  });
  const masterDocs = Array.from(masterDocSet);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white text-[#1C1917] rounded-2xl shadow-2xl overflow-hidden border border-[#E7E2D8] flex flex-col max-h-[90vh]">
        
        {/* Modal Top Actions (No Print) */}
        <div className="no-print p-4 bg-[#F4EFEB] border-b border-[#E7E2D8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#963628]" />
            <span className="font-serif font-bold text-[#1C1917] text-lg">
              {t.printTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#963628] hover:bg-[#7D2C1F] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{t.btnPrintNow}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-[#E7E2D8] text-[#57534E]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE DOCUMENT BODY */}
        <div className="p-8 overflow-y-auto space-y-6 bg-white font-sans text-[#1C1917]" id="printable-area">
          
          {/* Document Header */}
          <div className="border-b-2 border-[#1C1917] pb-4 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-[#963628] text-white font-serif font-bold text-xl flex items-center justify-center">
                  स
                </div>
                <span className="font-serif font-bold text-xl tracking-tight text-[#1C1917]">
                  {t.brandName}
                </span>
              </div>
              <p className="text-xs text-[#57534E] mt-1 font-semibold uppercase tracking-wider">
                {t.printSubtitle}
              </p>
            </div>

            <div className="text-right text-xs text-[#57534E] font-mono">
              <div>{t.printDate}: <span className="font-bold text-[#1C1917]">{currentDate}</span></div>
              <div className="text-[10px] text-[#2D5A43] font-bold mt-1">✓ VERIFIED CIVIC SNAPSHOT</div>
            </div>
          </div>

          {/* Citizen Profile Box */}
          {profile && (
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8] space-y-2">
              <h4 className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {t.printProfileSummary}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div><span className="text-[#57534E]">State:</span> <strong className="text-[#1C1917]">{profile.state}</strong></div>
                <div><span className="text-[#57534E]">Age & Gender:</span> <strong className="text-[#1C1917]">{profile.age} yrs, {profile.gender}</strong></div>
                <div><span className="text-[#57534E]">Category:</span> <strong className="text-[#1C1917]">{profile.category}</strong></div>
                <div><span className="text-[#57534E]">Area:</span> <strong className="text-[#1C1917]">{profile.area === 'areaRural' ? 'Rural' : 'Urban'}</strong></div>
              </div>
            </div>
          )}

          {/* Shortlisted Eligible Schemes */}
          <div className="space-y-3">
            <h4 className="text-sm font-serif font-bold text-[#1C1917] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#963628]" />
              {t.printMatchedSchemes} ({schemes.length})
            </h4>

            <div className="space-y-2">
              {schemes.map((s, idx) => (
                <div key={s.id} className="p-3 rounded-lg border border-[#E7E2D8] bg-white flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-[#1C1917]">
                      {idx + 1}. {lang === 'hi' ? s.titleHi : s.titleEn} ({s.code})
                    </span>
                    <p className="text-[11px] text-[#57534E]">
                      {s.offeredBy}
                    </p>
                  </div>
                  <div className="text-right font-bold text-[#2D5A43]">
                    {lang === 'hi' ? s.benefitHi : s.benefitEn}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Master Required Documents Checklist */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-serif font-bold text-[#1C1917] flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#2D5A43]" />
              {t.printRequiredDocs}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {masterDocs.map((doc, i) => (
                <div key={i} className="p-2.5 rounded border border-[#E7E2D8] bg-[#FAF7F2] flex items-center gap-2.5">
                  <div className="w-4 h-4 border-2 border-[#1C1917] rounded flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 bg-transparent" />
                  </div>
                  <span className="font-medium text-[#1C1917]">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Help Desk Instructions */}
          <div className="pt-4 border-t border-[#E7E2D8] text-[11px] text-[#57534E] flex justify-between items-center">
            <span>Take this sheet with your original documents to your nearest Jan Seva Kendra / CSC.</span>
            <span className="font-mono font-bold">www.sarkarisaathi.in</span>
          </div>

        </div>

      </div>
    </div>
  );
}
