import React from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, PlusCircle, List, Heart,
  Calendar, ShieldCheck, User, Bell, LogOut,
} from 'lucide-react';
import { MobileBottomNav } from '../components/navigation/MobileBottomNav';
import { Avatar } from '../components/ui/Avatar';
import { useSessionStore } from '../store';
import authService from '../services/authService';

export const DashboardLayout: React.FC = () => {
  const { user, clearSession } = useSessionStore();
  const navigate = useNavigate();
  const displayName =
    [(user as any)?.firstName, (user as any)?.lastName].filter(Boolean).join(' ') || 'User';

  const handleLogout = async () => {
    try { await authService.logout(); } finally {
      clearSession();
      navigate('/login', { replace: true });
    }
  };

  const menu = [
    { label: 'Overview',           href: '/dashboard',       icon: <LayoutDashboard className="w-4 h-4" />, end: true },
    { label: 'Create Listing',     href: '/listings/new',    icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'My Listings',        href: '/my-listings',     icon: <List className="w-4 h-4" /> },
    { label: 'Saved Collection',   href: '/saved',           icon: <Heart className="w-4 h-4" /> },
    { label: 'Visit Requests',     href: '/visit-requests',  icon: <Calendar className="w-4 h-4" /> },
    { label: 'Verification Centre', href: '/verification',  icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Alerts',             href: '/alerts',          icon: <Bell className="w-4 h-4" /> },
    { label: 'My Profile',         href: '/profile',         icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-baza-bg pb-16 md:pb-0">

      {/* ── Mobile Top Header ── */}
      <header
        className="md:hidden sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
        style={{
          background: '#0A2A42',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="BAZA"
            className="w-7 h-7 rounded-md object-contain bg-white p-0.5"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span
            className="font-black text-white"
            style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
          >
            Dashboard
          </span>
        </Link>
        <Avatar name={displayName} size="sm" />
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">

        {/* ── Desktop Sidebar ── */}
        <aside
          className="hidden md:flex flex-col w-60 flex-shrink-0 h-fit rounded-baza-lg overflow-hidden"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 8px -2px rgba(10,42,66,0.07)',
          }}
        >
          {/* User identity */}
          <div
            className="flex items-center gap-3 px-4 py-4"
            style={{ background: '#0A2A42' }}
          >
            <Avatar name={displayName} size="md" />
            <div className="truncate">
              <h4
                className="text-sm font-bold text-white truncate"
                style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
              >
                {displayName}
              </h4>
              <p className="text-2xs truncate" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {user?.email}
              </p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="p-2 space-y-0.5">
            {menu.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-baza-navy font-bold'
                      : 'text-baza-text-secondary hover:text-baza-navy hover:bg-slate-50'
                  }`
                }
                style={({ isActive }) =>
                  isActive
                    ? { background: '#ECFEFF', color: '#0891B2', border: '1px solid #A5F3FC' }
                    : {}
                }
              >
                <span style={undefined}>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-3 pt-2" style={{ borderTop: '1px solid #E2E8F0', marginTop: '4px' }}>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 text-xs font-semibold text-baza-error hover:bg-red-50 px-3 py-2.5 rounded-lg w-full text-left transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>

        {/* ── Dashboard Content ── */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
};
