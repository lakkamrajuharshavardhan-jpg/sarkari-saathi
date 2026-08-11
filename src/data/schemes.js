export const schemesData = [
  {
    id: "pm-kisan",
    code: "PM-KISAN",
    titleEn: "PM Kisan Samman Nidhi Yojana",
    titleHi: "पीएम किसान सम्मान निधि योजना",
    category: "Agriculture",
    categoryHi: "कृषि और किसानी",
    offeredBy: "Central Government (Ministry of Agriculture)",
    offeredByHi: "केंद्र सरकार (कृषि मंत्रालय)",
    benefitEn: "₹6,000 / year in 3 equal installments of ₹2,000",
    benefitHi: "₹6,000 प्रति वर्ष (₹2,000 की 3 किस्तों में)",
    shortDescEn: "Direct income support of ₹6,000 per year for all landholding farmer families across India.",
    shortDescHi: "सभी भूमिधारक किसान परिवारों के लिए प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता।",
    eligibilityRules: {
      minAge: 18,
      maxAge: 100,
      occupations: ["Farmer / Agriculture Worker"],
      maxIncome: 600000,
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      regions: ["Rural", "Urban"]
    },
    matchCriteriaEn: [
      "Landholding farmer family",
      "Valid bank account linked with Aadhaar",
      "Annual income within permissible agricultural limits"
    ],
    matchCriteriaHi: [
      "कृषि भूमिधारक किसान परिवार",
      "आधार से लिंक बैंक खाता",
      "वार्षिक आय सीमा के भीतर"
    ],
    documentsEn: [
      "Aadhaar Card",
      "Landholding Ownership Document (Khasra / Khatauni)",
      "Bank Account Passbook (Aadhaar Seeded)",
      "Mobile Number linked to Aadhaar"
    ],
    documentsHi: [
      "आधार कार्ड",
      "भूमि स्वामित्व दस्तावेज (खसरा / खतौनी)",
      "बैंक खाता पासबुक (आधार से लिंक)",
      "आधार से लिंक मोबाइल नंबर"
    ],
    applicationStepsEn: [
      "Visit the official PM-Kisan portal at pmkisan.gov.in or your local CSC / Jan Seva Kendra.",
      "Click on 'Farmers Corner' and select 'New Farmer Registration'.",
      "Enter your Aadhaar number, state, and rural/urban land details.",
      "Submit land ownership record (Khasra/Khatauni details) and active bank credentials.",
      "Complete e-KYC via OTP or biometric authentication at your nearest CSC center."
    ],
    applicationStepsHi: [
      "आधिकारिक PM-Kisan पोर्टल pmkisan.gov.in पर जाएं या नजदीकी सीएससी केंद्र संपर्क करें।",
      "'Farmers Corner' पर क्लिक करें और 'New Farmer Registration' चुनें।",
      "अपना आधार नंबर, राज्य और भूमि का विवरण दर्ज करें।",
      "खसरा/खतौनी और बैंक खाता नंबर सबमिट करें।",
      "ओटीपी या बायोमेट्रिक द्वारा e-KYC पूरा करें।"
    ],
    portalUrl: "https://pmkisan.gov.in",
    verifiedFreshness: "Aug 2026",
    isPopular: true
  },
  {
    id: "pm-jay",
    code: "AYUSHMAN-PMJAY",
    titleEn: "Ayushman Bharat PM-JAY Health Insurance",
    titleHi: "आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना",
    category: "Health",
    categoryHi: "स्वास्थ्य और बीमा",
    offeredBy: "Central Government (National Health Authority)",
    offeredByHi: "केंद्र सरकार (राष्ट्रीय स्वास्थ्य प्राधिकरण)",
    benefitEn: "Cashless health cover of up to ₹5,00,000 / family / year",
    benefitHi: "₹5,00,00,0 प्रति परिवार प्रति वर्ष तक का मुफ्त स्वास्थ्य बीमा",
    shortDescEn: "World's largest government-funded health protection scheme offering secondary & tertiary hospitalization.",
    shortDescHi: "दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना जो अस्पताल में कैशलेस इलाज प्रदान करती है।",
    eligibilityRules: {
      minAge: 0,
      maxAge: 100,
      occupations: ["Farmer / Agriculture Worker", "Artisan / Small Business / Micro-entrepreneur", "Unemployed / Looking for Work", "Homemaker / Domestic Worker", "Senior Citizen / Retired"],
      maxIncome: 300000,
      categories: ["SC", "ST", "OBC", "EWS", "General"],
      regions: ["Rural", "Urban"]
    },
    matchCriteriaEn: [
      "Families listed under SECC database / EWS / BPL categories",
      "Low household annual income (< ₹3,00,000)",
      "Unorganized sector workers or vulnerable occupational groups"
    ],
    matchCriteriaHi: [
      "SECC डेटाबेस / ईडब्ल्यूएस / बीपीएल परिवार",
      "वार्षिक पारिवारिक आय ₹3 लाख से कम",
      "असंगठित क्षेत्र के श्रमिक एवं कमजोर वर्ग"
    ],
    documentsEn: [
      "Aadhaar Card of all family members",
      "Ration Card (Samagra ID / Food Security Card)",
      "Income Certificate / SECC HHID slip",
      "Active Mobile Number"
    ],
    documentsHi: [
      "परिवार के सभी सदस्यों का आधार कार्ड",
      "राशन कार्ड (खाद्य सुरक्षा कार्ड)",
      "आय प्रमाण पत्र / SECC पर्ची",
      "सक्रिय मोबाइल नंबर"
    ],
    applicationStepsEn: [
      "Check your family name in the PM-JAY beneficiary list at beneficiary.nha.gov.in.",
      "Visit any empanelled public or private hospital (Ayushman Mitra desk).",
      "Show your Aadhaar Card and Ration Card for instant e-KYC verification.",
      "Obtain your Ayushman Golden Card for cashless hospital treatment across India."
    ],
    applicationStepsHi: [
      "beneficiary.nha.gov.in पर लाभार्थी सूची में अपना नाम जांचें।",
      "किसी भी सूचीबद्ध सरकारी या निजी अस्पताल (आयुष्मान मित्र डेस्क) पर जाएं।",
      "आधार और राशन कार्ड दिखाकर e-KYC पूरा करें।",
      "मुफ्त इलाज के लिए अपना आयुष्मान गोल्डन कार्ड प्राप्त करें।"
    ],
    portalUrl: "https://beneficiary.nha.gov.in",
    verifiedFreshness: "Aug 2026",
    isPopular: true
  },
  {
    id: "sukanya-samriddhi",
    code: "SSY",
    titleEn: "Sukanya Samriddhi Yojana (Girl Child Savings)",
    titleHi: "सुकन्या समृद्धि योजना (बालिका समृद्धि)",
    category: "Women",
    categoryHi: "महिला एवं बाल कल्याण",
    offeredBy: "Ministry of Finance & India Post",
    offeredByHi: "वित्त मंत्रालय एवं भारतीय डाक",
    benefitEn: "High interest rate savings (8.2% p.a.) + Tax Exemption under 80C",
    benefitHi: "8.2% उच्चतम ब्याज दर + 80C के तहत आयकर छूट",
    shortDescEn: "Government-backed savings scheme for girl children to secure future higher education and marriage funds.",
    shortDescHi: "बालिकाओं की उच्च शिक्षा और भविष्य को सुरक्षित करने वाली सरकारी बचत योजना।",
    eligibilityRules: {
      minAge: 0,
      maxAge: 10,
      gender: "Female",
      occupations: ["Student / Youth Scholar", "Homemaker / Domestic Worker"],
      maxIncome: 1000000,
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      regions: ["Rural", "Urban"]
    },
    matchCriteriaEn: [
      "Girl child aged 10 years or younger",
      "Parents or legal guardians applying on behalf of the child",
      "Maximum 2 girl child accounts per family"
    ],
    matchCriteriaHi: [
      "10 वर्ष या उससे कम आयु की बालिका",
      "माता-पिता या कानूनी अभिभावक द्वारा आवेदन",
      "एक परिवार में अधिकतम 2 बालिकाओं के खाते"
    ],
    documentsEn: [
      "Birth Certificate of Girl Child",
      "Aadhaar Card of Parent / Guardian",
      "Address Proof (Voter ID / Electricity Bill)",
      "Passport size photographs of child and guardian"
    ],
    documentsHi: [
      "बालिका का जन्म प्रमाण पत्र",
      "अभिभावक का आधार कार्ड",
      "पता प्रमाण पत्र (वोटर आईडी/बिजली बिल)",
      "बालिका एवं अभिभावक का पासपोर्ट फोटो"
    ],
    applicationStepsEn: [
      "Visit any Post Office branch or authorized public/private commercial bank.",
      "Fill out the Sukanya Samriddhi Account opening form (Form-1).",
      "Attach child's birth certificate and guardian's KYC documents.",
      "Deposit initial minimum amount of ₹250 to activate the account."
    ],
    applicationStepsHi: [
      "किसी भी डाकघर (Post Office) या बैंक शाखा में जाएं।",
      "सुकन्या समृद्धि खाता खोलने का फॉर्म-1 भरें।",
      "जन्म प्रमाण पत्र और अभिभावक का आधार संलग्न करें।",
      "न्यूनतम ₹250 जमा करके खाता सक्रिय करें।"
    ],
    portalUrl: "https://www.indiapost.gov.in",
    verifiedFreshness: "Aug 2026",
    isPopular: true
  },
  {
    id: "pm-mudra",
    code: "MUDRA-LOAN",
    titleEn: "PM MUDRA Yojana (Micro Business Credit)",
    titleHi: "प्रधानमंत्री मुद्रा योजना (लघु व्यवसाय ऋण)",
    category: "Loans",
    categoryHi: "व्यापार और सूक्ष्म ऋण",
    offeredBy: "Ministry of Finance / SIDBI",
    offeredByHi: "वित्त मंत्रालय / सिडबी",
    benefitEn: "Collateral-free business loan up to ₹10,00,000 (Shishu, Kishor, Tarun)",
    benefitHi: "बिना किसी गारंटी के ₹10 लाख तक का व्यापार ऋण",
    shortDescEn: "Affordable credit for non-corporate, non-farm small/micro enterprises to start or expand business.",
    shortDescHi: "छोटे व्यापारियों, दुकानदारों और सूक्ष्म उद्यमियों के लिए बिना गारंटी का ऋण।",
    eligibilityRules: {
      minAge: 18,
      maxAge: 65,
      occupations: ["Artisan / Small Business / Micro-entrepreneur", "Unemployed / Looking for Work", "Farmer / Agriculture Worker"],
      maxIncome: 1000000,
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      regions: ["Rural", "Urban"]
    },
    matchCriteriaEn: [
      "Indian citizen starting or operating a micro-enterprise",
      "Non-farm income generating activity (manufacturing, trading, services)",
      "No past default history in commercial banks"
    ],
    matchCriteriaHi: [
      "सूक्ष्म व्यवसाय शुरू या संचालित करने वाले भारतीय नागरिक",
      "गैर-कृषि आय गतिविधि (दुकान, निर्माण, सेवाएं)",
      "बैंक ऋण में डिफॉल्ट का कोई इतिहास नहीं"
    ],
    documentsEn: [
      "Aadhaar Card and PAN Card",
      "Business Proposal / Project Quotation",
      "Applicant Photo & Residence Proof",
      "Bank Statement of last 6 months (if existing business)"
    ],
    documentsHi: [
      "आधार कार्ड और पैन कार्ड",
      "व्यापार योजना / प्रोजेक्ट लागत विवरण",
      "आवेदक का फोटो और निवास प्रमाण",
      "पिछले 6 महीने का बैंक स्टेटमेंट"
    ],
    applicationStepsEn: [
      "Prepare your business proposal detailing projected income and setup expenses.",
      "Apply online via Udyami Mitra portal (udyamimitra.in) or visit any commercial bank branch.",
      "Select loan tier: Shishu (up to ₹50k), Kishor (₹50k-5L), or Tarun (₹5L-10L).",
      "Submit KYC and quotation documents for verification and sanction."
    ],
    applicationStepsHi: [
      "udyamimitra.in पोर्टल पर जाएं या किसी भी सार्वजनिक बैंक शाखा में संपर्क करें।",
      "ऋण श्रेणी चुनें: शिशु (₹50 हजार तक), किशोर (₹50 हजार-5 लाख) या तरुण (₹5-10 लाख)।",
      "व्यवसाय योजना और पहचान दस्तावेज जमा करें।",
      "बैंक द्वारा सत्यापन के बाद ऋण सीधे आपके खाते में स्वीकृत होगा।"
    ],
    portalUrl: "https://www.udyamimitra.in",
    verifiedFreshness: "Aug 2026",
    isPopular: true
  },
  {
    id: "post-matric-scholarship",
    code: "PMS-STUDENT",
    titleEn: "Post-Matric Scholarship for SC/ST/OBC Students",
    titleHi: "उत्तर-मैट्रिक छात्रवृत्ति योजना (SC/ST/OBC)",
    category: "Education",
    categoryHi: "शिक्षा और छात्रवृत्ति",
    offeredBy: "Ministry of Social Justice & Empowerment",
    offeredByHi: "सामाजिक न्याय एवं अधिकारिता मंत्रालय",
    benefitEn: "100% Tuition fee reimbursement + Monthly maintenance allowance",
    benefitHi: "100% शिक्षण शुल्क प्रतिपूर्ति + मासिक रखरखाव भत्ता",
    shortDescEn: "Financial assistance for marginalized students pursuing Class 11 to Post-Graduation degrees.",
    shortDescHi: "कक्षा 11वीं से उच्च शिक्षा प्राप्त कर रहे वंचित वर्ग के छात्रों के लिए छात्रवृत्ति।",
    eligibilityRules: {
      minAge: 14,
      maxAge: 35,
      occupations: ["Student / Youth Scholar"],
      maxIncome: 250000,
      categories: ["SC", "ST", "OBC"],
      regions: ["Rural", "Urban"]
    },
    matchCriteriaEn: [
      "Currently enrolled in Class 11, 12, ITI, Diploma, Graduation, or Post-Graduation",
      "Category belongs to SC, ST, or OBC",
      "Annual family income less than ₹2.5 Lakhs"
    ],
    matchCriteriaHi: [
      "11वीं, 12वीं, आईटीआई, डिप्लोमा, स्नातक या स्नातकोत्तर में अध्ययनरत",
      "SC, ST या OBC वर्ग से संबंधित",
      "वार्षिक पारिवारिक आय ₹2.5 लाख से कम"
    ],
    documentsEn: [
      "Aadhaar Card",
      "Caste Certificate issued by competent state authority",
      "Income Certificate (Current financial year)",
      "Previous Year Marksheet & Fee Receipt of College/School",
      "Bank Account details linked to Aadhaar"
    ],
    documentsHi: [
      "आधार कार्ड",
      "सक्षम प्राधिकारी द्वारा जारी जाति प्रमाण पत्र",
      "आय प्रमाण पत्र (वर्तमान वित्तीय वर्ष)",
      "पिछले वर्ष की अंकसूची एवं कॉलेज की फीस रसीद",
      "आधार से लिंक बैंक पासबुक"
    ],
    applicationStepsEn: [
      "Register on National Scholarship Portal (scholarships.gov.in) or State NSP portal.",
      "Complete Aadhaar OTR (One Time Registration) verification.",
      "Fill academic course details, college roll number, and upload documents.",
      "Submit application for online verification by institute node officer."
    ],
    applicationStepsHi: [
      "National Scholarship Portal (scholarships.gov.in) पर रजिस्टर करें।",
      "आधार ओटीआर (One Time Registration) सत्यापन पूरा करें।",
      "शैक्षणिक विवरण दर्ज करें और दस्तावेज अपलोड करें।",
      "संस्थान द्वारा सत्यापन के बाद छात्रवृत्ति राशि सीधे डीबीटी खाते में आएगी।"
    ],
    portalUrl: "https://scholarships.gov.in",
    verifiedFreshness: "Aug 2026",
    isPopular: true
  },
  {
    id: "pm-awas-yojana",
    code: "PMAY-GRAMIN",
    titleEn: "PM Awas Yojana (PMAY-Gramin & Urban Housing)",
    titleHi: "प्रधानमंत्री आवास योजना (ग्रामीण एवं शहरी)",
    category: "Housing",
    categoryHi: "आवास और स्वच्छता",
    offeredBy: "Ministry of Rural Development / Housing",
    offeredByHi: "ग्रामीण विकास एवं आवास मंत्रालय",
    benefitEn: "Financial grant up to ₹1,30,00,0 + ₹12,000 for toilet construction",
    benefitHi: "पक्का मकान बनाने के लिए ₹1.30 लाख तक की वित्तीय सहायता",
    shortDescEn: "Housing assistance to homeless and kutcha/dilapidated house owners to build pucca homes.",
    shortDescHi: "बेघर और कच्चे मकान में रहने वाले परिवारों को पक्का घर बनाने हेतु वित्तीय सहायता।",
    eligibilityRules: {
      minAge: 18,
      maxAge: 80,
      occupations: ["Farmer / Agriculture Worker", "Artisan / Small Business / Micro-entrepreneur", "Unemployed / Looking for Work", "Homemaker / Domestic Worker"],
      maxIncome: 300000,
      categories: ["SC", "ST", "OBC", "EWS", "General"],
      regions: ["Rural", "Urban"]
    },
    matchCriteriaEn: [
      "Family living in kutcha/un-star house or houseless",
      "Does not own any pucca house anywhere in India",
      "Annual income within EWS/LIG threshold"
    ],
    matchCriteriaHi: [
      "कच्चे या जीर्ण-शीर्ण मकान में रहने वाला परिवार",
      "भारत में कहीं भी पक्का मकान न हो",
      "ईडब्ल्यूएस / निम्न आय श्रेणी में"
    ],
    documentsEn: [
      "Aadhaar Card of all adult members",
      "Job Card / MGNREGA Card",
      "Bank Account details",
      "Land Record / Gram Sabha Consent Letter",
      "Declaration of not owning a pucca home"
    ],
    documentsHi: [
      "सभी वयस्क सदस्यों का आधार कार्ड",
      "मनरेगा जॉब कार्ड",
      "बैंक पासबुक",
      "भूमि स्वामित्व / ग्राम सभा सहमति पत्र",
      "पक्का मकान न होने का स्व-प्रमाणित घोषणा पत्र"
    ],
    applicationStepsEn: [
      "Contact your local Gram Panchayat Secretary / Ward Member to include name in PMAY list.",
      "Or apply online via pmayg.nic.in / pmaymis.gov.in.",
      "Physical geo-tagging of current housing condition by Panchayat representative.",
      "Installment funds released directly to Aadhaar-seeded bank account in 3 stages."
    ],
    applicationStepsHi: [
      "ग्राम पंचायत सचिव या वार्ड सदस्य से PMAY सूची में नाम दर्ज कराने हेतु संपर्क करें।",
      "या pmayg.nic.in पर ऑनलाइन आवेदन प्रस्तुत करें।",
      "पंचायत प्रतिनिधि द्वारा कच्चे मकान की जिओ-टैगिंग की जाएगी।",
      "निर्माण प्रगति के अनुसार 3 किस्तों में राशि बैंक खाते में हस्तांतरित होगी।"
    ],
    portalUrl: "https://pmayg.nic.in",
    verifiedFreshness: "Aug 2026",
    isPopular: true
  },
  {
    id: "pm-svanidhi",
    code: "SVANIDHI",
    titleEn: "PM SVANidhi Scheme (Street Vendor Loan)",
    titleHi: "पीएम स्वनिधि योजना (रेहड़ी-पटरी विक्रेता ऋण)",
    category: "Loans",
    categoryHi: "व्यापार और सूक्ष्म ऋण",
    offeredBy: "Ministry of Housing and Urban Affairs",
    offeredByHi: "आवास एवं शहरी कार्य मंत्रालय",
    benefitEn: "Working capital loan ₹10k - ₹50k with 7% interest subsidy + cashback",
    benefitHi: "₹10,000 से ₹50,000 तक का कार्यशील पूंजी ऋण + 7% ब्याज सब्सिडी",
    shortDescEn: "Special micro-credit facility empowering urban and semi-urban street vendors to resume business.",
    shortDescHi: "रेहड़ी-पटरी विक्रेताओं और छोटे दुकानदारों के लिए आसान कार्यशील पूंजी ऋण।",
    eligibilityRules: {
      minAge: 18,
      maxAge: 70,
      occupations: ["Artisan / Small Business / Micro-entrepreneur", "Unemployed / Looking for Work"],
      maxIncome: 300000,
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      regions: ["Urban", "Rural"]
    },
    matchCriteriaEn: [
      "Engaged in street vending, food carts, or local market trades",
      "Possess Certificate of Vending / Identity Card issued by Urban Local Body (ULB)",
      "Desirous of expanding micro-trade"
    ],
    matchCriteriaHi: [
      "रेहड़ी, पटरी, ठेले या फेरी लगाकर व्यापार करने वाले नागरिक",
      "नगर निकाय (ULB) द्वारा जारी विक्रेता प्रमाण पत्र या परिचय पत्र",
      "व्यापार बढ़ाने के इच्छुक"
    ],
    documentsEn: [
      "Aadhaar Card",
      "Vending Certificate / Urban Local Body Identity Slip",
      "Bank Account details",
      "UPI Handle / QR Code for digital cashback benefits"
    ],
    documentsHi: [
      "आधार कार्ड",
      "विक्रेता प्रमाण पत्र / नगर पालिका पर्ची",
      "बैंक पासबुक",
      "डिजिटल कैश बैक के लिए यूपीआई क्यूआर कोड"
    ],
    applicationStepsEn: [
      "Visit pmsvanidhi.mohua.gov.in or consult your nearest Common Service Center (CSC).",
      "Search your name using Urban Local Body (ULB) survey code or Vending Certificate.",
      "Submit application with Aadhaar OTP authentication.",
      "Loan disbursed directly into bank account within 7 working days."
    ],
    applicationStepsHi: [
      "pmsvanidhi.mohua.gov.in पर जाएं या नजदीकी सीएससी केंद्र संपर्क करें।",
      "नगर निकाय सर्वे कोड से अपना नाम खोजें।",
      "आधार ओटीपी से फॉर्म भरें।",
      "7 दिनों के भीतर ऋण राशि बैंक खाते में जमा होगी।"
    ],
    portalUrl: "https://pmsvanidhi.mohua.gov.in",
    verifiedFreshness: "Aug 2026",
    isPopular: false
  },
  {
    id: "pm-vishwakarma",
    code: "VISHWAKARMA",
    titleEn: "PM Vishwakarma Scheme (Artisan Toolkit & Loan)",
    titleHi: "पीएम विश्वकर्मा योजना (शिल्पकार टूलकिट एवं ऋण)",
    category: "Loans",
    categoryHi: "व्यापार और सूक्ष्म ऋण",
    offeredBy: "Ministry of Micro, Small & Medium Enterprises",
    offeredByHi: "सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय",
    benefitEn: "₹15,000 free Toolkit e-voucher + ₹3 Lakh credit at 5% interest",
    benefitHi: "₹15,000 का टूलकिट वाउचर + 5% रियायती ब्याज पर ₹3 लाख का ऋण",
    shortDescEn: "Comprehensive support for traditional artisans and craftspeople (Carpenters, Blacksmiths, Potters, Tailors, etc.).",
    shortDescHi: "पारंपरिक कारीगरों (दर्जी, बढ़ई, लोहार, कुम्हार आदि) के लिए कौशल प्रशिक्षण और ऋण समर्थन।",
    eligibilityRules: {
      minAge: 18,
      maxAge: 70,
      occupations: ["Artisan / Small Business / Micro-entrepreneur"],
      maxIncome: 600000,
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      regions: ["Rural", "Urban"]
    },
    matchCriteriaEn: [
      "Traditional tradesperson working with hands and tools in one of 18 specified trades",
      "Minimum age 18 years",
      "Should not have availed similar government credit scheme in last 5 years"
    ],
    matchCriteriaHi: [
      "18 पारंपरिक शिल्पों में हाथ व औजारों से काम करने वाले कारीगर",
      "न्यूनतम आयु 18 वर्ष",
      "पिछले 5 वर्षों में समान सरकारी ऋण न लिया हो"
    ],
    documentsEn: [
      "Aadhaar Card",
      "Bank Passbook details",
      "Skill / Trade declaration",
      "Ration Card & Mobile Number linked to Aadhaar"
    ],
    documentsHi: [
      "आधार कार्ड",
      "बैंक पासबुक विवरण",
      "पारंपरिक शिल्प स्व-घोषणा",
      "राशन कार्ड और आधार लिंक मोबाइल नंबर"
    ],
    applicationStepsEn: [
      "Visit pmvishwakarma.gov.in via CSC biometrics login.",
      "Verification by Gram Panchayat Head / Urban Local Body Chairperson.",
      "Complete 5 to 7 days basic skill training with ₹500 stipend per day.",
      "Receive ₹15,000 digital toolkit voucher and apply for 1st trimester collateral-free loan of ₹1 Lakh."
    ],
    applicationStepsHi: [
      "सीएससी केंद्र के माध्यम से pmvishwakarma.gov.in पर रजिस्ट्रेशन कराएं।",
      "ग्राम पंचायत प्रधान / नगर पालिका अध्यक्ष द्वारा बायोमेट्रिक सत्यापन।",
      "₹500 प्रतिदिन स्टाइपेंड के साथ 5-7 दिनों का बुनियादी प्रशिक्षण लें।",
      "₹15,000 का टूलकिट वाउचर और ₹1 लाख का पहला रियायती ऋण प्राप्त करें।"
    ],
    portalUrl: "https://pmvishwakarma.gov.in",
    verifiedFreshness: "Aug 2026",
    isPopular: true
  },
  {
    id: "national-social-assistance",
    code: "IGNOAPS",
    titleEn: "Indira Gandhi National Old Age Pension Scheme",
    titleHi: "इंद्रा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना",
    category: "Pension",
    categoryHi: "पेंशन और सामाजिक सुरक्षा",
    offeredBy: "Ministry of Rural Development (NSAP)",
    offeredByHi: "ग्रामीण विकास मंत्रालय (NSAP)",
    benefitEn: "Monthly pension support of ₹1,000 - ₹3,000 (State supplemented)",
    benefitHi: "₹1,000 से ₹3,000 प्रति माह पेंशन (राज्य अंशदान सहित)",
    shortDescEn: "Monthly pension for senior citizens living below the poverty line to ensure dignified financial independence.",
    shortDescHi: "गरीबी रेखा से नीचे रहने वाले बुजुर्गों के लिए सम्मानजनक मासिक सहायता पेंशन।",
    eligibilityRules: {
      minAge: 60,
      maxAge: 100,
      occupations: ["Senior Citizen / Retired", "Farmer / Agriculture Worker", "Unemployed / Looking for Work", "Homemaker / Domestic Worker"],
      maxIncome: 100000,
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      regions: ["Rural", "Urban"]
    },
    matchCriteriaEn: [
      "Senior citizen aged 60 years or above",
      "Belongs to BPL (Below Poverty Line) household",
      "No regular financial support from adult employed children"
    ],
    matchCriteriaHi: [
      "60 वर्ष या उससे अधिक आयु के वरिष्ठ नागरिक",
      "बीपीएल (गरीबी रेखा से नीचे) परिवार से",
      "नियमित आय का कोई अन्य स्रोत नहीं"
    ],
    documentsEn: [
      "Aadhaar Card",
      "Age Proof Certificate (Voter ID / Birth Certificate / School Marksheet)",
      "BPL Ration Card / Samagra ID",
      "Bank Account Passbook",
      "Income Certificate issued by Tehsildar"
    ],
    documentsHi: [
      "आधार कार्ड",
      "आयु प्रमाण पत्र (वोटर आईडी/जन्म प्रमाण पत्र)",
      "बीपीएल राशन कार्ड",
      "बैंक पासबुक",
      "तहसीलदार द्वारा जारी आय प्रमाण पत्र"
    ],
    applicationStepsEn: [
      "Apply through Social Welfare Department portal of your respective state or visit Tehsil office.",
      "Submit application form signed by Village Sarpanch or Ward Counselor.",
      "Physical verification by Social Welfare Officer.",
      "Pension credited directly into bank account via DBT every month."
    ],
    applicationStepsHi: [
      "राज्य के समाज कल्याण विभाग पोर्टल पर जाएं या तहसील कार्यालय संपर्क करें।",
      "सरपंच/वार्ड पार्षद द्वारा हस्ताक्षरित फॉर्म जमा करें।",
      "समाज कल्याण अधिकारी द्वारा भौतिक सत्यापन।",
      "प्रत्येक माह डीबीटी के माध्यम से पेंशन सीधे बैंक खाते में पहुंचेगी।"
    ],
    portalUrl: "https://nsap.nic.in",
    verifiedFreshness: "Aug 2026",
    isPopular: false
  },
  {
    id: "lakhpati-didi",
    code: "LAKHPATI-DIDI",
    titleEn: "Lakhpati Didi Scheme (Self Help Group Support)",
    titleHi: "लखपति दीदी योजना (स्वयं सहायता समूह प्रोत्साहन)",
    category: "Women",
    categoryHi: "महिला एवं बाल कल्याण",
    offeredBy: "Ministry of Rural Development (DAY-NRLM)",
    offeredByHi: "ग्रामीण विकास मंत्रालय (DAY-NRLM)",
    benefitEn: "Micro-enterprise training + Revolving fund & interest-subvention loan up to ₹5 Lakhs",
    benefitHi: "उद्यमिता प्रशिक्षण + ₹5 लाख तक का रियायती ऋण",
    shortDescEn: "Empowering rural women in Self-Help Groups (SHGs) to earn a sustainable annual income of ₹1 Lakh or more.",
    shortDescHi: "ग्रामीण महिलाओं को स्वयं सहायता समूह से जोड़कर सालाना ₹1 लाख की टिकाऊ आय बनाने की पहल।",
    eligibilityRules: {
      minAge: 18,
      maxAge: 60,
      gender: "Female",
      occupations: ["Homemaker / Domestic Worker", "Artisan / Small Business / Micro-entrepreneur", "Farmer / Agriculture Worker"],
      maxIncome: 300000,
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      regions: ["Rural"]
    },
    matchCriteriaEn: [
      "Rural woman member of an active Self Help Group (SHG)",
      "Willingness to start a micro-livelihood business (Dairy, Tailoring, Processing, Solar, Agro)",
      "Active participation in NRLM community meetings"
    ],
    matchCriteriaHi: [
      "सक्रिय स्वयं सहायता समूह (SHG) से जुड़ी ग्रामीण महिला",
      "लघु उद्योग (डेयरी, सिलाई, खाद्य प्रसंस्करण, हस्तशिल्प) शुरू करने की इच्छा",
      "एनआरएलएम बैठकों में नियमित भागीदारी"
    ],
    documentsEn: [
      "Aadhaar Card",
      "SHG Membership Book / ID",
      "Aadhaar Seeded Bank Account Details",
      "Passport photographs"
    ],
    documentsHi: [
      "आधार कार्ड",
      "एसएचजी सदस्यता पासबुक / पहचान पत्र",
      "आधार लिंक बैंक पासबुक",
      "पासपोर्ट आकार का फोटो"
    ],
    applicationStepsEn: [
      "Contact your local Gram Panchayat NRLM Community Resource Person (CRP).",
      "Form or join an active Self Help Group (SHG) in your village.",
      "Undergo financial literacy & micro-business skill development workshop.",
      "Submit micro-credit business proposal for Revolving Fund and Community Investment Fund (CIF)."
    ],
    applicationStepsHi: [
      "ग्राम पंचायत की एनआरएलएम महिला सीआरपी या समूह सखी से संपर्क करें।",
      "अपने गांव में सक्रिय स्वयं सहायता समूह से जुड़ें।",
      "व्यापार कौशल और वित्तीय साक्षरता प्रशिक्षण में भाग लें।",
      "रिवॉल्विंग फंड और सामुदायिक निवेश कोष हेतु व्यापार योजना जमा करें।"
    ],
    portalUrl: "https://nrlm.gov.in",
    verifiedFreshness: "Aug 2026",
    isPopular: true
  },
  {
    id: "national-overseas-scholarship",
    code: "NOS-STUDENT",
    titleEn: "National Overseas Scholarship for SC/ST Students",
    titleHi: "राष्ट्रीय विदेशी छात्रवृत्ति योजना (SC/ST)",
    category: "Education",
    categoryHi: "शिक्षा और छात्रवृत्ति",
    offeredBy: "Ministry of Social Justice & Empowerment",
    offeredByHi: "सामाजिक न्याय एवं अधिकारिता मंत्रालय",
    benefitEn: "100% Tuition fees + Annual maintenance allowance (~$15,400 / £9,900)",
    benefitHi: "100% ट्यूशन फीस + विदेश में रहने का पूरा खर्च (वार्षिक भत्ता)",
    shortDescEn: "Financial support for low-income SC/ST students studying Master's or Ph.D. degrees in top global universities.",
    shortDescHi: "शीर्ष विदेशी विश्वविद्यालयों में मास्टर्स और पीएचडी के लिए पूर्ण छात्रवृत्ति।",
    eligibilityRules: {
      minAge: 18,
      maxAge: 35,
      occupations: ["Student / Youth Scholar"],
      maxIncome: 800000,
      categories: ["SC", "ST"],
      regions: ["Rural", "Urban"]
    },
    matchCriteriaEn: [
      "Minimum 60% marks in Bachelor's or Master's degree",
      "Secured unconditional admission offer from top 500 QS ranked international universities",
      "Annual family income less than ₹8,00,000"
    ],
    matchCriteriaHi: [
      "स्नातक या स्नातकोत्तर में न्यूनतम 60% अंक",
      "शीर्ष वैश्विक 500 क्यूएस रैंकिंग विश्वविद्यालय से प्रवेश पत्र",
      "वार्षिक पारिवारिक आय ₹8 लाख से कम"
    ],
    documentsEn: [
      "Unconditional Admission Letter from Foreign University",
      "Aadhaar Card and Valid Passport",
      "Caste Certificate (SC / ST)",
      "Income Certificate (ITR / Salary Certificate)",
      "Academic Transcripts & Marksheets"
    ],
    documentsHi: [
      "विदेशी विश्वविद्यालय का बिना शर्त प्रवेश पत्र",
      "आधार कार्ड और वैध पासपोर्ट",
      "जाति प्रमाण पत्र (SC / ST)",
      "आय प्रमाण पत्र",
      "सभी शैक्षणिक अंकसूची"
    ],
    applicationStepsEn: [
      "Register online at nosmsje.gov.in during the annual portal opening window.",
      "Upload foreign university offer letter, QS ranking proof, and income certificates.",
      "Screening committee reviews candidate merit and income criteria.",
      "Final award letter issued for VISA processing and direct tuition fee wire transfer."
    ],
    applicationStepsHi: [
      "nosmsje.gov.in पर ऑनलाइन पोर्टल खुलने की अवधि में रजिस्ट्रेशन करें।",
      "विदेशी यूनिवर्सिटी ऑफर लेटर और आय प्रमाण पत्र अपलोड करें।",
      "चयन समिति द्वारा मेरिट और आय का सत्यापन।",
      "अंतिम चयन पत्र प्राप्त कर सीधे ट्यूशन फीस खाते में हस्तांतरित होगी।"
    ],
    portalUrl: "https://nosmsje.gov.in",
    verifiedFreshness: "Aug 2026",
    isPopular: false
  },
  {
    id: "pm-suraksha-bima",
    code: "PMSBY",
    titleEn: "PM Suraksha Bima Yojana (Accidental Insurance)",
    titleHi: "प्रधानमंत्री सुरक्षा बीमा योजना (दुर्घटना बीमा)",
    category: "Health",
    categoryHi: "स्वास्थ्य और बीमा",
    offeredBy: "Ministry of Finance",
    offeredByHi: "वित्त मंत्रालय",
    benefitEn: "Accidental death / total disability cover of ₹2,00,000 for just ₹20 / year",
    benefitHi: "मात्र ₹20 प्रति वर्ष प्रीमियम में ₹2 लाख का दुर्घटना बीमा",
    shortDescEn: "Extremely affordable government accident insurance scheme auto-debited from bank accounts.",
    shortDescHi: "मात्र ₹20 सालाना में ₹2 लाख का दुर्घटना बीमा कवर देने वाली योजना।",
    eligibilityRules: {
      minAge: 18,
      maxAge: 70,
      occupations: ["Farmer / Agriculture Worker", "Artisan / Small Business / Micro-entrepreneur", "Salaried / Service Worker", "Unemployed / Looking for Work", "Homemaker / Domestic Worker"],
      maxIncome: 1000000,
      categories: ["General", "OBC", "SC", "ST", "EWS"],
      regions: ["Rural", "Urban"]
    },
    matchCriteriaEn: [
      "Age between 18 and 70 years",
      "Active savings bank account with auto-debit facility",
      "Consent for ₹20 annual premium deduction"
    ],
    matchCriteriaHi: [
      "18 से 70 वर्ष के बीच की आयु",
      "ऑटो-डेबिट सुविधा वाला सक्रिय बचत बैंक खाता",
      "₹20 वार्षिक प्रीमियम कटौती की सहमति"
    ],
    documentsEn: [
      "Aadhaar Card",
      "Savings Bank Account Passbook",
      "Nominee Details & Contact Number"
    ],
    documentsHi: [
      "आधार कार्ड",
      "बचत बैंक खाता पासबुक",
      "नॉमिनी (उम्मीदवार) का विवरण और मोबाइल नंबर"
    ],
    applicationStepsEn: [
      "Log in to your bank's Internet Banking / Mobile App or visit your home branch.",
      "Search for 'PMSBY / Insurance Enrolment' section.",
      "Provide nominee details and enable auto-debit consent.",
      "Receive instant digital certificate of insurance."
    ],
    applicationStepsHi: [
      "अपने बैंक के इंटरनेट बैंकिंग / मोबाइल ऐप में लॉग इन करें या शाखा जाएं।",
      "'PMSBY / Insurance Enrolment' विकल्प चुनें।",
      "नॉमिनी का नाम भरें और ₹20 ऑटो-डेबिट सहमति दें।",
      "तुरंत बीमा प्रमाण पत्र प्राप्त करें।"
    ],
    portalUrl: "https://www.jansuraksha.gov.in",
    verifiedFreshness: "Aug 2026",
    isPopular: true
  }
];
