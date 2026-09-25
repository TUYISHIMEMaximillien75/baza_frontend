import React, { useState, useRef, useEffect } from 'react';
import { Building2, Heart, Plus, User, ChevronDown, LayoutDashboard, ShieldCheck, Bell, LogOut, ListOrdered } from 'lucide-react';
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
    { label: 'Houses', href: '/marketplace?category=houses' },
    { label: 'Land', href: '/marketplace?category=residential-land' },
    { label: 'Vehicles', href: '/marketplace?category=vehicle' },
  ];

  const isLinkActive = (href: string) => {
    const currentUrl = location.pathname + location.search;
    if (href === '/marketplace') {
      const params = new URLSearchParams(location.search);
      return location.pathname === '/marketplace' && !params.get('category');
    }
    return currentUrl === href || (location.pathname === href.split('?')[0] && location.search.includes(href.split('?')[1]));
  };

  // Close dropdown when clicking outside
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
    try {
      await authService.logout();
    } finally {
      clearSession();
      navigate('/login', { replace: true });
    }
  };

  const firstName = (user as any)?.firstName ?? '';
  const lastName = (user as any)?.lastName ?? '';
  const fullName = `${firstName} ${lastName}`.trim() || 'Account';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-baza-border shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-baza bg-baza-navy flex items-center justify-center text-baza-green font-extrabold text-xl shadow-xs group-hover:bg-slate-900 transition-colors">
                B
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-baza-navy">
                  BAZA<span className="text-baza-green">.rw</span>
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-baza-text-secondary -mt-1">
                  Marketplace
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-baza-text-primary">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`transition-colors py-1 ${
                    active
                      ? 'text-baza-green border-b-2 border-baza-green font-bold'
                      : 'text-baza-text-primary hover:text-baza-green'
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
                  `transition-colors py-1 hover:text-baza-green ${
                    isActive ? 'text-baza-green border-b-2 border-baza-green font-bold' : 'text-baza-text-primary'
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Saved */}
                <Link to="/saved" className="hidden sm:flex p-2 text-baza-text-secondary hover:text-red-500 transition-colors" title="Saved Collection">
                  <Heart className="w-5 h-5" />
                </Link>
                {/* Alerts */}
                <Link to="/alerts" className="hidden sm:flex p-2 text-baza-text-secondary hover:text-baza-navy transition-colors" title="Alerts">
                  <Bell className="w-5 h-5" />
                </Link>
                {/* Create Listing */}
                <Link to="/listings/new">
                  <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                    Post Listing
                  </Button>
                </Link>
                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-baza hover:bg-slate-100 transition-colors"
                  >
                    <Avatar name={fullName} size="sm" />
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-baza-border rounded-baza shadow-baza-lg overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-baza-border">
                        <p className="text-xs font-bold text-baza-navy truncate">{fullName}</p>
                        <p className="text-[11px] text-baza-text-secondary truncate">{(user as any)?.email ?? ''}</p>
                      </div>
                      <div className="py-1">
                        <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-baza-text-primary hover:bg-slate-50 transition-colors">
                          <LayoutDashboard className="w-4 h-4 text-baza-green" /> Dashboard
                        </Link>
                        <Link to="/my-listings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-baza-text-primary hover:bg-slate-50 transition-colors">
                          <ListOrdered className="w-4 h-4 text-sky-500" /> My Listings
                        </Link>
                        <Link to="/saved" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-baza-text-primary hover:bg-slate-50 transition-colors">
                          <Heart className="w-4 h-4 text-red-500" /> Saved Collection
                        </Link>
                        <Link to="/verification" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-baza-text-primary hover:bg-slate-50 transition-colors">
                          <ShieldCheck className="w-4 h-4 text-baza-green" /> Verification
                        </Link>
                        <Link to="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-baza-text-primary hover:bg-slate-50 transition-colors">
                          <User className="w-4 h-4 text-slate-500" /> Profile
                        </Link>
                      </div>
                      <div className="border-t border-baza-border py-1">
                        <button
                          onClick={() => { setDropdownOpen(false); handleLogout(); }}
                          className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-semibold text-baza-error hover:bg-red-50 transition-colors"
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
                <Link to="/login" className="hidden sm:inline-flex text-xs font-bold text-baza-navy hover:text-baza-green px-3 py-2">
                  Sign In
                </Link>
                <Link to="/listings/new">
                  <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                    Create Listing
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
