import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { ListingCard } from '../components/common/ListingCard';
import { EmptyState } from '../components/feedback/EmptyState';
import { Skeleton } from '../components/feedback/Skeleton';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { Tabs } from '../components/ui/Tabs';
import { Pagination } from '../components/ui/Pagination';
import { useCategories } from '../hooks/useCategories';
import { useListings } from '../hooks/useListings';
import { useDebounce } from '../hooks/useDebounce';
import type { ListingFilters } from '../services/listingsService';
import { getProvinces, getDistricts } from '../data/rwandaLocations';

export const MarketplacePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Derive all filter values directly from URL — single source of truth
  const activeTab = searchParams.get('category') ?? 'all';
  const search = searchParams.get('search') ?? '';
  const purposeFilter = (searchParams.get('purpose') as 'ALL' | 'SALE' | 'RENT') ?? 'ALL';
  const minPrice = searchParams.get('minPrice') ?? '';
  const maxPrice = searchParams.get('maxPrice') ?? '';
  const province = searchParams.get('province') ?? '';
  const district = searchParams.get('district') ?? '';
  const page = Number(searchParams.get('page') ?? '1');

  // Debounce search
  const debouncedSearch = useDebounce(search, 350);

  const { data: categories = [], isLoading: catsLoading } = useCategories();

  // Helper to update filter params in URL
  const updateParam = (updates: Record<string, string | null>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '' || value === 'all' || value === 'ALL') {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      });
      next.delete('page'); // reset to page 1
      return next;
    });
  };

  // Build filter object for API query
  const filters: ListingFilters = {
    page,
    limit: 12,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(activeTab !== 'all' && { categorySlug: activeTab }),
    ...(purposeFilter !== 'ALL' && { purpose: purposeFilter }),
    ...(minPrice && { minPrice: Number(minPrice) }),
    ...(maxPrice && { maxPrice: Number(maxPrice) }),
    ...(province && { province }),
    ...(district && { district }),
  };

  const { data, isLoading, isFetching } = useListings(filters);
  const listings = data?.items ?? [];
  const meta = data?.meta;

  const availableDistricts = province ? getDistricts(province) : [];

  const tabs = [
    { id: 'all', label: 'All Categories' },
    ...(catsLoading ? [] : categories.map((c) => ({ id: c.slug, label: c.name }))),
  ];

  const hasActiveFilters =
    activeTab !== 'all' || purposeFilter !== 'ALL' || debouncedSearch || minPrice || maxPrice || province || district;

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketplace"
        description="Search through houses, apartments, land, and vehicles for sale or rent in Rwanda."
      />

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput
          value={search}
          onChange={(val) => updateParam({ search: val })}
          className="flex-1"
        />
        <Button
          variant={showFilters ? 'primary' : 'outline'}
          size="md"
          onClick={() => setShowFilters(!showFilters)}
          leftIcon={<SlidersHorizontal className="w-4 h-4" />}
        >
          Filters {hasActiveFilters && <span className="ml-1 w-2 h-2 rounded-full bg-baza-coral inline-block" />}
        </Button>
        {hasActiveFilters && (
          <Button variant="ghost" size="md" onClick={clearFilters} leftIcon={<X className="w-4 h-4" />}>
            Clear All
          </Button>
        )}
      </div>

      {/* Category Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={(tab) => updateParam({ category: tab })}
      />

      {/* Filter Panel */}
      {showFilters && (
        <div className="p-4 bg-white border border-baza-border border-l-2 rounded-baza shadow-baza flex flex-wrap gap-6 items-center" style={{ borderLeftColor: '#06B6D4' }}>
          {/* Purpose */}
          <div>
            <span className="text-xs font-bold text-baza-text-secondary block mb-1.5">Listing Purpose</span>
            <div className="flex gap-1.5">
              {(['ALL', 'SALE', 'RENT'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => updateParam({ purpose: p })}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                    purposeFilter === p
                      ? 'bg-baza-navy text-white border-baza-navy'
                      : 'bg-white text-baza-text-primary border-baza-border hover:bg-slate-50'
                  }`}
                >
                  {p === 'ALL' ? 'All' : p === 'SALE' ? 'For Sale' : 'For Rent'}
                </button>
              ))}
            </div>
          </div>

          {/* Location Cascades */}
          <div>
            <span className="text-xs font-bold text-baza-text-secondary block mb-1.5">Province</span>
            <select
              value={province}
              onChange={(e) => updateParam({ province: e.target.value, district: null })}
              className="px-3 py-1.5 text-xs rounded-baza border border-baza-border bg-white focus:outline-none focus:ring-2 focus:ring-baza-navy/30"
            >
              <option value="">All Provinces</option>
              {getProvinces().map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {province && (
            <div>
              <span className="text-xs font-bold text-baza-text-secondary block mb-1.5">District</span>
              <select
                value={district}
                onChange={(e) => updateParam({ district: e.target.value })}
                className="px-3 py-1.5 text-xs rounded-baza border border-baza-border bg-white focus:outline-none focus:ring-2 focus:ring-baza-navy/30"
              >
                <option value="">All Districts</option>
                {availableDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price Range */}
          <div>
            <span className="text-xs font-bold text-baza-text-secondary block mb-1.5">Price Range (RWF)</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => updateParam({ minPrice: e.target.value })}
                className="w-24 border border-baza-border rounded-baza px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-baza-navy/30 focus:border-baza-navy"
              />
              <span className="text-xs text-slate-400">—</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => updateParam({ maxPrice: e.target.value })}
                className="w-24 border border-baza-border rounded-baza px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-baza-navy/30 focus:border-baza-navy"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center">
            <button onClick={clearFilters} className="text-xs font-semibold text-baza-coral hover:underline">
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Results count */}
      {!isLoading && meta && (
        <p className="text-xs text-baza-text-secondary">
          {isFetching ? 'Updating...' : `${meta.totalItems} listing${meta.totalItems !== 1 ? 's' : ''} found`}
        </p>
      )}

      {/* Listings Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : listings.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={meta.currentPage}
                totalPages={meta.totalPages}
                onPageChange={(p) =>
                  setSearchParams((prev) => {
                    const next = new URLSearchParams(prev);
                    next.set('page', String(p));
                    return next;
                  })
                }
              />
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title="No listings found"
          description="Try adjusting your search criteria or clear active filters to see more listings."
          actionLabel="Clear All Filters"
          onAction={clearFilters}
        />
      )}
    </div>
  );
};
