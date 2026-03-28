'use client';

import React, { useId } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Textarea({ label, hint, error, id, className = '', ...props }: TextareaProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-[13px] font-medium text-[#18181b]">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        {...props}
        className={`w-full border rounded-lg bg-white text-[13px] text-[#18181b] placeholder-[#a1a1aa] transition-colors outline-none resize-y min-h-[80px]
          focus:ring-2 focus:ring-[#1b3a5c]/20 focus:border-[#1b3a5c]
          disabled:bg-[#f4f4f5] disabled:cursor-not-allowed disabled:text-[#a1a1aa]
          px-3 py-2
          ${error ? 'border-[#dc2626] focus:ring-[#dc2626]/20 focus:border-[#dc2626]' : 'border-[#e4e4e7]'}
          ${className}`}
      />
      {error && <p className="text-[12px] text-[#dc2626]">{error}</p>}
      {!error && hint && <p className="text-[12px] text-[#a1a1aa]">{hint}</p>}
    </div>
  );
}
