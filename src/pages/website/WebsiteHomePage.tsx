import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, MapPin, Car, ShieldCheck } from 'lucide-react';
import listingsService from '../../services/listingsService';
import type { ListingItem } from '../../types';
import { AiSearchBar } from '../../components/ai/AiSearchBar';
import { AiSearchResults } from '../../components/ai/AiSearchResults';
import type { AiSearchResponse } from '../../services/aiSearchService';

/* ── Single purposeful animation — the hero line growing in ── */
const PAGE_STYLES = `
  @keyframes lineGrow {
    from { transform: scaleX(0); transform-origin: left center; }
    to   { transform: scaleX(1); transform-origin: left center; }
  }
  .hero-line { animation: lineGrow 1.6s cubic-bezier(0.16,1,0.3,1) forwards; }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .listing-card-in { animation: cardIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }
`;

const PROVINCES = ['Kigali City', 'Northern', 'Southern', 'Eastern', 'Western'];

const CATEGORY_ROWS = [
  {
    slug: 'houses',
    label: 'Houses & residential',
    sub: 'Family homes, rentals, apartments — Kigali and beyond',
    accent: '#2A4A35',   // hillside
    bg: '#EBF2ED',
  },
  {
    slug: 'residential-land',
    label: 'Land & plots',
    sub: 'Residential plots, agricultural land, surveyed parcels',
    accent: '#7C4A22',   // laterite
    bg: '#F4EDE6',
  },
  {
    slug: 'vehicle',
    label: 'Vehicles',
    sub: 'Cars, SUVs, trucks, motorcycles — direct from owner or dealer',
    accent: '#0A2A42',   // navy
    bg: '#E6EEF4',
  },
];

