import React from 'react';
import { MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ListingItem } from '../../types';
import { Badge } from '../ui/Badge';
import { VerificationBadge } from '../ui/VerificationBadge';
import { useToggleSave } from '../../hooks/useSavedListings';
import { useSessionStore } from '../../store';

export interface ListingCardProps {
  listing: ListingItem;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { isAuthenticated } = useSessionStore();
  const { isSaved, toggle: toggleSave, isLoading: saveLoading } = useToggleSave(listing.id);

  const formattedPrice = new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: listing.currency || 'RWF',
    maximumFractionDigits: 0,
  }).format(listing.price);

  return (
    <div className="group bg-white border border-baza-border rounded-baza shadow-baza hover:shadow-baza-lg transition-all duration-200 overflow-hidden flex flex-col">
      {/* Image container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={listing.coverImageUrl || FALLBACK_IMAGE}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
        />
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
          <Badge variant={listing.purpose === 'SALE' ? 'green' : 'navy'}>
            For {listing.purpose === 'SALE' ? 'Sale' : 'Rent'}
          </Badge>
          {listing.isVerified && <VerificationBadge type="VERIFIED_LISTING" />}
        </div>
        {isAuthenticated && (
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!saveLoading) toggleSave();
            }}
            disabled={saveLoading}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors ${
              isSaved ? 'bg-white text-red-500 shadow-md' : 'bg-baza-navy/40 text-white hover:bg-white hover:text-baza-navy'
            } ${saveLoading ? 'opacity-60 cursor-wait' : ''}`}
            aria-label={isSaved ? 'Remove from saved' : 'Save listing'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-baza-text-secondary mb-1">
            <span className="font-semibold uppercase tracking-wider text-baza-green-dark">{listing.category}</span>
            <div className="flex items-center gap-1 text-slate-500">
              <MapPin className="w-3 h-3 text-baza-green" />
              <span className="truncate max-w-[120px]">{listing.location}</span>
            </div>
          </div>

          <Link to={`/listings/${listing.slug}`} className="block">
            <h3 className="text-sm font-bold text-baza-navy group-hover:text-baza-green transition-colors line-clamp-1">
              {listing.title}
            </h3>
          </Link>

          <p className="text-xs text-baza-text-secondary mt-1 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-base font-extrabold text-baza-navy">{formattedPrice}</span>
            {listing.purpose === 'RENT' && <span className="text-[11px] text-baza-text-secondary"> / month</span>}
          </div>
          <Link
            to={`/listings/${listing.slug}`}
            className="text-xs font-bold text-baza-green hover:text-baza-green-dark transition-colors"
          >
            View Details &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
