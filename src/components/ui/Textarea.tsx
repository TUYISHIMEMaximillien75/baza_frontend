import React from 'react';
import { clsx } from 'clsx';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, rows = 4, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold text-baza-text-primary">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          rows={rows}
          className={clsx(
            'w-full px-3.5 py-2.5 bg-white border text-sm rounded-baza transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-baza-green focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed resize-y',
            error ? 'border-baza-error text-baza-error' : 'border-baza-border text-baza-text-primary',
            className,
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-baza-error">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-baza-text-secondary">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
