import React, { useState, useEffect } from 'react';
import { IndianRupee, Plus, Download, Search, CheckCircle2, Clock, AlertTriangle, FileText } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { paymentService, memberService } from '../../services/store.ts';
import { Payment, User } from '../../types.ts';

export const AdminPaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>(paymentService.getAll());
  const [members, setMembers] = useState<User[]>(memberService.getAll());
  const [search, setSearch] = useState('');
  const [recordModal, setRecordModal] = useState(false);
  const [receiptModal, setReceiptModal] = useState<Payment | null>(null);

  // Form states
  const [memberId, setMemberId] = useState('');
  const [amount, setAmount] = useState('2500');
  const [method, setMethod] = useState<'UPI' | 'Card' | 'Cash'>('UPI');
  const [planName, setPlanName] = useState('Monthly Subscription Renewal');
  const [status, setStatus] = useState<'Paid' | 'Pending'>('Paid');
  const { showToast } = useToast();

  const loadData = () => {
    setPayments(paymentService.getAll());
    setMembers(memberService.getAll());
  };

  useEffect(() => {
    loadData();
    window.addEventListener('bodyhub_storage_updated', loadData);
    return () => window.removeEventListener('bodyhub_storage_updated', loadData);
  }, []);

  const handleRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const selMember = members.find(m => m.id === memberId);
    if (!selMember) {
      showToast('Selection Required', 'Please select a registered member.', 'error');
      return;
    }

    const created = paymentService.recordPayment({
      memberId: selMember.id,
      memberName: selMember.name,
      amount: parseFloat(amount) || 2500,
      method,
      status,
      planName
    });

    setRecordModal(false);
    showToast('Payment Logged', `Receipt ${created.receiptNumber} recorded for ${selMember.name}.`, 'success');
  };

  const filtered = payments.filter(p => 
    p.memberName.toLowerCase().includes(search.toLowerCase()) ||
    p.receiptNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
            PAYMENT TRANSACTIONS
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
            Track subscription collections, digital receipts, and pending fees.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setRecordModal(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          RECORD PAYMENT
        </Button>
      </div>

      {/* 31. KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          label="TOTAL REVENUE"
          value="₹2.84L"
          subtext="Cumulative gross collections"
          icon={<IndianRupee className="w-5 h-5 text-[#B7FF3C]" />}
          accent={true}
        />
        <StatCard
          label="THIS MONTH"
          value="₹2.84L"
          subtext="Current calendar period"
          change="+18.4% vs last mo"
          changePositive={true}
          icon={<IndianRupee className="w-5 h-5 text-emerald-400" />}
        />
        <StatCard
          label="PENDING"
          value="₹12,500"
          subtext="5 overdue member invoices"
          change="Pending verification"
          changePositive={false}
          icon={<Clock className="w-5 h-5 text-amber-400" />}
        />
        <StatCard
          label="TRANSACTIONS"
          value={142}
          subtext="100% digital audit trace"
          icon={<FileText className="w-5 h-5 text-[#9CA39D]" />}
        />
      </div>

      {/* Table Card */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl overflow-hidden shadow-sm space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-base font-bold text-[#F4F6F3] font-display">
            Transaction Ledger
          </h3>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#9CA39D] absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by name or receipt #..."
              className="w-full pl-10 pr-4 py-2 bg-[#181C1C] border border-white/10 rounded-lg text-xs text-[#F4F6F3] focus:outline-none focus:border-[#B7FF3C]"
            />
          </div>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181C1C] text-[#9CA39D] uppercase tracking-wider font-semibold border-y border-white/5">
              <tr>
                <th className="py-3 px-6">Receipt #</th>
                <th className="py-3 px-6">Member Name</th>
                <th className="py-3 px-6">Item / Plan</th>
                <th className="py-3 px-6">Amount</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Method</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-6 font-mono text-[#B7FF3C] font-semibold">{p.receiptNumber}</td>
                  <td className="py-3.5 px-6 font-bold text-[#F4F6F3]">{p.memberName}</td>
                  <td className="py-3.5 px-6 text-[#9CA39D]">{p.planName}</td>
                  <td className="py-3.5 px-6 font-bold text-[#F4F6F3]">₹{p.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-6 text-[#9CA39D]">{p.date}</td>
                  <td className="py-3.5 px-6 text-[#9CA39D]">{p.method}</td>
                  <td className="py-3.5 px-6">
                    <Badge variant={p.status === 'Paid' ? 'paid' : p.status === 'Pending' ? 'pending' : 'failed'} size="sm">
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => setReceiptModal(p)}
                      className="text-xs text-[#B7FF3C] hover:underline font-semibold"
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      <Modal isOpen={recordModal} onClose={() => setRecordModal(false)} title="RECORD NEW PAYMENT">
        <form onSubmit={handleRecord} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Select Member *</label>
            <select
              required
              value={memberId}
              onChange={e => setMemberId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            >
              <option value="">-- Choose Member --</option>
              {members.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.mobile})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Amount (₹) *</label>
              <input
                type="number"
                required
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Payment Method</label>
              <select
                value={method}
                onChange={e => setMethod(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
              >
                <option value="UPI">UPI (GPay / PhonePe)</option>
                <option value="Card">Credit / Debit Card</option>
                <option value="Cash">In-Studio Cash</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9CA39D] uppercase mb-1">Description / Plan Name</label>
            <input
              type="text"
              value={planName}
              onChange={e => setPlanName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#181C1C] border border-white/10 text-[#F4F6F3] text-sm focus:outline-none focus:border-[#B7FF3C]"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" className="w-full">
              GENERATE RECEIPT & RECORD
            </Button>
          </div>
        </form>
      </Modal>

      {/* Digital Receipt Modal */}
      {receiptModal && (
        <Modal
          isOpen={true}
          onClose={() => setReceiptModal(null)}
          title="BODY HUB DIGITAL RECEIPT"
          subtitle={`Receipt Reference: ${receiptModal.receiptNumber}`}
        >
          <div className="space-y-6 bg-[#181C1C] p-6 rounded-2xl border border-white/10 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <h4 className="font-extrabold text-sm text-[#B7FF3C] font-display">THE BODY HUB</h4>
                <p className="text-[11px] text-[#9CA39D]">Neelakundilu, Visakhapatnam, AP</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase">
                {receiptModal.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#9CA39D]">Member:</span>
                <span className="text-[#F4F6F3] font-bold">{receiptModal.memberName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA39D]">Date:</span>
                <span className="text-[#F4F6F3]">{receiptModal.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA39D]">Payment Mode:</span>
                <span className="text-[#F4F6F3] font-semibold">{receiptModal.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA39D]">Service Item:</span>
                <span className="text-[#F4F6F3]">{receiptModal.planName}</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-between items-baseline">
              <span className="text-sm font-bold text-[#F4F6F3]">Total Amount Paid:</span>
              <span className="text-2xl font-black text-[#B7FF3C]">
                ₹{receiptModal.amount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="pt-2">
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs"
                onClick={() => {
                  window.print();
                }}
              >
                PRINT / SAVE AS PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
