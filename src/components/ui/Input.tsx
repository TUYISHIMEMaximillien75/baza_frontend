import React from 'react';
import { clsx } from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-bold text-baza-text-primary tracking-wide uppercase">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-slate-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={clsx(
              'w-full px-3.5 py-2.5 bg-white border text-sm rounded-baza transition-all duration-150 placeholder:text-slate-400',
              'focus:outline-none focus:ring-2 focus:ring-baza-navy/30 focus:border-baza-navy',
              'disabled:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400',
              error
                ? 'border-baza-error text-baza-error focus:ring-baza-error/25 focus:border-baza-error'
                : 'border-baza-border text-baza-text-primary',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-slate-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-baza-error flex items-center gap-1">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-baza-text-secondary">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
