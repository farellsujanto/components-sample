'use client';

import React from 'react';

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ items, activeId, onChange, className = '' }: TabsProps) {
  return (
    <div className={`flex items-center gap-0 border-b border-[#e4e4e7] ${className}`}>
      {items.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors cursor-pointer -mb-px
              ${isActive
                ? 'border-[#1b3a5c] text-[#1b3a5c]'
                : 'border-transparent text-[#52525b] hover:text-[#18181b] hover:border-[#e4e4e7]'
              }`}
          >
            {tab.icon && <span className="w-4 h-4 flex items-center">{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ml-0.5 ${isActive ? 'bg-[#e8edf3] text-[#1b3a5c]' : 'bg-[#f4f4f5] text-[#52525b]'}`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
