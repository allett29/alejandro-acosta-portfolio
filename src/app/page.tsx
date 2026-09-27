import { About } from "@/components/About";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { GithubShowcase } from "@/components/GithubShowcase";
import { AppShell } from "@/components/AppShell";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { SectionPortal } from "@/components/SectionPortal";
import { SkillMatrix } from "@/components/SkillMatrix";
import { SurrealSection } from "@/components/SurrealSection";
import { getGithubProfile } from "@/lib/github";

export default async function Home() {
  const github = await getGithubProfile();

  return (
    <>
      <AnimatedBackground />
      <AppShell>
      <main className="overflow-x-clip overflow-y-visible">
        <Hero />
        <SectionPortal index={0} />
        <SurrealSection index={0}>
          <About />
        </SurrealSection>
        <SectionPortal index={1} />
        <SurrealSection index={1}>
          <SkillMatrix />
        </SurrealSection>
        <SectionPortal index={2} />
        <SurrealSection index={2}>
          <Certifications />
        </SurrealSection>
        <SectionPortal index={3} />
        <SurrealSection index={3}>
          <GithubShowcase data={github} />
        </SurrealSection>
        <SectionPortal index={4} />
        <SurrealSection index={0}>
          <Experience />
        </SurrealSection>
        <SectionPortal index={0} />
        <SurrealSection index={1}>
          <Projects />
        </SurrealSection>
        <SectionPortal index={1} />
        <SurrealSection index={0}>
          <Contact />
        </SurrealSection>
      </main>
      <Footer />
      </AppShell>
    </>
  );
}
