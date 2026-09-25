export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
export type VerificationType = 'SELLER' | 'BROKER' | 'DEALER';
export type VerificationStatus = 'NOT_SUBMITTED' | 'PENDING' | 'MORE_INFORMATION_REQUIRED' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
export type ListingPurpose = 'SALE' | 'RENT';
export type ListingStatus = 'DRAFT' | 'PENDING_REVIEW' | 'CHANGES_REQUESTED' | 'APPROVED' | 'REJECTED' | 'PUBLISHED' | 'SOLD' | 'RENTED' | 'SUSPENDED' | 'ARCHIVED';
export type VisitStatus = 'PENDING' | 'ACCEPTED' | 'RESCHEDULE_REQUESTED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    totalItems?: number;
    itemCount?: number;
    itemsPerPage?: number;
    totalPages?: number;
    currentPage?: number;
  };
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: string[];
  path: string;
  statusCode: number;
  timestamp: string;
}

export interface HealthCheckData {
  status: string;
  database: string;
  environment: string;
  timestamp: string;
  version: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  count?: number;
}

export interface ListingItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  purpose: ListingPurpose;
  status: ListingStatus;
  category: string;
  categorySlug: string;
  location: string;
  coverImageUrl: string;
  isFeatured?: boolean;
  isVerified?: boolean;
  ownerName: string;
  ownerRole?: string;
  ownerAvatar?: string;
  createdAt: string;
  specs?: Record<string, string | number>;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'APPROVED' | 'REJECTED' | 'VISIT' | 'PRICE' | 'SYSTEM';
  isRead: boolean;
  createdAt: string;
}

export interface UserProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  status: UserStatus;
  verificationStatus: VerificationStatus;
  verificationType?: VerificationType;
  listingsCount: number;
  savedCount: number;
  joinedAt: string;
}
