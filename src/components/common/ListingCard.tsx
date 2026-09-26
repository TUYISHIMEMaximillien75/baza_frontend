import React from 'react';
import { MapPin, Heart, Eye, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ListingItem } from '../../types';
import { Badge } from '../ui/Badge';
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
    <div className="group bg-white border border-baza-border rounded-baza shadow-baza hover:shadow-baza-lg hover:-translate-y-0.5 transition-all duration-250 overflow-hidden flex flex-col">
      {/* ── Image ── */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={listing.coverImageUrl || FALLBACK_IMAGE}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-400"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />

        {/* Gradient overlay — bottom for price legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(10,42,66,0.55) 0%, transparent 45%)',
          }}
        />

        {/* Purpose + verification badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
          <Badge variant={listing.purpose === 'SALE' ? 'coral' : 'navy'}>
            For {listing.purpose === 'SALE' ? 'Sale' : 'Rent'}
          </Badge>
          {listing.isVerified && <VerificationBadge type="VERIFIED_LISTING" />}
        </div>

        {/* Save button */}
        {isAuthenticated && (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!saveLoading) toggleSave();
            }}
            disabled={saveLoading}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-sm transition-all duration-150 ${
              isSaved
                ? 'bg-white text-baza-coral shadow-md scale-110'
                : 'bg-baza-navy/40 text-white hover:bg-white hover:text-baza-coral'
            } ${saveLoading ? 'opacity-60 cursor-wait' : ''}`}
            aria-label={isSaved ? 'Remove from saved' : 'Save listing'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Price overlay at bottom-left */}
        <div className="absolute bottom-2.5 left-2.5 pointer-events-none">
          <span
            className="text-white font-extrabold text-sm px-2 py-0.5 rounded"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
          >
            {formattedPrice}
            {listing.purpose === 'RENT' && (
              <span className="text-[10px] font-semibold opacity-80"> / mo</span>
            )}
          </span>
        </div>
      </div>

      {/* ── Card Content ── */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category + Location row */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span
              className="text-[10px] font-extrabold uppercase tracking-widest"
              style={{ color: '#06B6D4' }}
            >
              {listing.category}
            </span>
            <div className="flex items-center gap-0.5 text-slate-400 text-[10px]">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[110px]">{listing.location}</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/listings/${listing.slug}`} className="block">
            <h3 className="text-sm font-bold text-baza-navy group-hover:text-baza-cyan transition-colors line-clamp-1 leading-snug">
              {listing.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-[11px] text-baza-text-secondary mt-1.5 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-end">
          <Link
            to={`/listings/${listing.slug}`}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-baza-navy hover:text-baza-cyan transition-colors group/link"
          >
            View Details
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
