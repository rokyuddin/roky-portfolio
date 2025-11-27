"use client";

import { SectionHeader } from "./section-header";
import { motion } from "motion/react";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Roky is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are top-notch.",
    author: "Jane Doe",
    role: "Product Manager",
    company: "Tech Corp",
  },
  {
    quote: "Working with Roky was a pleasure. He understood our vision perfectly and translated it into a beautiful, functional website.",
    author: "John Smith",
    role: "CEO",
    company: "Startup Inc",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Testimonials" number="04" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-8 rounded-2xl relative"
            >
              <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/10" />
              <p className="text-lg italic text-muted-foreground mb-6 relative z-10">
                &quot;{testimonial.quote}&quot;
              </p>
              <div>
                <h4 className="font-bold text-primary">{testimonial.author}</h4>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
