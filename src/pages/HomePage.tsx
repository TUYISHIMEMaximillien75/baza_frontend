import React, { useRef, useState } from 'react';
import { ShieldCheck, CheckCircle2, TrendingUp, Sparkles, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CategoryCard } from '../components/common/CategoryCard';
import { ListingCard } from '../components/common/ListingCard';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/layout/SectionHeader';
import { Skeleton } from '../components/feedback/Skeleton';
import { useCategories } from '../hooks/useCategories';
import { useFeaturedListings, useListings } from '../hooks/useListings';
import { AiSearchBar } from '../components/ai/AiSearchBar';
import { AiSearchResults } from '../components/ai/AiSearchResults';
import { AiSearchResponse } from '../services/aiSearchService';

export const HomePage: React.FC = () => {
  const { data: categories = [], isLoading: catsLoading } = useCategories();
  const { data: featuredListings = [], isLoading: featuredLoading } = useFeaturedListings(4);
  const { data: recentData, isLoading: recentLoading } = useListings({
    limit: 8,
    sortBy: 'publishedAt',
    sortOrder: 'DESC',
  });
  const recentListings = recentData?.items ?? [];

  // ── AI Search state ──────────────────────────────────────────────────────
  const [aiResults, setAiResults] = useState<AiSearchResponse | null>(null);
  const [aiSearching, setAiSearching] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const resultsRef = useRef<HTMLElement>(null);

  const handleResults = (res: AiSearchResponse | null) => {
    setAiResults(res);
    if (res) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  };

  const handleClose = () => {
    setAiResults(null);
    setAiQuery('');
  };

  const totalListings = recentData?.meta?.totalItems;

  return (
    <div className="space-y-14">

      {/* ── Hero Section ── */}
      <section
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #0A2A42 0%, #0D3356 50%, #0A2A42 100%)',
          minHeight: '380px',
        }}
      >
        {/* Cyan arc — top-right */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }}
        />
        {/* Coral arc — bottom-left */}
        <div
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }}
        />
        {/* Diagonal cut at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '60px',
            background: 'linear-gradient(to bottom-right, transparent 49%, #F1F5F9 50%)',
          }}
        />

        <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-3xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold mb-5"
            style={{
              background: 'rgba(6,182,212,0.12)',
              borderColor: 'rgba(6,182,212,0.3)',
              color: '#06B6D4',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Rwanda's Premier Property &amp; Vehicle Marketplace
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1]">
            Buy, Sell &amp; Rent
            <br />
            <span
              className="inline-block mt-1"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                background: 'linear-gradient(90deg, #06B6D4 0%, #F97316 100%)',
                backgroundClip: 'text',
              }}
            >
              with Confidence in Rwanda.
            </span>
          </h1>

          <p className="text-sm text-slate-300 mt-4 max-w-xl leading-relaxed">
            Connect directly with verified owners, licensed real-estate brokers, and top vehicle
            dealers across Kigali and all Rwanda provinces.
          </p>

          {/* AI Search Bar */}
          <div className="mt-8">
            <AiSearchBar
              onResults={handleResults}
              onSearching={setAiSearching}
              onQueryChange={setAiQuery}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10 text-xs">
            {[
              { value: totalListings ? `${totalListings}+` : '1,200+', label: 'Verified Listings' },
              { value: '500+', label: 'Trusted Sellers' },
              { value: '100%', label: 'Transparent Prices' },
            ].map(({ value, label }) => (
              <div key={label}>
                <span
                  className="text-xl font-black block"
                  style={{ color: '#06B6D4' }}
                >
                  {value}
                </span>
                <span className="text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Search Results ── */}
      {aiSearching && (
        <section className="ai-rs-skeleton-section">
          <div className="ai-rs-skeleton-header">
            <div className="ai-rs-skeleton-bar ai-rs-skeleton-bar--wide" />
            <div className="ai-rs-skeleton-bar ai-rs-skeleton-bar--narrow" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        </section>
      )}

      {aiResults && !aiSearching && (
        <AiSearchResults
          response={aiResults}
          query={aiQuery}
          onClose={handleClose}
          sectionRef={resultsRef}
        />
      )}

      {/* ── Categories ── */}
      <section>
        <SectionHeader
          title="Browse by Category"
          subtitle="Explore verified properties, plots, and vehicles across Rwanda"
          viewAllHref="/marketplace"
        />
        {catsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </section>

      {/* ── Featured Listings ── */}
      <section>
        <SectionHeader
          title="Featured Listings"
          subtitle="Hand-picked verified properties and vehicles with priority status"
          viewAllHref="/marketplace"
        />
        {featuredLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>

      {/* ── Recently Added ── */}
      <section>
        <SectionHeader
          title="Recently Added Listings"
          subtitle="Fresh real estate and vehicle listings posted today"
          viewAllHref="/marketplace"
        />
        {recentLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {recentListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>

      {/* ── Trust Section ── */}
      <section className="bg-white border border-baza-border rounded-2xl p-6 sm:p-10 shadow-baza">
        <div className="max-w-2xl mb-8">
          <span
            className="text-xs font-extrabold uppercase tracking-widest"
            style={{ color: '#F97316' }}
          >
            Why BAZA?
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-baza-navy mt-1">
            Built on Trust, Transparency &amp; Safety
          </h2>
          <p className="text-sm text-baza-text-secondary mt-2 leading-relaxed">
            Finding a house or car in Rwanda shouldn't be stressful. BAZA brings order to the
            market with verified identity checks and reviewed listings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: <ShieldCheck className="w-5 h-5" />,
              iconColor: '#06B6D4',
              bgColor: 'rgba(6,182,212,0.10)',
              title: 'Verified User Badges',
              desc: 'Sellers, brokers, and vehicle dealers undergo identity verification before receiving verified badges.',
            },
            {
              icon: <CheckCircle2 className="w-5 h-5" />,
              iconColor: '#0A2A42',
              bgColor: 'rgba(10,42,66,0.08)',
              title: 'Reviewed Listings',
              desc: 'Listings are reviewed by platform administrators to ensure real photos and accurate pricing.',
            },
            {
              icon: <TrendingUp className="w-5 h-5" />,
              iconColor: '#F97316',
              bgColor: 'rgba(249,115,22,0.10)',
              title: 'Direct Communication',
              desc: 'Send instant contact requests or schedule site visits directly with owners and agents.',
            },
          ].map(({ icon, iconColor, bgColor, title, desc }) => (
            <div key={title} className="p-5 rounded-baza bg-baza-bg border border-slate-200 group hover:border-baza-cyan/30 hover:shadow-baza transition-all">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform"
                style={{ background: bgColor, color: iconColor }}
              >
                {icon}
              </div>
              <h3 className="text-sm font-bold text-baza-navy">{title}</h3>
              <p className="text-xs text-baza-text-secondary mt-1.5 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, #0A2A42 0%, #0D3356 60%, #0A2A42 100%)' }}
      >
        {/* Coral glow */}
        <div
          className="absolute -right-10 -top-10 w-48 h-48 rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)' }}
        />
        {/* Coral accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #F97316 0%, #06B6D4 100%)' }}
        />

        <div className="relative z-10">
          <h2 className="text-xl sm:text-2xl font-black">
            Ready to Sell or Rent out Property or Vehicles?
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            List your house, plot, apartment, or car on BAZA today and reach thousands of
            interested buyers in Rwanda.
          </p>
        </div>

        <Link to="/listings/new" className="relative z-10 flex-shrink-0">
          <Button
            variant="coral"
            size="lg"
            className="whitespace-nowrap"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Post Your Listing Now
          </Button>
        </Link>
      </section>
    </div>
  );
};
