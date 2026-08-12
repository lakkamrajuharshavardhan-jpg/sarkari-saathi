import React, { useState } from 'react';
import { BookOpen, FileText, Download, ExternalLink, ChevronDown, ChevronUp, CheckCircle, Sparkles, Award, ShieldCheck } from 'lucide-react';
import { examStudyMaterials } from '../data/examStudyMaterials';
import TrustBadge from './TrustBadge';

export default function ExamPrepHub({ examId, examTitle, lang = 'en' }) {
  const [activeTab, setActiveTab] = useState('syllabus'); // 'syllabus' | 'pyq' | 'resources'
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);

  const materials = examStudyMaterials[examId] || {
    examId,
    examTitle: examTitle || "Competitive Exam Preparation",
    syllabusBreakdown: [
      {
        stage: "Stage 1: Preliminary / Screening Examination",
        description: "Objective type multiple-choice test covering General Awareness, Aptitude & Subject Knowledge.",
        papers: [
          { name: "General Knowledge & Current Affairs", topics: ["Indian History, Polity, Geography", "National & International Events", "Economy & General Science"] },
          { name: "Reasoning & Quantitative Aptitude", topics: ["Logical & Analytical Reasoning", "Numerical Ability & Data Interpretation"] }
        ]
      },
      {
        stage: "Stage 2: Mains Descriptive / Written Examination",
        description: "Descriptive paper testing in-depth conceptual clarity and analytical writing ability."
      },
      {
        stage: "Stage 3: Interview / Document Verification",
        description: "Personality assessment and verification of original certificates."
      }
    ],
    previousYearPapers: [
      { year: "2025", title: "Official Question Paper & Answer Key (All Shifts)", pdfUrl: "https://upsc.gov.in", solutionStatus: "Verified Solutions" },
      { year: "2024", title: "Previous Year Question Paper with Detailed Explanations", pdfUrl: "https://ssc.gov.in", solutionStatus: "Solved" }
    ],
    freeStudyLinks: [
      { name: "NCERT eBooks Free Digital Portal (Class 6-12)", url: "https://ncert.nic.in", provider: "Ministry of Education, GoI" },
      { name: "PIB Govt Press Information Bureau Current Affairs Archive", url: "https://pib.gov.in", provider: "Government of India" },
      { name: "National Digital Library of India (NDLI)", url: "https://ndl.gov.in", provider: "IIT Kharagpur / GoI" }
    ]
  };

  return (
    <div className="space-y-6 bg-[#FAF7F2] text-[#1C1917] p-6 sm:p-8 rounded-3xl border-2 border-[#E7E2D8] shadow-lg font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E2D8] pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4EFEB] border border-[#E7E2D8] text-[10px] font-mono font-bold text-[#963628] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#963628]" />
            INTERACTIVE PREPARATION HUB
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C1917]">
            {materials.examTitle}
          </h3>
          <p className="text-xs text-[#57534E]">
            Verified Syllabus Breakdown, Authentic PYQs & Free Institutional Study Resources
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex bg-[#F4EFEB] p-1.5 rounded-2xl border border-[#E7E2D8] text-xs font-semibold">
          {[
            { id: 'syllabus', label: 'Syllabus Breakdown', icon: BookOpen },
            { id: 'pyq', label: 'Previous Year Papers', icon: FileText },
            { id: 'resources', label: 'Free Study Materials', icon: Award }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#963628] text-white font-bold shadow-md'
                    : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF7F2]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: SYLLABUS BREAKDOWN */}
      {activeTab === 'syllabus' && (
        <div className="space-y-4 animate-fadeIn">
          {materials.syllabusBreakdown.map((item, idx) => {
            const isOpen = openAccordionIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E7E2D8] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenAccordionIndex(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#F4EFEB]/50 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-[#963628] uppercase tracking-wider">
                      STAGE {idx + 1}
                    </span>
                    <h4 className="text-base font-serif font-bold text-[#1C1917] flex items-center gap-2">
                      {item.stage}
                    </h4>
                    <p className="text-xs text-[#57534E]">
                      {item.description}
                    </p>
                  </div>

                  <div className="p-2 rounded-full bg-[#F4EFEB] border border-[#E7E2D8] text-[#57534E]">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#963628]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && item.papers && (
                  <div className="p-5 border-t border-[#E7E2D8] bg-[#FAF7F2] space-y-4 animate-fadeIn">
                    {item.papers.map((paper, pIdx) => (
                      <div key={pIdx} className="p-4 rounded-xl bg-white border border-[#E7E2D8] space-y-2.5 shadow-2xs">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-bold text-[#2D5A43] font-mono">
                            {paper.name}
                          </h5>
                          {paper.weightage && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#F4EFEB] text-[#57534E] font-mono border border-[#E7E2D8]">
                              {paper.weightage}
                            </span>
                          )}
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1C1917]">
                          {paper.topics.map((t, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2 bg-[#F4EFEB] p-2.5 rounded-lg border border-[#E7E2D8]">
                              <CheckCircle className="w-3.5 h-3.5 text-[#963628] shrink-0 mt-0.5" />
                              <span className="font-medium">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: PREVIOUS YEAR PAPERS */}
      {activeTab === 'pyq' && (
        <div className="space-y-3 animate-fadeIn">
          {materials.previousYearPapers.map((pyq, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7E2D8] flex flex-wrap items-center justify-between gap-4 hover:border-[#963628]/40 transition-all shadow-xs"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#963628]/10 text-[#963628] border border-[#963628]/20">
                    YEAR {pyq.year}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#2D5A43]/10 text-[#2D5A43] border border-[#2D5A43]/20 font-bold">
                    {pyq.solutionStatus}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#1C1917]">
                  {pyq.title}
                </h4>
              </div>

              <div className="flex items-center gap-3">
                <TrustBadge url={pyq.pdfUrl} compact={true} />
                <a
                  href={pyq.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#963628] hover:bg-[#7D2C1F] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: FREE STUDY MATERIALS */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
          {materials.freeStudyLinks.map((link, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#E7E2D8] space-y-4 flex flex-col justify-between hover:border-[#963628]/40 transition-all shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#57534E] font-medium">
                    {link.provider}
                  </span>
                  <TrustBadge url={link.url} compact={true} />
                </div>
                <h4 className="text-sm font-bold text-[#1C1917] leading-snug">
                  {link.name}
                </h4>
              </div>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#F4EFEB] hover:bg-[#963628] text-[#963628] hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all border border-[#E7E2D8]"
              >
                <span>Access Free Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="pt-3 border-t border-[#E7E2D8] text-center text-[11px] text-[#57534E] font-mono">
        Official Open Source Material • Verified Indian Government Publications & Examination Boards
      </div>
    </div>
  );
}
