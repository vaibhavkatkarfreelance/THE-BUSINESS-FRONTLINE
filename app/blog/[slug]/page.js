import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookOpen, Clock, ArrowLeft } from "lucide-react";
import ArticleBody from "@/components/ArticleBody";
import ArticleCard from "@/components/ArticleCard";
import ShareButtons from "@/components/ShareButtons";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/search";
import { SITE, getAllArticles, getArticleBySlug, getMagazineForArticle, getRelatedArticles, getTrendingArticles } from "@/lib/data";

export const dynamicParams = false;
export const generateStaticParams = () => getAllArticles().map((a) => ({ slug: a.slug }));

export function generateMetadata({ params }) {
  const a = getArticleBySlug(params.slug);
  if (!a) return { title: "Article not found" };
  const meta = buildMetadata({
    title: a.title,
    description: a.summary,
    path: `/blog/${a.slug}`,
    image: a.featuredImage,
    imageAlt: `Illustration for ${a.title}`,
    type: "article",
  });
  meta.openGraph = { ...meta.openGraph, publishedTime: a.publicationDate, authors: [a.author], tags: a.tags };
  meta.authors = [{ name: a.author }];
  meta.keywords = a.tags;
  return meta;
}

export default function BlogPostPage({ params }) {
  const a = getArticleBySlug(params.slug);
  if (!a) notFound();
  const magazine = getMagazineForArticle(a);
  const related = getRelatedArticles(a, 3);
  const trending = getTrendingArticles(4, a.slug);
  const url = `${SITE.url}/blog/${a.slug}`;
  const imageUrl = a.featuredImage?.startsWith("http") ? a.featuredImage : `${SITE.url}${a.featuredImage}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.summary,
    datePublished: a.publicationDate,
    author: { "@type": "Person", name: a.author },
    image: imageUrl,
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: url,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <header className="wrap max-w-5xl pt-10 text-center">
        <div className="mb-4">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted hover:text-accent transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
        </div>
        <p className="kicker">
          <Link href={`/blog?category=${encodeURIComponent(a.category)}`} className="hover:underline">
            {a.category}
          </Link>
        </p>
        <h1 className="mx-auto mt-3 max-w-4xl font-serif text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl text-ink">
          {a.title}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl font-serif text-xl italic leading-snug text-muted sm:text-2xl">
          {a.subtitle}
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-base text-ink/80 leading-relaxed">
          {a.summary}
        </p>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-semibold text-muted">
          <span>By <strong className="text-ink">{a.author}</strong></span>
          <span aria-hidden="true">•</span>
          <time dateTime={a.publicationDate}>{formatDate(a.publicationDate)}</time>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1"><Clock size={13} aria-hidden="true" />{a.readingTime} min read</span>
        </p>
      </header>

      {/* Hero Image */}
      <div className="wrap mt-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-sand shadow-sm">
          <Image
            src={a.featuredImage}
            alt={`Illustration for ${a.title}`}
            fill
            priority
            sizes="(min-width:1280px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="wrap grid gap-14 pt-12 lg:grid-cols-[minmax(0,1fr)_20rem] xl:gap-20">
        <div className="mx-auto w-full max-w-[44rem] lg:mx-0">
          <div className="mb-8 border-y border-sand-deep py-3.5">
            <ShareButtons url={url} title={a.title} />
          </div>
          <ArticleBody content={a.content} />
          <div className="mt-10 pt-6 border-t border-sand-deep">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Topic Tags</h4>
            <ul className="flex flex-wrap gap-2" aria-label="Tags">
              {a.tags.map((t) => (
                <li key={t} className="rounded-full bg-sand border border-sand-deep px-3.5 py-1 text-xs font-semibold text-ink/80">
                  #{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 border-t border-sand-deep pt-6">
            <ShareButtons url={url} title={a.title} />
          </div>
        </div>

        {/* Sidebar */}
        <aside aria-label="Sidebar" className="space-y-10 lg:sticky lg:top-32 lg:h-fit">
          {magazine && (
            <section aria-labelledby="issue-title" className="rounded-sm border border-sand-deep bg-sand p-6 shadow-sm">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-accent">Published In</span>
              <h2 id="issue-title" className="mt-1 font-serif text-xl font-bold text-ink">From the Edition</h2>
              <Link href={`/magazine/${magazine.slug}`} className="group mt-4 grid grid-cols-[5.5rem_1fr] gap-4 items-center">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-md">
                  <Image src={magazine.coverImage} alt={`Cover of ${magazine.title}`} fill sizes="88px" className="object-cover" />
                </div>
                <div>
                  <p className="font-serif text-lg font-bold leading-tight group-hover:text-accent transition-colors">{magazine.title}</p>
                  <p className="mt-1 text-xs text-muted">Vol. {magazine.volume}, Issue {magazine.issue}</p>
                </div>
              </Link>
              <div className="mt-5 grid gap-2">
                <Link href={`/magazine/${magazine.slug}/read`} className="btn-accent text-xs font-bold uppercase tracking-wider py-2">
                  <BookOpen size={14} aria-hidden="true" />
                  Read Issue
                </Link>
                <Link href={`/magazine/${magazine.slug}`} className="btn-outline text-xs font-bold uppercase tracking-wider py-2">
                  Issue Details
                </Link>
              </div>
            </section>
          )}

          <section aria-labelledby="trend-title" className="rounded-sm border border-sand-deep bg-white p-6 shadow-sm">
            <h2 id="trend-title" className="border-b border-sand-deep pb-3 font-serif text-xl font-bold text-ink">Trending Executive Stories</h2>
            <ol className="divide-y divide-sand-deep">
              {trending.map((t, i) => (
                <li key={t.slug} className="flex gap-4 py-4">
                  <span className="font-serif text-2xl font-bold leading-none text-accent" aria-hidden="true">0{i + 1}</span>
                  <div>
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted">{t.category}</span>
                    <Link href={`/blog/${t.slug}`} className="block mt-0.5 font-serif text-base font-semibold leading-snug hover:text-accent transition-colors">
                      {t.title}
                    </Link>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>

      {/* Related Stories */}
      <section aria-labelledby="related-title" className="wrap pt-20 pb-16">
        <SectionHeading id="related-title" kicker="Further Intelligence" title="Related Executive Insights" />
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((rel) => (
            <ArticleCard key={rel.slug} article={rel} />
          ))}
        </div>
      </section>
    </article>
  );
}
