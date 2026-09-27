import React from 'react';
import { PlusCircle, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VerificationBadge } from '../components/ui/VerificationBadge';
import { Skeleton } from '../components/feedback/Skeleton';
import { useCurrentUser, useDashboardStats } from '../hooks/useCurrentUser';
import { useMyListings } from '../hooks/useListings';
import { useSessionStore } from '../store';
import type { ListingItem } from '../types';

/* ─── CSS injected once for the hero animation (the single purposeful motion) ─── */
const DASHBOARD_STYLES = `
  @keyframes bazaAccentGrow {
    from { transform: scaleX(0); transform-origin: left center; }
    to   { transform: scaleX(1); transform-origin: left center; }
  }
  .baza-accent-grow {
    animation: bazaAccentGrow 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  @keyframes bazaPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.35; }
  }
  .baza-pulse-dot {
    animation: bazaPulse 2.4s ease-in-out infinite;
  }
`;

/* ─── Category monogram (grounded in the actual subject matter, not SaaS icons) ─── */
interface MonogramMeta { short: string; bg: string; fg: string }

function getMonogram(category: string, slug: string): MonogramMeta {
  const s = (slug || category || '').toLowerCase();
  if (s.includes('vehicle') || s.includes('car') || s.includes('truck') || s.includes('moto'))
    return { short: 'CAR', bg: '#E9F0EA', fg: '#1E4D3A' };  // hillside green — Rwanda's verdant roads
  if (s.includes('apartment') || s.includes('flat') || s.includes('studio'))
    return { short: 'APT', bg: '#EBF0F7', fg: '#2A4070' };  // urban sky
  if (s.includes('land') || s.includes('plot') || s.includes('farm'))
    return { short: 'LND', bg: '#F4EDE6', fg: '#7C4A22' };  // Rwanda's red-clay laterite soil
  if (s.includes('commercial') || s.includes('office') || s.includes('shop'))
    return { short: 'COM', bg: '#EFE8F5', fg: '#52357A' };
  if (s.includes('house') || s.includes('villa') || s.includes('property') || s.includes('home'))
    return { short: 'HSE', bg: '#E6EEF4', fg: '#1A3550' };  // shelter blue
  // fallback — derive from category name
  return { short: category.replace(/\s+/g, '').slice(0, 3).toUpperCase() || '—', bg: '#F0F0EE', fg: '#555' };
}

/* ─── Status meta (no green-dot pills — left border + plain text does the work) ─── */
interface StatusMeta { border: string; label: string; labelColor: string }

function getStatusMeta(status: ListingItem['status']): StatusMeta {
  switch (status) {
    case 'PUBLISHED':
    case 'APPROVED':
      return { border: '#1E4D3A', label: 'Live on BAZA', labelColor: '#1E4D3A' };
    case 'PENDING_REVIEW':
      return { border: '#C25D27', label: 'Awaiting review', labelColor: '#A04A1A' };
    case 'CHANGES_REQUESTED':
      return { border: '#C25D27', label: 'Changes needed', labelColor: '#A04A1A' };
    case 'DRAFT':
      return { border: '#C0BDB8', label: 'Draft — not posted', labelColor: '#888580' };
    case 'SOLD':
      return { border: '#0A2A42', label: 'Sold', labelColor: '#0A2A42' };
    case 'RENTED':
      return { border: '#0A2A42', label: 'Rented out', labelColor: '#0A2A42' };
    case 'REJECTED':
      return { border: '#B91C1C', label: 'Rejected', labelColor: '#B91C1C' };
    case 'SUSPENDED':
    case 'ARCHIVED':
      return { border: '#9CA3AF', label: status.charAt(0) + status.slice(1).toLowerCase(), labelColor: '#6B7280' };
    default:
      return { border: '#C0BDB8', label: status, labelColor: '#888580' };
  }
}

