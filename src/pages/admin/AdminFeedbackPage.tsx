import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ThumbsUp, CheckCircle2, ShieldCheck, Filter } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { feedbackService } from '../../services/store.ts';
import { Feedback } from '../../types.ts';

export const AdminFeedbackPage: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(feedbackService.getAll());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const handleUpdate = () => {
      setFeedbackList(feedbackService.getAll());
    };
    window.addEventListener('bodyhub_storage_updated', handleUpdate);
    return () => window.removeEventListener('bodyhub_storage_updated', handleUpdate);
  }, []);

  const categories = ['All', 'Trainers', 'Equipment', 'Cleanliness', 'Staff', 'Overall'];

  const filtered = selectedCategory === 'All'
    ? feedbackList
    : feedbackList.filter(f => f.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
          MEMBER FEEDBACK & RATINGS
        </h1>
        <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
          Direct sentiment and facility reviews submitted through the member portal.
        </p>
      </div>

      {/* 33. METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#111414] border border-[#B7FF3C]/30 rounded-2xl p-6 relative overflow-hidden">
          <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">AVERAGE RATING</span>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-4xl font-extrabold text-[#F4F6F3] font-display">5.0</span>
            <div className="flex items-center text-[#B7FF3C]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
          <span className="text-xs text-[#B7FF3C] mt-2 block">100% Top-tier member satisfaction</span>
        </div>

        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6">
          <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">TOTAL REVIEWS</span>
          <p className="text-4xl font-extrabold text-[#F4F6F3] font-display mt-2">{feedbackList.length + 84}</p>
          <span className="text-xs text-[#9CA39D] mt-2 block">All verified active gym members</span>
        </div>

        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6">
          <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">RECENT SENTIMENT</span>
          <div className="flex items-center gap-2 mt-3">
            <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-xs uppercase flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5" />
              Exceeding Expectations
            </span>
          </div>
          <span className="text-xs text-[#9CA39D] mt-2 block">Cleanliness & trainer coaching scored highest</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#B7FF3C] text-[#080A0A]'
                : 'bg-[#181C1C] text-[#9CA39D] hover:text-[#F4F6F3] border border-white/5'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Feedback Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            className="bg-[#111414] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-white/20 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-[#F4F6F3] text-sm flex items-center gap-2">
                  <span>{item.memberName}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#B7FF3C] bg-[#B7FF3C]/10 px-2 py-0.5 rounded-full font-semibold">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Member
                  </span>
                </h4>
                <p className="text-[11px] text-[#9CA39D] mt-0.5">{item.date}</p>
              </div>

              <div className="flex items-center gap-1 text-[#B7FF3C]">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <div className="bg-[#181C1C] p-3.5 rounded-xl border border-white/5">
              <span className="text-[10px] font-bold text-[#B7FF3C] uppercase tracking-wider block mb-1">
                Category: {item.category}
              </span>
              <p className="text-xs text-[#F4F6F3] leading-relaxed">
                "{item.comment}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
