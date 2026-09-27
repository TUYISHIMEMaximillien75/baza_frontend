import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Eye, ArrowRight, FileCheck, Lock, UserCheck } from 'lucide-react';

export const TrustPage: React.FC = () => {
  return (
    <div style={{ background: '#EDEBE5', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', minHeight: '100vh' }}>
      {/* ── Hero ── */}
      <div style={{ background: '#0A2A42' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded mb-4" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '13px' }}>
            <ShieldCheck className="w-4 h-4 text-[#C17D2E]" />
            Trust & Verification Guide
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
            How trust & verification work on BAZA
          </h1>
          <p
            className="mt-5 mx-auto text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '46ch' }}
          >
            Buying land, housing, or vehicles requires clear verification. Here is how BAZA protects buyers and confirms authentic sellers.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* ── 1. Verification Badges ── */}
        <section className="bg-white rounded-lg p-8" style={{ border: '1px solid #E5E1DA' }}>
          <div className="border-b pb-4 mb-6" style={{ borderColor: '#E5E1DA' }}>
            <h2
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: '1.6rem',
                fontWeight: 400,
                color: '#0D1E2C',
              }}
            >
              Seller verification badges
            </h2>
            <p className="text-sm mt-1" style={{ color: '#4A5568' }}>
              Recognise verified accounts when browsing listings across BAZA
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg" style={{ background: '#F5F3EF', border: '1px solid #E5E1DA' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-semibold mb-3" style={{ background: '#EBF2ED', color: '#2A4A35', border: '1px solid #2A4A3533' }}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified seller badge
              </div>
              <h3 className="text-base font-semibold" style={{ color: '#0D1E2C' }}>Property & land sellers</h3>
              <p className="text-xs leading-relaxed mt-2" style={{ color: '#4A5568' }}>
                Assigned to sellers who have provided verified National ID documentation and account confirmation. Indicates an accountable, traceable listing source.
              </p>
            </div>

            <div className="p-6 rounded-lg" style={{ background: '#F5F3EF', border: '1px solid #E5E1DA' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-semibold mb-3" style={{ background: '#F4EDE6', color: '#7C4A22', border: '1px solid #7C4A2233' }}>
                <UserCheck className="w-3.5 h-3.5" /> Registered dealer badge
              </div>
              <h3 className="text-base font-semibold" style={{ color: '#0D1E2C' }}>Vehicle & commercial dealers</h3>
              <p className="text-xs leading-relaxed mt-2" style={{ color: '#4A5568' }}>
                Assigned to registered motor vehicle dealerships and commercial property agencies with physical business locations in Rwanda.
              </p>
            </div>
          </div>
        </section>

        {/* ── 2. Best Practices ── */}
        <section className="bg-white rounded-lg p-8" style={{ border: '1px solid #E5E1DA' }}>
          <div className="border-b pb-4 mb-6" style={{ borderColor: '#E5E1DA' }}>
            <h2
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: '1.6rem',
                fontWeight: 400,
                color: '#0D1E2C',
              }}
            >
              Guidelines for buyers
            </h2>
            <p className="text-sm mt-1" style={{ color: '#4A5568' }}>
              Recommended steps before committing to any transaction in Rwanda
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 rounded-lg" style={{ background: '#F5F3EF' }}>
              <div className="w-9 h-9 rounded flex items-center justify-center shrink-0" style={{ background: '#0A2A42', color: '#fff' }}>
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>Verify official title documents (UPI for Land)</h4>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: '#4A5568' }}>
                  For land and house transactions, verify the Unique Parcel Identifier (UPI) through official Land Authority channels before transferring funds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-lg" style={{ background: '#F5F3EF' }}>
              <div className="w-9 h-9 rounded flex items-center justify-center shrink-0" style={{ background: '#7C4A22', color: '#fff' }}>
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>Conduct physical site visits</h4>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: '#4A5568' }}>
                  Always inspect plot boundaries, building conditions, or vehicle engines in person with a trusted technician or surveyor prior to payment.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-lg" style={{ background: '#F5F3EF' }}>
              <div className="w-9 h-9 rounded flex items-center justify-center shrink-0" style={{ background: '#2A4A35', color: '#fff' }}>
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>Use traceable payment methods</h4>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: '#4A5568' }}>
                  Complete transactions via bank transfer or notarised legal contracts when transferring property titles or vehicle logbooks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Application Process ── */}
        <section className="bg-white rounded-lg p-8" style={{ border: '1px solid #E5E1DA' }}>
          <div className="border-b pb-4 mb-6" style={{ borderColor: '#E5E1DA' }}>
            <h2
              style={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: '1.6rem',
                fontWeight: 400,
                color: '#0D1E2C',
              }}
            >
              Applying for seller verification
            </h2>
            <p className="text-sm mt-1" style={{ color: '#4A5568' }}>
              Build confidence with buyers and feature your listings
            </p>
          </div>

          <ol className="space-y-3 text-sm" style={{ color: '#4A5568' }}>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: '#0A2A42', color: '#fff' }}>1</span>
              <span>Register a BAZA seller account through the portal.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: '#0A2A42', color: '#fff' }}>2</span>
              <span>Navigate to the Verification section in your seller dashboard.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: '#0A2A42', color: '#fff' }}>3</span>
              <span>Upload your National ID copy or official business registration certificate.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: '#0A2A42', color: '#fff' }}>4</span>
              <span>Upon review, your seller profile is awarded the verified badge.</span>
            </li>
          </ol>

          <div className="mt-8">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: '#C17D2E' }}
            >
              Create seller account
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};
