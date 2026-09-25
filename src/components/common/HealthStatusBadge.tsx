import React from 'react';
import { useHealth } from '../../hooks/useHealth';
import { Activity, CheckCircle, ServerCrash } from 'lucide-react';

export const HealthStatusBadge: React.FC = () => {
  const { data, isLoading, isError } = useHealth();

  if (isLoading) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-semibold bg-slate-100 text-slate-600 rounded-full border border-slate-200">
        <Activity className="w-3 h-3 animate-spin text-slate-500" />
        Backend Connecting...
      </div>
    );
  }

  if (isError || !data || data.status !== 'ok') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-semibold bg-red-50 text-baza-error rounded-full border border-red-200">
        <ServerCrash className="w-3 h-3" />
        Backend Offline
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-semibold bg-baza-green-light text-baza-green-dark rounded-full border border-baza-green/20">
      <CheckCircle className="w-3 h-3 text-baza-green" />
      Backend: Connected (DB: {data.database})
    </div>
  );
};
