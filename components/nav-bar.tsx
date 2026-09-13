"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "RESEARCH", href: "#research" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "EDUCATION", href: "#education" },
  { label: "CERTS", href: "#certifications" },
  { label: "CONTACT", href: "#contact" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  // Lock page scroll behind the open mobile menu.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

  // Close the menu on Escape.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  /**
   * Scroll spy via IntersectionObserver rather than a scroll listener: the
   * browser does the work off the main thread and there is no per-frame state.
   */
  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio >= bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActiveSection(best);
      },
      {
        // Discount the fixed header so a section counts once it clears it.
        rootMargin: "-72px 0px -55% 0px",
        threshold: [0, 0.15, 0.4, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    setMobileMenuOpen(false);
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || mobileMenuOpen
            ? "border-b border-border bg-background/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-10">
          <a
            href="#home"
            onClick={(e) => handleClick(e, "#home")}
            className="font-mono text-xs font-bold tracking-[0.22em] text-foreground transition-opacity hover:opacity-70"
          >
            DEVENDRA SAI
          </a>

          {/* Desktop */}
          <div className="hidden items-center md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  aria-current={isActive ? "true" : undefined}
                  className="relative px-3 py-2 lg:px-3.5"
                >
                  <span
                    className={`font-mono text-[11px] tracking-[0.18em] transition-colors duration-200 ${
                      isActive
                        ? "text-foreground"
                        : "text-faint hover:text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-3 bottom-0 h-px bg-cyan"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="-mr-2 p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={`flex items-center justify-between border-b border-border/60 py-3.5 font-mono text-sm tracking-[0.18em] transition-colors ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="h-1.5 w-1.5 bg-cyan" aria-hidden="true" />
                    )}
                  </a>
                );
              })}
              <a
                href="mailto:mdevendrasai9@gmail.com"
                className="py-4 font-mono text-xs text-faint transition-colors hover:text-foreground"
              >
                mdevendrasai9@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
