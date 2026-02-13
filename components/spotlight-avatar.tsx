"use client";

import { motion } from "framer-motion";

interface SpotlightAvatarProps {
  src: string;
  alt: string;
  size?: number;
}

export function SpotlightAvatar({ src, alt, size = 180 }: SpotlightAvatarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative flex items-center justify-center"
      style={{ width: size * 1.8, height: size * 1.8 }}
    >
      {/* Outermost soft glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsla(0, 0%, 100%, 0.03) 0%, hsla(0, 0%, 100%, 0.01) 40%, transparent 70%)",
        }}
      />

      {/* Mid glow ring */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full"
        style={{
          width: size * 1.4,
          height: size * 1.4,
          background:
            "radial-gradient(circle, hsla(0, 0%, 100%, 0.06) 0%, hsla(0, 0%, 100%, 0.02) 50%, transparent 70%)",
        }}
      />

      {/* Inner glow directly behind image */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute rounded-full"
        style={{
          width: size * 1.15,
          height: size * 1.15,
          background:
            "radial-gradient(circle, hsla(0, 0%, 100%, 0.08) 0%, hsla(0, 0%, 100%, 0.03) 60%, transparent 80%)",
          filter: "blur(8px)",
        }}
      />

      {/* Thin border ring */}
      <div
        className="absolute rounded-full border border-border/40"
        style={{ width: size + 8, height: size + 8 }}
      />

      {/* Profile image */}
      <div
        className="relative rounded-full overflow-hidden"
        style={{ width: size, height: size }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />

        {/* Subtle inner shadow for depth */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 20px hsla(0, 0%, 0%, 0.4)",
          }}
        />
      </div>

      {/* Crosshair decorations */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {/* Top tick */}
        <line x1="50" y1="8" x2="50" y2="14" stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" opacity="0.4" />
        {/* Bottom tick */}
        <line x1="50" y1="86" x2="50" y2="92" stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" opacity="0.4" />
        {/* Left tick */}
        <line x1="8" y1="50" x2="14" y2="50" stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" opacity="0.4" />
        {/* Right tick */}
        <line x1="86" y1="50" x2="92" y2="50" stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" opacity="0.4" />
      </svg>
    </motion.div>
  );
}
