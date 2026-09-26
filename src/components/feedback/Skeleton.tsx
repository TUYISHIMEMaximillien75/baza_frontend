import React from 'react';
import { clsx } from 'clsx';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, variant = 'rectangular' }) => {
  const variants = {
    text:        'h-4 w-full rounded',
    rectangular: 'w-full h-32 rounded-baza-lg',
    circular:    'w-10 h-10 rounded-full flex-shrink-0',
  };

  return (
    <div
      className={clsx('skeleton-shimmer', variants[variant], className)}
    />
  );
};
