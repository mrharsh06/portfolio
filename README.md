# Harsh Chaudhary - Portfolio

Personal portfolio for AI engineering, AI-powered backend engineering, agentic AI, and generative AI roles.

Live website: https://harsh-chaudhary-ai.netlify.app/

## Stack

Next.js App Router, React, TypeScript, Framer Motion, Lucide icons, and custom CSS. The website is a static export with no backend or database.

## Development

Use Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Validation

```sh
npm run check
```

Runs component-render regression checks, TypeScript checks, and the production build. Render checks cover sections, project entry points, filter options, links, and accessible initial states; they do not replace browser interaction tests.

## Deployment

The production static export is `.next-build/`. Upload the entire folder, including `_next/` assets, for manual deployment. For Netlify Git deployment, `netlify.toml` sets the build command and publish directory.

```sh
npm run build
npm run preview
```

The preview serves the production export on port 3000. Stop any development server using that port first. Development uses a separate `.next-dev/` directory.

## Content updates

- `src/data/portfolio.ts`: profile, projects, experience, skills, recognition, and personal interests.
- `src/components/Portfolio.tsx`: sections and interactions.
- `src/app/globals.css`: responsive styling.
- `src/app/layout.tsx`: page metadata.

Enterprise case studies summarize professional contributions; proprietary implementation code is not included. Reported scale and impact metrics retain their approximate qualifiers. Contact links open email, LinkedIn, and YouTube directly.
