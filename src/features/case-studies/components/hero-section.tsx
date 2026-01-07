"use client";

import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Users, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  category: string;
  role: string;
  duration: string;
  team: string;
  liveUrl: string;
  heroImage: string;
}

export function HeroSection({
  title,
  subtitle,
  category,
  role,
  duration,
  team,
  liveUrl,
  heroImage
}: HeroSectionProps) {
  return (
    <section className="px-6 pt-32 pb-16 border-border border-b">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Title */}
          <div className="mb-8">
            <h1 className="bg-clip-text bg-linear-to-r from-primary via-primary/80 to-primary/60 mb-4 font-serif text-transparent text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mb-4 text-muted-foreground text-2xl">{subtitle}</p>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span className="bg-primary/10 px-3 py-1 border border-primary/20 rounded-full text-primary">
                {category}
              </span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="gap-4 grid grid-cols-2 md:grid-cols-4 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-primary" />
              <div>
                <div className="text-muted-foreground">Role</div>
                <div className="font-medium">{role}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <div>
                <div className="text-muted-foreground">Duration</div>
                <div className="font-medium">{duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-primary" />
              <div>
                <div className="text-muted-foreground">Team</div>
                <div className="font-medium">{team}</div>
              </div>
            </div>
            <div>
              <Link
                href={liveUrl}
                target="_blank"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg text-primary-foreground text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Live Site
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        {heroImage && <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative border border-border rounded-lg aspect-video overflow-hidden"
        >
          <Image
            src={heroImage}
            alt={`${title} preview`}
            fill
            className="object-cover"
          />
        </motion.div>}
      </div>
    </section>
  );
}
