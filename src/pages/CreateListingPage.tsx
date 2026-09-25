import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Building, MapPin, DollarSign, Image as ImageIcon, FileText, AlertCircle, Sparkles } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
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
  sector: z.string().optional(),
});

type CreateListingForm = z.infer<typeof createListingSchema>;

const SAMPLE_IMAGES = [
  { label: 'Modern Villa', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80' },
  { label: 'Apartment', url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80' },
  { label: 'Land Plot', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80' },
  { label: 'SUV / Vehicle', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80' },
];

export const CreateListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading: catsLoading } = useCategories();
  const [apiError, setApiError] = useState<string | null>(null);

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
      sector: 'Gacuriro',
      coverImageUrl: SAMPLE_IMAGES[0].url,
    },
  });

  const selectedPurpose = watch('purpose');
  const selectedImageUrl = watch('coverImageUrl');

  const onSubmit = async (data: CreateListingForm) => {
    setApiError(null);
    try {
      const created = await listingsService.create({
        title: data.title,
        description: data.description,
        price: data.price,
        currency: 'RWF',
        purpose: data.purpose,
        categoryId: data.categoryId,
        coverImageUrl: data.coverImageUrl || SAMPLE_IMAGES[0].url,
        province: data.province || 'Kigali City',
        district: data.district || 'Gasabo',
        sector: data.sector || 'Gacuriro',
      });
      navigate(`/listings/${created.slug}`);
    } catch (err: any) {
      setApiError(err.message || 'Failed to create listing. Please check input details.');
    }
  };

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

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
            <Building className="w-4 h-4 text-baza-green" /> Basic Information
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

        {/* Location Card */}
        <Card padding="md" className="space-y-4">
          <h3 className="text-sm font-bold text-baza-navy flex items-center gap-2">
            <MapPin className="w-4 h-4 text-baza-green" /> Location Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input label="Province" placeholder="Kigali City" {...register('province')} />
            <Input label="District" placeholder="Gasabo" {...register('district')} />
            <Input label="Sector" placeholder="Gacuriro" {...register('sector')} />
          </div>
        </Card>

        {/* Cover Image & Presets */}
        <Card padding="md" className="space-y-4">
          <h3 className="text-sm font-bold text-baza-navy flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-baza-green" /> Cover Image URL
          </h3>

          <Input
            label="Image Link (URL)"
            placeholder="https://..."
            error={errors.coverImageUrl?.message}
            {...register('coverImageUrl')}
          />

          <div>
            <span className="text-[11px] font-semibold text-baza-text-secondary block mb-2">Or select a preset sample photo:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SAMPLE_IMAGES.map((img) => (
                <button
                  key={img.label}
                  type="button"
                  onClick={() => setValue('coverImageUrl', img.url)}
                  className={`relative rounded-baza overflow-hidden border-2 text-left transition-all ${
                    selectedImageUrl === img.url ? 'border-baza-green ring-2 ring-baza-green/30' : 'border-baza-border hover:border-slate-300'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-16 object-cover" />
                  <span className="block p-1 text-[10px] font-bold bg-slate-900/80 text-white truncate">{img.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Description Card */}
        <Card padding="md" className="space-y-4">
          <h3 className="text-sm font-bold text-baza-navy flex items-center gap-2">
            <FileText className="w-4 h-4 text-baza-green" /> Detailed Description
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
