# Design System - Skill Profile UI

## 1. Aesthetic Direction
- **Theme**: Refined monochrome with soft light/dark mode.
- **Light Mode Palette**:
  - Background Canvas: `#fbfbfb` (soft warm paper)
  - Card Surfaces: `#ffffff`
  - Subtle Surface: `#f4f4f5` (zinc-100)
  - Primary Ink: `#09090b` (zinc-950)
  - Secondary Ink: `#52525b` (zinc-600)
  - Border Lines: `#e4e4e7` (zinc-200)
  - Accent / Focus: `#18181b` (zinc-900)
- **Dark Mode Palette**:
  - Background Canvas: `#0c0c0e` (rich deep carbon)
  - Card Surfaces: `#141416` (zinc-900)
  - Subtle Surface: `#1f1f23` (zinc-800)
  - Primary Ink: `#f4f4f5` (zinc-100)
  - Secondary Ink: `#a1a1aa` (zinc-400)
  - Border Lines: `#27272a` (zinc-800)
  - Accent / Focus: `#fafafa` (zinc-50)

## 2. Typography
- **Headings**: Clean geometric sans-serif (Inter, -apple-system, sans-serif), tight tracking, medium/semibold weights.
- **Body**: Readable regular weight (text-sm, text-xs) with balanced line height.
- **Scores & Metrics**: Monospace numerals (font-mono) for precision and data provenance.

## 3. Component Conventions
- **Profile Header**: Realistic LinkedIn format — cover banner, rounded border avatar with online indicator, identity & headline, location, connection badge, and primary action buttons.
- **Skill Box**: Bordered rectangular card with subtle shadow, category chip, score pill (e.g. 94/100), proficiency indicator, and interactive hover/pinned state.
- **Score Calculation Popover & SVG Arrows**:
  - Floating card elevated with shadow and backdrop blur.
  - Smooth cubic bezier SVG paths (`M ... C ...`) connecting anchor pins on the skill card directly to individual contribution nodes.
  - Interactive event badges showing category icon (Git, Trophy, Shield, Terminal), timestamp, points delta (+25 pts), and verification link.
