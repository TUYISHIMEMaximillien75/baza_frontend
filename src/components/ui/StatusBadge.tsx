import React from 'react';
import { Badge } from './Badge';

export interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const map: Record<string, { label: string; variant: 'green' | 'navy' | 'gray' | 'error' | 'warning' | 'info' }> = {
    PUBLISHED: { label: 'Published', variant: 'green' },
    APPROVED: { label: 'Approved', variant: 'green' },
    ACTIVE: { label: 'Active', variant: 'green' },
    ACCEPTED: { label: 'Accepted', variant: 'green' },
    PENDING: { label: 'Pending Review', variant: 'warning' },
    PENDING_REVIEW: { label: 'Pending Review', variant: 'warning' },
    CHANGES_REQUESTED: { label: 'Changes Requested', variant: 'warning' },
    DRAFT: { label: 'Draft', variant: 'gray' },
    SOLD: { label: 'Sold', variant: 'navy' },
    RENTED: { label: 'Rented', variant: 'navy' },
    COMPLETED: { label: 'Completed', variant: 'navy' },
    REJECTED: { label: 'Rejected', variant: 'error' },
    SUSPENDED: { label: 'Suspended', variant: 'error' },
    CANCELLED: { label: 'Cancelled', variant: 'error' },
  };

  const current = map[status.toUpperCase()] || { label: status, variant: 'gray' };

  return <Badge variant={current.variant}>{current.label}</Badge>;
};
