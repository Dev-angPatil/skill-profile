'use client';

import React, { useState } from 'react';
import { SkillItem } from '@/types/profile';
import { SkillScoreOverlay } from './SkillScoreOverlay';
import { FolderGit2, Trophy, Award, CheckCircle2, Sparkles } from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillItem[];
  highlightSkills?: string[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, highlightSkills = [] }) => {
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const selectedSkill = skills.find((s) => s.id === selectedSkillId) || null;

  // Close floating window on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSkillId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getProofIcons = (skill: SkillItem) => {
    const types = new Set(skill.events.map((e) => e.type));
    const icons: React.ReactNode[] = [];
    if (types.has('github-repo')) icons.push(<FolderGit2 key="git" className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />);
    if (types.has('certificate')) icons.push(<Award key="cert" className="w-3.5 h-3.5 text-indigo-500" />);
    if (types.has('hackathon')) icons.push(<Trophy key="hack" className="w-3.5 h-3.5 text-amber-500" />);
    if (types.has('test-suite')) icons.push(<CheckCircle2 key="test" className="w-3.5 h-3.5 text-emerald-500" />);
    if (types.has('production-impact')) icons.push(<Sparkles key="prod" className="w-3.5 h-3.5 text-cyan-500" />);
    return icons;
  };

  return (
    <section className="w-full relative mt-8 space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-glass)]">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">
            Skills &amp; Verified Proofs
          </h2>
          <p className="text-xs text-[var(--foreground-muted)]">
            Press any skill to launch the floating provenance window with linked repositories and milestones
          </p>
        </div>
        <span className="hidden sm:inline-block text-xs text-[var(--foreground-muted)] font-mono bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full">
          Click skill to inspect
        </span>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5">
        {skills.map((skill) => {
          const isSelected = selectedSkillId === skill.id;
          const isHighlighted = highlightSkills.includes(skill.id);

          return (
            <div
              key={skill.id}
              onClick={() => setSelectedSkillId(skill.id)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedSkillId(skill.id);
                }
              }}
              className={`relative cursor-pointer select-none rounded-2xl p-4 transition-all duration-200 outline-none glass-card glass-card-hover group ${
                isSelected
                  ? 'ring-2 ring-zinc-950 dark:ring-white bg-white dark:bg-zinc-800 shadow-xl scale-[1.02]'
                  : 'bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-md'
              } ${isHighlighted ? 'animate-pulse ring-2 ring-emerald-500' : ''}`}
            >
              {/* Skill Name + Score */}
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-sm tracking-tight text-[var(--foreground)] group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                  {skill.name}
                </h3>
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${
                    isSelected
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-[var(--foreground)]'
                  }`}
                >
                  {skill.score}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isSelected ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-400 dark:bg-zinc-600'
                  }`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>

              {/* Proof type icons footer */}
              <div className="flex items-center justify-between mt-3 text-[var(--foreground-muted)]">
                <div className="flex items-center gap-1.5">
                  {getProofIcons(skill)}
                </div>
                <span className="text-[10px] font-mono group-hover:text-[var(--foreground)] transition-colors">
                  {skill.events.length} proofs ↗
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Window Overlay on Top */}
      {selectedSkill && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedSkillId(null);
            }
          }}
        >
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <SkillScoreOverlay 
              skill={selectedSkill}
              allSkills={skills}
              onSelectSkill={(id) => setSelectedSkillId(id)}
              onClose={() => setSelectedSkillId(null)}
            />
          </div>
        </div>
      )}
    </section>
  );
};
