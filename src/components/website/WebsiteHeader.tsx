import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plus } from 'lucide-react';
import { useSessionStore } from '../../store';

export const WebsiteHeader: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useSessionStore();

  const navLinks = [
    { name: 'Home',       path: '/' },
    { name: 'About',      path: '/about' },
    { name: 'Categories', path: '/categories' },
    { name: 'Trust',      path: '/trust' },
    { name: 'Contact',    path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const firstName = (user as any)?.firstName;

  return (
    /* ONE nav bar — no thin utility strip above */
    <header
      className="sticky top-0 z-50"
      style={{ background: '#0A2A42', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="BAZA home">
            <div className="w-8 h-8 rounded bg-white p-0.5 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="" className="w-full h-full object-contain" />
            </div>
            <span
              className="font-bold text-base text-white tracking-tight"
              style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', letterSpacing: '-0.02em' }}
            >
              Baza
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Website navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded text-xs font-semibold transition-colors duration-150 ${
                  isActive(link.path)
                    ? 'text-white bg-white/10'
                    : 'text-white/60 hover:text-white hover:bg-white/8'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/marketplace"
              className="text-white/60 hover:text-white hover:bg-white/8 px-3 py-2 rounded text-xs font-semibold transition-colors duration-150"
            >
              Marketplace
            </Link>
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="px-3 py-2 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
              >
                {firstName ? `${firstName}'s dashboard` : 'Dashboard'}
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
              >
                Sign in
              </Link>
            )}
            <Link to="/listings/new">
              <button
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A2A42]"
                style={{
                  background: '#C17D2E',
                  boxShadow: '0 2px 8px rgba(193,125,46,0.35)',
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                }}
              >
                <Plus className="w-3.5 h-3.5" />
                Post a listing
              </button>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-white/30"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ background: '#071D2F', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/8'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/marketplace"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 rounded text-sm font-semibold text-white/60 hover:text-white hover:bg-white/8 transition-colors"
            >
              Marketplace
            </Link>
            <div className="pt-3 border-t border-white/8 flex flex-col gap-2">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Sign in
                </Link>
              )}
              <Link
                to="/listings/new"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 mx-4 py-3 rounded text-sm font-bold text-white"
                style={{ background: '#C17D2E' }}
              >
                <Plus className="w-4 h-4" />
                Post a listing
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
