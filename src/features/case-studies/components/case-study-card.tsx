"use client";

import { motion } from "motion/react";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CaseStudy } from "../types";
import { urlFor } from "@/sanity/lib/image";

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
              src={urlFor(study.heroImage).url()}
              alt={study.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
            <div className="right-4 bottom-4 left-4 absolute">
              <span className="inline-block bg-primary/90 mb-2 px-3 py-1 rounded-full text-primary-foreground text-xs">
                {study.category}
              </span>
            </div>
          </div>
        </Link>

        {/* Content */}
        <div className="p-6">
          <Link href={`/case-studies/${study.slug}`} className="block mb-4">
            <h2 className="mb-2 font-serif text-primary text-2xl transition-transform group-hover:translate-x-2 duration-300">
              {study.title}
            </h2>
            <p className="mb-3 text-muted-foreground text-sm uppercase tracking-wider">
              {study.subtitle}
            </p>
            <p className="text-muted-foreground line-clamp-3 leading-relaxed">
              {study.overview.description}
            </p>
          </Link>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {study.techStack.frontend.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="bg-secondary px-2 py-1 border border-border rounded text-secondary-foreground text-xs"
              >
                {tech}
              </span>
            ))}
            {study.techStack.frontend.length > 3 && (
              <span className="px-2 py-1 text-muted-foreground text-xs">
                +{study.techStack.frontend.length - 3} more
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="flex justify-between items-center">
            <Link
              href={`/case-studies/${study.slug}`}
              className="inline-flex items-center gap-2 group-hover:gap-3 font-medium text-primary transition-all"
            >
              View Case Study
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={study.overview.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary text-sm transition-colors"
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
