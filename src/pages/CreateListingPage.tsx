import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Building,
  MapPin,
  DollarSign,
  Image as ImageIcon,
  FileText,
  AlertCircle,
  Navigation,
  Loader2,
  Plus,
  Link as LinkIcon,
} from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { ImageUploader } from '../components/common/ImageUploader';
import { useCategories } from '../hooks/useCategories';
import listingsService from '../services/listingsService';

const createListingSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.coerce.number().min(1, 'Price must be greater than 0'),
  purpose: z.enum(['SALE', 'RENT']),
  categoryId: z.string().min(1, 'Please select a category'),
  coverImageUrl: z.string().optional(),
  province: z.string().optional(),
  district: z.string().optional(),
  sector: z.string().optional(), // Used for sector name or coordinates (lat, long)
});

type CreateListingForm = z.infer<typeof createListingSchema>;

// Keywords to filter out specific sub-types or private names (e.g. SUV, sedan) from category list
const EXCLUDED_CATEGORY_KEYWORDS = ['suv', 'sedan', 'hatchback', 'truck', 'residential land', 'agricultural land'];

// Clean default categories if API response is empty
const DEFAULT_CATEGORIES = [
  { id: 'property', name: 'Property' },
  { id: 'land', name: 'Land' },
  { id: 'vehicle', name: 'Vehicle' },
  { id: 'commercial', name: 'Commercial' },
];

