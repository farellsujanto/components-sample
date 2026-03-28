import React from 'react';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
type StatusType = 'online' | 'offline' | 'away' | 'busy';

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  status?: StatusType;
  color?: string;
  className?: string;
}

const sizeMap: Record<AvatarSize, { container: string; text: string; dot: string }> = {
  sm: { container: 'w-7 h-7', text: 'text-[11px]', dot: 'w-2 h-2 border' },
  md: { container: 'w-9 h-9', text: 'text-[13px]', dot: 'w-2.5 h-2.5 border' },
  lg: { container: 'w-12 h-12', text: 'text-[15px]', dot: 'w-3 h-3 border-2' },
  xl: { container: 'w-16 h-16', text: 'text-[18px]', dot: 'w-3.5 h-3.5 border-2' },
};

const statusColors: Record<StatusType, string> = {
  online: 'bg-[#16a34a]',
  offline: 'bg-[#a1a1aa]',
  away: 'bg-[#d97706]',
  busy: 'bg-[#dc2626]',
};

const defaultColors = [
  'bg-[#1b3a5c]', 'bg-[#0ea5e9]', 'bg-[#14b8a6]', 'bg-[#f59e0b]',
  'bg-[#ec4899]', 'bg-[#8b5cf6]', 'bg-[#10b981]', 'bg-[#f97316]',
];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

function getColor(name: string) {
  const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return defaultColors[sum % defaultColors.length];
}

export function Avatar({ name, size = 'md', status, color, className = '' }: AvatarProps) {
  const s = sizeMap[size];
  const bg = color ?? getColor(name);
  return (
    <div className={`relative inline-flex flex-shrink-0 ${className}`}>
      <div className={`${s.container} rounded-full ${bg} flex items-center justify-center`}>
        <span className={`font-semibold text-white ${s.text} leading-none`}>{getInitials(name)}</span>
      </div>
      {status && (
        <span className={`absolute bottom-0 right-0 ${s.dot} rounded-full border-white ${statusColors[status]}`} />
      )}
    </div>
  );
}
