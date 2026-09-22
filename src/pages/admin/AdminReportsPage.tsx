import React from 'react';
import { TrendingUp, Users, DollarSign, Calendar, Star, Download, BarChart3, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button.tsx';

export const AdminReportsPage: React.FC = () => {
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const revenues = [210, 235, 250, 265, 272, 284]; // in thousands
  const growth = [320, 345, 370, 395, 412, 428];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F3] font-display">
            ANALYTICS & BUSINESS INTELLIGENCE
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA39D] mt-1">
            Performance indicators across member acquisition, recurring revenue, and retention.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => window.print()}
          leftIcon={<Download className="w-4 h-4" />}
        >
          EXPORT EXECUTIVE REPORT
        </Button>
      </div>

      {/* 34. REPORT PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* REVENUE RUN-RATE */}
        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">MONTHLY COLLECTIONS</span>
              <h3 className="text-xl font-bold text-[#F4F6F3] font-display mt-0.5">Revenue Growth (₹ Lakhs)</h3>
            </div>
            <span className="text-xs font-bold text-[#B7FF3C] bg-[#B7FF3C]/10 px-3 py-1 rounded-full">
              +35.2% 6-Mo Trend
            </span>
          </div>

          {/* Simple Visual Bar Chart */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-white/5 pb-2">
            {revenues.map((val, idx) => {
              const heightPercent = (val / 300) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-mono text-[#9CA39D]">₹{val / 100}L</span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-[#181C1C] hover:bg-[#B7FF3C] rounded-t-lg transition-colors border-t border-x border-white/10"
                  />
                  <span className="text-[10px] font-bold text-[#9CA39D] uppercase">{months[idx]}</span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-[#181C1C] p-3 rounded-xl">
              <span className="text-[#9CA39D]">Average Revenue Per Member:</span>
              <p className="text-base font-bold text-[#F4F6F3] mt-1">₹2,840 / mo</p>
            </div>
            <div className="bg-[#181C1C] p-3 rounded-xl">
              <span className="text-[#9CA39D]">Highest Plan Tier:</span>
              <p className="text-base font-bold text-[#B7FF3C] mt-1">Quarterly (58%)</p>
            </div>
          </div>
        </div>

        {/* ACTIVE ATHLETE EXPANSION */}
        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#9CA39D] uppercase tracking-wider">MEMBER GROWTH</span>
              <h3 className="text-xl font-bold text-[#F4F6F3] font-display mt-0.5">Total Athlete Roster</h3>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
              428 Total
            </span>
          </div>

          {/* Simple Visual Bar Chart */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-white/5 pb-2">
            {growth.map((val, idx) => {
              const heightPercent = (val / 450) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[10px] font-mono text-[#9CA39D]">{val}</span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-[#181C1C] hover:bg-emerald-400 rounded-t-lg transition-colors border-t border-x border-white/10"
                  />
                  <span className="text-[10px] font-bold text-[#9CA39D] uppercase">{months[idx]}</span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-[#181C1C] p-3 rounded-xl">
              <span className="text-[#9CA39D]">Net New Monthly Signups:</span>
              <p className="text-base font-bold text-[#F4F6F3] mt-1">+16 Athletes</p>
            </div>
            <div className="bg-[#181C1C] p-3 rounded-xl">
              <span className="text-[#9CA39D]">Renewal Conversion:</span>
              <p className="text-base font-bold text-emerald-400 mt-1">91.4% Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 space-y-4">
          <h4 className="text-sm font-bold text-[#F4F6F3] uppercase tracking-wider">Plan Distribution</h4>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#9CA39D]">Quarterly Plan (90 Days)</span>
                <span className="text-[#F4F6F3] font-bold">58%</span>
              </div>
              <div className="w-full h-2 bg-[#181C1C] rounded-full overflow-hidden">
                <div className="bg-[#B7FF3C] h-full w-[58%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#9CA39D]">Monthly Plan (30 Days)</span>
                <span className="text-[#F4F6F3] font-bold">28%</span>
              </div>
              <div className="w-full h-2 bg-[#181C1C] rounded-full overflow-hidden">
                <div className="bg-sky-400 h-full w-[28%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[#9CA39D]">Yearly Transformation (365 Days)</span>
                <span className="text-[#F4F6F3] font-bold">14%</span>
              </div>
              <div className="w-full h-2 bg-[#181C1C] rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[14%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 space-y-4">
          <h4 className="text-sm font-bold text-[#F4F6F3] uppercase tracking-wider">Attendance Demographics</h4>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-[#9CA39D]">Morning Peak Slot (6 AM – 9 AM):</span>
              <span className="text-[#F4F6F3] font-bold">42% occupancy</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-[#9CA39D]">Evening Peak Slot (5 PM – 9 PM):</span>
              <span className="text-[#B7FF3C] font-bold">48% occupancy</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#9CA39D]">Mid-Day Low Tide (11 AM – 4 PM):</span>
              <span className="text-[#9CA39D]">10% occupancy</span>
            </div>
          </div>
        </div>

        <div className="bg-[#111414] border border-white/10 rounded-2xl p-6 space-y-4">
          <h4 className="text-sm font-bold text-[#F4F6F3] uppercase tracking-wider">Payment Mode Share</h4>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-[#9CA39D]">UPI (PhonePe, GPay, QR):</span>
              <span className="text-[#B7FF3C] font-bold">78%</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-[#9CA39D]">Credit / Debit Card:</span>
              <span className="text-[#F4F6F3] font-bold">16%</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#9CA39D]">In-Studio Cash:</span>
              <span className="text-[#9CA39D]">6%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
