import React from 'react';
import { Home, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-baza-navy text-3xl font-black">
        404
      </div>
      <h1 className="text-2xl font-extrabold text-baza-navy">Page Not Found</h1>
      <p className="text-xs text-baza-text-secondary max-w-md">
        The page or listing you are looking for might have been removed, renamed, or is temporarily unavailable.
      </p>
      <div className="flex gap-3 pt-2">
        <Link to="/">
          <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
        <Link to="/marketplace">
          <Button variant="outline" size="md" leftIcon={<Search className="w-4 h-4" />}>
            Search Marketplace
          </Button>
        </Link>
      </div>
    </div>
  );
};
