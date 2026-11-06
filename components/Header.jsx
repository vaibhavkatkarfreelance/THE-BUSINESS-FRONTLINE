"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BookOpen, Menu, Search, X } from "lucide-react";
import Logo from "./Logo";

export default function Header({ latestSlug }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  const links = [
    { href: "/", label: "Home" },
    { href: "/magazine", label: "Magazines" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const submit = (e) => {
    e.preventDefault();
    const v = q.trim();
    router.push(v ? `/blog?q=${encodeURIComponent(v)}` : "/blog");
    setSearchOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-sand-deep/80 bg-paper/95 backdrop-blur-md">
      {/* Executive Top Banner */}
      <div className="hidden bg-ink text-xs text-white/80 md:block">
        <div className="wrap flex h-9 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-2 py-0.5 text-[0.68rem] font-bold tracking-widest text-accent uppercase">
              Global Circulation
            </span>
            <p className="text-white/70">The Business Frontline: C-Suite Intelligence, Strategy & Innovation</p>
          </div>
          <div className="flex items-center gap-5 text-white/75">
            <Link href={`/magazine/${latestSlug || "global-icons-of-leadership"}/read`} className="flex items-center gap-1.5 transition-colors hover:text-accent">
              <BookOpen size={13} className="text-accent" />
              <span>Current Issue</span>
            </Link>
            <span className="h-3 w-px bg-white/20" aria-hidden="true" />
            <Link href="/contact" className="transition-colors hover:text-white">Editorial Pitch</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[4.75rem]">
        <Logo />

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`relative py-1 text-[0.95rem] font-semibold tracking-wide transition-colors hover:text-accent ${
                    isActive(l.href)
                      ? "text-accent after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-accent"
                      : "text-ink/80"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-expanded={searchOpen}
            aria-controls="site-search"
            aria-label="Toggle search"
            className="rounded-sm p-2.5 text-ink/70 hover:bg-sand hover:text-ink transition-colors"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          <Link
            href={`/magazine/${latestSlug || "global-icons-of-leadership"}`}
            className="hidden lg:inline-flex btn bg-ink text-white hover:bg-accent hover:text-ink text-xs font-bold uppercase tracking-wider py-2.5 px-4"
          >
            Latest Issue
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            className="rounded-sm p-2.5 hover:bg-sand md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Search drawer */}
      {searchOpen && (
        <div id="site-search" className="border-t border-sand-deep bg-sand py-4 shadow-sm animate-in fade-in duration-150">
          <form onSubmit={submit} className="wrap flex items-center gap-3">
            <Search size={18} className="text-muted shrink-0" aria-hidden="true" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search C-suite insights, executive interviews, articles, or issues..."
              className="field flex-1 !py-2.5 text-sm"
              autoFocus
            />
            <button type="submit" className="btn-accent shrink-0 !py-2.5 !px-5 text-xs uppercase tracking-wider">Search</button>
          </form>
        </div>
      )}

      {/* Mobile drawer */}
      {menuOpen && (
        <div id="mobile-menu" className="border-t border-sand-deep bg-paper md:hidden">
          <nav aria-label="Mobile navigation" className="wrap py-6">
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`block py-1 text-lg font-medium transition-colors hover:text-accent ${
                      isActive(l.href) ? "text-accent font-semibold" : "text-ink"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-sand-deep pt-5">
              <Link
                href={`/magazine/${latestSlug || "global-icons-of-leadership"}`}
                onClick={() => setMenuOpen(false)}
                className="btn-accent w-full text-center text-xs font-bold uppercase tracking-wider"
              >
                Explore Current Edition
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
