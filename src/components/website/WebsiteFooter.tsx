import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export const WebsiteFooter: React.FC = () => {
  return (
    <footer style={{ background: '#071D2F', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5" aria-label="BAZA home">
              <div className="w-9 h-9 rounded bg-white p-0.5 flex items-center justify-center">
                <img src="/logo.png" alt="" className="w-full h-full object-contain" />
              </div>
              <span
                className="font-bold text-lg text-white tracking-tight"
                style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', letterSpacing: '-0.02em' }}
              >
                BAZA<span style={{ color: '#06B6D4' }}>.rw</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Rwanda's marketplace to buy, sell, and rent houses, land, and vehicles — across all five provinces.
            </p>
          </div>

          {/* Browse */}
          <div>
            <p className="text-xs font-semibold text-white mb-4">Browse</p>
            <ul className="space-y-3">
              {[
                { label: 'Houses for sale & rent', href: '/marketplace?category=houses' },
                { label: 'Apartments in Kigali',  href: '/marketplace?category=apartments' },
                { label: 'Land & farm plots',      href: '/marketplace?category=residential-land' },
                { label: 'Vehicles & transport',   href: '/marketplace?category=vehicle' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <p className="text-xs font-semibold text-white mb-4">Platform</p>
            <ul className="space-y-3">
              {[
                { label: 'About BAZA',       href: '/about' },
                { label: 'How trust works',  href: '/trust' },
                { label: 'Categories',       href: '/categories' },
                { label: 'Dashboard',        href: '/dashboard' },
                { label: 'Post a listing',   href: '/listings/new' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                  >
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
                { icon: <Phone className="w-4 h-4 flex-shrink-0" />,  text: '+250 788 000 000' },
                { icon: <Mail className="w-4 h-4 flex-shrink-0" />,   text: 'support@baza.rw' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <span style={{ color: '#06B6D4' }}>{icon}</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.28)' }}
        >
          <p>© {new Date().getFullYear()} BAZA Marketplace. All rights reserved.</p>
          <p>Built in Rwanda 🇷🇼 · 5 Provinces, 30 Districts</p>
        </div>
      </div>
    </footer>
  );
};
