import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  QrCode, 
  Calendar, 
  Flame, 
  Clock, 
  Dumbbell, 
  CreditCard, 
  MessageSquare, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { authService, membershipService } from '../../services/store.ts';
import { User, Membership } from '../../types.ts';

export const MemberDashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(authService.getCurrentUser());
  const [membership, setMembership] = useState<Membership | undefined>(undefined);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [renewModalOpen, setRenewModalOpen] = useState(false);
  const { showToast } = useToast();

  const loadData = () => {
    const u = authService.getCurrentUser();
    setCurrentUser(u);
    if (u) {
      const mb = membershipService.getByMemberId(u.id);
      setMembership(mb);
      // Enforce first login password change
      if (u.firstLogin) {
        setPasswordModalOpen(true);
      }
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('bodyhub_storage_updated', loadData);
    return () => window.removeEventListener('bodyhub_storage_updated', loadData);
  }, []);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    if (newPassword !== confirmPassword) {
      showToast('Validation Error', 'New passwords do not match.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('Validation Error', 'Password must be at least 6 characters.', 'error');
      return;
    }

    setPasswordLoading(true);
    setTimeout(() => {
      setPasswordLoading(false);
      authService.changePassword(currentUser.id, newPassword);
      setPasswordModalOpen(false);
      showToast('Security Set', 'Your personal password has been saved.', 'success');
      loadData();
    }, 450);
  };

  if (!currentUser) {
    return (
      <div className="text-center py-20 text-[#9CA39D]">
        <p>Please log in to view your member pass.</p>
        <Link to="/login" className="mt-4 inline-block">
          <Button variant="primary" size="sm">Go to Login</Button>
        </Link>
      </div>
    );
  }

  const daysRemaining = membership?.status === 'Expired' ? 0 : 21;
  const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* 36. Top Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#F4F6F3] font-display">
            Welcome back, {currentUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
            Your Body Hub pass is active. Ready to crush today's training?
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRenewModalOpen(true)}
            leftIcon={<CreditCard className="w-4 h-4 text-[#B7FF3C]" />}
          >
            Renew Membership
          </Button>
        </div>
      </div>

      {/* Expiry Warning Banner if <= 7 days */}
      {isExpiringSoon && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-amber-300">
                Your membership expires in {daysRemaining} days!
              </p>
              <p className="text-xs text-[#9CA39D]">
                Renew early to maintain consecutive locker reservation and avoid interruption.
              </p>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={() => setRenewModalOpen(true)}>
            RENEW MEMBERSHIP
          </Button>
        </div>
      )}

      {/* 37. DIGITAL MEMBERSHIP CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Pass Graphic */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#181C1C] via-[#111414] to-[#080A0A] border-2 border-[#B7FF3C]/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between">
          {/* Subtle background circuit watermark */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-8 translate-y-8">
            <QrCode className="w-64 h-64 text-[#B7FF3C]" />
          </div>

          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B7FF3C] block">
                OFFICIAL DIGITAL PASS
              </span>
              <h2 className="text-2xl font-black text-[#F4F6F3] font-display mt-0.5 tracking-tight">
                BODY HUB
              </h2>
            </div>
            <Badge variant={membership?.status === 'Active' ? 'active' : 'expiring'}>
              {membership?.status || 'ACTIVE'}
            </Badge>
          </div>

          <div className="my-8 relative z-10 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#202525] border border-white/10 flex items-center justify-center font-black text-[#B7FF3C] text-2xl shadow-inner">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <p className="text-xl font-bold text-[#F4F6F3] font-display">{currentUser.name}</p>
              <p className="text-xs font-mono text-[#9CA39D] mt-0.5">ID: {currentUser.mobile}</p>
              <p className="text-xs text-[#B7FF3C] font-semibold mt-1">
                {membership ? `${membership.plan} Athlete Tier` : 'Quarterly Access Plan'}
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs">
              <span className="text-[#9CA39D] block text-[11px]">Valid Until:</span>
              <span className="text-[#F4F6F3] font-bold">{membership?.expiryDate || 'October 24, 2026'}</span>
            </div>

            {/* Simulated Scan QR */}
            <div className="flex items-center gap-3 bg-[#080A0A]/80 border border-white/10 rounded-xl px-3 py-2 backdrop-blur-sm">
              <QrCode className="w-8 h-8 text-[#B7FF3C]" />
              <div className="text-[10px] leading-tight text-[#9CA39D]">
                <strong className="text-[#F4F6F3] block">SCAN AT FRONT DESK</strong>
                Check-in scanner active
              </div>
            </div>
          </div>
        </div>

        {/* 38. QUICK STATS */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="bg-[#111414] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <div className="p-2.5 bg-[#181C1C] rounded-xl w-fit text-[#B7FF3C]">
              <Clock className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">{daysRemaining}</p>
              <p className="text-xs text-[#9CA39D] font-semibold mt-0.5">Days Remaining</p>
            </div>
          </div>

          <div className="bg-[#111414] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <div className="p-2.5 bg-[#181C1C] rounded-xl w-fit text-emerald-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">16</p>
              <p className="text-xs text-[#9CA39D] font-semibold mt-0.5">Workouts This Month</p>
            </div>
          </div>

          <div className="bg-[#111414] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <div className="p-2.5 bg-[#181C1C] rounded-xl w-fit text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">4 Days</p>
              <p className="text-xs text-[#9CA39D] font-semibold mt-0.5">Current Streak</p>
            </div>
          </div>

          <div className="bg-[#111414] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
            <div className="p-2.5 bg-[#181C1C] rounded-xl w-fit text-sky-400">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-[#F4F6F3] truncate">Lower Body</p>
              <p className="text-xs text-[#9CA39D] font-semibold mt-0.5">Next Session: Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* 39. MEMBER QUICK ACTIONS */}
      <div>
        <h3 className="text-xs uppercase tracking-wider font-bold text-[#9CA39D] mb-3">
          TRAINING QUICK ACTIONS
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/member/workouts"
            className="p-5 bg-[#111414] border border-white/10 hover:border-[#B7FF3C]/50 rounded-2xl flex flex-col justify-between group transition-all"
          >
            <div className="p-3 bg-[#181C1C] rounded-xl w-fit text-[#B7FF3C] group-hover:bg-[#B7FF3C] group-hover:text-[#080A0A] transition-colors">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-[#F4F6F3]">Workout Plan</p>
              <p className="text-[11px] text-[#9CA39D] mt-0.5">Exercises & sets</p>
            </div>
          </Link>

          <Link
            to="/member/attendance"
            className="p-5 bg-[#111414] border border-white/10 hover:border-[#B7FF3C]/50 rounded-2xl flex flex-col justify-between group transition-all"
          >
            <div className="p-3 bg-[#181C1C] rounded-xl w-fit text-[#B7FF3C] group-hover:bg-[#B7FF3C] group-hover:text-[#080A0A] transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-[#F4F6F3]">Check-In Log</p>
              <p className="text-[11px] text-[#9CA39D] mt-0.5">Monthly consistency</p>
            </div>
          </Link>

          <Link
            to="/events"
            className="p-5 bg-[#111414] border border-white/10 hover:border-[#B7FF3C]/50 rounded-2xl flex flex-col justify-between group transition-all"
          >
            <div className="p-3 bg-[#181C1C] rounded-xl w-fit text-[#B7FF3C] group-hover:bg-[#B7FF3C] group-hover:text-[#080A0A] transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-[#F4F6F3]">Browse Events</p>
              <p className="text-[11px] text-[#9CA39D] mt-0.5">Workshops & meets</p>
            </div>
          </Link>

          <Link
            to="/member/feedback"
            className="p-5 bg-[#111414] border border-white/10 hover:border-[#B7FF3C]/50 rounded-2xl flex flex-col justify-between group transition-all"
          >
            <div className="p-3 bg-[#181C1C] rounded-xl w-fit text-[#B7FF3C] group-hover:bg-[#B7FF3C] group-hover:text-[#080A0A] transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-[#F4F6F3]">Rate Gym</p>
              <p className="text-[11px] text-[#9CA39D] mt-0.5">Give staff feedback</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Mandatory First-Login Password Change Modal required by Section 47 */}
      <Modal
        isOpen={passwordModalOpen}
        onClose={() => {
          if (!currentUser.firstLogin) setPasswordModalOpen(false);
        }}
        title="SET YOUR PRIVATE PASSWORD"
        subtitle="For your security, please update your temporary password before proceeding."
      >
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="p-3 bg-[#181C1C] rounded-xl border border-white/5 text-xs text-[#9CA39D]">
            Welcome to Body Hub! You were provisioned with your mobile number as a temporary password. Choose a secure personal password now.
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">
              New Password (Min 6 characters) *
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">
              Confirm New Password *
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Re-type password"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={passwordLoading}
            >
              SAVE PASSWORD & ACTIVATE PASS
            </Button>
          </div>
        </form>
      </Modal>

      {/* Online Renewal Modal */}
      <Modal
        isOpen={renewModalOpen}
        onClose={() => setRenewModalOpen(false)}
        title="RENEW MEMBERSHIP ONLINE"
        subtitle="Scan the official Body Hub UPI QR code or pay at the reception desk."
      >
        <div className="space-y-4 text-center">
          <div className="p-6 bg-[#181C1C] rounded-2xl border border-white/10 inline-block mx-auto">
            <div className="w-48 h-48 bg-white p-2 rounded-xl mx-auto flex items-center justify-center">
              <QrCode className="w-40 h-40 text-[#080A0A]" />
            </div>
            <p className="text-xs font-mono text-[#F4F6F3] mt-3 font-bold">UPI ID: bodyhub@okaxis</p>
            <p className="text-[11px] text-[#9CA39D]">Supports PhonePe, GPay, Paytm, BHIM</p>
          </div>

          <div className="text-xs text-[#9CA39D] space-y-1">
            <p>1. Complete payment of ₹2,500 (Monthly) or ₹6,500 (Quarterly).</p>
            <p>2. Show transaction screenshot at front desk or WhatsApp to +91 891 278 4499.</p>
          </div>

          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={() => {
              setRenewModalOpen(false);
              showToast('Renewal Request Sent', 'Our desk will verify your payment and extend your validity.', 'success');
            }}
          >
            I HAVE COMPLETED PAYMENT
          </Button>
        </div>
      </Modal>
    </div>
  );
};
