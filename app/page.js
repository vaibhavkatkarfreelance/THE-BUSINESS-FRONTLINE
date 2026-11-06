import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Download, Eye, Sparkles, TrendingUp, ShieldCheck, Globe2, Award, Users } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import { MagazineMini } from "@/components/MagazineCard";
import SectionHeading from "@/components/SectionHeading";
import Newsletter from "@/components/Newsletter";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/search";
import { SITE, getCategoriesWithCounts, getFeaturedArticles, getLatestArticles, getLatestMagazine, getOtherMagazines, getTrendingArticles } from "@/lib/data";

export const metadata = buildMetadata({
  title: `${SITE.name}: ${SITE.tagline}`,
  absoluteTitle: true,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  const latest = getLatestMagazine();
  const featured = getFeaturedArticles(3);
  const latestArticles = getLatestArticles(5);
  const trending = getTrendingArticles(5);
  const categories = getCategoriesWithCounts();
  const moreMagazines = getOtherMagazines(latest.slug, 4);

  return (
    <>
      {/* Executive Breaking / Trending Ticker */}
      <div className="border-b border-sand-deep bg-sand/80 py-2.5">
        <div className="wrap flex items-center gap-3 overflow-hidden text-xs">
          <span className="flex items-center gap-1.5 shrink-0 font-bold uppercase tracking-widest text-accent">
            <TrendingUp size={14} />
            Trending Focus
          </span>
          <span className="h-3 w-px bg-sand-deep" aria-hidden="true" />
          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap text-ink/75 font-medium scrollbar-none">
            <Link href="/blog/the-algorithmic-boardroom" className="hover:text-accent transition-colors">
              • Autonomous Intelligence in Fortune 500 Boardrooms
            </Link>
            <Link href="/blog/sovereign-ai-race" className="hover:text-accent transition-colors">
              • Sovereign AI & Global Compute Infrastructure
            </Link>
            <Link href="/blog/decarbonizing-heavy-industry" className="hover:text-accent transition-colors">
              • Clean Hydrogen & Industrial Net-Zero Capital
            </Link>
            <Link href="/blog/fintech-beyond-borders" className="hover:text-accent transition-colors">
              • Next-Gen Cross-Border Treasury Settlements
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section: Flagship Magazine Issue Showcase */}
      <section aria-labelledby="hero-title" className="overflow-hidden border-b border-sand-deep bg-gradient-to-b from-sand via-paper to-paper">
        <div className="wrap grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-bold tracking-wider text-accent-dark uppercase">
              <Sparkles size={13} className="text-accent" />
              Flagship Edition • Vol. {latest.volume}, Issue {latest.issue}
            </div>

            <h1 id="hero-title" className="mt-4 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {latest.title}
            </h1>

            <p className="mt-3 font-serif text-2xl italic text-muted sm:text-3xl">
              {latest.subtitle}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
              {latest.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-muted">
              <span>Published {formatDate(latest.publicationDate)}</span>
              <span aria-hidden="true">•</span>
              <span>{latest.pageCount} Executive Pages</span>
              <span aria-hidden="true">•</span>
              <span className="text-accent-dark font-bold">Category: {latest.category}</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/magazine/${latest.slug}/read`}
                className="btn-accent text-xs font-bold uppercase tracking-wider py-3.5 px-6 shadow-sm"
              >
                <BookOpen size={16} aria-hidden="true" />
                Read Digital Issue
              </Link>
              <Link
                href={`/magazine/${latest.slug}`}
                className="btn-outline text-xs font-bold uppercase tracking-wider py-3.5 px-6"
              >
                <Eye size={16} aria-hidden="true" />
                Issue Overview
              </Link>
              {latest.pdfUrl && (
                <a
                  href={latest.pdfUrl}
                  download
                  className="inline-flex items-center gap-2 py-3 px-4 text-xs font-bold text-ink/75 hover:text-accent transition-colors"
                >
                  <Download size={16} aria-hidden="true" />
                  PDF Edition
                </a>
              )}
            </div>
          </div>

          {/* Magazine Cover with Gold Perspective Accent */}
          <Link
            href={`/magazine/${latest.slug}`}
            className="group relative mx-auto block w-full max-w-sm lg:max-w-md"
            aria-label={`Explore ${latest.title}`}
          >
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-sm border-2 border-accent transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-white shadow-[0_30px_60px_-24px_rgba(11,19,43,0.5)] transition-transform duration-500 group-hover:-translate-y-2">
              <Image
                src={latest.coverImage}
                alt={`Cover of ${latest.title}, ${latest.subtitle}`}
                fill
                priority
                sizes="(min-width:1024px) 440px, 90vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 rounded-sm bg-accent px-2.5 py-1 text-xs font-black tracking-widest text-ink uppercase shadow-md">
                Featured Cover
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Executive Spotlight / Editor's Picks */}
      <section aria-labelledby="spotlight-title" className="wrap pt-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-sand-deep pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Editorial Spotlight</span>
            <h2 id="spotlight-title" className="mt-1 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Executive Cover Stories
            </h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:underline">
            View All Stories <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          <ArticleCard article={featured[0]} variant="feature" priority />
          <div className="flex flex-col gap-8 lg:border-l lg:border-sand-deep lg:pl-12">
            {featured.slice(1).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest from the Executive Blog & Trending */}
      <section aria-label="Latest and trending stories" className="wrap grid gap-14 pt-24 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="flex items-baseline justify-between border-b border-sand-deep pb-3">
            <h2 className="font-serif text-2xl font-bold text-ink sm:text-3xl">Latest Executive Articles</h2>
            <Link href="/blog" className="text-xs font-bold uppercase tracking-wider text-accent hover:underline">
              See All &rarr;
            </Link>
          </div>
          <div className="divide-y divide-sand-deep mt-2">
            {latestArticles.map((a) => (
              <div key={a.slug} className="py-7 first:pt-4">
                <ArticleCard article={a} variant="horizontal" />
              </div>
            ))}
          </div>
        </div>

        {/* Trending Sidebar */}
        <aside aria-labelledby="trending-title" className="h-fit rounded-sm border border-sand-deep bg-sand/60 p-7">
          <span className="text-[0.68rem] font-bold uppercase tracking-widest text-accent">Real-Time Reads</span>
          <h2 id="trending-title" className="mt-1 border-b border-sand-deep pb-4 font-serif text-2xl font-bold text-ink">
            Trending C-Suite Pulse
          </h2>
          <ol className="divide-y divide-sand-deep">
            {trending.map((t, i) => (
              <li key={t.slug} className="py-4.5 flex gap-4">
                <span className="font-serif text-3xl font-bold leading-none text-accent" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">{t.category}</span>
                  <Link href={`/blog/${t.slug}`} className="block mt-1 font-serif text-base font-semibold leading-snug hover:text-accent transition-colors">
                    {t.title}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      {/* Executive Digital Editions Showcase */}
      <section aria-labelledby="archive-title" className="border-t border-sand-deep bg-sand/50 py-24 mt-20">
        <div className="wrap">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-sand-deep pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">The Vault</span>
              <h2 id="archive-title" className="mt-1 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Recent Digital Editions
              </h2>
            </div>
            <Link href="/magazine" className="btn-outline text-xs font-bold uppercase tracking-wider !py-2.5 !px-5">
              Explore All {moreMagazines.length + 1} Issues
            </Link>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {moreMagazines.map((m) => (
              <MagazineMini key={m.slug} magazine={m} />
            ))}
          </div>
        </div>
      </section>

      {/* Global Readership & Impact Metrics */}
      <section aria-label="Executive reach and impact" className="border-y border-sand-deep bg-ink py-16 text-white">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Worldwide Influence</span>
            <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">The Business Frontline Impact</h2>
            <p className="mt-3 text-sm text-white/70">Delivering unbiased executive journalism to boardrooms across six continents.</p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div className="border-r border-white/10 last:border-r-0">
              <Users className="mx-auto text-accent mb-3" size={28} />
              <p className="font-serif text-3xl font-bold sm:text-4xl text-white">250,000+</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/70 font-semibold">Monthly C-Suite Readers</p>
            </div>
            <div className="border-r border-white/10 last:border-r-0">
              <Globe2 className="mx-auto text-accent mb-3" size={28} />
              <p className="font-serif text-3xl font-bold sm:text-4xl text-white">65+</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/70 font-semibold">Global Countries</p>
            </div>
            <div className="border-r border-white/10 last:border-r-0">
              <Award className="mx-auto text-accent mb-3" size={28} />
              <p className="font-serif text-3xl font-bold sm:text-4xl text-white">1,200+</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/70 font-semibold">Leaders Profiled</p>
            </div>
            <div>
              <ShieldCheck className="mx-auto text-accent mb-3" size={28} />
              <p className="font-serif text-3xl font-bold sm:text-4xl text-white">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/70 font-semibold">Free Open Digital Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* C-Suite Daily Newsletter */}
      <Newsletter />
    </>
  );
}
