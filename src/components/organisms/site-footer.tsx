"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, Smartphone } from "lucide-react";

/**
 * Persistent footer shown on every public page (landing, blog, case studies,
 * playground, about, contact). Gives content pages (which previously ended
 * with no footer and a dead "Get in Touch" link) a stable way to reach contact
 * and socials. Static/self-contained — no Sanity dependency.
 */
const CONTACT = {
  email: "rokyuddin.dev@gmail.com",
  phone: "+8801611-695544",
  location: "Jashore, Bangladesh",
};

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/rokyuddin", Icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/rokyuddin", Icon: Linkedin },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// Static year — the site is statically prerendered (exported/prerendered at
// build), so `new Date()` is not deterministic and Next.js rejects it. Bump
// this on Jan 1 if it matters (a portfolio rarely needs an auto-updating year).
const CURRENT_YEAR = 2026;

export function SiteFooter() {
  return (
    <footer className="bg-secondary/50 px-6 py-16 border-border border-t transition-colors duration-500">
      <div className="mx-auto max-w-4xl">
        <div className="gap-10 grid md:grid-cols-3">
          {/* Brand + tagline */}
          <div>
            <p className="font-serif text-primary text-xl tracking-tight">
              Md Rokyuddin
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Frontend Developer specializing in React, Next.js & TypeScript.
              Available for remote roles and client projects worldwide.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <p className="mb-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Explore
            </p>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + socials */}
          <div>
            <p className="mb-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">
              Get in touch
            </p>
            <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail size={15} className="shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-primary transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Smartphone size={15} className="shrink-0" />
                <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} className="hover:text-primary transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="shrink-0" />
                <span>{CONTACT.location}</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-xs text-muted-foreground uppercase tracking-widest">
          © {CURRENT_YEAR} Md Rokyuddin. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
