"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

// Placeholder data - User to replace later
const certifications = [
  {
    id: "CERT-01",
    title: "Python (Basic)",
    issuer: "HackerRank",
    date: "Aug 2021",
    link: "https://www.hackerrank.com/certificates/43a02e24af20",
    image: "/images/certs/python.jpg",
    color: "cyan",
  },
  {
    id: "CERT-02",
    title: "Introduction to Cloud",
    issuer: "Cognitive Class",
    date: "May 2022",
    link: "https://courses.cognitiveclass.ai/certificates/61d27c39769b442ba7a6cdca7a358003",
    image: "/images/certs/cloud.jpg",
    color: "amber",
  },
  {
    id: "CERT-03",
    title: "Hadoop 101",
    issuer: "Cognitive Class",
    date: "May 2022",
    link: "https://courses.cognitiveclass.ai/certificates/698d8725e4074f5086a4e07875777c7a",
    image: "/images/certs/hadoop.jpg",
    color: "green",
  },
  {
    id: "CERT-04",
    title: "Oracle Cloud Infrastructure Foundations 2021",
    issuer: "Oracle University",
    date: "Feb 2022",
    link: "/docs/oracle.pdf",
    image: "/images/certs/oracle.png",
    color: "rose",
  },

];

const accentMap = {
    cyan: "border-cyan/40 bg-cyan/5 text-cyan hover:border-cyan/80",
    amber: "border-amber/40 bg-amber/5 text-amber hover:border-amber/80",
    rose: "border-rose/40 bg-rose/5 text-rose hover:border-rose/80",
    green: "border-green/40 bg-green/5 text-green hover:border-green/80",
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="relative px-6 py-24 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
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
              {"// CREDENTIAL VALIDATION"}
            </span>
          </div>
          <h2 className="font-mono text-xl md:text-2xl font-bold text-foreground tracking-tight">
            Certifications
          </h2>
        </motion.div>

        {/* Stacked Cards Container */}
        <div className="w-full flex justify-center py-10">
            {/* The group class allows us to detect hover on the container */}
            <div className="group flex flex-col md:flex-row items-center justify-center relative w-full max-w-4xl h-[400px] md:h-[200px]">
                {certifications.map((cert, index) => {
                    const offset = index * 40; // Default overlap offset
                    
                    return (
                        <motion.a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={cert.id}
                            // Initial stacked state
                            initial={{ 
                                x: offset - (certifications.length * 20), // Center the stack roughly
                                marginLeft: -100, // Negative margin creates overlap
                                rotate: index % 2 === 0 ? -2 : 2, // Slight rotation for natural feel
                                zIndex: index 
                            }}
                            // Animate to spread state on hover of the PARENT container (.group)
                            variants={{
                                stacked: { 
                                     x: 0,
                                     marginLeft: -120, // Keep overlapping
                                     rotate: (index % 2 === 0 ? -3 : 3) + index, // Fan out slightly
                                     scale: 0.95
                                },
                                // When container is hovered, spread them out
                                expanded: { 
                                    x: 0,
                                    marginLeft: 20, // Add gap
                                    rotate: 0,
                                    scale: 1,
                                    transition: { type: "spring", stiffness: 200, damping: 20 }
                                }
                            }}
                            
                            className={`
                                relative w-[280px] h-[160px] md:h-[180px] flex-shrink-0
                                rounded-lg border overflow-hidden p-6 flex flex-col justify-between
                                transition-all duration-500 ease-out cursor-pointer group/card
                                ${accentMap[cert.color as keyof typeof accentMap]}
                                
                                /* Default State (Stacked) via CSS transforms to act as backup/base */
                                md:-ml-[140px] first:ml-0
                                
                                /* Hover State (Expanded) */
                                group-hover:!ml-4 group-hover:rotate-0 group-hover:scale-100 group-hover:!translate-x-0
                            `}
                            style={{
                                // Inline styles for the "fan" effect when not hovered
                                transform: `rotate(${(index - 1.5) * 5}deg) translateY(${Math.abs(index - 1.5) * 10}px)`,
                                zIndex: index
                            }}
                        >
                            {/* Background Image Preview */}
                            {cert.image && (
                                <div className="absolute inset-0 z-0">
                                    <img 
                                        src={cert.image} 
                                        alt={`${cert.title} preview`}
                                        className="w-full h-full object-cover opacity-20 group-hover/card:opacity-40 transition-opacity grayscale group-hover/card:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-background/80 group-hover/card:bg-background/40 transition-colors" />
                                </div>
                            )}

                            <div className="relative z-10 flex justify-between items-start">
                                <Award className="h-8 w-8 opacity-80" />
                                <span className="font-mono text-[10px] opacity-60 border border-current px-1 py-0.5 rounded bg-background/50 backdrop-blur-sm">
                                    {cert.date}
                                </span>
                            </div>
                            
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg leading-tight mb-1 line-clamp-2 drop-shadow-md">
                                    {cert.title}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs opacity-70 font-mono">
                                        {cert.issuer}
                                    </span>
                                    <ExternalLink className="h-3 w-3 opacity-0 group-hover/card:opacity-100 transition-opacity" />
                                </div>
                            </div>

                            {/* Hover glow effect per card */}
                            <div className="absolute inset-0 bg-current opacity-0 hover:opacity-5 transition-opacity pointer-events-none z-20" />
                        </motion.a>
                    );
                })}
            </div>
        </div>
        
        <div className="text-center mt-8 md:mt-0">
             <p className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                [ HOVER TO INSPECT CREDENTIALS ]
             </p>
        </div>
      </div>
    </section>
  );
}
