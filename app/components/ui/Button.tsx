'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#1b3a5c] text-white hover:bg-[#16324f] border border-transparent',
  secondary: 'bg-[#e8edf3] text-[#1b3a5c] hover:bg-[#d4dde8] border border-transparent',
  ghost: 'bg-transparent text-[#52525b] hover:bg-[#f4f4f5] border border-transparent',
  destructive: 'bg-[#dc2626] text-white hover:bg-[#b91c1c] border border-transparent',
  outline: 'bg-white text-[#1b3a5c] hover:bg-[#e8edf3] border border-[#1b3a5c]/30',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[12px] gap-1.5',
  md: 'px-4 py-2 text-[13px] gap-2',
  lg: 'px-5 py-2.5 text-[14px] gap-2',
};

function Spinner({ size }: { size: ButtonSize }) {
  const s = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className="animate-spin">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading && <Spinner size={size} />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
}

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: 'ghost' | 'outline' | 'primary';
  'aria-label': string;
}

export function IconButton({ size = 'md', variant = 'ghost', children, className = '', ...props }: IconButtonProps) {
  const pad = size === 'sm' ? 'p-1.5' : size === 'lg' ? 'p-2.5' : 'p-2';
  const v = variantClasses[variant];
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${v} ${pad} ${className}`}
    >
      {children}
    </button>
  );
}
