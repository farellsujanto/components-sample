import React from 'react';

type ProgressVariant = 'default' | 'success' | 'warning' | 'error';

interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  variant?: ProgressVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const trackColors: Record<ProgressVariant, string> = {
  default: 'bg-[#1b3a5c]',
  success: 'bg-[#16a34a]',
  warning: 'bg-[#d97706]',
  error: 'bg-[#dc2626]',
};

const heightMap = { sm: 'h-1', md: 'h-2', lg: 'h-3' };

export function Progress({ value, max = 100, label, showPercent = true, variant = 'default', size = 'md', className = '' }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-[13px] font-medium text-[#18181b]">{label}</span>}
          {showPercent && <span className="text-[12px] text-[#52525b] tabular-nums">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={`w-full bg-[#e4e4e7] rounded-full overflow-hidden ${heightMap[size]}`} role="progressbar" aria-valuenow={value} aria-valuemax={max}>
        <div className={`h-full rounded-full transition-all duration-300 ${trackColors[variant]}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
