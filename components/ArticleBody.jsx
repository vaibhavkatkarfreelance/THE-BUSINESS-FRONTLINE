import Image from "next/image";

export default function ArticleBody({ content = [] }) {
  let firstParagraph = true;
  return (
    <div className="font-serif text-[1.2rem] leading-[1.85] text-ink/90 sm:text-[1.3rem]">
      {content.map((block, i) => {
        if (block.type === "heading")
          return <h2 key={i} className="mb-4 mt-12 text-3xl font-medium leading-tight text-ink">{block.text}</h2>;
        if (block.type === "image")
          return (
            <figure key={i} className="my-10">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand">
                <Image src={block.src} alt={block.alt || ""} fill sizes="(min-width: 768px) 700px, 100vw" className="object-cover" />
              </div>
              {block.caption && <figcaption className="mt-3 text-center font-sans text-sm leading-relaxed text-muted">{block.caption}</figcaption>}
            </figure>
          );
        if (block.type === "quote")
          return (
            <blockquote key={i} className="my-10 border-l-4 border-accent bg-sand/70 px-6 py-6 sm:px-8">
              <p className="text-2xl font-medium italic leading-snug text-ink sm:text-[1.75rem]">&ldquo;{block.text}&rdquo;</p>
              {block.cite && <footer className="mt-3 font-sans text-sm font-semibold text-accent">{block.cite}</footer>}
            </blockquote>
          );
        if (block.type !== "paragraph") return null;
        const drop = firstParagraph;
        firstParagraph = false;
        return (
          <p key={i} className={`mb-6 ${drop ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-7xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-accent" : ""}`}>
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
