import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHeading({ id, title, kicker, href, linkLabel, as: Tag = "h2", light = false }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 border-b border-current/20 pb-4">
      <div>
        {kicker && <p className={`kicker ${light ? "!text-white/70" : ""}`}>{kicker}</p>}
        <Tag id={id} className={`font-serif text-3xl font-medium tracking-tight sm:text-4xl ${light ? "text-white" : ""}`}>{title}</Tag>
      </div>
      {href && (
        <Link href={href} className={`group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold ${light ? "text-white" : "text-accent"} hover:underline`}>
          {linkLabel}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
