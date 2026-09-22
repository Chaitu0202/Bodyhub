import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'active' | 'expiring' | 'expired' | 'paid' | 'pending' | 'failed' | 'neutral' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] tracking-wider uppercase font-bold",
    md: "px-2.5 py-1 text-xs font-semibold"
  };

  const variantClasses = {
    active: "bg-[#B7FF3C]/10 text-[#B7FF3C] border border-[#B7FF3C]/20",
    expiring: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    expired: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    paid: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    failed: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
    accent: "bg-[#B7FF3C] text-[#080A0A] font-bold",
    neutral: "bg-[#181C1C] text-[#9CA39D] border border-white/10"
  };

  return (
    <span className={`inline-flex items-center rounded-full ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
