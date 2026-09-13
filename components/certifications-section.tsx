"use client";

import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/section";
import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    id: "CERT-01",
    title: "Python",
    issuer: "HackerRank",
    date: "Aug 2021",
    link: "https://www.hackerrank.com/certificates/43a02e24af20",
    image: "/images/certs/python.jpg",
  },
  {
    id: "CERT-02",
    title: "Introduction to Cloud",
    issuer: "Cognitive Class",
    date: "May 2022",
    link: "https://courses.cognitiveclass.ai/certificates/61d27c39769b442ba7a6cdca7a358003",
    image: "/images/certs/cloud.jpg",
  },
  {
    id: "CERT-03",
    title: "Hadoop",
    issuer: "Cognitive Class",
    date: "May 2022",
    link: "https://courses.cognitiveclass.ai/certificates/698d8725e4074f5086a4e07875777c7a",
    image: "/images/certs/hadoop.jpg",
  },
  {
    id: "CERT-04",
    title: "Oracle Cloud Infrastructure Foundations 2021",
    issuer: "Oracle University",
    date: "Feb 2022",
    link: "/docs/oracle.pdf",
    image: "/images/certs/oracle.png",
  },
  {
    id: "CERT-05",
    title: "Prompt Design in Vertex AI",
    issuer: "Google Cloud",
    date: "Feb 19, 2026",
    link: "https://www.credly.com/badges/cf2ac668-e79e-4297-8bfe-a9636da3d68d",
    image: "/images/certs/Prompt Design in Vertex AI Google Cloud.png",
  },
];

/* The trailing row has to fill exactly. Left alone, five cards in a three
   column grid leave a dead cell in the corner, which reads as an accident
   rather than a composition. Widening the last card closes the row, and doing
   it arithmetically means the grid stays whole as the list grows. */
function trailingSpan(index: number, total: number) {
    if (index !== total - 1) return "";

    const spans: string[] = [];
    if (total % 2 === 1) spans.push("sm:col-span-2");
    if (total % 3 === 2) spans.push("lg:col-span-2");
    if (total % 3 === 1) spans.push("lg:col-span-3");
    return spans.join(" ");
}

export function CertificationsSection() {
  return (
    <Section id="certifications" width="wide">
        <SectionHeading title="Certifications" />

        {/* Grid Cards Container */}
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => (
                <motion.a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -3 }}
                    className={`
                        relative h-[176px] w-full ${trailingSpan(index, certifications.length)}
                        overflow-hidden border border-border bg-surface p-6 flex flex-col justify-between
                        transition-colors duration-300 ease-out group/card
                        text-foreground hover:border-cyan/60
                    `}
                >
                    {/* Certificate preview, held to the outer corner. Decorative:
                        the link already names the certificate. */}
                    {cert.image && (
                        <div aria-hidden="true" className="absolute inset-0 z-0">
                            {/* Masking, sizing and the reveal transition live in
                                the .cert-preview class; opacity and colour are
                                the Tailwind hover pair. */}
                            <img
                                src={cert.image}
                                alt=""
                                loading="lazy"
                                className="cert-preview h-full w-full object-cover opacity-[0.18] grayscale group-hover/card:opacity-[0.42] group-hover/card:grayscale-0"
                            />
                            {/* Graded scrim rather than a flat wash, so the type sits on
                                near-solid surface at rest. It lifts on hover to let the
                                document through, but never fully: the title still has to
                                be readable over it. */}
                            <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface/90 to-surface/40 transition-opacity duration-500 ease-out group-hover/card:opacity-[0.45]" />
                        </div>
                    )}

                    <div className="relative z-10 flex justify-between items-start">
                        <Award className="h-6 w-6 text-faint transition-colors duration-300 group-hover/card:text-cyan" />
                        <span className="border border-border bg-background/70 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur-sm">
                            {cert.date}
                        </span>
                    </div>
                    
                    <div className="relative z-10">
                        <h3 className="mb-1 line-clamp-2 font-mono text-base font-bold leading-snug text-foreground">
                            {cert.title}
                        </h3>
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-muted-foreground">
                                {cert.issuer}
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 text-cyan opacity-0 transition-opacity group-hover/card:opacity-100" />
                        </div>
                    </div>

                </motion.a>
            ))}
        </div>
    </Section>
  );
}
