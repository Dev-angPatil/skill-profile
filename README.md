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
| *User Request: "Downloaded PDF stored in downloads. It is the idea for this project. We are going to pitch this to judges at 6:00 p.m... understand the idea properly, ask questions to establish everything is correct, and create documentation about the entire idea and questions the judges might ask... /grill-me /teamwork-preview"* | Extracted and OCR-analyzed 8-slide PDF deck (`Track 2 PS - 03 SKILL PASSPORT`, Team CTRL ALT ELITE, Vedant Patil & Devang Patil). Clarified presentation strategy via `/grill-me` (Technical hackathon focus, Multi-signal authorship anti-cheat, 1-100 rubric score grounding, Recruiter/Student dual perspective, Live demo at Slide 6). Created master pitch script, slide-by-slide timing, demo checklist, and battle-tested judge defense Q&A playbook in `pitch_and_judge_qa_guide.md` artifact. Synchronized `VISION.md`, `ARCHITECTURE.md`, and `prompt_draft.md`. |
| *User Request: "Almost everything to come is correct. Just when I press on the skills, rather than it showing on the bottom, it should show as a floating window on top and then link to those three or four events that it is related to."* | Redesigned the proof view: removed the in-flow bottom section. When a skill card is pressed, it now opens an elevated, centered floating glassmorphism window on top with backdrop blur (`fixed inset-0 z-50`). Shows the skill header and formula at top, smoothly animates curved SVG bezier arrows down to the 3-4 linked event cards, includes keyboard `Escape` & backdrop dismissal, and adds a skill switcher pill-bar for live switching between skills during the pitch. |
| *User Request: "remove this text Connecting skill to 3 verified real-world proof artifacts and this text Base 44 + Σ Proofs (+45) = 89"* | Cleaned floating window header: removed the verbose subtitle and mathematical formula pill, leaving a clean, high-impact header showing the score badge, skill name, category, and direct animated SVG arrow links to the event cards. Verified clean production build (`npm run build`). |

---

## Pitch & Hackathon Resources
- **Pitch Playbook & Judge Q&A Guide**: [`pitch_and_judge_qa_guide.md`](file:///home/deu/.gemini/antigravity/brain/719ddb05-bed1-4b01-8d77-882b1e53b1fc/pitch_and_judge_qa_guide.md)
- **Live Demo URL**: [http://localhost:3000](http://localhost:3000)
- **Team**: CTRL ALT ELITE (Vedant Patil & Devang Patil) | Track 2 PS - 03: SKILL PASSPORT

