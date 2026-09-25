import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onSearch?: () => void;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search houses, land, vehicles in Rwanda...',
  onSearch,
  className,
}) => {
  return (
    <div className={`relative flex items-center w-full ${className || ''}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-baza-text-secondary pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.()}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 bg-white border border-baza-border rounded-baza text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-baza-green focus:border-transparent transition-all shadow-baza"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-baza-text-primary"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
