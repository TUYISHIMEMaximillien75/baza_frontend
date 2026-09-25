import React from 'react';
import { Heart } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { ListingCard } from '../components/common/ListingCard';
import { Skeleton } from '../components/feedback/Skeleton';
import { EmptyState } from '../components/feedback/EmptyState';
import { useSavedListings } from '../hooks/useSavedListings';
import { ListingItem } from '../types';

export const SavedCollectionPage: React.FC = () => {
  const { data: savedListings, isLoading } = useSavedListings();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved Collection"
        description="Properties and vehicles you've bookmarked for easy reference."
        action={
          savedListings && savedListings.length > 0 ? (
            <div className="flex items-center gap-2 text-xs text-baza-text-secondary">
              <Heart className="w-4 h-4 text-red-500" />
              <span>{savedListings.length} saved item{savedListings.length !== 1 ? 's' : ''}</span>
            </div>
          ) : undefined
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : savedListings && savedListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {savedListings.map((item) => (
            <ListingCard key={item.savedId} listing={item as unknown as ListingItem} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No saved listings yet"
          description="Tap the heart icon on any listing in the Marketplace to save it here for later."
          actionLabel="Browse Marketplace"
          onAction={() => window.location.href = '/marketplace'}
        />
      )}
    </div>
  );
};
