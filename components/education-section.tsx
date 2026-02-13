"use client";

import { motion } from "framer-motion";

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
    <section id="education" className="relative px-6 py-24 border-t border-border/50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
             <div className="h-px flex-1 max-w-[60px] bg-muted-foreground/20" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              {"// KNOWLEDGE BASE"}
            </span>
          </div>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-foreground tracking-tight">
            Education
          </h2>
        </motion.div>

        {/* Timeline/List */}
        <div className="space-y-12">
            {educationData.map((edu, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-8 border-l border-border/50"
                >
                    {/* Timeline Dot */}
                    <div className="absolute left-[-5px] top-0 h-2.5 w-2.5 rounded-full bg-foreground" />
                    
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                        <h3 className="font-mono text-lg font-bold text-foreground">{edu.school}</h3>
                        <span className="font-mono text-xs text-muted-foreground/80">{edu.period}</span>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                        <span className="text-base text-foreground/90">{edu.degree}</span>
                         <span className="text-xs text-muted-foreground font-mono">|  {edu.location}</span>
                    </div>

                    <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
                        {edu.description}
                    </p>

                    {edu.courses.length > 0 && (
                         <div className="flex flex-wrap gap-2">
                            {edu.courses.map(course => (
                                <span key={course} className="text-[10px] font-mono border border-border px-2 py-0.5 text-muted-foreground">
                                    {course}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
