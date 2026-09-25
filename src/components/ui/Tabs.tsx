import React from 'react';
import { clsx } from 'clsx';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  fullWidth?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, fullWidth = false }) => {
  return (
    <div className="flex border-b border-baza-border overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all whitespace-nowrap focus:outline-none',
              isActive
                ? 'border-baza-green text-baza-green-dark bg-baza-green-light/20'
                : 'border-transparent text-baza-text-secondary hover:text-baza-text-primary hover:border-slate-300',
              fullWidth && 'flex-1 justify-center',
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={clsx(
                  'px-1.5 py-0.5 rounded-full text-[10px]',
                  isActive ? 'bg-baza-green text-white' : 'bg-slate-100 text-baza-text-secondary',
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
