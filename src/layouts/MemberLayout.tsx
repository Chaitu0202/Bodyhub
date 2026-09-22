import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  IdCard, 
  CreditCard, 
  Calendar, 
  MessageSquareHeart, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X,
  ExternalLink,
  Lock,
  Check
} from 'lucide-react';
import { Logo } from '../components/ui/Logo.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Modal } from '../components/ui/Modal.tsx';
import { useToast } from '../components/ui/Toast.tsx';
import { authService, notificationService, memberService } from '../services/store.ts';
import { User } from '../types.ts';

export const MemberLayout: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(authService.getCurrentUser());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [firstLoginModal, setFirstLoginModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      navigate('/login', { replace: true });
      return;
    }
    // If admin lands on /member/*, redirect to /admin/dashboard
    if (user.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
      return;
    }
    setCurrentUser(user);

    // If first login, prompt password change
    if (user.firstLogin) {
      setFirstLoginModal(true);
    }

    const updateHandler = () => {
      const updated = authService.getCurrentUser();
      setCurrentUser(updated);
    };
    window.addEventListener('bodyhub_storage_updated', updateHandler);
    return () => window.removeEventListener('bodyhub_storage_updated', updateHandler);
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPassError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassError('Passwords do not match.');
      return;
    }
    if (currentUser) {
      authService.changePassword(currentUser.id, newPassword);
      setFirstLoginModal(false);
      showToast('Security Updated', 'Your personal password has been saved.', 'success');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/member/dashboard', icon: LayoutDashboard },
    { name: 'My Membership', path: '/member/membership', icon: IdCard },
    { name: 'Payments', path: '/member/payments', icon: CreditCard },
    { name: 'Events', path: '/member/events', icon: Calendar },
    { name: 'Feedback', path: '/member/feedback', icon: MessageSquareHeart },
    { name: 'Notifications', path: '/member/notifications', icon: Bell },
    { name: 'My Profile', path: '/member/profile', icon: UserIcon },
  ];

  const unreadNotifs = currentUser ? notificationService.getForUser(currentUser.id).filter(n => !n.read).length : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#080A0A] text-[#F4F6F3] pb-16 md:pb-0">
      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-[#111414] border-b border-white/10 px-4 sm:px-8 h-18 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo to="/member/dashboard" size="md" />
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 text-xs">
            <span className="font-bold text-[#B7FF3C]">MEMBER PORTAL</span>
            <span className="text-[#9CA39D]">•</span>
            <span className="text-[#9CA39D]">ID: {currentUser?.username || 'Member'}</span>
          </div>
        </div>

        {/* Desktop Member Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#181C1C] p-1.5 rounded-xl border border-white/5">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#B7FF3C] text-[#080A0A] font-bold shadow-sm'
                    : 'text-[#9CA39D] hover:text-[#F4F6F3] hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
                {item.name === 'Notifications' && unreadNotifs > 0 && (
                  <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${
                    isActive ? 'bg-[#080A0A] text-[#B7FF3C]' : 'bg-[#B7FF3C] text-[#080A0A]'
                  }`}>
                    {unreadNotifs}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Member Profile Menu */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-[#F4F6F3]">{currentUser?.name || 'Member'}</span>
            <span className="text-[10px] text-[#B7FF3C] font-semibold tracking-wider uppercase">Active Athlete</span>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 text-[#9CA39D] hover:text-red-400 bg-[#181C1C] border border-white/10 rounded-lg hover:border-white/20 transition-colors"
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Member Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation Bar (5 core items for quick thumb tap) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111414] border-t border-white/10 px-2 py-2 flex items-center justify-around shadow-2xl">
        <NavLink 
          to="/member/dashboard" 
          className={({ isActive }) => `flex flex-col items-center gap-1 p-1 text-[10px] font-semibold ${isActive ? 'text-[#B7FF3C]' : 'text-[#9CA39D]'}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </NavLink>
        <NavLink 
          to="/member/membership" 
          className={({ isActive }) => `flex flex-col items-center gap-1 p-1 text-[10px] font-semibold ${isActive ? 'text-[#B7FF3C]' : 'text-[#9CA39D]'}`}
        >
          <IdCard className="w-4 h-4" />
          <span>Pass</span>
        </NavLink>
        <NavLink 
          to="/member/payments" 
          className={({ isActive }) => `flex flex-col items-center gap-1 p-1 text-[10px] font-semibold ${isActive ? 'text-[#B7FF3C]' : 'text-[#9CA39D]'}`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Pay</span>
        </NavLink>
        <NavLink 
          to="/member/events" 
          className={({ isActive }) => `flex flex-col items-center gap-1 p-1 text-[10px] font-semibold ${isActive ? 'text-[#B7FF3C]' : 'text-[#9CA39D]'}`}
        >
          <Calendar className="w-4 h-4" />
          <span>Events</span>
        </NavLink>
        <NavLink 
          to="/member/profile" 
          className={({ isActive }) => `flex flex-col items-center gap-1 p-1 text-[10px] font-semibold ${isActive ? 'text-[#B7FF3C]' : 'text-[#9CA39D]'}`}
        >
          <UserIcon className="w-4 h-4" />
          <span>Profile</span>
        </NavLink>
      </nav>

      {/* First-Login Mandatory Password Change Modal */}
      <Modal
        isOpen={firstLoginModal}
        onClose={() => {}} // Disallow closing without changing
        title="SECURITY NOTICE: FIRST LOGIN"
        subtitle="Your initial temporary password is your mobile number. Please create a private password to secure your account."
      >
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1.5">
              New Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={e => {
                  setNewPassword(e.target.value);
                  setPassError('');
                }}
                placeholder="At least 6 characters"
                className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
              <Lock className="w-4 h-4 text-[#9CA39D] absolute right-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1.5">
              Confirm New Password *
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value);
                setPassError('');
              }}
              placeholder="Re-type new password"
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            />
          </div>

          {passError && (
            <p className="text-xs text-rose-400 font-semibold">{passError}</p>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              leftIcon={<Check className="w-4 h-4" />}
            >
              SAVE PASSWORD & CONTINUE
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
