import React from 'react';

interface IslandProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  /** Pass actions to the header row (rendered right-aligned) */
  actions?: React.ReactNode;
}

/**
 * Island — the standard card/section container used throughout the design system.
 * Intentionally does NOT use overflow-hidden so absolutely-positioned children
 * (Dropdown menus, Tooltips) can escape the container boundaries.
 */
export function Island({ title, description, actions, children, className = '' }: IslandProps) {
  return (
    <div className={`bg-white border border-[#e4e4e7] rounded-2xl ${className}`}>
      {(title || description || actions) && (
        <div className="flex items-start justify-between px-5 pt-4 pb-3 border-b border-[#f4f4f5] rounded-t-2xl">
          <div>
            <p className="text-[14px] font-bold text-[#18181b]">{title}</p>
            {description && <p className="text-[12px] text-[#a1a1aa] mt-0.5">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 ml-4 flex-shrink-0">{actions}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
