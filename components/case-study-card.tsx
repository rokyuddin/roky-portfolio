"use client";

import { motion } from "motion/react";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/lib/data/case-studies-data";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

export function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300">
        {/* Image */}
        <Link href={`/case-studies/${study.slug}`} className="block">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={study.heroImage}
              alt={study.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block px-3 py-1 bg-primary/90 text-primary-foreground text-xs rounded-full mb-2">
                {study.category}
              </span>
            </div>
          </div>
        </Link>

        {/* Content */}
        <div className="p-6">
          <Link href={`/case-studies/${study.slug}`} className="block mb-4">
            <h2 className="text-2xl font-serif text-primary mb-2 group-hover:translate-x-2 transition-transform duration-300">
              {study.title}
            </h2>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-3">
              {study.subtitle}
            </p>
            <p className="text-muted-foreground leading-relaxed line-clamp-3">
              {study.overview.description}
            </p>
          </Link>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {study.techStack.frontend.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded border border-border"
              >
                {tech}
              </span>
            ))}
            {study.techStack.frontend.length > 3 && (
              <span className="text-xs px-2 py-1 text-muted-foreground">
                +{study.techStack.frontend.length - 3} more
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <Link
              href={`/case-studies/${study.slug}`}
              className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all"
            >
              View Case Study
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={study.overview.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Live Site
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
