import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'navy' | 'gray' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'green',
  size = 'md',
  icon,
  className,
}) => {
  const variants = {
    green: 'bg-baza-green-light text-baza-green-dark border-baza-green/20',
    navy: 'bg-sky-100 text-baza-navy border-sky-200',
    gray: 'bg-slate-100 text-baza-text-secondary border-slate-200',
    error: 'bg-red-50 text-baza-error border-red-200',
    warning: 'bg-amber-50 text-baza-warning border-amber-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-semibold',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border font-medium tracking-wide',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
};
