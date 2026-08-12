import React, { useState } from 'react';
import { MessageSquare, Search, Plus, ThumbsUp, Sparkles, MapPin, User, Send, X, ShieldCheck } from 'lucide-react';
import { generateAiAnswerForQuestion } from '../services/aiForumService';
import { translations } from '../data/translations';

// Official SarkariSaathi Devanagari 'स' Seal Logo Icon for AI Verified Badge
function ForumAiEmblem() {
  return (
    <div className="w-4 h-4 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="forumSealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B33E2B" />
            <stop offset="50%" stopColor="#963628" />
            <stop offset="100%" stopColor="#6E2318" />
          </linearGradient>
          <linearGradient id="forumGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D77F" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#forumSealGrad)" stroke="url(#forumGoldGrad)" strokeWidth="4" />
        <text x="50" y="64" fontFamily="'Playfair Display', 'Noto Sans Devanagari', serif" fontSize="52" fontWeight="bold" fill="url(#forumGoldGrad)" textAnchor="middle">
          स
        </text>
      </svg>
    </div>
  );
}

export default function CommunityForum({ lang = 'en', user, onOpenAuth }) {
  const t = translations[lang] || translations.en;

  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      userId: 'user_pune_1',
      userName: 'Rohan Deshmukh',
      userLocation: 'Pune, Maharashtra',
      tag: 'MPSC',
      questionText: 'Which non-creamy layer certificate year is valid for MPSC Rajyaseva 2026 application in Pune district?',
      timestamp: '2 hours ago',
      upvotes: 12,
      replies: [
        {
          id: 'ans_1',
          userId: 'ai_assistant_official',
          userName: 'SarkariSaathi AI Assistant',
          isAiAssisted: true,
          answerText: 'For MPSC Rajyaseva 2026, the Non-Creamy Layer (NCL) certificate must be valid for financial year 2025-2026. Make sure it is issued by the Sub-Divisional Officer (SDO) or Tehsildar in Maharashtra.',
          timestamp: '1 hour ago',
          upvotes: 15
        },
        {
          id: 'ans_2',
          userId: 'user_pune_2',
          userName: 'Priya Kulkarni',
          isAiAssisted: false,
          answerText: 'Yes, I got mine issued at Pune Setu Kendra last month. Takes around 7 working days with income proof.',
          timestamp: '45 mins ago',
          upvotes: 4
        }
      ]
    },
    {
      id: 'q2',
      userId: 'user_delhi_1',
      userName: 'Anish Sharma',
      userLocation: 'Delhi NCR',
      tag: 'IncomeTax',
      questionText: 'Is physical sports certificate required at the time of SSC CGL Income Tax Inspector DV (Document Verification)?',
      timestamp: '5 hours ago',
      upvotes: 8,
      replies: [
        {
          id: 'ans_3',
          userId: 'ai_assistant_official',
          userName: 'SarkariSaathi AI Assistant',
          isAiAssisted: true,
          answerText: 'For normal SSC CGL Income Tax Inspector posts, physical sports certificate is NOT compulsory. However, if applying under the Sports Quota recruitment in CBDT, national/international participation certificates are mandatory.',
          timestamp: '4 hours ago',
          upvotes: 9
        }
      ]
    }
  ]);

  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);

  // New Question Form State
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionTag, setNewQuestionTag] = useState('MPSC');
  const [newQuestionRegion, setNewQuestionRegion] = useState('Pune, Maharashtra');
  const [replyInputText, setReplyInputText] = useState({});
  const [isPosting, setIsPosting] = useState(false);

  const tagsList = ['All', 'MPSC', 'UPSC', 'IncomeTax', 'PMKisan', 'AyushmanBharat', 'SBI_PO', 'SSC'];

  // Filter questions
  const filteredQuestions = questions.filter(q => {
    const matchesTag = selectedTag === 'All' || q.tag.toLowerCase() === selectedTag.toLowerCase();
    const matchesSearch = q.questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // Handle Asking New Doubt
  const handlePostQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    setIsPosting(true);
    const newQId = 'q_' + Date.now();
    const authorName = user?.name || 'Citizen Candidate';

    // 1. Create Base Question
    const newQuestion = {
      id: newQId,
      userId: user?.uid || 'guest_' + Date.now(),
      userName: authorName,
      userLocation: newQuestionRegion,
      tag: newQuestionTag,
      questionText: newQuestionText,
      timestamp: 'Just now',
      upvotes: 1,
      replies: []
    };

    // 2. Generate Instant AI Response
    const aiAnswer = await generateAiAnswerForQuestion(newQuestionText, newQuestionTag, newQuestionRegion);
    newQuestion.replies.push(aiAnswer);

    setQuestions([newQuestion, ...questions]);
    setNewQuestionText('');
    setIsAskModalOpen(false);
    setIsPosting(false);
  };

  // Upvote Question
  const handleUpvoteQuestion = (qId) => {
    setQuestions(prev => prev.map(q => q.id === qId ? { ...q, upvotes: q.upvotes + 1 } : q));
  };

  // Add User Reply
  const handleAddReply = (qId) => {
    const text = replyInputText[qId];
    if (!text || !text.trim()) return;

    const newReply = {
      id: 'ans_' + Date.now(),
      userId: user?.uid || 'guest_' + Date.now(),
      userName: user?.name || 'Candidate Member',
      isAiAssisted: false,
      answerText: text.trim(),
      timestamp: 'Just now',
      upvotes: 1
    };

    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        return { ...q, replies: [...q.replies, newReply] };
      }
      return q;
    }));

    setReplyInputText({ ...replyInputText, [qId]: '' });
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E2D8] pb-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#963628] uppercase flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-[#963628]" />
            COMMUNITY & AI-ASSISTED FORUM
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#1C1917]">
            Candidate Q&A & Local Help Desk
          </h2>
          <p className="text-sm text-[#57534E]">
            Ask regional form doubts, document formats, and get instant verified answers from SarkariSaathi AI Assistant.
          </p>
        </div>

        <button
          onClick={() => setIsAskModalOpen(true)}
          className="px-5 py-3 rounded-xl bg-[#963628] hover:bg-[#7D2C1F] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Ask Question / Post Doubt</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#F4EFEB] p-4 rounded-2xl border border-[#E7E2D8]">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#57534E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doubts e.g. #MPSC, NCL, Sports Quota..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E7E2D8] text-xs text-[#1C1917] placeholder-[#57534E] focus:outline-none focus:border-[#963628]"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {tagsList.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-[#963628] text-white shadow-sm font-bold'
                  : 'bg-white text-[#57534E] hover:text-[#1C1917] border border-[#E7E2D8]'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

      </div>

      {/* Forum Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map(q => (
          <div key={q.id} className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E7E2D8] shadow-sm space-y-5">
            
            {/* Question Card Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#963628]/10 text-[#963628] text-[11px] font-mono font-bold border border-[#963628]/20">
                    #{q.tag}
                  </span>
                  <span className="text-xs text-[#57534E] font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#963628]" />
                    {q.userLocation}
                  </span>
                </div>
                <h3 className="text-lg font-serif font-bold text-[#1C1917]">
                  {q.questionText}
                </h3>
                <div className="text-[11px] text-[#57534E] flex items-center gap-2">
                  <span>Posted by <strong>{q.userName}</strong></span>
                  <span>•</span>
                  <span>{q.timestamp}</span>
                </div>
              </div>

              {/* Upvote Button */}
              <button
                onClick={() => handleUpvoteQuestion(q.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4EFEB] hover:bg-[#E7E2D8] border border-[#E7E2D8] text-xs font-bold text-[#1C1917] transition-all shrink-0"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-[#963628]" />
                <span>{q.upvotes}</span>
              </button>
            </div>

            {/* Replies Thread */}
            <div className="space-y-3 pt-3 border-t border-[#E7E2D8]">
              {q.replies.map(reply => (
                <div
                  key={reply.id}
                  className={`p-4 rounded-2xl text-xs space-y-2.5 transition-all ${
                    reply.isAiAssisted
                      ? 'bg-[#2D5A43]/10 text-[#1C1917] border border-[#2D5A43]/30 shadow-2xs'
                      : 'bg-[#F4EFEB] text-[#1C1917] border border-[#E7E2D8]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {reply.isAiAssisted ? (
                        <span className="font-bold text-[#2D5A43] flex items-center gap-1.5">
                          <ForumAiEmblem />
                          <span>{reply.userName}</span>
                        </span>
                      ) : (
                        <span className="font-bold text-[#963628] flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-[#963628]" />
                          {reply.userName}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#57534E] font-mono">
                      {reply.timestamp}
                    </span>
                  </div>

                  <p className={`leading-relaxed ${reply.isAiAssisted ? 'text-[#1C1917] font-medium' : 'text-[#1C1917]'}`}>
                    {reply.answerText}
                  </p>
                </div>
              ))}

              {/* Reply Input Box */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={replyInputText[q.id] || ''}
                  onChange={(e) => setReplyInputText({ ...replyInputText, [q.id]: e.target.value })}
                  placeholder="Write a reply or helpful candidate tip..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8] text-xs text-[#1C1917] placeholder-[#57534E] focus:outline-none focus:border-[#963628]"
                />
                <button
                  onClick={() => handleAddReply(q.id)}
                  className="px-4 py-2.5 rounded-xl bg-[#963628] hover:bg-[#7D2C1F] text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Ask Question Modal - Warm Paper Cream Theme (#FAF7F2) */}
      {isAskModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setIsAskModalOpen(false)} />

          <div className="relative w-full max-w-lg bg-[#FAF7F2] text-[#1C1917] rounded-3xl shadow-2xl border-2 border-[#E7E2D8] p-6 sm:p-8 space-y-5 z-10 font-sans">
            
            <div className="flex items-start justify-between border-b border-[#E7E2D8] pb-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#963628] uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#963628]" />
                  POST DOUBT FOR COMMUNITY & INSTANT AI ANSWER
                </span>
                <h3 className="text-xl font-serif font-bold text-[#1C1917]">Ask Candidate Community</h3>
              </div>

              <button
                onClick={() => setIsAskModalOpen(false)}
                className="p-2 rounded-full bg-[#F4EFEB] border border-[#E7E2D8] text-[#57534E] hover:text-[#1C1917]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostQuestion} className="space-y-4">
              
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1C1917]">Exam / Scheme Category</label>
                <select
                  value={newQuestionTag}
                  onChange={(e) => setNewQuestionTag(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E7E2D8] text-xs text-[#963628] font-mono font-bold focus:outline-none"
                >
                  {tagsList.filter(t => t !== 'All').map(t => (
                    <option key={t} value={t}>#{t}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1C1917]">Region / District Query Tag</label>
                <input
                  type="text"
                  required
                  value={newQuestionRegion}
                  onChange={(e) => setNewQuestionRegion(e.target.value)}
                  placeholder="e.g. Pune, Maharashtra / Delhi / Uttar Pradesh"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E7E2D8] text-xs text-[#1C1917] placeholder-[#57534E] focus:outline-none focus:border-[#963628]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#1C1917]">Your Doubt or Question</label>
                <textarea
                  required
                  rows={4}
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder="Describe your document, eligibility, or local application center question..."
                  className="w-full p-3.5 rounded-xl bg-white border border-[#E7E2D8] text-xs text-[#1C1917] placeholder-[#57534E] focus:outline-none focus:border-[#963628]"
                />
              </div>

              <button
                type="submit"
                disabled={isPosting}
                className="w-full py-3.5 bg-[#963628] hover:bg-[#7D2C1F] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isPosting ? 'Querying AI & Posting Doubt...' : 'Post Question & Get Instant AI Answer'}</span>
              </button>

            </form>

          </div>
        </div>
      )}

    </section>
  );
}
