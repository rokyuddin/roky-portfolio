"use client";

import { motion } from "motion/react";

const timeline = [
  {
    year: "2025 - Present",
    title: "Frontend Developer L2 (Part-time)",
    company: "Soft24",
    description: "Designing custom landing pages and e-commerce features. Leading development of a multi-vendor e-commerce platform with advanced state management."
  },
  {
    year: "2022 - Present",
    title: "Frontend Developer L2",
    company: "Miicon Solutions Limited",
    description: "Building comprehensive ride-sharing platforms with real-time tracking, payment integration, and complex admin dashboards. Collaborating with cross-functional teams to deliver high-impact features."
  },
  {
    year: "2021 - 2022",
    title: "Early Career & Learning",
    company: "Self-Directed",
    description: "Intensive learning period focused on mastering React, Next.js, and modern web development practices. Built numerous personal projects and contributed to open source."
  }
];

export function CareerTimelineSection() {
  return (
    <section className="py-16 px-6 border-t border-border bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-serif text-primary mb-8">Career Journey</h2>
          
          <div className="relative border-l-2 border-primary/30 pl-8 space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <div className="bg-card border border-border p-6 rounded-lg hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="text-sm text-primary font-semibold mb-1">{item.year}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{item.title}</h3>
                  <div className="text-sm text-muted-foreground mb-3">{item.company}</div>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
