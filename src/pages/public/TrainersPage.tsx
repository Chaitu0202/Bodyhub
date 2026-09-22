import React, { useState } from 'react';
import { Award, CheckCircle2, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { INITIAL_TRAINERS } from '../../data/mockData.ts';
import { Trainer } from '../../types.ts';

export const TrainersPage: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', goal: '' });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalOpen(false);
      showToast('Consultation Booked', `We have notified Coach ${selectedTrainer?.name}. They will contact you shortly!`, 'success');
      setForm({ name: '', phone: '', goal: '' });
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B7FF3C] block mb-3">
          LEADERSHIP & COACHING
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F4F6F3] font-display tracking-tight">
          ELITE COACHES.
        </h1>
        <p className="text-base sm:text-lg text-[#9CA39D] mt-4 leading-relaxed">
          Our coaches are not sales reps. They are certified sports scientists, competitive lifters, and movement specialists obsessed with helping you progress without injury.
        </p>
      </div>

      {/* Trainer Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {INITIAL_TRAINERS.map(trainer => (
          <div
            key={trainer.id}
            className="bg-[#111414] border border-white/10 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#B7FF3C]/40 transition-all duration-300 group shadow-lg"
          >
            <div>
              {/* Photo */}
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter contrast-105 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111414] via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-4 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#181C1C]/90 text-[#B7FF3C] border border-white/10 backdrop-blur-sm">
                  {trainer.experience}
                </span>
              </div>

              {/* Bio & Details */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#F4F6F3] font-display group-hover:text-[#B7FF3C] transition-colors">
                    {trainer.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#B7FF3C] mt-1">
                    {trainer.role}
                  </p>
                  <p className="text-xs text-[#9CA39D] mt-0.5">
                    {trainer.specialization}
                  </p>
                </div>

                <p className="text-xs text-[#9CA39D] leading-relaxed">
                  {trainer.bio}
                </p>

                {/* Certifications */}
                <div className="pt-2 border-t border-white/5 space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#F4F6F3]">
                    Credentials:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {trainer.certifications.map((cert, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#181C1C] text-[#9CA39D] border border-white/5"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs"
                onClick={() => {
                  setSelectedTrainer(trainer);
                  setModalOpen(true);
                }}
              >
                BOOK 1-ON-1 WITH {trainer.name.split(' ')[0].toUpperCase()}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Coaching Standards Banner */}
      <div className="bg-[#181C1C] border border-white/10 rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
        <div className="space-y-2">
          <div className="p-3 w-fit rounded-xl bg-[#B7FF3C]/10 text-[#B7FF3C] mb-3 mx-auto sm:mx-0">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-[#F4F6F3]">Accredited Coaches Only</h4>
          <p className="text-xs text-[#9CA39D] leading-relaxed">
            Every Body Hub coach holds accredited international strength, personal training, and CPR certifications.
          </p>
        </div>

        <div className="space-y-2">
          <div className="p-3 w-fit rounded-xl bg-[#B7FF3C]/10 text-[#B7FF3C] mb-3 mx-auto sm:mx-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-[#F4F6F3]">Safety & Form First</h4>
          <p className="text-xs text-[#9CA39D] leading-relaxed">
            We prioritize joint longevity, kinetic posture alignments, and sustainable progressive overload.
          </p>
        </div>

        <div className="space-y-2">
          <div className="p-3 w-fit rounded-xl bg-[#B7FF3C]/10 text-[#B7FF3C] mb-3 mx-auto sm:mx-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-[#F4F6F3]">Continuous Accountability</h4>
          <p className="text-xs text-[#9CA39D] leading-relaxed">
            Personal coaching clients receive direct weekly progress check-ins, dietary audits, and video reviews.
          </p>
        </div>
      </div>

      {/* Trainer Consultation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedTrainer ? `COACHING CONSULTATION: ${selectedTrainer.name}` : 'BOOK COACH'}
        subtitle={`Schedule an assessment with our ${selectedTrainer?.role || 'coach'}.`}
      >
        <form onSubmit={handleBook} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Arjun Rao"
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
              Primary Goal for 1-on-1 Coaching
            </label>
            <textarea
              rows={3}
              value={form.goal}
              onChange={e => setForm({ ...form, goal: e.target.value })}
              placeholder="e.g. Preparing for powerlifting meet, fat loss, postural pain relief..."
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C] resize-none"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={loading}
            >
              REQUEST CONSULTATION
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
