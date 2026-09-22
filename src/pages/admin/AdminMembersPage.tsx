import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, UserPlus, Filter, ChevronRight, Eye, ShieldAlert, ArrowUpDown, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { memberService, membershipService } from '../../services/store.ts';
import { User, Membership, MembershipStatus } from '../../types.ts';

export const AdminMembersPage: React.FC = () => {
  const [members, setMembers] = useState<User[]>(memberService.getAll());
  const [memberships, setMemberships] = useState<Membership[]>(membershipService.getAll());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'EXPIRING' | 'EXPIRED'>('ALL');
  const navigate = useNavigate();

  useEffect(() => {
    const handleUpdate = () => {
      setMembers(memberService.getAll());
      setMemberships(membershipService.getAll());
    };
    window.addEventListener('bodyhub_storage_updated', handleUpdate);
    return () => window.removeEventListener('bodyhub_storage_updated', handleUpdate);
  }, []);

  const getMembershipForMember = (memberId: string) => {
    return memberships.find(m => m.memberId === memberId);
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.mobile.includes(searchQuery);

    if (!matchesSearch) return false;

    if (statusFilter === 'ALL') return true;

    const membership = getMembershipForMember(member.id);
    const status = membership ? membership.status : 'Active';
    return status.toUpperCase() === statusFilter;
  });

  const exportCSV = () => {
    const headers = 'ID,Name,Mobile,Plan,Status,StartDate,ExpiryDate\n';
    const rows = filteredMembers.map(m => {
      const mb = getMembershipForMember(m.id);
      return `"${m.id}","${m.name}","${m.mobile}","${mb?.plan || 'Monthly'}","${mb?.status || 'Active'}","${mb?.startDate || ''}","${mb?.expiryDate || ''}"`;
    }).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bodyhub_members_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
            MEMBERS
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
            Manage Body Hub members, renewals, and athlete profiles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportCSV}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export CSV
          </Button>
          <Link to="/admin/members/new">
            <Button variant="primary" size="sm" leftIcon={<UserPlus className="w-4 h-4" />}>
              ADD MEMBER
            </Button>
          </Link>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#9CA39D] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name or mobile..."
            className="w-full pl-10 pr-4 py-2 bg-[#181C1C] border border-white/10 rounded-lg text-xs text-[#F4F6F3] placeholder-[#9CA39D] focus:outline-none focus:border-[#B7FF3C]"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {(['ALL', 'ACTIVE', 'EXPIRING', 'EXPIRED'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                statusFilter === tab
                  ? 'bg-[#B7FF3C] text-[#080A0A]'
                  : 'bg-[#181C1C] text-[#9CA39D] hover:text-[#F4F6F3] border border-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-[#111414] border border-white/10 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181C1C] text-[#9CA39D] uppercase tracking-wider font-semibold border-b border-white/5">
              <tr>
                <th className="py-3.5 px-6">Member</th>
                <th className="py-3.5 px-6">Mobile</th>
                <th className="py-3.5 px-6">Membership</th>
                <th className="py-3.5 px-6">Start Date</th>
                <th className="py-3.5 px-6">Expiry</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-[#9CA39D]">
                    No members match the current filter or search criteria.
                  </td>
                </tr>
              ) : (
                filteredMembers.map(member => {
                  const mb = getMembershipForMember(member.id);
                  const status = mb ? mb.status : 'Active';

                  return (
                    <tr 
                      key={member.id} 
                      className="hover:bg-white/[0.02] cursor-pointer transition-colors"
                      onClick={() => navigate(`/admin/members/${member.id}`)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#181C1C] border border-white/10 flex items-center justify-center font-bold text-[#B7FF3C] text-xs">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-[#F4F6F3] hover:text-[#B7FF3C] transition-colors">{member.name}</p>
                            <p className="text-[11px] text-[#9CA39D]">{member.email || 'No email registered'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-[#F4F6F3]">
                        {member.mobile}
                      </td>
                      <td className="py-4 px-6 text-[#F4F6F3] font-medium">
                        {mb ? `${mb.plan} Plan` : 'Monthly Plan'}
                      </td>
                      <td className="py-4 px-6 text-[#9CA39D]">
                        {mb ? mb.startDate : member.createdAt.split('T')[0]}
                      </td>
                      <td className="py-4 px-6 text-[#F4F6F3] font-semibold">
                        {mb ? mb.expiryDate : '—'}
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          variant={status === 'Active' ? 'active' : status === 'Expiring' ? 'expiring' : 'expired'}
                          size="sm"
                        >
                          {status}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                          <Link to={`/admin/members/${member.id}`}>
                            <Button variant="ghost" size="sm" className="text-xs text-[#B7FF3C]">
                              View
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
