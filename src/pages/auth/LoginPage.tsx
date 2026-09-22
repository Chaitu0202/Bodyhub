import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, User as UserIcon, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, KeyRound } from 'lucide-react';
import { Logo } from '../../components/ui/Logo.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { authService } from '../../services/store.ts';

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'admin' ? 'admin' : 'member';
  
  const [activeTab, setActiveTab] = useState<'member' | 'admin'>(initialRole);
  const [identifier, setIdentifier] = useState(initialRole === 'admin' ? 'admin' : '9876543210');
  const [password, setPassword] = useState(initialRole === 'admin' ? 'password' : '9876543210');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    // If already logged in, redirect to respective dashboard
    const user = authService.getCurrentUser();
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/member/dashboard', { replace: true });
      }
    }
  }, [navigate]);

  const handleTabSwitch = (tab: 'member' | 'admin') => {
    setActiveTab(tab);
    setError('');
    if (tab === 'admin') {
      setIdentifier('admin');
      setPassword('password');
    } else {
      setIdentifier('9876543210');
      setPassword('9876543210');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const res = authService.login(identifier, password);

      if (!res.success || !res.user) {
        setError(res.error || 'Incorrect login credentials. Please try again.');
        return;
      }

      showToast('Welcome back!', `Logged in as ${res.user.name}`, 'success');

      if (res.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/member/dashboard');
      }
    }, 450);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#080A0A] text-[#F4F6F3]">
      {/* Left Column: Full-screen Fitness Image & Brand Ethos */}
      <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 relative bg-[#111414] overflow-hidden flex-col justify-between p-12 xl:p-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
            alt="Body Hub Training Arena"
            className="w-full h-full object-cover filter brightness-40 contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A0A] via-[#080A0A]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#080A0A]/40 to-[#080A0A]" />
        </div>

        {/* Top Logo */}
        <div className="relative z-10">
          <Logo size="lg" showTagline={true} />
        </div>

        {/* Bottom Editorial Quote */}
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181C1C]/80 border border-white/10 text-xs text-[#B7FF3C] backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PREMIUM FITNESS PLATFORM</span>
          </div>

          <h2 className="text-4xl xl:text-5xl font-extrabold text-[#F4F6F3] font-display tracking-tight leading-tight">
            TRAIN. TRACK. <br />
            <span className="text-[#B7FF3C]">TRANSFORM.</span>
          </h2>

          <p className="text-sm text-[#9CA39D] leading-relaxed">
            Welcome to the Body Hub digital member and management ecosystem. Instant check-in passes, personal training programs, renewal tracking, and transparent workout data.
          </p>

          <div className="pt-4 flex items-center gap-6 text-xs text-[#9CA39D] border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B7FF3C]" />
              Encrypted Session
            </span>
            <span>•</span>
            <span>Single Sign-On Architecture</span>
          </div>
        </div>
      </div>

      {/* Right Column: Split-Screen Login Form */}
      <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center px-6 sm:px-12 xl:px-16 py-12 relative bg-[#080A0A]">
        {/* Mobile Header Logo */}
        <div className="lg:hidden mb-8">
          <Logo size="md" showTagline={true} />
        </div>

        <div className="max-w-md w-full mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#F4F6F3] font-display tracking-tight">
              LOGIN TO BODY HUB
            </h1>
            <p className="text-xs text-[#9CA39D] mt-2">
              Access your digital membership pass or staff administrative dashboard.
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex rounded-xl bg-[#111414] p-1 border border-white/10">
            <button
              type="button"
              onClick={() => handleTabSwitch('member')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'member'
                  ? 'bg-[#B7FF3C] text-[#080A0A] shadow-sm'
                  : 'text-[#9CA39D] hover:text-[#F4F6F3]'
              }`}
            >
              MEMBER PORTAL
            </button>
            <button
              type="button"
              onClick={() => handleTabSwitch('admin')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-[#B7FF3C] text-[#080A0A] shadow-sm'
                  : 'text-[#9CA39D] hover:text-[#F4F6F3]'
              }`}
            >
              ADMIN PORTAL
            </button>
          </div>

          {/* 1-Click Demo Credential Helpers */}
          <div className="p-3.5 bg-[#181C1C] border border-white/10 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#B7FF3C] flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5" />
                Demo Credentials Loaded:
              </span>
              <span className="text-[10px] text-[#9CA39D]">1-Click Ready</span>
            </div>
            {activeTab === 'admin' ? (
              <p className="text-xs text-[#9CA39D]">
                Username: <code className="text-[#F4F6F3] font-bold">admin</code> &nbsp;|&nbsp; 
                Password: <code className="text-[#F4F6F3] font-bold">password</code>
              </p>
            ) : (
              <p className="text-xs text-[#9CA39D]">
                Mobile: <code className="text-[#F4F6F3] font-bold">9876543210</code> &nbsp;|&nbsp; 
                Password: <code className="text-[#F4F6F3] font-bold">9876543210</code>
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400 font-semibold leading-relaxed">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1.5">
                {activeTab === 'admin' ? 'Admin Username' : 'Mobile Number / Username'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder={activeTab === 'admin' ? 'admin' : '10-digit registered mobile'}
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-[#111414] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
                />
                <UserIcon className="w-4 h-4 text-[#9CA39D] absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-[#111414] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
                />
                <Lock className="w-4 h-4 text-[#9CA39D] absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-[#9CA39D] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded bg-[#111414] border-white/20 text-[#B7FF3C] focus:ring-0 w-3.5 h-3.5"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => showToast('Password Recovery', 'Please contact Body Hub reception (+91 891 278 4499) to reset your credentials.', 'info')}
                className="text-[#9CA39D] hover:text-[#B7FF3C] transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full text-sm font-bold mt-2"
              isLoading={loading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {activeTab === 'admin' ? 'LOGIN TO ADMIN PORTAL' : 'LOGIN TO MEMBER PORTAL'}
            </Button>
          </form>

          {/* Bottom Switch to Join */}
          <div className="pt-6 border-t border-white/10 text-center space-y-2 text-xs">
            <p className="text-[#9CA39D]">
              New to Body Hub?{' '}
              <Link to="/membership" className="text-[#B7FF3C] font-bold hover:underline">
                JOIN BODY HUB
              </Link>
            </p>
            <p>
              <Link to="/" className="text-[#9CA39D] hover:text-[#F4F6F3] transition-colors">
                ← Return to Public Website
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
