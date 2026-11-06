import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookOpen, Clock } from "lucide-react";
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
  const meta = buildMetadata({ title: a.title, description: a.summary, path: `/article/${a.slug}`, image: a.featuredImage, imageAlt: `Illustration for ${a.title}`, type: "article" });
  meta.openGraph = { ...meta.openGraph, publishedTime: a.publicationDate, authors: [a.author], tags: a.tags };
  meta.authors = [{ name: a.author }];
  meta.keywords = a.tags;
  return meta;
}

export default function ArticlePage({ params }) {
  const a = getArticleBySlug(params.slug);
  if (!a) notFound();
  const magazine = getMagazineForArticle(a);
  const related = getRelatedArticles(a, 3);
  const trending = getTrendingArticles(4, a.slug);
  const url = `${SITE.url}/article/${a.slug}`;
  const imageUrl = a.featuredImage?.startsWith("http") ? a.featuredImage : `${SITE.url}${a.featuredImage}`;
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.summary, datePublished: a.publicationDate, author: { "@type": "Person", name: a.author }, image: imageUrl, publisher: { "@type": "Organization", name: SITE.name }, mainEntityOfPage: url };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="wrap max-w-5xl pt-12 text-center">
        <p className="kicker"><Link href={`/magazine?category=${encodeURIComponent(a.category)}`} className="hover:underline">{a.category}</Link></p>
        <h1 className="mx-auto mt-3 max-w-4xl font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">{a.title}</h1>
        <p className="mx-auto mt-5 max-w-3xl font-serif text-2xl italic leading-snug text-muted sm:text-3xl">{a.subtitle}</p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/80">{a.summary}</p>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted">
          <span>By <strong className="text-ink">{a.author}</strong></span>
          <time dateTime={a.publicationDate}>{formatDate(a.publicationDate)}</time>
          <span className="inline-flex items-center gap-1.5"><Clock size={15} aria-hidden="true" />{a.readingTime} min read</span>
        </p>
      </header>

      <div className="wrap mt-10">
        <div className="relative aspect-[16/9] overflow-hidden bg-sand">
          <Image src={a.featuredImage} alt={`Illustration for ${a.title}`} fill priority sizes="(min-width:1280px) 1200px, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="wrap grid gap-14 pt-12 lg:grid-cols-[minmax(0,1fr)_20rem] xl:gap-20">
        <div className="mx-auto w-full max-w-[44rem] lg:mx-0">
          <div className="mb-10 border-y border-ink/15 py-4"><ShareButtons url={url} title={a.title} /></div>
          <ArticleBody content={a.content} />
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
            {a.tags.map((t) => <li key={t} className="rounded-full bg-sand px-4 py-1.5 text-sm font-medium">{t}</li>)}
          </ul>
          <div className="mt-10 border-t border-ink/15 pt-6"><ShareButtons url={url} title={a.title} /></div>
        </div>

        <aside aria-label="Sidebar" className="space-y-10 lg:sticky lg:top-32 lg:h-fit">
          {magazine && (
            <section aria-labelledby="issue-title" className="bg-sand p-6">
              <h2 id="issue-title" className="font-serif text-2xl">From the issue</h2>
              <Link href={`/magazine/${magazine.slug}`} className="group mt-4 grid grid-cols-[6rem_1fr] gap-4">
                <div className="relative aspect-[3/4] overflow-hidden shadow-md">
                  <Image src={magazine.coverImage} alt={`Cover of ${magazine.title}`} fill sizes="96px" className="object-cover" />
                </div>
                <div>
                  <p className="font-serif text-xl leading-tight group-hover:text-accent">{magazine.title}</p>
                  <p className="mt-1 text-sm text-muted">Vol. {magazine.volume}, issue {magazine.issue}</p>
                </div>
              </Link>
              <div className="mt-5 grid gap-2">
                <Link href={`/magazine/${magazine.slug}`} className="btn-outline">View the issue</Link>
                <Link href={`/magazine/${magazine.slug}/read`} className="btn-accent"><BookOpen size={16} aria-hidden="true" />Read online</Link>
              </div>
            </section>
          )}
          <section aria-labelledby="trend-title">
            <h2 id="trend-title" className="border-b border-ink/20 pb-3 font-serif text-2xl">Trending stories</h2>
            <ol className="divide-y divide-ink/10">
              {trending.map((t, i) => (
                <li key={t.slug} className="flex gap-4 py-4">
                  <span className="font-serif text-3xl leading-none text-accent/60" aria-hidden="true">{i + 1}</span>
                  <div><p className="text-sm text-muted">{t.category}</p><Link href={`/blog/${t.slug}`} className="font-serif text-lg leading-snug hover:text-accent">{t.title}</Link></div>
                </li>
              ))}
            </ol>
          </section>
        </aside>
      </div>

      <section aria-labelledby="related-title" className="wrap pt-24">
        <SectionHeading id="related-title" kicker="Keep reading" title="Related articles" />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => <ArticleCard key={r.slug} article={r} />)}
        </div>
      </section>
    </article>
  );
}
