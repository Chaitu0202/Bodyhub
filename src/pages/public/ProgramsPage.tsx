import React, { useState } from 'react';
import { Check, ArrowRight, Activity, Zap, Shield, Target } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { INITIAL_PROGRAMS } from '../../data/mockData.ts';
import { Program } from '../../types.ts';

export const ProgramsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProgram, setActiveProgram] = useState<Program | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', note: '' });
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const categories = ['All', 'Strength', 'Conditioning', 'Personal Training', 'Functional Fitness'];

  const filteredPrograms = selectedCategory === 'All'
    ? INITIAL_PROGRAMS
    : INITIAL_PROGRAMS.filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setEnquiryModalOpen(false);
      showToast('Booking Received', `We will contact ${form.phone} to schedule your introductory session!`, 'success');
      setForm({ name: '', phone: '', note: '' });
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
      {/* Top Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B7FF3C] block mb-3">
          PROGRAMS & DISCIPLINES
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F4F6F3] font-display tracking-tight leading-tight">
          TRAIN WITH PURPOSE.
        </h1>
        <p className="text-base sm:text-lg text-[#9CA39D] mt-4 leading-relaxed">
          Structured training built on evidence, biomechanics, and progression. Whether your goal is raw barbell strength, athletic conditioning, or rehabilitation, every session has a distinct intention.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-2 border-b border-white/10 pb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#B7FF3C] text-[#080A0A] shadow-sm'
                : 'bg-[#181C1C] text-[#9CA39D] hover:text-[#F4F6F3] border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Large Program Cards */}
      <div className="space-y-12">
        {filteredPrograms.map((prog, idx) => (
          <div
            key={prog.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111414] border border-white/10 rounded-3xl p-6 sm:p-10 hover:border-white/20 transition-all"
          >
            {/* Image */}
            <div className={`lg:col-span-6 aspect-[16/10] rounded-2xl overflow-hidden relative ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
              <img
                src={prog.image}
                alt={prog.title}
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#080A0A]/85 text-[#B7FF3C] backdrop-blur-sm border border-white/10">
                  {prog.category}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-[#181C1C]/90 text-[#F4F6F3] backdrop-blur-sm border border-white/10">
                  {prog.duration}
                </span>
              </div>
            </div>

            {/* Description & Benefits */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">
                  Intensity: {prog.intensity}
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F4F6F3] font-display mt-1">
                  {prog.title}
                </h2>
                <p className="text-sm sm:text-base text-[#B7FF3C] font-semibold mt-2">
                  "{prog.tagline}"
                </p>
                <p className="text-sm text-[#9CA39D] mt-3 leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="bg-[#181C1C] p-4 rounded-xl border border-white/5">
                <p className="text-xs font-bold text-[#F4F6F3] uppercase tracking-wider mb-1">
                  Ideal For:
                </p>
                <p className="text-xs text-[#9CA39D] leading-relaxed">
                  {prog.suitableFor}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-[#F4F6F3] uppercase tracking-wider mb-3">
                  Key Training Outcomes:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {prog.benefits.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs text-[#F4F6F3]">
                      <Check className="w-4 h-4 text-[#B7FF3C] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setActiveProgram(prog);
                    setEnquiryModalOpen(true);
                  }}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  ENQUIRE ABOUT THIS PROGRAM
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Program Enquiry Modal */}
      <Modal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        title={activeProgram ? `JOIN: ${activeProgram.title}` : 'PROGRAM CONSULTATION'}
        subtitle="Book an introductory floor walkthrough or movement screening session."
      >
        <form onSubmit={handleBookSession} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Priya Sharma"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1">
              Mobile Number (WhatsApp) *
            </label>
            <input
              type="tel"
              required
              pattern="[0-9]{10}"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="10-digit mobile"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1">
              Training Experience
            </label>
            <select
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            >
              <option>Beginner (Less than 6 months lifting)</option>
              <option>Intermediate (1–3 years consistent training)</option>
              <option>Advanced / Competitive lifter</option>
              <option>Returning from injury / rehabilitation</option>
            </select>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={submitting}
            >
              SUBMIT CONSULTATION REQUEST
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
