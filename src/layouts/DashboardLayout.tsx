import React from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  List,
  Heart,
  Calendar,
  ShieldCheck,
  User,
  Bell,
  LogOut,
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
    try {
      await authService.logout();
    } finally {
      clearSession();
      navigate('/login', { replace: true });
    }
  };

  const menu: Array<{
    label: string;
    href: string;
    icon: React.ReactNode;
    end?: boolean;
    isAction?: boolean;
  }> = [
    { label: 'Overview',         href: '/dashboard',       icon: <LayoutDashboard className="w-4 h-4" />, end: true },
    { label: 'Post a listing',   href: '/listings/new',    icon: <PlusCircle className="w-4 h-4" />,      isAction: true },
    { label: 'My listings',      href: '/my-listings',     icon: <List className="w-4 h-4" /> },
    { label: 'Saved',            href: '/saved',            icon: <Heart className="w-4 h-4" /> },
    { label: 'Visit requests',   href: '/visit-requests',  icon: <Calendar className="w-4 h-4" /> },
    { label: 'Verification',     href: '/verification',    icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Alerts',           href: '/alerts',           icon: <Bell className="w-4 h-4" /> },
    { label: 'Profile',          href: '/profile',          icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div
      className="min-h-screen flex flex-col pb-16 md:pb-0"
      style={{ background: '#EDEBE5', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
    >
      {/* ── Mobile top header — single bar, no gradient line ── */}
      <header
        className="md:hidden sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
        style={{ background: '#0A2A42', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <Link to="/" className="flex items-center gap-2" aria-label="BAZA home">
          <img
            src="/logo.png"
            alt="BAZA"
            className="w-7 h-7 rounded-md object-contain bg-white p-0.5"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="font-extrabold text-white text-base tracking-tight">Dashboard</span>
        </Link>
        <Avatar name={displayName} size="sm" />
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 gap-7">

        {/* ── Desktop sidebar ── */}
        <aside
          className="hidden md:flex flex-col w-52 flex-shrink-0 h-fit rounded-lg overflow-hidden"
          style={{ background: '#fff', border: '1px solid #E5E1DA' }}
          aria-label="Dashboard navigation"
        >
          {/* User identity — plain, no navy slab */}
          <div
            className="flex items-center gap-3 px-4 py-4"
            style={{ borderBottom: '1px solid #E5E1DA' }}
          >
            <Avatar name={displayName} size="sm" />
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate">{displayName}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="py-2">
            {menu.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.end}
                aria-label={item.label}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 py-2.5 pr-4 text-xs transition-colors
                   focus:outline-none focus:bg-slate-50 ${
                    item.isAction
                      ? 'font-bold'
                      : isActive
                        ? 'font-bold text-[#0A2A42]'
                        : 'font-semibold text-slate-500 hover:text-slate-800'
                  }`
                }
                style={({ isActive }) => ({
                  paddingLeft: '14px',
                  borderLeft: isActive
                    ? `2px solid ${item.isAction ? '#F97316' : '#0A2A42'}`
                    : '2px solid transparent',
                  color: item.isAction
                    ? '#F97316'
                    : undefined,
                })}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className="flex-shrink-0"
                      style={{
                        color: item.isAction
                          ? '#F97316'
                          : isActive
                            ? '#0A2A42'
                            : '#94A3B8',
                      }}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Sign out — separated, calm */}
          <div className="px-4 py-3" style={{ borderTop: '1px solid #EDE9E2' }}>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-[11px] font-semibold text-slate-400
                         hover:text-red-600 transition-colors focus:outline-none focus:text-red-600 w-full text-left"
              aria-label="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
};
