import React from 'react';
import { Outlet } from 'react-router-dom';
import { WebsiteHeader } from '../components/website/WebsiteHeader';
import { WebsiteFooter } from '../components/website/WebsiteFooter';

export const WebsiteLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A2A42] font-sans antialiased text-slate-100 selection:bg-[#00C9D7] selection:text-[#0A2A42]">
      <WebsiteHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <WebsiteFooter />
    </div>
  );
};
