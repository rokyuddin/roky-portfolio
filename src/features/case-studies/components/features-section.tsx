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
    <section className="bg-muted/20 px-6 py-16 border-border border-y">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-8 font-serif text-primary text-3xl text-center">{title}</h2>

          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
            {items?.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Code2;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card hover:shadow-lg hover:shadow-primary/5 p-6 border border-border rounded-lg transition-all duration-300"
                >
                  <Icon className="mb-4 w-10 h-10 text-primary" />
                  <h3 className="mb-2 font-semibold text-foreground text-xl">{feature.name}</h3>
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
