import React from 'react';
import {
  Sparkles, ArrowRight, MapPin, Tag, X,
  Home, Car, Layers, Building2, TreePine, BadgeCheck, TrendingUp,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AiSearchResponse, AiSearchResult } from '../../services/aiSearchService';
import { ListingCard } from '../common/ListingCard';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  vehicles:    <Car size={13} />,
  houses:      <Home size={13} />,
  apartments:  <Building2 size={13} />,
  'land-plots':<TreePine size={13} />,
  commercial:  <Layers size={13} />,
};

const CATEGORY_COLORS: Record<string, string> = {
  vehicles:    'bg-blue-50 text-blue-700 border-blue-200',
  houses:      'bg-emerald-50 text-emerald-700 border-emerald-200',
  apartments:  'bg-purple-50 text-purple-700 border-purple-200',
  'land-plots':'bg-amber-50 text-amber-700 border-amber-200',
  commercial:  'bg-rose-50 text-rose-700 border-rose-200',
};

function fmtPrice(price: number, currency: string) {
  if (price >= 1_000_000) return `${currency} ${(price / 1_000_000).toFixed(1)}M`;
  if (price >= 1_000) return `${currency} ${(price / 1_000).toFixed(0)}K`;
  return `${currency} ${price.toLocaleString()}`;
}

// ─── Individual listing card (AI variant — richer layout) ─────────────────────

const AiListingCard: React.FC<{ listing: AiSearchResult; onClick: () => void }> = ({ listing, onClick }) => {
  const catColor = CATEGORY_COLORS[listing.categorySlug] || 'bg-slate-50 text-slate-600 border-slate-200';
  const catIcon  = CATEGORY_ICONS[listing.categorySlug] || <Tag size={13} />;

  return (
    <button className="ai-listing-card" onClick={onClick}>
      {/* Image */}
      <div className="ai-lc-img">
        {listing.coverImageUrl
          ? <img src={listing.coverImageUrl} alt={listing.title} loading="lazy" />
          : <div className="ai-lc-img-placeholder">{catIcon}</div>
        }
        <span className={`ai-lc-badge ai-lc-badge--${listing.purpose?.toLowerCase()}`}>
          {listing.purpose === 'SALE' ? 'For Sale' : 'For Rent'}
        </span>
        {listing.isFeatured && (
          <span className="ai-lc-featured-badge"><TrendingUp size={10} /> Featured</span>
        )}
      </div>

      {/* Body */}
      <div className="ai-lc-body">
        {/* Top row */}
        <div className="ai-lc-top">
          <span className={`ai-lc-cat ${catColor}`}>{catIcon}{listing.category}</span>
          {listing.isVerified && (
            <span className="ai-lc-verified"><BadgeCheck size={11} /> Verified</span>
          )}
        </div>

        {/* Title */}
        <div className="ai-lc-title">{listing.title}</div>

        {/* Description */}
        {listing.description && (
          <div className="ai-lc-desc">{listing.description}</div>
        )}

        {/* Footer */}
        <div className="ai-lc-footer">
          {listing.location && (
            <span className="ai-lc-loc"><MapPin size={11} />{listing.locationShort || listing.location}</span>
          )}
          <span className="ai-lc-price">{fmtPrice(listing.price, listing.currency)}</span>
        </div>
      </div>
    </button>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

interface AiSearchResultsProps {
  response: AiSearchResponse;
  query: string;
  onClose: () => void;
  sectionRef: React.RefObject<HTMLElement>;
}

export const AiSearchResults: React.FC<AiSearchResultsProps> = ({ response, query, onClose, sectionRef }) => {
  const navigate = useNavigate();
  const { results, aiExplanation, parsedFilters, totalFound } = response;

  const handleViewAll = () => {
    const p = new URLSearchParams();
    if (parsedFilters.categorySlug) p.set('category', parsedFilters.categorySlug);
    if (parsedFilters.purpose)      p.set('purpose', parsedFilters.purpose);
    if (parsedFilters.province)     p.set('province', parsedFilters.province);
    if (parsedFilters.district)     p.set('district', parsedFilters.district);
    if (parsedFilters.minPrice)     p.set('minPrice', String(parsedFilters.minPrice));
    if (parsedFilters.maxPrice)     p.set('maxPrice', String(parsedFilters.maxPrice));
    if (query)                      p.set('search', query);
    navigate(`/marketplace?${p.toString()}`);
  };

  return (
    <section ref={sectionRef} className="ai-results-section">
      {/* ── Section header ── */}
      <div className="ai-rs-header">
        <div className="ai-rs-header-left">
          <div className="ai-rs-ai-badge">
            <Sparkles size={14} />
            Sarah AI
          </div>
          <div>
            <h2 className="ai-rs-title">
              {totalFound > 0 ? `${totalFound} result${totalFound !== 1 ? 's' : ''} found` : 'No results found'}
            </h2>
            <p className="ai-rs-explanation">{aiExplanation}</p>
          </div>
        </div>

        <button className="ai-rs-close" onClick={onClose} aria-label="Close AI results">
          <X size={18} />
        </button>
      </div>

      {/* ── Applied filter chips ── */}
      {Object.values(parsedFilters).some(Boolean) && (
        <div className="ai-rs-filters">
          <span className="ai-rs-filters-label">Filters applied:</span>
          {parsedFilters.categorySlug && (
            <span className="ai-rs-filter-chip">
              {CATEGORY_ICONS[parsedFilters.categorySlug]}
              {parsedFilters.categorySlug}
            </span>
          )}
          {parsedFilters.purpose && (
            <span className="ai-rs-filter-chip">{parsedFilters.purpose}</span>
          )}
          {(parsedFilters.sector || parsedFilters.district || parsedFilters.province) && (
            <span className="ai-rs-filter-chip">
              <MapPin size={11} />
              {parsedFilters.sector || parsedFilters.district || parsedFilters.province}
            </span>
          )}
          {parsedFilters.maxPrice && (
            <span className="ai-rs-filter-chip">≤ {fmtPrice(parsedFilters.maxPrice, 'RWF')}</span>
          )}
          {parsedFilters.minRooms && (
            <span className="ai-rs-filter-chip">{parsedFilters.minRooms}+ rooms</span>
          )}
        </div>
      )}

      {/* ── Results grid ── */}
      {results.length === 0 ? (
        <div className="ai-rs-empty">
          <div className="ai-rs-empty-icon">🔍</div>
          <p>No listings matched your search.</p>
          <span>Try different keywords, or browse all listings below.</span>
        </div>
      ) : (
        <>
          <div className="ai-rs-grid">
            {results.map((listing) => (
              <AiListingCard
                key={listing.id}
                listing={listing}
                onClick={() => navigate(`/listings/${listing.slug}`)}
              />
            ))}
          </div>

          {/* ── Footer CTA ── */}
          <div className="ai-rs-footer">
            <span className="ai-rs-footer-hint">
              <Sparkles size={12} /> Powered by Sarah AI
            </span>
            <button className="ai-rs-view-all" onClick={handleViewAll}>
              View all results in Marketplace
              <ArrowRight size={15} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};
