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
  originRect: DOMRect | null;
}

export const SkillScoreOverlay: React.FC<SkillScoreOverlayProps> = ({ skill, originRect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const calculate = () => {
      const container = containerRef.current;
      if (!container) return;

      const cRect = container.getBoundingClientRect();
      
      // Calculate origin (x1, y1)
      let x1 = cRect.width / 2;
      let y1 = 0;

      if (originRect) {
        // Point from the center-top of the hovered skill card relative to the overlay
        x1 = originRect.left + originRect.width / 2 - cRect.left;
        y1 = originRect.top - cRect.top;
      }

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
            y2: r.bottom - cRect.top,
          });
        }
      });
      setArrows(lines);
    };

    calculate();
    // Run after DOM paint/layout
    const t = setTimeout(calculate, 30);
    window.addEventListener('resize', calculate);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', calculate);
    };
  }, [skill, originRect]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl glass-card p-6 shadow-2xl border border-white/60 dark:border-white/10 pointer-events-auto"
    >
      {/* SVG Arrows pointing to evidence cards */}
      <svg
        className="absolute inset-0 pointer-events-none z-0 w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="arrow-tip"
            markerWidth="8"
            markerHeight="6"
            refX="6"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 8 3, 0 6"
              fill="currentColor"
              className="text-zinc-600 dark:text-zinc-400"
            />
          </marker>
        </defs>
        {arrows.map((a) => {
          const midY = (a.y1 + a.y2) / 2;
          const d = `M ${a.x1} ${a.y1} C ${a.x1} ${midY}, ${a.x2} ${midY}, ${a.x2} ${a.y2}`;
          return (
            <g key={a.id}>
              <path
                d={d}
                fill="none"
                strokeWidth="3.5"
                className="stroke-zinc-300/40 dark:stroke-zinc-700/40"
              />
              <path
                d={d}
                fill="none"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="stroke-zinc-600 dark:stroke-zinc-400"
                markerEnd="url(#arrow-tip)"
              />
              <circle
                cx={a.x1}
                cy={a.y1}
                r="3.5"
                className="fill-zinc-800 dark:fill-zinc-200"
              />
              <circle
                cx={a.x2}
                cy={a.y2}
                r="3"
                className="fill-zinc-800 dark:fill-zinc-200"
              />
            </g>
          );
        })}
      </svg>

      {/* Header: skill name and score */}
      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-[var(--border-glass)]">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-bold font-mono text-base shadow-sm">
            {skill.score}
          </div>
          <div>
            <h3 className="font-bold text-base tracking-tight text-[var(--foreground)]">
              {skill.name}
            </h3>
            <span className="text-[11px] text-[var(--foreground-muted)]">
              {skill.events.length} Verified Evidence Proofs
            </span>
          </div>
        </div>

        <span className="text-[11px] font-mono text-[var(--foreground-muted)]">
          Live Proof Breakdown
        </span>
      </div>

      {/* Event Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-6">
        {skill.events.map((ev) => (
          <div
            key={ev.id}
            ref={(el) => {
              cardRefs.current[ev.id] = el;
            }}
            className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col justify-between group bg-white/90 dark:bg-zinc-900/90 shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  {getEventIcon(ev.type)}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
                  {ev.label}
                </span>
              </div>

              {/* Certificate preview thumbnail if present */}
              {ev.type === 'certificate' && ev.thumbnailUrl && (
                <div className="w-full h-24 rounded-xl overflow-hidden mb-2.5 border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
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
              <p className="text-[11px] text-[var(--foreground-muted)] mt-1 line-clamp-2 leading-relaxed">
                {ev.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[var(--border-glass)] flex items-center justify-between text-[11px] text-[var(--foreground-muted)]">
              <span className="truncate max-w-[150px] font-mono text-[10px]">{ev.meta}</span>
              {ev.link && (
                <a
                  href={ev.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--foreground)] flex items-center gap-1 transition-colors text-[11px] font-medium"
                >
                  <span>Link</span>
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
