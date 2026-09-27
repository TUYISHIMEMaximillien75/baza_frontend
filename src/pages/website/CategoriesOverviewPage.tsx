import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Car, ArrowRight } from 'lucide-react';

export const CategoriesOverviewPage: React.FC = () => {
  return (
    <div style={{ background: '#EDEBE5', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', minHeight: '100vh' }}>
      {/* ── Hero ── */}
      <div style={{ background: '#0A2A42' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded mb-4" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '13px' }}>
            Category Directory
          </div>
          <h1
            className="text-white"
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            Property & vehicle categories across Rwanda
          </h1>
          <p
            className="mt-5 mx-auto text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '46ch' }}
          >
            Browse curated categories and navigate directly into filtered marketplace listings in all 30 districts.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* ── Category 1: Houses ── */}
        <section id="houses" className="bg-white rounded-lg p-8" style={{ border: '1px solid #E5E1DA' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-6 gap-4" style={{ borderColor: '#E5E1DA' }}>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded flex items-center justify-center" style={{ background: '#0A2A42', color: '#fff' }}>
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: '1.6rem', color: '#0D1E2C', fontWeight: 400 }}>
                  Houses & real estate
                </h2>
                <p className="text-xs mt-0.5" style={{ color: '#4A5568' }}>Apartments, standalone homes, villas, and commercial properties</p>
              </div>
            </div>
            <Link
              to="/marketplace?category=houses"
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold text-white transition hover:opacity-90 self-start sm:self-auto"
              style={{ background: '#0A2A42' }}
            >
              Browse houses
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-5 rounded-lg" style={{ background: '#F5F3EF', border: '1px solid #E5E1DA' }}>
              <h4 className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>Residential rentals</h4>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#4A5568' }}>
                Furnished and unfurnished apartments, townhouses, and family residences for monthly or annual lease.
              </p>
              <Link to="/marketplace?category=houses&purpose=RENT" className="inline-flex items-center gap-1 text-xs font-semibold mt-3 hover:underline" style={{ color: '#C17D2E' }}>
                Filter rental houses <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-5 rounded-lg" style={{ background: '#F5F3EF', border: '1px solid #E5E1DA' }}>
              <h4 className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>Property sales</h4>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#4A5568' }}>
                Completed residential houses, villas, and multi-unit developments available for purchase.
              </p>
              <Link to="/marketplace?category=houses&purpose=SALE" className="inline-flex items-center gap-1 text-xs font-semibold mt-3 hover:underline" style={{ color: '#C17D2E' }}>
                Filter houses for sale <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-5 rounded-lg" style={{ background: '#F5F3EF', border: '1px solid #E5E1DA' }}>
              <h4 className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>Commercial spaces</h4>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#4A5568' }}>
                Retail shopfronts, office suites, and logistics warehousing in Kigali and major secondary urban centers.
              </p>
              <Link to="/marketplace?category=commercial" className="inline-flex items-center gap-1 text-xs font-semibold mt-3 hover:underline" style={{ color: '#C17D2E' }}>
                Filter commercial real estate <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Category 2: Land ── */}
        <section id="land" className="bg-white rounded-lg p-8" style={{ border: '1px solid #E5E1DA' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-6 gap-4" style={{ borderColor: '#E5E1DA' }}>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded flex items-center justify-center" style={{ background: '#7C4A22', color: '#fff' }}>
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: '1.6rem', color: '#0D1E2C', fontWeight: 400 }}>
                  Land & plots
                </h2>
                <p className="text-xs mt-0.5" style={{ color: '#4A5568' }}>Residential parcels, commercial land, and agricultural acreage</p>
              </div>
            </div>
            <Link
              to="/marketplace?category=land"
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold text-white transition hover:opacity-90 self-start sm:self-auto"
              style={{ background: '#7C4A22' }}
            >
              Browse land
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-5 rounded-lg" style={{ background: '#F5F3EF', border: '1px solid #E5E1DA' }}>
              <h4 className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>Residential plots</h4>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#4A5568' }}>
                Surveyed plot parcels with building permits ready in Kigali and secondary towns.
              </p>
              <Link to="/marketplace?category=land&type=residential" className="inline-flex items-center gap-1 text-xs font-semibold mt-3 hover:underline" style={{ color: '#7C4A22' }}>
                Filter residential land <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-5 rounded-lg" style={{ background: '#F5F3EF', border: '1px solid #E5E1DA' }}>
              <h4 className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>Agricultural acreage</h4>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#4A5568' }}>
                Farm plots and agricultural land in Bugesera, Rwamagana, and Eastern Province.
              </p>
              <Link to="/marketplace?category=land&type=agricultural" className="inline-flex items-center gap-1 text-xs font-semibold mt-3 hover:underline" style={{ color: '#7C4A22' }}>
                Filter agricultural plots <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-5 rounded-lg" style={{ background: '#F5F3EF', border: '1px solid #E5E1DA' }}>
              <h4 className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>Commercial plots</h4>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#4A5568' }}>
                High-density zoned land suitable for commercial plazas, petrol stations, or mixed developments.
              </p>
              <Link to="/marketplace?category=land&type=commercial" className="inline-flex items-center gap-1 text-xs font-semibold mt-3 hover:underline" style={{ color: '#7C4A22' }}>
                Filter commercial land <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Category 3: Vehicles ── */}
        <section id="vehicles" className="bg-white rounded-lg p-8" style={{ border: '1px solid #E5E1DA' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-6 gap-4" style={{ borderColor: '#E5E1DA' }}>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded flex items-center justify-center" style={{ background: '#2A4A35', color: '#fff' }}>
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h2 style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: '1.6rem', color: '#0D1E2C', fontWeight: 400 }}>
                  Vehicles & transport
                </h2>
                <p className="text-xs mt-0.5" style={{ color: '#4A5568' }}>SUVs, personal cars, commercial trucks, and motorcycles</p>
              </div>
            </div>
            <Link
              to="/marketplace?category=vehicles"
              className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold text-white transition hover:opacity-90 self-start sm:self-auto"
              style={{ background: '#2A4A35' }}
            >
              Browse vehicles
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-5 rounded-lg" style={{ background: '#F5F3EF', border: '1px solid #E5E1DA' }}>
              <h4 className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>SUVs & personal cars</h4>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#4A5568' }}>
                Toyota RAV4, Land Cruisers, sedans, and compact vehicles from private owners and dealers.
              </p>
              <Link to="/marketplace?category=vehicles&type=cars" className="inline-flex items-center gap-1 text-xs font-semibold mt-3 hover:underline" style={{ color: '#2A4A35' }}>
                Filter automobiles <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-5 rounded-lg" style={{ background: '#F5F3EF', border: '1px solid #E5E1DA' }}>
              <h4 className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>Commercial trucks & vans</h4>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#4A5568' }}>
                Canter trucks, cargo vans, pickups, and logistics machinery for business operations.
              </p>
              <Link to="/marketplace?category=vehicles&type=commercial" className="inline-flex items-center gap-1 text-xs font-semibold mt-3 hover:underline" style={{ color: '#2A4A35' }}>
                Filter trucks & vans <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-5 rounded-lg" style={{ background: '#F5F3EF', border: '1px solid #E5E1DA' }}>
              <h4 className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>Motorcycles</h4>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#4A5568' }}>
                TVS, Honda, and city motorbikes in verified running condition across Rwanda.
              </p>
              <Link to="/marketplace?category=vehicles&type=motorcycles" className="inline-flex items-center gap-1 text-xs font-semibold mt-3 hover:underline" style={{ color: '#2A4A35' }}>
                Filter motorcycles <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded text-sm font-bold text-white transition hover:opacity-90"
            style={{ background: '#C17D2E' }}
          >
            Browse the marketplace app
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
