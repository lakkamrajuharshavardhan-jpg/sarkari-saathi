// Comprehensive Study Material & Syllabus Breakdown Data for Competitive Exams
export const examStudyMaterials = {
  "upsc-cse": {
    examId: "upsc-cse",
    examTitle: "UPSC Civil Services Examination (IAS / IPS / IRS)",
    syllabusBreakdown: [
      {
        stage: "Prelims (Objective - 400 Marks)",
        description: "Screening stage consisting of 2 objective papers with negative marking (1/3rd penalty).",
        papers: [
          {
            name: "Paper I: General Studies (GS 1 - 200 Marks / 100 Questions)",
            topics: [
              "Current Events of National and International Importance",
              "History of India and Indian National Movement",
              "Indian and World Geography - Physical, Social, Economic Geography",
              "Indian Polity and Governance - Constitution, Political System, Panchayati Raj",
              "Economic and Social Development - Sustainable Development, Poverty, Inclusion",
              "Environmental Ecology, Bio-diversity and Climate Change",
              "General Science & Emerging Tech (AI, Space, Biotech)"
            ],
            weightage: "Determines Prelims Merit Cutoff"
          },
          {
            name: "Paper II: CSAT (Aptitude - 200 Marks / 80 Questions)",
            topics: [
              "Comprehension & Interpersonal Skills",
              "Logical Reasoning and Analytical Ability",
              "Decision Making and Problem Solving",
              "General Mental Ability & Basic Numeracy (Class X level)",
              "Data Interpretation (Charts, Graphs, Tables)"
            ],
            weightage: "Qualifying Nature (Minimum 33% / 66 Marks required)"
          }
        ]
      },
      {
        stage: "Mains (Descriptive - 1750 Marks)",
        description: "9 written essay/descriptive papers testing critical analytical thinking.",
        papers: [
          { name: "Essay Paper (250 Marks)", topics: ["Two Philosophical / Contemporary Socio-Economic Essays"] },
          { name: "GS Paper I (250 Marks)", topics: ["Indian Heritage, Culture, History of World & Society, Geography"] },
          { name: "GS Paper II (250 Marks)", topics: ["Governance, Constitution, Polity, Social Justice, International Relations"] },
          { name: "GS Paper III (250 Marks)", topics: ["Technology, Economic Development, Bio-diversity, Environment, Security & Disaster Management"] },
          { name: "GS Paper IV (250 Marks)", topics: ["Ethics, Integrity, Aptitude & Case Studies"] },
          { name: "Optional Subject Paper 1 & 2 (500 Marks Total)", topics: ["Chosen Specialization (e.g. Public Admin, History, PSIR, Geography, Sociology)"] }
        ]
      },
      {
        stage: "Personality Test / Interview (275 Marks)",
        description: "Unbiased board evaluation of leadership qualities, mental alertness, and integrity."
      }
    ],
    previousYearPapers: [
      { year: "2025", title: "UPSC CSE Prelims GS Paper I (Official Question Paper & Answer Key)", pdfUrl: "https://upsc.gov.in", solutionStatus: "Solved" },
      { year: "2024", title: "UPSC CSE Prelims GS Paper I & CSAT", pdfUrl: "https://upsc.gov.in", solutionStatus: "Solved with Explanations" },
      { year: "2023", title: "UPSC CSE Mains General Studies Papers (GS 1 to GS 4)", pdfUrl: "https://upsc.gov.in", solutionStatus: "Model Answers Available" },
      { year: "2022", title: "UPSC CSE Prelims 10-Year Topic-wise Question Bank", pdfUrl: "https://upsc.gov.in", solutionStatus: "Full Solutions" }
    ],
    freeStudyLinks: [
      { name: "NCERT Official eBooks (Class 6th to 12th History, Polity, Geo, Econ)", url: "https://ncert.nic.in", provider: "NCERT / Ministry of Education" },
      { name: "PIB Archive (Press Information Bureau Daily Summaries)", url: "https://pib.gov.in", provider: "Government of India" },
      { name: "Yojana & Kurukshetra Monthly Magazines (Digital PDF Portal)", url: "https://yojana.gov.in", provider: "Publications Division, GoI" },
      { name: "National Digital Library of India (NDLI Reference Hub)", url: "https://ndl.gov.in", provider: "IIT Kharagpur / Ministry of Education" }
    ]
  },
  "ssc-cgl-incometax": {
    examId: "ssc-cgl-incometax",
    examTitle: "SSC CGL — Income Tax Inspector (CBDT) & Central Excise",
    syllabusBreakdown: [
      {
        stage: "Tier I (Computer Based Exam - 200 Marks / 100 Qs)",
        description: "Qualifying exam testing General Intelligence, Reasoning, Quantitative Aptitude & English.",
        papers: [
          {
            name: "Tier I Objective Test (60 Minutes)",
            topics: [
              "General Intelligence & Reasoning (25 Qs / 50 Marks)",
              "General Awareness & Current Affairs (25 Qs / 50 Marks)",
              "Quantitative Aptitude & Arithmetic (25 Qs / 50 Marks)",
              "English Comprehension (25 Qs / 50 Marks)"
            ]
          }
        ]
      },
      {
        stage: "Tier II (Final Merit Exam - 390 Marks + DEST Data Entry)",
        description: "Sectional timing exam determining final selection for Income Tax Inspector posts.",
        papers: [
          {
            name: "Paper I Section 1: Math & Reasoning (180 Marks)",
            topics: ["Mathematical Abilities (30 Qs)", "Reasoning & General Intelligence (30 Qs)"]
          },
          {
            name: "Paper I Section 2: English & General Awareness (210 Marks)",
            topics: ["English Language & Comprehension (45 Qs)", "General Awareness (25 Qs)"]
          },
          {
            name: "Paper I Section 3: Computer Knowledge & Typing Test",
            topics: ["Computer Proficiency (20 Qs - Qualifying)", "Data Entry Speed Test (DEST - 2000 Key Depressions in 15 Min)"]
          }
        ]
      }
    ],
    previousYearPapers: [
      { year: "2025", title: "SSC CGL Tier 1 All Shifts Memory Based Question Papers", pdfUrl: "https://ssc.gov.in", solutionStatus: "Solved" },
      { year: "2024", title: "SSC CGL Tier 2 Official Question Paper & Answer Key", pdfUrl: "https://ssc.gov.in", solutionStatus: "Official Keys" }
    ],
    freeStudyLinks: [
      { name: "SSC Official Practice Mock & Computer Based Test Portal", url: "https://ssc.gov.in", provider: "Staff Selection Commission" },
      { name: "Income Tax Department Official Training & Tax Law Basics", url: "https://incometax.gov.in", provider: "CBDT Department of Revenue" }
    ]
  },
  "rbi-grade-b": {
    examId: "rbi-grade-b",
    examTitle: "RBI Grade B Officer (General / DEPR / DSIM)",
    syllabusBreakdown: [
      {
        stage: "Phase I Exam (Objective - 200 Marks / 120 Minutes)",
        description: "General Awareness (80 Qs), Reasoning (60 Qs), English (30 Qs), Quantitative Aptitude (30 Qs)."
      },
      {
        stage: "Phase II Exam (Descriptive + Objective - 300 Marks)",
        description: "Paper 1: Economic & Social Issues (ESI), Paper 2: Descriptive English, Paper 3: Finance & Management (FM)."
      },
      {
        stage: "Phase III Interview (75 Marks)",
        description: "Interview by RBI Board Panel."
      }
    ],
    previousYearPapers: [
      { year: "2024", title: "RBI Grade B Phase I & II Solved Question Bank", pdfUrl: "https://rbi.org.in", solutionStatus: "Solved" }
    ],
    freeStudyLinks: [
      { name: "RBI Official Reports & Monetary Policy Documents", url: "https://rbi.org.in", provider: "Reserve Bank of India" },
      { name: "Financial Awareness & Banking Glossary Portal", url: "https://rbi.org.in", provider: "RBI Financial Education" }
    ]
  }
};
