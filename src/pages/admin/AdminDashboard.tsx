import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserCheck, 
  Clock, 
  IndianRupee, 
  UserPlus, 
  CalendarPlus, 
  CreditCard, 
  MessageSquare,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { memberService, membershipService, paymentService, feedbackService } from '../../services/store.ts';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState(memberService.getAll());
  const [memberships, setMemberships] = useState(membershipService.getAll());
  const [payments, setPayments] = useState(paymentService.getAll());

  useEffect(() => {
    const handleUpdate = () => {
      setMembers(memberService.getAll());
      setMemberships(membershipService.getAll());
      setPayments(paymentService.getAll());
    };
    window.addEventListener('bodyhub_storage_updated', handleUpdate);
    return () => window.removeEventListener('bodyhub_storage_updated', handleUpdate);
  }, []);

  const totalMembersCount = 428; // Standard demo metric specified in Section 24
  const activeMembersCount = 361;
  const expiringMembersCount = 24;
  const totalRevenueDisplay = '₹2.84L';

  // Recent members for table
  const recentMembers = members.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
            Good morning, Admin 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
            Here's what's happening at Body Hub today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/members/new">
            <Button variant="primary" size="sm" leftIcon={<UserPlus className="w-4 h-4" />}>
              Add Member
            </Button>
          </Link>
          <Link to="/admin/events">
            <Button variant="secondary" size="sm" leftIcon={<CalendarPlus className="w-4 h-4" />}>
              Create Event
            </Button>
          </Link>
        </div>
      </div>

      {/* 24. PRIMARY KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          label="TOTAL MEMBERS"
          value={totalMembersCount}
          subtext="Verified athlete roster"
          change="+12 this month"
          changePositive={true}
          icon={<Users className="w-5 h-5 text-[#B7FF3C]" />}
        />
        <StatCard
          label="ACTIVE MEMBERS"
          value={activeMembersCount}
          subtext="84.3% regular check-in rate"
          change="91% retention"
          changePositive={true}
          icon={<UserCheck className="w-5 h-5 text-emerald-400" />}
        />
        <StatCard
          label="EXPIRING SOON"
          value={expiringMembersCount}
          subtext="Within next 7-14 days"
          change="Action required"
          changePositive={false}
          icon={<Clock className="w-5 h-5 text-amber-400" />}
        />
        <StatCard
          label="REVENUE (THIS MONTH)"
          value={totalRevenueDisplay}
          subtext="UPI & In-studio collections"
          change="+18.4% vs last mo"
          changePositive={true}
          icon={<IndianRupee className="w-5 h-5 text-[#B7FF3C]" />}
          accent={true}
        />
      </div>

      {/* 26. QUICK ACTIONS */}
      <div>
        <h3 className="text-xs uppercase tracking-wider font-bold text-[#9CA39D] mb-3">
          QUICK MANAGEMENT ACTIONS
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/admin/members/new"
            className="p-5 bg-[#111414] border border-white/10 hover:border-[#B7FF3C]/50 rounded-2xl flex flex-col justify-between group transition-all"
          >
            <div className="p-3 bg-[#181C1C] rounded-xl w-fit text-[#B7FF3C] group-hover:bg-[#B7FF3C] group-hover:text-[#080A0A] transition-colors">
              <UserPlus className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-[#F4F6F3]">Add Member</p>
              <p className="text-[11px] text-[#9CA39D] mt-0.5">Generate mobile login</p>
            </div>
          </Link>

          <Link
            to="/admin/events"
            className="p-5 bg-[#111414] border border-white/10 hover:border-[#B7FF3C]/50 rounded-2xl flex flex-col justify-between group transition-all"
          >
            <div className="p-3 bg-[#181C1C] rounded-xl w-fit text-[#B7FF3C] group-hover:bg-[#B7FF3C] group-hover:text-[#080A0A] transition-colors">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-[#F4F6F3]">Create Event</p>
              <p className="text-[11px] text-[#9CA39D] mt-0.5">Seminars & challenges</p>
            </div>
          </Link>

          <Link
            to="/admin/payments"
            className="p-5 bg-[#111414] border border-white/10 hover:border-[#B7FF3C]/50 rounded-2xl flex flex-col justify-between group transition-all"
          >
            <div className="p-3 bg-[#181C1C] rounded-xl w-fit text-[#B7FF3C] group-hover:bg-[#B7FF3C] group-hover:text-[#080A0A] transition-colors">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-[#F4F6F3]">Record Payment</p>
              <p className="text-[11px] text-[#9CA39D] mt-0.5">Issue digital receipt</p>
            </div>
          </Link>

          <Link
            to="/admin/feedback"
            className="p-5 bg-[#111414] border border-white/10 hover:border-[#B7FF3C]/50 rounded-2xl flex flex-col justify-between group transition-all"
          >
            <div className="p-3 bg-[#181C1C] rounded-xl w-fit text-[#B7FF3C] group-hover:bg-[#B7FF3C] group-hover:text-[#080A0A] transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-[#F4F6F3]">View Feedback</p>
              <p className="text-[11px] text-[#9CA39D] mt-0.5">Average 5.0 rating</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Membership Overview Progress Bar */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#F4F6F3] font-display">Membership Overview</h3>
            <p className="text-xs text-[#9CA39D]">Live status across active subscriptions</p>
          </div>
          <Link to="/admin/memberships" className="text-xs text-[#B7FF3C] hover:underline font-semibold">
            Manage Renewals →
          </Link>
        </div>

        {/* Visual Clean Progress Bar */}
        <div className="w-full h-3 bg-[#181C1C] rounded-full overflow-hidden flex">
          <div style={{ width: '84%' }} className="bg-[#B7FF3C] h-full" title="Active: 84%" />
          <div style={{ width: '6%' }} className="bg-amber-400 h-full" title="Expiring: 6%" />
          <div style={{ width: '10%' }} className="bg-rose-500 h-full" title="Expired: 10%" />
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B7FF3C]" />
            <span className="text-[#F4F6F3]">Active: 361 (84%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-[#F4F6F3]">Expiring Soon: 24 (6%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-[#F4F6F3]">Expired: 43 (10%)</span>
          </div>
        </div>
      </div>

      {/* 25. RECENT MEMBERS TABLE */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#F4F6F3] font-display">Recent Members</h3>
            <p className="text-xs text-[#9CA39D]">Latest athletes onboarded at Body Hub</p>
          </div>
          <Link to="/admin/members">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              VIEW ALL MEMBERS
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181C1C] text-[#9CA39D] uppercase tracking-wider font-semibold border-b border-white/5">
              <tr>
                <th className="py-3 px-6">Member</th>
                <th className="py-3 px-6">Mobile / Username</th>
                <th className="py-3 px-6">Membership</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Joined Date</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentMembers.map(member => {
                const membership = memberships.find(m => m.memberId === member.id);
                const status = membership ? membership.status : 'Active';

                return (
                  <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-[#F4F6F3]">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#202525] border border-white/10 flex items-center justify-center font-bold text-[#B7FF3C] text-[10px]">
                          {member.name.charAt(0)}
                        </div>
                        <span>{member.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 font-mono text-[#9CA39D]">
                      {member.mobile}
                    </td>
                    <td className="py-3.5 px-6 text-[#F4F6F3]">
                      {membership ? `${membership.plan} Plan` : 'Monthly'}
                    </td>
                    <td className="py-3.5 px-6">
                      <Badge 
                        variant={status === 'Active' ? 'active' : status === 'Expiring' ? 'expiring' : 'expired'}
                        size="sm"
                      >
                        {status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-6 text-[#9CA39D]">
                      {member.createdAt.split('T')[0]}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <Link to={`/admin/members/${member.id}`}>
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
    </div>
  );
};
