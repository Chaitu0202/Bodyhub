import React, { useState } from 'react';
import { Check, HelpCircle, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { useToast } from '../../components/ui/Toast.tsx';

export const MembershipPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Quarterly');
  const [form, setForm] = useState({ name: '', phone: '', email: '', note: '' });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalOpen(false);
      showToast('Enquiry Received', `Thank you ${form.name}. Our membership concierge will reach out to ${form.phone}!`, 'success');
      setForm({ name: '', phone: '', email: '', note: '' });
    }, 500);
  };

  const plans = [
    {
      name: 'MONTHLY',
      tagline: 'Complete autonomy & flexibility',
      priceNotice: 'Contact for current seasonal pricing',
      billing: 'Billed monthly • No long-term lock-in',
      popular: false,
      features: [
        'Unrestricted access to all lifting & cardio zones',
        'Locker room, dry vanity & shower access',
        'Body Hub member portal & digital ID pass',
        'Floor coach assistance during all open hours',
        'Free attendance to Sunday community runs'
      ]
    },
    {
      name: 'QUARTERLY',
      tagline: 'The optimal adaptation & transformation cycle',
      priceNotice: 'Contact for current seasonal pricing',
      billing: 'Billed every 3 months • Preferred tier',
      popular: true,
      features: [
        'Everything in the Monthly membership',
        '1-on-1 Biometric movement & posture screening',
        '1 Dedicated personal coach workout onboarding',
        'Personalized nutrition & macronutrient guide',
        'Priority RSVP to member workshops & clinics',
        'Complimentary guest pass for a workout partner'
      ]
    },
    {
      name: 'YEARLY',
      tagline: 'For committed fitness athletes & professionals',
      priceNotice: 'Contact for current seasonal pricing',
      billing: 'Annual commitment • Highest value',
      popular: false,
      features: [
        'Everything in Quarterly membership',
        '3 Complimentary 1-on-1 coaching sessions',
        '30 Days membership freeze privilege',
        'Quarterly body composition & strength reassessments',
        'Body Hub signature performance training shirt',
        'Dedicated locker storage priority'
      ]
    }
  ];

  const faqs = [
    {
      q: 'Do you offer a trial session before committing?',
      a: 'Yes. You can visit Body Hub for a facility tour and trial workout. Enquire on this page or visit the reception during staffed hours.'
    },
    {
      q: 'Can I freeze my membership if I travel or fall sick?',
      a: 'Quarterly and Yearly members can freeze their active membership for up to 15 to 30 days upon submitting travel or medical documentation.'
    },
    {
      q: 'Are personal trainers included in the membership?',
      a: 'All memberships include floor supervision and form guidance from certified floor trainers. Dedicated 1-on-1 personal coaching packages are also available.'
    },
    {
      q: 'What payment methods do you accept at the facility?',
      a: 'We accept all major UPI applications (Google Pay, PhonePe, Paytm), credit/debit cards, and cash payments at the reception.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B7FF3C] block mb-3">
          TRANSPARENT MEMBERSHIPS
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F4F6F3] font-display tracking-tight">
          CHOOSE YOUR COMMITMENT.
        </h1>
        <p className="text-base sm:text-lg text-[#9CA39D] mt-4 leading-relaxed">
          Straightforward membership tiers without disguised initiation charges or cancellation headaches. Train in a world-class environment designed for consistent progress.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
              plan.popular
                ? 'bg-[#181C1C] border-2 border-[#B7FF3C] shadow-2xl scale-[1.02]'
                : 'bg-[#111414] border border-white/10 hover:border-white/20'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#B7FF3C] text-[#080A0A] font-extrabold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                RECOMMENDED COMMITMENT
              </div>
            )}

            <div>
              <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">
                Plan
              </span>
              <h2 className="text-3xl font-extrabold text-[#F4F6F3] font-display mt-1">
                {plan.name}
              </h2>
              <p className="text-xs text-[#9CA39D] mt-2">
                {plan.tagline}
              </p>

              {/* Price placeholder notice per Section 16 instructions */}
              <div className="my-8 py-5 border-y border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
                    {plan.priceNotice}
                  </span>
                </div>
                <span className="text-xs text-[#9CA39D] block mt-1">
                  {plan.billing}
                </span>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-[#F4F6F3]">
                  Included Benefits:
                </p>
                <ul className="space-y-2.5">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#F4F6F3] leading-relaxed">
                      <Check className="w-4 h-4 text-[#B7FF3C] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Button
              variant={plan.popular ? 'primary' : 'secondary'}
              size="lg"
              className="w-full"
              onClick={() => {
                setSelectedPlan(plan.name);
                setModalOpen(true);
              }}
            >
              JOIN BODY HUB
            </Button>
          </div>
        ))}
      </div>

      {/* Feature Comparison Matrix */}
      <div className="bg-[#111414] border border-white/10 rounded-3xl p-6 sm:p-10">
        <h3 className="text-xl font-bold text-[#F4F6F3] font-display mb-6 text-center sm:text-left">
          Membership Features Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#9CA39D]">
            <thead>
              <tr className="border-b border-white/10 text-white font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Feature / Access</th>
                <th className="py-3 px-4 text-center">Monthly</th>
                <th className="py-3 px-4 text-center text-[#B7FF3C]">Quarterly</th>
                <th className="py-3 px-4 text-center">Yearly</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr>
                <td className="py-3 px-4 font-semibold text-[#F4F6F3]">Full Gym Floor & Cardio Access</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">✓</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">✓</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#F4F6F3]">Locker & Shower Access</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">✓</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">✓</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#F4F6F3]">Digital Member Portal & ID Card</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">✓</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">✓</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#F4F6F3]">Biometric Posture Assessment</td>
                <td className="py-3 px-4 text-center text-[#9CA39D]">—</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">✓ (1 session)</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">✓ (Every quarter)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#F4F6F3]">Complimentary Personal Coaching</td>
                <td className="py-3 px-4 text-center text-[#9CA39D]">—</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">1 Session</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">3 Sessions</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-[#F4F6F3]">Membership Freeze Days</td>
                <td className="py-3 px-4 text-center text-[#9CA39D]">—</td>
                <td className="py-3 px-4 text-center text-[#9CA39D]">15 Days</td>
                <td className="py-3 px-4 text-center text-[#B7FF3C] font-bold">30 Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h3 className="text-2xl font-bold text-[#F4F6F3] font-display text-center">
          Frequently Asked Questions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {faqs.map((f, idx) => (
            <div key={idx} className="bg-[#111414] border border-white/10 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-[#F4F6F3] flex items-start gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-[#B7FF3C] shrink-0 mt-0.5" />
                <span>{f.q}</span>
              </h4>
              <p className="text-xs text-[#9CA39D] leading-relaxed pl-6">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Join Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`ENROL IN BODY HUB — ${selectedPlan}`}
        subtitle="Submit your details to receive current pricing and lock in your membership slot."
      >
        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Rahul Kumar"
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
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="rahul@example.com"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
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
              CONFIRM MEMBERSHIP ENQUIRY
            </Button>
            <p className="text-[11px] text-[#9CA39D] text-center mt-2">
              Our front desk will contact you via WhatsApp with official pricing & welcome instructions.
            </p>
          </div>
        </form>
      </Modal>
    </div>
  );
};
