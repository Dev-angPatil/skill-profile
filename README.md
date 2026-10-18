# Skill Profile - Verified Developer Portfolio UI

A modern monochrome (black & white with soft dark/light mode toggle, `#f8fafc` paper tones, and `#09090b` carbon black) LinkedIn-style developer profile with glassmorphism styling, smooth shadows, and provable event-driven skill score provenance.

## Features
- **White Glassmorphism UI**: High-fidelity frosted cards (`backdrop-blur-xl`) with smooth, diffused modern shadows.
- **Clean, Minimalist LinkedIn Profile Header**: Cover banner, fresh portrait avatar, headline, role, company, location, connections, and bio. Completely free of clutter or extraneous badges.
- **Real-World Recognizable Skills**: Focuses on mainstream developer domains — **Python**, **QA & Automated Testing**, **JavaScript & TypeScript**, **Cloud Architecture & DevOps**, **SQL & Database Systems**, and **Machine Learning & AI Tooling**.
- **Interactive SVG Curved Arrow Connectors**: Hovering over any skill box reveals a floating glass calculation card with animated curved SVG bezier arrows pointing directly to contributing real-world items:
  - **GitHub Repositories** (e.g., `fastapi-stream-proxy`, `playwright-e2e-matrix`) with stars and download metrics.
  - **Hackathon Projects** (e.g., *PyData Global Hackathon 1st Place*, *TestCon Bug Bash Marathon*).
  - **Test Suites & Production Milestones** (e.g., *Zero-Flake CI Pipeline Suite*, *Zero-Downtime Migration*).
- **Click-to-Pin**: Click any skill box to lock the evidence panel open and interact with individual links without hover dismissals.
- **Soft Dark / Light Mode Toggle**: One-click toggle in the banner between clean paper white glass and sleek dark glassmorphism.

## Getting Started

### Installation & Running
```bash
# Install dependencies
npm install

# Start the Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the profile.

---

## Prompts & Outcomes Log (Mandatory Rule #2)

| Prompt / Request | Key Decisions & Outcome |
| :--- | :--- |
| *User Request: "Create a modern white and black UI which is basically like a LinkedIn profile with skills written in boxes below it. Once you hover over the skill, you should be able to see how the score of that skill has been calculated, just like events shown and that they connect to the skill in like an arrow... /grill-me"* | Clarified via interactive interview: Stack (Next.js + Tailwind + SVG Connectors), Visual Theme (Soft off-white `#fbfbfb` and jet black `#09090b` with dark toggle), Profile Header (realistic full profile), and Interaction (Hover preview + Click-to-Pin). Formulated implementation plan in `implementation_plan.md`. |
| *Implementation Approval 1* | Bootstrapped Next.js App Router app, defined `DESIGN.md` tokens, configured monochrome theme in `globals.css`, generated initial mock data, built `ProfileHeader.tsx`, `SkillsSection.tsx`, `SkillScoreOverlay.tsx`, and wired them in `src/app/page.tsx`. |
| *User Redesign Request: "Remove mockup v1 text, attestation engine active, raw graph, provable event backend score, export attestation verify portfolio... UI should be like glass morphism white with proper smooth shadows. Broader skills like Python, QA testing... hover over shows recent events like GitHub repos with arrows connecting..."* | Clarified via interview: Set of skills (Python, QA & Automated Testing, TypeScript, Cloud, SQL, ML), header button treatment (completely quiet & clean), fresh web photo. Rebuilt UI with white glassmorphism (`backdrop-blur-xl`, smooth shadows), updated `mockProfile.ts`, simplified header, and rendered curved SVG bezier arrows linking the skill badge to GitHub repo and hackathon event cards. Verified clean build (`npm run build`). |
