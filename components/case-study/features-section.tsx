"use client";

import { motion } from "motion/react";
import { Code2, Calendar, CheckCircle2, Layers, Users } from "lucide-react";

interface Feature {
  name: string;
  description: string;
  icon: string;
}

interface FeaturesSectionProps {
  title: string;
  items: Feature[];
}

export function FeaturesSection({ title, items }: FeaturesSectionProps) {
  // Icon mapping defined in client component to avoid serialization issues
  const iconMap: Record<string, any> = {
    MapPin: Code2,
    Calendar: Calendar,
    Receipt: CheckCircle2,
    BarChart: Layers,
    Building: Users,
    User: Users,
    ClipboardList: CheckCircle2,
    Sparkles: Code2,
    Layout: Layers,
    Database: Layers,
    UserCircle: Users,
    BookOpen: CheckCircle2
  };

  return (
    <section className="py-16 px-6 bg-muted/20 border-y border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-serif text-primary mb-8 text-center">{title}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Code2;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border p-6 rounded-lg hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
