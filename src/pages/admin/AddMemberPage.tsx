import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, UserPlus, CheckCircle2, Copy, ShieldCheck, KeyRound } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { memberService } from '../../services/store.ts';

export const AddMemberPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [initialPlan, setInitialPlan] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');
  const [loading, setLoading] = useState(false);
  const [createdResult, setCreatedResult] = useState<{
    userName: string;
    username: string;
    tempPassword: string;
    memberId: string;
  } | null>(null);

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.replace(/\D/g, '').length !== 10) {
      showToast('Validation Error', 'Please enter a valid 10-digit Indian mobile number.', 'error');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const res = memberService.create(fullName, mobileNumber, initialPlan);
      
      setCreatedResult({
        userName: res.user.name,
        username: res.user.username,
        tempPassword: res.temporaryPassword,
        memberId: res.user.id
      });

      showToast('Member Created', `Account created for ${res.user.name}.`, 'success');
    }, 450);
  };

  const copyCredentials = () => {
    if (!createdResult) return;
    const text = `Welcome to Body Hub!\nUsername: ${createdResult.username}\nTemporary Password: ${createdResult.tempPassword}\nLogin at: ${window.location.origin}/login`;
    navigator.clipboard.writeText(text);
    showToast('Copied to Clipboard', 'Login details ready to share via WhatsApp/SMS.', 'success');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Top Breadcrumb */}
      <div>
        <Link to="/admin/members" className="inline-flex items-center gap-2 text-xs font-semibold text-[#9CA39D] hover:text-[#B7FF3C] transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Members Roster</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
          ADD NEW MEMBER
        </h1>
        <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
          Quick registration — enter name and mobile number to auto-provision member credentials.
        </p>
      </div>

      {createdResult ? (
        /* Success State required by Section 28 */
        <div className="bg-[#111414] border border-[#B7FF3C]/40 rounded-3xl p-8 space-y-6 animate-in fade-in">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#B7FF3C]/10 border border-[#B7FF3C]/30 rounded-2xl text-[#B7FF3C]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#F4F6F3] font-display">
                Member Created Successfully
              </h2>
              <p className="text-xs text-[#9CA39D]">
                Account provisioned for <span className="text-[#F4F6F3] font-bold">{createdResult.userName}</span>
              </p>
            </div>
          </div>

          <div className="bg-[#181C1C] p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">Assigned Username:</span>
              <span className="font-mono text-sm font-bold text-[#B7FF3C]">{createdResult.username}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">Temporary Password:</span>
              <span className="font-mono text-sm font-bold text-[#F4F6F3]">{createdResult.tempPassword}</span>
            </div>
            <div className="flex items-start gap-2 pt-1 text-xs text-[#9CA39D]">
              <ShieldCheck className="w-4 h-4 text-[#B7FF3C] shrink-0 mt-0.5" />
              <span>
                On the member's first login, the platform will automatically enforce setting a private new password.
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              className="w-full sm:flex-1"
              onClick={copyCredentials}
              leftIcon={<Copy className="w-4 h-4" />}
            >
              COPY LOGIN DETAILS (WHATSAPP)
            </Button>
            <Link to={`/admin/members/${createdResult.memberId}`} className="w-full sm:flex-1">
              <Button variant="secondary" size="md" className="w-full">
                VIEW MEMBER PROFILE
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Form */
        <div className="bg-[#111414] border border-white/10 rounded-3xl p-6 sm:p-10">
          <form onSubmit={handleCreate} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-2">
                FULL NAME *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Rahul Kumar"
                className="w-full px-4 py-3 rounded-xl bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-2">
                MOBILE NUMBER *
              </label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                value={mobileNumber}
                onChange={e => setMobileNumber(e.target.value)}
                placeholder="10-digit Indian mobile number (e.g. 9876543210)"
                className="w-full px-4 py-3 rounded-xl bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
              <p className="text-[11px] text-[#9CA39D] mt-1.5 flex items-center gap-1.5">
                <KeyRound className="w-3 h-3 text-[#B7FF3C]" />
                This mobile number becomes their initial username and temporary password.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase tracking-wider mb-2">
                STARTING MEMBERSHIP TIER
              </label>
              <select
                value={initialPlan}
                onChange={e => setInitialPlan(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              >
                <option value="Monthly">Monthly Membership (30 Days Validity)</option>
                <option value="Quarterly">Quarterly Membership (90 Days Validity)</option>
                <option value="Yearly">Yearly Transformation Plan (365 Days Validity)</option>
              </select>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Link to="/admin/members">
                <Button variant="ghost" size="md">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                leftIcon={<UserPlus className="w-4 h-4" />}
              >
                CREATE MEMBER
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
