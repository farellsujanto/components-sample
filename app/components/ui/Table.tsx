import React from 'react';

export function Table({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`w-full overflow-x-auto rounded-2xl border border-[#e4e4e7] ${className}`}>
      <table className="w-full min-w-full text-[13px]">{children}</table>
    </div>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className="bg-[#fafafa] border-b border-[#e4e4e7]">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-[#f4f4f5]">{children}</tbody>;
}

export function TableRow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <tr className={`hover:bg-[#fafafa] transition-colors ${className}`}>{children}</tr>;
}

export function TableTh({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-4 py-3 text-left text-[11px] font-semibold text-[#a1a1aa] uppercase tracking-wider ${className}`}>
      {children}
    </th>
  );
}

export function TableTd({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 text-[#18181b] ${className}`}>{children}</td>;
}
