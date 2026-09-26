import React from 'react';
import { Home, Search, PlusCircle, Bell, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const MobileBottomNav: React.FC = () => {
  const items = [
    { label: 'Home',     href: '/',           icon: <Home className="w-5 h-5" /> },
    { label: 'Browse',   href: '/marketplace', icon: <Search className="w-5 h-5" /> },
    { label: 'Sell',     href: '/listings/new', icon: <PlusCircle className="w-6 h-6" />, isAction: true },
    { label: 'Alerts',   href: '/alerts',      icon: <Bell className="w-5 h-5" /> },
    { label: 'Account',  href: '/profile',     icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl"
      style={{
        background: 'rgba(10,42,66,0.97)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 -4px 20px rgba(10,42,66,0.25)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around px-2 py-1">
        {items.map((item) => {
          if (item.isAction) {
            return (
              <NavLink
                key={item.label}
                to={item.href}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center ring-4 ring-[#0A2A42] active:scale-95 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #F97316 0%, #EF4444 100%)',
                    boxShadow: '0 4px 14px rgba(249,115,22,0.45)',
                  }}
                >
                  <PlusCircle className="w-6 h-6 text-white" />
                </div>
                <span
                  className="text-[9px] font-bold mt-1"
                  style={{ color: '#F97316', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center py-1.5 px-3 text-[10px] font-semibold transition-colors rounded-lg ${
                  isActive
                    ? 'text-[#06B6D4]'
                    : 'text-white/45 hover:text-white/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`transition-transform ${isActive ? 'scale-110' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="mt-0.5">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
