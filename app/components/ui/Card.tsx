import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-[#e4e4e7] rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, actions, children, className = '' }: CardHeaderProps) {
  return (
    <div className={`flex items-start justify-between px-5 py-4 border-b border-[#f4f4f5] ${className}`}>
      <div className="min-w-0">
        {title && <p className="text-[14px] font-semibold text-[#18181b]">{title}</p>}
        {subtitle && <p className="text-[12px] text-[#a1a1aa] mt-0.5">{subtitle}</p>}
        {children}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0 ml-4">{actions}</div>}
    </div>
  );
}

export function CardBody({ children, className = '' }: CardProps) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`px-5 py-3 border-t border-[#f4f4f5] bg-[#fafafa] ${className}`}>
      {children}
    </div>
  );
}
