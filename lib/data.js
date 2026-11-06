import magazinesData from "@/data/magazines.json";
import articlesData from "@/data/articles.json";
import categoriesData from "@/data/categories.json";
import teamData from "@/data/team.json";
import { sortByDate, searchMagazines, searchArticles, filterByCategory } from "./search";

export { sortByDate, searchMagazines, searchArticles, filterByCategory };
export { formatDate, formatMonthYear } from "./search";

export const SITE = {
  name: "The Business Frontline",
  tagline: "Global Executive, Technology & Leadership Insights",
  description:
    "The Business Frontline is an international executive magazine spotlighting world-class leaders, enterprise technology, global finance, and groundbreaking corporate transformations.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://thebusinessfrontline.com").replace(/\/$/, ""),
  email: "editorial@thebusinessfrontline.com",
  phone: "+1 (212) 555-0198",
  address: "750 Lexington Avenue, 24th Floor, New York, NY 10022, USA",
};

/* ---------- Magazines ---------- */
export const getAllMagazines = (order = "newest") => sortByDate(magazinesData, order);
export const getMagazineBySlug = (slug) => magazinesData.find((m) => m.slug === slug) || null;
export const getLatestMagazine = () => getAllMagazines()[0];
export const getFeaturedMagazines = () => getAllMagazines().filter((m) => m.featured);
export const getOtherMagazines = (slug, limit = 4) =>
  getAllMagazines().filter((m) => m.slug !== slug).slice(0, limit);

/* ---------- Articles ---------- */
export const getAllArticles = (order = "newest") => sortByDate(articlesData, order);
export const getArticleBySlug = (slug) => articlesData.find((a) => a.slug === slug) || null;
export const getFeaturedArticles = (limit = 3) => getAllArticles().filter((a) => a.featured).slice(0, limit);
export const getLatestArticles = (limit = 5) => getAllArticles().slice(0, limit);
export const getTrendingArticles = (limit = 5, excludeSlug) =>
  getAllArticles().filter((a) => a.trending && a.slug !== excludeSlug).slice(0, limit);
export const getArticlesByMagazine = (magazineSlug) =>
  getAllArticles().filter((a) => a.magazineSlug === magazineSlug);
export const getMagazineForArticle = (article) => getMagazineBySlug(article.magazineSlug);

const resolve = (slugs = []) => slugs.map(getArticleBySlug).filter(Boolean);
const score = (item, ref) =>
  (item.category === ref.category ? 3 : 0) + (item.tags || []).filter((t) => (ref.tags || []).includes(t)).length;

/** Related articles: explicit JSON relationships first, then shared category/tags. */
export function getRelatedArticles(article, limit = 3) {
  const picked = resolve(article.relatedArticleSlugs).filter((a) => a.slug !== article.slug);
  if (picked.length >= limit) return picked.slice(0, limit);
  const rest = articlesData
    .filter((a) => a.slug !== article.slug && !picked.includes(a))
    .sort((a, b) => score(b, article) - score(a, article));
  return [...picked, ...rest].slice(0, limit);
}

/** 4-6 articles for a magazine: its own stories, listed relationships, then shared categories. */
export function getRelatedArticlesForMagazine(magazine, limit = 6) {
  const merged = [...new Map([...getArticlesByMagazine(magazine.slug), ...resolve(magazine.relatedArticleSlugs)].map((a) => [a.slug, a])).values()];
  const rest = articlesData.filter((a) => !merged.includes(a)).sort((a, b) => score(b, magazine) - score(a, magazine));
  return [...merged, ...rest].slice(0, Math.min(6, Math.max(4, limit)));
}

/** Slim article objects for Client Components (keeps article bodies out of the client bundle). */
export const slimArticle = ({ slug, title, subtitle, summary, category, author, featuredImage, publicationDate, readingTime, tags }) => ({
  slug, title, subtitle, summary, category, author, featuredImage, publicationDate, readingTime, tags,
});

/* ---------- Categories & team ---------- */
export const getCategories = () => categoriesData;
export const getCategoriesWithCounts = () =>
  categoriesData.map((c) => ({
    ...c,
    magazineCount: magazinesData.filter((m) => m.category === c.name).length,
    articleCount: articlesData.filter((a) => a.category === c.name).length,
  }));
export const getTeam = () => teamData;
