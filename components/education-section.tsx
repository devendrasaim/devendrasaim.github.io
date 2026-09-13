"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/section";

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
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative border-l border-border pl-7 md:pl-10"
                >
                    {/* Marker on the timeline rule */}
                    <div className="absolute left-[-3px] top-2 h-1.5 w-1.5 bg-cyan" aria-hidden="true" />

                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                        <h3 className="font-mono text-lg font-bold text-foreground md:text-xl">{edu.school}</h3>
                        <span className="shrink-0 font-mono text-xs tabular-nums text-faint">{edu.period}</span>
                    </div>

                    <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-mono text-sm text-cyan">{edu.degree}</span>
                        <span className="font-mono text-sm text-faint">{edu.location}</span>
                    </div>

                    <p className="mb-5 max-w-[68ch] font-sans text-[15px] leading-relaxed text-muted-foreground">
                        {edu.description}
                    </p>

                    {edu.courses.length > 0 && (
                         <div className="flex flex-wrap gap-2">
                            {edu.courses.map(course => (
                                <span key={course} className="border border-border/70 px-2.5 py-1 font-mono text-[11px] tracking-wide text-faint">
                                    {course}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
    </Section>
  );
}
