import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  className?: string;
}

const sizePx: Record<SpinnerSize, number> = { sm: 14, md: 20, lg: 28, xl: 40 };
const strokeW: Record<SpinnerSize, number> = { sm: 2.5, md: 2.5, lg: 2.5, xl: 3 };

export function Spinner({ size = 'md', color = '#1b3a5c', className = '' }: SpinnerProps) {
  const s = sizePx[size];
  const sw = strokeW[size];
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`} aria-label="Loading">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth={sw} strokeOpacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={color} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
}
