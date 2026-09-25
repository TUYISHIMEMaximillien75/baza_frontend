import React from 'react';
import { clsx } from 'clsx';
import { User as UserIcon } from 'lucide-react';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md', className }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : null;

  return (
    <div
      className={clsx(
        'relative inline-flex items-center justify-center rounded-full bg-slate-200 text-baza-navy font-bold overflow-hidden border border-baza-border flex-shrink-0',
        sizes[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt={name || 'User avatar'} className="w-full h-full object-cover" />
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        <UserIcon className="w-1/2 h-1/2 text-baza-text-secondary" />
      )}
    </div>
  );
};
