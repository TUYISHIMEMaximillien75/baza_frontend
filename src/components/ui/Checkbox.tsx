import React from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, checked, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex items-start gap-2.5 cursor-pointer select-none">
        <div className="relative flex items-center mt-0.5">
          <input
            id={inputId}
            ref={ref}
            type="checkbox"
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <div className="w-4 h-4 rounded border border-baza-border bg-white peer-checked:bg-baza-green peer-checked:border-baza-green transition-all flex items-center justify-center peer-focus:ring-2 peer-focus:ring-baza-green/30">
            <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity stroke-[3]" />
          </div>
        </div>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-baza-text-primary cursor-pointer leading-tight">
            {label}
          </label>
        )}
        {error && <p className="text-xs text-baza-error">{error}</p>}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
