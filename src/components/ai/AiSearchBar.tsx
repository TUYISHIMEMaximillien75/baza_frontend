import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Sparkles, Search, X, ArrowRight, MapPin, Tag,
  AlertCircle, Home, Car, Layers, Building2, TreePine,
  BadgeCheck, TrendingUp, Clock,
} from 'lucide-react';
import { aiSearchService, AiSearchResult, AiSearchResponse } from '../../services/aiSearchService';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

// ─── Category icons ───────────────────────────────────────────────────────────
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  vehicles: <Car size={14} />,
  houses: <Home size={14} />,
  apartments: <Building2 size={14} />,
  'land-plots': <TreePine size={14} />,
  commercial: <Layers size={14} />,
};

const CATEGORY_COLORS: Record<string, string> = {
  vehicles:    'bg-blue-50 text-blue-700 border-blue-200',
  houses:      'bg-emerald-50 text-emerald-700 border-emerald-200',
  apartments:  'bg-purple-50 text-purple-700 border-purple-200',
  'land-plots':'bg-amber-50 text-amber-700 border-amber-200',
  commercial:  'bg-rose-50 text-rose-700 border-rose-200',
};

const EXAMPLE_QUERIES = [
  'Cars under 15M RWF',
  'House in Kanombe with 3+ rooms',
  'Land for sale in Gasabo',
  'Apartment to rent in Nyarutarama',
];

interface AiSearchBarProps {
  onResultsPage?: boolean;
  autoFocus?: boolean;
}

// ─── Format price ─────────────────────────────────────────────────────────────
function fmtPrice(price: number, currency: string) {
  if (price >= 1_000_000) return `${currency} ${(price / 1_000_000).toFixed(1)}M`;
  if (price >= 1_000) return `${currency} ${(price / 1_000).toFixed(0)}K`;
  return `${currency} ${price.toLocaleString()}`;
}

