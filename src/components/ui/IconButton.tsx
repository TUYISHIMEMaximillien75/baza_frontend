import React from 'react';
import { clsx } from 'clsx';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  ariaLabel: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'ghost',
  size = 'md',
  ariaLabel,
  className,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-baza-green text-white hover:bg-baza-green-dark focus:ring-baza-green',
    secondary: 'bg-baza-navy text-white hover:bg-slate-800 focus:ring-baza-navy',
    outline: 'border border-baza-border bg-white text-baza-text-primary hover:bg-slate-50 focus:ring-baza-navy',
    ghost: 'text-baza-text-secondary hover:text-baza-text-primary hover:bg-slate-100 focus:ring-slate-300',
  };

  const sizes = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base',
  };

  return (
    <button
      aria-label={ariaLabel}
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon}
    </button>
  );
};
