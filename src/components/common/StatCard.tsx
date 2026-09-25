import React from 'react';
import { Card } from '../ui/Card';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  color?: 'emerald' | 'navy' | 'amber' | 'sky';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = 'emerald',
}) => {
  const iconColors = {
    emerald: 'bg-baza-green-light text-baza-green-dark',
    navy: 'bg-sky-100 text-baza-navy',
    amber: 'bg-amber-100 text-amber-700',
    sky: 'bg-indigo-100 text-indigo-700',
  };

  return (
    <Card padding="md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-baza-text-secondary">{title}</p>
          <h3 className="text-xl font-extrabold text-baza-navy mt-1">{value}</h3>
          {trend && <p className="text-[11px] text-baza-green-dark mt-1 font-medium">{trend}</p>}
        </div>
        <div className={`w-11 h-11 rounded-full flex items-center justify-center ${iconColors[color]}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};
