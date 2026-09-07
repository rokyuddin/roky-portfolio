import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/organisms/nav";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SITE_URL, socialMetadata } from "@/lib/site";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  jsonLd,
  serviceJsonLd,
} from "@/lib/schema";

const SERVICES_META_TITLE = "Custom Ecommerce Development Services | Md Rokyuddin";
const SERVICES_DESCRIPTION =
  "Custom ecommerce development services: storefronts, headless frontends, checkout, and AI automation built with Next.js and React. No Shopify or WordPress templates.";

const FAQS = [
  {
    question: "How much does custom ecommerce development cost?",
    answer:
      "It depends on scope: number of features, integrations (payments, shipping, inventory), and whether AI automation is part of the build. After a short discovery call I quote a fixed price per phase, so you know the cost before any code is written.",
  },
  {
    question: "Do you build on Shopify or WordPress?",
    answer:
      "No. I build custom codebases with Next.js, React, and TypeScript — no Shopify themes or WordPress templates. That means full control over performance, SEO, and the checkout experience, and no platform plugin lock-in.",
  },
  {
    question: "How long does a custom ecommerce build take?",
    answer:
      "A focused storefront with checkout typically ships in 4–8 weeks. Larger builds with custom order workflows or AI automation run longer. I work in phases so you see progress early and can launch an MVP before the full scope is done.",
  },
  {
    question: "Do you work with clients outside Bangladesh?",
    answer:
      "Yes. I'm based in Dhaka, Bangladesh and work with clients worldwide. I'm comfortable overlapping with US, EU, and APAC time zones for calls and async collaboration.",
  },
];

const WHAT_I_BUILD = [
  {
    title: "Custom Ecommerce Storefronts",
    description:
      "Fully custom storefronts built from scratch with Next.js, React, and TypeScript. Product pages, collections, search, and content — designed around your catalog, not a theme's constraints.",
  },
  {
    title: "Headless Ecommerce Frontends",
    description:
      "Fast, SEO-friendly frontends for headless commerce platforms. I keep your commerce backend and replace the slow, generic theme with a React frontend you actually own.",
  },
  {
    title: "Checkout and Payment Integration",
    description:
      "Stripe and local payment gateways wired into a checkout flow you control: custom fields, order summaries, and post-purchase flows without fighting a page builder.",
  },
  {
    title: "AI Automation for Ecommerce Operations",
    description:
      "AI automation services that cut repetitive ecommerce work: generating product content at scale, routing and summarizing orders, and triaging customer support tickets before they reach a human.",
  },
];

const HOW_I_WORK = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We map your catalog, workflows, and goals, then agree on scope. You learn what a custom build will and won't do for you before committing.",
  },
  {
    step: "02",
    title: "Architecture",
    description:
      "I design the data model, integrations, and rendering strategy. Decisions about caching, SEO, and checkout flow are made on paper, not mid-build.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Short, visible iterations. You review a working preview each week — not a big reveal at the end.",
  },
  {
    step: "04",
    title: "Launch",
    description:
      "Performance budgets, analytics, structured data, and redirects are handled before go-live so the launch is boring in the best way.",
  },
  {
    step: "05",
    title: "Support",
    description:
      "After launch I stay available for fixes, iterations, and expanding the AI automation as your operations grow.",
  },
];

export const metadata: Metadata = {
  title: { absolute: SERVICES_META_TITLE },
  description: SERVICES_DESCRIPTION,
  ...socialMetadata({
    title: SERVICES_META_TITLE,
    description: SERVICES_DESCRIPTION,
    url: `${SITE_URL}/services`,
  }),
};

