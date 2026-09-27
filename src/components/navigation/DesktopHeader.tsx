import React, { useState, useRef, useEffect } from 'react';
import {
  Heart, Plus, User, ChevronDown,
  LayoutDashboard, ShieldCheck, Bell, LogOut, ListOrdered,
} from 'lucide-react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
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
    /* Single nav bar — no thin utility strip above it */
    <header
      className="sticky top-0 z-40"
      style={{ background: '#0A2A42', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[62px]">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="BAZA home">
            <img
              src="/logo.png"
              alt="BAZA"
              className="w-8 h-8 rounded object-contain bg-white p-0.5 group-hover:scale-105 transition-transform duration-200"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <span
              className="text-white font-bold text-base tracking-tight"
              style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', letterSpacing: '-0.02em' }}
            >
              BAZA<span style={{ color: '#06B6D4' }}>.rw</span>
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-3 py-2 rounded text-xs font-semibold transition-colors duration-150 ${
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/8'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-xs font-semibold transition-colors duration-150 ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/8'
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
                  className="hidden sm:flex p-2 rounded text-white/55 hover:text-white hover:bg-white/10 transition-colors"
                  title="Saved"
                  aria-label="Saved listings"
                >
                  <Heart className="w-4 h-4" />
                </Link>
                {/* Alerts */}
                <Link
                  to="/alerts"
                  className="hidden sm:flex p-2 rounded text-white/55 hover:text-white hover:bg-white/10 transition-colors"
                  title="Alerts"
                  aria-label="Alerts"
                >
                  <Bell className="w-4 h-4" />
                </Link>

                {/* Post a listing — Sun amber CTA, consistent verb */}
                <Link to="/listings/new">
                  <button
                    className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-bold text-white transition-all duration-150 hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A2A42]"
                    style={{
                      background: '#C17D2E',
                      boxShadow: '0 2px 8px rgba(193,125,46,0.4)',
                      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Post a listing
                  </button>
                </Link>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1.5 p-1.5 rounded hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white/30"
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
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
                      className="absolute right-0 top-full mt-2 w-52 bg-white rounded-baza-lg overflow-hidden z-50 animate-slide-down"
                      style={{ boxShadow: '0 16px 40px -8px rgba(13,30,44,0.22), 0 4px 12px -4px rgba(13,30,44,0.10)', border: '1px solid #E5E1DA' }}
                    >
                      {/* User info */}
                      <div className="px-4 py-3" style={{ background: '#F5F3EF', borderBottom: '1px solid #E5E1DA' }}>
                        <p className="text-xs font-bold text-baza-navy truncate" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>{fullName}</p>
                        <p className="text-2xs text-baza-text-secondary truncate mt-0.5">{(user as any)?.email ?? ''}</p>
                      </div>
                      <div className="py-1">
                        {[
                          { to: '/dashboard',    icon: <LayoutDashboard className="w-4 h-4 text-baza-cyan" />,           label: 'Dashboard' },
                          { to: '/my-listings',  icon: <ListOrdered className="w-4 h-4 text-baza-teal" />,               label: 'My listings' },
                          { to: '/saved',        icon: <Heart className="w-4 h-4 text-rose-400" />,                      label: 'Saved' },
                          { to: '/verification', icon: <ShieldCheck className="w-4 h-4 text-baza-hillside" />,           label: 'Verification' },
                          { to: '/profile',      icon: <User className="w-4 h-4 text-slate-400" />,                      label: 'Profile' },
                        ].map(({ to, icon, label }) => (
                          <Link
                            key={to}
                            to={to}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-baza-text-primary hover:bg-baza-muted transition-colors"
                          >
                            {icon}
                            {label}
                          </Link>
                        ))}
                      </div>
                      <div style={{ borderTop: '1px solid #E5E1DA' }} className="py-1">
                        <button
                          onClick={() => { setDropdownOpen(false); handleLogout(); }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-semibold text-baza-error hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign out
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
                  className="hidden sm:inline-flex px-3 py-2 text-xs font-semibold rounded text-white/65 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Sign in
                </Link>
                <Link to="/listings/new">
                  <button
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A2A42]"
                    style={{
                      background: '#C17D2E',
                      boxShadow: '0 2px 8px rgba(193,125,46,0.4)',
                      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Post a listing
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
