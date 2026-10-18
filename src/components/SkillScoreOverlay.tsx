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
} from 'lucide-react';

interface SkillScoreOverlayProps {
  skill: SkillItem;
}

export const SkillScoreOverlay: React.FC<SkillScoreOverlayProps> = ({ skill }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [arrows, setArrows] = useState<
    { id: string; x1: number; y1: number; x2: number; y2: number }[]
  >([]);

  const getEventIcon = (type: SkillEvent['type']) => {
    switch (type) {
      case 'github-repo':
        return <FolderGit2 className="w-4 h-4" />;
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

  useEffect(() => {
    const calculate = () => {
      const container = containerRef.current;
      const badge = badgeRef.current;
      if (!container || !badge) return;

      const cRect = container.getBoundingClientRect();
      const bRect = badge.getBoundingClientRect();
      const x1 = bRect.left + bRect.width / 2 - cRect.left;
      const y1 = bRect.bottom - cRect.top;

      const lines: typeof arrows = [];
      skill.events.forEach((ev) => {
        const el = cardRefs.current[ev.id];
        if (el) {
          const r = el.getBoundingClientRect();
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

    const t = setTimeout(calculate, 40);
    window.addEventListener('resize', calculate);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', calculate);
    };
  }, [skill]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl glass-card p-6 shadow-2xl border border-white/60 dark:border-white/10"
    >
      {/* SVG Arrows */}
      <svg className="absolute inset-0 pointer-events-none z-0 w-full h-full overflow-visible" aria-hidden="true">
        <defs>
          <marker id="arrow-tip" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" className="fill-zinc-400 dark:fill-zinc-500" />
          </marker>
        </defs>
        {arrows.map((a) => {
          const midY = (a.y1 + a.y2) / 2;
          const d = `M ${a.x1} ${a.y1} C ${a.x1} ${midY}, ${a.x2} ${midY}, ${a.x2} ${a.y2}`;
          return (
            <g key={a.id}>
              <path d={d} fill="none" strokeWidth="3" className="stroke-zinc-200 dark:stroke-zinc-700/60" />
              <path d={d} fill="none" strokeWidth="1.5" strokeDasharray="5 3" className="stroke-zinc-500 dark:stroke-zinc-400" markerEnd="url(#arrow-tip)" />
              <circle cx={a.x1} cy={a.y1} r="3.5" className="fill-zinc-500 dark:fill-zinc-400" />
              <circle cx={a.x2} cy={a.y2} r="3" className="fill-zinc-500 dark:fill-zinc-400" />
            </g>
          );
        })}
      </svg>

      {/* Header: just skill name and score */}
      <div ref={badgeRef} className="relative z-10 flex items-center gap-3 pb-4">
        <div className="px-3.5 py-1.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold font-mono text-lg shadow-sm">
          {skill.score}
        </div>
        <h3 className="font-bold text-lg tracking-tight text-[var(--foreground)]">
          {skill.name}
        </h3>
      </div>

      {/* Event Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 pt-8">
        {skill.events.map((ev) => (
          <div
            key={ev.id}
            ref={(el) => { cardRefs.current[ev.id] = el; }}
            className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col justify-between group bg-white/80 dark:bg-zinc-900/80"
          >
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  {getEventIcon(ev.type)}
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
                  {ev.label}
                </span>
              </div>

              {/* Certificate thumbnail */}
              {ev.type === 'certificate' && ev.thumbnailUrl && (
                <div className="w-full h-20 rounded-lg overflow-hidden mb-2.5 bg-zinc-100 dark:bg-zinc-800">
                  <img src={ev.thumbnailUrl} alt={ev.title} className="w-full h-full object-cover opacity-90" />
                </div>
              )}

              <h4 className="font-semibold text-sm text-[var(--foreground)]">
                {ev.title}
              </h4>
              <p className="text-xs text-[var(--foreground-muted)] mt-1 leading-relaxed">
                {ev.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[var(--border-glass)] flex items-center justify-between text-[11px] text-[var(--foreground-muted)]">
              <span className="truncate max-w-[140px]">{ev.meta}</span>
              {ev.link && (
                <a href={ev.link} target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] flex items-center gap-1 transition-colors">
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
