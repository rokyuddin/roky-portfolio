import { Nav } from "@/components/organisms/nav";
import { Hero, TechStack, Projects, Contact, About, Experience, Testimonials } from "@/features/landing";
import { client } from "@/sanity/lib/client";
import { profileQuery, skillsQuery, experienceQuery, projectsQuery, testimonialsQuery } from "@/sanity/lib/queries";

export default async function Portfolio() {
  "use cache"
  const [profile, skills, experience, projects, testimonials] = await Promise.all([
    client.fetch(profileQuery),
    client.fetch(skillsQuery),
    client.fetch(experienceQuery),
    client.fetch(projectsQuery),
    client.fetch(testimonialsQuery),
  ]);

  return (
    <div className="bg-background selection:bg-primary min-h-screen font-sans text-foreground selection:text-primary-foreground transition-colors duration-500">
      <Nav />
      <Hero profile={profile} />
      <TechStack skills={skills} />
      <Projects projects={projects} />
      <About profile={profile} />
      <Experience experience={experience} />
      {testimonials?.length > 0 && <Testimonials testimonials={testimonials} />}
      <Contact profile={profile} />
    </div>
  );
}
