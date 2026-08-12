// Vector Knowledge Base & Retrieval Service for Official Government Notifications
import { schemesData } from '../data/schemes';
import { examsData } from '../data/exams';

/**
 * Official Ingested Government Circulars & News Feed Documents
 */
export const officialGovernmentKnowledgeBase = [
  {
    id: "doc_pib_2026_01",
    title: "Income Tax Department Notification: Slab Adjustments & Standard Deduction 2026",
    category: "IncomeTax",
    source: "Press Information Bureau (PIB) / CBDT",
    pubDate: "Feb 02, 2026",
    officialUrl: "https://incometax.gov.in",
    content: "The Central Board of Direct Taxes (CBDT) announced updated standard deduction limits for salaried individuals and revised tax filing guidelines for FY 2025-26 under the new tax regime.",
    keywords: ["income tax", "tax slab", "deduction", "cbdt", "tax assistant", "salary", "incometax.gov.in"]
  },
  {
    id: "doc_upsc_2026_02",
    title: "UPSC Civil Services 2026 Official Notification & OTR Instructions",
    category: "UPSC",
    source: "Union Public Service Commission (UPSC)",
    pubDate: "Feb 14, 2026",
    officialUrl: "https://upsc.gov.in",
    content: "UPSC CSE 2026 Prelims application window is open from Feb 14 to Mar 05, 2026. One-Time Registration (OTR) is mandatory before filling the online form on upsc.gov.in.",
    keywords: ["upsc", "cse", "ias", "ips", "irs", "civil services", "otr", "upsc.gov.in"]
  },
  {
    id: "doc_ssc_2026_03",
    title: "SSC CGL 2026 Recruitment Notice: Income Tax Inspector & Central Excise Posts",
    category: "SSC",
    source: "Staff Selection Commission (SSC)",
    pubDate: "Jan 28, 2026",
    officialUrl: "https://ssc.gov.in",
    content: "Staff Selection Commission releases tentative post breakdown for SSC CGL 2026 including Income Tax Inspector (CBDT), Central Excise Inspector, and Assistant Section Officer posts.",
    keywords: ["ssc", "ssc cgl", "income tax inspector", "excise", "ssc.gov.in", "tier 1"]
  },
  {
    id: "doc_pmkisan_2026_04",
    title: "PM Kisan Samman Nidhi: 19th Installment e-KYC Mandatory Circular",
    category: "PMKisan",
    source: "Ministry of Agriculture & Farmers Welfare",
    pubDate: "Feb 10, 2026",
    officialUrl: "https://pmkisan.gov.in",
    content: "Aadhaar-seeded bank account and OTP/Biometric e-KYC are mandatory to receive the 19th installment of ₹2,000 under PM Kisan. Farmers can complete e-KYC on pmkisan.gov.in or CSC centers.",
    keywords: ["pm kisan", "farmer", "ekyc", "installment", "agriculture", "pmkisan.gov.in"]
  },
  {
    id: "doc_pmjay_2026_05",
    title: "Ayushman Bharat PM-JAY: Health Insurance Expansion for Senior Citizens 70+",
    category: "AyushmanBharat",
    source: "National Health Authority (NHA)",
    pubDate: "Jan 15, 2026",
    officialUrl: "https://nha.gov.in",
    content: "National Health Authority expands Ayushman Card benefits providing ₹5 Lakh free health cover to all senior citizens aged 70 and above, regardless of household income.",
    keywords: ["ayushman bharat", "pmjay", "health insurance", "senior citizen", "nha.gov.in", "hospital"]
  },
  {
    id: "doc_sbi_2026_06",
    title: "SBI PO 2026 Recruitment Notification & Selection Process",
    category: "SBI_PO",
    source: "State Bank of India (SBI Central Recruitment Board)",
    pubDate: "Feb 05, 2026",
    officialUrl: "https://sbi.co.in",
    content: "SBI Probationary Officer (PO) 2026 notification for 2,000+ vacancies. Selection includes Phase I Prelims, Phase II Mains + Descriptive Test, and Phase III Psychometric & Interview.",
    keywords: ["sbi", "sbi po", "bank po", "banking", "sbi.co.in", "probationary officer"]
  },
  {
    id: "doc_mpsc_2026_07",
    title: "MPSC Rajyaseva 2026: Non-Creamy Layer (NCL) & Domicile Guidelines",
    category: "MPSC",
    source: "Maharashtra Public Service Commission (MPSC)",
    pubDate: "Jan 20, 2026",
    officialUrl: "https://mpsc.gov.in",
    content: "MPSC clarifies that Non-Creamy Layer (NCL) certificates for OBC/NT/SBC candidates must be valid for the current financial year. Maharashtra domicile certificate is mandatory for reservation benefits.",
    keywords: ["mpsc", "maharashtra", "rajyaseva", "ncl", "non creamy layer", "domicile", "pune", "mpsc.gov.in"]
  }
];

