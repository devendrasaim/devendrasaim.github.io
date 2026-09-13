"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/section";
import { Mail, Github, Linkedin, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { sendEmail } from "@/app/actions";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("subject", data.subject);
    formData.append("message", data.message);

    try {
      const result = await sendEmail(null, formData);

      if (result.success) {
        toast.success("Message sent", {
          description: result.message,
          icon: <CheckCircle2 className="h-4 w-4 text-green" />,
        });
        reset();
      } else {
        toast.error("Message not sent", {
          description: "Please check your inputs and try again.",
          icon: <AlertCircle className="h-4 w-4 text-destructive" />,
        });
      }
    } catch (error) {
      toast.error("Message not sent", {
        description: "Something went wrong on my end. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" width="wide">
        <SectionHeading
          title="Get in touch"
          lede="Send a message and I will get back to you."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
            {/* Form */}
            <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                             <label htmlFor="name" className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                NAME
                            </label>
                            <input
                                {...register("name")}
                                id="name"
                                type="text"
                                autoComplete="name"
                                aria-invalid={errors.name ? "true" : undefined}
                                aria-describedby={errors.name ? "name-error" : undefined}
                                className="w-full border border-border bg-background/60 px-4 py-3 font-mono text-[15px] text-foreground transition-colors placeholder:text-faint/80 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                                placeholder="Your name"
                            />
                            {errors.name && (
                                <p id="name-error" role="alert" className="mt-1 font-mono text-xs text-destructive">{errors.name.message}</p>
                            )}
                        </div>
                         <div className="space-y-2">
                             <label htmlFor="email" className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                                EMAIL
                            </label>
                            <input
                                {...register("email")}
                                id="email"
                                type="email"
                                autoComplete="email"
                                aria-invalid={errors.email ? "true" : undefined}
                                aria-describedby={errors.email ? "email-error" : undefined}
                                className="w-full border border-border bg-background/60 px-4 py-3 font-mono text-[15px] text-foreground transition-colors placeholder:text-faint/80 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p id="email-error" role="alert" className="mt-1 font-mono text-xs text-destructive">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="subject" className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            SUBJECT
                        </label>
                        <input
                            {...register("subject")}
                                id="subject"
                                type="text"
                                autoComplete="off"
                                aria-invalid={errors.subject ? "true" : undefined}
                                aria-describedby={errors.subject ? "subject-error" : undefined}
                            className="w-full border border-border bg-background/60 px-4 py-3 font-mono text-[15px] text-foreground transition-colors placeholder:text-faint/80 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan"
                            placeholder="What is this about?"
                        />
                         {errors.subject && (
                            <p id="subject-error" role="alert" className="mt-1 font-mono text-xs text-destructive">{errors.subject.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            MESSAGE
                        </label>
                        <textarea
                            {...register("message")}
                                id="message"
                                autoComplete="off"
                                aria-invalid={errors.message ? "true" : undefined}
                                aria-describedby={errors.message ? "message-error" : undefined}
                            className="w-full border border-border bg-background/60 px-4 py-3 font-mono text-[15px] text-foreground transition-colors placeholder:text-faint/80 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan min-h-[150px] resize-y"
                            placeholder="Your message"
                        />
                        {errors.message && (
                            <p id="message-error" role="alert" className="mt-1 font-mono text-xs text-destructive">{errors.message.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group inline-flex w-full items-center justify-center gap-3 border border-foreground bg-foreground px-8 py-4 font-mono text-sm uppercase tracking-[0.14em] text-background transition-colors hover:bg-transparent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-foreground disabled:hover:text-background"
                    >
                        {isSubmitting ? (
                             <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Sending...</span>
                             </>
                        ) : (
                             <>
                                <span>Send message</span>
                                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                             </>
                        )}
                    </button>
                </form>
            </motion.div>

             {/* Sidebar Info */}
             <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-12 lg:pt-8"
             >
                <div className="space-y-6">
                    <h3 className="mb-6 font-mono text-base font-bold text-foreground">
                        Direct links
                    </h3>
                    
                     <a href="mailto:mdevendrasai9@gmail.com" className="flex items-start gap-4 group">
                        <div className="border border-border bg-surface p-3 transition-colors group-hover:border-cyan/60">
                            <Mail className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-cyan" />
                        </div>
                        <div>
                             <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-faint">EMAIL</span>
                             <span className="font-mono text-sm text-foreground transition-colors group-hover:text-cyan">mdevendrasai9@gmail.com</span>
                        </div>
                    </a>

                    <a href="https://github.com/devendrasaim" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                         <div className="border border-border bg-surface p-3 transition-colors group-hover:border-cyan/60">
                            <Github className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-cyan" />
                        </div>
                        <div>
                             <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-faint">GITHUB</span>
                             <span className="font-mono text-sm text-foreground transition-colors group-hover:text-cyan">github.com/devendrasaim</span>
                        </div>
                    </a>

                    <a href="https://www.linkedin.com/in/devendrasaim/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                         <div className="border border-border bg-surface p-3 transition-colors group-hover:border-cyan/60">
                            <Linkedin className="h-[18px] w-[18px] text-muted-foreground transition-colors group-hover:text-cyan" />
                        </div>
                        <div>
                             <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-faint">LINKEDIN</span>
                             <span className="font-mono text-sm text-foreground transition-colors group-hover:text-cyan">in/devendrasaim</span>
                        </div>
                    </a>
                </div>

                <dl className="border border-border bg-surface/60 p-6">
                    <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Based in</dt>
                        <dd className="font-mono text-sm text-foreground">West New York, NJ</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 pt-3">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Relocation</dt>
                        <dd className="font-mono text-sm text-foreground">Open to relocate</dd>
                    </div>
                </dl>
             </motion.div>
        </div>
    </Section>
  );
}
