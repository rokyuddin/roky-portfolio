"use client";

import { motion } from "motion/react";
import { TESTIMONIALS_DATA } from "../utils";
import { SectionHeader } from "@/components/organisms/section-header";

export function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-24 border-border border-t transition-colors duration-500">
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeader title="Client Testimonials" number="04" />

        <div className="space-y-12 mt-16">
          {TESTIMONIALS_DATA.slice(0, 4).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="py-2 pl-8 border-primary/20 hover:border-primary/40 border-l-2 transition-colors duration-300"
            >
              <blockquote className="space-y-6">
                <p className="font-light text-foreground/90 text-lg md:text-xl italic leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>

                <footer className="flex items-center gap-4 not-italic">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center flex-shrink-0`}>
                    <span className="font-semibold text-white text-sm">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <cite className="font-medium text-foreground text-sm not-italic">
                      {testimonial.author}
                    </cite>
                    <p className="text-muted-foreground text-sm">
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
