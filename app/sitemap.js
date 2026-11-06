import { SITE, getAllMagazines, getAllArticles } from "@/lib/data";

export default function sitemap() {
  const now = new Date();
  const pages = ["", "/magazine", "/blog", "/about", "/contact"].map((p) => ({ url: `${SITE.url}${p}`, lastModified: now, changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 }));
  const mags = getAllMagazines().flatMap((m) => [
    { url: `${SITE.url}/magazine/${m.slug}`, lastModified: new Date(m.publicationDate), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/magazine/${m.slug}/read`, lastModified: new Date(m.publicationDate), changeFrequency: "monthly", priority: 0.6 },
  ]);
  const arts = getAllArticles().map((a) => ({ url: `${SITE.url}/blog/${a.slug}`, lastModified: new Date(a.publicationDate), changeFrequency: "monthly", priority: 0.7 }));
  return [...pages, ...mags, ...arts];
}
