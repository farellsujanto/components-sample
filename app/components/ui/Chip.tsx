import React from 'react';

type ChipVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple' | 'indigo';
type ChipSize = 'sm' | 'md';

interface ChipProps {
  variant?: ChipVariant;
  size?: ChipSize;
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<ChipVariant, { bg: string; text: string; dot: string }> = {
  success: { bg: 'bg-[#f0fdf4]', text: 'text-[#16a34a]', dot: 'bg-[#16a34a]' },
  warning: { bg: 'bg-[#fffbeb]', text: 'text-[#d97706]', dot: 'bg-[#d97706]' },
  error:   { bg: 'bg-[#fef2f2]', text: 'text-[#dc2626]', dot: 'bg-[#dc2626]' },
  info:    { bg: 'bg-[#eff6ff]', text: 'text-[#2563eb]', dot: 'bg-[#2563eb]' },
  neutral: { bg: 'bg-[#f4f4f5]', text: 'text-[#52525b]', dot: 'bg-[#a1a1aa]' },
  purple:  { bg: 'bg-[#faf5ff]', text: 'text-[#9333ea]', dot: 'bg-[#9333ea]' },
  indigo:  { bg: 'bg-[#e8edf3]', text: 'text-[#1b3a5c]', dot: 'bg-[#1b3a5c]' },
};

export function Chip({ variant = 'neutral', size = 'md', children, dot = true, className = '' }: ChipProps) {
  const s = variantStyles[variant];
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-[12px]';
  const dotS = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';
  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full ${s.bg} ${s.text} ${padding} ${className}`}>
      {dot && <span className={`rounded-full flex-shrink-0 ${s.dot} ${dotS}`} />}
      {children}
    </span>
  );
}
