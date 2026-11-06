# Meridian: a digital magazine in Next.js

A frontend-only magazine site built with **Next.js 14 (App Router), React, JavaScript, Tailwind CSS, Lucide React and local JSON**. There is no backend, database, API route, authentication or admin panel.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all 38 routes are statically generated)
npm start        # serve the production build
```

Set `NEXT_PUBLIC_SITE_URL` (for example in Vercel project settings) so canonical URLs, Open Graph, the sitemap and robots use your real domain. It defaults to `https://meridian-magazine.vercel.app`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage: latest issue hero, featured, latest and trending stories, categories, previous issues, about, newsletter |
| `/magazine` | Listing of 8 issues with search, category filters and newest/oldest sorting (reads `?q=` and `?category=`) |
| `/magazine/[slug]` | Issue details, highlights, overview, related articles, other issues |
| `/magazine/[slug]/read` | Digital reader: browser-native PDF viewer in an iframe, with download and open-in-new-tab |
| `/article/[slug]` | Article page: structured content, share buttons, sidebar, trending, related stories |
| `/about`, `/contact` | About page with team; contact form with validation (nothing is sent) |

Unknown slugs return the custom 404 (`dynamicParams = false` plus `notFound()`).

## Content lives in JSON

- `data/magazines.json`, `data/articles.json`, `data/categories.json`, `data/team.json`
- Article `content` is an array of blocks: `{ "type": "paragraph" | "heading" | "quote", "text": "...", "cite": "..." }`
- Magazine PDFs: set `pdfUrl` (a file in `public/pdfs/` or any absolute URL; remote hosts must allow framing). Each issue ships with a short real sample PDF. `pageCount` is display metadata and is independent of the sample file.
- Images: set `coverImage` / `featuredImage`. Local SVG artwork is included; to use photography, put files in `public/images/` or add the host to `images.remotePatterns` in `next.config.mjs`.
- Relationships: `magazineSlug` (article to issue), `relatedArticleSlugs` (article or issue to articles). Every slug in the shipped data is validated.

## Structure

```
app/          routes, metadata, sitemap.js, robots.js, not-found.js
components/   Header, Footer, MagazineCard, ArticleCard, MagazineExplorer (client), PdfViewer (client), ...
data/         JSON content
lib/          data.js (lookup, related, filtering), search.js (client-safe helpers), seo.js
public/       images/, pdfs/
```

Reusable functions in `lib/data.js`: `getMagazineBySlug`, `getArticleBySlug`, `getArticlesByMagazine`, `getRelatedArticles`, `getRelatedArticlesForMagazine`, `getTrendingArticles`, and others. `lib/search.js` provides `searchMagazines`, `searchArticles`, `filterByCategory`, `sortByDate`.

## Notes

- Server Components are the default; Client Components are used only for the header, explorer, forms, share buttons and PDF viewer.
- Fonts (Newsreader, Hanken Grotesk) load from Google Fonts via a `<link>` tag, with system fallbacks.
- The default Open Graph image is SVG. Some social networks require PNG/JPG, so replace `public/og-default.svg` reference in `app/layout.js` and `lib/seo.js` with a raster image for best link previews.
- All people, quotes and stories are fictional demo content.