export const WebsiteHomePage: React.FC = () => {
  const [listings, setListings]     = useState<ListingItem[]>([]);
  const [loadingListings, setLoading] = useState(true);

  // ── Sarah AI search state ──────────────────────────────────────────────
  const [aiResults, setAiResults] = useState<AiSearchResponse | null>(null);
  const [aiSearching, setAiSearching] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const aiResultsRef = useRef<HTMLElement>(null);

  const handleAiResults = (res: AiSearchResponse | null) => {
    setAiResults(res);
    if (res) {
      setTimeout(() => {
        aiResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  };

  const handleAiClose = () => {
    setAiResults(null);
    setAiQuery('');
  };

  useEffect(() => {
    listingsService
      .getAll({ limit: 4 })
      .then((res) => setListings(res.items || []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_STYLES }} />

      {/* ══════════════════════════════════════════════════════
          HERO — Bold moment: the DM Serif headline.
          One colour. No fragmented multi-colour treatment.
          ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#0A2A42', minHeight: '480px' }}
      >
        {/* The single purposeful motion: a thin amber line growing across the top */}
        <div
          className="hero-line absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: '#C17D2E' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left — headline + search */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                {/* DM Serif Display — the bold moment, one colour, no fragments */}
                <h1
                  className="text-white"
                  style={{
                    fontFamily: '"DM Serif Display", Georgia, serif',
                    fontSize: 'clamp(2.6rem, 5.5vw, 3.8rem)',
                    lineHeight: '1.12',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Find a house, plot,<br />or vehicle in Rwanda<br />without the risk.
                </h1>
                <p
                  className="mt-5 text-base leading-relaxed max-w-md"
                  style={{ color: 'rgba(255,255,255,0.6)', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                >
                  BAZA connects buyers and sellers directly across Rwanda's five provinces — for houses, land, and vehicles.
                </p>
              </div>

              {/* Sarah AI Search */}
              <AiSearchBar
                onResults={handleAiResults}
                onSearching={setAiSearching}
                onQueryChange={setAiQuery}
              />

              {/* Five provinces — ground it geographically */}
              <div className="flex flex-wrap gap-2">
                {PROVINCES.map((p) => (
                  <Link
                    key={p}
                    to={`/marketplace?province=${encodeURIComponent(p)}`}
                    className="text-xs px-3 py-1.5 rounded-full transition-colors"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,0.65)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.9)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right — category rows: what BAZA actually sells */}
            <div className="lg:col-span-6 space-y-3">
              {CATEGORY_ROWS.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/marketplace?category=${cat.slug}`}
                  className="group flex items-center gap-5 px-5 py-4 rounded-lg transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor = `${cat.accent}55`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                >
                  <div
                    className="w-11 h-11 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: cat.bg }}
                  >
                    {cat.slug === 'houses' && <Building2 className="w-5 h-5" style={{ color: cat.accent }} />}
                    {cat.slug === 'residential-land' && <MapPin className="w-5 h-5" style={{ color: cat.accent }} />}
                    {cat.slug === 'vehicle' && <Car className="w-5 h-5" style={{ color: cat.accent }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold text-white group-hover:text-white transition-colors"
                      style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                    >
                      {cat.label}
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                      {cat.sub}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 flex-shrink-0 opacity-40 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}

              <div
                className="mt-2 px-5 py-3 rounded-lg flex items-center justify-between"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                  5 Provinces · 30 Districts · verified sellers
                </span>
                <Link
                  to="/listings/new"
                  className="text-xs font-semibold transition-colors"
                  style={{ color: '#C17D2E', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#D4963C')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#C17D2E')}
                >
                  Post a listing →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sarah AI results — inline below hero ── */}
      {aiSearching && (
        <div style={{ background: '#EDEBE5', padding: '40px 0' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="ai-rs-skeleton-header mb-6">
              <div className="ai-rs-skeleton-bar ai-rs-skeleton-bar--wide" />
              <div className="ai-rs-skeleton-bar ai-rs-skeleton-bar--narrow" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-64 rounded-lg animate-pulse" style={{ background: '#D4CFC7' }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {aiResults && !aiSearching && (
        <div style={{ background: '#EDEBE5', padding: '40px 0' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AiSearchResults
              response={aiResults}
              query={aiQuery}
              onClose={handleAiClose}
              sectionRef={aiResultsRef}
            />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          LIVE LISTINGS — real product value, not decorative chrome.
          The cards are the hero here, not a fake browser frame.
          ══════════════════════════════════════════════════════ */}
      <section
        className="py-20"
        style={{ background: '#EDEBE5' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2
                className="text-slate-900"
                style={{
                  fontFamily: '"DM Serif Display", Georgia, serif',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                On the marketplace now
              </h2>
              <p className="mt-2 text-sm text-baza-text-secondary" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                Real listings, live right now — houses, land, and vehicles across Rwanda.
              </p>
            </div>
            <Link
              to="/marketplace"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold transition-colors focus:outline-none focus:underline"
              style={{ color: '#0A2A42', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C17D2E')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#0A2A42')}
            >
              Browse all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loadingListings ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-72 rounded-lg animate-pulse" style={{ background: '#D4CFC7' }} />
              ))}
            </div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {listings.map((item, idx) => (
                <Link
                  key={item.id}
                  to={`/listings/${item.slug}`}
                  className="listing-card-in group flex flex-col rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-baza-sun focus:ring-offset-2"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E5E1DA',
                    animationDelay: `${idx * 60}ms`,
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative flex-shrink-0">
                    {item.coverImageUrl ? (
                      <img
                        src={item.coverImageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ background: '#EDEBE5' }}>
                        <Building2 className="w-8 h-8" style={{ color: '#C8C3BB' }} />
                      </div>
                    )}
                    {/* Purpose badge — positioned top-left, minimal */}
                    <span
                      className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded"
                      style={
                        item.purpose === 'RENT'
                          ? { background: '#0A2A42', color: '#fff' }
                          : { background: '#C17D2E', color: '#fff' }
                      }
                    >
                      {item.purpose === 'SALE' ? 'For sale' : 'For rent'}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    {/* Category as plain text, not ALL-CAPS eyebrow */}
                    <p className="text-xs text-baza-text-muted mb-1" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                      {item.category}
                    </p>
                    {/* Title in Plus Jakarta Sans — DM Serif is for editorial headings, not UI cards */}
                    <h3
                      className="text-sm font-semibold text-slate-900 line-clamp-1 group-hover:text-baza-navy transition-colors"
                      style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                    >
                      {item.title}
                    </h3>
                    {item.location && (
                      <p className="flex items-center gap-1 text-xs mt-1 text-baza-text-muted" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        {item.location}
                      </p>
                    )}
                    {/* Price — the primary data point, rightmost, Sun amber, bold */}
                    <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span
                        className="text-sm font-bold tabular-nums"
                        style={{ color: '#C17D2E', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                      >
                        {item.currency} {item.price.toLocaleString()}
                        {item.purpose === 'RENT' && <span className="text-xs font-semibold text-baza-text-muted"> /mo</span>}
                      </span>
                      <span className="text-xs text-baza-text-muted" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>View →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div
              className="py-14 text-center rounded-lg"
              style={{ background: '#fff', border: '1px solid #E5E1DA' }}
            >
              <p className="text-sm font-semibold text-slate-800" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                Marketplace loading…
              </p>
              <Link
                to="/marketplace"
                className="mt-3 inline-block text-xs font-semibold text-baza-navy hover:underline"
                style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
              >
                Go to marketplace →
              </Link>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-baza-sun focus:ring-offset-2"
              style={{ background: '#0A2A42', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
            >
              Browse all listings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TRUST — disciplined, specific to what trust means
          in Rwanda property/vehicle transactions.
          No generic checkmark-row decoration.
          ══════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: '#fff', borderTop: '1px solid #E5E1DA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="text-slate-900"
                style={{
                  fontFamily: '"DM Serif Display", Georgia, serif',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Buying a plot or renting a home in Rwanda requires certainty.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-baza-text-secondary" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', maxWidth: '38ch' }}>
                BAZA verifies sellers before they can list. You see a badge, you know a real identity has been checked.
              </p>

              <div className="mt-10 space-y-8">
                {[
                  {
                    n: '1',
                    title: 'Identity check',
                    body: 'Sellers submit national ID. We confirm before granting a verified badge.',
                  },
                  {
                    n: '2',
                    title: 'Direct contact',
                    body: 'Buyers reach owners directly — no hidden agent fees or middlemen.',
                  },
                  {
                    n: '3',
                    title: 'Site visit requests',
                    body: 'Request a viewing straight from the listing page. The seller confirms the time.',
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5">
                    <div
                      className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: '#0A2A42', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', marginTop: '2px' }}
                    >
                      {step.n}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                        {step.title}
                      </p>
                      <p className="mt-1 text-sm text-baza-text-secondary" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  to="/trust"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors focus:outline-none focus:underline"
                  style={{ color: '#0A2A42', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#C17D2E')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#0A2A42')}
                >
                  How trust works on BAZA <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Seller types — specific, not generic checkmark rows */}
            <div className="space-y-4">
              {[
                {
                  role: 'Seller',
                  desc: 'Individual property or vehicle owner. Verified national ID, one or more listings.',
                  accent: '#2A4A35',
                  bg: '#EBF2ED',
                },
                {
                  role: 'Broker',
                  desc: 'Licensed estate agent operating across multiple properties in Rwanda.',
                  accent: '#7C4A22',
                  bg: '#F4EDE6',
                },
                {
                  role: 'Dealer',
                  desc: 'Registered motor vehicle dealership. Verified business registration.',
                  accent: '#0A2A42',
                  bg: '#E6EEF4',
                },
              ].map((type) => (
                <div
                  key={type.role}
                  className="flex items-start gap-4 p-5 rounded-lg"
                  style={{ background: type.bg, border: `1px solid ${type.accent}22` }}
                >
                  <div
                    className="w-9 h-9 rounded flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: type.accent }}
                  >
                    <ShieldCheck className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                      {type.role}
                    </p>
                    <p className="mt-0.5 text-xs text-baza-text-secondary" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                      {type.desc}
                    </p>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded text-sm font-bold text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-baza-sun focus:ring-offset-2"
                  style={{ background: '#C17D2E', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                >
                  Get a verified account
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA — single, clear, grounded in the actual action
          ══════════════════════════════════════════════════════ */}
      <section
        className="py-20"
        style={{ background: '#0A2A42' }}
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2
            className="text-white"
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Got a house, plot, or vehicle to sell in Rwanda?
          </h2>
          <p
            className="mt-4 text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
          >
            Post a listing on BAZA. It takes under five minutes. Buyers in Kigali and across all provinces will find it.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/listings/new"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-baza-sun focus:ring-offset-2 focus:ring-offset-[#0A2A42]"
              style={{ background: '#C17D2E', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
            >
              Post a listing
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/marketplace"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded text-sm font-semibold transition-all hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/30"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.75)',
                fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              }}
            >
              Browse the marketplace
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
