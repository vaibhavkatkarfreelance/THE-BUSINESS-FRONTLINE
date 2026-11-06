import Link from "next/link";

export default function Logo({ light = false, className = "" }) {
  return (
    <Link href="/" aria-label="The Business Frontline, home" className={`inline-flex items-center gap-2.5 group ${className}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-accent font-serif text-sm font-black tracking-wider text-ink shadow-sm transition-transform duration-300 group-hover:scale-105">
        BF
      </span>
      <div className="flex flex-col leading-tight">
        <span className={`font-serif text-[1.05rem] font-bold tracking-[0.06em] sm:text-[1.25rem] transition-colors ${light ? "text-white group-hover:text-accent" : "text-ink group-hover:text-accent"}`}>
          THE BUSINESS FRONTLINE
        </span>
        <span className="text-[0.6rem] font-semibold tracking-[0.22em] uppercase text-accent">
          Global Executive Magazine
        </span>
      </div>
    </Link>
  );
}
