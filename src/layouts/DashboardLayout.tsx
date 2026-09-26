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
  ChevronRight,
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

  const menu = [
    { label: 'Overview', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" />, end: true },
    { label: 'Create Listing', href: '/listings/new', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'My Listings', href: '/my-listings', icon: <List className="w-4 h-4" /> },
    { label: 'Saved Collection', href: '/saved', icon: <Heart className="w-4 h-4" /> },
    { label: 'Visit Requests', href: '/visit-requests', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Verification Centre', href: '/verification', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Alerts', href: '/alerts', icon: <Bell className="w-4 h-4" /> },
    { label: 'My Profile', href: '/profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 pb-16 md:pb-0 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ── Mobile Top Header ── */}
      <header
        className="md:hidden sticky top-0 z-40 px-4 py-3 flex items-center justify-between bg-baza-navy text-white border-b border-baza-navy/20"
      >
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="BAZA"
            className="w-7 h-7 rounded-md object-contain bg-white p-0.5"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="font-extrabold text-white text-base tracking-tight">Dashboard</span>
        </Link>
        <Avatar name={displayName} size="sm" />
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
        {/* ── Desktop Left Sidebar ── */}
        <aside className="hidden md:flex flex-col w-64 flex-shrink-0 h-fit rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-none">
          {/* User Profile Identity Banner */}
          <div className="flex items-center gap-3.5 px-5 py-5 bg-baza-navy text-white">
            <Avatar name={displayName} size="md" className="border-2 border-white/20 shadow-sm" />
            <div className="truncate">
              <h4 className="text-sm font-bold text-white truncate tracking-tight">{displayName}</h4>
              <p className="text-[11px] font-medium text-slate-300 truncate mt-0.5">{user?.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {menu.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all duration-150 group ${
                    isActive
                      ? 'bg-baza-navy text-white font-bold shadow-sm'
                      : 'text-slate-600 font-semibold hover:text-baza-navy hover:bg-slate-100/80'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-baza-cyan' : 'text-slate-400 group-hover:text-baza-navy transition-colors'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-baza-cyan" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Logout Footer */}
          <div className="p-3 pt-2 border-t border-slate-100 mt-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 text-xs font-bold text-red-600 hover:bg-red-50 px-3.5 py-2.5 rounded-xl w-full text-left transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>

        {/* ── Main Dashboard View ── */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
};
