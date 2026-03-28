'use client';

import React, { useState } from 'react';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  onChange,
  label,
  showValue = true,
  disabled = false,
}: SliderProps) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  const pct = ((current - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setInternal(v);
    onChange?.(v);
  };

  return (
    <div className="flex flex-col gap-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-[13px] font-medium text-[#18181b]">{label}</span>}
          {showValue && <span className="text-[12px] font-semibold text-[#1b3a5c] tabular-nums">{current}</span>}
        </div>
      )}
      <div className="relative flex items-center h-5">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-[#e4e4e7]">
          <div className="h-full rounded-full bg-[#1b3a5c] transition-all" style={{ width: `${pct}%` }} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={current}
          disabled={disabled}
          onChange={handleChange}
          aria-label={label ?? 'Slider'}
          className="absolute inset-0 w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          style={{ WebkitAppearance: 'none' }}
        />
        <div
          className="absolute w-4 h-4 rounded-full bg-white border-2 border-[#1b3a5c] shadow-sm transition-all pointer-events-none"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-[#a1a1aa]">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
