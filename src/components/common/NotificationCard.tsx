import React from 'react';
import { CheckCircle2, XCircle, Calendar, TrendingDown, Bell } from 'lucide-react';
import { NotificationItem } from '../../types';
import { Card } from '../ui/Card';

export interface NotificationCardProps {
  notification: NotificationItem;
  onMarkRead?: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkRead,
}) => {
  const icons = {
    APPROVED: <CheckCircle2 className="w-5 h-5 text-baza-green" />,
    REJECTED: <XCircle className="w-5 h-5 text-baza-error" />,
    VISIT: <Calendar className="w-5 h-5 text-sky-600" />,
    PRICE: <TrendingDown className="w-5 h-5 text-amber-600" />,
    SYSTEM: <Bell className="w-5 h-5 text-indigo-600" />,
  };

  return (
    <Card
      padding="sm"
      className={`transition-colors ${!notification.isRead ? 'bg-emerald-50/30 border-l-4 border-l-baza-green' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-white shadow-xs border border-slate-100 mt-0.5">
          {icons[notification.type] || icons.SYSTEM}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-baza-navy">{notification.title}</h4>
            <span className="text-[10px] text-baza-text-secondary">{notification.createdAt}</span>
          </div>
          <p className="text-xs text-baza-text-secondary mt-0.5 leading-relaxed">{notification.message}</p>
        </div>
        {!notification.isRead && onMarkRead && (
          <button
            onClick={() => onMarkRead(notification.id)}
            className="text-[10px] text-baza-green font-semibold hover:underline"
          >
            Mark read
          </button>
        )}
      </div>
    </Card>
  );
};
