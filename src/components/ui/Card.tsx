import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  padding = 'md',
  className,
  ...props
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-3.5',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <div
      className={clsx(
        'bg-white border border-baza-border rounded-baza shadow-baza transition-all duration-200 overflow-hidden',
        hoverEffect && 'hover:shadow-baza-lg hover:-translate-y-0.5 hover:border-slate-300',
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
