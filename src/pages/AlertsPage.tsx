import React from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { NotificationCard } from '../components/common/NotificationCard';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/feedback/Skeleton';
import { EmptyState } from '../components/feedback/EmptyState';
import { useNotifications } from '../hooks/useNotifications';

export const AlertsPage: React.FC = () => {
  const { data: notifications = [], isLoading, markAsRead, markAllAsRead, isMarkingAll } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Alerts & Notifications"
        description="Stay updated on site visits, listing approvals, and price drops."
        action={
          notifications.length > 0 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => markAllAsRead()}
              isLoading={isMarkingAll}
              disabled={unreadCount === 0}
              leftIcon={<CheckCheck className="w-4 h-4" />}
            >
              Mark All as Read
            </Button>
          ) : undefined
        }
      />

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <NotificationCard
              key={notif.id}
              notification={notif}
              onMarkRead={(id) => markAsRead(id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No alerts yet"
          description="You will receive notifications here when people request site visits or when your listings status changes."
        />
      )}
    </div>
  );
};
