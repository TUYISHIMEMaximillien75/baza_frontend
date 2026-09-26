import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllText?: string;
  accent?: 'coral' | 'cyan' | 'none';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  viewAllHref,
  viewAllText = 'View all',
  accent = 'coral',
}) => {
  const accentColor =
    accent === 'coral' ? '#F97316' :
    accent === 'cyan'  ? '#06B6D4' :
    'transparent';

  return (
    <div className="flex items-end justify-between mb-5">
      <div
        className="pl-3"
        style={{ borderLeft: `3px solid ${accentColor}` }}
      >
        <h2
          className="text-xl font-extrabold text-baza-navy tracking-tight leading-snug"
          style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-baza-text-secondary mt-0.5 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {viewAllHref && (
        <Link
          to={viewAllHref}
          className="inline-flex items-center gap-1 text-xs font-bold text-baza-teal hover:text-baza-navy transition-colors group"
        >
          {viewAllText}
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
};
