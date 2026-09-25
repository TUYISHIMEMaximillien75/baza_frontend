import React from 'react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Clock } from 'lucide-react';

export interface PlaceholderPageProps {
  title: string;
  description: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} />
      <Card padding="lg" className="text-center py-12">
        <div className="w-12 h-12 rounded-full bg-baza-green-light flex items-center justify-center text-baza-green-dark mx-auto mb-3">
          <Clock className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-baza-navy mb-1">{title}</h3>
        <p className="text-xs text-baza-text-secondary max-w-sm mx-auto leading-relaxed">
          {description} This feature is currently under active development and will be released shortly.
        </p>
      </Card>
    </div>
  );
};
