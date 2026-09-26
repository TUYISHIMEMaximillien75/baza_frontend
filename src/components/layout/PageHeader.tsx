import React from 'react';

export interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  eyebrow?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action, eyebrow }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-7">
      <div>
        {eyebrow && (
          <span
            className="text-2xs font-bold uppercase tracking-widest text-baza-coral mb-1.5 block"
            style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
          >
            {eyebrow}
          </span>
        )}
        <h1
          className="text-2xl sm:text-3xl font-black text-baza-navy tracking-tight leading-tight"
          style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
        >
          {title}
        </h1>
        {description && (
          <p className="text-sm text-baza-text-secondary mt-1.5 leading-relaxed max-w-xl">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0 mt-1">{action}</div>}
    </div>
  );
};
