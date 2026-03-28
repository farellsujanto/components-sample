'use client';

import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  hint?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export function Toggle({ checked, onChange, label, hint, disabled = false, size = 'md' }: ToggleProps) {
  const trackW = size === 'sm' ? 'w-8' : 'w-10';
  const trackH = size === 'sm' ? 'h-4' : 'h-5';
  const thumbS = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const thumbOn = size === 'sm' ? 'translate-x-4' : 'translate-x-5';

  return (
    <label className={`flex items-start gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`${trackW} ${trackH} rounded-full transition-colors ${checked ? 'bg-[#1b3a5c]' : 'bg-[#e4e4e7]'}`}
        />
        <div
          className={`absolute top-0.5 left-0.5 ${thumbS} rounded-full bg-white shadow-sm transition-transform ${checked ? thumbOn : 'translate-x-0'}`}
        />
      </div>
      {(label || hint) && (
        <div>
          {label && <p className="text-[13px] font-medium text-[#18181b] leading-tight">{label}</p>}
          {hint && <p className="text-[12px] text-[#a1a1aa] mt-0.5">{hint}</p>}
        </div>
      )}
    </label>
  );
}