export const CreateListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading: catsLoading } = useCategories();
  const [apiError, setApiError] = useState<string | null>(null);

  // State for uploaded image URLs
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);

  // Geolocation state
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateListingForm>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      purpose: 'SALE',
      province: 'Kigali City',
      district: 'Gasabo',
      sector: '',
    },
  });

  const selectedPurpose = watch('purpose');
  const selectedCoverUrl = watch('coverImageUrl');

  // Filter and deduplicate categories
  const categoryOptions = React.useMemo(() => {
    if (categories && categories.length > 0) {
      const seen = new Set<string>();
      const filtered = categories.filter((c) => {
        const lower = c.name.toLowerCase();
        if (EXCLUDED_CATEGORY_KEYWORDS.some((kw) => lower.includes(kw))) {
          return false;
        }
        if (seen.has(lower)) {
          return false;
        }
        seen.add(lower);
        return true;
      });

      if (filtered.length > 0) {
        return filtered.map((c) => ({
          value: c.id,
          label: c.name,
        }));
      }
    }

    return DEFAULT_CATEGORIES.map((c) => ({
      value: c.id,
      label: c.name,
    }));
  }, [categories]);

  const handleImagesChange = (newImages: string[]) => {
    setUploadedImages(newImages);
    if (newImages.length > 0 && !selectedCoverUrl) {
      setValue('coverImageUrl', newImages[0]);
    }
  };

  const handleCoverChange = (url: string) => {
    setValue('coverImageUrl', url);
  };

  // Add custom image URL manually
  const handleAddCustomUrl = () => {
    setUrlError(null);
    const trimmed = customUrlInput.trim();
    if (!trimmed) return;
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      setUrlError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    if (uploadedImages.length >= 10) {
      setUrlError('Maximum limit of 10 images reached.');
      return;
    }

    const updated = [...uploadedImages, trimmed];
    setUploadedImages(updated);
    if (!selectedCoverUrl) {
      setValue('coverImageUrl', trimmed);
    }
    setCustomUrlInput('');
  };

  // Handle Pick Current Geolocation
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }

    setIsGettingLocation(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsGettingLocation(false);
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const formattedCoords = `${lat}, ${lng}`;
        setValue('sector', formattedCoords);
      },
      (err) => {
        setIsGettingLocation(false);
        let msg = 'Unable to retrieve your current location.';
        if (err.code === err.PERMISSION_DENIED) {
          msg = 'Location permission denied. You can manually type your address or coordinates.';
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = 'Location information unavailable.';
        } else if (err.code === err.TIMEOUT) {
          msg = 'Location request timed out. Please try again or type manually.';
        }
        setGeoError(msg);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const onSubmit = async (data: CreateListingForm) => {
    setApiError(null);
    try {
      // Determine final cover image URL
      const finalCoverUrl =
        data.coverImageUrl ||
        (uploadedImages.length > 0
          ? uploadedImages[0]
          : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80');

      const created = await listingsService.create({
        title: data.title,
        description: data.description,
        price: data.price,
        currency: 'RWF',
        purpose: data.purpose,
        categoryId: data.categoryId,
        coverImageUrl: finalCoverUrl,
        imageUrls: uploadedImages.length > 0 ? uploadedImages : [finalCoverUrl],
        province: data.province || 'Kigali City',
        district: data.district || 'Gasabo',
        sector: data.sector || 'Gacuriro',
      });
      navigate(`/listings/${created.slug}`);
    } catch (err: any) {
      setApiError(err.message || 'Failed to create listing. Please check input details.');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <PageHeader
        title="Create New Listing"
        description="Post a house, land plot, commercial space, or vehicle for sale or rent in Rwanda."
      />

      {apiError && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-baza text-xs text-red-700">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info Card */}
        <Card padding="md" className="space-y-4">
          <h3 className="text-sm font-bold text-baza-navy flex items-center gap-2">
            <Building className="w-4 h-4 text-baza-cyan" /> Basic Information
          </h3>

          <Input
            label="Listing Title *"
            placeholder="e.g. Modern 4-Bedroom Villa with Swimming Pool"
            error={errors.title?.message}
            {...register('title')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Category *"
              options={[{ value: '', label: catsLoading ? 'Loading categories...' : 'Select Category' }, ...categoryOptions]}
              error={errors.categoryId?.message}
              {...register('categoryId')}
            />

            <div>
              <label className="text-xs font-bold text-baza-text-primary block mb-1.5">Listing Purpose *</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setValue('purpose', 'SALE')}
                  className={`py-2 px-3 rounded-baza text-xs font-bold border transition-colors ${
                    selectedPurpose === 'SALE'
                      ? 'bg-baza-navy text-white border-baza-navy'
                      : 'bg-white text-baza-text-primary border-baza-border hover:bg-slate-50'
                  }`}
                >
                  For Sale
                </button>
                <button
                  type="button"
                  onClick={() => setValue('purpose', 'RENT')}
                  className={`py-2 px-3 rounded-baza text-xs font-bold border transition-colors ${
                    selectedPurpose === 'RENT'
                      ? 'bg-baza-navy text-white border-baza-navy'
                      : 'bg-white text-baza-text-primary border-baza-border hover:bg-slate-50'
                  }`}
                >
                  For Rent
                </button>
              </div>
            </div>
          </div>

          <Input
            label="Price (RWF) *"
            type="number"
            placeholder="120000000"
            leftIcon={<DollarSign className="w-4 h-4" />}
            error={errors.price?.message}
            {...register('price')}
          />
        </Card>

        {/* Location & Map Coordinates Card */}
        <Card padding="md" className="space-y-4">
          <h3 className="text-sm font-bold text-baza-navy flex items-center gap-2">
            <MapPin className="w-4 h-4 text-baza-cyan" /> Location & Map Coordinates
          </h3>

          <div>
            <label className="text-xs font-bold text-baza-text-primary block mb-1.5">
              Sector / Address or Map Coordinates (Lat, Long)
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="e.g. Gacuriro, Kigali or -1.9441, 30.0619"
                  error={errors.sector?.message}
                  {...register('sector')}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleGetCurrentLocation}
                isLoading={isGettingLocation}
                leftIcon={<Navigation className="w-4 h-4 text-baza-cyan" />}
                className="whitespace-nowrap flex-shrink-0"
                title="Get current GPS location coordinates"
              >
                Pick Current Location
              </Button>
            </div>
            {geoError && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {geoError}
              </p>
            )}
            <p className="mt-1.5 text-[11px] text-slate-500">
              Enter a sector name, street address, or paste map coordinates (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">-1.9441, 30.0619</code>), or click <strong>Pick Current Location</strong> to auto-fill GPS coordinates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <Input label="Province (Optional)" placeholder="Kigali City" {...register('province')} />
            <Input label="District (Optional)" placeholder="Gasabo" {...register('district')} />
          </div>
        </Card>

        {/* Property & Vehicle Photos Upload Section */}
        <Card padding="md" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-baza-navy flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-baza-cyan" /> Photos (Multiple Upload Supported)
            </h3>
            <span className="text-xs font-semibold text-slate-500">Max 10 Images</span>
          </div>

          {/* Main Direct File Upload Component */}
          <ImageUploader
            images={uploadedImages}
            onChange={handleImagesChange}
            coverImageUrl={selectedCoverUrl}
            onCoverChange={handleCoverChange}
            maxFiles={10}
          />

          {/* Direct Image Link / Manual URL Input */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-baza-cyan" /> Add Image by URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://images.unsplash.com/photo-..."
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-baza border border-baza-border focus:border-baza-cyan focus:outline-none"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddCustomUrl}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Image
              </Button>
            </div>
            {urlError && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {urlError}
              </p>
            )}
          </div>
        </Card>

        {/* Description Card */}
        <Card padding="md" className="space-y-4">
          <h3 className="text-sm font-bold text-baza-navy flex items-center gap-2">
            <FileText className="w-4 h-4 text-baza-cyan" /> Detailed Description
          </h3>

          <Textarea
            label="Description *"
            placeholder="Describe the property features, room counts, land size, road accessibility, or vehicle conditions..."
            rows={5}
            error={errors.description?.message}
            {...register('description')}
          />
        </Card>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
          leftIcon={<PlusCircle className="w-5 h-5" />}
        >
          Publish Listing Now
        </Button>
      </form>
    </div>
  );
};
