import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE, getLatestMagazine } from "@/lib/data";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}: ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: { siteName: SITE.name, type: "website", locale: "en_US", title: SITE.name, description: SITE.description, images: [{ url: "/og-default.svg", alt: "Cover of The Business Frontline" }] },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#0b132b" };

export default function RootLayout({ children }) {
  const latest = getLatestMagazine();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only z-50 bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        <Header latestSlug={latest.slug} />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
