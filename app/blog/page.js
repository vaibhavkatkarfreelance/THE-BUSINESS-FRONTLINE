import { Suspense } from "react";
import BlogExplorer from "@/components/BlogExplorer";
import ArticleCard from "@/components/ArticleCard";
import { buildMetadata } from "@/lib/seo";
import { getAllArticles, getCategories, getFeaturedArticles, slimArticle, SITE } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Executive Blog & Leadership Insights",
  description: "Browse the latest analysis on C-suite leadership, enterprise AI, cloud architecture, sustainable finance, and corporate strategy from The Business Frontline.",
  path: "/blog",
});

export default function BlogPage() {
  const allArticles = getAllArticles();
  const featured = getFeaturedArticles(1)[0];
  const categories = getCategories();

  return (
    <>
      {/* Blog Masthead */}
      <section className="border-b border-sand-deep bg-gradient-to-b from-sand to-paper pt-14 pb-12">
        <div className="wrap">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">
              The Frontline Dispatch
            </span>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-ink sm:text-6xl">
              Executive Blog & Insights
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Deep-dive reporting, strategic frameworks, and authoritative commentary on the global economy, written by editors and industry practitioners.
            </p>
          </div>

          {/* Featured Headline Post */}
          {featured && (
            <div className="mt-10 rounded-sm border border-sand-deep bg-white p-5 shadow-sm sm:p-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent-dark uppercase tracking-wider mb-3">
                Featured Lead Story
              </span>
              <ArticleCard article={featured} variant="horizontal" priority />
            </div>
          )}
        </div>
      </section>

      {/* Explorer Component */}
      <Suspense fallback={<div className="wrap py-20 text-center text-muted">Loading executive articles...</div>}>
        <BlogExplorer articles={allArticles.map(slimArticle)} categories={categories} />
      </Suspense>
    </>
  );
}
