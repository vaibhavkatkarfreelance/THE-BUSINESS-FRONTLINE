import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import PdfViewer from "@/components/PdfViewer";
import { buildMetadata } from "@/lib/seo";
import { getAllMagazines, getMagazineBySlug } from "@/lib/data";

export const dynamicParams = false;
export const generateStaticParams = () => getAllMagazines().map((m) => ({ slug: m.slug }));

export function generateMetadata({ params }) {
  const m = getMagazineBySlug(params.slug);
  if (!m) return { title: "Magazine not found" };
  return buildMetadata({ title: `Read ${m.title} online`, description: `Read ${m.title} (${m.subtitle}) in your browser, or download the PDF.`, path: `/magazine/${m.slug}/read`, image: m.coverImage, imageAlt: `Cover of ${m.title}` });
}

export default function ReaderPage({ params }) {
  const m = getMagazineBySlug(params.slug);
  if (!m) notFound();
  const back = `/magazine/${m.slug}`;
  return (
    <section aria-labelledby="reader-title" className="bg-sand">
      <div className="wrap py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <Link href={back} className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"><ArrowLeft size={16} aria-hidden="true" />Back to magazine</Link>
            <h1 id="reader-title" className="mt-1 truncate font-serif text-3xl font-medium">{m.title} <span className="text-lg italic text-muted">Vol. {m.volume}, issue {m.issue}</span></h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={m.pdfUrl} download className="btn-ink"><Download size={16} aria-hidden="true" />Download PDF</a>
            <a href={m.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-outline"><ExternalLink size={16} aria-hidden="true" />Open in new tab</a>
          </div>
        </div>
      </div>
      <div className="wrap pb-8">
        <div className="h-[75vh] min-h-[32rem] overflow-hidden border border-ink/20 bg-white shadow-sm lg:h-[calc(100vh-13rem)]">
          <PdfViewer src={m.pdfUrl} title={`${m.title} digital edition`} backHref={back} />
        </div>
        <p className="mt-3 text-sm text-muted">The reader uses your browser&apos;s built-in PDF viewer. If pages do not appear on your device, use <strong>Open in new tab</strong> or <strong>Download PDF</strong>.</p>
      </div>
    </section>
  );
}
