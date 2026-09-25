import React from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, List, Heart, Calendar, ShieldCheck, User, Bell, LogOut } from 'lucide-react';
import { MobileBottomNav } from '../components/navigation/MobileBottomNav';
import { Avatar } from '../components/ui/Avatar';
import { useSessionStore } from '../store';
import authService from '../services/authService';

export const DashboardLayout: React.FC = () => {
  const { user, clearSession } = useSessionStore();
  const navigate = useNavigate();
  const displayName = [(user as any)?.firstName, (user as any)?.lastName].filter(Boolean).join(' ') || 'User';

  const handleLogout = async () => {
    try { await authService.logout(); } finally {
      clearSession();
      navigate('/login', { replace: true });
    }
  };

  const menu = [
    { label: 'Overview', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Create Listing', href: '/listings/new', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'My Listings', href: '/my-listings', icon: <List className="w-4 h-4" /> },
    { label: 'Saved Collection', href: '/saved', icon: <Heart className="w-4 h-4" /> },
    { label: 'Visit Requests', href: '/visit-requests', icon: <Calendar className="w-4 h-4" /> },
    { label: 'Verification Centre', href: '/verification', icon: <ShieldCheck className="w-4 h-4" /> },
    { label: 'Alerts', href: '/alerts', icon: <Bell className="w-4 h-4" /> },
    { label: 'My Profile', href: '/profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-baza-bg pb-16 md:pb-0">
      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-baza-border px-4 py-3 flex items-center justify-between shadow-xs">
        <Link to="/" className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-baza bg-baza-navy text-baza-green font-extrabold flex items-center justify-center text-sm">
            B
          </div>
          <span className="font-extrabold text-baza-navy">BAZA Dashboard</span>
        </Link>
        <Avatar name={displayName} size="sm" />
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-64 flex-shrink-0 bg-white border border-baza-border rounded-baza p-4 shadow-baza h-fit">
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-baza-border">
            <Avatar name={displayName} size="md" />
            <div className="truncate">
              <h4 className="text-sm font-bold text-baza-navy truncate">{displayName}</h4>
              <p className="text-[11px] text-baza-text-secondary truncate">{user?.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menu.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-baza text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-baza-green-light text-baza-green-dark border border-baza-green/20 font-bold'
                      : 'text-baza-text-primary hover:bg-slate-50'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 pt-4 border-t border-baza-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs font-semibold text-baza-error hover:underline px-3 py-2 w-full text-left"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
};
