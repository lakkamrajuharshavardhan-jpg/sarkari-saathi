import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Calendar, Sparkles } from 'lucide-react';
import { getLiveNewsTickerItems } from '../services/tickerSyncService';
import TrustBadge from './TrustBadge';

export default function TopNewsTicker({ onOpenSchemeDetails, onOpenExamDetails, lang = 'en' }) {
  const [tickerItems, setTickerItems] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    async function load() {
      const items = await getLiveNewsTickerItems();
      setTickerItems(items);
    }
    load();
  }, []);

  if (!isVisible || tickerItems.length === 0) return null;

  const handleNewsClick = (item) => {
    setSelectedNews(item);
  };

  return (
    <div className="w-full bg-[#F4EFEB] text-[#1C1917] border-b border-[#E7E2D8] font-sans text-xs shadow-2xs">
      
      <div className="w-full flex items-center justify-between h-8 px-4 sm:px-6">
        
        {/* Center Marquee Track */}
        <div className="flex-1 overflow-hidden relative cursor-pointer h-full flex items-center">
          
          {/* Fading Side Gradients matching website background */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F4EFEB] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F4EFEB] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Content Loop - Stops naturally on hover */}
          <div className="flex items-center gap-8 animate-marquee">
            {/* Duplicated list to create seamless infinite scroll loop */}
            {[...tickerItems, ...tickerItems].map((item, idx) => (
              <button
                key={`${item.id}_${idx}`}
                onClick={() => handleNewsClick(item)}
                className="flex items-center gap-2 text-[#57534E] hover:text-[#963628] transition-colors whitespace-nowrap group text-left"
              >
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#963628] text-white">
                  {item.tag}
                </span>
                <span className="font-semibold text-[#1C1917] group-hover:text-[#963628] group-hover:underline">
                  {item.title}
                </span>
                <span className="text-[10px] text-[#57534E] font-mono">• {item.publishedAt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Dismiss Button */}
        <div className="pl-3 shrink-0 z-10 bg-[#F4EFEB] text-[#57534E]">
          <button
            onClick={() => setIsVisible(false)}
            title="Dismiss Ticker Bar"
            className="p-1 hover:text-[#963628] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Quick Preview Modal - Styled in Website Warm Cream Theme */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setSelectedNews(null)} />

          <div className="relative w-full max-w-lg bg-[#FAF7F2] text-[#1C1917] rounded-3xl shadow-2xl border-2 border-[#E7E2D8] p-6 space-y-5 z-10 font-sans">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#E7E2D8] pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#963628] text-white uppercase">
                    {selectedNews.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#57534E] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#57534E]" />
                    {selectedNews.publishedAt}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1C1917] leading-snug">
                  {selectedNews.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedNews(null)}
                className="p-2 rounded-full bg-[#F4EFEB] text-[#57534E] hover:text-[#1C1917] hover:bg-[#E7E2D8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body Summary */}
            <div className="space-y-3">
              <p className="text-xs text-[#57534E] leading-relaxed">
                {selectedNews.summary}
              </p>

              {/* Source Verification Badge */}
              <div className="p-3.5 rounded-xl bg-[#F4EFEB] border border-[#E7E2D8] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#57534E] font-medium">Official Portal Verification:</span>
                <TrustBadge url={selectedNews.officialUrl} compact={true} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={selectedNews.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-[#963628] hover:bg-[#7D2C1F] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Visit Verified .gov.in Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedNews(null)}
                className="py-3.5 px-4 rounded-xl bg-[#F4EFEB] hover:bg-[#E7E2D8] text-[#1C1917] text-xs font-bold transition-all border border-[#D4CDC1]"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
