"use client";

import { motion } from "motion/react";

interface SolutionSectionProps {
  title: string;
  description: string;
  approach: string[];
}

export function SolutionSection({ title, description, approach }: SolutionSectionProps) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-serif text-primary mb-6">{title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {description}
          </p>
          <ul className="space-y-3">
            {approach.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary mt-1">▸</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
