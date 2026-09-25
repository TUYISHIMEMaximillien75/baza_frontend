import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-1.5 text-xs text-baza-text-secondary py-2 overflow-x-auto no-scrollbar">
      <Link to="/" className="hover:text-baza-green flex items-center transition-colors">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          {item.href ? (
            <Link to={item.href} className="hover:text-baza-green transition-colors whitespace-nowrap">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-baza-text-primary whitespace-nowrap">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
