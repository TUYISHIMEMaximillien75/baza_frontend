import React from 'react';
import { clsx } from 'clsx';

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

  const imageSrc = src || '/profile.png';

  return (
    <div
      className={clsx(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden flex-shrink-0',
        'border-2 border-white shadow-md bg-slate-100',
        sizes[size],
        className,
      )}
    >
      <img
        src={imageSrc}
        alt={name || 'User profile'}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/profile.png';
        }}
      />
    </div>
  );
};
