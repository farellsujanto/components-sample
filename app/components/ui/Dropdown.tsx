'use client';

import React, { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({ trigger, items, align = 'right', className = '' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">{trigger}</div>
      {open && (
        <div className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} top-full mt-1.5 w-48 bg-white border border-[#e4e4e7] rounded-xl shadow-lg z-50 py-1 overflow-hidden`}>
          {items.map((item, i) => {
            if (item.divider) {
              return <div key={i} className="my-1 border-t border-[#f4f4f5]" />;
            }
            return (
              <button
                key={i}
                disabled={item.disabled}
                onClick={() => { item.onClick?.(); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-left transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
                  ${item.danger ? 'text-[#dc2626] hover:bg-[#fef2f2]' : 'text-[#18181b] hover:bg-[#fafafa]'}`}
              >
                {item.icon && <span className="flex-shrink-0 w-4 h-4 flex items-center">{item.icon}</span>}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
