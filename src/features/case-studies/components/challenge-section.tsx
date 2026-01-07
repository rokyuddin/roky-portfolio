"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface ChallengeSectionProps {
  title: string;
  description: string;
  problems: string[];
}

export function ChallengeSection({ title, description, problems }: ChallengeSectionProps) {
  return (
    <section className="py-16 px-6 bg-muted/20 border-y border-border">
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
            {problems.map((problem, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{problem}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
