import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Button } from '../ui/Button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  description = 'We couldn’t find any results matching your search or active filters.',
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white border border-baza-border rounded-baza shadow-baza my-4">
      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-baza-text-secondary mb-3">
        {icon || <PackageOpen className="w-7 h-7" />}
      </div>
      <h3 className="text-base font-bold text-baza-navy mb-1">{title}</h3>
      <p className="text-xs text-baza-text-secondary max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
