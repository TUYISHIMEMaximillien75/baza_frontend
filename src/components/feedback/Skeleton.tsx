import React from 'react';
import { clsx } from 'clsx';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, variant = 'rectangular' }) => {
  const variants = {
    text: 'h-4 w-full rounded',
    rectangular: 'w-full h-32 rounded-baza',
    circular: 'w-10 h-10 rounded-full',
  };

  return (
    <div
      className={clsx('bg-slate-200 animate-pulse', variants[variant], className)}
    />
  );
};
