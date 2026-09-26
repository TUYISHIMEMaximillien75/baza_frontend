import React from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-bold text-baza-text-primary tracking-wide uppercase">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={clsx(
              'w-full appearance-none px-3.5 py-2.5 bg-white border text-sm rounded-baza pr-10 transition-all duration-150',
              'focus:outline-none focus:ring-2 focus:ring-baza-navy/30 focus:border-baza-navy',
              'disabled:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-400',
              error
                ? 'border-baza-error text-baza-error focus:ring-baza-error/25'
                : 'border-baza-border text-baza-text-primary',
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="text-xs text-baza-error">{error}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
