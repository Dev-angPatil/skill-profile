'use client';

import React from 'react';
import { UserProfile } from '@/types/profile';
import { MapPin, Briefcase, Users, Sun, Moon, Plus } from 'lucide-react';

interface ProfileHeaderProps {
  profile: UserProfile;
  darkMode: boolean;
  onToggleTheme: () => void;
  onUploadCertificate: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  darkMode,
  onToggleTheme,
  onUploadCertificate,
}) => {
  return (
    <header className="w-full rounded-3xl overflow-hidden glass-card transition-colors">
      {/* Cover Banner */}
      <div className="relative h-44 sm:h-52 w-full bg-linear-to-r from-zinc-900 via-neutral-900 to-zinc-950 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/10 transition-transform active:scale-95 shadow-md"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-zinc-200" />}
          </button>
        </div>
      </div>

      <div className="px-6 sm:px-8 pb-7 pt-0 relative">
        <div className="flex items-end justify-between -mt-16 sm:-mt-20 mb-4">
          <div className="relative">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-white dark:border-zinc-900 shadow-xl bg-zinc-200">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Upload Certificate Button */}
          <button
            onClick={onUploadCertificate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Certificate</span>
          </button>
        </div>

        <div className="space-y-2.5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
            {profile.name}
          </h1>
          <p className="text-base text-[var(--foreground)] max-w-2xl font-normal leading-snug">
            {profile.headline}
          </p>
          <div className="flex flex-wrap items-center gap-y-1.5 gap-x-5 text-xs text-[var(--foreground-muted)] pt-1">
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 opacity-70" />
              <strong className="text-[var(--foreground)] font-medium">{profile.company}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 opacity-70" />
              {profile.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 opacity-70" />
              <strong className="text-[var(--foreground)] font-medium">{profile.connectionsCount}+</strong> connections
            </span>
          </div>
          <p className="text-sm text-[var(--foreground-muted)] leading-relaxed pt-3 border-t border-[var(--border-glass)] mt-3">
            {profile.about}
          </p>
        </div>
      </div>
    </header>
  );
};
