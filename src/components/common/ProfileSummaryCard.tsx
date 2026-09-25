import React from 'react';
import { UserProfileData } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';
import { VerificationBadge } from '../ui/VerificationBadge';

export interface ProfileSummaryCardProps {
  profile: UserProfileData;
}

export const ProfileSummaryCard: React.FC<ProfileSummaryCardProps> = ({ profile }) => {
  return (
    <Card padding="md" className="bg-gradient-to-br from-baza-navy to-slate-900 text-white border-none">
      <div className="flex items-center gap-4">
        <Avatar name={`${profile.firstName} ${profile.lastName}`} size="lg" className="ring-2 ring-baza-green ring-offset-2 ring-offset-slate-900" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">
              {profile.firstName} {profile.lastName}
            </h3>
            {profile.verificationStatus === 'APPROVED' && (
              <VerificationBadge type={profile.verificationType || 'SELLER'} />
            )}
          </div>
          <p className="text-xs text-slate-300 mt-0.5">{profile.email}</p>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-700/60 text-xs">
            <div>
              <span className="font-bold text-baza-green">{profile.listingsCount}</span>{' '}
              <span className="text-slate-400">Listings</span>
            </div>
            <div>
              <span className="font-bold text-baza-green">{profile.savedCount}</span>{' '}
              <span className="text-slate-400">Saved</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
