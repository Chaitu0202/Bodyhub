import React from 'react';
import { Button } from './Button.tsx';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-[#111414] border border-white/5 border-dashed my-4">
      {icon && (
        <div className="p-4 mb-4 rounded-full bg-[#181C1C] border border-white/10 text-[#9CA39D]">
          {icon}
        </div>
      )}
      <h3 className="text-base font-bold text-[#F4F6F3] mb-1 font-display">{title}</h3>
      <p className="text-sm text-[#9CA39D] max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
