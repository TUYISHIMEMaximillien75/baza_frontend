import React from 'react';
import { Home, Search, PlusCircle, Bell, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const MobileBottomNav: React.FC = () => {
  const items = [
    { label: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Search', href: '/marketplace', icon: <Search className="w-5 h-5" /> },
    {
      label: 'Add Listing',
      href: '/listings/new',
      icon: <PlusCircle className="w-6 h-6 text-white" />,
      isAction: true,
    },
    { label: 'Alerts', href: '/alerts', icon: <Bell className="w-5 h-5" /> },
    { label: 'Profile', href: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-baza-border shadow-lg px-2 py-1">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          if (item.isAction) {
            return (
              <NavLink
                key={item.label}
                to={item.href}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="w-12 h-12 rounded-full bg-baza-green shadow-lg flex items-center justify-center ring-4 ring-white active:scale-95 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold text-baza-green-dark mt-0.5">{item.label}</span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-3 text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-baza-green' : 'text-baza-text-secondary hover:text-baza-navy'
                }`
              }
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
