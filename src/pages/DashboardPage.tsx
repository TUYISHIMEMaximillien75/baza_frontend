import React from 'react';
import { PlusCircle, ShieldCheck, Clock, CheckCircle2, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Greeting Banner */}
      <div className="relative bg-gradient-to-r from-baza-navy via-[#0F3554] to-baza-navy rounded-2xl p-6 sm:p-8 text-white border border-baza-navy/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden">
        {/* Subtle accent background glow */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-baza-cyan/10 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            {userLoading ? (
              <Skeleton className="h-8 w-48 bg-white/20 rounded-lg" />
            ) : (
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Hello, {firstName}!</h1>
            )}
            {primaryRole && <VerificationBadge type={primaryRole as any} />}
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-300 mt-1.5">
            Manage your active property and vehicle listings on BAZA Marketplace.
          </p>
        </div>

        <Link to="/listings/new" className="relative z-10 flex-shrink-0">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] shadow-sm active:scale-[0.98] transition-all duration-150"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Listing</span>
          </button>
        </Link>
      </div>

      {/* Identity Verification Status Card */}
      <div className="bg-white border border-slate-200 border-l-4 border-l-baza-cyan rounded-2xl p-5 shadow-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 text-baza-cyan flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-baza-navy uppercase tracking-wider">
              Identity Verification: {primaryRole ? primaryRole.toUpperCase() : 'USER'}
            </h4>
            <p className="text-xs font-medium text-slate-500 mt-0.5">
              {primaryRole === 'SELLER' || primaryRole === 'BROKER' || primaryRole === 'DEALER'
                ? `Your account is verified as an active ${primaryRole} in Rwanda.`
                : 'Submit your documents to get a verified seller badge.'}
            </p>
          </div>
        </div>
        <Link
          to="/verification"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-baza-cyan hover:text-baza-navy transition-colors whitespace-nowrap"
        >
          <span>Verification Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Unified Single Summary Panel for Metrics */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-none flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-slate-200 gap-6 md:gap-0">
        {/* Primary Metric: Total Listings */}
        <div className="md:pr-8 flex-1 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-baza-navy text-baza-cyan flex items-center justify-center flex-shrink-0 shadow-sm">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Total Listings</span>
            <h2 className="text-3xl sm:text-4xl font-black text-baza-navy tracking-tight mt-0.5">
              {statsLoading ? <Skeleton className="h-9 w-16" /> : (stats?.total ?? 0)}
            </h2>
            <span className="text-[11px] font-semibold text-slate-500 mt-0.5 inline-block">Active on Platform</span>
          </div>
        </div>

        {/* Secondary Metric 1: Approved */}
        <div className="md:px-8 pt-5 md:pt-0 flex-1 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5.5 h-5.5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 block">Approved</span>
            <p className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              {statsLoading ? <Skeleton className="h-7 w-12" /> : (stats?.approved ?? 0)}
            </p>
            <span className="text-[10px] font-medium text-emerald-600">Verified & Published</span>
          </div>
        </div>

        {/* Secondary Metric 2: Pending Review */}
        <div className="md:px-8 pt-5 md:pt-0 flex-1 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5.5 h-5.5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 block">Pending Review</span>
            <p className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              {statsLoading ? <Skeleton className="h-7 w-12" /> : (stats?.pending ?? 0)}
            </p>
            <span className="text-[10px] font-medium text-amber-600">Under Moderation</span>
          </div>
        </div>

        {/* Secondary Metric 3: Sold or Rented */}
        <div className="md:pl-8 pt-5 md:pt-0 flex-1 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center flex-shrink-0">
            <Eye className="w-5.5 h-5.5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 block">Sold or Rented</span>
            <p className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              {statsLoading ? <Skeleton className="h-7 w-12" /> : (stats?.sold ?? 0)}
            </p>
            <span className="text-[10px] font-medium text-sky-600">Completed Deals</span>
          </div>
        </div>
      </div>

      {/* Recent Listings Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-none">
        <div className="px-6 py-4.5 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-baza-navy tracking-tight">My Recent Listings</h3>
          <Link
            to="/my-listings"
            className="inline-flex items-center gap-1 text-xs font-bold text-baza-cyan hover:text-baza-navy transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {listingsLoading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 rounded-xl" />
              ))}
            </div>
          ) : (myListingsData?.items ?? []).length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-xs font-semibold text-slate-500">You haven't posted any listings yet.</p>
              <Link
                to="/listings/new"
                className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-baza-cyan hover:text-baza-navy transition-colors"
              >
                <span>Create your first listing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-6 py-3.5">Listing Title</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Price</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(myListingsData?.items ?? []).map((listing) => (
                  <tr key={listing.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-bold text-baza-navy max-w-xs truncate">{listing.title}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{listing.category}</td>
                    <td className="px-6 py-4 font-extrabold text-slate-900">
                      {listing.price.toLocaleString()} {listing.currency}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={listing.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/listings/${listing.slug}`}
                        className="text-baza-cyan font-bold hover:text-baza-navy transition-colors"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
