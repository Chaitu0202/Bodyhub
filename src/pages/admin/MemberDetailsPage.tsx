import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Calendar, 
  CreditCard, 
  Clock, 
  Edit3, 
  PlusCircle, 
  ShieldAlert, 
  Trash2, 
  CheckCircle2,
  Mail,
  UserCheck
} from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { memberService, membershipService, paymentService } from '../../services/store.ts';
import { User, Membership, Payment } from '../../types.ts';

export const MemberDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [member, setMember] = useState<User | undefined>(undefined);
  const [membership, setMembership] = useState<Membership | undefined>(undefined);
  const [payments, setPayments] = useState<Payment[]>([]);

  // Modals
  const [editModal, setEditModal] = useState(false);
  const [extendModal, setExtendModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [deactivateModal, setDeactivateModal] = useState(false);

  // Form states
  const [editForm, setEditForm] = useState({ name: '', mobile: '', email: '' });
  const [extendPlan, setExtendPlan] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');
  const [paymentAmount, setPaymentAmount] = useState('2500');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Cash'>('UPI');

  const loadData = () => {
    if (!id) return;
    const m = memberService.getById(id);
    setMember(m);
    if (m) {
      setEditForm({ name: m.name, mobile: m.mobile, email: m.email || '' });
    }
    const mb = membershipService.getByMemberId(id);
    setMembership(mb);
    const p = paymentService.getByMemberId(id);
    setPayments(p);
  };

  useEffect(() => {
    loadData();
    window.addEventListener('bodyhub_storage_updated', loadData);
    return () => window.removeEventListener('bodyhub_storage_updated', loadData);
  }, [id]);

  if (!member) {
    return (
      <div className="text-center py-24 space-y-4">
        <p className="text-[#9CA39D]">Member record not found.</p>
        <Link to="/admin/members">
          <Button variant="secondary" size="sm">
            Back to Member Roster
          </Button>
        </Link>
      </div>
    );
  }

  const status = membership ? membership.status : 'Active';
  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((acc, p) => acc + p.amount, 0);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    memberService.update(member.id, {
      name: editForm.name,
      mobile: editForm.mobile,
      email: editForm.email
    });
    setEditModal(false);
    showToast('Member Updated', 'Profile details updated successfully.', 'success');
  };

  const handleExtendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    membershipService.extend(member.id, extendPlan, paymentMethod);
    setExtendModal(false);
    showToast('Membership Extended', `Renewed ${extendPlan} plan for ${member.name}.`, 'success');
  };

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    paymentService.recordPayment({
      memberId: member.id,
      memberName: member.name,
      amount: parseFloat(paymentAmount) || 2500,
      method: paymentMethod,
      status: 'Paid',
      planName: `${membership?.plan || 'Monthly'} Membership Dues`
    });
    setPaymentModal(false);
    showToast('Payment Recorded', `₹${paymentAmount} payment logged with receipt.`, 'success');
  };

  const handleDeactivate = () => {
    memberService.deleteOrDeactivate(member.id);
    setDeactivateModal(false);
    showToast('Member Deactivated', `${member.name}'s membership has been suspended.`, 'info');
    navigate('/admin/members');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Header */}
      <div>
        <Link to="/admin/members" className="inline-flex items-center gap-2 text-xs font-semibold text-[#9CA39D] hover:text-[#B7FF3C] transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Members</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111414] border border-white/10 p-6 sm:p-8 rounded-3xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#181C1C] border border-[#B7FF3C]/30 flex items-center justify-center text-[#B7FF3C] text-2xl font-black">
              {member.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-[#F4F6F3] font-display">{member.name}</h1>
                <Badge
                  variant={status === 'Active' ? 'active' : status === 'Expiring' ? 'expiring' : 'expired'}
                >
                  {status.toUpperCase()}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-[#9CA39D]">
                <span className="font-mono flex items-center gap-1 text-[#F4F6F3]">
                  <Phone className="w-3.5 h-3.5 text-[#B7FF3C]" />
                  {member.mobile}
                </span>
                {member.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" />
                    {member.email}
                  </span>
                )}
                <span>Member ID: {member.username}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons required by Section 29 */}
          <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
            <Button variant="secondary" size="sm" onClick={() => setEditModal(true)} leftIcon={<Edit3 className="w-3.5 h-3.5" />}>
              Edit Member
            </Button>
            <Button variant="primary" size="sm" onClick={() => setExtendModal(true)} leftIcon={<PlusCircle className="w-3.5 h-3.5" />}>
              Extend Membership
            </Button>
          </div>
        </div>
      </div>

      {/* Grid of Sections: Membership, Payment, Activity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* MEMBERSHIP */}
        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-[#9CA39D] uppercase tracking-wider">
            <span>MEMBERSHIP</span>
            <span className="text-[#B7FF3C]">{membership?.plan || 'Monthly'}</span>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <span className="text-xs text-[#9CA39D] block">Plan Validity</span>
              <span className="text-lg font-bold text-[#F4F6F3] font-display">
                {membership ? `${membership.plan} Access` : 'Monthly'}
              </span>
            </div>
            <div className="flex justify-between text-xs py-1 border-y border-white/5">
              <span className="text-[#9CA39D]">Start Date:</span>
              <span className="text-[#F4F6F3] font-semibold">{membership?.startDate || '—'}</span>
            </div>
            <div className="flex justify-between text-xs py-1 border-b border-white/5">
              <span className="text-[#9CA39D]">Expiry Date:</span>
              <span className="text-[#B7FF3C] font-semibold">{membership?.expiryDate || '—'}</span>
            </div>
            <div className="flex justify-between text-xs pt-1">
              <span className="text-[#9CA39D]">Locker & Floor:</span>
              <span className="text-emerald-400 font-semibold">Enabled</span>
            </div>
          </div>
        </div>

        {/* PAYMENT */}
        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-[#9CA39D] uppercase tracking-wider">
            <span>PAYMENTS</span>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-[#B7FF3C]" onClick={() => setPaymentModal(true)}>
              + Record
            </Button>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <span className="text-xs text-[#9CA39D] block">Total Paid to Date</span>
              <span className="text-2xl font-bold text-[#F4F6F3] font-display">
                ₹{totalPaid.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-xs py-1 border-y border-white/5">
              <span className="text-[#9CA39D]">Last Payment:</span>
              <span className="text-[#F4F6F3] font-semibold">
                {payments[0] ? `₹${payments[0].amount} (${payments[0].date})` : '—'}
              </span>
            </div>
            <div className="flex justify-between text-xs py-1 border-b border-white/5">
              <span className="text-[#9CA39D]">Next Due:</span>
              <span className="text-amber-400 font-semibold">{membership?.expiryDate || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">
            ACTIVITY & ACCOUNT
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <span className="text-xs text-[#9CA39D] block">Member Since</span>
              <span className="text-base font-bold text-[#F4F6F3]">
                {member.createdAt.split('T')[0]}
              </span>
            </div>
            <div className="flex justify-between text-xs py-1 border-y border-white/5">
              <span className="text-[#9CA39D]">Last Login:</span>
              <span className="text-[#F4F6F3]">Today, Active</span>
            </div>
            <div className="flex justify-between text-xs py-1 border-b border-white/5">
              <span className="text-[#9CA39D]">Password Changed:</span>
              <span className={member.firstLogin ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                {member.firstLogin ? 'Pending (Temp)' : 'Yes, Secured'}
              </span>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setDeactivateModal(true)}
                className="text-xs text-rose-400 hover:underline font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Deactivate Member
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#F4F6F3] font-display">Payment Transactions</h3>
          <Button variant="secondary" size="sm" onClick={() => setPaymentModal(true)}>
            Record Manual Payment
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181C1C] text-[#9CA39D] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-6">Receipt #</th>
                <th className="py-3 px-6">Item / Plan</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Method</th>
                <th className="py-3 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-[#9CA39D]">
                    No payment records found for this member.
                  </td>
                </tr>
              ) : (
                payments.map(p => (
                  <tr key={p.id}>
                    <td className="py-3.5 px-6 font-mono text-[#B7FF3C] font-semibold">{p.receiptNumber}</td>
                    <td className="py-3.5 px-6 font-medium text-[#F4F6F3]">{p.planName}</td>
                    <td className="py-3.5 px-6 font-bold text-[#F4F6F3]">₹{p.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-6 text-[#9CA39D]">{p.date}</td>
                    <td className="py-3.5 px-6 text-[#9CA39D]">{p.method}</td>
                    <td className="py-3.5 px-6 text-right">
                      <Badge variant={p.status === 'Paid' ? 'paid' : p.status === 'Pending' ? 'pending' : 'failed'} size="sm">
                        {p.status}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Member Modal */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)} title="EDIT MEMBER PROFILE">
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Full Name</label>
            <input
              type="text"
              required
              value={editForm.name}
              onChange={e => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Mobile Number</label>
            <input
              type="tel"
              required
              value={editForm.mobile}
              onChange={e => setEditForm({ ...editForm, mobile: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Email Address</label>
            <input
              type="email"
              value={editForm.email}
              onChange={e => setEditForm({ ...editForm, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm"
            />
          </div>
          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              SAVE CHANGES
            </Button>
          </div>
        </form>
      </Modal>

      {/* Extend Membership Modal */}
      <Modal isOpen={extendModal} onClose={() => setExtendModal(false)} title="EXTEND MEMBERSHIP">
        <form onSubmit={handleExtendSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Select Renewal Plan</label>
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
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm"
            >
              <option value="UPI">UPI (Google Pay / PhonePe)</option>
              <option value="Card">Credit / Debit Card</option>
              <option value="Cash">In-Studio Cash</option>
            </select>
          </div>
          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              CONFIRM EXTENSION & RECORD PAYMENT
            </Button>
          </div>
        </form>
      </Modal>

      {/* Record Payment Modal */}
      <Modal isOpen={paymentModal} onClose={() => setPaymentModal(false)} title="RECORD PAYMENT">
        <form onSubmit={handleRecordPayment} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Amount (₹)</label>
            <input
              type="number"
              required
              value={paymentAmount}
              onChange={e => setPaymentAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm"
            >
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              SAVE PAYMENT RECORD
            </Button>
          </div>
        </form>
      </Modal>

      {/* Deactivate Confirmation Modal */}
      <Modal isOpen={deactivateModal} onClose={() => setDeactivateModal(false)} title="DEACTIVATE MEMBER?">
        <div className="space-y-4">
          <p className="text-xs text-[#9CA39D] leading-relaxed">
            This member will no longer have an active pass or access privileges. Their historical attendance and receipts will be retained.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Button variant="ghost" size="md" className="flex-1" onClick={() => setDeactivateModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="md" className="flex-1" onClick={handleDeactivate}>
              Deactivate
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
