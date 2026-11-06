import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { SITE, getCategories, getLatestMagazine } from "@/lib/data";

export default function Footer() {
  const latest = getLatestMagazine();
  return (
    <footer className="mt-24 border-t border-sand-deep bg-ink text-white/80">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand column */}
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            {SITE.description}
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-accent">
            <ShieldCheck size={16} />
            <span>Verified C-Suite Executive Reach</span>
          </div>
        </div>

        {/* Navigation */}
        <nav aria-label="Explore pages">
          <h2 className="font-serif text-lg font-bold text-white tracking-wide">Quick Navigation</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-accent transition-colors">Home Page</Link></li>
            <li><Link href="/magazine" className="hover:text-accent transition-colors">Magazine Archive</Link></li>
            <li><Link href="/blog" className="hover:text-accent transition-colors">Executive Blog</Link></li>
            <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
            <li><Link href={`/magazine/${latest.slug}/read`} className="hover:text-accent transition-colors">Read Current Issue</Link></li>
          </ul>
        </nav>

        {/* Sectors */}
        <nav aria-label="Sectors">
          <h2 className="font-serif text-lg font-bold text-white tracking-wide">Coverage Sectors</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {getCategories().map((c) => (
              <li key={c.slug}>
                <Link href={`/blog?category=${encodeURIComponent(c.name)}`} className="hover:text-accent transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Headquarters */}
        <div>
          <h2 className="font-serif text-lg font-bold text-white tracking-wide">Global Headquarters</h2>
          <ul className="mt-4 space-y-3.5 text-sm text-white/75">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="hover:text-accent transition-colors">{SITE.email}</a>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              <span>{SITE.phone || "+1 (212) 555-0198"}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/40">
        <div className="wrap flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between text-white/60">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-white">Editorial Board</Link>
            <Link href="/contact" className="hover:text-white">Media Kit</Link>
            <Link href="/magazine" className="hover:text-white">Digital Editions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
