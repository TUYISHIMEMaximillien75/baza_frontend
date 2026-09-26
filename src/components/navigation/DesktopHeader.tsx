import React, { useState, useRef, useEffect } from 'react';
import {
  Building2, Heart, Plus, User, ChevronDown,
  LayoutDashboard, ShieldCheck, Bell, LogOut, ListOrdered,
  Search,
} from 'lucide-react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { useSessionStore } from '../../store';
import authService from '../../services/authService';

export const DesktopHeader: React.FC = () => {
  const { isAuthenticated, user, clearSession } = useSessionStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Houses',      href: '/marketplace?category=houses' },
    { label: 'Land',        href: '/marketplace?category=residential-land' },
    { label: 'Vehicles',    href: '/marketplace?category=vehicle' },
  ];

  const isLinkActive = (href: string) => {
    const currentUrl = location.pathname + location.search;
    if (href === '/marketplace') {
      const params = new URLSearchParams(location.search);
      return location.pathname === '/marketplace' && !params.get('category');
    }
    return (
      currentUrl === href ||
      (location.pathname === href.split('?')[0] &&
        location.search.includes(href.split('?')[1]))
    );
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try { await authService.logout(); } finally {
      clearSession();
      navigate('/login', { replace: true });
    }
  };

  const firstName = (user as any)?.firstName ?? '';
  const lastName  = (user as any)?.lastName  ?? '';
  const fullName  = `${firstName} ${lastName}`.trim() || 'Account';

  return (
    <header className="sticky top-0 z-40" style={{ background: '#0A2A42' }}>
      {/* Thin coral accent line at very top */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, #F97316 0%, #06B6D4 100%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <img
              src="/logo.png"
              alt="BAZA"
              className="w-9 h-9 rounded-lg object-contain bg-white p-0.5 shadow-sm group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                // fallback if logo doesn't load
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col leading-none">
              <span
                className="text-white font-black tracking-tight text-lg"
                style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', letterSpacing: '-0.03em' }}
              >
                BAZA<span style={{ color: '#06B6D4' }}>.rw</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Marketplace
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-white/65 hover:text-white hover:bg-white/8'
                  }`}
                  style={active ? { fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' } : {}}
                >
                  {link.label}
                </Link>
              );
            })}
            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/65 hover:text-white hover:bg-white/8'
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* ── Actions ── */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Saved */}
                <Link
                  to="/saved"
                  className="hidden sm:flex p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  title="Saved Collection"
                >
                  <Heart className="w-4.5 h-4.5" />
                </Link>
                {/* Alerts */}
                <Link
                  to="/alerts"
                  className="hidden sm:flex p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  title="Alerts"
                >
                  <Bell className="w-4.5 h-4.5" />
                </Link>

                {/* Post Listing — coral CTA */}
                <Link to="/listings/new">
                  <button
                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all duration-150 hover:opacity-90 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
                      boxShadow: '0 2px 8px rgba(249,115,22,0.4)',
                      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Post Listing
                  </button>
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Avatar name={fullName} size="sm" />
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        dropdownOpen ? 'rotate-180' : ''
                      }`}
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                    />
                  </button>

                  {dropdownOpen && (
                    <div
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-baza-lg overflow-hidden z-50 animate-slide-down"
                      style={{ boxShadow: '0 16px 40px -8px rgba(10,42,66,0.22), 0 4px 12px -4px rgba(10,42,66,0.10)' }}
                    >
                      {/* User info header */}
                      <div className="px-4 py-3.5" style={{ background: '#F0F4F8', borderBottom: '1px solid #E2E8F0' }}>
                        <p className="text-xs font-bold text-baza-navy truncate" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>{fullName}</p>
                        <p className="text-2xs text-baza-text-secondary truncate mt-0.5">{(user as any)?.email ?? ''}</p>
                      </div>
                      <div className="py-1">
                        {[
                          { to: '/dashboard',    icon: <LayoutDashboard className="w-4 h-4" style={{ color: '#06B6D4' }} />, label: 'Dashboard' },
                          { to: '/my-listings',  icon: <ListOrdered className="w-4 h-4" style={{ color: '#0891B2' }} />,     label: 'My Listings' },
                          { to: '/saved',        icon: <Heart className="w-4 h-4 text-rose-400" />,                         label: 'Saved Collection' },
                          { to: '/verification', icon: <ShieldCheck className="w-4 h-4" style={{ color: '#10B981' }} />,    label: 'Verification' },
                          { to: '/profile',      icon: <User className="w-4 h-4 text-slate-400" />,                         label: 'Profile' },
                        ].map(({ to, icon, label }) => (
                          <Link
                            key={to}
                            to={to}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-baza-text-primary hover:bg-slate-50 transition-colors"
                          >
                            {icon}
                            {label}
                          </Link>
                        ))}
                      </div>
                      <div style={{ borderTop: '1px solid #E2E8F0' }} className="py-1">
                        <button
                          onClick={() => { setDropdownOpen(false); handleLogout(); }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-semibold text-baza-error hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex px-3 py-2 text-xs font-semibold rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Sign In
                </Link>
                <Link to="/listings/new">
                  <button
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
                      boxShadow: '0 2px 8px rgba(249,115,22,0.4)',
                      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Create Listing
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
