import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 flex-wrap ${className}`}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <svg className="w-3 h-3 text-[#a1a1aa]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
          {item.href && i < items.length - 1 ? (
            <a href={item.href} className="text-[12px] text-[#1b3a5c] hover:text-[#16324f] transition-colors">
              {item.label}
            </a>
          ) : (
            <span className={`text-[12px] ${i === items.length - 1 ? 'text-[#18181b] font-medium' : 'text-[#52525b]'}`}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
