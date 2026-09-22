import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Phone, MapPin, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { Logo } from '../components/ui/Logo.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Modal } from '../components/ui/Modal.tsx';
import { useToast } from '../components/ui/Toast.tsx';
import { settingsService } from '../services/store.ts';

export const PublicLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', plan: 'Monthly', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();
  const location = useLocation();
  const settings = settingsService.get();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/programs' },
    { name: 'Membership', path: '/membership' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Events', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setJoinModalOpen(false);
      showToast('Enquiry Received', `Thank you ${formData.name}! Our team will call ${formData.phone} shortly.`, 'success');
      setFormData({ name: '', phone: '', plan: 'Monthly', message: '' });
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080A0A] text-[#F4F6F3]">
      {/* Top Banner with Quick Location & Hours */}
      <div className="bg-[#111414] border-b border-white/5 py-2 px-4 sm:px-8 text-xs text-[#9CA39D] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 hover:text-[#F4F6F3] transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#B7FF3C]" />
            <span>Neelakundilu, Visakhapatnam</span>
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#B7FF3C]" />
            <span>Open Today: {settings.openingHoursWeekdays}</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href={settings.mapsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#B7FF3C] hover:underline font-medium"
          >
            <span>Open in Google Maps</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <span className="hidden md:inline text-white/20">|</span>
          <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hidden md:flex items-center gap-1 hover:text-[#F4F6F3]">
            <Phone className="w-3 h-3" />
            <span>{settings.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#080A0A]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo showTagline={false} size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors duration-200 relative py-1 ${
                    isActive 
                      ? 'text-[#B7FF3C]' 
                      : 'text-[#9CA39D] hover:text-[#F4F6F3]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B7FF3C] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-xs uppercase tracking-wider font-bold">
                Login
              </Button>
            </Link>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => setJoinModalOpen(true)}
              className="font-bold tracking-wide"
            >
              JOIN BODY HUB
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="px-2 text-xs">
                Login
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#9CA39D] hover:text-[#F4F6F3] rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#080A0A] border-b border-white/10 px-4 pt-3 pb-6 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-3 px-3 rounded-lg text-base font-semibold border-b border-white/5 ${
                  location.pathname === link.path 
                    ? 'text-[#B7FF3C] bg-[#181C1C]' 
                    : 'text-[#F4F6F3] hover:bg-[#111414]'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Button 
                variant="primary" 
                size="md" 
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setJoinModalOpen(true);
                }}
              >
                JOIN BODY HUB
              </Button>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" size="md" className="w-full">
                  MEMBER & ADMIN LOGIN
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Slot */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Join/Enquiry Modal */}
      <Modal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        title="START YOUR JOURNEY"
        subtitle="Experience Body Hub — leave your details to claim a guest trial or enquire about memberships."
      >
        <form onSubmit={handleJoinSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Rahul Kumar"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] placeholder-[#9CA39D]/50 focus:outline-none focus:border-[#B7FF3C] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1.5">
              Mobile Number (WhatsApp) *
            </label>
            <input
              type="tel"
              required
              pattern="[0-9]{10}"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="10-digit mobile number"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] placeholder-[#9CA39D]/50 focus:outline-none focus:border-[#B7FF3C] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1.5">
              Interested Program or Plan
            </label>
            <select
              value={formData.plan}
              onChange={e => setFormData({ ...formData, plan: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] focus:outline-none focus:border-[#B7FF3C] text-sm"
            >
              <option value="Monthly">Monthly Membership</option>
              <option value="Quarterly">Quarterly Membership</option>
              <option value="Yearly">Yearly Transformation Plan</option>
              <option value="Personal Training">Personal 1-on-1 Coaching</option>
              <option value="Trial Day Pass">Free 1-Day Guest Workout Pass</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1.5">
              Fitness Goals (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="e.g. Strength building, weight loss, mobility..."
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] placeholder-[#9CA39D]/50 focus:outline-none focus:border-[#B7FF3C] text-sm resize-none"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={submitting}
            >
              SUBMIT ENQUIRY
            </Button>
            <p className="text-[11px] text-center text-[#9CA39D] mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B7FF3C]" />
              No spam. Direct consultation with our senior coach.
            </p>
          </div>
        </form>
      </Modal>

      {/* Premium Minimal Footer */}
      <footer className="bg-[#080A0A] border-t border-white/10 pt-16 pb-12 text-[#9CA39D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
            {/* Col 1: Brand & Ethos */}
            <div className="lg:col-span-2 space-y-4">
              <Logo size="lg" showTagline={true} />
              <p className="text-sm leading-relaxed max-w-sm text-[#9CA39D] pt-2">
                "Train. Track. Transform." — A high-performance strength and conditioning sanctuary built around discipline, science-backed biomechanics, and dedicated community.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <a 
                  href={settings.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-[#181C1C] text-[#B7FF3C] border border-white/10 hover:border-[#B7FF3C]/50 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Get Google Maps Directions</span>
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#F4F6F3] mb-4">
                EXPLORE
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/programs" className="hover:text-[#B7FF3C] transition-colors">Programs</Link></li>
                <li><Link to="/membership" className="hover:text-[#B7FF3C] transition-colors">Membership Plans</Link></li>
                <li><Link to="/trainers" className="hover:text-[#B7FF3C] transition-colors">Coaches & Trainers</Link></li>
                <li><Link to="/events" className="hover:text-[#B7FF3C] transition-colors">Workshops & Events</Link></li>
                <li><Link to="/about" className="hover:text-[#B7FF3C] transition-colors">About Body Hub</Link></li>
              </ul>
            </div>

            {/* Col 3: Portals */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#F4F6F3] mb-4">
                PORTALS
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/login" className="hover:text-[#B7FF3C] transition-colors">Member Sign In</Link></li>
                <li><Link to="/login?role=admin" className="hover:text-[#B7FF3C] transition-colors">Admin Dashboard</Link></li>
                <li><Link to="/member/membership" className="hover:text-[#B7FF3C] transition-colors">Digital ID Card</Link></li>
                <li><Link to="/contact" className="hover:text-[#B7FF3C] transition-colors">Help & Enquiries</Link></li>
              </ul>
            </div>

            {/* Col 4: Facility Info */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#F4F6F3] mb-4">
                VISIT BODY HUB
              </h4>
              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="text-[#F4F6F3] font-semibold block">Address:</span>
                  <span>{settings.address}</span>
                </div>
                <div>
                  <span className="text-[#F4F6F3] font-semibold block">Operating Hours:</span>
                  <span>Mon - Sat: {settings.openingHoursWeekdays}</span>
                  <span className="block">{settings.openingHoursWeekends}</span>
                </div>
                <div>
                  <span className="text-[#F4F6F3] font-semibold block">Contact:</span>
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-[#B7FF3C] hover:underline">
                    {settings.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9CA39D]/70">
            <p>© {new Date().getFullYear()} BODY HUB. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/about" className="hover:text-[#F4F6F3]">Privacy Policy</Link>
              <Link to="/about" className="hover:text-[#F4F6F3]">Terms of Service</Link>
              <Link to="/login" className="hover:text-[#B7FF3C]">Staff Portal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
