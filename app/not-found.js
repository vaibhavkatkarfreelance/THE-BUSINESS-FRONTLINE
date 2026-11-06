import Link from "next/link";
import { getLatestMagazine } from "@/lib/data";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  const latest = getLatestMagazine();
  return (
    <section className="wrap flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="kicker">Error 404</p>
      <h1 className="mt-2 max-w-2xl font-serif text-5xl font-medium leading-tight sm:text-7xl">This page has gone missing from the issue.</h1>
      <p className="mt-6 max-w-xl text-lg text-muted">The address may be mistyped, or the story or magazine may have been moved. Try one of these instead.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-ink">Go to the homepage</Link>
        <Link href="/magazine" className="btn-outline">Browse all magazines</Link>
        <Link href={`/magazine/${latest.slug}`} className="btn-outline">Open the latest issue</Link>
      </div>
    </section>
  );
}
