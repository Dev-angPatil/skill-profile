# Architecture - Skill Profile

## System Components
1. **Presentation Layer (`src/app/page.tsx`)**
   - High-level orchestrator managing global theme state (soft light / carbon dark mode).
   - Responsive layout container constrained to max-w-5xl.
2. **Profile Header (`src/components/ProfileHeader.tsx`)**
   - LinkedIn-style cover banner with subtle dot grid overlay.
   - Avatar with live cryptographic identity badge.
   - Profile title, company, geolocation, follower counts, bio, and key metrics strip (Event Proofs, Peer Rank, Trust Index).
3. **Skills Engine (`src/components/SkillsSection.tsx`)**
   - Filterable skills grid by domain categories (Distributed Systems, AI Systems, OS, etc.).
   - Interactive hover tracking and click-to-pin state machine.
   - Dynamic SVG canvas rendering cubic bezier connector arrows (`M x1 y1 C ... x2 y2`) linking the active skill box to the breakdown panel.
4. **Score Provenance Overlay (`src/components/SkillScoreOverlay.tsx`)**
   - Mathematical formula header: `Base Knowledge + Σ Event Deltas = Final Score`.
   - Event cards with category-specific badges (PRs, Incidents, Benchmarks, Hackathons, Certifications), impact metrics, and verification deep links.
5. **Data Layer (`src/types/profile.ts` & `src/data/mockProfile.ts`)**
   - Strictly typed data contract for skills, events, categories, and developer identity.
