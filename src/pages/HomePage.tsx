import React, { useRef, useState } from 'react';
import { ShieldCheck, CheckCircle2, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
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
      // Smooth scroll to results section after a tiny delay for render
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  };

  const handleClose = () => {
    setAiResults(null);
    setAiQuery('');
  };

  return (
    <div className="space-y-12">
      {/* ── Hero Section ── */}
      <section className="relative rounded-2xl bg-gradient-to-br from-baza-navy via-slate-900 to-slate-950 text-white p-6 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-baza-green/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-baza-green/20 border border-baza-green/30 text-baza-green text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Rwanda's Premier Property &amp; Vehicle Marketplace
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Buy, Sell &amp; Rent with Confidence in Rwanda.
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-xl leading-relaxed">
            Connect directly with verified owners, licensed real-estate brokers, and top vehicle dealers across Kigali and all Rwanda provinces.
          </p>

          {/* AI Search Bar */}
          <div className="mt-8">
            <AiSearchBar
              onResults={handleResults}
              onSearching={setAiSearching}
              onQueryChange={setAiQuery}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800 text-xs">
            <div>
              <span className="text-lg font-black text-baza-green block">
                {recentData?.meta?.totalItems ? `${recentData.meta.totalItems}+` : '1,200+'}
              </span>
              <span className="text-slate-400">Verified Listings</span>
            </div>
            <div>
              <span className="text-lg font-black text-baza-green block">500+</span>
              <span className="text-slate-400">Trusted Sellers</span>
            </div>
            <div>
              <span className="text-lg font-black text-baza-green block">100%</span>
              <span className="text-slate-400">Transparent Prices</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Search Results Section (appears when search is done) ── */}
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

      {/* ── Categories Section ── */}
      <section>
        <SectionHeader
          title="Browse by Category"
          subtitle="Explore verified properties, plots, and vehicles across Rwanda"
          viewAllHref="/marketplace"
        />
        {catsLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {categories.map((cat) => <CategoryCard key={cat.id} category={cat} />)}
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
            {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
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
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {recentListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
          </div>
        )}
      </section>

      {/* ── Trust Section ── */}
      <section className="bg-white border border-baza-border rounded-2xl p-6 sm:p-10 shadow-baza">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-extrabold uppercase tracking-wider text-baza-green-dark">Why BAZA?</span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-baza-navy mt-1">Built on Trust, Transparency &amp; Safety</h2>
          <p className="text-xs sm:text-sm text-baza-text-secondary mt-2 leading-relaxed">
            Finding a house or car in Rwanda shouldn't be stressful. BAZA brings order to the market with verified identity checks and reviewed listings.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <ShieldCheck className="w-5 h-5" />, bg: 'bg-baza-green-light', color: 'text-baza-green-dark', title: 'Verified User Badges', desc: 'Sellers, brokers, and vehicle dealers undergo identity verification before receiving verified badges.' },
            { icon: <CheckCircle2 className="w-5 h-5" />, bg: 'bg-sky-100', color: 'text-baza-navy', title: 'Reviewed Listings', desc: 'Listings are reviewed by platform administrators to ensure real photos and accurate pricing.' },
            { icon: <TrendingUp className="w-5 h-5" />, bg: 'bg-amber-100', color: 'text-amber-700', title: 'Direct Communication', desc: 'Send instant contact requests or schedule site visits directly with owners and agents.' },
          ].map(({ icon, bg, color, title, desc }) => (
            <div key={title} className="p-4 rounded-baza bg-baza-bg border border-slate-200">
              <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center ${color} mb-3`}>{icon}</div>
              <h3 className="text-sm font-bold text-baza-navy">{title}</h3>
              <p className="text-xs text-baza-text-secondary mt-1 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-baza-green to-emerald-600 rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
        <div>
          <h2 className="text-xl sm:text-2xl font-black">Ready to Sell or Rent out Property or Vehicles?</h2>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl">
            List your house, plot, apartment, or car on BAZA today and reach thousands of interested buyers in Rwanda.
          </p>
        </div>
        <Link to="/listings/new">
          <Button variant="secondary" size="lg" className="whitespace-nowrap" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Post Your Listing Now
          </Button>
        </Link>
      </section>
    </div>
  );
};
