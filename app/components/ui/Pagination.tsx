'use client';

import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, totalPages, onChange, className = '' }: PaginationProps) {
  const pages: (number | '...')[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  const btnBase = 'inline-flex items-center justify-center w-8 h-8 text-[13px] rounded-lg font-medium transition-colors cursor-pointer';
  const chevron = (d: 'left' | 'right') => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points={d === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
    </svg>
  );

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${btnBase} border border-[#e4e4e7] text-[#52525b] hover:bg-[#f4f4f5] disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        {chevron('left')}
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-[#a1a1aa] text-[13px]">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            aria-current={p === page ? 'page' : undefined}
            className={`${btnBase} ${p === page ? 'bg-[#1b3a5c] text-white' : 'text-[#52525b] hover:bg-[#f4f4f5] border border-[#e4e4e7]'}`}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={`${btnBase} border border-[#e4e4e7] text-[#52525b] hover:bg-[#f4f4f5] disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        {chevron('right')}
      </button>
    </div>
  );
}
