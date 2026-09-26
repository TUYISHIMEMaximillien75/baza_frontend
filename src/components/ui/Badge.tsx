import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'navy' | 'gray' | 'error' | 'warning' | 'info' | 'coral' | 'cyan';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'navy',
  size = 'md',
  icon,
  className,
}) => {
  const variants: Record<string, string> = {
    // Legacy green kept for backward compat — mapped to cyan (verification)
    green: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    // Navy for RENT badges — deep authority
    navy: 'bg-baza-navy/10 text-baza-navy border-baza-navy/25',
    // Coral/orange for SALE badges — warmth from logo
    coral: 'bg-orange-50 text-orange-700 border-orange-200',
    // Cyan for verified / trust signals — from logo teal
    cyan: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    // Neutrals
    gray: 'bg-slate-100 text-baza-text-secondary border-slate-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-0.5 text-xs font-semibold',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-md border font-semibold tracking-wide',
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
