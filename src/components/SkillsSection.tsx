'use client';

import React, { useState, useRef } from 'react';
import { SkillItem } from '@/types/profile';
import { SkillScoreOverlay } from './SkillScoreOverlay';
import { FolderGit2, Trophy, Award, CheckCircle2, Sparkles } from 'lucide-react';

interface SkillsSectionProps {
  skills: SkillItem[];
  highlightSkills?: string[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, highlightSkills = [] }) => {
  const [pinnedSkillId, setPinnedSkillId] = useState<string | null>(null);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  
  const skillCardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const activeSkillId = pinnedSkillId || hoveredSkillId;
  const activeSkill = skills.find((s) => s.id === activeSkillId) || null;

  const getProofIcons = (skill: SkillItem) => {
    const types = new Set(skill.events.map((e) => e.type));
    const icons: React.ReactNode[] = [];
    if (types.has('github-repo')) icons.push(<FolderGit2 key="git" className="w-3 h-3 text-zinc-700 dark:text-zinc-300" />);
    if (types.has('certificate')) icons.push(<Award key="cert" className="w-3 h-3 text-indigo-500" />);
    if (types.has('hackathon')) icons.push(<Trophy key="hack" className="w-3 h-3 text-amber-500" />);
    if (types.has('test-suite')) icons.push(<CheckCircle2 key="test" className="w-3 h-3 text-emerald-500" />);
    if (types.has('production-impact')) icons.push(<Sparkles key="prod" className="w-3 h-3 text-cyan-500" />);
    return icons;
  };

  const activeOriginRect = activeSkillId && skillCardRefs.current[activeSkillId]
    ? skillCardRefs.current[activeSkillId]?.getBoundingClientRect() || null
    : null;

  return (
    <section className="w-full relative mt-8 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-glass)]">
        <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">
          Skills & Verified Proofs
        </h2>
        <span className="text-xs text-[var(--foreground-muted)] font-mono">
          {pinnedSkillId ? 'Card locked (click to unlock)' : 'Hover or click to inspect'}
        </span>
      </div>

      {/* Active Evidence Overlay Panel (Rendered dynamically below the grid or sticky above) */}
      {activeSkill && (
        <div 
          className="w-full relative z-30 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
          onMouseEnter={() => {
            // Keep hovered while mouse is over the overlay card
            if (!pinnedSkillId) setHoveredSkillId(activeSkill.id);
          }}
          onMouseLeave={() => {
            if (!pinnedSkillId) setHoveredSkillId(null);
          }}
        >
          <SkillScoreOverlay 
            skill={activeSkill} 
            originRect={activeOriginRect}
          />
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5">
        {skills.map((skill) => {
          const isActive = activeSkillId === skill.id;
          const isHighlighted = highlightSkills.includes(skill.id);

          return (
            <div
              key={skill.id}
              ref={(el) => {
                skillCardRefs.current[skill.id] = el;
              }}
              onMouseEnter={() => {
                if (!pinnedSkillId) setHoveredSkillId(skill.id);
              }}
              onMouseLeave={() => {
                if (!pinnedSkillId) setHoveredSkillId(null);
              }}
              onClick={() => {
                setPinnedSkillId(pinnedSkillId === skill.id ? null : skill.id);
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setPinnedSkillId(pinnedSkillId === skill.id ? null : skill.id);
                }
              }}
              className={`relative cursor-pointer select-none rounded-2xl p-4 transition-all duration-200 outline-none glass-card glass-card-hover ${
                isActive
                  ? 'ring-2 ring-zinc-950 dark:ring-white bg-white/95 dark:bg-zinc-800/95 shadow-xl scale-[1.02]'
                  : 'bg-white/70 dark:bg-zinc-900/70 hover:bg-white dark:hover:bg-zinc-900'
              } ${isHighlighted ? 'animate-pulse ring-2 ring-emerald-500' : ''}`}
            >
              {/* Skill Name + Score */}
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold text-sm tracking-tight text-[var(--foreground)]">
                  {skill.name}
                </h3>
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${
                    isActive
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
                    isActive ? 'bg-zinc-900 dark:bg-white' : 'bg-zinc-400 dark:bg-zinc-600'
                  }`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>

              {/* Proof type icons footer */}
              <div className="flex items-center justify-between mt-2.5 text-[var(--foreground-muted)]">
                <div className="flex items-center gap-1.5">
                  {getProofIcons(skill)}
                </div>
                <span className="text-[10px] font-mono">
                  {isActive ? (pinnedSkillId === skill.id ? 'Pinned' : 'Viewing') : `${skill.events.length} proofs`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