export default function ServicesPage() {
  return (
    <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceJsonLd({
          name: "Custom Ecommerce Development Services",
          url: `${SITE_URL}/services`,
          description: SERVICES_DESCRIPTION,
          serviceType: "Ecommerce Development",
          areaServed: "Bangladesh and worldwide (remote)",
        })) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Services", url: `${SITE_URL}/services` },
        ])) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageJsonLd(FAQS)) }}
      />
      <Nav />

      {/* Hero */}
      <section className="px-6 pt-32 pb-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="bg-clip-text bg-linear-to-r from-primary via-primary/80 to-primary/60 mb-6 font-serif text-transparent text-5xl md:text-6xl">
            Custom Ecommerce Development Services
          </h1>
          <p className="max-w-3xl text-muted-foreground text-xl leading-relaxed">
            I build custom ecommerce platforms with Next.js, React, and
            TypeScript — written for your business, not assembled from a
            Shopify theme or a WordPress template. Based in Dhaka, Bangladesh,
            working with clients worldwide.
          </p>
        </div>
      </section>

      {/* Positioning */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-foreground/90 text-[15px] leading-loose md:text-lg">
            Template platforms get stores online fast, and for some businesses
            that is the right call. But if your catalog, checkout, or
            operations have outgrown what a theme can express, the template
            becomes the ceiling. My custom ecommerce development services take
            the opposite path: a codebase you own, tuned for speed, SEO, and
            the exact workflows your team runs on. You get the same control
            over the frontend that the platform gives you over nothing.
          </p>
        </div>
      </section>

      {/* What I build */}
      <section className="px-6 py-12 border-border border-t">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-serif text-primary text-3xl tracking-tight">
            What I Build
          </h2>
          <div className="gap-6 grid md:grid-cols-2">
            {WHAT_I_BUILD.map(({ title, description }) => (
              <div
                key={title}
                className="p-6 border border-border hover:border-primary transition-colors"
              >
                <h3 className="mb-2 font-medium text-primary">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="px-6 py-12 border-border border-t">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-serif text-primary text-3xl tracking-tight">
            How I Work
          </h2>
          <div className="space-y-8">
            {HOW_I_WORK.map(({ step, title, description }) => (
              <div key={step} className="flex gap-6">
                <span className="shrink-0 pt-0.5 font-mono text-muted-foreground text-sm tracking-widest">
                  {step}
                </span>
                <div>
                  <h3 className="mb-2 font-medium text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why custom over templates */}
      <section className="px-6 py-12 border-border border-t">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-serif text-primary text-3xl tracking-tight">
            Why Custom Over Templates
          </h2>
          <div className="gap-6 grid md:grid-cols-2">
            <div className="p-6 border border-border">
              <h3 className="mb-3 font-medium text-foreground">Templates</h3>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li>Fast to start, but shaped by the theme&apos;s limits</li>
                <li>Every customization fights the platform&apos;s abstractions</li>
                <li>Plugin and app fees pile up monthly</li>
                <li>Performance and SEO ceilings set by someone else&apos;s code</li>
              </ul>
            </div>
            <div className="p-6 border border-primary/40">
              <h3 className="mb-3 font-medium text-primary">Custom Builds</h3>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li>Code you own, structured around your business logic</li>
                <li>Checkout, search, and content behave exactly as designed</li>
                <li>No per-feature app fees; hosting costs stay predictable</li>
                <li>Core Web Vitals and SEO are engineered in from day one</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            To be honest: templates win when the requirement is a standard
            store this month with no developer on hand. Custom wins when the
            store is core to the business and needs to compound over years.
            If you are unsure which side you are on, the discovery call will
            tell you — even if the answer is &quot;keep Shopify.&quot;
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-12 border-border border-t">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-serif text-primary text-3xl tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {FAQS.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="mb-2 font-medium text-foreground">{question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 border-border border-t">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-serif text-primary text-3xl tracking-tight">
            Have a store to build?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground leading-relaxed">
            Tell me about your catalog and where the current setup hurts. I
            take on a small number of custom ecommerce builds at a time, for
            clients in Bangladesh and worldwide.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary hover:bg-primary/90 px-8 py-3.5 font-medium text-primary-foreground transition-colors"
          >
            CONTACT ME
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
