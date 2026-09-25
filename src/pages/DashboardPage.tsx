import React from 'react';
import { PlusCircle, ShieldCheck, Clock, CheckCircle2, ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatCard } from '../components/common/StatCard';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { VerificationBadge } from '../components/ui/VerificationBadge';
import { Skeleton } from '../components/feedback/Skeleton';
import { useCurrentUser, useDashboardStats } from '../hooks/useCurrentUser';
import { useMyListings } from '../hooks/useListings';
import { useSessionStore } from '../store';

export const DashboardPage: React.FC = () => {
  const { user: sessionUser } = useSessionStore();
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: myListingsData, isLoading: listingsLoading } = useMyListings({ limit: 5 });

  const displayUser = currentUser ?? sessionUser;
  const firstName = (displayUser as any)?.firstName ?? sessionUser?.firstName ?? 'there';
  const roles = (displayUser as any)?.roles ?? sessionUser?.roles ?? [];
  const primaryRole = Array.isArray(roles) ? roles[0] : roles;

  return (
    <div className="space-y-6">
      {/* Greeting Banner */}
      <div className="bg-gradient-to-r from-baza-navy to-slate-800 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            {userLoading ? (
              <Skeleton className="h-7 w-48 bg-white/20 rounded" />
            ) : (
              <h1 className="text-xl font-bold text-white">Hello, {firstName}!</h1>
            )}
            {primaryRole && <VerificationBadge type={primaryRole as any} />}
          </div>
          <p className="text-xs text-slate-300 mt-1">Manage your active property and vehicle listings on BAZA.</p>
        </div>
        <Link to="/listings/new">
          <Button variant="primary" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
            Create New Listing
          </Button>
        </Link>
      </div>

      {/* Verification Status Card */}
      <Card padding="md" className="border-l-4 border-l-baza-green bg-emerald-50/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-baza-green-light flex items-center justify-center text-baza-green-dark">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-baza-navy">
                Identity Verification: {primaryRole ? primaryRole.toUpperCase() : 'USER'}
              </h4>
              <p className="text-[11px] text-baza-text-secondary">
                {primaryRole === 'SELLER' || primaryRole === 'BROKER' || primaryRole === 'DEALER'
                  ? `Your account is verified as an active ${primaryRole} in Rwanda.`
                  : 'Submit your documents to get a verified seller badge.'}
              </p>
            </div>
          </div>
          <Link to="/verification" className="text-xs font-bold text-baza-green hover:underline">
            Verification Details &rarr;
          </Link>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
        ) : (
          <>
            <StatCard title="Total Listings" value={String(stats?.total ?? 0)} icon={<ShoppingBag className="w-5 h-5" />} color="navy" />
            <StatCard title="Approved" value={String(stats?.approved ?? 0)} icon={<CheckCircle2 className="w-5 h-5" />} color="emerald" />
            <StatCard title="Pending Review" value={String(stats?.pending ?? 0)} icon={<Clock className="w-5 h-5" />} color="amber" />
            <StatCard title="Sold or Rented" value={String(stats?.sold ?? 0)} icon={<Eye className="w-5 h-5" />} color="sky" />
          </>
        )}
      </div>

      {/* Recent Listings Table */}
      <Card padding="none">
        <div className="px-6 py-4 border-b border-baza-border flex items-center justify-between">
          <h3 className="text-sm font-bold text-baza-navy">My Recent Listings</h3>
          <Link to="/my-listings" className="text-xs font-bold text-baza-green hover:underline">View All &rarr;</Link>
        </div>
        <div className="overflow-x-auto">
          {listingsLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 rounded" />)}
            </div>
          ) : (myListingsData?.items ?? []).length === 0 ? (
            <div className="py-12 text-center text-xs text-baza-text-secondary">
              You haven't posted any listings yet.{' '}
              <Link to="/listings/new" className="text-baza-green font-bold hover:underline">Create your first listing</Link>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-baza-border text-baza-text-secondary uppercase font-semibold">
                <tr>
                  <th className="px-6 py-3">Listing Title</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-baza-border">
                {(myListingsData?.items ?? []).map((listing) => (
                  <tr key={listing.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-bold text-baza-navy max-w-xs truncate">{listing.title}</td>
                    <td className="px-6 py-4 text-baza-text-secondary">{listing.category}</td>
                    <td className="px-6 py-4 font-semibold text-baza-navy">
                      {listing.price.toLocaleString()} {listing.currency}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={listing.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/listings/${listing.slug}`} className="text-baza-green font-bold hover:underline">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
};
