import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const positionClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export function Tooltip({ content, children, position = 'top', className = '' }: TooltipProps) {
  return (
    <div className={`relative inline-flex group ${className}`}>
      {children}
      <div className={`absolute ${positionClasses[position]} z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap`}>
        <div className="bg-[#18181b] text-white text-[11px] font-medium px-2.5 py-1.5 rounded-lg shadow-lg">
          {content}
        </div>
      </div>
    </div>
  );
}
