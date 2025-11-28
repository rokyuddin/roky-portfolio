"use client";

import { motion } from "motion/react";
import { Zap, User, Briefcase } from "lucide-react";

const approaches = [
  {
    icon: Zap,
    title: "Problem-Solving Mindset",
    description: "I don't just write code—I solve problems. Every project starts with understanding the core challenge, exploring potential solutions, and choosing the approach that best balances user needs, technical constraints, and business goals."
  },
  {
    icon: User,
    title: "User-First Development",
    description: "Great interfaces are invisible. I focus on creating experiences that feel natural and intuitive, ensuring accessibility, performance, and responsiveness are built in from the start, not added as afterthoughts."
  },
  {
    icon: Briefcase,
    title: "Collaborative Excellence",
    description: "The best work happens when everyone's expertise is valued. I actively engage with designers to understand their vision, work closely with backend teams to ensure seamless integration, and communicate clearly with stakeholders to align on goals."
  }
];

export function ApproachSection() {
  return (
    <section className="py-16 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-serif text-primary mb-8">My Approach</h2>
          
          <div className="space-y-6">
            {approaches.map((approach, index) => (
              <div key={index} className="bg-card border border-border p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                  <approach.icon className="w-5 h-5 text-primary" />
                  {approach.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {approach.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
