import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { DesktopHeader } from '../components/navigation/DesktopHeader';
import { MobileBottomNav } from '../components/navigation/MobileBottomNav';
import { ShieldCheck, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-baza-bg pb-16 md:pb-0">
      <DesktopHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7">
        <Outlet />
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer style={{ background: '#071D2F', borderTop: '1px solid rgba(255,255,255,0.06)' }}>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand column */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img
                  src="/logo.png"
                  alt="BAZA"
                  className="w-10 h-10 rounded-lg object-contain bg-white p-0.5"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span
                  className="text-xl font-black text-white tracking-tight"
                  style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', letterSpacing: '-0.03em' }}
                >
                  BAZA<span style={{ color: '#06B6D4' }}>.rw</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Rwanda's trusted marketplace to buy, sell, and rent houses, apartments, land, and vehicles.
              </p>
              <div
                className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg"
                style={{ background: 'rgba(6,182,212,0.12)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.2)' }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Sellers &amp; Brokers
              </div>
            </div>

            {/* Categories */}
            <div>
              <p className="text-xs font-semibold text-white mb-4">Browse</p>
              <ul className="space-y-2.5">
                {[
                  { label: 'Houses for Sale & Rent',   href: '/marketplace?category=houses' },
                  { label: 'Apartments in Kigali',     href: '/marketplace?category=apartments' },
                  { label: 'Residential & Farm Land',  href: '/marketplace?category=residential-land' },
                  { label: 'Vehicles & Transport',     href: '/marketplace?category=vehicle' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      className="text-sm transition-colors flex items-center gap-1.5 group"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#06B6D4')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div>
              <p className="text-xs font-semibold text-white mb-4">Account</p>
              <ul className="space-y-2.5">
                {[
                  { label: 'User Dashboard',     href: '/dashboard' },
                  { label: 'Verification Centre', href: '/verification' },
                  { label: 'Admin Console',       href: '/admin' },
                  { label: 'Notifications',       href: '/alerts' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      className="text-sm transition-colors flex items-center gap-1.5 group"
                      style={{ color: 'rgba(255,255,255,0.5)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#06B6D4')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="text-xs font-semibold text-white mb-4">Contact</p>
              <ul className="space-y-3">
                {[
                  { icon: <MapPin className="w-4 h-4 flex-shrink-0" />, text: 'Kigali, Gasabo, Rwanda' },
                  { icon: <Phone className="w-4 h-4 flex-shrink-0" />, text: '+250 788 000 000' },
                  { icon: <Mail className="w-4 h-4 flex-shrink-0" />,  text: 'support@baza.rw' },
                ].map(({ icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-2.5 text-sm"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    <span style={{ color: '#06B6D4' }}>{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }}
          >
            <p>© {new Date().getFullYear()} BAZA Marketplace. All rights reserved.</p>
            <p style={{ color: 'rgba(255,255,255,0.2)' }}>Built in Rwanda 🇷🇼 · 5 Provinces, 30 Districts</p>
          </div>
        </div>
      </footer>

      <MobileBottomNav />
    </div>
  );
};
