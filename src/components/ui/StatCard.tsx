import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  change?: string;
  changePositive?: boolean;
  icon?: React.ReactNode;
  accent?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  change,
  changePositive = true,
  icon,
  accent = false
}) => {
  return (
    <div className={`p-6 rounded-2xl border transition-all duration-200 ${
      accent 
        ? 'bg-[#181C1C] border-[#B7FF3C]/30 shadow-sm' 
        : 'bg-[#111414] border-white/10 hover:border-white/20'
    }`}>
      <div className="flex items-center justify-between text-[#9CA39D] mb-3">
        <span className="text-xs uppercase tracking-wider font-semibold">{label}</span>
        {icon && <div className="text-[#9CA39D] p-2 bg-[#181C1C] rounded-lg border border-white/5">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-extrabold text-[#F4F6F3] font-display tracking-tight">
          {value}
        </span>
        {change && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            changePositive 
              ? 'bg-[#B7FF3C]/10 text-[#B7FF3C]' 
              : 'bg-rose-500/10 text-rose-400'
          }`}>
            {change}
          </span>
        )}
      </div>

      {subtext && (
        <p className="text-xs text-[#9CA39D] mt-2 font-medium">
          {subtext}
        </p>
      )}
    </div>
  );
};
