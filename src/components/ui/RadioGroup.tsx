import React from 'react';
import { clsx } from 'clsx';

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,
  label,
  error,
}) => {
  return (
    <div className="space-y-2">
      {label && <p className="text-xs font-semibold text-baza-text-primary">{label}</p>}
      <div className="space-y-2">
        {options.map((opt) => {
          const isChecked = selectedValue === opt.value;
          return (
            <label
              key={opt.value}
              className={clsx(
                'flex items-start gap-3 p-3 rounded-baza border cursor-pointer transition-all',
                isChecked
                  ? 'border-baza-green bg-baza-green-light/20 ring-1 ring-baza-green'
                  : 'border-baza-border bg-white hover:border-slate-300',
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isChecked}
                onChange={() => onChange?.(opt.value)}
                className="mt-0.5 text-baza-green focus:ring-baza-green"
              />
              <div className="text-sm">
                <span className="font-semibold text-baza-text-primary block">{opt.label}</span>
                {opt.description && (
                  <span className="text-xs text-baza-text-secondary block mt-0.5">{opt.description}</span>
                )}
              </div>
            </label>
          );
        })}
      </div>
      {error && <p className="text-xs text-baza-error">{error}</p>}
    </div>
  );
};
