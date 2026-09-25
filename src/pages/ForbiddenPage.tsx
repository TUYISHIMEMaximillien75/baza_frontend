import React from 'react';
import { ShieldAlert, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const ForbiddenPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-baza-error">
        <ShieldAlert className="w-10 h-10" />
      </div>
      <h1 className="text-2xl font-extrabold text-baza-navy">Access Restricted (403)</h1>
      <p className="text-xs text-baza-text-secondary max-w-md">
        You do not have permission to view this section or perform this administrative action.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};
