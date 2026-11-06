// Pure, dependency-free helpers: safe to import from Client Components.
const norm = (s) => String(s || "").toLowerCase();

export const sortByDate = (list, order = "newest") =>
  [...list].sort((a, b) => {
    const d = new Date(a.publicationDate) - new Date(b.publicationDate);
    return order === "oldest" ? d : -d;
  });

export const filterByCategory = (list, category) =>
  !category || category === "All" ? list : list.filter((i) => i.category === category);

const matches = (fields, query) => {
  const q = norm(query).trim();
  if (!q) return true;
  const haystack = norm(fields.flat().join(" "));
  return q.split(/\s+/).every((word) => haystack.includes(word));
};

export const searchMagazines = (list, query) =>
  list.filter((m) => matches([m.title, m.subtitle, m.description, m.category, m.tags, m.highlights], query));

export const searchArticles = (list, query) =>
  list.filter((a) => matches([a.title, a.subtitle, a.summary, a.category, a.author, a.tags], query));

export const formatDate = (iso, options = { year: "numeric", month: "long", day: "numeric" }) =>
  new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "UTC" }).format(new Date(iso));

export const formatMonthYear = (iso) => formatDate(iso, { year: "numeric", month: "long" });
