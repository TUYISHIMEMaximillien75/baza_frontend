import React from 'react';
import { Link } from 'react-router-dom';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllText?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  viewAllHref,
  viewAllText = 'View all',
}) => {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        <h2 className="text-lg font-extrabold text-baza-navy tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-baza-text-secondary mt-0.5">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <Link
          to={viewAllHref}
          className="text-xs font-bold text-baza-green hover:text-baza-green-dark transition-colors flex items-center gap-1"
        >
          {viewAllText} &rarr;
        </Link>
      )}
    </div>
  );
};
