import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showTagline = false,
  size = 'md',
  to = '/'
}) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 36 : 28;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  const content = (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Precision Geometric Monogram Icon */}
      <div 
        style={{ width: iconSize, height: iconSize }}
        className="relative flex items-center justify-center bg-[#181C1C] border border-white/10 rounded-lg overflow-hidden group-hover:border-[#B7FF3C]/50 transition-colors shadow-sm"
      >
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6"
        >
          {/* Stylized B & H Hexagonal Power Plate */}
          <path 
            d="M6 8L16 3L26 8V24L16 29L6 24V8Z" 
            stroke="#F4F6F3" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="opacity-40"
          />
          <path 
            d="M10 11V21M10 16H22M22 11V21" 
            stroke="#B7FF3C" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <circle cx="16" cy="16" r="2" fill="#B7FF3C" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-wider font-display text-[#F4F6F3] ${textSize}`}>
            BODY<span className="text-[#B7FF3C]">HUB</span>
          </span>
        </div>
        {showTagline && (
          <span className="text-[9px] tracking-[0.2em] font-semibold text-[#9CA39D] uppercase -mt-0.5">
            Fitness • Performance • Community
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B7FF3C] rounded-md">
        {content}
      </Link>
    );
  }

  return content;
};
