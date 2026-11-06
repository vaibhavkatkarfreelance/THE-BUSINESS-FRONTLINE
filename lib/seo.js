import { SITE } from "./data";

export function buildMetadata({ title, description, path = "/", image = "/og-default.svg", imageAlt, type = "website", absoluteTitle = false }) {
  const t = absoluteTitle ? { absolute: title } : title;
  return {
    title: t,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: absoluteTitle ? title : `${title} | ${SITE.name}`,
      description,
      url: path,
      siteName: SITE.name,
      type,
      locale: "en_GB",
      images: [{ url: image, alt: imageAlt || title }],
    },
    twitter: { card: "summary_large_image", title: absoluteTitle ? title : `${title} | ${SITE.name}`, description, images: [image] },
  };
}
