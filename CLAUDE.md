# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Development server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint linting
```

No test runner is configured.

## Tech Stack

- **Next.js 16** with App Router, **React 19**, **TypeScript 5**
- **Tailwind CSS** with custom HSL theme variables (dark theme, near-black background)
- **Radix UI + Shadcn/ui** — 48 pre-built components in [components/ui/](components/ui/)
- **Framer Motion** for animations
- **Google Gemini API** for the AI chatbot (via server actions)

## Architecture

This is a **single-page portfolio** served at `/`. All sections render on the homepage (`app/page.tsx`).

### Key Files

- [app/layout.tsx](app/layout.tsx) — Root layout; mounts fonts, Vercel Analytics, and `ChatWidget`
- [app/page.tsx](app/page.tsx) — Composes all portfolio sections in order
- [app/actions.ts](app/actions.ts) — Server Actions; contains `chatWithGemini()` with model fallback: `gemini-2.5-pro` → `gemini-2.5-flash` → `gemini-1.5-flash`
- [app/globals.css](app/globals.css) — CSS custom properties for the theme; custom scrollbar and selection styles
- [lib/system-prompt.ts](lib/system-prompt.ts) — Gemini chatbot persona/system prompt (acts as owner's digital twin)
- [lib/utils.ts](lib/utils.ts) — Shared utilities (mostly `cn()` from Shadcn)

### Component Structure

Section components (direct children of `app/page.tsx`):
`nav-bar` → `hero-section` → `about-section` → `skills-section` → `projects-section` → `education-section` → `certifications-section` → `contact-section` → `system-footer`

The `chat-widget.tsx` is mounted globally in the root layout, not in a section.

### Configuration Notes

- `next.config.mjs`: Image optimization disabled (`unoptimized: true`), TypeScript build errors ignored (`ignoreBuildErrors: true`)
- `tailwind.config.ts`: Dark mode is class-based; custom fonts are Inter (sans) and JetBrains Mono (mono)
- Path alias `@/` maps to the repository root
- Environment variable `GEMINI_API_KEY` (in `.env.local`) is required for the chatbot