/**
 * Perform Vector / Keyword Similarity Search over Government Knowledge Base
 */
export function queryVectorKnowledgeBase(queryText, topK = 3) {
  if (!queryText) return [];

  const normalized = queryText.toLowerCase();

  // 1. Calculate similarity score for static circulars
  const scoredDocs = officialGovernmentKnowledgeBase.map(doc => {
    let score = 0;

    // Check keyword matches
    doc.keywords.forEach(kw => {
      if (normalized.includes(kw)) score += 3;
    });

    // Check title / content overlap
    const queryTokens = normalized.split(/\s+/);
    queryTokens.forEach(token => {
      if (token.length > 3) {
        if (doc.title.toLowerCase().includes(token)) score += 2;
        if (doc.content.toLowerCase().includes(token)) score += 1;
      }
    });

    return { doc, score };
  });

  // 2. Also check dynamic schemesData and examsData
  schemesData.forEach(scheme => {
    let score = 0;
    if (normalized.includes(scheme.id.toLowerCase()) || normalized.includes(scheme.code.toLowerCase()) || normalized.includes(scheme.titleEn.toLowerCase().slice(0, 6))) {
      score += 5;
    }
    if (score > 0) {
      scoredDocs.push({
        doc: {
          id: `scheme_${scheme.id}`,
          title: scheme.titleEn,
          category: scheme.category,
          source: scheme.offeredBy,
          pubDate: "Updated 2026",
          officialUrl: scheme.officialUrl || "https://india.gov.in",
          content: `${scheme.shortDescEn} Financial Benefit: ${scheme.benefitEn}. Required Documents: ${scheme.requiredDocumentsEn.join(', ')}.`
        },
        score
      });
    }
  });

  examsData.forEach(exam => {
    let score = 0;
    if (normalized.includes(exam.id.toLowerCase()) || normalized.includes(exam.code.toLowerCase()) || normalized.includes(exam.nameEn.toLowerCase().slice(0, 6))) {
      score += 5;
    }
    if (score > 0) {
      scoredDocs.push({
        doc: {
          id: `exam_${exam.id}`,
          title: exam.nameEn,
          category: exam.code,
          source: exam.conductingBody,
          pubDate: "Active 2026 Notification",
          officialUrl: exam.officialUrl,
          content: `${exam.shortDescEn} Min Qualification: ${exam.requiredDegreeEn}. Base Age: ${exam.baseAgeMin}-${exam.baseAgeMax} yrs. Key Application Deadline: ${exam.keyDates.applicationEndEn}.`
        },
        score
      });
    }
  });

  // 3. Sort by relevance score and return top K
  const sorted = scoredDocs.filter(d => d.score > 0).sort((a, b) => b.score - a.score);
  
  if (sorted.length === 0) {
    // Fallback: Return top 2 default official circulars if no exact match
    return officialGovernmentKnowledgeBase.slice(0, topK);
  }

  return sorted.slice(0, topK).map(s => s.doc);
}
