import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, Search, X, Loader2 } from 'lucide-react';
import { aiSearchService, AiSearchResponse } from '../../services/aiSearchService';
import { useDebounce } from '../../hooks/useDebounce';

const EXAMPLE_QUERIES = [
  'Cars under 15M RWF',
  'House in Kanombe with 3+ rooms',
  'Land for sale in Gasabo',
  'Apartment to rent',
];

interface AiSearchBarProps {
  onResults: (response: AiSearchResponse | null) => void;
  onSearching?: (loading: boolean) => void;
  onQueryChange?: (query: string) => void;
}

export const AiSearchBar: React.FC<AiSearchBarProps> = ({ onResults, onSearching, onQueryChange }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const runSearch = useCallback(async (q: string) => {
    const clean = q.trim();
    if (!clean) return;
    onQueryChange?.(clean);
    setLoading(true);
    onSearching?.(true);
    onResults(null); // clear previous results
    try {
      const res = await aiSearchService.search(clean);
      onResults(res);
    } catch {
      onResults({ query: clean, aiExplanation: 'Search failed. Please try again.', results: [], parsedFilters: {}, appliedStrategy: '', totalFound: 0 });
    } finally {
      setLoading(false);
      onSearching?.(false);
    }
  }, [onResults, onSearching, onQueryChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') runSearch(query);
    if (e.key === 'Escape') { setQuery(''); onResults(null); }
  };

  const handleClear = () => { setQuery(''); onResults(null); inputRef.current?.focus(); };

  return (
    <div className="ai-search-wrap">
      {/* ── Input bar ── */}
      <div className={`ai-search-bar ${loading ? 'ai-search-bar--loading' : ''}`}>
        {loading
          ? <Loader2 size={17} className="ai-bar-icon ai-bar-icon--spin" />
          : <Sparkles size={17} className="ai-bar-icon" />
        }

        <input
          ref={inputRef}
          id="ai-search-input"
          type="text"
          className="ai-search-input"
          placeholder="Ask AI — e.g. Cars under 15M, House in Kanombe with 3+ rooms…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />

        {query && (
          <button className="ai-bar-clear" onClick={handleClear} aria-label="Clear">
            <X size={14} />
          </button>
        )}

        <button
          id="ai-search-submit"
          className="ai-bar-btn"
          onClick={() => runSearch(query)}
          disabled={loading || !query.trim()}
        >
          {loading
            ? <><span className="ai-spinner" /><span>Searching…</span></>
            : <><Search size={14} /><span>Search</span></>
          }
        </button>
      </div>

      {/* ── Example chips ── */}
      <div className="ai-chips-row">
        <span className="ai-chips-label">Try:</span>
        {EXAMPLE_QUERIES.map((q) => (
          <button key={q} className="ai-chip" onClick={() => { setQuery(q); runSearch(q); }}>
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};
