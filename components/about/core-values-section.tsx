"use client";

import { motion } from "motion/react";
import { Award, Target, Users, TrendingUp } from "lucide-react";

const coreValues = [
  {
    icon: Award,
    title: "Quality First",
    description: "Committed to writing clean, maintainable code that stands the test of time. Every line of code is an opportunity to demonstrate craftsmanship."
  },
  {
    icon: Target,
    title: "User-Centric",
    description: "Always putting the end user first. Great UX isn't just about aesthetics—it's about creating intuitive, accessible experiences for everyone."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Strong believer in the power of teamwork. The best solutions emerge when designers, developers, and stakeholders work together."
  },
  {
    icon: TrendingUp,
    title: "Continuous Growth",
    description: "Technology evolves rapidly, and so do I. Constantly learning new tools, techniques, and best practices to stay at the forefront of web development."
  }
];

export function CoreValuesSection() {
  return (
    <section className="py-16 px-6 border-t border-border bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-serif text-primary mb-8">Core Values</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card border border-border p-6 rounded-lg hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <value.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
