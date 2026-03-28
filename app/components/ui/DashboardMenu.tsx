'use client';

import React from 'react';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  href?: string;
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

interface DashboardMenuProps {
  sections: MenuSection[];
  activeId?: string;
  onSelect?: (id: string) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function DashboardMenu({ sections, activeId, onSelect, header, footer, className = '' }: DashboardMenuProps) {
  return (
    <aside className={`flex flex-col bg-white border-r border-[#e4e4e7] h-full ${className}`}>
      {header && <div className="px-4 py-4 border-b border-[#e4e4e7]">{header}</div>}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {sections.map((section, si) => (
          <div key={si}>
            {section.title && (
              <p className="px-2 mb-1 text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider">{section.title}</p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onSelect?.(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer
                        ${isActive
                          ? 'bg-[#e8edf3] text-[#1b3a5c] border-l-2 border-[#1b3a5c] rounded-l-none pl-[10px]'
                          : 'text-[#52525b] hover:bg-[#fafafa] hover:text-[#18181b] border-l-2 border-transparent rounded-l-none pl-[10px]'
                        }`}
                    >
                      {item.icon && (
                        <span className={`flex-shrink-0 w-4 h-4 flex items-center justify-center ${isActive ? 'text-[#1b3a5c]' : 'text-[#a1a1aa]'}`}>
                          {item.icon}
                        </span>
                      )}
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {item.badge !== undefined && (
                        <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#1b3a5c] text-white' : 'bg-[#f4f4f5] text-[#52525b]'}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      {footer && <div className="px-4 py-3 border-t border-[#e4e4e7]">{footer}</div>}
    </aside>
  );
}
