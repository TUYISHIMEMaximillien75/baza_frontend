import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-baza-bg px-4 py-12">
      <div className="mb-6 text-center">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="w-10 h-10 rounded-baza bg-baza-navy text-baza-green font-extrabold flex items-center justify-center text-2xl shadow-md">
            B
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-baza-navy">
            BAZA<span className="text-baza-green">.rw</span>
          </span>
        </Link>
        <p className="text-xs text-baza-text-secondary mt-1">Rwanda's Trusted Real Estate & Vehicle Marketplace</p>
      </div>

      <div className="w-full max-w-md bg-white border border-baza-border rounded-2xl shadow-baza-lg p-6 sm:p-8">
        <Outlet />
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <Link to="/" className="text-xs text-baza-text-secondary hover:text-baza-green transition-colors">
          &larr; Back to Homepage
        </Link>
      </div>
    </div>
  );
};
