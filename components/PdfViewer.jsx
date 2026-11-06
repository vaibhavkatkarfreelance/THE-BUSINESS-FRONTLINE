"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function PdfViewer({ src, title, backHref }) {
  const [status, setStatus] = useState(src ? "loading" : "error");

  useEffect(() => {
    if (!src) return;
    let alive = true;
    fetch(src, { method: "HEAD" })
      .then((r) => alive && setStatus(r.ok ? "ready" : "error"))
      .catch(() => alive && setStatus("error"));
    return () => { alive = false; };
  }, [src]);

  if (status === "error")
    return (
      <div role="alert" className="flex h-full min-h-[24rem] flex-col items-center justify-center gap-4 bg-sand p-8 text-center">
        <AlertTriangle size={40} className="text-accent" aria-hidden="true" />
        <h2 className="font-serif text-3xl">This issue could not be loaded</h2>
        <p className="max-w-md text-muted">The PDF file is missing or your browser could not open it. Check the <code className="rounded bg-white px-1">pdfUrl</code> value for this issue in <code className="rounded bg-white px-1">data/magazines.json</code>, or return to the issue page.</p>
        <a href={backHref} className="btn-ink">Back to magazine</a>
      </div>
    );

  return (
    <div className="relative h-full w-full bg-[#3b3836]">
      {status === "loading" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-3 bg-sand text-muted" role="status">
          <Loader2 className="animate-spin" size={22} aria-hidden="true" />Loading the issue
        </div>
      )}
      <iframe src={`${src}#toolbar=1&navpanes=0&view=FitH`} title={title} className="h-full w-full border-0" />
    </div>
  );
}
