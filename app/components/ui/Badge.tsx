import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const styles: Record<BadgeVariant, string> = {
  default: 'bg-[#f4f4f5] text-[#52525b]',
  success: 'bg-[#f0fdf4] text-[#16a34a]',
  warning: 'bg-[#fffbeb] text-[#d97706]',
  error:   'bg-[#fef2f2] text-[#dc2626]',
  info:    'bg-[#eff6ff] text-[#2563eb]',
  purple:  'bg-[#faf5ff] text-[#9333ea]',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-semibold rounded-full ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
