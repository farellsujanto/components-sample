'use client';

import React, { useId } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({ label, hint, error, leftIcon, rightIcon, id, className = '', ...props }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-[13px] font-medium text-[#18181b]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-[#a1a1aa] flex items-center">{leftIcon}</span>
        )}
        <input
          id={inputId}
          {...props}
          className={`w-full border rounded-lg bg-white text-[13px] text-[#18181b] placeholder-[#a1a1aa] transition-colors outline-none
            focus:ring-2 focus:ring-[#1b3a5c]/20 focus:border-[#1b3a5c]
            disabled:bg-[#f4f4f5] disabled:cursor-not-allowed disabled:text-[#a1a1aa]
            ${error ? 'border-[#dc2626] focus:ring-[#dc2626]/20 focus:border-[#dc2626]' : 'border-[#e4e4e7]'}
            ${leftIcon ? 'pl-9' : 'pl-3'} ${rightIcon ? 'pr-9' : 'pr-3'} py-2
            ${className}`}
        />
        {rightIcon && (
          <span className="absolute right-3 text-[#a1a1aa] flex items-center">{rightIcon}</span>
        )}
      </div>
      {error && <p className="text-[12px] text-[#dc2626]">{error}</p>}
      {!error && hint && <p className="text-[12px] text-[#a1a1aa]">{hint}</p>}
    </div>
  );
}
