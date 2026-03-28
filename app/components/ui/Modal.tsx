'use client';

import React, { useEffect, useId } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export function Modal({ open, onClose, title, description, children, footer, size = 'md' }: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    // No-op scroll lock on body — the actual scroll container is <main>.
    // We prevent scroll chaining via overscroll-contain on the overlay instead.
    return () => {};
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overscroll-contain">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={`relative w-full ${sizeMap[size]} bg-white rounded-2xl shadow-xl border border-[#e4e4e7] flex flex-col`}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between p-5 border-b border-[#e4e4e7]">
            <div>
              {title && <h2 id={titleId} className="text-[15px] font-semibold text-[#18181b]">{title}</h2>}
              {description && <p className="text-[13px] text-[#52525b] mt-0.5">{description}</p>}
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="ml-4 text-[#a1a1aa] hover:text-[#18181b] transition-colors cursor-pointer flex-shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
        {/* Body */}
        {children && <div className="p-5 flex-1">{children}</div>}
        {/* Footer */}
        {footer && <div className="p-4 border-t border-[#e4e4e7] flex items-center justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}
