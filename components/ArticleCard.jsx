import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/search";

export default function ArticleCard({ article, variant = "stack", priority = false }) {
  const href = `/blog/${article.slug}`;
  const alt = `Illustration for ${article.title}`;
  const meta = (
    <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-muted">
      <span className="font-semibold text-ink/90">{article.author}</span>
      <span aria-hidden="true" className="h-2.5 w-px bg-sand-deep" />
      <time dateTime={article.publicationDate}>{formatDate(article.publicationDate, { day: "numeric", month: "short", year: "numeric" })}</time>
      <span aria-hidden="true" className="h-2.5 w-px bg-sand-deep" />
      <span className="inline-flex items-center gap-1"><Clock size={12} />{article.readingTime} min</span>
    </p>
  );
  const img = (ratio, sizes) => (
    <div className={`relative overflow-hidden rounded-sm bg-sand ${ratio}`}>
      <Image src={article.featuredImage} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
  const title = (cls) => (
    <h3 className={`font-serif font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent ${cls}`}>
      <Link href={href} className="after:absolute after:inset-0">{article.title}</Link>
    </h3>
  );

  if (variant === "horizontal")
    return (
      <article className="group relative grid grid-cols-[8.5rem_1fr] gap-4 sm:grid-cols-[15rem_1fr] sm:gap-6 items-center">
        {img("aspect-[4/3]", "(min-width:640px) 240px, 136px")}
        <div>
          <span className="inline-block text-[0.68rem] font-bold uppercase tracking-wider text-accent">{article.category}</span>
          {title("mt-1 text-lg sm:text-xl")}
          <p className="mt-2 hidden text-sm leading-relaxed text-muted line-clamp-2 sm:block">{article.summary}</p>
          {meta}
        </div>
      </article>
    );

  if (variant === "feature")
    return (
      <article className="group relative bg-white p-2">
        {img("aspect-[16/10] lg:aspect-[16/10]", "(min-width:1024px) 60vw, 100vw")}
        <div className="pt-5">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-accent">{article.category}</span>
          {title("mt-1.5 text-2xl sm:text-4xl")}
          <p className="mt-3 text-base leading-relaxed text-muted line-clamp-3">{article.summary}</p>
          {meta}
        </div>
      </article>
    );

  return (
    <article className="group relative flex flex-col h-full bg-white">
      {img("aspect-[16/10]", "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw")}
      <div className="flex flex-1 flex-col pt-4">
        <span className="text-[0.68rem] font-bold uppercase tracking-wider text-accent">{article.category}</span>
        {title("mt-1 text-lg sm:text-[1.35rem]")}
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2 flex-1">{article.summary}</p>
        {meta}
      </div>
    </article>
  );
}
