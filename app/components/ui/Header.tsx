import React from 'react';
import { Breadcrumb } from './Breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function Header({ title, subtitle, breadcrumb, actions, className = '' }: HeaderProps) {
  return (
    <div className={`flex items-start justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        {breadcrumb && breadcrumb.length > 0 && (
          <Breadcrumb items={breadcrumb} className="mb-2" />
        )}
        <h1 className="text-[18px] font-semibold text-[#18181b] tracking-tight leading-tight">{title}</h1>
        {subtitle && <p className="text-[13px] text-[#52525b] mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}
