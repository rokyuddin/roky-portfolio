import type { Metadata } from "next";
import { Github, Linkedin, Mail, MapPin, Smartphone } from "lucide-react";
import { Nav } from "@/components/organisms/nav";
import { SiteFooter } from "@/components/organisms/site-footer";
import { portfolioContext } from "@/lib/data/portfolio-context";
import { SITE_URL, SITE_NAME, socialMetadata } from "@/lib/site";
import { personJsonLd, jsonLd } from "@/lib/schema";

const CONTACT_TITLE = `Contact | ${SITE_NAME}`;
const CONTACT_DESCRIPTION =
  "Contact Md Rokyuddin, a Frontend Developer specializing in React, Next.js, and TypeScript, for freelance projects or full-time roles.";

export const metadata: Metadata = {
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  ...socialMetadata({
    title: CONTACT_TITLE,
    description: CONTACT_DESCRIPTION,
    url: `${SITE_URL}/contact`,
  }),
};

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/rokyuddin", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/rokyuddin", Icon: Linkedin },
];

export default function ContactPage() {
  const { contact } = portfolioContext;

  const cards = [
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      Icon: Mail,
    },
    {
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/[^+\d]/g, "")}`,
      Icon: Smartphone,
    },
    {
      label: "Location",
      value: contact.location,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.location)}`,
      Icon: MapPin,
      external: true,
    },
  ];

  return (
    <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(personJsonLd()) }}
      />
      <Nav />

      {/* Hero */}
      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="bg-clip-text bg-linear-to-r from-primary via-primary/80 to-primary/60 mb-6 font-serif text-transparent text-5xl md:text-6xl">
            Contact
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-xl leading-relaxed">
            Let&apos;s work together. I&apos;m available for remote frontend roles and
            client projects worldwide.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="px-6 py-12">
        <div className="gap-8 grid md:grid-cols-3 mx-auto max-w-4xl">
          {cards.map(({ label, value, href, Icon, external }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-4 p-6 text-center border border-border hover:border-primary transition-colors"
            >
              <Icon className="text-muted-foreground" size={28} />
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                {label}
              </p>
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-muted-foreground hover:text-primary text-sm break-all transition-colors"
              >
                {value}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Email CTA */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 text-muted-foreground">
            Prefer to drop a line directly?
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="inline-block bg-primary hover:bg-primary/90 px-8 py-3.5 font-medium text-primary-foreground transition-colors"
          >
            EMAIL ME
          </a>
        </div>
      </section>

      {/* Socials */}
      <section className="px-6 py-12 border-border border-t">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-6 text-sm text-muted-foreground uppercase tracking-widest">
            Elsewhere
          </p>
          <div className="flex justify-center gap-6">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon size={26} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
