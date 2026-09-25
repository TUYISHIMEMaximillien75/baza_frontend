import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { Shield, Users, CheckSquare, Building, AlertTriangle, Layers, MapPin, ArrowLeft } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const adminMenu = [
    { label: 'Overview', href: '/admin', icon: <Shield className="w-4 h-4" /> },
    { label: 'Users', href: '/admin/users', icon: <Users className="w-4 h-4" /> },
    { label: 'Verifications', href: '/admin/verifications', icon: <CheckSquare className="w-4 h-4" /> },
    { label: 'Listings', href: '/admin/listings', icon: <Building className="w-4 h-4" /> },
    { label: 'Reports', href: '/admin/reports', icon: <AlertTriangle className="w-4 h-4" /> },
    { label: 'Categories', href: '/admin/categories', icon: <Layers className="w-4 h-4" /> },
    { label: 'Locations', href: '/admin/locations', icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between p-4 hidden md:flex">
        <div>
          <div className="flex items-center gap-2 pb-6 border-b border-slate-800">
            <div className="w-9 h-9 rounded-baza bg-baza-green text-white font-extrabold flex items-center justify-center text-lg">
              B
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">BAZA Admin</h3>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest">Management Console</p>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            {adminMenu.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-baza text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-baza-green text-white font-bold shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="md:hidden text-slate-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">BAZA Administration</h2>
          </div>
          <div className="text-xs text-slate-400 font-mono">Control Panel</div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
