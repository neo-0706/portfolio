# Mohammad Hosein Shahsavand Baghdadi — Portfolio

A premium, cinematic personal portfolio built with React, TypeScript, Tailwind CSS and
Framer Motion.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons


## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   Reusable UI primitives (nav, cursor, buttons, project visuals)
  sections/     Page sections (hero, about, stack, work, experience, contact...)
  data/         Content — projects, tech stack, nav — kept separate from UI
  hooks/        Small hooks (reduced motion, mouse position)
  lib/          Utilities
```

## Notes

- All content in this site comes directly from the owner's résumé — no invented
  companies, metrics, or testimonials.
- Respects `prefers-reduced-motion` throughout (see `useReducedMotion`).
- Update project/tech/contact details in `src/data/`.
