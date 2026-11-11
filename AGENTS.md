# Portfolio maintenance

- Preserve the existing green editorial design and the problem-solving introduction.
- Maintain content in `src/data/portfolio.ts`; do not invent credentials, client details, metrics, or public project links.
- Keep professional case studies at a public-summary level. Do not commit proprietary source, internal walkthroughs, credentials, local backups, or generated build output.
- Run `npm run check` after changes. For UI behavior changes, also verify project filtering, case-study dialogs and Escape, expertise accordions, graph controls, mobile navigation, and contact links in a browser when available.
- Report checks accurately; component-render checks do not exercise browser interactions.
- Development uses `.next-dev/`; production exports to `.next-build/`. Keep caches separate and publish all assets in the export.
