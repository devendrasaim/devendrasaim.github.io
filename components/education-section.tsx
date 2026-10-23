"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/section";
import { SlideChips } from "@/components/slide-chips";
import { useScrollFocus } from "@/components/use-scroll-focus";

const educationData = [
  {
    school: "Iowa State University",
    degree: "Master of Science in Computer Science",
    period: "Aug 2023 - Dec 2025",
    location: "Ames, IA",
    description: "Focus on Artificial Intelligence, Machine Learning, and System Architecture. GPA: 3.5/4.0",
    courses: ["Advanced Algorithms", "Deep Learning", "Distributed Systems", "Computer Security"],
  },
  {
    school: "SRM University Amaravati",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    period: "2019 - 2023",
    location: "Amaravati, AP",
    description: "Focus on Software Engineering, Data Structures, and Algorithms. GPA: 7.8/10",
    courses: ["Data Structures and Algorithms", "Object Oriented Programming", "Database Management Systems", "Computer Networks"],
  },
];

export function EducationSection() {
  return (
    <Section id="education" width="default">
        <SectionHeading title="Education" />

        {/* Timeline/List */}
        <div className="space-y-14 md:space-y-20">
            {educationData.map((edu, index) => (
                <EducationItem key={edu.school} edu={edu} index={index} />
            ))}
        </div>
    </Section>
  );
}

/* One degree on the timeline. Entries are short, so the whole entry is one
   glow scope: the school glows neon and the description brightens together
   while the entry is at the middle of the screen. */
function EducationItem({ edu, index }: { edu: (typeof educationData)[number]; index: number }) {
  const [ref, inFocus] = useScrollFocus<HTMLDivElement>();

  return (
    <motion.div
        ref={ref}
        data-focus={inFocus}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="glow-scope relative border-l border-border pl-7 md:pl-10"
    >
        {/* Marker on the timeline rule */}
        <div className="glow-mark absolute left-[-3px] top-2 h-1.5 w-1.5 bg-cyan" aria-hidden="true" />

        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h3 className="glow-neon font-mono text-lg font-bold text-foreground md:text-xl">{edu.school}</h3>
            <span className="shrink-0 font-mono text-xs tabular-nums text-faint">{edu.period}</span>
        </div>

        <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-sm text-cyan">{edu.degree}</span>
            <span className="font-mono text-sm text-faint">{edu.location}</span>
        </div>

        <p className="glow-white mb-5 max-w-[68ch] font-sans text-[15px] leading-relaxed text-muted-foreground">
            {edu.description}
        </p>

        {edu.courses.length > 0 && (
            <SlideChips items={edu.courses} />
        )}
    </motion.div>
  );
}
