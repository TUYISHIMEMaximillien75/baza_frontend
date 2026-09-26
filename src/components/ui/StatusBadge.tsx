import React from 'react';

export interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const map: Record<string, { label: string; dotColor: string; textColor: string; bgColor: string }> = {
    PUBLISHED: {
      label: 'Published',
      dotColor: 'bg-emerald-500 ring-2 ring-emerald-500/20',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50/80 border-emerald-200/80',
    },
    APPROVED: {
      label: 'Approved',
      dotColor: 'bg-emerald-500 ring-2 ring-emerald-500/20',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50/80 border-emerald-200/80',
    },
    ACTIVE: {
      label: 'Active',
      dotColor: 'bg-emerald-500 ring-2 ring-emerald-500/20',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50/80 border-emerald-200/80',
    },
    ACCEPTED: {
      label: 'Accepted',
      dotColor: 'bg-emerald-500 ring-2 ring-emerald-500/20',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50/80 border-emerald-200/80',
    },
    PENDING: {
      label: 'Pending Review',
      dotColor: 'bg-amber-500 ring-2 ring-amber-500/20',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50/80 border-amber-200/80',
    },
    PENDING_REVIEW: {
      label: 'Pending Review',
      dotColor: 'bg-amber-500 ring-2 ring-amber-500/20',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50/80 border-amber-200/80',
    },
    CHANGES_REQUESTED: {
      label: 'Changes Requested',
      dotColor: 'bg-amber-500 ring-2 ring-amber-500/20',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50/80 border-amber-200/80',
    },
    DRAFT: {
      label: 'Draft',
      dotColor: 'bg-slate-400',
      textColor: 'text-slate-600',
      bgColor: 'bg-slate-100 border-slate-200',
    },
    SOLD: {
      label: 'Sold',
      dotColor: 'bg-baza-cyan ring-2 ring-baza-cyan/20',
      textColor: 'text-baza-navy',
      bgColor: 'bg-cyan-50/80 border-cyan-200/80',
    },
    RENTED: {
      label: 'Rented',
      dotColor: 'bg-baza-cyan ring-2 ring-baza-cyan/20',
      textColor: 'text-baza-navy',
      bgColor: 'bg-cyan-50/80 border-cyan-200/80',
    },
    COMPLETED: {
      label: 'Completed',
      dotColor: 'bg-baza-cyan ring-2 ring-baza-cyan/20',
      textColor: 'text-baza-navy',
      bgColor: 'bg-cyan-50/80 border-cyan-200/80',
    },
    REJECTED: {
      label: 'Rejected',
      dotColor: 'bg-red-500 ring-2 ring-red-500/20',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50/80 border-red-200/80',
    },
    SUSPENDED: {
      label: 'Suspended',
      dotColor: 'bg-red-500 ring-2 ring-red-500/20',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50/80 border-red-200/80',
    },
    CANCELLED: {
      label: 'Cancelled',
      dotColor: 'bg-red-500 ring-2 ring-red-500/20',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50/80 border-red-200/80',
    },
  };

  const current = map[status.toUpperCase()] || {
    label: status,
    dotColor: 'bg-slate-400',
    textColor: 'text-slate-600',
    bgColor: 'bg-slate-100 border-slate-200',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${current.bgColor} ${current.textColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${current.dotColor}`} />
      {current.label}
    </span>
  );
};
