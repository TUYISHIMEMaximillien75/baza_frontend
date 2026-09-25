import React from 'react';
import { CheckCircle2, ShieldCheck, Award } from 'lucide-react';
import { Badge } from './Badge';

export interface VerificationBadgeProps {
  type?: 'SELLER' | 'BROKER' | 'DEALER' | 'VERIFIED_LISTING';
  status?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  type = 'VERIFIED_LISTING',
  status = 'APPROVED',
}) => {
  if (status !== 'APPROVED') return null;

  const config = {
    SELLER: { label: 'Verified Seller', icon: <CheckCircle2 className="w-3.5 h-3.5 text-baza-green-dark" /> },
    BROKER: { label: 'Verified Broker', icon: <ShieldCheck className="w-3.5 h-3.5 text-baza-green-dark" /> },
    DEALER: { label: 'Verified Dealer', icon: <Award className="w-3.5 h-3.5 text-baza-green-dark" /> },
    VERIFIED_LISTING: { label: 'Verified', icon: <CheckCircle2 className="w-3.5 h-3.5 text-baza-green-dark" /> },
  };

  const item = config[type] || config.VERIFIED_LISTING;

  return (
    <Badge variant="green" size="sm" icon={item.icon}>
      {item.label}
    </Badge>
  );
};
