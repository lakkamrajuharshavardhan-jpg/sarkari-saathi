import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User, ExternalLink, ShieldCheck, RefreshCw, Sparkles, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react';
import { streamAiChatResponse } from '../services/ragChatService';
import TrustBadge from './TrustBadge';

// Official SarkariSaathi Seal Emblem for Assistant Floating Button & Header
function AssistantSealLogo({ size = "w-7 h-7" }) {
  return (
    <div className={`relative ${size} flex items-center justify-center shrink-0`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        <defs>
          <linearGradient id="chatSealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B33E2B" />
            <stop offset="50%" stopColor="#963628" />
            <stop offset="100%" stopColor="#6E2318" />
          </linearGradient>
          <linearGradient id="chatGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D77F" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="48" fill="url(#chatSealGrad)" stroke="url(#chatGoldGrad)" strokeWidth="4" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="url(#chatGoldGrad)" strokeWidth="1.5" strokeDasharray="3 3" />
        
        <text
          x="50"
          y="64"
          fontFamily="'Playfair Display', 'Noto Sans Devanagari', Georgia, serif"
          fontSize="52"
          fontWeight="bold"
          fill="url(#chatGoldGrad)"
          textAnchor="middle"
        >
          स
        </text>

        <polygon points="50,11 53,17 59,17 54,21 56,27 50,23 44,27 46,21 41,17 47,17" fill="url(#chatGoldGrad)" />
      </svg>
    </div>
  );
}

export default function GovChatbot({ lang = 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(lang);
  const [inputQuery, setInputQuery] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);

  // Chat Messages History
  const [messages, setMessages] = useState([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: 'Namaste! I am Sarkari Saathi Official Assistant. Ask me anything about government scheme eligibility, Income Tax rules, UPSC/SSC exam dates, or required application documents.',
      sources: [
        {
          id: 'doc_pib_welcome',
          title: 'Official Government Knowledge Base 2026',
          source: 'Press Information Bureau / Ministry of Electronics & IT',
          pubDate: 'Active 2026',
          officialUrl: 'https://india.gov.in'
        }
      ]
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Quick Starter Prompts / Chips
  const quickPrompts = [
    { label: "Latest Income Tax rule changes", query: "What are the latest Income Tax slab changes and standard deduction rules for FY 2025-26?" },
    { label: "Active SBI PO exam dates", query: "What are the key application start and end dates for SBI PO 2026?" },
    { label: "Am I eligible for PM Kisan?", query: "What are the eligibility criteria and e-KYC documents for PM Kisan Samman Nidhi?" },
    { label: "MPSC NCL certificate rules", query: "What non-creamy layer (NCL) certificate rules apply for MPSC Rajyaseva exam?" }
  ];

  // Languages Supported
  const languagesList = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'mr', label: 'मराठी' },
    { code: 'ta', label: 'தமிழ்' }
  ];

  // Send Message Handler
  const handleSendMessage = (textToSend) => {
    const queryText = textToSend || inputQuery;
    if (!queryText.trim() || isStreaming) return;

    const userMsgId = 'user_' + Date.now();
    const aiMsgId = 'ai_' + Date.now();

    const userMsg = { id: userMsgId, sender: 'user', text: queryText.trim() };
    const aiPlaceholder = { id: aiMsgId, sender: 'ai', text: '', sources: [], isStreaming: true };

    setMessages(prev => [...prev, userMsg, aiPlaceholder]);
    if (!textToSend) setInputQuery('');
    setIsStreaming(true);

    streamAiChatResponse({
      userMessage: queryText.trim(),
      lang: selectedLang,
      onChunk: (partialText) => {
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text: partialText } : m));
      },
      onComplete: ({ text, sources }) => {
        setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, text, sources, isStreaming: false } : m));
        setIsStreaming(false);
      }
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Chat Trigger Button - Warm Website Color & Official Seal */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setUnreadBadge(false); }}
          className="relative group p-3.5 rounded-2xl bg-[#963628] hover:bg-[#7D2C1F] text-white border-2 border-[#D4AF37] shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
        >
          <div className="relative">
            <AssistantSealLogo size="w-8 h-8" />
            {unreadBadge && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-[#963628] animate-ping" />
            )}
          </div>

          <div className="hidden sm:block text-left pr-1">
            <div className="text-xs font-serif font-bold text-white leading-tight">Sarkari Saathi</div>
            <div className="text-[10px] font-mono font-medium text-amber-200">Official Assistant</div>
          </div>
        </button>
      )}

      {/* Floating Chat Window Drawer - Warm Paper Cream Theme (#FAF7F2) */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[590px] bg-[#FAF7F2] text-[#1C1917] rounded-3xl shadow-2xl border-2 border-[#E7E2D8] flex flex-col overflow-hidden animate-fadeIn">
          
          {/* 1. Header Bar - Warm Maroon (#963628) Header */}
          <div className="p-4 bg-[#963628] text-white border-b border-[#7D2C1F] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <AssistantSealLogo size="w-9 h-9" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-serif font-bold text-white">Sarkari Saathi Assistant</h3>
                  <span className="px-2 py-0.2 rounded-full bg-white/20 text-white font-mono text-[9px] font-bold">
                    VERIFIED .GOV.IN
                  </span>
                </div>
                <p className="text-[10px] font-mono text-amber-200">
                  Official Scheme & Recruitment Guidance
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="px-2 py-1 rounded-lg bg-[#7D2C1F] border border-white/20 text-[11px] font-mono text-white focus:outline-none"
              >
                {languagesList.map(l => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Messages List Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans bg-[#FAF7F2]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="mt-1">
                    <AssistantSealLogo size="w-7 h-7" />
                  </div>
                )}

                <div className={`space-y-2 max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  {/* Message Content Bubble */}
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#963628] text-white rounded-br-none shadow-md font-medium'
                        : 'bg-[#F4EFEB] text-[#1C1917] border border-[#E7E2D8] rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text || (msg.isStreaming ? 'Searching official government circulars...' : '')}</p>
                    {msg.isStreaming && (
                      <span className="inline-block w-2 h-4 ml-1 bg-[#963628] animate-pulse" />
                    )}
                  </div>

                  {/* Render Official Source Citation Cards for AI Messages */}
                  {msg.sender === 'ai' && msg.sources && msg.sources.length > 0 && !msg.isStreaming && (
                    <div className="space-y-1.5 pt-1 animate-fadeIn">
                      <span className="text-[10px] font-mono font-bold text-[#963628] uppercase flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#963628]" />
                        OFFICIAL SOURCES & CIRCULARS ({msg.sources.length})
                      </span>

                      <div className="space-y-1.5">
                        {msg.sources.map(src => (
                          <div
                            key={src.id}
                            className="p-3 rounded-xl bg-white border border-[#E7E2D8] space-y-1 hover:border-[#963628] shadow-sm transition-all"
                          >
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-mono text-[#57534E]">{src.source} • {src.pubDate}</span>
                              <TrustBadge url={src.officialUrl} compact={true} showTooltip={false} />
                            </div>
                            <h5 className="text-[11px] font-bold text-[#1C1917] line-clamp-1">
                              {src.title}
                            </h5>
                            <a
                              href={src.officialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-mono font-bold text-[#963628] hover:underline flex items-center gap-1 pt-0.5"
                            >
                              <span>Official Link: {src.officialUrl}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#2D5A43] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-1 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 3. Quick Starter Prompts Chips */}
          <div className="px-4 py-2 bg-[#F4EFEB] border-t border-[#E7E2D8] flex gap-2 overflow-x-auto text-[11px] font-mono">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                disabled={isStreaming}
                onClick={() => handleSendMessage(qp.query)}
                className="px-3 py-1 rounded-full bg-[#FAF7F2] hover:bg-[#963628] hover:text-white border border-[#E7E2D8] text-[#1C1917] whitespace-nowrap transition-colors shrink-0 shadow-2xs font-semibold"
              >
                ⚡ {qp.label}
              </button>
            ))}
          </div>

          {/* 4. Chat Input Form */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="p-3 bg-[#F4EFEB] border-t border-[#E7E2D8] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              disabled={isStreaming}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={isStreaming ? "Retrieving official guidelines..." : "Ask doubt e.g. age relaxation, PM Kisan, UPSC..."}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8] text-xs text-[#1C1917] placeholder-[#57534E] focus:outline-none focus:border-[#963628] font-sans"
            />

            <button
              type="submit"
              disabled={isStreaming || !inputQuery.trim()}
              className="p-2.5 rounded-xl bg-[#963628] hover:bg-[#7D2C1F] disabled:opacity-50 text-white font-bold transition-all shadow-md shrink-0"
            >
              {isStreaming ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
