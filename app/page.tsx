import { ClientShell } from "@/components/client-shell";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SystemFooter } from "@/components/system-footer";
import { NavBar } from "@/components/nav-bar";
import { AboutSection } from "@/components/about-section";
// import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { EducationSection } from "@/components/education-section";
import { CertificationsSection } from "@/components/certifications-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <ClientShell>
      <main className="relative min-h-screen bg-background text-foreground">
        <NavBar />
        <HeroSection />
        <AboutSection />
        {/* <ExperienceSection /> */}
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
        <SystemFooter />
      </main>
    </ClientShell>
  );
}
