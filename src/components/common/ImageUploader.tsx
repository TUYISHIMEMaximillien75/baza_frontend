import React, { useState, useRef } from 'react';
import { Upload, X, Star, Loader2, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import uploadsService from '../../services/uploadsService';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  coverImageUrl?: string;
  onCoverChange?: (url: string) => void;
  maxFiles?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onChange,
  coverImageUrl,
  onCoverChange,
  maxFiles = 10,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((file) => file.type.startsWith('image/'));

    if (fileArray.length === 0) {
      setUploadError('Please select valid image files (JPG, PNG, WEBP, GIF).');
      return;
    }

    if (images.length + fileArray.length > maxFiles) {
      setUploadError(`You can upload a maximum of ${maxFiles} images per listing.`);
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      let newUrls: string[] = [];
      if (fileArray.length === 1) {
        const res = await uploadsService.uploadSingle(fileArray[0]);
        newUrls = [res.url];
      } else {
        const resList = await uploadsService.uploadMultiple(fileArray);
        newUrls = resList.map((r) => r.url);
      }

      const updated = [...images, ...newUrls];
      onChange(updated);

      // If no cover image set yet, set the first new image as cover
      if (!coverImageUrl && updated.length > 0 && onCoverChange) {
        onCoverChange(updated[0]);
      }
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setUploadError(err.response?.data?.message || err.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const removedUrl = images[indexToRemove];
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);

    if (coverImageUrl === removedUrl && onCoverChange) {
      onCoverChange(updated[0] || '');
    }
  };

  const setAsCover = (url: string) => {
    if (onCoverChange) {
      onCoverChange(url);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Dropzone Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-baza-cyan bg-baza-cyan/10 scale-[1.01]'
            : 'border-slate-300 hover:border-baza-cyan/60 hover:bg-slate-50/80'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-cyan-50 text-baza-cyan flex items-center justify-center shadow-sm">
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-baza-cyan" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-800">
              {isUploading ? 'Uploading image(s)...' : 'Click to upload or drag & drop property photos'}
            </p>
            <p className="text-xs text-slate-500">
              Supports PNG, JPG, WEBP, GIF up to 10MB each (max {maxFiles} images)
            </p>
          </div>

          <button
            type="button"
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
          >
            <ImageIcon className="w-3.5 h-3.5 text-baza-cyan" /> Select Files from Computer
          </button>
        </div>
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-medium text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Uploaded Thumbnails Grid */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700">
              Uploaded Images ({images.length} of {maxFiles})
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              ⭐ Click star on an image to set it as Cover Image
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((url, index) => {
              const isCover = coverImageUrl === url || (!coverImageUrl && index === 0);
              return (
                <div
                  key={`${url}-${index}`}
                  className={`group relative rounded-xl overflow-hidden border-2 bg-slate-100 transition-all ${
                    isCover ? 'border-baza-cyan ring-2 ring-baza-cyan/20' : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img src={url} alt={`Property ${index + 1}`} className="w-full h-24 object-cover" />

                  {/* Cover Badge */}
                  {isCover && (
                    <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-baza-cyan text-white text-[10px] font-black shadow-md">
                      <CheckCircle className="w-3 h-3" /> Cover
                    </span>
                  )}

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAsCover(url)}
                      title="Set as Cover Image"
                      className={`p-1.5 rounded-full transition-transform hover:scale-110 ${
                        isCover ? 'bg-amber-500 text-white' : 'bg-white/90 text-slate-700 hover:bg-amber-500 hover:text-white'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      title="Remove Image"
                      className="p-1.5 rounded-full bg-white/90 text-red-600 hover:bg-red-600 hover:text-white transition-transform hover:scale-110"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
