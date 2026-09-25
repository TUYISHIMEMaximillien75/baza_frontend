import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { DesktopHeader } from '../components/navigation/DesktopHeader';
import { MobileBottomNav } from '../components/navigation/MobileBottomNav';
import { ShieldCheck, Heart, MapPin, Phone, Mail } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-baza-bg pb-16 md:pb-0">
      <DesktopHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-baza-navy text-white mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-baza bg-baza-green flex items-center justify-center text-white font-extrabold text-lg">
                  B
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  BAZA<span className="text-baza-green">.rw</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Rwanda’s trusted mobile-first marketplace to buy, sell, and rent houses, apartments, land, and vehicles.
              </p>
              <div className="flex items-center gap-2 text-xs text-baza-green font-semibold">
                <ShieldCheck className="w-4 h-4" /> Verified Sellers & Brokers
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Categories</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/marketplace?category=houses" className="hover:text-baza-green">Houses for Sale & Rent</Link></li>
                <li><Link to="/marketplace?category=apartments" className="hover:text-baza-green">Apartments in Kigali</Link></li>
                <li><Link to="/marketplace?category=land" className="hover:text-baza-green">Residential & Farm Land</Link></li>
                <li><Link to="/marketplace?category=vehicle" className="hover:text-baza-green">Cars & SUVs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Account & Admin</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link to="/dashboard" className="hover:text-baza-green">User Dashboard</Link></li>
                <li><Link to="/verification" className="hover:text-baza-green">Verification Centre</Link></li>
                <li><Link to="/admin" className="hover:text-baza-green">Admin Console</Link></li>
                <li><Link to="/alerts" className="hover:text-baza-green">Notifications</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Contact Support</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-baza-green" /> Kigali, Gasabo, Rwanda</li>
                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-baza-green" /> +250 788 000 000</li>
                <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-baza-green" /> support@baza.rw</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} BAZA Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <MobileBottomNav />
    </div>
  );
};
