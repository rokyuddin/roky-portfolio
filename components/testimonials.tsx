"use client";

import { SectionHeader } from "./section-header";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/lib/data/testimonials-data";
import { StarRating } from "./ui/star-rating";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 border-t border-border transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Client Testimonials" number="04" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border p-6 rounded-lg relative hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
              {/* Avatar */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">
                    {testimonial.initials}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground truncate">
                    {testimonial.author}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-primary font-medium truncate">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-3">
                <StarRating rating={testimonial.rating} size={14} />
              </div>

              {/* Quote */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 relative z-10">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Date */}
              <p className="text-xs text-muted-foreground/60">
                {testimonial.date}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
