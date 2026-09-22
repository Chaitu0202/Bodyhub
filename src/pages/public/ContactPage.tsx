import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, CheckCircle2, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { settingsService } from '../../services/store.ts';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', mobile: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const settings = settingsService.get();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Message Sent', 'Thank you! Our front desk will respond shortly.', 'success');
      setForm({ name: '', mobile: '', message: '' });
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
      {/* Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B7FF3C] block mb-3">
          GET IN TOUCH
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F4F6F3] font-display tracking-tight leading-tight">
          CONTACT BODY HUB.
        </h1>
        <p className="text-base sm:text-lg text-[#9CA39D] mt-4 leading-relaxed">
          Questions about memberships, equipment, personal training, or scheduling a visit? Reach out directly or drop by the arena during staffed hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info & Location Panel */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-[#111414] border border-white/10 rounded-3xl p-8 sm:p-10 space-y-8">
            <h2 className="text-2xl font-bold text-[#F4F6F3] font-display">
              Facility Information
            </h2>

            <div className="space-y-6">
              {/* Location item */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#181C1C] border border-white/5 rounded-xl text-[#B7FF3C] shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">Physical Address</h3>
                  <p className="text-base font-semibold text-[#F4F6F3] mt-1 leading-relaxed">
                    {settings.address}
                  </p>
                  <p className="text-xs text-[#9CA39D] mt-1">
                    Landmark: Near YSR Statue
                  </p>
                </div>
              </div>

              {/* Phone item */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#181C1C] border border-white/5 rounded-xl text-[#B7FF3C] shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">Direct Telephone & WhatsApp</h3>
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-base font-semibold text-[#F4F6F3] hover:text-[#B7FF3C] mt-1 block transition-colors">
                    {settings.phone}
                  </a>
                  <p className="text-xs text-[#9CA39D] mt-0.5">
                    Available during operating hours for enquiries
                  </p>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#181C1C] border border-white/5 rounded-xl text-[#B7FF3C] shrink-0 mt-1">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">Email Enquiries</h3>
                  <a href={`mailto:${settings.email}`} className="text-base font-semibold text-[#F4F6F3] hover:text-[#B7FF3C] mt-1 block transition-colors">
                    {settings.email}
                  </a>
                </div>
              </div>

              {/* Hours item */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#181C1C] border border-white/5 rounded-xl text-[#B7FF3C] shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">Gym Operating Hours</h3>
                  <div className="text-sm font-semibold text-[#F4F6F3] mt-1 space-y-1">
                    <p>Monday – Saturday: <span className="text-[#B7FF3C]">{settings.openingHoursWeekdays}</span></p>
                    <p>Sunday: <span className="text-[#9CA39D]">{settings.openingHoursWeekends}</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Action Buttons required by Section 20 & Section 53 */}
            <div className="pt-6 border-t border-white/5 flex flex-wrap items-center gap-4">
              <a
                href={settings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="primary" 
                  size="md"
                  rightIcon={<ArrowUpRight className="w-4 h-4" />}
                >
                  OPEN IN GOOGLE MAPS
                </Button>
              </a>

              <a
                href={settings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="secondary" 
                  size="md"
                  leftIcon={<MapPin className="w-4 h-4 text-[#B7FF3C]" />}
                >
                  GET DIRECTIONS
                </Button>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Panel */}
          <div className="bg-[#111414] border border-white/10 rounded-3xl p-6 relative overflow-hidden">
            <div className="aspect-[21/9] rounded-2xl bg-[#181C1C] border border-white/5 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
              {/* Map grid aesthetic */}
              <div className="absolute inset-0 bg-[radial-gradient(#202525_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
              <div className="relative z-10 space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#B7FF3C]/10 border border-[#B7FF3C]/30 flex items-center justify-center text-[#B7FF3C] mx-auto animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#F4F6F3]">THE BODY HUB (Fitness Center)</h4>
                <p className="text-xs text-[#9CA39D] max-w-sm">Neelakundilu, Near YSR Statue, Visakhapatnam, Andhra Pradesh</p>
                <div className="pt-2">
                  <a
                    href={settings.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B7FF3C] hover:underline"
                  >
                    <span>Launch in Google Maps Application</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-5 bg-[#181C1C] border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B7FF3C]">
              HAVE A QUESTION?
            </span>
            <h2 className="text-2xl font-bold text-[#F4F6F3] font-display mt-1">
              Send us a Message
            </h2>
            <p className="text-xs text-[#9CA39D] mt-1">
              Drop your details below and our team will get back to you within 2 hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#111414] border border-[#B7FF3C]/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#B7FF3C] mx-auto" />
              <h3 className="text-lg font-bold text-[#F4F6F3]">Message Received!</h3>
              <p className="text-xs text-[#9CA39D]">
                Thank you for reaching out to Body Hub. We have routed your enquiry to our front desk team.
              </p>
              <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rahul Kumar"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#111414] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={form.mobile}
                  onChange={e => setForm({ ...form, mobile: e.target.value })}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#111414] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1.5">
                  Message / Enquiry *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we assist you today? (e.g. membership pricing, batch timings, personal training availability)"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#111414] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C] resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={loading}
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  SUBMIT MESSAGE
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
