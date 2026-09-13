"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PageLoader } from "@/components/page-loader";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  // The page renders immediately and the loader sits on top of it. Gating the
  // children on `loaded` kept the whole document out of the DOM until the
  // animation finished, which pushed the largest paint past two seconds.
  return (
    <>
      {children}
      {!loaded && !reduce && <PageLoader onComplete={() => setLoaded(true)} />}
    </>
  );
}
