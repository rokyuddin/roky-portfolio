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
    <section className="pt-32 pb-16 px-6 border-b border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back Button */}
          <Link 
            href="/#projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-serif mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-2xl text-muted-foreground mb-4">{subtitle}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                {category}
              </span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Live Site
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-video rounded-lg overflow-hidden border border-border"
        >
          <Image
            src={heroImage}
            alt={`${title} preview`}
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
