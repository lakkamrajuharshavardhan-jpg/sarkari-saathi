import { schemesData } from '../data/schemes';
import { examsData } from '../data/exams';

/**
 * Generate AI-Assisted Answer for Community Forum Questions
 * Uses Google Gemini API with fallback intelligent domain-knowledge synthesis
 */
export async function generateAiAnswerForQuestion(questionText, tag = 'General', region = 'Pan-India') {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GOOGLE_API_KEY;

  // Search relevant scheme or exam context from dataset
  const matchingScheme = schemesData.find(s =>
    s.nameEn.toLowerCase().includes(tag.toLowerCase()) ||
    s.id.toLowerCase().includes(tag.toLowerCase()) ||
    questionText.toLowerCase().includes(s.nameEn.toLowerCase().slice(0, 5))
  );

  const matchingExam = examsData.find(e =>
    e.nameEn.toLowerCase().includes(tag.toLowerCase()) ||
    e.code.toLowerCase().includes(tag.toLowerCase()) ||
    questionText.toLowerCase().includes(e.code.toLowerCase())
  );

  // If Gemini API Key exists, query Gemini model
  if (apiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are SarkariSaathi's official Indian Government Welfare & Competitive Exam AI Assistant.
Question from candidate (${region}): "${questionText}"
Topic/Tag: "${tag}"

Context matching scheme/exam:
${matchingScheme ? JSON.stringify(matchingScheme) : ''}
${matchingExam ? JSON.stringify(matchingExam) : ''}

Provide a clear, accurate, 3-4 sentence official answer regarding eligibility, required documents, application process, or regional center instructions.`
            }]
          }]
        })
      });

      const data = await response.json();
      const answerText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (answerText) {
        return {
          id: 'ans_ai_' + Date.now(),
          userId: 'ai_assistant_official',
          userName: 'SarkariSaathi AI Assistant',
          userAvatar: '✨',
          isAiAssisted: true,
          answerText: answerText.trim(),
          timestamp: 'Just now',
          upvotes: 5
        };
      }
    } catch (e) {
      console.warn("Gemini API call, using knowledge synthesis fallback:", e.message);
    }
  }

  // Fallback Domain Knowledge Synthesis Response
  let synthesizedText = "";
  if (matchingExam) {
    synthesizedText = `Regarding ${matchingExam.nameEn}: Minimum qualification required is ${matchingExam.requiredDegreeEn}. Key application documents include ${matchingExam.documentsEn.slice(0, 3).join(', ')}. Official portal is verified at ${matchingExam.officialUrl}.`;
  } else if (matchingScheme) {
    synthesizedText = `For ${matchingScheme.nameEn}: Main benefit offered is "${matchingScheme.benefitSummaryEn}". Eligible categories: ${matchingScheme.eligibilityRules.categories.join(', ')}. Submit application along with ${matchingScheme.requiredDocumentsEn.slice(0, 3).join(', ')}.`;
  } else {
    synthesizedText = `For queries regarding ${tag} in ${region}: Ensure your Aadhaar card name matches your educational certificates. For state-specific quotas or domicile certificates, visit your local Tehsildar / District CSC center.`;
  }

  return {
    id: 'ans_ai_' + Date.now(),
    userId: 'ai_assistant_official',
    userName: 'SarkariSaathi AI Assistant',
    userAvatar: '✨',
    isAiAssisted: true,
    answerText: `[Official Guidance] ${synthesizedText}`,
    timestamp: 'Just now',
    upvotes: 3
  };
}
