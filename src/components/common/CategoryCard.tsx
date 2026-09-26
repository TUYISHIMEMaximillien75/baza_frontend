import React from 'react';
import { Home, Map, Car, Building2, Layers, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CategoryItem } from '../../types';

export interface CategoryCardProps {
  category: CategoryItem;
}

// Icon config: name → icon + unique accent color from BAZA palette
const CATEGORY_CONFIG: Record<
  string,
  { icon: React.ElementType; iconColor: string; bgColor: string }
> = {
  property:  { icon: Home,      iconColor: '#06B6D4', bgColor: 'rgba(6,182,212,0.10)' },
  land:      { icon: Map,       iconColor: '#F97316', bgColor: 'rgba(249,115,22,0.10)' },
  vehicle:   { icon: Car,       iconColor: '#0A2A42', bgColor: 'rgba(10,42,66,0.10)'  },
  houses:    { icon: Building2, iconColor: '#06B6D4', bgColor: 'rgba(6,182,212,0.10)' },
  apartments:{ icon: Layers,    iconColor: '#F97316', bgColor: 'rgba(249,115,22,0.10)' },
  commercial:{ icon: Briefcase, iconColor: '#0A2A42', bgColor: 'rgba(10,42,66,0.10)'  },
};

const DEFAULT_CONFIG = { icon: Home, iconColor: '#06B6D4', bgColor: 'rgba(6,182,212,0.10)' };

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const config = CATEGORY_CONFIG[category.slug] ?? DEFAULT_CONFIG;
  const IconComponent = config.icon;

  return (
    <Link
      to={`/marketplace?category=${category.slug}`}
      className="group relative p-4 bg-white border border-baza-border rounded-baza shadow-baza hover:shadow-baza-lg hover:-translate-y-0.5 hover:border-baza-cyan/40 transition-all duration-200 flex flex-col items-center text-center overflow-hidden"
    >
      {/* Subtle corner accent */}
      <div
        className="absolute -top-3 -right-3 w-12 h-12 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"
        style={{ background: config.bgColor, filter: 'blur(6px)' }}
      />

      {/* Icon well */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200 relative z-10"
        style={{ background: config.bgColor }}
      >
        <IconComponent className="w-6 h-6" style={{ color: config.iconColor }} />
      </div>

      {/* Name */}
      <h4 className="text-sm font-bold text-baza-navy group-hover:text-baza-cyan transition-colors relative z-10">
        {category.name}
      </h4>

      {/* Description */}
      {category.description && (
        <p className="text-[10px] text-baza-text-secondary mt-0.5 line-clamp-1 relative z-10">
          {category.description}
        </p>
      )}

      {/* Count pill */}
      {category.count !== undefined && (
        <span className="text-[10px] font-bold text-baza-navy/70 bg-baza-navy/8 px-2 py-0.5 rounded-full mt-2 relative z-10">
          {category.count} listings
        </span>
      )}

      {/* Arrow hint on hover */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="w-3 h-3 text-baza-cyan" />
      </div>
    </Link>
  );
};
