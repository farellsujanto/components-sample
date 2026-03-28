'use client';

import React, { useState } from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  className?: string;
}

const styles: Record<AlertVariant, { bg: string; border: string; icon: string; title: string; body: string; iconPath: React.ReactNode }> = {
  info: {
    bg: 'bg-[#eff6ff]', border: 'border-[#bfdbfe]', icon: 'text-[#2563eb]', title: 'text-[#1d4ed8]', body: 'text-[#3b82f6]',
    iconPath: <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />,
  },
  success: {
    bg: 'bg-[#f0fdf4]', border: 'border-[#bbf7d0]', icon: 'text-[#16a34a]', title: 'text-[#15803d]', body: 'text-[#22c55e]',
    iconPath: <><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><polyline points="9 12 11 14 15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" /></>,
  },
  warning: {
    bg: 'bg-[#fffbeb]', border: 'border-[#fde68a]', icon: 'text-[#d97706]', title: 'text-[#b45309]', body: 'text-[#f59e0b]',
    iconPath: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" fill="none" /><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  },
  error: {
    bg: 'bg-[#fef2f2]', border: 'border-[#fecaca]', icon: 'text-[#dc2626]', title: 'text-[#b91c1c]', body: 'text-[#ef4444]',
    iconPath: <><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>,
  },
};

export function Alert({ variant = 'info', title, children, dismissible = false, className = '' }: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  const s = styles[variant];
  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${s.bg} ${s.border} ${className}`} role="alert">
      <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${s.icon}`} viewBox="0 0 24 24">{s.iconPath}</svg>
      <div className="flex-1 min-w-0">
        {title && <p className={`text-[13px] font-semibold ${s.title}`}>{title}</p>}
        <p className={`text-[12px] ${title ? 'mt-0.5' : ''} ${s.body}`}>{children}</p>
      </div>
      {dismissible && (
        <button onClick={() => setDismissed(true)} aria-label="Dismiss" className={`flex-shrink-0 ${s.icon} hover:opacity-70 cursor-pointer transition-opacity`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
