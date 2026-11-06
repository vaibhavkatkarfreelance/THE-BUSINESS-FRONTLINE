import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BookOpen, Download, Library } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import { MagazineMini } from "@/components/MagazineCard";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/search";
import { getAllMagazines, getArticlesByMagazine, getMagazineBySlug, getOtherMagazines, getRelatedArticlesForMagazine } from "@/lib/data";

export const dynamicParams = false;
export const generateStaticParams = () => getAllMagazines().map((m) => ({ slug: m.slug }));

export function generateMetadata({ params }) {
  const m = getMagazineBySlug(params.slug);
  if (!m) return { title: "Magazine not found" };
  return buildMetadata({ title: `${m.title}: ${m.subtitle}`, description: m.description, path: `/magazine/${m.slug}`, image: m.coverImage, imageAlt: `Cover of ${m.title}`, type: "book" });
}

export default function MagazineDetailPage({ params }) {
  const m = getMagazineBySlug(params.slug);
  if (!m) notFound();
  const own = getArticlesByMagazine(m.slug);
  const related = getRelatedArticlesForMagazine(m, 6);
  const others = getOtherMagazines(m.slug, 4);
  const facts = [
    ["Published", formatDate(m.publicationDate)],
    ["Volume", m.volume],
    ["Issue", m.issue],
    ["Pages", m.pageCount],
    ["Category", m.category],
  ];

  return (
    <>
      <section className="bg-sand">
        <div className="wrap grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden shadow-[0_30px_60px_-24px_rgba(31,29,28,0.7)] lg:mx-0 lg:max-w-none">
            <Image src={m.coverImage} alt={`Cover of ${m.title}, ${m.subtitle}`} fill priority sizes="(min-width:1024px) 416px, 90vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <nav aria-label="Breadcrumb" className="text-sm text-muted">
              <Link href="/magazine" className="hover:text-accent hover:underline">Magazines</Link> / <span aria-current="page">{m.title}</span>
            </nav>
            <h1 className="mt-4 font-serif text-5xl font-medium leading-[1.03] tracking-tight sm:text-6xl">{m.title}</h1>
            <p className="mt-3 font-serif text-2xl italic text-muted sm:text-3xl">{m.subtitle}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/85">{m.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-ink/20 py-6 sm:grid-cols-3 xl:grid-cols-5">
              {facts.map(([k, v]) => (
                <div key={k}><dt className="text-sm text-muted">{k}</dt><dd className="mt-0.5 font-serif text-xl">{v}</dd></div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/magazine/${m.slug}/read`} className="btn-accent"><BookOpen size={17} aria-hidden="true" />Read online</Link>
              <a href={m.pdfUrl} download className="btn-ink"><Download size={17} aria-hidden="true" />Download PDF</a>
              <a href="#articles" className="btn-outline"><Library size={17} aria-hidden="true" />Explore articles</a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="overview-title" className="wrap grid gap-12 pt-20 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div>
          <h2 id="overview-title" className="font-serif text-4xl font-medium">Magazine overview</h2>
          <p className="mt-5 font-serif text-xl leading-relaxed text-ink/85">{m.overview}</p>
          <h3 className="mt-10 font-serif text-2xl font-medium">Topics covered</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {m.tags.map((t) => <li key={t} className="rounded-full border border-ink/30 px-4 py-1.5 text-sm font-medium">{t}</li>)}
          </ul>
          {own.length > 0 && (
            <>
              <h3 className="mt-10 font-serif text-2xl font-medium">In this issue</h3>
              <ul className="mt-3 divide-y divide-ink/10 border-y border-ink/10">
                {own.map((a) => (
                  <li key={a.slug}><Link href={`/article/${a.slug}`} className="flex items-baseline justify-between gap-4 py-3 hover:text-accent"><span className="font-serif text-lg">{a.title}</span><span className="shrink-0 text-sm text-muted">{a.readingTime} min</span></Link></li>
                ))}
              </ul>
            </>
          )}
        </div>
        <aside aria-labelledby="highlights-title" className="h-fit border-t-4 border-accent bg-sand p-7">
          <h2 id="highlights-title" className="font-serif text-3xl font-medium">Issue highlights</h2>
          <ul className="mt-5 space-y-4">
            {m.highlights.map((h) => (
              <li key={h} className="flex gap-3 border-b border-ink/15 pb-4 last:border-0 last:pb-0"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" /><span className="text-lg">{h}</span></li>
            ))}
          </ul>
        </aside>
      </section>

      <section id="articles" aria-labelledby="articles-title" className="wrap scroll-mt-32 pt-24">
        <SectionHeading id="articles-title" kicker="Keep reading" title="Related articles" />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      </section>

      <section aria-labelledby="others-title" className="mt-24 bg-sand py-16">
        <div className="wrap">
          <SectionHeading id="others-title" kicker="More to read" title="Other issues" href="/magazine" linkLabel="All magazines" />
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {others.map((o) => <MagazineMini key={o.slug} magazine={o} />)}
          </div>
        </div>
      </section>
    </>
  );
}
