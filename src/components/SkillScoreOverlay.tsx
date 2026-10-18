'use client';

import React, { useRef, useState, useEffect } from 'react';
import { SkillItem, SkillEvent } from '@/types/profile';
import {
  FolderGit2,
  Trophy,
  CheckCircle2,
  Sparkles,
  Award,
  ExternalLink,
  X
} from 'lucide-react';

interface SkillScoreOverlayProps {
  skill: SkillItem;
  allSkills?: SkillItem[];
  onSelectSkill?: (skillId: string) => void;
  onClose: () => void;
}

export const SkillScoreOverlay: React.FC<SkillScoreOverlayProps> = ({
  skill,
  allSkills = [],
  onSelectSkill,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [arrows, setArrows] = useState<
    { id: string; x1: number; y1: number; x2: number; y2: number }[]
  >([]);

  const getEventIcon = (type: SkillEvent['type']) => {
    switch (type) {
      case 'github-repo':
        return <FolderGit2 className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />;
      case 'hackathon':
        return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'test-suite':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'production-impact':
        return <Sparkles className="w-4 h-4 text-cyan-500" />;
      case 'certificate':
        return <Award className="w-4 h-4 text-indigo-500" />;
    }
  };

  const calculate = () => {
    const container = containerRef.current;
    const badge = badgeRef.current;
    if (!container || !badge) return;

    const cRect = container.getBoundingClientRect();
    const bRect = badge.getBoundingClientRect();

    // Start anchor: Bottom-center of the skill score badge
    const x1 = bRect.left + bRect.width / 2 - cRect.left;
    const y1 = bRect.bottom - cRect.top;

    const lines: typeof arrows = [];
    skill.events.forEach((ev) => {
      const el = cardRefs.current[ev.id];
      if (el) {
        const r = el.getBoundingClientRect();
        // Target anchor: Top-center of each event card
        lines.push({
          id: ev.id,
          x1,
          y1,
          x2: r.left + r.width / 2 - cRect.left,
          y2: r.top - cRect.top,
        });
      }
    });
    setArrows(lines);
  };

  useEffect(() => {
    calculate();
    const t1 = setTimeout(calculate, 50);
    const t2 = setTimeout(calculate, 150);
    window.addEventListener('resize', calculate);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', calculate);
    };
  }, [skill]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/60 dark:border-white/10 bg-white dark:bg-zinc-900 transition-all"
    >
      {/* SVG Canvas for clean bezier connector arrows */}
      <svg
        className="absolute inset-0 pointer-events-none z-0 w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="overlay-arrowhead"
            markerWidth="7"
            markerHeight="6"
            refX="6"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 7 3, 0 6"
              className="fill-zinc-800 dark:fill-zinc-200"
            />
          </marker>
        </defs>
        {arrows.map((a) => {
          // Smooth S-curve down from header to event cards
          const midY = (a.y1 + a.y2) / 2;
          const d = `M ${a.x1} ${a.y1} C ${a.x1} ${midY}, ${a.x2} ${midY}, ${a.x2} ${a.y2}`;
          return (
            <g key={a.id}>
              {/* Diffuse shadow path */}
              <path
                d={d}
                fill="none"
                strokeWidth="4"
                className="stroke-zinc-200/50 dark:stroke-zinc-700/50"
              />
              {/* Crisp dashed path */}
              <path
                d={d}
                fill="none"
                strokeWidth="1.75"
                strokeDasharray="4 3"
                className="stroke-zinc-800 dark:stroke-zinc-200"
                markerEnd="url(#overlay-arrowhead)"
              />
              {/* Origin node dot */}
              <circle
                cx={a.x1}
                cy={a.y1}
                r="3.5"
                className="fill-zinc-900 dark:fill-zinc-100"
              />
              {/* Target landing dot */}
              <circle
                cx={a.x2}
                cy={a.y2}
                r="3"
                className="fill-zinc-900 dark:fill-zinc-100"
              />
            </g>
          );
        })}
      </svg>

      {/* Floating Window Top Bar: Skill Info, Mathematical Formula & Close */}
      <div className="relative z-10 flex flex-col gap-4 pb-5 border-b border-[var(--border-glass)]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              ref={badgeRef}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold font-mono text-base shadow-sm flex items-center gap-1 shrink-0"
            >
              <span>{skill.score}</span>
              <span className="text-[10px] opacity-60">/100</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg tracking-tight text-[var(--foreground)]">
                  {skill.name}
                </h3>
                {skill.category && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[var(--foreground-muted)] uppercase tracking-wider">
                    {skill.category}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
            title="Close floating window (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Skill Switcher Pills (allows easy live browsing without closing) */}
        {allSkills.length > 0 && onSelectSkill && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <span className="text-[11px] font-medium text-[var(--foreground-muted)] shrink-0 mr-1">
              Inspect Skill:
            </span>
            {allSkills.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectSkill(s.id)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 ${
                  s.id === skill.id
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {s.name} ({s.score})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Connected Proof Cards Grid (3 or 4 events) */}
      <div className={`relative z-10 grid gap-4 pt-8 ${
        skill.events.length <= 3 
          ? 'grid-cols-1 md:grid-cols-3' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      }`}>
        {skill.events.map((ev) => (
          <div
            key={ev.id}
            ref={(el) => {
              cardRefs.current[ev.id] = el;
            }}
            className="rounded-2xl p-4 flex flex-col justify-between group bg-white dark:bg-zinc-800/90 shadow-md hover:shadow-lg transition-all border border-zinc-200/80 dark:border-zinc-700/80"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-700/60">
                    {getEventIcon(ev.type)}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
                    {ev.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">
                  +{ev.delta ?? 15} pts
                </span>
              </div>

              {/* Certificate image preview */}
              {ev.type === 'certificate' && ev.thumbnailUrl && (
                <div className="w-full h-24 rounded-xl overflow-hidden mb-2.5 border border-zinc-200 dark:border-zinc-700 bg-zinc-950">
                  <img
                    src={ev.thumbnailUrl}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <h4 className="font-semibold text-xs text-[var(--foreground)] leading-snug">
                {ev.title}
              </h4>
              <p className="text-[11px] text-[var(--foreground-muted)] mt-1.5 line-clamp-3 leading-relaxed">
                {ev.description}
              </p>
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-zinc-100 dark:border-zinc-700/60 flex items-center justify-between text-[11px] text-[var(--foreground-muted)]">
              <span className="truncate max-w-[140px] font-mono text-[10px]">
                {ev.meta}
              </span>
              {ev.link && (
                <a
                  href={ev.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--foreground)] flex items-center gap-1 transition-colors font-medium text-zinc-900 dark:text-zinc-100"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
