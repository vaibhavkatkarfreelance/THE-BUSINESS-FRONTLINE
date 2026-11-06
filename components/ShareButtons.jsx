"use client";

import { useState } from "react";
import { Check, Link2, Mail, Share2 } from "lucide-react";

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  const items = [
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  ];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url);
    }
  };
  const base = "inline-flex items-center gap-2 rounded-sm border border-ink/25 px-3 py-2 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-white";
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Share this article">
      <span className="mr-1 inline-flex items-center gap-2 text-sm font-semibold"><Share2 size={16} aria-hidden="true" />Share</span>
      {items.map((i) => (
        <a key={i.label} href={i.href} target="_blank" rel="noopener noreferrer" className={base} aria-label={`Share on ${i.label}`}>{i.label}</a>
      ))}
      <a href={`mailto:?subject=${t}&body=${u}`} className={base} aria-label="Share by email"><Mail size={16} aria-hidden="true" />Email</a>
      <button type="button" onClick={copy} className={base}>
        {copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
