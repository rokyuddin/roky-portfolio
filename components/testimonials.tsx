"use client";

import { SectionHeader } from "./section-header";
import { motion } from "motion/react";
import { TESTIMONIALS_DATA } from "@/lib/data/testimonials-data";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 border-t border-border transition-colors duration-500">
      <div className="max-w-4xl mx-auto w-full">
        <SectionHeader title="Client Testimonials" number="04" />
        
        <div className="mt-16 space-y-12">
          {TESTIMONIALS_DATA.slice(0, 4).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-l-2 border-primary/20 pl-8 py-2 hover:border-primary/40 transition-colors duration-300"
            >
              <blockquote className="space-y-6">
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-light italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                
                <footer className="flex items-center gap-4 not-italic">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-semibold text-sm">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <cite className="text-sm font-medium text-foreground not-italic">
                      {testimonial.author}
                    </cite>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
