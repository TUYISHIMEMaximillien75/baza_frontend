import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Search, X, ArrowRight, MapPin, Tag, AlertCircle } from 'lucide-react';
import { aiSearchService, AiSearchResult, AiSearchResponse } from '../../services/aiSearchService';
import { useNavigate } from 'react-router-dom';

const EXAMPLE_QUERIES = [
  'House in Kanombe with more than 3 rooms',
  'Land for sale in Gasabo under 50 million RWF',
  'Apartment to rent in Nyarutarama',
  'Toyota SUV under 15 million RWF',
  'Commercial space near Kigali city centre',
];

interface AiSearchBarProps {
  onResultsPage?: boolean;
  autoFocus?: boolean;
}

export const AiSearchBar: React.FC<AiSearchBarProps> = ({ onResultsPage, autoFocus }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiSearchResponse | null>(null);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery?: string) => {
    const q = (searchQuery ?? query).trim();
    if (!q) return;
    setQuery(q);
    setLoading(true);
    setError('');
    setResult(null);
    setShowDropdown(true);

    try {
      const response = await aiSearchService.search(q);
      setResult(response);
    } catch (err: any) {
      setError(err?.message || 'AI search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
    if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const handleViewAll = () => {
    if (!result) return;
    const params = new URLSearchParams();
    if (result.parsedFilters.search) params.set('search', result.parsedFilters.search);
    if (result.parsedFilters.categorySlug) params.set('category', result.parsedFilters.categorySlug);
    if (result.parsedFilters.purpose) params.set('purpose', result.parsedFilters.purpose);
    if (result.parsedFilters.province) params.set('province', result.parsedFilters.province);
    if (result.parsedFilters.minPrice) params.set('minPrice', String(result.parsedFilters.minPrice));
    if (result.parsedFilters.maxPrice) params.set('maxPrice', String(result.parsedFilters.maxPrice));
    setShowDropdown(false);
    navigate(`/marketplace?${params.toString()}`);
  };

  const handleResultClick = (listing: AiSearchResult) => {
    setShowDropdown(false);
    navigate(`/listings/${listing.slug}`);
  };

  const clearSearch = () => {
    setQuery('');
    setResult(null);
    setError('');
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="ai-search-container">
      {/* Search Input Bar */}
      <div className={`ai-search-bar ${loading ? 'ai-search-bar--loading' : ''} ${showDropdown && (result || loading || error) ? 'ai-search-bar--open' : ''}`}>
        {/* AI Icon */}
        <div className="ai-search-icon-left">
          <Sparkles size={18} className={`ai-sparkle-icon ${loading ? 'ai-sparkle-icon--pulse' : ''}`} />
        </div>

        <input
          ref={inputRef}
          type="text"
          className="ai-search-input"
          placeholder="Ask Sarah AI — e.g. House in Kanombe with 3+ rooms..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (result || error) setShowDropdown(true); }}
          onKeyDown={handleKeyDown}
          aria-label="AI search input"
          id="ai-search-input"
        />

        {query && (
          <button className="ai-search-clear" onClick={clearSearch} aria-label="Clear search">
            <X size={16} />
          </button>
        )}

        <button
          className="ai-search-btn"
          onClick={() => handleSearch()}
          disabled={loading || !query.trim()}
          aria-label="Search with AI"
          id="ai-search-submit"
        >
          {loading ? (
            <span className="ai-search-btn-spinner" />
          ) : (
            <>
              <Search size={16} />
              <span>Search</span>
            </>
          )}
        </button>
      </div>

      {/* Example queries */}
      {!onResultsPage && !showDropdown && (
        <div className="ai-search-examples">
          <span className="ai-search-examples-label">Try:</span>
          {EXAMPLE_QUERIES.slice(0, 3).map((ex) => (
            <button
              key={ex}
              className="ai-search-example-chip"
              onClick={() => handleSearch(ex)}
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {/* Dropdown Results Panel */}
      {showDropdown && (
        <div className="ai-search-dropdown" role="listbox">
          {/* Loading state */}
          {loading && (
            <div className="ai-search-loading-state">
              <div className="ai-search-loading-dots">
                <span /><span /><span />
              </div>
              <p>Sarah AI is analyzing your request…</p>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="ai-search-error-state">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {/* Results */}
          {!loading && result && (
            <>
              {/* AI Explanation banner */}
              <div className="ai-search-explanation">
                <Sparkles size={14} />
                <span>{result.aiExplanation}</span>
              </div>

              {result.results.length === 0 ? (
                <div className="ai-search-no-results">
                  <Search size={32} />
                  <p>No listings found matching your search.</p>
                  <span>Try a different query or browse the marketplace.</span>
                </div>
              ) : (
                <>
                  <div className="ai-search-results-list">
                    {result.results.slice(0, 6).map((listing) => (
                      <button
                        key={listing.id}
                        className="ai-search-result-item"
                        onClick={() => handleResultClick(listing)}
                        role="option"
                      >
                        <div className="ai-result-img">
                          {listing.coverImageUrl ? (
                            <img src={listing.coverImageUrl} alt={listing.title} />
                          ) : (
                            <div className="ai-result-img-placeholder">
                              <Search size={20} />
                            </div>
                          )}
                        </div>
                        <div className="ai-result-body">
                          <div className="ai-result-title">{listing.title}</div>
                          <div className="ai-result-meta">
                            {listing.location && (
                              <span className="ai-result-location">
                                <MapPin size={11} />
                                {listing.location}
                              </span>
                            )}
                            {listing.category && (
                              <span className="ai-result-category">
                                <Tag size={11} />
                                {listing.category}
                              </span>
                            )}
                          </div>
                          <div className="ai-result-desc">{listing.description}</div>
                        </div>
                        <div className="ai-result-right">
                          <div className="ai-result-price">
                            {listing.currency} {Number(listing.price).toLocaleString()}
                          </div>
                          <div className={`ai-result-purpose ai-result-purpose--${listing.purpose?.toLowerCase()}`}>
                            {listing.purpose}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {result.results.length > 0 && (
                    <button className="ai-search-view-all" onClick={handleViewAll}>
                      <span>View all {result.results.length} results</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
