import { Suspense } from "react";
import MagazineExplorer from "@/components/MagazineExplorer";
import { buildMetadata } from "@/lib/seo";
import { getAllArticles, getAllMagazines, getCategories, slimArticle, SITE } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Digital Magazine Editions | The Business Frontline",
  description: "Browse every digital edition of The Business Frontline. Filter by industry sector, read full issues in your browser, or download complete PDF copies.",
  path: "/magazine",
});

export default function MagazinePage() {
  const magazines = getAllMagazines();
  return (
    <>
      <section className="border-b border-sand-deep bg-gradient-to-b from-sand to-paper pt-14 pb-12">
        <div className="wrap">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">
              Digital Editions & Archive
            </span>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-ink sm:text-6xl">
              All Magazine Issues
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Explore {magazines.length} curated quarterly and monthly editions of <strong>{SITE.name}</strong>. Each edition delivers rigorous executive interviews, market benchmarks, and in-depth sectoral analyses.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="wrap py-20 text-center text-muted">Loading digital editions...</div>}>
        <MagazineExplorer
          magazines={magazines}
          articles={getAllArticles().map(slimArticle)}
          categories={getCategories()}
        />
      </Suspense>
    </>
  );
}
