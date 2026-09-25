import React from 'react';
import { Home, Map, Car, Building2, Layers, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CategoryItem } from '../../types';

export interface CategoryCardProps {
  category: CategoryItem;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const icons: Record<string, React.ReactNode> = {
    property: <Home className="w-6 h-6 text-baza-green-dark" />,
    land: <Map className="w-6 h-6 text-baza-green-dark" />,
    vehicle: <Car className="w-6 h-6 text-baza-green-dark" />,
    houses: <Building2 className="w-6 h-6 text-baza-green-dark" />,
    apartments: <Layers className="w-6 h-6 text-baza-green-dark" />,
    commercial: <Briefcase className="w-6 h-6 text-baza-green-dark" />,
  };

  const icon = icons[category.slug] || <Home className="w-6 h-6 text-baza-green-dark" />;

  return (
    <Link
      to={`/marketplace?category=${category.slug}`}
      className="group p-4 bg-white border border-baza-border rounded-baza shadow-baza hover:shadow-baza-lg hover:border-baza-green/40 transition-all flex flex-col items-center text-center"
    >
      <div className="w-12 h-12 rounded-full bg-baza-green-light flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-sm font-bold text-baza-navy group-hover:text-baza-green transition-colors">
        {category.name}
      </h4>
      {category.description && (
        <p className="text-[11px] text-baza-text-secondary mt-0.5 line-clamp-1">{category.description}</p>
      )}
      {category.count !== undefined && (
        <span className="text-[10px] font-semibold text-baza-green-dark bg-baza-green-light/40 px-2 py-0.5 rounded-full mt-2">
          {category.count} listings
        </span>
      )}
    </Link>
  );
};
