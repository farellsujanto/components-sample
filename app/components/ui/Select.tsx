'use client';

import React, { useId } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({ label, hint, error, options, placeholder, id, className = '', ...props }: SelectProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-[13px] font-medium text-[#18181b]">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={inputId}
          {...props}
          className={`w-full appearance-none border rounded-lg bg-white text-[13px] text-[#18181b] transition-colors outline-none
            focus:ring-2 focus:ring-[#1b3a5c]/20 focus:border-[#1b3a5c]
            disabled:bg-[#f4f4f5] disabled:cursor-not-allowed disabled:text-[#a1a1aa]
            px-3 py-2 pr-9
            ${error ? 'border-[#dc2626]' : 'border-[#e4e4e7]'}
            ${className}`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] pointer-events-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      {error && <p className="text-[12px] text-[#dc2626]">{error}</p>}
      {!error && hint && <p className="text-[12px] text-[#a1a1aa]">{hint}</p>}
    </div>
  );
}
