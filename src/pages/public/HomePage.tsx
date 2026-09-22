import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  ShieldAlert, 
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { settingsService, eventService } from '../../services/store.ts';
import { INITIAL_PROGRAMS } from '../../data/mockData.ts';

export const HomePage: React.FC = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Monthly');
  const [formData, setFormData] = useState({ name: '', phone: '', note: '' });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const settings = settingsService.get();
  const latestEvents = eventService.getPublished().slice(0, 3);

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEnquiryOpen(false);
      showToast('Enquiry Submitted', `We will call you at ${formData.phone} shortly!`, 'success');
      setFormData({ name: '', phone: '', note: '' });
    }, 500);
  };

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 8. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Cinematic Gym Photography Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="Body Hub Training Floor"
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-125 scale-105 transform animate-in fade-in duration-700"
          />
          {/* Subtle vignette and gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A0A] via-[#080A0A]/40 to-transparent" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#080A0A]/60 to-[#080A0A]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center py-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181C1C]/80 border border-white/10 text-xs font-semibold text-[#B7FF3C] mb-8 backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C] animate-pulse" />
            <span>BODY HUB • FITNESS • PERFORMANCE • COMMUNITY</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#F4F6F3] font-display uppercase leading-[0.95] mb-8">
            BUILD YOUR <br />
            <span className="text-[#B7FF3C] inline-block">STRONGER</span> SELF.
          </h1>

          <p className="text-lg sm:text-xl text-[#9CA39D] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
            Training, community and consistency — everything you need to become stronger, healthier and more confident.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => {
                setSelectedPlan('Guest Pass');
                setEnquiryOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-4 text-base"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              START YOUR JOURNEY
            </Button>
            <Link to="/membership" className="w-full sm:w-auto">
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full sm:w-auto px-8 py-4 text-base"
              >
                EXPLORE MEMBERSHIP
              </Button>
            </Link>
          </div>

          {/* Small Supporting Micro-details */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">100%</p>
              <p className="text-xs text-[#9CA39D] uppercase tracking-wider font-semibold mt-1">Calibrated Weights</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">5:30 AM</p>
              <p className="text-xs text-[#9CA39D] uppercase tracking-wider font-semibold mt-1">Early Open Daily</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">1-on-1</p>
              <p className="text-xs text-[#9CA39D] uppercase tracking-wider font-semibold mt-1">Coaching Available</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#B7FF3C] font-display">5.0 ★</p>
              <p className="text-xs text-[#9CA39D] uppercase tracking-wider font-semibold mt-1">Member Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. QUICK BRAND INTRO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#111414] border border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden relative">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B7FF3C]">
              THE PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F4F6F3] font-display tracking-tight leading-tight">
              MORE THAN A GYM.
            </h2>
            <p className="text-base sm:text-lg text-[#9CA39D] leading-relaxed">
              Body Hub is a place built around consistency, progress and people. Train with purpose, build better habits and become part of a community that keeps you moving forward every single day.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#F4F6F3]">
                <CheckCircle2 className="w-5 h-5 text-[#B7FF3C] shrink-0" />
                <span>Modern biomechanically sound resistance & functional turf</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#F4F6F3]">
                <CheckCircle2 className="w-5 h-5 text-[#B7FF3C] shrink-0" />
                <span>Certified strength coaches on floor during all peak hours</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#F4F6F3]">
                <CheckCircle2 className="w-5 h-5 text-[#B7FF3C] shrink-0" />
                <span>Supportive, non-intimidating, high-standard lifting culture</span>
              </div>
            </div>
            <div className="pt-4">
              <Link to="/about">
                <Button variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  READ OUR STORY
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1470&auto=format&fit=crop"
                alt="Body Hub Facility"
                className="w-full h-full object-cover object-center filter contrast-110"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#181C1C] border border-white/15 p-4 rounded-xl shadow-xl hidden sm:flex items-center gap-3">
              <div className="p-2.5 bg-[#B7FF3C]/10 rounded-lg">
                <Zap className="w-5 h-5 text-[#B7FF3C]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#F4F6F3]">Zero Gimmicks</p>
                <p className="text-[11px] text-[#9CA39D]">Pure functional training</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PROGRAMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B7FF3C] block mb-2">
              DISCIPLINES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F6F3] font-display">
              TRAIN WITH PURPOSE.
            </h2>
          </div>
          <Link to="/programs">
            <Button variant="ghost" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              VIEW ALL PROGRAMS
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_PROGRAMS.map(prog => (
            <Link
              key={prog.id}
              to="/programs"
              className="group bg-[#111414] border border-white/10 hover:border-[#B7FF3C]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1 shadow-sm"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-[#080A0A]/80 text-[#B7FF3C] backdrop-blur-sm border border-white/10">
                  {prog.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#F4F6F3] group-hover:text-[#B7FF3C] transition-colors font-display">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-[#9CA39D] mt-2 leading-relaxed line-clamp-3">
                    {prog.tagline}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-[#F4F6F3] font-semibold">
                  <span className="text-[#9CA39D]">{prog.duration}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[#B7FF3C]">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 11. MEMBERSHIP PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B7FF3C] block mb-2">
            JOIN THE COMMUNITY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F6F3] font-display">
            FIND YOUR ROUTINE.
          </h2>
          <p className="text-sm sm:text-base text-[#9CA39D] mt-3">
            Transparent commitments. No long-term lock-in traps. Every plan includes full access to all equipment, lockers, and community events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Monthly */}
          <div className="bg-[#111414] border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-white/20 transition-colors">
            <div>
              <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">Plan</span>
              <h3 className="text-2xl font-extrabold text-[#F4F6F3] font-display mt-1">MONTHLY</h3>
              <p className="text-xs text-[#9CA39D] mt-2">Maximum flexibility. Perfect for establishing a sustainable routine.</p>

              <div className="my-6 py-4 border-y border-white/5">
                <span className="text-3xl font-extrabold text-[#F4F6F3] font-display">Enquire</span>
                <span className="text-xs text-[#9CA39D] ml-2 block">Monthly recurring / No lock-in</span>
              </div>

              <ul className="space-y-3 text-xs text-[#F4F6F3] mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF3C]" />
                  <span>Full access to lifting and cardio floors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF3C]" />
                  <span>Locker room & shower amenities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF3C]" />
                  <span>Complimentary biometric posture check</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF3C]" />
                  <span>Member mobile portal & digital pass</span>
                </li>
              </ul>
            </div>

            <Button
              variant="secondary"
              size="md"
              className="w-full"
              onClick={() => {
                setSelectedPlan('Monthly');
                setEnquiryOpen(true);
              }}
            >
              ENQUIRE NOW
            </Button>
          </div>

          {/* Quarterly (Highlighted Recommended) */}
          <div className="bg-[#181C1C] border-2 border-[#B7FF3C] rounded-2xl p-8 flex flex-col justify-between relative shadow-xl">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#B7FF3C] text-[#080A0A] font-extrabold text-[10px] tracking-wider uppercase shadow-md">
              MOST POPULAR FOR PROGRESS
            </div>

            <div>
              <span className="text-xs font-bold text-[#B7FF3C] uppercase tracking-wider">Plan</span>
              <h3 className="text-2xl font-extrabold text-[#F4F6F3] font-display mt-1">QUARTERLY</h3>
              <p className="text-xs text-[#9CA39D] mt-2">The sweet spot to experience verifiable strength and physique adaptation.</p>

              <div className="my-6 py-4 border-y border-white/10">
                <span className="text-3xl font-extrabold text-[#F4F6F3] font-display">Enquire</span>
                <span className="text-xs text-[#9CA39D] ml-2 block">90-Day transformation focus</span>
              </div>

              <ul className="space-y-3 text-xs text-[#F4F6F3] mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF3C]" />
                  <span>All Monthly features included</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF3C]" />
                  <span>1 Complimentary Coach Onboarding Session</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF3C]" />
                  <span>Nutrition & Macro guideline booklet</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF3C]" />
                  <span>Priority registration for internal workshops</span>
                </li>
              </ul>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                setSelectedPlan('Quarterly');
                setEnquiryOpen(true);
              }}
            >
              ENQUIRE NOW
            </Button>
          </div>

          {/* Yearly */}
          <div className="bg-[#111414] border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-white/20 transition-colors">
            <div>
              <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">Plan</span>
              <h3 className="text-2xl font-extrabold text-[#F4F6F3] font-display mt-1">YEARLY</h3>
              <p className="text-xs text-[#9CA39D] mt-2">Unwavering dedication. The best value for dedicated fitness athletes.</p>

              <div className="my-6 py-4 border-y border-white/5">
                <span className="text-3xl font-extrabold text-[#F4F6F3] font-display">Enquire</span>
                <span className="text-xs text-[#9CA39D] ml-2 block">365 Days uninterrupted training</span>
              </div>

              <ul className="space-y-3 text-xs text-[#F4F6F3] mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF3C]" />
                  <span>Full year unrestricted facility access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF3C]" />
                  <span>3 Complimentary Personal Training Sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF3C]" />
                  <span>30 Days membership freeze privilege</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B7FF3C]" />
                  <span>Body Hub signature athlete kit / apparel</span>
                </li>
              </ul>
            </div>

            <Button
              variant="secondary"
              size="md"
              className="w-full"
              onClick={() => {
                setSelectedPlan('Yearly');
                setEnquiryOpen(true);
              }}
            >
              ENQUIRE NOW
            </Button>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/membership" className="text-xs text-[#9CA39D] hover:text-[#B7FF3C] transition-colors underline">
            View comprehensive plan details and comparison
          </Link>
        </div>
      </section>

      {/* 12. EVENTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B7FF3C] block mb-2">
              COMMUNITY HAPPENINGS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F6F3] font-display">
              UPCOMING AT BODY HUB.
            </h2>
          </div>
          <Link to="/events">
            <Button variant="ghost" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              VIEW ALL EVENTS
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestEvents.map(event => (
            <div
              key={event.id}
              className="bg-[#111414] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div>
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover filter brightness-90"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#080A0A]/80 text-[#B7FF3C] text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {event.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#9CA39D] mb-2 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#B7FF3C]" />
                    <span>{event.date}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 text-[#B7FF3C]" />
                    <span>{event.time}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#F4F6F3] font-display mb-2 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-xs text-[#9CA39D] leading-relaxed line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link to="/events">
                  <Button variant="secondary" size="sm" className="w-full text-xs">
                    VIEW DETAILS
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 13. LOCATION & CONTACT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-[#181C1C] border border-white/10 rounded-3xl p-8 sm:p-14 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B7FF3C] block">
              VISIT OUR ARENA
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#F4F6F3] font-display tracking-tight leading-tight">
              READY TO TRAIN?
            </h2>
            <p className="text-base sm:text-lg text-[#9CA39D]">
              Visit Body Hub. Experience the equipment quality, the training atmosphere, and meet the coaches in person.
            </p>

            <div className="bg-[#111414] p-5 rounded-2xl border border-white/5 space-y-2 max-w-xl">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B7FF3C] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#9CA39D] uppercase tracking-wider font-semibold">Official Location</p>
                  <p className="text-sm font-bold text-[#F4F6F3] mt-0.5">{settings.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 text-xs text-[#9CA39D]">
                <Clock className="w-4 h-4 text-[#B7FF3C]" />
                <span>Open Mon–Sat: {settings.openingHoursWeekdays}</span>
              </div>
            </div>

            {/* Buttons required by Section 13 */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={settings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  variant="primary" 
                  size="lg"
                  rightIcon={<ArrowUpRight className="w-4 h-4" />}
                >
                  GET DIRECTIONS
                </Button>
              </a>

              <a href={`tel:${settings.phone.replace(/\s+/g, '')}`}>
                <Button 
                  variant="secondary" 
                  size="lg"
                  leftIcon={<Phone className="w-4 h-4" />}
                >
                  CALL BODY HUB
                </Button>
              </a>

              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  VIEW LOCATION
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Enquiry Modal */}
      <Modal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        title={`ENQUIRE: ${selectedPlan.toUpperCase()}`}
        subtitle="Leave your name and number to lock in your preferential enrolment offer."
      >
        <form onSubmit={handleEnquiry} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
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
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="10-digit mobile"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1">
              Selected Plan
            </label>
            <input
              type="text"
              readOnly
              value={selectedPlan}
              className="w-full px-4 py-2.5 rounded-lg bg-[#111414] border border-white/10 text-[#B7FF3C] text-sm font-bold cursor-not-allowed"
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
              CONFIRM ENQUIRY
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
