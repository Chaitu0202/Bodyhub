import React, { useState } from 'react';
import { Save, ShieldCheck, KeyRound, Building2, Bell, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { settingsService, authService } from '../../services/store.ts';

export const AdminSettingsPage: React.FC = () => {
  const currentSettings = settingsService.get();
  const [gymProfile, setGymProfile] = useState({ ...currentSettings });
  const [adminPassword, setAdminPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notifications, setNotifications] = useState({
    whatsappRenewals: true,
    paymentAlerts: true,
    newMemberAlerts: true
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const { showToast } = useToast();

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setTimeout(() => {
      setSavingProfile(false);
      settingsService.update(gymProfile);
      showToast('Settings Saved', 'Gym profile and Google Maps configuration updated.', 'success');
    }, 400);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword.newPassword !== adminPassword.confirmPassword) {
      showToast('Mismatch', 'New passwords do not match.', 'error');
      return;
    }
    if (adminPassword.newPassword.length < 6) {
      showToast('Weak Password', 'Password must be at least 6 characters.', 'error');
      return;
    }

    setSavingPassword(true);
    setTimeout(() => {
      setSavingPassword(false);
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        authService.changePassword(currentUser.id, adminPassword.newPassword);
      }
      setAdminPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showToast('Password Changed', 'Admin credentials updated successfully.', 'success');
    }, 450);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
          SYSTEM SETTINGS
        </h1>
        <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
          Configure facility location, staff credentials, and notification thresholds.
        </p>
      </div>

      {/* 35. GYM PROFILE SECTION */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Building2 className="w-5 h-5 text-[#B7FF3C]" />
          <div>
            <h2 className="text-lg font-bold text-[#F4F6F3] font-display">Gym Profile & Location</h2>
            <p className="text-xs text-[#9CA39D]">Physical location and public contact details</p>
          </div>
        </div>

        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Gym Name</label>
              <input
                type="text"
                required
                value={gymProfile.name}
                onChange={e => setGymProfile({ ...gymProfile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={gymProfile.phone}
                onChange={e => setGymProfile({ ...gymProfile, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Official Email</label>
              <input
                type="email"
                required
                value={gymProfile.email}
                onChange={e => setGymProfile({ ...gymProfile, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Google Maps URL</label>
              <div className="relative">
                <input
                  type="url"
                  required
                  value={gymProfile.mapsUrl}
                  onChange={e => setGymProfile({ ...gymProfile, mapsUrl: e.target.value })}
                  className="w-full px-4 py-2.5 pr-9 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
                />
                <a
                  href={gymProfile.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-3 text-[#9CA39D] hover:text-[#B7FF3C]"
                  title="Verify link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Physical Address</label>
            <input
              type="text"
              required
              value={gymProfile.address}
              onChange={e => setGymProfile({ ...gymProfile, address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Weekday Hours</label>
              <input
                type="text"
                value={gymProfile.openingHoursWeekdays}
                onChange={e => setGymProfile({ ...gymProfile, openingHoursWeekdays: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Sunday Hours</label>
              <input
                type="text"
                value={gymProfile.openingHoursWeekends}
                onChange={e => setGymProfile({ ...gymProfile, openingHoursWeekends: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" size="md" isLoading={savingProfile} leftIcon={<Save className="w-4 h-4" />}>
              SAVE GYM PROFILE
            </Button>
          </div>
        </form>
      </div>

      {/* ADMIN CREDENTIALS */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <KeyRound className="w-5 h-5 text-[#B7FF3C]" />
          <div>
            <h2 className="text-lg font-bold text-[#F4F6F3] font-display">Admin Account Credentials</h2>
            <p className="text-xs text-[#9CA39D]">Username is fixed to "admin". Update administrative master key.</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Username</label>
            <input
              type="text"
              disabled
              value="admin"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/5 text-[#9CA39D] text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">New Password</label>
            <input
              type="password"
              required
              value={adminPassword.newPassword}
              onChange={e => setAdminPassword({ ...adminPassword, newPassword: e.target.value })}
              placeholder="Minimum 6 characters"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={adminPassword.confirmPassword}
              onChange={e => setAdminPassword({ ...adminPassword, confirmPassword: e.target.value })}
              placeholder="Re-type new password"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="secondary" size="md" isLoading={savingPassword}>
              UPDATE ADMIN PASSWORD
            </Button>
          </div>
        </form>
      </div>

      {/* NOTIFICATIONS */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <Bell className="w-5 h-5 text-[#B7FF3C]" />
          <div>
            <h2 className="text-lg font-bold text-[#F4F6F3] font-display">Notification Automation</h2>
            <p className="text-xs text-[#9CA39D]">Automated operational pings and member notifications</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-[#181C1C] rounded-xl border border-white/5 cursor-pointer">
            <div>
              <p className="text-sm font-bold text-[#F4F6F3]">Automated WhatsApp Expiry Reminders</p>
              <p className="text-xs text-[#9CA39D]">Notify athletes 7 days and 3 days before subscription expiration</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.whatsappRenewals}
              onChange={e => setNotifications({ ...notifications, whatsappRenewals: e.target.checked })}
              className="w-4 h-4 rounded text-[#B7FF3C] focus:ring-0 bg-[#111414] border-white/20"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-[#181C1C] rounded-xl border border-white/5 cursor-pointer">
            <div>
              <p className="text-sm font-bold text-[#F4F6F3]">Digital Payment Receipts (SMS/WhatsApp)</p>
              <p className="text-xs text-[#9CA39D]">Automatically issue a downloadable receipt link upon payment</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.paymentAlerts}
              onChange={e => setNotifications({ ...notifications, paymentAlerts: e.target.checked })}
              className="w-4 h-4 rounded text-[#B7FF3C] focus:ring-0 bg-[#111414] border-white/20"
            />
          </label>

          <label className="flex items-center justify-between p-4 bg-[#181C1C] rounded-xl border border-white/5 cursor-pointer">
            <div>
              <p className="text-sm font-bold text-[#F4F6F3]">Staff Onboarding Alerts</p>
              <p className="text-xs text-[#9CA39D]">Receive SMS summary when a new member registers</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.newMemberAlerts}
              onChange={e => setNotifications({ ...notifications, newMemberAlerts: e.target.checked })}
              className="w-4 h-4 rounded text-[#B7FF3C] focus:ring-0 bg-[#111414] border-white/20"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
