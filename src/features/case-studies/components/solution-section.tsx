"use client";

import { motion } from "motion/react";

interface SolutionSectionProps {
  title: string;
  description: string;
  approach: string[];
}

export function SolutionSection({ title, description, approach }: SolutionSectionProps) {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 font-serif text-primary text-3xl">{title}</h2>
          <p className="mb-6 text-muted-foreground text-lg leading-relaxed">
            {description}
          </p>
          <ul className="space-y-3">
            {approach?.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1 text-primary">▸</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
