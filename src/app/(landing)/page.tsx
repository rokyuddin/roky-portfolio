import { Nav } from "@/components/organisms/nav";
import { Hero, TechStack, Projects, Contact, About, Experience, Testimonials } from "@/features/landing";

export default function Portfolio() {
  return (
    <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
      <Nav />
      <Hero />
      <TechStack />
      <Projects />
      <About />
      <Experience />
      <Testimonials />
      <Contact />
    </div>
  );
}
