import React from 'react';
import { MapPin, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ListingItem } from '../../types';
import { VerificationBadge } from '../ui/VerificationBadge';
import { useToggleSave } from '../../hooks/useSavedListings';
import { useSessionStore } from '../../store';

export interface ListingCardProps {
  listing: ListingItem;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { isAuthenticated } = useSessionStore();
  const { isSaved, toggle: toggleSave, isLoading: saveLoading } = useToggleSave(listing.id);

  const formattedPrice = new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: listing.currency || 'RWF',
    maximumFractionDigits: 0,
  }).format(listing.price);

  return (
    <div
      className="group flex flex-col overflow-hidden transition-all duration-250"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E1DA',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(13,30,44,0.05)',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 20px -4px rgba(13,30,44,0.12)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#D4CFC7'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px 0 rgba(13,30,44,0.05)'; (e.currentTarget as HTMLDivElement).style.borderColor = '#E5E1DA'; }}
    >
      {/* ── Image ── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ background: '#E8E4DC' }}>
        <img
          src={listing.coverImageUrl || FALLBACK_IMAGE}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
        />

        {/* Purpose badge — top-left, small and readable */}
        <span
          className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded"
          style={
            listing.purpose === 'SALE'
              ? { background: '#C17D2E', color: '#fff' }   // Sun amber for sale
              : { background: '#0A2A42', color: '#fff' }   // Navy for rent
          }
        >
          {listing.purpose === 'SALE' ? 'For sale' : 'For rent'}
        </span>

        {/* Verification badge — top-right */}
        {listing.isVerified && (
          <div className="absolute top-2.5 right-2.5">
            <VerificationBadge type="VERIFIED_LISTING" />
          </div>
        )}

        {/* Save button */}
        {isAuthenticated && (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!saveLoading) toggleSave();
            }}
            disabled={saveLoading}
            className={`absolute bottom-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-sm transition-all duration-150 ${
              isSaved
                ? 'bg-white text-rose-500 shadow-md scale-110'
                : 'bg-black/30 text-white hover:bg-white hover:text-rose-500'
            } ${saveLoading ? 'opacity-60 cursor-wait' : ''}`}
            aria-label={isSaved ? 'Remove from saved' : 'Save listing'}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      {/* ── Card content — price lives here, not on the image ── */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category — plain text, not ALL-CAPS eyebrow */}
        <p
          className="text-xs mb-1.5"
          style={{ color: '#8A9099', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
        >
          {listing.category}
        </p>

        {/* Title — Plus Jakarta Sans for UI cards (DM Serif is for editorial headings) */}
        <Link to={`/listings/${listing.slug}`} className="block">
          <h3
            className="text-sm font-semibold line-clamp-1 leading-snug transition-colors"
            style={{ color: '#0D1E2C', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C17D2E')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#0D1E2C')}
          >
            {listing.title}
          </h3>
        </Link>

        {/* Location */}
        {listing.location && (
          <div className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: '#8A9099', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
            <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden />
            <span className="truncate max-w-[130px]">{listing.location}</span>
          </div>
        )}

        {/* Footer — price is the primary data, bold Sun amber */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span
              className="text-sm font-bold tabular-nums"
              style={{ color: '#C17D2E', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
            >
              {formattedPrice}
            </span>
            {listing.purpose === 'RENT' && (
              <span className="text-xs ml-1" style={{ color: '#8A9099', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>/ mo</span>
            )}
          </div>
          <Link
            to={`/listings/${listing.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold transition-colors focus:outline-none focus:underline"
            style={{ color: '#0A2A42', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#C17D2E')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#0A2A42')}
          >
            View
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
