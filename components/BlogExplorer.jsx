"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SearchX, X } from "lucide-react";
import ArticleCard from "./ArticleCard";
import { filterByCategory, searchArticles, sortByDate } from "@/lib/search";

export default function BlogExplorer({ articles, categories }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    setQuery(params.get("q") || "");
    setCategory(params.get("category") || "All");
  }, [params]);

  const results = useMemo(() => {
    let list = articles;
    if (query.trim()) {
      list = searchArticles(list, query);
    }
    list = filterByCategory(list, category);
    return sortByDate(list, sort);
  }, [articles, query, category, sort]);

  const reset = () => {
    setQuery("");
    setCategory("All");
    setSort("newest");
  };

  const counts = (name) => articles.filter((a) => a.category === name).length;

  return (
    <div>
      {/* Search and Category Filter Bar */}
      <div className="border-y border-sand-deep bg-sand/60">
        <div className="wrap py-6">
          <div className="grid gap-4 md:grid-cols-[1fr_14rem]">
            <div className="relative">
              <label htmlFor="blog-search" className="sr-only">Search executive blog articles</label>
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by topic, leader, AI, cloud, strategy..."
                className="field !pl-11 !pr-11"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-2 text-muted hover:text-ink"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <div>
              <label htmlFor="blog-sort" className="sr-only">Sort articles</label>
              <select
                id="blog-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="field"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="Filter blog by sector">
            <span className="text-xs font-bold text-muted uppercase tracking-wider mr-2">Sectors:</span>
            {["All", ...categories.map((c) => c.name)].map((name) => {
              const active = category === name;
              const count = name === "All" ? articles.length : counts(name);
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(name)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "border-ink bg-ink text-accent shadow-sm"
                      : "border-sand-deep bg-white text-ink/75 hover:border-ink hover:text-ink"
                  }`}
                >
                  {name} <span className="opacity-60 ml-0.5">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Blog Articles Grid */}
      <div className="wrap py-12">
        <div className="flex items-center justify-between pb-6 border-b border-sand-deep">
          <p className="text-sm font-medium text-muted">
            Showing <strong className="text-ink">{results.length}</strong> {results.length === 1 ? "article" : "articles"}
            {category !== "All" && <span> in <strong className="text-accent">{category}</strong></span>}
            {query && <span> for &ldquo;{query}&rdquo;</span>}
          </p>
          {(category !== "All" || query) && (
            <button onClick={reset} className="text-xs font-bold uppercase tracking-wider text-accent hover:underline">
              Reset Filters
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="py-20 text-center">
            <SearchX size={44} className="mx-auto text-muted/60" aria-hidden="true" />
            <h2 className="mt-4 font-serif text-2xl font-bold text-ink">No articles found</h2>
            <p className="mt-2 text-sm text-muted">Try adjusting your search terms or selecting a different category.</p>
            <button onClick={reset} className="btn-accent mt-6 text-xs uppercase tracking-wider">
              View All Articles
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((article, idx) => (
              <ArticleCard key={article.slug} article={article} priority={idx < 3} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