// ─── Single Result Card ───────────────────────────────────────────────────────
const ResultCard: React.FC<{ listing: AiSearchResult; onClick: () => void }> = ({ listing, onClick }) => {
  const catColor = CATEGORY_COLORS[listing.categorySlug] || 'bg-slate-50 text-slate-600 border-slate-200';
  const catIcon = CATEGORY_ICONS[listing.categorySlug] || <Tag size={14} />;

  return (
    <button className="ai-result-card" onClick={onClick}>
      {/* Image */}
      <div className="ai-rc-img">
        {listing.coverImageUrl ? (
          <img src={listing.coverImageUrl} alt={listing.title} loading="lazy" />
        ) : (
          <div className="ai-rc-img-placeholder">{catIcon}</div>
        )}
        {/* Purpose badge on image */}
        <span className={`ai-rc-purpose-badge ai-rc-purpose-badge--${listing.purpose?.toLowerCase()}`}>
          {listing.purpose}
        </span>
      </div>

      {/* Body */}
      <div className="ai-rc-body">
        <div className="ai-rc-top">
          {/* Category chip */}
          <span className={`ai-rc-cat-chip ${catColor}`}>
            {catIcon}
            <span>{listing.category}</span>
          </span>
          {listing.isVerified && (
            <span className="ai-rc-verified">
              <BadgeCheck size={12} />
              Verified
            </span>
          )}
        </div>

        <div className="ai-rc-title">{listing.title}</div>

        {listing.description && (
          <div className="ai-rc-desc">{listing.description}</div>
        )}

        <div className="ai-rc-footer">
          {listing.location && (
            <span className="ai-rc-location">
              <MapPin size={11} />
              {listing.locationShort || listing.location}
            </span>
          )}
          <span className="ai-rc-price">{fmtPrice(listing.price, listing.currency)}</span>
        </div>
      </div>
    </button>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export const AiSearchBar: React.FC<AiSearchBarProps> = ({ onResultsPage, autoFocus }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiSearchResponse | null>(null);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (autoFocus) inputRef.current?.focus(); }, [autoFocus]);

  // Close on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const runSearch = useCallback(async (q: string) => {
    const clean = q.trim();
    if (!clean) return;
    setSubmitted(clean);
    setLoading(true);
    setError('');
    setResult(null);
    setOpen(true);
    try {
      const res = await aiSearchService.search(clean);
      setResult(res);
    } catch (e: any) {
      setError(e?.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') runSearch(query);
    if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
  };

  const handleViewAll = () => {
    if (!result) return;
    const p = new URLSearchParams();
    const f = result.parsedFilters;
    if (f.categorySlug) p.set('category', f.categorySlug);
    if (f.purpose) p.set('purpose', f.purpose);
    if (f.province) p.set('province', f.province);
    if (f.district) p.set('district', f.district);
    if (f.minPrice) p.set('minPrice', String(f.minPrice));
    if (f.maxPrice) p.set('maxPrice', String(f.maxPrice));
    if (submitted) p.set('search', submitted);
    setOpen(false);
    navigate(`/marketplace?${p.toString()}`);
  };

  const clear = () => { setQuery(''); setResult(null); setError(''); setOpen(false); inputRef.current?.focus(); };

  const isOpen = open && (loading || !!result || !!error);

  return (
    <div ref={containerRef} className="ai-search-wrap">
      {/* ── Input row ── */}
      <div className={`ai-search-bar ${isOpen ? 'ai-search-bar--open' : ''}`}>
        <Sparkles size={17} className={`ai-bar-icon ${loading ? 'ai-bar-icon--spin' : ''}`} />

        <input
          ref={inputRef}
          id="ai-search-input"
          type="text"
          className="ai-search-input"
          placeholder="Ask AI — e.g. Cars under 15M, House in Kanombe with 3 rooms…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (result || error) setOpen(true); }}
          autoComplete="off"
        />

        {query && (
          <button className="ai-bar-clear" onClick={clear} aria-label="Clear">
            <X size={14} />
          </button>
        )}

        <button
          id="ai-search-submit"
          className="ai-bar-btn"
          onClick={() => runSearch(query)}
          disabled={loading || !query.trim()}
        >
          {loading ? <span className="ai-spinner" /> : <><Search size={14} /><span>Search</span></>}
        </button>
      </div>

      {/* ── Example chips ── */}
      {!onResultsPage && !isOpen && (
        <div className="ai-chips-row">
          <span className="ai-chips-label">Try:</span>
          {EXAMPLE_QUERIES.map((q) => (
            <button key={q} className="ai-chip" onClick={() => { setQuery(q); runSearch(q); }}>{q}</button>
          ))}
        </div>
      )}

      {/* ── Dropdown panel ── */}
      {isOpen && (
        <div className="ai-panel">

          {/* Loading */}
          {loading && (
            <div className="ai-panel-loading">
              <div className="ai-dots"><span /><span /><span /></div>
              <p>Analyzing your request…</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="ai-panel-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Results */}
          {!loading && result && (
            <>
              {/* AI explanation strip */}
              <div className="ai-explain-strip">
                <Sparkles size={13} />
                <span>{result.aiExplanation}</span>
                <span className="ai-explain-count">{result.totalFound ?? result.results.length} found</span>
              </div>

              {/* Applied filter chips */}
              {result.parsedFilters && Object.values(result.parsedFilters).some(Boolean) && (
                <div className="ai-filter-chips">
                  {result.parsedFilters.categorySlug && (
                    <span className="ai-filter-chip">
                      {CATEGORY_ICONS[result.parsedFilters.categorySlug]}
                      {result.parsedFilters.categorySlug}
                    </span>
                  )}
                  {result.parsedFilters.purpose && (
                    <span className="ai-filter-chip">{result.parsedFilters.purpose}</span>
                  )}
                  {(result.parsedFilters.sector || result.parsedFilters.district) && (
                    <span className="ai-filter-chip">
                      <MapPin size={11} />
                      {result.parsedFilters.sector || result.parsedFilters.district}
                    </span>
                  )}
                  {result.parsedFilters.maxPrice && (
                    <span className="ai-filter-chip">
                      ≤ {fmtPrice(result.parsedFilters.maxPrice, 'RWF')}
                    </span>
                  )}
                  {result.parsedFilters.minRooms && (
                    <span className="ai-filter-chip">{result.parsedFilters.minRooms}+ rooms</span>
                  )}
                </div>
              )}

              {/* Empty state */}
              {result.results.length === 0 ? (
                <div className="ai-panel-empty">
                  <Search size={36} />
                  <p>No listings found</p>
                  <span>Try different keywords or browse the marketplace.</span>
                  <button className="ai-browse-btn" onClick={() => { setOpen(false); navigate('/marketplace'); }}>
                    Browse All Listings <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <>
                  {/* Grid of cards */}
                  <div className="ai-results-grid">
                    {result.results.slice(0, 6).map((listing) => (
                      <ResultCard
                        key={listing.id}
                        listing={listing}
                        onClick={() => { setOpen(false); navigate(`/listings/${listing.slug}`); }}
                      />
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="ai-panel-footer">
                    <span className="ai-footer-hint">
                      <TrendingUp size={13} />
                      Powered by Sarah AI
                    </span>
                    <button className="ai-view-all-btn" onClick={handleViewAll}>
                      View all {result.totalFound ?? result.results.length} results
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
