import React, { useState } from 'react';
import { User as UserIcon, Lock, Phone, Mail, ShieldCheck, KeyRound, Save } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { authService, memberService } from '../../services/store.ts';

export const MemberProfilePage: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [emergencyContact, setEmergencyContact] = useState('9848012345 (Dr. Varma)');
  const [savingProfile, setSavingProfile] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const { showToast } = useToast();

  if (!currentUser) return null;

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setTimeout(() => {
      setSavingProfile(false);
      memberService.update(currentUser.id, { name, email });
      showToast('Profile Saved', 'Personal information updated successfully.', 'success');
    }, 400);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('Validation Error', 'New passwords do not match.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('Validation Error', 'Password must be at least 6 characters.', 'error');
      return;
    }

    setSavingPassword(true);
    setTimeout(() => {
      setSavingPassword(false);
      authService.changePassword(currentUser.id, newPassword);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Password Changed', 'Your login password has been updated.', 'success');
    }, 400);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
          ATHLETE PROFILE & SETTINGS
        </h1>
        <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
          Manage your contact credentials, emergency contacts, and account security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Profile Info */}
        <div className="bg-[#111414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <UserIcon className="w-5 h-5 text-[#B7FF3C]" />
            <h2 className="text-lg font-bold text-[#F4F6F3] font-display">Personal Details</h2>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Mobile Number (Login ID)</label>
              <input
                type="text"
                disabled
                value={currentUser.mobile}
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/5 text-[#9CA39D] text-sm cursor-not-allowed font-mono"
              />
              <span className="text-[10px] text-[#9CA39D] mt-1 block">To update mobile ID, contact reception.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="athlete@example.com"
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Emergency Contact</label>
              <input
                type="text"
                value={emergencyContact}
                onChange={e => setEmergencyContact(e.target.value)}
                placeholder="Name & contact number"
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="md" className="w-full" isLoading={savingProfile}>
                SAVE PROFILE CHANGES
              </Button>
            </div>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-[#111414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <Lock className="w-5 h-5 text-[#B7FF3C]" />
            <h2 className="text-lg font-bold text-[#F4F6F3] font-display">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">New Password</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>

            <div className="p-3 bg-[#181C1C] rounded-xl border border-white/5 text-xs text-[#9CA39D] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B7FF3C] shrink-0 mt-0.5" />
              <span>We recommend using a strong password distinct from your mobile number.</span>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="secondary" size="md" className="w-full" isLoading={savingPassword}>
                UPDATE PASSWORD
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
