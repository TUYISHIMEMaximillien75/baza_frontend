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
          <label htmlFor={inputId} className="block text-xs font-semibold text-baza-text-primary">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-baza-text-secondary pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={clsx(
              'w-full px-3.5 py-2.5 bg-white border text-sm rounded-baza transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-baza-green focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed',
              error ? 'border-baza-error text-baza-error' : 'border-baza-border text-baza-text-primary',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-baza-text-secondary">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-baza-error">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-baza-text-secondary">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
