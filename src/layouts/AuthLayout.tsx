import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden"
      style={{ background: '#0A2A42' }}
    >
      {/* Background decorative arcs (CSS only, no images) */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(6,182,212,0.06)', filter: 'blur(60px)' }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'rgba(249,115,22,0.06)', filter: 'blur(50px)' }}
      />

      {/* Logo */}
      <div className="mb-8 text-center relative z-10">
        <Link to="/" className="inline-flex flex-col items-center gap-3">
          <img
            src="/logo.png"
            alt="BAZA"
            className="w-16 h-16 rounded-xl object-contain bg-white p-1 shadow-lg"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div>
            <div
              className="text-3xl font-black text-white tracking-tight"
              style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', letterSpacing: '-0.04em' }}
            >
              BAZA<span style={{ color: '#06B6D4' }}>.rw</span>
            </div>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Rwanda's Trusted Real Estate &amp; Vehicle Marketplace
            </p>
          </div>
        </Link>
      </div>

      {/* Auth card */}
      <div
        className="w-full max-w-md rounded-baza-xl p-7 sm:p-8 relative z-10"
        style={{
          background: '#FFFFFF',
          boxShadow: '0 24px 60px -12px rgba(0,0,0,0.35)',
        }}
      >
        <Outlet />
      </div>

      {/* Back link */}
      <div className="mt-6 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
          style={{ color: 'rgba(255,255,255,0.45)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#06B6D4')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Homepage
        </Link>
      </div>
    </div>
  );
};
