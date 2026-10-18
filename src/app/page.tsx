'use client';

import React, { useState, useEffect } from 'react';
import { mockUserProfile } from '@/data/mockProfile';
import { ProfileHeader } from '@/components/ProfileHeader';
import { SkillsSection } from '@/components/SkillsSection';
import { CertificateUploadModal } from '@/components/CertificateUploadModal';

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [highlightSkills, setHighlightSkills] = useState<string[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Clear highlight pulse after animation
  useEffect(() => {
    if (highlightSkills.length > 0) {
      const t = setTimeout(() => setHighlightSkills([]), 2000);
      return () => clearTimeout(t);
    }
  }, [highlightSkills]);

  return (
    <div className="min-h-screen pb-24 selection:bg-zinc-800 selection:text-white">
      <nav className="w-full border-b border-[var(--border-glass)] glass-card sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-bold text-xs">
              SP
            </div>
            <span className="font-bold text-sm tracking-tight text-[var(--foreground)]">
              SkillProfile
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        <ProfileHeader
          profile={mockUserProfile}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
          onUploadCertificate={() => setShowUpload(true)}
        />
        <SkillsSection
          skills={mockUserProfile.skills}
          highlightSkills={highlightSkills}
        />
      </main>

      <CertificateUploadModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onComplete={(ids) => setHighlightSkills(ids)}
      />
    </div>
  );
}
