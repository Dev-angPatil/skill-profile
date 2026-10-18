# Vision - Skill Passport (CODE APEX - Track 2 PS - 03)

**Team Name:** CTRL ALT ELITE  
**Team Leader:** Vedant Patil | **Builder:** Devang Patil  

## Core Problem
Traditional professional profiles (e.g. LinkedIn, PDF resumes) are fundamentally broken:
1. **Students & Job Seekers:** Work is scattered across GitHub, PDF certificates, hackathons, and research. They lack a unified, tamper-evident profile that proves what they can actually build.
2. **Recruiters:** Inundated with buzzword-stuffed resumes and unverified self-assertions. Recruiters spend 30+ minutes per candidate trying to manually verify technical competence or conducting wasteful preliminary screening calls.
3. **Colleges & Placement Cells:** Struggle to maintain real-time, verified student skill records to match with visiting recruiters or national frameworks (Skill India Digital Hub).

## Target Experience
**Skill Passport** converts scattered engineering work into an interactive, evidence-backed skill graph:
- A clean, minimalist monochrome interface (#f8fafc paper tones, #09090b carbon black, subtle glassmorphism).
- Hovering or clicking any skill box visually connects the skill to its contributing real-world artifacts (GitHub repositories, commit diffs, test suites, and hackathons) via animated SVG cubic bezier arrows.
- Mathematical score provenance: `Base Knowledge + Σ Event Deltas = Final Score`, ensuring scores are grounded in tangible code actions rather than arbitrary claims.
- Integrated Role Matching: Compares verified skill graphs against target Job Descriptions (JDs) to highlight specific competency gaps and recommend targeted learning paths.

## Success Criteria
- **3-Second Verifiability:** Recruiters can inspect a skill and trace its raw GitHub proof in under 3 seconds.
- **Zero Hallucination Grounding:** Extracted skills are tethered to quoted snippets in repositories and mapped to standard taxonomies (ESCO & O*NET).
- **Multi-Signal Authorship Attribution:** Repositories are validated against commit history, author email, and AST cadence to prevent plagiarism and repo-fork fraud.
- **Minimalist Aesthetic:** Adheres strictly to a sleek, zero-clutter UI with smooth diffused shadows and instant dark/light mode responsiveness.
