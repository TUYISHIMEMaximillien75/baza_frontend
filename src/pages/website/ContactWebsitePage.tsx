import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const ContactWebsitePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ background: '#EDEBE5', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', minHeight: '100vh' }}>
      {/* ── Hero ── */}
      <div style={{ background: '#0A2A42' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded mb-4" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '13px' }}>
            Contact & Support
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
            Get in touch with BAZA
          </h1>
          <p
            className="mt-5 mx-auto text-base leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '46ch' }}
          >
            Have questions about seller registration, listing verification, or marketplace support? We are here to help.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-lg" style={{ border: '1px solid #E5E1DA' }}>
              <h3 className="text-base font-semibold border-b pb-3 mb-4" style={{ color: '#0D1E2C', borderColor: '#E5E1DA' }}>
                Platform support
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ background: '#0A2A42', color: '#fff' }}>
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0D1E2C' }}>Seller verification</h4>
                    <p className="mt-0.5" style={{ color: '#4A5568' }}>Assistance with National ID verification and badge requests.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ background: '#7C4A22', color: '#fff' }}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0D1E2C' }}>Rwanda geographic coverage</h4>
                    <p className="mt-0.5" style={{ color: '#4A5568' }}>Support across Kigali City and all 4 regional provinces.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ background: '#2A4A35', color: '#fff' }}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: '#0D1E2C' }}>Direct marketplace access</h4>
                    <p className="mt-0.5" style={{ color: '#4A5568' }}>Access listings directly via the marketplace app.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg" style={{ border: '1px solid #E5E1DA' }}>
              <h4 className="text-sm font-semibold" style={{ color: '#0D1E2C' }}>Looking to sell?</h4>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: '#4A5568' }}>
                Create your seller account to list houses, land plots, or vehicles.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 text-xs font-semibold mt-3 hover:underline"
                style={{ color: '#C17D2E' }}
              >
                Register seller account <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-lg" style={{ border: '1px solid #E5E1DA' }}>
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ background: '#2A4A35', color: '#fff' }}>
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 style={{ fontFamily: '"DM Serif Display", Georgia, serif', fontSize: '1.5rem', color: '#0D1E2C', fontWeight: 400 }}>
                  Message received
                </h3>
                <p className="text-sm max-w-md mx-auto" style={{ color: '#4A5568' }}>
                  Thank you for contacting BAZA. Our team will review your inquiry and get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="text-xs font-semibold underline pt-2"
                  style={{ color: '#0A2A42' }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3
                  style={{
                    fontFamily: '"DM Serif Display", Georgia, serif',
                    fontSize: '1.5rem',
                    color: '#0D1E2C',
                    fontWeight: 400,
                  }}
                  className="border-b pb-3"
                >
                  Send a message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold" style={{ color: '#0D1E2C' }}>Your full name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jean Paul"
                      className="w-full rounded px-3.5 py-2 text-sm focus:outline-none"
                      style={{ background: '#F5F3EF', border: '1px solid #E5E1DA', color: '#0D1E2C' }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold" style={{ color: '#0D1E2C' }}>Email address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. user@domain.rw"
                      className="w-full rounded px-3.5 py-2 text-sm focus:outline-none"
                      style={{ background: '#F5F3EF', border: '1px solid #E5E1DA', color: '#0D1E2C' }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold" style={{ color: '#0D1E2C' }}>Topic / Category</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded px-3.5 py-2 text-sm focus:outline-none"
                    style={{ background: '#F5F3EF', border: '1px solid #E5E1DA', color: '#0D1E2C' }}
                  >
                    <option value="General Inquiry">General Platform Inquiry</option>
                    <option value="Seller Verification">Seller Verification & Badges</option>
                    <option value="Listing Support">Listing Support (Houses, Land, Vehicles)</option>
                    <option value="Technical Question">Technical / Account Assistance</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold" style={{ color: '#0D1E2C' }}>Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry..."
                    className="w-full rounded px-3.5 py-2 text-sm focus:outline-none resize-none"
                    style={{ background: '#F5F3EF', border: '1px solid #E5E1DA', color: '#0D1E2C' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded text-sm font-bold text-white transition hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ background: '#C17D2E' }}
                >
                  <Send className="w-4 h-4" />
                  <span>Send message</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
