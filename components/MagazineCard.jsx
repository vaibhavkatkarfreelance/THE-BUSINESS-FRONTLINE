import Link from "next/link";
import Image from "next/image";
import { BookOpen, Download, Eye, Sparkles } from "lucide-react";
import { formatMonthYear } from "@/lib/search";

export function MagazineMini({ magazine }) {
  return (
    <article className="group">
      <Link href={`/magazine/${magazine.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-sand shadow-[0_12px_28px_-14px_rgba(11,19,43,0.35)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_35px_-12px_rgba(197,155,39,0.3)]">
          <Image
            src={magazine.coverImage}
            alt={`Cover of ${magazine.title}, ${magazine.subtitle}`}
            fill
            sizes="(min-width:1024px) 22vw, (min-width:640px) 33vw, 50vw"
            className="object-cover"
          />
          <div className="absolute top-2.5 right-2.5 rounded-sm bg-ink/90 px-2 py-0.5 text-[0.62rem] font-bold tracking-wider text-accent uppercase backdrop-blur-sm">
            Vol. {magazine.volume}
          </div>
        </div>
        <h3 className="mt-3.5 font-serif text-lg font-bold leading-snug text-ink transition-colors group-hover:text-accent">
          {magazine.title}
        </h3>
        <p className="mt-0.5 text-xs font-medium text-muted">
          {formatMonthYear(magazine.publicationDate)} • {magazine.category}
        </p>
      </Link>
    </article>
  );
}

export default function MagazineCard({ magazine }) {
  const { slug, title, subtitle, category, description, coverImage, publicationDate, volume, issue, pdfUrl } = magazine;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-sm border border-sand-deep bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent/40">
      {/* Magazine Cover Top Section */}
      <Link href={`/magazine/${slug}`} className="group relative block bg-gradient-to-b from-sand to-sand-deep/40 p-6 sm:p-8" aria-label={`View details for ${title}`}>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[15rem] overflow-hidden rounded-sm shadow-[0_18px_34px_-16px_rgba(11,19,43,0.4)] transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.02]">
          <Image
            src={coverImage}
            alt={`Cover of ${title}, ${subtitle}`}
            fill
            sizes="(min-width:1024px) 256px, (min-width:640px) 40vw, 80vw"
            className="object-cover"
          />
          <div className="absolute top-3 left-3 rounded-sm bg-accent px-2 py-0.5 text-[0.65rem] font-black tracking-wider text-ink uppercase shadow">
            Issue {issue}
          </div>
        </div>
      </Link>

      {/* Magazine Details */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
          <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[0.68rem] tracking-wider text-accent-dark uppercase">{category}</span>
          <span className="text-muted">{formatMonthYear(publicationDate)} • Vol. {volume}</span>
        </div>

        <h3 className="mt-3 font-serif text-2xl font-bold leading-tight text-ink">
          <Link href={`/magazine/${slug}`} className="hover:text-accent transition-colors">{title}</Link>
        </h3>
        <p className="mt-1 font-serif text-base italic text-muted line-clamp-1">{subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3 flex-1">{description}</p>

        {/* Action Buttons */}
        <div className="mt-6 space-y-2 pt-4 border-t border-sand-deep">
          <div className="grid grid-cols-2 gap-2">
            <Link href={`/magazine/${slug}/read`} className="btn-accent !py-2.5 !px-3 text-xs font-bold uppercase tracking-wider">
              <BookOpen size={15} aria-hidden="true" />
              Read Online
            </Link>
            <Link href={`/magazine/${slug}`} className="btn-outline !py-2.5 !px-3 text-xs font-bold uppercase tracking-wider">
              <Eye size={15} aria-hidden="true" />
              Details
            </Link>
          </div>
          {pdfUrl && (
            <a
              href={pdfUrl}
              download
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-sm py-2 text-xs font-semibold text-muted hover:text-accent transition-colors"
            >
              <Download size={14} aria-hidden="true" />
              Download Digital Issue (PDF)
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
