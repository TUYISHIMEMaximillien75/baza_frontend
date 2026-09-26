import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'coral';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  disabled,
  style,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-bold rounded-baza transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  // Variant styles — navy is the primary, coral is for CTAs, green for success
  const variants: Record<string, { className: string; style?: React.CSSProperties }> = {
    primary: {
      className: 'bg-baza-navy text-white hover:bg-[#0E3A5A] focus:ring-baza-navy shadow-navy',
    },
    coral: {
      className: 'text-white focus:ring-baza-coral',
      style: {
        background: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
        boxShadow: '0 2px 10px rgba(249,115,22,0.35)',
      },
    },
    secondary: {
      className: 'bg-baza-cyan text-white hover:bg-baza-teal focus:ring-baza-cyan shadow-cyan',
    },
    outline: {
      className:
        'border border-baza-border bg-white text-baza-text-primary hover:border-baza-navy hover:text-baza-navy focus:ring-baza-navy',
    },
    ghost: {
      className:
        'text-baza-text-primary hover:bg-slate-100 focus:ring-slate-300',
    },
    danger: {
      className: 'bg-baza-error text-white hover:bg-red-700 focus:ring-baza-error',
    },
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  const v = variants[variant];

  return (
    <button
      className={clsx(base, v.className, sizes[size], fullWidth && 'w-full', className)}
      style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', ...v.style, ...style }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
};
