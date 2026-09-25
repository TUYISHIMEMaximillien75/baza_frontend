import React from 'react';

export interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, action }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-baza-border">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-baza-navy tracking-tight">{title}</h1>
        {description && <p className="text-xs sm:text-sm text-baza-text-secondary mt-1">{description}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};
