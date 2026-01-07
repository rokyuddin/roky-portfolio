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
    <section className="bg-muted/20 px-6 py-16 border-border border-y">
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
            {problems?.map((problem, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground">{problem}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
