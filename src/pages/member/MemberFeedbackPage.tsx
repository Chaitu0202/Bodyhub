import React, { useState, useEffect } from 'react';
import { Star, Send, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { authService, feedbackService } from '../../services/store.ts';
import { Feedback } from '../../types.ts';

export const MemberFeedbackPage: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState<'Trainers' | 'Equipment' | 'Cleanliness' | 'Staff' | 'Overall'>('Overall');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [myFeedback, setMyFeedback] = useState<Feedback[]>([]);
  const { showToast } = useToast();

  const loadData = () => {
    if (!currentUser) return;
    const all = feedbackService.getAll();
    setMyFeedback(all.filter(f => f.memberId === currentUser.id));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('bodyhub_storage_updated', loadData);
    return () => window.removeEventListener('bodyhub_storage_updated', loadData);
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!comment.trim()) {
      showToast('Comment Required', 'Please enter a few words about your training experience.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      feedbackService.submit({
        memberId: currentUser.id,
        memberName: currentUser.name,
        rating,
        category,
        comment: comment.trim()
      });
      setComment('');
      showToast('Thank You!', 'Your feedback has been submitted to the Body Hub management team.', 'success');
      loadData();
    }, 450);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
          MEMBER FEEDBACK & REVIEWS
        </h1>
        <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
          Help us maintain gold standards in coaching, sanitation, and barbell equipment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Feedback Form */}
        <div className="lg:col-span-7 bg-[#111414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#181C1C] rounded-xl text-[#B7FF3C]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#F4F6F3] font-display">Rate Your Experience</h2>
              <p className="text-xs text-[#9CA39D]">Direct to gym ownership & coaching director</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-2">
                Overall Rating *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1.5 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'text-[#B7FF3C] fill-[#B7FF3C]'
                          : 'text-white/20'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-[#B7FF3C] ml-2">
                  {rating === 5 ? '5.0 — Outstanding' : `${rating}.0 Stars`}
                </span>
              </div>
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-2">
                Feedback Focus Area *
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              >
                <option value="Overall">Overall Gym Experience</option>
                <option value="Trainers">Coaching & Floor Trainers</option>
                <option value="Equipment">Barbells & Resistance Machines</option>
                <option value="Cleanliness">Hygiene, Vanities & Lockers</option>
                <option value="Staff">Front Desk & Concierge Staff</option>
              </select>
            </div>

            {/* Comments textarea */}
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-2">
                Your Comments or Suggestions *
              </label>
              <textarea
                rows={4}
                required
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="What did you enjoy most, or how can we improve your sessions?"
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C] resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={loading}
              rightIcon={<Send className="w-4 h-4" />}
            >
              SUBMIT MY FEEDBACK
            </Button>
          </form>
        </div>

        {/* Previous Reviews by this Member */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-bold text-[#F4F6F3] uppercase tracking-wider">
            Your Past Reviews ({myFeedback.length})
          </h3>

          {myFeedback.length === 0 ? (
            <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 text-center text-xs text-[#9CA39D]">
              You haven't submitted any feedback yet. Share your thoughts using the form on the left!
            </div>
          ) : (
            <div className="space-y-3">
              {myFeedback.map(item => (
                <div key={item.id} className="bg-[#111414] border border-white/10 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#B7FF3C]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#9CA39D]">{item.date}</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#B7FF3C] uppercase block">
                    Category: {item.category}
                  </span>
                  <p className="text-xs text-[#F4F6F3] leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
