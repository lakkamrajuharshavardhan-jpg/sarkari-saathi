import { queryVectorKnowledgeBase } from './ragVectorService';

/**
 * Multilingual System Instructions Map
 */
const systemPrompts = {
  en: "Respond in clear English. Maintain official scheme and exam titles intact. Cite official dates and documents accurately.",
  hi: "कृपया उत्तर हिंदी भाषा में स्पष्ट रूप से दें। सरकारी योजना और परीक्षा के मुख्य नामों को समान रखें।",
  te: "దయచేసి సమాధానం తెలుగులో స్పష్టంగా అందించండి. ప్రభుత్వం అధికారిక పథకాలు మరియు పరీక్షల పేర్లను సర్యంగా ఉంచండి.",
  mr: "कृपया उत्तर मराठी भाषेत स्पष्टपणे द्या. शासकीय योजना व परीक्षांची अधिकृत नावे कायम ठेवा.",
  ta: "தயவுசெய்து பதிலைத் தமிழில் தெளிவாக வழங்கவும். அரசு திட்டங்கள் மற்றும் தேர்வுகள் பெயர்களை சரியாக குறிப்பிடவும்."
};

/**
 * Stream AI Chat Response with Vector Retrieval & Multilingual Support
 */
export async function streamAiChatResponse({
  userMessage,
  lang = 'en',
  onChunk,
  onComplete
}) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GOOGLE_API_KEY;

  // 1. Vector Search Retrieval: Top 3-5 Official Government Circulars
  const retrievedSources = queryVectorKnowledgeBase(userMessage, 3);

  const contextText = retrievedSources.map((src, i) => `
[Source ${i + 1}]
Title: ${src.title}
Published By: ${src.source} (${src.pubDate})
Official URL: ${src.officialUrl}
Official Content: ${src.content}
`).join('\n');

  const systemInstruction = systemPrompts[lang] || systemPrompts.en;

  // 2. If Gemini API Key exists, stream response from Gemini API
  if (apiKey) {
    try {
      const promptText = `${systemInstruction}

Retrieved Official Government Documents Context:
${contextText}

Candidate Query: "${userMessage}"

Instructions:
Answer the candidate's query clearly in 3-5 sentences based on the official context above. State eligibility, deadlines, required documents, or application portals clearly. Do not fabricate unverified links.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulatedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          // Parse SSE / Gemini JSON stream chunks
          try {
            const matches = chunk.match(/"text":\s*"([^"]+)"/g);
            if (matches) {
              matches.forEach(m => {
                const cleaned = m.replace(/"text":\s*"/, '').replace(/"$/, '').replace(/\\n/g, '\n');
                accumulatedText += cleaned;
                if (onChunk) onChunk(accumulatedText);
              });
            }
          } catch (e) {}
        }

        if (accumulatedText.trim()) {
          if (onComplete) onComplete({ text: accumulatedText.trim(), sources: retrievedSources });
          return;
        }
      }
    } catch (err) {
      console.warn("Gemini streaming call, falling back to intelligent RAG synthesis:", err.message);
    }
  }

  // 3. Fallback Intelligent RAG Streaming Synthesis (Chunked Typing Effect)
  const topSource = retrievedSources[0];
  let answerText = "";

  if (topSource) {
    answerText = `Based on official notifications from ${topSource.source} (${topSource.pubDate}): ${topSource.content} For complete registration and online form submission, visit verified portal ${topSource.officialUrl}.`;
  } else {
    answerText = `According to official Indian Government guidelines: Ensure your Aadhaar card name matches educational marksheets. For state domicile or OBC Non-Creamy Layer certificates, apply through your district CSC Setu Kendra or state portal.`;
  }

  // Simulate SSE real-time chunk streaming typing effect
  let currentLength = 0;
  const interval = setInterval(() => {
    currentLength += Math.min(12, answerText.length - currentLength);
    const partial = answerText.slice(0, currentLength);
    if (onChunk) onChunk(partial);

    if (currentLength >= answerText.length) {
      clearInterval(interval);
      if (onComplete) onComplete({ text: answerText, sources: retrievedSources });
    }
  }, 40);
}
