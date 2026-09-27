import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Car, MapPin, ShieldCheck } from 'lucide-react';

const PROVINCES = [
  { name: 'Kigali City',        districts: 'Nyarugenge, Gasabo, Kicukiro' },
  { name: 'Eastern Province',   districts: 'Rwamagana, Bugesera, Kayonza, Ngoma…' },
  { name: 'Northern Province',  districts: 'Musanze, Gicumbi, Rulindo, Burera…' },
  { name: 'Western Province',   districts: 'Rubavu, Karongi, Rusizi, Ngororero…' },
  { name: 'Southern Province',  districts: 'Huye, Muhanga, Ruhango, Nyamagabe…' },
];

export const AboutPage: React.FC = () => {
  return (
    <div style={{ background: '#EDEBE5', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
      {/* ── Hero ── */}
      <div style={{ background: '#0A2A42' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1
            className="text-white"
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
            }}
          >
            Rwanda's marketplace for physical things — houses, land, and vehicles.
          </h1>
          <p
            className="mt-5 mx-auto text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '42ch' }}
          >
            BAZA brings structure and direct contact to property and vehicle markets across all five provinces.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">

        {/* ── Why BAZA ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                fontWeight: 400,
                color: '#0D1E2C',
              }}
            >
              Why BAZA was created
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: '#4A5568' }}>
              Finding a plot in Bugesera, renting a flat in Kicukiro, or buying a vehicle used to depend on informal word-of-mouth or unverified social media posts. BAZA gives those assets a structured home — accurately categorised, precisely located, and with direct contact to the person selling.
            </p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: '#4A5568' }}>
              We built for Rwanda specifically, not adapted from a foreign template. Location structure follows Rwanda's actual administrative hierarchy. Category names reflect what people here actually buy and sell.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: <Building2 className="w-5 h-5" />, color: '#2A4A35', bg: '#EBF2ED', label: 'Residential & commercial property', desc: 'Apartments, houses, offices across Kigali and regional towns.' },
              { icon: <MapPin className="w-5 h-5" />,     color: '#7C4A22', bg: '#F4EDE6', label: 'Land & agricultural plots', desc: 'Residential plots, farm land, commercial sites.' },
              { icon: <Car className="w-5 h-5" />,        color: '#0A2A42', bg: '#E6EEF4', label: 'Vehicles & transport', desc: 'Cars, SUVs, trucks, motorcycles — owner or dealer.' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-4 rounded-lg"
                style={{ background: item.bg, border: `1px solid ${item.color}22` }}
              >
                <div
                  className="w-9 h-9 rounded flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: item.color, color: '#fff' }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>{item.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#4A5568' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Geographic precision ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                fontWeight: 400,
                color: '#0D1E2C',
              }}
            >
              Built to Rwanda's geography
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: '#4A5568' }}>
              Listings are organised by Province → District → Sector. When a buyer searches in Gasabo, they see only listings placed in Gasabo — not listings vaguely tagged "Kigali area."
            </p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: '#4A5568' }}>
              5 provinces, 30 districts, sector-level precision — the full administrative hierarchy that Rwanda uses.
            </p>
          </div>

          {/* Province table — no monospace decoration, plain readable list */}
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: '1px solid #E5E1DA', background: '#fff' }}
          >
            <div className="px-5 py-3.5" style={{ borderBottom: '1px solid #E5E1DA', background: '#F5F3EF' }}>
              <p className="text-xs font-semibold" style={{ color: '#0D1E2C' }}>5 Provinces · 30 Districts</p>
            </div>
            <div className="divide-y" style={{ borderColor: '#E5E1DA' }}>
              {PROVINCES.map((p) => (
                <div key={p.name} className="flex items-start gap-4 px-5 py-3.5">
                  <p className="text-sm font-semibold w-36 flex-shrink-0" style={{ color: '#0D1E2C' }}>{p.name}</p>
                  <p className="text-xs" style={{ color: '#4A5568' }}>{p.districts}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="rounded-lg px-8 py-12 text-center"
          style={{ background: '#0A2A42' }}
        >
          <h2
            className="text-white"
            style={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
              fontWeight: 400,
            }}
          >
            Ready to browse or list?
          </h2>
          <p className="mt-3 text-sm mx-auto" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '36ch' }}>
            Browse active listings or create your seller account today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: '#C17D2E' }}
            >
              Browse the marketplace
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/trust"
              className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-semibold transition-all hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.75)' }}
            >
              <ShieldCheck className="w-4 h-4" />
              How trust works
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
