import React, { useState } from 'react';
import { User, ShieldCheck, Heart, HelpCircle, LogOut, ChevronRight, Settings, Camera } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '../components/ui/Avatar';
import { Card } from '../components/ui/Card';
import { VerificationBadge } from '../components/ui/VerificationBadge';
import { Skeleton } from '../components/feedback/Skeleton';
import { PageHeader } from '../components/layout/PageHeader';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useSessionStore } from '../store';
import authService from '../services/authService';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { clearSession, user: sessionUser } = useSessionStore();
  const { data: currentUser, isLoading } = useCurrentUser();

  const user = currentUser ?? sessionUser;
  const firstName = (user as any)?.firstName ?? '';
  const lastName = (user as any)?.lastName ?? '';
  const email = (user as any)?.email ?? '';
  const roles: string[] = (user as any)?.roles ?? [];
  const primaryRole = roles.find((r) => r !== 'USER') ?? roles[0] ?? 'USER';
  const isVerified = roles.some((r) => ['SELLER', 'BROKER', 'DEALER'].includes(r));

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      clearSession();
      navigate('/login', { replace: true });
    }
  };

  const menuItems = [
    {
      label: 'My Listings',
      href: '/my-listings',
      icon: <User className="w-4 h-4 text-baza-green" />,
    },
    {
      label: 'Verification Centre',
      href: '/verification',
      icon: <ShieldCheck className="w-4 h-4 text-baza-green" />,
      badge: isVerified ? 'APPROVED' : 'PENDING',
    },
    {
      label: 'Saved Collection',
      href: '/saved',
      icon: <Heart className="w-4 h-4 text-red-500" />,
    },
    {
      label: 'Visit Requests',
      href: '/visit-requests',
      icon: <Settings className="w-4 h-4 text-sky-600" />,
    },
    {
      label: 'Alerts & Notifications',
      href: '/alerts',
      icon: <HelpCircle className="w-4 h-4 text-amber-500" />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" description="Manage your account preferences and seller verification status." />

      {/* Profile Summary Card */}
      <Card padding="md" className="bg-gradient-to-br from-baza-navy to-slate-900 text-white border-none">
        <div className="flex items-center gap-4">
          {isLoading ? (
            <>
              <Skeleton className="w-14 h-14 rounded-full bg-white/20 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40 bg-white/20 rounded" />
                <Skeleton className="h-3 w-56 bg-white/20 rounded" />
              </div>
            </>
          ) : (
            <>
              <div className="relative flex-shrink-0">
                <Avatar
                  name={`${firstName} ${lastName}`}
                  size="lg"
                  className="ring-2 ring-baza-green ring-offset-2 ring-offset-slate-900"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-white">{firstName} {lastName}</h3>
                  {isVerified && <VerificationBadge type={primaryRole as any} />}
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{email}</p>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-700/60 text-xs">
                  <div>
                    <span className="font-bold text-baza-green capitalize">{primaryRole.toLowerCase()}</span>{' '}
                    <span className="text-slate-400">Account</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Menu Items */}
      <Card padding="none">
        <div className="divide-y divide-baza-border">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-xs font-bold text-baza-navy">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-baza-text-secondary">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Sign Out */}
      <Card padding="md" className="border-red-200">
        <button
          onClick={handleLogout}
          className="flex items-center justify-between w-full text-baza-error font-bold text-xs"
        >
          <div className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            <span>Sign Out from BAZA</span>
          </div>
          <ChevronRight className="w-4 h-4" />
        </button>
      </Card>
    </div>
  );
};