/* ─── Main component ─── */
export const DashboardPage: React.FC = () => {
  const { user: sessionUser } = useSessionStore();
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: myListingsData, isLoading: listingsLoading } = useMyListings({ limit: 6 });

  const displayUser = currentUser ?? sessionUser;
  const firstName = (displayUser as any)?.firstName ?? sessionUser?.firstName ?? 'there';
  const roles     = (displayUser as any)?.roles ?? sessionUser?.roles ?? [];
  const primaryRole = Array.isArray(roles) ? roles[0] : roles;

  const isVerified = primaryRole === 'SELLER' || primaryRole === 'BROKER' || primaryRole === 'DEALER';

  const activeCount  = stats?.approved ?? 0;
  const pendingCount = stats?.pending  ?? 0;
  const totalCount   = stats?.total    ?? 0;
  const soldCount    = stats?.sold     ?? 0;

  const listings = myListingsData?.items ?? [];

  return (
    <>
      {/* Inject animation keyframes — only ever rendered once */}
      <style dangerouslySetInnerHTML={{ __html: DASHBOARD_STYLES }} />

      <div className="space-y-5">

        {/* ════════════════════════════════════════════
            HERO — the deliberate typographic moment.
            A warm surface, a large DM Serif name — the single
            bold statement. The amber accent line is the only animation.
            ════════════════════════════════════════════ */}
        <div
          className="relative overflow-hidden rounded-xl"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E1DA',
            borderLeft: '4px solid #C17D2E',  /* Sun amber left accent — the bold moment */
          }}
        >
          {/* ── Amber accent line: the single purposeful animation ── */}
          <div
            className="baza-accent-grow absolute top-0 left-0 right-0 h-[2px] rounded-t-xl"
            style={{ background: 'linear-gradient(90deg, #C17D2E 0%, #A06020 55%, transparent 100%)' }}
          />

          <div className="px-7 pt-10 pb-9 sm:px-10">
            {/* Context label — quiet, specific */}
            <p
              className="text-xs font-semibold"
              style={{
                color: '#8A9099',
                letterSpacing: '0.04em',
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              }}
            >
              Seller workspace
            </p>

            {/* Primary typographic moment: DM Serif Display name */}
            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              {userLoading ? (
                <div
                  className="rounded h-12 w-52"
                  style={{ background: '#E8E4DC' }}
                />
              ) : (
                <h1
                  className="text-baza-text-primary leading-none"
                  style={{
                    fontFamily: '"DM Serif Display", Georgia, serif',
                    fontSize: 'clamp(2.1rem, 5vw, 3.2rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {firstName}
                </h1>
              )}
              {primaryRole && <VerificationBadge type={primaryRole as any} />}
            </div>

            {/* Inline live stats — specific, not generic subtitle copy */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              {statsLoading ? (
                <div className="h-4 w-48 rounded" style={{ background: '#E8E4DC' }} />
              ) : (
                <>
                  <span className="text-sm" style={{ color: '#4A5568', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                    <span className="font-black" style={{ color: '#0D1E2C' }}>{activeCount}</span>{' '}
                    {activeCount === 1 ? 'listing' : 'listings'} live
                  </span>
                  {pendingCount > 0 && (
                    <>
                      <span style={{ color: '#D4CFC7' }}>·</span>
                      <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#C25D27', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                        <span
                          className="baza-pulse-dot inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: '#C25D27' }}
                        />
                        {pendingCount} awaiting review
                      </span>
                    </>
                  )}
                  {activeCount === 0 && pendingCount === 0 && (
                    <span className="text-sm" style={{ color: '#8A9099', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                      No active listings yet — post your first below.
                    </span>
                  )}
                </>
              )}
            </div>

            {/* CTA — Sun amber, consistent verb */}
            <div className="mt-7">
              <Link
                to="/listings/new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-bold text-white
                           focus:outline-none focus:ring-2 focus:ring-[#C17D2E] focus:ring-offset-2"
                style={{ background: '#C17D2E', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
              >
                <PlusCircle className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
                Post a listing
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            VERIFICATION STRIP
            Only visible when not yet verified — no need
            to congratulate the verified seller every visit.
            ══════════════════════════════════════════════ */}
        {!isVerified && (
          <div
            className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl"
            style={{
              background: '#FDFCFB',
              border: '1px solid #E5E1DA',
              borderLeft: '3px solid #06B6D4',
            }}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" style={{ color: '#06B6D4' }} aria-hidden="true" />
              <p className="text-xs font-medium text-slate-600">
                Get your seller badge — submit your documents to be verified on BAZA.
              </p>
            </div>
            <Link
              to="/verification"
              className="text-xs font-bold whitespace-nowrap focus:outline-none focus:underline"
              style={{ color: '#06B6D4' }}
            >
              Start →
            </Link>
          </div>
        )}

        {/* ══════════════════════════════════════════════
            STATS — real hierarchy, not four identical boxes.

            Left zone (2/3 width): "Right now" — what a seller
            checks every morning. Numbers are large enough to
            read without glasses across a desk.

            Right zone (1/3 width): "Your record" — historical,
            useful but not urgent. Typographically smaller and
            quieter. No icon squares, no colored badge chips.
            ══════════════════════════════════════════════ */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)' }}
        >
          {/* Live zone */}
          <div
            className="rounded-xl p-6"
            style={{ background: '#fff', border: '1px solid #E5E1DA' }}
          >
            <p className="text-[11px] font-bold text-slate-400 mb-5" style={{ letterSpacing: '0.05em' }}>
              Right now
            </p>
            <div className="flex flex-col sm:flex-row gap-7 sm:gap-10">
              {/* Active — the primary number */}
              <div>
                <div
                  className="font-black text-[#0A2A42] leading-none"
                  style={{ fontSize: 'clamp(2.8rem,6vw,3.6rem)', fontVariantNumeric: 'tabular-nums' }}
                  aria-label={`${activeCount} active listings`}
                >
                  {statsLoading ? <Skeleton className="h-14 w-20 inline-block rounded-lg" /> : activeCount}
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-700">active listings</p>
                <p className="mt-0.5 text-xs text-slate-400">live on BAZA right now</p>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px self-stretch bg-slate-100" />
              <div className="block sm:hidden h-px w-full bg-slate-100" />

              {/* Pending — urgent if > 0, subdued if 0 */}
              <div>
                <div
                  className="font-black leading-none"
                  style={{
                    fontSize: 'clamp(2rem,4.5vw,2.8rem)',
                    fontVariantNumeric: 'tabular-nums',
                    color: pendingCount > 0 ? '#C25D27' : '#D1CBC4',
                  }}
                  aria-label={`${pendingCount} listings awaiting review`}
                >
                  {statsLoading ? <Skeleton className="h-11 w-16 inline-block rounded-lg" /> : pendingCount}
                </div>
                <p
                  className="mt-2 text-sm font-semibold"
                  style={{ color: pendingCount > 0 ? '#8B3F15' : '#A8A19A' }}
                >
                  awaiting review
                </p>
                {pendingCount > 0 ? (
                  <p className="mt-0.5 flex items-center gap-1 text-xs" style={{ color: '#B34E1A' }}>
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    Usually reviewed within 24 h
                  </p>
                ) : (
                  <p className="mt-0.5 text-xs" style={{ color: '#BDB8B2' }}>
                    none in queue
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Historical ledger — quieter, smaller */}
          <div
            className="rounded-xl p-5"
            style={{ background: '#FDFCFB', border: '1px solid #E5E1DA' }}
          >
            <p className="text-[11px] font-bold text-slate-400 mb-5" style={{ letterSpacing: '0.05em' }}>
              Your record
            </p>
            <div className="space-y-5">
              <div>
                <div
                  className="text-3xl font-bold text-slate-600 leading-none"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                  aria-label={`${totalCount} listings total ever posted`}
                >
                  {statsLoading ? <Skeleton className="h-8 w-10 inline-block rounded" /> : totalCount}
                </div>
                <p className="mt-1.5 text-xs text-slate-400">posted in total</p>
              </div>
              <div className="h-px bg-slate-100" />
              <div>
                <div
                  className="text-3xl font-bold text-slate-600 leading-none"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                  aria-label={`${soldCount} listings sold or rented`}
                >
                  {statsLoading ? <Skeleton className="h-8 w-10 inline-block rounded" /> : soldCount}
                </div>
                <p className="mt-1.5 text-xs text-slate-400">sold or rented</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            LISTINGS FEED
            Card rows instead of a bare table.
            A house listing and a car listing are different
            objects: the category monogram + left-border status
            makes that legible at a glance. No uppercase headers.
            No status pill badges.
            ══════════════════════════════════════════════ */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid #E5E1DA', background: '#fff' }}
        >
          {/* Feed header */}
          <div
            className="flex items-center justify-between px-5 py-4"
            style={{ borderBottom: '1px solid #EDE9E2' }}
          >
            <h2 className="text-sm font-bold text-slate-900">Recent listings</h2>
            <Link
              to="/my-listings"
              className="inline-flex items-center gap-1 text-xs font-semibold focus:outline-none focus:underline"
              style={{ color: '#06B6D4' }}
            >
              See all
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>

          {/* Loading skeletons */}
          {listingsLoading && (
            <div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 px-5 py-4"
                  style={{ borderBottom: i < 2 ? '1px solid #F5F2EE' : undefined }}
                >
                  <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3.5 w-3/5 rounded" />
                    <Skeleton className="h-3 w-2/5 rounded" />
                  </div>
                  <Skeleton className="h-4 w-24 rounded" />
                </div>
              ))}
            </div>
          )}

          {/* Empty state — BAZA voice, not generic placeholder */}
          {!listingsLoading && listings.length === 0 && (
            <div className="px-5 py-16 text-center">
              <p className="text-base font-bold text-slate-800">
                Your listings will appear here.
              </p>
              <p className="mt-2 text-sm text-slate-500 max-w-xs mx-auto">
                Got a house, plot, or vehicle to sell in Rwanda?
                Post it on BAZA — it takes under 5 minutes.
              </p>
              <Link
                to="/listings/new"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white
                           focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2"
                style={{ background: '#F97316' }}
              >
                <PlusCircle className="w-4 h-4" aria-hidden="true" />
                Post your first listing
              </Link>
            </div>
          )}

          {/* Listing rows */}
          {!listingsLoading && listings.length > 0 && (
            <div>
              {listings.map((listing, idx) => {
                const mono   = getMonogram(listing.category, listing.categorySlug);
                const sm     = getStatusMeta(listing.status);
                const isLast = idx === listings.length - 1;

                return (
                  <div
                    key={listing.id}
                    className="flex items-center gap-4 px-5 py-4"
                    style={{
                      borderBottom: isLast ? 'none' : '1px solid #F5F2EE',
                      borderLeft: `3px solid ${sm.border}`,
                    }}
                  >
                    {/* Category monogram — replaces icon-in-a-rounded-square */}
                    <div
                      className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
                      style={{ background: mono.bg }}
                      aria-label={listing.category}
                    >
                      <span
                        className="text-[9px] font-black leading-none"
                        style={{ color: mono.fg, letterSpacing: '0.04em' }}
                      >
                        {mono.short}
                      </span>
                    </div>

                    {/* Title + status phrase */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/listings/${listing.slug}`}
                        className="block text-sm font-semibold text-slate-900 truncate
                                   hover:text-[#0A2A42] focus:outline-none focus:underline"
                      >
                        {listing.title}
                      </Link>
                      <span
                        className="text-[11px] font-medium mt-0.5 block"
                        style={{ color: sm.labelColor }}
                      >
                        {sm.label}
                      </span>
                    </div>

                    {/* For Sale / For Rent tag — small, contextual */}
                    <div className="hidden sm:block flex-shrink-0">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={
                          listing.purpose === 'RENT'
                            ? { background: '#EBF0F7', color: '#2A4070' }
                            : { background: '#E9F0EA', color: '#1E4D3A' }
                        }
                      >
                        {listing.purpose === 'RENT' ? 'For rent' : 'For sale'}
                      </span>
                    </div>

                    {/* Price — the most important data point, rightmost, largest */}
                    <div className="text-right flex-shrink-0 ml-1">
                      <div
                        className="text-sm font-black text-slate-900 tabular-nums"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {listing.price.toLocaleString()}
                      </div>
                      <div className="text-[10px] font-medium text-slate-400 mt-px">
                        {listing.currency}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
