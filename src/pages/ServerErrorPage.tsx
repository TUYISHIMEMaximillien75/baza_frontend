import React from 'react';
import { ServerCrash, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ServerErrorPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
        <ServerCrash className="w-10 h-10" />
      </div>
      <h1 className="text-2xl font-extrabold text-baza-navy">Server Error (500)</h1>
      <p className="text-xs text-baza-text-secondary max-w-md">
        An unexpected server error occurred. Our team has been notified. Please try refreshing.
      </p>
      <Button variant="primary" size="md" onClick={() => window.location.reload()} leftIcon={<RefreshCw className="w-4 h-4" />}>
        Refresh Page
      </Button>
    </div>
  );
};
