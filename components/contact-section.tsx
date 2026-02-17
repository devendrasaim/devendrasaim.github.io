"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
        toast.success("Transmission Received", {
          description: result.message,
          icon: <CheckCircle2 className="h-4 w-4 text-green" />,
        });
        reset();
      } else {
        toast.error("Transmission Failed", {
          description: "Please check your inputs and try again.",
          icon: <AlertCircle className="h-4 w-4 text-destructive" />,
        });
      }
    } catch (error) {
      toast.error("System Error", {
        description: "Communication link unstable. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative px-6 py-32 border-t border-border/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
              {"// TRANSMISSION ENDPOINT"}
            </span>
          </div>

          <h2 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
            Initialize Connection
          </h2>
          
          <p className="font-sans text-lg text-muted-foreground max-w-xl mx-auto">
             Ready to collaborate? Establish a secure link below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
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
                             <label htmlFor="name" className="font-mono text-sm tracking-wider text-muted-foreground">
                                NAME
                            </label>
                            <input
                                {...register("name")}
                                className="w-full bg-background/50 border border-border px-4 py-3 font-mono text-base text-foreground focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all placeholder:text-muted-foreground/30"
                                placeholder="ENTER_NAME"
                            />
                            {errors.name && (
                                <p className="font-mono text-xs text-destructive mt-1">{errors.name.message}</p>
                            )}
                        </div>
                         <div className="space-y-2">
                             <label htmlFor="email" className="font-mono text-sm tracking-wider text-muted-foreground">
                                EMAIL
                            </label>
                            <input
                                {...register("email")}
                                className="w-full bg-background/50 border border-border px-4 py-3 font-mono text-base text-foreground focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all placeholder:text-muted-foreground/30"
                                placeholder="ENTER_EMAIL"
                            />
                            {errors.email && (
                                <p className="font-mono text-xs text-destructive mt-1">{errors.email.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="subject" className="font-mono text-sm tracking-wider text-muted-foreground">
                            SUBJECT
                        </label>
                        <input
                            {...register("subject")}
                            className="w-full bg-background/50 border border-border px-4 py-3 font-mono text-base text-foreground focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all placeholder:text-muted-foreground/30"
                            placeholder="SUBJECT_LINE"
                        />
                         {errors.subject && (
                            <p className="font-mono text-xs text-destructive mt-1">{errors.subject.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="font-mono text-sm tracking-wider text-muted-foreground">
                            MESSAGE
                        </label>
                        <textarea
                            {...register("message")}
                            className="w-full bg-background/50 border border-border px-4 py-3 font-mono text-base text-foreground focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all placeholder:text-muted-foreground/30 min-h-[150px] resize-y"
                            placeholder="INPUT_MESSAGE_DATA..."
                        />
                        {errors.message && (
                            <p className="font-mono text-xs text-destructive mt-1">{errors.message.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group relative inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 font-mono text-base tracking-widest uppercase hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                             <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Transmitting...</span>
                             </>
                        ) : (
                             <>
                                <span>Send Transmission</span>
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
                    <h3 className="font-mono text-xl font-bold text-foreground mb-6">
                        Direct Protocols
                    </h3>
                    
                     <a href="mailto:mdevendrasai9@gmail.com" className="flex items-start gap-4 group">
                        <div className="p-3 border border-border bg-background/50 group-hover:border-foreground transition-colors">
                            <Mail className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                        </div>
                        <div>
                             <span className="block font-mono text-xs tracking-wider text-muted-foreground mb-1">EMAIL</span>
                             <span className="font-sans text-base text-foreground group-hover:text-cyan transition-colors">mdevendrasai9@gmail.com</span>
                        </div>
                    </a>

                    <a href="https://github.com/devendrasaim" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                         <div className="p-3 border border-border bg-background/50 group-hover:border-foreground transition-colors">
                            <Github className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                        </div>
                        <div>
                             <span className="block font-mono text-xs tracking-wider text-muted-foreground mb-1">GITHUB</span>
                             <span className="font-sans text-base text-foreground group-hover:text-cyan transition-colors">github.com/devendrasaim</span>
                        </div>
                    </a>

                    <a href="https://www.linkedin.com/in/devendrasaim/" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                         <div className="p-3 border border-border bg-background/50 group-hover:border-foreground transition-colors">
                            <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                        </div>
                        <div>
                             <span className="block font-mono text-xs tracking-wider text-muted-foreground mb-1">LINKEDIN</span>
                             <span className="font-sans text-base text-foreground group-hover:text-cyan transition-colors">in/devendrasaim</span>
                        </div>
                    </a>
                </div>

                <div className="border border-border p-6 relative overflow-hidden">
                     <div className="absolute inset-0 bg-background/80 flex items-center justify-center pointer-events-none">
                         <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                     </div>
                     <div className="relative z-10 space-y-2">
                        <div className="flex items-center justify-between text-sm font-mono text-muted-foreground">
                            <span>STATUS</span>
                            <span className="text-green">ACTIVE</span>
                        </div>
                         <div className="flex items-center justify-between text-sm font-mono text-muted-foreground">
                            <span>LATENCY</span>
                            <span>12ms</span>
                        </div>
                         <div className="flex items-center justify-between text-sm font-mono text-muted-foreground">
                            <span>ENCRYPTION</span>
                            <span>TLS 1.3</span>
                        </div>
                     </div>
                </div>
             </motion.div>
        </div>
      </div>
    </section>
  );
}
