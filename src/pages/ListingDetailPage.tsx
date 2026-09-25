import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Heart, Phone, ShieldCheck, X, Send, User, MessageSquare, Clock } from 'lucide-react';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Badge } from '../components/ui/Badge';
import { VerificationBadge } from '../components/ui/VerificationBadge';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Skeleton } from '../components/feedback/Skeleton';
import { ErrorState } from '../components/feedback/ErrorState';
import { useListingDetail } from '../hooks/useListings';
import { useToggleSave } from '../hooks/useSavedListings';
import { useSessionStore } from '../store';
import { contactRequestsService, visitRequestsService } from '../services/contactVisitService';

// ─── Contact Modal ────────────────────────────────────────────────────────────
interface ContactModalProps {
  listingId: string;
  listingTitle: string;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ listingId, listingTitle, onClose }) => {
  const { user } = useSessionStore();
  const [form, setForm] = useState({
    name: `${(user as any)?.firstName ?? ''} ${(user as any)?.lastName ?? ''}`.trim(),
    phoneNumber: (user as any)?.phoneNumber ?? '',
    email: (user as any)?.email ?? '',
    message: `Hello, I am interested in "${listingTitle}". Is it still available?`,
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await contactRequestsService.create({ listingId, ...form });
      setDone(true);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? err?.message ?? 'Failed to send. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-baza-border">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-baza-green" />
            <h2 className="text-sm font-bold text-baza-navy">Contact Seller</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-baza-green-light flex items-center justify-center mx-auto mb-3">
              <Send className="w-5 h-5 text-baza-green-dark" />
            </div>
            <h3 className="text-sm font-bold text-baza-navy mb-1">Message Sent!</h3>
            <p className="text-xs text-baza-text-secondary">The seller will receive your contact details and get back to you shortly.</p>
            <Button variant="primary" size="sm" className="mt-4" onClick={onClose}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && <p className="text-xs text-baza-error bg-red-50 border border-red-200 rounded-baza px-3 py-2">{error}</p>}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-baza-text-primary block mb-1">Full Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-baza-border rounded-baza px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-baza-green/30"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-baza-text-primary block mb-1">Phone Number *</label>
                <input
                  required
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  className="w-full border border-baza-border rounded-baza px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-baza-green/30"
                  placeholder="+250 788 ..."
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-baza-text-primary block mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-baza-border rounded-baza px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-baza-green/30"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-baza-text-primary block mb-1">Message *</label>
              <textarea
                required
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-baza-border rounded-baza px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-baza-green/30 resize-none"
              />
            </div>
            <Button type="submit" variant="primary" fullWidth isLoading={submitting} leftIcon={<Send className="w-4 h-4" />}>
              Send Message
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

// ─── Visit Request Modal ──────────────────────────────────────────────────────
interface VisitModalProps {
  listingId: string;
  listingTitle: string;
  onClose: () => void;
}

const VisitModal: React.FC<VisitModalProps> = ({ listingId, listingTitle, onClose }) => {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    preferredDate: '',
    preferredTime: '10:00 AM',
    message: `I would like to schedule a site visit for "${listingTitle}".`,
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await visitRequestsService.create({ listingId, ...form });
      setDone(true);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? err?.message ?? 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-baza-border">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-baza-green" />
            <h2 className="text-sm font-bold text-baza-navy">Request Site Visit</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-baza-green-light flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-5 h-5 text-baza-green-dark" />
            </div>
            <h3 className="text-sm font-bold text-baza-navy mb-1">Visit Request Sent!</h3>
            <p className="text-xs text-baza-text-secondary">The seller will confirm your preferred date and time. Check your alerts for updates.</p>
            <Button variant="primary" size="sm" className="mt-4" onClick={onClose}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && <p className="text-xs text-baza-error bg-red-50 border border-red-200 rounded-baza px-3 py-2">{error}</p>}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-baza-text-primary block mb-1">Preferred Date *</label>
                <input
                  required
                  type="date"
                  min={today}
                  value={form.preferredDate}
                  onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                  className="w-full border border-baza-border rounded-baza px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-baza-green/30"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-baza-text-primary block mb-1">Preferred Time</label>
                <select
                  value={form.preferredTime}
                  onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                  className="w-full border border-baza-border rounded-baza px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-baza-green/30 bg-white"
                >
                  {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-baza-text-primary block mb-1">Message</label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-baza-border rounded-baza px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-baza-green/30 resize-none"
              />
            </div>
            <Button type="submit" variant="primary" fullWidth isLoading={submitting} leftIcon={<Clock className="w-4 h-4" />}>
              Submit Visit Request
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export const ListingDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showContact, setShowContact] = useState(false);
  const [showVisit, setShowVisit] = useState(false);

  const { data: listing, isLoading, isError, error } = useListingDetail(slug ?? '');
  const { isSaved, toggle: toggleSave, isLoading: saveLoading } = useToggleSave(listing?.id ?? '');
  const { isAuthenticated } = useSessionStore();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-64 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="aspect-video w-full rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
          <div>
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !listing) {
    return (
      <ErrorState
        title="Listing not found"
        message={(error as any)?.message ?? 'This listing may have been removed or is no longer available.'}
      />
    );
  }

  const formattedPrice = new Intl.NumberFormat('rw-RW', {
    style: 'currency',
    currency: listing.currency || 'RWF',
    maximumFractionDigits: 0,
  }).format(listing.price);

  return (
    <>
      {showContact && (
        <ContactModal
          listingId={listing.id}
          listingTitle={listing.title}
          onClose={() => setShowContact(false)}
        />
      )}
      {showVisit && (
        <VisitModal
          listingId={listing.id}
          listingTitle={listing.title}
          onClose={() => setShowVisit(false)}
        />
      )}

      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: 'Marketplace', href: '/marketplace' },
            { label: listing.category, href: `/marketplace?category=${listing.categorySlug}` },
            { label: listing.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-baza-border rounded-2xl overflow-hidden shadow-baza">
              {/* Cover Image */}
              <div className="relative aspect-video w-full bg-slate-900">
                {listing.coverImageUrl ? (
                  <img src={listing.coverImageUrl} alt={listing.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">No image available</div>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant={listing.purpose === 'SALE' ? 'green' : 'navy'}>
                    For {listing.purpose === 'SALE' ? 'Sale' : 'Rent'}
                  </Badge>
                  {listing.isVerified && <VerificationBadge type="VERIFIED_LISTING" />}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-baza-green-dark uppercase tracking-wider mb-2">
                  {listing.category}
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-baza-navy leading-tight">{listing.title}</h1>
                <div className="flex items-center gap-2 text-xs text-baza-text-secondary mt-2">
                  <MapPin className="w-4 h-4 text-baza-green" />
                  <span>{listing.location}</span>
                  {listing.createdAt && (
                    <>
                      <span>&bull;</span>
                      <span>Posted {new Date(listing.createdAt).toLocaleDateString('en-RW', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-baza-border flex items-center justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-baza-navy">{formattedPrice}</span>
                    {listing.purpose === 'RENT' && <span className="text-xs text-baza-text-secondary"> / month</span>}
                  </div>
                  {isAuthenticated && (
                    <Button
                      variant={isSaved ? 'danger' : 'outline'}
                      size="sm"
                      onClick={() => toggleSave()}
                      isLoading={saveLoading}
                      leftIcon={<Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />}
                    >
                      {isSaved ? 'Saved' : 'Save'}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-baza-border rounded-2xl p-6 shadow-baza space-y-3">
              <h3 className="text-base font-bold text-baza-navy">Description</h3>
              <p className="text-xs sm:text-sm text-baza-text-primary leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>
          </div>

          {/* Seller Card */}
          <div className="space-y-6">
            <div className="bg-white border border-baza-border rounded-2xl p-6 shadow-baza space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-baza-text-secondary">Seller Information</h3>

              <div className="flex items-center gap-3">
                <Avatar name={listing.ownerName} size="lg" />
                <div>
                  <h4 className="text-sm font-bold text-baza-navy">{listing.ownerName}</h4>
                  <div className="mt-0.5">
                    <VerificationBadge type={(listing.ownerRole as any) || 'SELLER'} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-baza-border space-y-2">
                <Button
                  variant="primary"
                  fullWidth
                  leftIcon={<Phone className="w-4 h-4" />}
                  onClick={() => setShowContact(true)}
                >
                  Contact Seller
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  leftIcon={<Calendar className="w-4 h-4" />}
                  onClick={() => setShowVisit(true)}
                >
                  Request Site Visit
                </Button>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-baza-green" />
                Your enquiry is handled securely by BAZA
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
