# Original User Request

## Initial Request — 2026-10-18T11:52:57Z

Skill Passport is an evidence-backed skill provenance platform transforming unverified developer resume assertions into tamper-evident skill graphs backed by raw Git commits, PR diffs, and cryptographic/OCR credentials.

Working directory: /home/deu/Coding Repos/skill-profile
Integrity mode: development

## Requirements

### R1. Evidence-Backed Skill Provenance Engine
Interactive portfolio showcasing developer skills linked via visual bezier connector graphs to verified engineering artifacts (GitHub repositories, PRs, hackathons, and certifications) with transparent score deltas.

### R2. Automated Ingestion & Extraction Pipeline
Multi-modal artifact parser reading GitHub repository metadata and uploaded certification PDFs (via OCR/LLM) to extract structured skill assertions with quoted source snippets mapped to ESCO and O*NET taxonomies.

### R3. Multi-Signal Authorship Attribution
Verification engine analyzing Git commit authorship, commit cadence/timestamps, and AST diffs to prevent repository cloning and plagiarism fraud.

### R4. Job Description Gap Matcher & Learning Pathways
Role comparison engine matching candidate's verified skill graph against target job specs, pinpointing concrete skill gaps, and generating targeted remediation pathways.

## Acceptance Criteria

### Visual & Interactive Provenance
- [ ] Clicking or hovering any skill node highlights direct links to contributing proof artifacts with specific contribution metrics.
- [ ] Clean, minimalist monochrome UI (paper white / carbon black) adhering to core-first philosophy.

### Evidence Integrity & Verification
- [ ] Every extracted skill maintains a 1-to-1 deep link or quoted snippet back to its source artifact.
- [ ] Skill score breakdown displays explicit formula provenance (Base Knowledge + Σ Event Deltas).
- [ ] Repository attribution passes author email and commit cadence validation.
