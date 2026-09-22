import React, { useState } from 'react';
import { CreditCard, QrCode, Download, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Modal } from '../../components/ui/Modal.tsx';
import { useToast } from '../../components/ui/Toast.tsx';
import { authService, paymentService, membershipService } from '../../services/store.ts';
import { Payment } from '../../types.ts';

export const MemberPaymentsPage: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const payments = currentUser ? paymentService.getByMemberId(currentUser.id) : [];
  const membership = currentUser ? membershipService.getByMemberId(currentUser.id) : null;
  const [renewModal, setRenewModal] = useState(false);
  const [receiptModal, setReceiptModal] = useState<Payment | null>(null);
  const { showToast } = useToast();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
            MEMBERSHIP PAYMENTS & INVOICES
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
            Access past digital receipts and manage subscription renewals.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setRenewModal(true)}
          leftIcon={<CreditCard className="w-4 h-4" />}
        >
          RENEW ONLINE
        </Button>
      </div>

      {/* Subscription Status Card */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">ACTIVE SUBSCRIPTION</span>
          <h3 className="text-xl font-bold text-[#F4F6F3] font-display mt-1">
            {membership?.plan || 'Quarterly'} Athlete Membership
          </h3>
          <p className="text-xs text-[#9CA39D] mt-1">
            Valid until <span className="text-[#B7FF3C] font-semibold">{membership?.expiryDate || 'October 24, 2026'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={membership?.status === 'Active' ? 'active' : 'expiring'}>
            {membership?.status || 'ACTIVE'}
          </Badge>
          <Button variant="secondary" size="sm" onClick={() => setRenewModal(true)}>
            Extend Now
          </Button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#F4F6F3] font-display">Billing History</h3>
          <span className="text-xs text-[#9CA39D]">GST verified e-receipts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181C1C] text-[#9CA39D] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-6">Receipt #</th>
                <th className="py-3.5 px-6">Description</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Method</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-[#9CA39D]">
                    No past receipts found on this demo account.
                  </td>
                </tr>
              ) : (
                payments.map(p => (
                  <tr key={p.id} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-6 font-mono text-[#B7FF3C] font-semibold">{p.receiptNumber}</td>
                    <td className="py-3.5 px-6 font-medium text-[#F4F6F3]">{p.planName}</td>
                    <td className="py-3.5 px-6 font-bold text-[#F4F6F3]">₹{p.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-6 text-[#9CA39D]">{p.date}</td>
                    <td className="py-3.5 px-6 text-[#9CA39D]">{p.method}</td>
                    <td className="py-3.5 px-6">
                      <Badge variant="paid" size="sm">
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Online Renewal Modal */}
      <Modal
        isOpen={renewModal}
        onClose={() => setRenewModal(false)}
        title="RENEW MEMBERSHIP ONLINE"
        subtitle="Quick UPI transfer or cash settlement at Body Hub reception."
      >
        <div className="space-y-4 text-center">
          <div className="p-6 bg-[#181C1C] rounded-2xl border border-white/10 inline-block mx-auto">
            <div className="w-44 h-44 bg-white p-2 rounded-xl mx-auto flex items-center justify-center">
              <QrCode className="w-36 h-36 text-[#080A0A]" />
            </div>
            <p className="text-xs font-mono text-[#F4F6F3] mt-3 font-bold">UPI ID: bodyhub@okaxis</p>
            <p className="text-[11px] text-[#9CA39D]">Scan with GPay / PhonePe / Paytm</p>
          </div>

          <div className="text-xs text-[#9CA39D] space-y-1 text-left bg-[#181C1C] p-4 rounded-xl border border-white/5">
            <p className="font-bold text-[#F4F6F3]">Instructions:</p>
            <p>1. Pay ₹2,500 (Monthly) or ₹6,500 (Quarterly).</p>
            <p>2. Send screenshot to Body Hub desk WhatsApp: +91 891 278 4499.</p>
            <p>3. Your validity and locker key pass will renew instantly.</p>
          </div>

          <Button
            variant="primary"
            size="md"
            className="w-full"
            onClick={() => {
              setRenewModal(false);
              showToast('Renewal Logged', 'Our reception will verify your transaction and notify you!', 'success');
            }}
          >
            I HAVE TRANSFERRED PAYMENT
          </Button>
        </div>
      </Modal>

      {/* Receipt Modal */}
      {receiptModal && (
        <Modal
          isOpen={true}
          onClose={() => setReceiptModal(null)}
          title="RECEIPT DETAILS"
          subtitle={`Receipt: ${receiptModal.receiptNumber}`}
        >
          <div className="space-y-6 bg-[#181C1C] p-6 rounded-2xl border border-white/10 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <h4 className="font-extrabold text-sm text-[#B7FF3C] font-display">THE BODY HUB</h4>
                <p className="text-[11px] text-[#9CA39D]">Visakhapatnam, Andhra Pradesh</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold uppercase">
                PAID & VERIFIED
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#9CA39D]">Member Name:</span>
                <span className="text-[#F4F6F3] font-bold">{receiptModal.memberName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA39D]">Transaction Date:</span>
                <span className="text-[#F4F6F3]">{receiptModal.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA39D]">Payment Method:</span>
                <span className="text-[#F4F6F3]">{receiptModal.method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA39D]">Plan Description:</span>
                <span className="text-[#F4F6F3]">{receiptModal.planName}</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-between items-baseline">
              <span className="text-sm font-bold text-[#F4F6F3]">Amount Paid:</span>
              <span className="text-2xl font-black text-[#B7FF3C]">
                ₹{receiptModal.amount.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="pt-2">
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs"
                onClick={() => window.print()}
              >
                PRINT / SAVE RECEIPT
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
