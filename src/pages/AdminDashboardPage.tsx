import React, { useState } from 'react';
import {
  Users, ShieldCheck, Building, Clock, AlertTriangle,
  CheckCircle, XCircle, RefreshCw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatCard } from '../components/common/StatCard';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/feedback/Skeleton';
import { EmptyState } from '../components/feedback/EmptyState';
import {
  useAdminStats,
  usePendingVerifications,
  usePendingListings,
  useVerificationActions,
  useListingModerationActions,
} from '../hooks/useAdmin';

export const AdminDashboardPage: React.FC = () => {
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useAdminStats();
  const { data: verifications = [], isLoading: verifLoading, refetch: refetchVerifs } = usePendingVerifications(10);
  const { data: listings = [], isLoading: listingsLoading, refetch: refetchListings } = usePendingListings(10);
  const verifActions = useVerificationActions();
  const listingActions = useListingModerationActions();

  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const submitReject = (type: 'verification' | 'listing', id: string) => {
    if (type === 'verification') {
      verifActions.reject({ id, reason: rejectReason || undefined });
    } else {
      listingActions.reject({ id, reason: rejectReason || undefined });
    }
    setRejectingId(null);
    setRejectReason('');
  };

  const timeAgo = (iso: string | null) => {
    if (!iso) return '—';
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-white">System Admin Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Monitor users, verification requests, and pending listings.</p>
        </div>
        <button
          onClick={() => { refetchStats(); refetchVerifs(); refetchListings(); }}
          className="text-slate-400 hover:text-white transition-colors"
          title="Refresh all"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl bg-slate-800" />)
        ) : (
          <>
            <StatCard title="Total Users" value={stats?.totalUsers?.toLocaleString() ?? '0'} icon={<Users className="w-5 h-5" />} color="sky" />
            <StatCard title="Total Listings" value={stats?.totalListings?.toLocaleString() ?? '0'} icon={<Building className="w-5 h-5" />} color="navy" />
            <StatCard title="Pending Review" value={String(stats?.pendingListings ?? 0)} icon={<Clock className="w-5 h-5" />} color="amber" />
            <StatCard title="Pending Verifications" value={String(stats?.pendingVerifications ?? 0)} icon={<ShieldCheck className="w-5 h-5" />} color="emerald" />
          </>
        )}
      </div>

      {/* Reject Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-sm font-bold text-baza-navy">Rejection Reason (optional)</h3>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full border border-baza-border rounded-baza p-3 text-xs resize-none h-24 focus:outline-none focus:ring-2 focus:ring-baza-navy"
              placeholder="Explain why this is being rejected..."
            />
            <div className="flex gap-3 justify-end">
              <Button variant="outline" size="sm" onClick={() => { setRejectingId(null); setRejectReason(''); }}>Cancel</Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  // Detect type from the id being rejected
                  const isVerif = verifications.some(v => v.id === rejectingId);
                  submitReject(isVerif ? 'verification' : 'listing', rejectingId);
                }}
              >
                Confirm Rejection
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Pending Verifications */}
      <Card padding="none" className="bg-slate-950 border-slate-800 text-slate-100">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Pending User Verifications</h3>
          <span className="text-xs text-baza-green font-mono">
            {verifLoading ? '...' : `${verifications.length} in queue`}
          </span>
        </div>
        {verifLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 rounded bg-slate-800" />)}
          </div>
        ) : verifications.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-400">✅ No pending verification requests</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-3">Applicant</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Submitted</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {verifications.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-white block">{v.userName}</span>
                      <span className="text-slate-400">{v.userEmail}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-baza-green font-bold">{v.verificationType}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{timeAgo(v.submittedAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          isLoading={verifActions.isApproving}
                          onClick={() => verifActions.approve(v.id)}
                          leftIcon={<CheckCircle className="w-3.5 h-3.5" />}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          isLoading={verifActions.isRejecting}
                          onClick={() => setRejectingId(v.id)}
                          leftIcon={<XCircle className="w-3.5 h-3.5" />}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Pending Listings */}
      <Card padding="none" className="bg-slate-950 border-slate-800 text-slate-100">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Listings Pending Review</h3>
          <span className="text-xs text-amber-400 font-mono">
            {listingsLoading ? '...' : `${listings.length} in queue`}
          </span>
        </div>
        {listingsLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 rounded bg-slate-800" />)}
          </div>
        ) : listings.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-400">✅ No listings pending review</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-3">Listing Title</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Seller</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Submitted</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {listings.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="px-6 py-4 font-bold text-white max-w-[200px] truncate">
                      <Link to={`/listings/${l.slug}`} className="hover:text-baza-green transition-colors">{l.title}</Link>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{l.category}</td>
                    <td className="px-6 py-4 text-slate-300">{l.ownerName}</td>
                    <td className="px-6 py-4 text-slate-100 font-semibold">
                      {l.price.toLocaleString()} {l.currency}
                    </td>
                    <td className="px-6 py-4 text-slate-400">{timeAgo(l.createdAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          isLoading={listingActions.isApproving}
                          onClick={() => listingActions.approve(l.id)}
                          leftIcon={<CheckCircle className="w-3.5 h-3.5" />}
                        >
                          Publish
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          isLoading={listingActions.isRejecting}
                          onClick={() => setRejectingId(l.id)}
                          leftIcon={<XCircle className="w-3.5 h-3.5" />}
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
