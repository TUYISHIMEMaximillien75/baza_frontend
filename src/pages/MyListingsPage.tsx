import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Eye, Trash2, AlertCircle } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Skeleton } from '../components/feedback/Skeleton';
import { EmptyState } from '../components/feedback/EmptyState';
import { Pagination } from '../components/ui/Pagination';
import { useMyListings } from '../hooks/useListings';
import listingsService from '../services/listingsService';
import { useQueryClient } from '@tanstack/react-query';

export const MyListingsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useMyListings({ page, limit: 10 });
  const listings = data?.items ?? [];
  const meta = data?.meta;

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await listingsService.deleteListing(id);
      queryClient.invalidateQueries({ queryKey: ['listings', 'me'] });
      refetch();
    } catch {
      // silently handle; toast would go here
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Listings"
        description="View and manage all your published and pending property or vehicle listings."
        action={
          <Link to="/listings/new">
            <Button variant="primary" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
              New Listing
            </Button>
          </Link>
        }
      />

      <Card padding="none">
        <div className="px-6 py-4 border-b border-baza-border">
          <h3 className="text-sm font-bold text-baza-navy">
            {meta ? `${meta.totalItems} listing${meta.totalItems !== 1 ? 's' : ''}` : 'Your Listings'}
          </h3>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 rounded" />)}
            </div>
          ) : listings.length === 0 ? (
            <EmptyState
              title="No listings yet"
              description="Post your first property or vehicle to start selling or renting on BAZA."
              actionLabel="Create First Listing"
              onAction={() => window.location.href = '/listings/new'}
            />
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-baza-border text-baza-text-secondary uppercase font-semibold">
                <tr>
                  <th className="px-6 py-3">Listing Title</th>
                  <th className="px-6 py-3 hidden sm:table-cell">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-baza-border">
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-bold text-baza-navy max-w-xs">
                      <span className="truncate block">{listing.title}</span>
                    </td>
                    <td className="px-6 py-4 text-baza-text-secondary hidden sm:table-cell">{listing.category}</td>
                    <td className="px-6 py-4 font-semibold text-baza-navy whitespace-nowrap">
                      {listing.price.toLocaleString()} {listing.currency}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={listing.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          to={`/listings/${listing.slug}`}
                          className="text-baza-green font-bold hover:underline flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </Link>
                        {confirmDelete === listing.id ? (
                          <span className="flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-baza-error" />
                            <button
                              onClick={() => handleDelete(listing.id)}
                              disabled={deletingId === listing.id}
                              className="text-baza-error font-bold hover:underline text-xs"
                            >
                              {deletingId === listing.id ? 'Deleting...' : 'Confirm'}
                            </button>
                            <button onClick={() => setConfirmDelete(null)} className="text-slate-400 hover:text-slate-600 text-xs">
                              Cancel
                            </button>
                          </span>
                        ) : (
                          <button
                            onClick={() => setConfirmDelete(listing.id)}
                            className="text-baza-error hover:underline flex items-center gap-1 font-bold"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {meta && meta.totalPages > 1 && (
          <div className="flex justify-center py-4 border-t border-baza-border">
            <Pagination currentPage={meta.currentPage} totalPages={meta.totalPages} onPageChange={setPage} />
          </div>
        )}
      </Card>
    </div>
  );
};
