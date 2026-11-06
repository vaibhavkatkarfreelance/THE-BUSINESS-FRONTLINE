import { Clock, Mail, MapPin, Phone, MessageSquare, Award, Sparkles, Building2 } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/data";

export const metadata = buildMetadata({
  title: "Contact Us | The Business Frontline",
  description: "Connect with The Business Frontline editorial bureau, submit executive cover nominations, or request advertising and media kits.",
  path: "/contact",
});

const inquiryCards = [
  {
    icon: MessageSquare,
    title: "Editorial Submissions",
    email: "editorial@thebusinessfrontline.com",
    desc: "Submit story ideas, executive essays, bylines, and research briefs for editorial review.",
  },
  {
    icon: Award,
    title: "Cover Feature Nominations",
    email: "nominations@thebusinessfrontline.com",
    desc: "Nominate outstanding CEOs, CIOs, and visionary founders for upcoming flagship editions.",
  },
  {
    icon: Sparkles,
    title: "Media Kit & Advertising",
    email: "partnerships@thebusinessfrontline.com",
    desc: "Request our 2026 media kit, sponsored sectoral reports, and C-suite event partnerships.",
  },
  {
    icon: Building2,
    title: "Reprints & Licensing",
    email: "licensing@thebusinessfrontline.com",
    desc: "Inquire regarding digital quote reprints, award badge usage, and custom enterprise licensing.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b border-sand-deep bg-gradient-to-b from-sand to-paper pt-14 pb-12">
        <div className="wrap max-w-4xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent">
            Corporate & Editorial Inquiries
          </span>
          <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-ink sm:text-6xl">
            Connect With Our Bureau
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Whether pitching an exclusive executive story, nominating an industry pioneer, or exploring strategic media partnerships, our editors look forward to connecting.
          </p>
        </div>
      </section>

      {/* 4 Inquiry Cards */}
      <section className="wrap -mt-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {inquiryCards.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="rounded-sm border border-sand-deep bg-white p-6 shadow-sm transition-all hover:border-accent/40 hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent/20 text-accent mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-serif text-lg font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{c.desc}</p>
                <a href={`mailto:${c.email}`} className="mt-4 inline-block text-xs font-semibold text-accent hover:underline">
                  {c.email}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Form + Bureau Info */}
      <section className="wrap grid gap-14 py-16 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Headquarters</span>
          <h2 className="mt-1 font-serif text-3xl font-bold text-ink sm:text-4xl">
            Executive Editorial Office
          </h2>
          <p className="mt-3 text-base text-muted leading-relaxed">
            Our international editorial team works with senior leadership across North America, Europe, and Asia-Pacific.
          </p>

          <ul className="mt-8 space-y-6">
            <li className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-sand border border-sand-deep text-accent">
                <MapPin size={18} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink/75">Global Headquarters</p>
                <p className="mt-0.5 text-sm font-medium text-ink">{SITE.address}</p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-sand border border-sand-deep text-accent">
                <Mail size={18} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink/75">Primary Correspondence</p>
                <a href={`mailto:${SITE.email}`} className="mt-0.5 text-sm font-semibold text-accent hover:underline">
                  {SITE.email}
                </a>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-sand border border-sand-deep text-accent">
                <Phone size={18} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink/75">Direct Media Line</p>
                <p className="mt-0.5 text-sm font-medium text-ink">{SITE.phone || "+1 (212) 555-0198"}</p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-sand border border-sand-deep text-accent">
                <Clock size={18} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink/75">Bureau Operating Hours</p>
                <p className="mt-0.5 text-sm font-medium text-ink">Monday – Friday, 8:30 AM – 6:00 PM EST</p>
              </div>
            </li>
          </ul>

          <div className="mt-10 rounded-sm border border-sand-deep bg-sand/70 p-6">
            <h4 className="font-serif text-lg font-bold text-ink">Press & Media Inquiries</h4>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Journalists seeking commentary from The Business Frontline editorial directors or interview requests can reach our communications desk directly at <strong className="text-ink">press@thebusinessfrontline.com</strong>.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-sm border border-sand-deep bg-white p-7 sm:p-10 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Direct Transmission</span>
          <h2 className="mt-1 mb-6 font-serif text-3xl font-bold text-ink">
            Submit Your Inquiry
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
