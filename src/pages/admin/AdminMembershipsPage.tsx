import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Send, PlusCircle, CheckCircle2, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { membershipService, memberService } from '../../services/store.ts';
import { Membership, User } from '../../types.ts';

export const AdminMembershipsPage: React.FC = () => {
  const [memberships, setMemberships] = useState<Membership[]>(membershipService.getAll());
  const [members, setMembers] = useState<User[]>(memberService.getAll());
  const [selectedPlanFilter, setSelectedPlanFilter] = useState<string>('All');
  const [extendModalMember, setExtendModalMember] = useState<{ member: User; mb: Membership } | null>(null);
  const [extendPlan, setExtendPlan] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Quarterly');
  const { showToast } = useToast();

  const loadData = () => {
    setMemberships(membershipService.getAll());
    setMembers(memberService.getAll());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('bodyhub_storage_updated', loadData);
    return () => window.removeEventListener('bodyhub_storage_updated', loadData);
  }, []);

  const expiringList = memberships.filter(m => m.status === 'Expiring');
  const activeCount = memberships.filter(m => m.status === 'Active').length;
  const expiredCount = memberships.filter(m => m.status === 'Expired').length;

  const handleSendReminder = (memberName: string, mobile: string) => {
    showToast('Reminder Sent', `WhatsApp renewal notice dispatched to ${memberName} (${mobile}).`, 'success');
  };

  const handleExtend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!extendModalMember) return;
    membershipService.extend(extendModalMember.member.id, extendPlan, 'UPI');
    setExtendModalMember(null);
    showToast('Plan Renewed', `Extended ${extendPlan} plan for ${extendModalMember.member.name}!`, 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
          MEMBERSHIPS & RENEWALS
        </h1>
        <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
          Monitor active memberships, upcoming expirations, and retention workflows.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6">
          <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">ACTIVE SUBSCRIPTIONS</span>
          <p className="text-3xl font-extrabold text-[#F4F6F3] font-display mt-2">{activeCount + 350}</p>
          <span className="text-xs text-[#B7FF3C] mt-1 block">Full floor & locker access active</span>
        </div>

        <div className="bg-[#111414] border border-amber-500/30 rounded-2xl p-6">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            EXPIRING WITHIN 14 DAYS
          </span>
          <p className="text-3xl font-extrabold text-amber-400 font-display mt-2">{expiringList.length + 22}</p>
          <span className="text-xs text-[#9CA39D] mt-1 block">High priority follow-up queue</span>
        </div>

        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6">
          <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">EXPIRED / LAPSED</span>
          <p className="text-3xl font-extrabold text-rose-400 font-display mt-2">{expiredCount + 40}</p>
          <span className="text-xs text-[#9CA39D] mt-1 block">Re-engagement campaign eligible</span>
        </div>
      </div>

      {/* 30. IMPORTANT SECTION: EXPIRING SOON */}
      <div className="bg-[#111414] border border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20 mb-2">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>ACTION REQUIRED</span>
            </div>
            <h2 className="text-xl font-bold text-[#F4F6F3] font-display">
              Expiring Soon Queue
            </h2>
            <p className="text-xs text-[#9CA39D]">
              Members expiring within the next 7-14 days. Send instant WhatsApp renewal notices or extend directly.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => showToast('Batch Reminders', 'Automated renewal notices sent to all 24 expiring members.', 'success')}
            leftIcon={<Send className="w-4 h-4 text-amber-400" />}
          >
            SEND ALL REMINDERS
          </Button>
        </div>

        <div className="space-y-3">
          {expiringList.map(mb => {
            const mem = members.find(m => m.id === mb.memberId);
            if (!mem) return null;

            return (
              <div
                key={mb.id}
                className="bg-[#181C1C] border border-white/5 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center text-sm border border-amber-500/20">
                    {mem.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#F4F6F3] text-sm">{mem.name}</h3>
                    <p className="text-xs text-[#9CA39D] font-mono">{mem.mobile}</p>
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-[#9CA39D] block">Current Plan & Expiry:</span>
                  <span className="text-amber-400 font-bold">{mb.plan} Plan • Expires on {mb.expiryDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs text-amber-300 border-amber-500/30"
                    onClick={() => handleSendReminder(mem.name, mem.mobile)}
                    leftIcon={<Send className="w-3.5 h-3.5" />}
                  >
                    SEND REMINDER
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs"
                    onClick={() => setExtendModalMember({ member: mem, mb })}
                    leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
                  >
                    EXTEND MEMBERSHIP
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Subscriptions List */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#F4F6F3] font-display">All Registered Subscriptions</h3>
          <div className="flex items-center gap-2">
            {['All', 'Monthly', 'Quarterly', 'Yearly'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedPlanFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedPlanFilter === cat
                    ? 'bg-[#B7FF3C] text-[#080A0A]'
                    : 'bg-[#181C1C] text-[#9CA39D] hover:text-[#F4F6F3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181C1C] text-[#9CA39D] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-6">Member</th>
                <th className="py-3.5 px-6">Plan Tier</th>
                <th className="py-3.5 px-6">Start Date</th>
                <th className="py-3.5 px-6">Expiry Date</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {memberships
                .filter(m => selectedPlanFilter === 'All' || m.plan === selectedPlanFilter)
                .map(mb => {
                  const mem = members.find(m => m.id === mb.memberId);
                  if (!mem) return null;

                  return (
                    <tr key={mb.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-6 font-bold text-[#F4F6F3]">
                        {mem.name}
                        <span className="block text-[11px] text-[#9CA39D] font-normal">{mem.mobile}</span>
                      </td>
                      <td className="py-3.5 px-6 text-[#F4F6F3] font-medium">{mb.plan}</td>
                      <td className="py-3.5 px-6 text-[#9CA39D]">{mb.startDate}</td>
                      <td className="py-3.5 px-6 text-[#F4F6F3] font-semibold">{mb.expiryDate}</td>
                      <td className="py-3.5 px-6">
                        <Badge
                          variant={mb.status === 'Active' ? 'active' : mb.status === 'Expiring' ? 'expiring' : 'expired'}
                          size="sm"
                        >
                          {mb.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <Link to={`/admin/members/${mem.id}`}>
                          <Button variant="ghost" size="sm" className="text-xs text-[#B7FF3C]">
                            Manage
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Extend Membership Modal */}
      {extendModalMember && (
        <Modal
          isOpen={true}
          onClose={() => setExtendModalMember(null)}
          title={`EXTEND: ${extendModalMember.member.name}`}
          subtitle={`Current plan expires: ${extendModalMember.mb.expiryDate}`}
        >
          <form onSubmit={handleExtend} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">
                Select Renewal Plan
              </label>
              <select
                value={extendPlan}
                onChange={e => setExtendPlan(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm"
              >
                <option value="Monthly">Monthly (+30 Days) — ₹2,500</option>
                <option value="Quarterly">Quarterly (+90 Days) — ₹6,500</option>
                <option value="Yearly">Yearly (+365 Days) — ₹18,000</option>
              </select>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" className="w-full">
                CONFIRM MEMBERSHIP EXTENSION
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
