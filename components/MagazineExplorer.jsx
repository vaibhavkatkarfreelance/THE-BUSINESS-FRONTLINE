"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SearchX, X } from "lucide-react";
import MagazineCard from "./MagazineCard";
import { filterByCategory, searchArticles, searchMagazines, sortByDate } from "@/lib/search";

export default function MagazineExplorer({ magazines, articles, categories }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [sort, setSort] = useState("newest");

  // Keep state in sync when the header search navigates here with new parameters.
  useEffect(() => {
    setQuery(params.get("q") || "");
    setCategory(params.get("category") || "All");
  }, [params]);

  const results = useMemo(
    () => sortByDate(filterByCategory(searchMagazines(magazines, query), category), sort),
    [magazines, query, category, sort]
  );
  const articleHits = useMemo(
    () => (query.trim() ? searchArticles(articles, query).slice(0, 6) : []),
    [articles, query]
  );
  const reset = () => { setQuery(""); setCategory("All"); setSort("newest"); };
  const counts = (name) => magazines.filter((m) => m.category === name).length;

  return (
    <div>
      <div className="border-y border-ink/15 bg-sand">
        <div className="wrap py-6">
          <div className="grid gap-4 md:grid-cols-[1fr_14rem]">
            <div className="relative">
              <label htmlFor="mag-search" className="sr-only">Search magazines</label>
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input id="mag-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title, topic or keyword" className="field !pl-11 !pr-11" />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-2 text-muted hover:text-ink"><X size={18} /></button>
              )}
            </div>
            <div>
              <label htmlFor="mag-sort" className="sr-only">Sort issues</label>
              <select id="mag-sort" value={sort} onChange={(e) => setSort(e.target.value)} className="field">
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {["All", ...categories.map((c) => c.name)].map((name) => {
              const active = category === name;
              return (
                <button key={name} type="button" aria-pressed={active} onClick={() => setCategory(name)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${active ? "border-ink bg-ink text-white" : "border-ink/30 bg-white hover:border-ink"}`}>
                  {name}
                  <span className={`ml-1.5 ${active ? "text-white/70" : "text-muted"}`}>{name === "All" ? magazines.length : counts(name)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="wrap py-10">
        <p className="mb-8 text-muted" aria-live="polite">
          Showing <strong className="text-ink">{results.length}</strong> of {magazines.length} issues
          {query.trim() && <> for &ldquo;{query.trim()}&rdquo;</>}
          {category !== "All" && <> in {category}</>}
        </p>

        {results.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((m) => <MagazineCard key={m.slug} magazine={m} />)}
          </div>
        ) : (
          <div className="mx-auto max-w-lg py-16 text-center">
            <SearchX size={44} className="mx-auto text-accent" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-3xl">No issues match your search</h2>
            <p className="mt-3 text-muted">Try a broader keyword, choose a different category, or clear your filters to see every issue.</p>
            <button type="button" onClick={reset} className="btn-ink mt-6">Clear search and filters</button>
          </div>
        )}

        {articleHits.length > 0 && (
          <section aria-labelledby="article-hits" className="mt-16 border-t border-ink/15 pt-10">
            <h2 id="article-hits" className="font-serif text-3xl">Stories matching &ldquo;{query.trim()}&rdquo;</h2>
            <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {articleHits.map((a) => (
                <li key={a.slug} className="border-b border-ink/10 py-4">
                  <p className="text-sm font-semibold text-accent">{a.category}</p>
                  <Link href={`/blog/${a.slug}`} className="font-serif text-xl hover:text-accent">{a.title}</Link>
                  <p className="mt-1 text-sm text-muted">By {a.author}, {a.readingTime} min read</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
