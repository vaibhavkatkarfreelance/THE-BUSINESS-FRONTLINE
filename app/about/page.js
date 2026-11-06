import Link from "next/link";
import Image from "next/image";
import { Award, Globe2, ShieldCheck, Target, Users, BookOpen, Building2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE, getTeam } from "@/lib/data";

export const metadata = buildMetadata({
  title: "About Us | The Business Frontline",
  description: "The Business Frontline is an international executive publication dedicated to spotlighting visionary leaders, corporate strategy, enterprise AI, and global finance.",
  path: "/about",
});

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To spotlight world-class business visionaries and equip executive decision-makers with rigorous, actionable intelligence that accelerates corporate innovation, sustainable value creation, and ethical governance.",
  },
  {
    icon: Globe2,
    title: "Our Vision",
    text: "To stand as the most authoritative global media platform for boardroom leaders, decoding high-stakes industrial transformations and inspiring the next generation of C-suite executives across 65+ countries.",
  },
];

const principles = [
  ["Investigative Rigor", "Every feature begins with direct access to decision-makers, verified operational data, and peer-reviewed industry benchmarks."],
  ["Editorial Independence", "Our commentary and company evaluations are fiercely independent, free from commercial influence or vendor bias."],
  ["Designed for the C-Suite", "Actionable executive takeaways, generous visual breathing room, and zero sensationalist clickbait."],
  ["Global Multipolar Perspective", "We report from financial and technological epicenters across North America, Europe, Asia, and the Middle East."],
];

const bureaus = [
  { city: "New York", desc: "Global Headquarters & Americas Financial Bureau", address: "750 Lexington Ave, 24th Fl, NY" },
  { city: "London", desc: "European Markets & ESG Policy Center", address: "14 Fleet Lane, London EC4M" },
  { city: "Singapore", desc: "Asia-Pacific Tech & Logistics Hub", address: "One Raffles Place, Tower 2" },
  { city: "Dubai", desc: "Middle East & Sovereign Capital Bureau", address: "DIFC Gate Precinct 4" },
];

export default function AboutPage() {
  const team = getTeam();

  return (
    <>
      {/* Masthead */}
      <section className="border-b border-sand-deep bg-gradient-to-b from-sand to-paper pt-16 pb-14">
        <div className="wrap">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">
            The Frontline Narrative
          </span>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl font-bold leading-[1.06] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Spotlighting the Minds Driving Modern Commerce.
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-14">
            <p className="font-serif text-xl leading-relaxed text-ink/90 sm:text-2xl">
              <strong>{SITE.name}</strong> was founded on a singular conviction: that in an era of 280-character noise, senior decision-makers require deep, analytical, and forward-looking executive journalism.
            </p>
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Today, our monthly and quarterly digital editions reach over 250,000 board directors, chief executives, institutional investors, and enterprise innovators worldwide. We go beyond the press release to uncover the strategic decisions and leadership principles that define market leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section aria-label="Mission and vision" className="wrap py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="rounded-sm border border-sand-deep bg-sand/60 p-8 shadow-sm transition-all hover:border-accent/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent/20 text-accent">
                    <Icon size={22} />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-ink">{p.title}</h2>
                </div>
                <p className="mt-4 text-base leading-relaxed text-ink/80">{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Editorial Principles */}
      <section aria-labelledby="principles-title" className="border-y border-sand-deep bg-sand/40 py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Standards of Excellence</span>
            <h2 id="principles-title" className="mt-1 font-serif text-3xl font-bold leading-tight sm:text-4xl text-ink">
              Our Editorial Charter
            </h2>
            <p className="mt-4 text-base text-muted leading-relaxed">
              Every profile, sectoral report, and digital edition is produced under four unyielding editorial standards.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="btn-accent text-xs font-bold uppercase tracking-wider !py-3 !px-6">
                Submit an Editorial Pitch
              </Link>
            </div>
          </div>
          <dl className="divide-y divide-sand-deep border-y border-sand-deep">
            {principles.map(([t, d]) => (
              <div key={t} className="grid gap-2 py-6 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="font-serif text-xl font-bold text-ink">{t}</dt>
                <dd className="text-sm leading-relaxed text-muted sm:text-base">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Editorial Board & Leadership Team */}
      <section aria-labelledby="team-title" className="wrap py-24">
        <div className="border-b border-sand-deep pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Masthead & Leadership</span>
          <h2 id="team-title" className="mt-1 font-serif text-3xl font-bold sm:text-4xl text-ink">
            Editorial Board & Directors
          </h2>
          <p className="mt-2 text-base text-muted">
            The journalists, sector specialists, and design directors behind The Business Frontline.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((t) => (
            <li key={t.id} className="flex flex-col rounded-sm border border-sand-deep bg-white p-6 shadow-sm transition-all hover:border-accent/40 hover:shadow-md">
              <div className="relative aspect-square overflow-hidden rounded-sm bg-sand">
                <Image
                  src={t.avatar}
                  alt={`Portrait of ${t.name}, ${t.role}`}
                  fill
                  sizes="(min-width:1024px) 340px, (min-width:640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-5 font-serif text-xl font-bold text-ink">{t.name}</h3>
              <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-accent">{t.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted flex-1">{t.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Global Bureau Hubs */}
      <section aria-labelledby="bureaus-title" className="border-t border-sand-deep bg-sand/60 py-20">
        <div className="wrap">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">International Presence</span>
            <h2 id="bureaus-title" className="mt-1 font-serif text-3xl font-bold text-ink sm:text-4xl">
              Global Editorial Bureaus
            </h2>
            <p className="mt-2 text-sm text-muted">Operating hubs strategically situated in major commercial and policy centers.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bureaus.map((b) => (
              <div key={b.city} className="rounded-sm border border-sand-deep bg-white p-6 shadow-sm">
                <Building2 size={24} className="text-accent mb-3" />
                <h3 className="font-serif text-xl font-bold text-ink">{b.city}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-accent-dark">{b.desc}</p>
                <p className="mt-3 text-xs text-muted">{b.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-ink py-16 text-center text-white">
        <div className="wrap">
          <h2 className="font-serif text-3xl font-bold sm:text-5xl">Read the Current Edition Online</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
            Access our complete digital issue library free of charge. No paywalls or registration barriers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/magazine" className="btn-accent text-xs font-bold uppercase tracking-wider py-3.5 px-7">
              Browse Digital Magazines
            </Link>
            <Link href="/contact" className="btn-outline text-xs font-bold uppercase tracking-wider py-3.5 px-7 text-white border-white/40 hover:bg-white hover:text-ink">
              Contact Editorial Office
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
