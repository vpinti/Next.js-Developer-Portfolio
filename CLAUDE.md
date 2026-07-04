# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # dev server at localhost:3000
npm run build   # production build (runs getStaticProps/getStaticPaths for all pages)
npm run start   # serve production build
npm run lint    # next lint (eslint-config-next, core-web-vitals)
```

Node version pinned in `.nvmrc` (v16.15.1). No test suite exists.

## Architecture

Next.js 14 **Pages Router** portfolio site (not App Router — despite article content discussing the App Router). JavaScript, not TypeScript. Import alias `@/*` → `src/*` (`jsconfig.json`).

### Blog system (the non-obvious part)

Articles are Markdown files in `src/posts/*.md`, rendered as fully static pages. The pipeline:

- `src/lib/posts.js` — filesystem data layer. Reads `src/posts/`, parses YAML frontmatter with `gray-matter`, computes `readingTime` (200 wpm). Exports `getPostBySlug`, `getAllPosts` (sorted newest-first by frontmatter `date`), `getAllCategories`, `getAllTags`. **Callable only from `getStaticProps`/`getStaticPaths`** — uses `fs`, runs at build time.
- `src/pages/blogs/[slug].js` — one static page per post. `getStaticPaths` enumerates slugs from `getAllPosts`; `getStaticProps` loads the post.
- `src/pages/tag/[tag].js` — one static page per tag, filtered posts.
- `src/pages/articles.js` — index listing all posts.
- `src/components/markdown-renderer.js` — renders `post.content` via `react-markdown` with `rehype-raw` (raw HTML) + `rehype-prism-plus` (syntax highlighting w/ line numbers).

**Frontmatter contract** (must match, or pages break): `title`, `date` (parseable string, e.g. `"August 20, 2024"`), `coverImage`, `coverImageWidth`, `coverImageHeight`, `excerpt`, `category` (string), `tags` (array). Adding a `.md` file to `src/posts/` with valid frontmatter auto-generates its page + tag pages on next build.

Note: `content/blogs/` is unused by the blog pipeline; posts live in `src/posts/`.

### App shell & styling

- `src/pages/_app.js` — global shell: `NavBar`, `Footer`, Montserrat font (CSS var `--font-mont`), Framer Motion `AnimatePresence` (keyed on route for page transitions), Vercel `SpeedInsights` + `Analytics`.
- Tailwind, `darkMode: 'class'` toggled via `src/components/hooks/useThemeSwitcher.js`. Breakpoints are **max-width** (mobile-first inverted: `md` = `max-width: 767px`).
- Custom colors: `primary` (#B63E96), `primaryDark` (#58E6D9), plus HSL CSS-var-driven tokens (`card`, `muted`, `tag`, `accent`) defined in `globals.css`.
- `src/lib/utils.js` — `cn()` (clsx + tailwind-merge) for class composition.

## Conventions

- Commit messages: Conventional Commits, in Italian (see git log). Code comments are mixed Italian/English.
- **Site content and UI text: English only** (professional site). Applies to pages, components, SEO/meta, dates (`toLocaleDateString("en-US", ...)`), strings like "min read"/"Read more", and all blog posts in `src/posts/` (the previously Italian legacy posts have been converted to English).

## Blog article authoring

When asked to write/generate a blog article, follow the rules in [docs/prompt.txt](docs/prompt.txt). Summary:

- Output a real `.md` file in `src/posts/<slug>.md` (kebab-case slug) with valid YAML frontmatter (see the frontmatter contract above), then raw markdown. **Never** wrap the article in a single ```` ```markdown ```` code block — it would render as one code block, not a post.
- **English only**, **intermediate** level (accessible but with substance), friendly tone, **no emoji**.
- Structure: intro, table of contents, numbered sections, code examples if useful, motivational conclusion, optional resources.
- Use past dates, spaced out, unless told otherwise.
- Cover image: if none provided, use a `placehold.co` placeholder in **`.png`** (SVG is blocked by next/image) and flag it for replacement.
