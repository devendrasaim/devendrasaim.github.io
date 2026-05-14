"use client";

import { useState } from "react";
import { PageLoader } from "@/components/page-loader";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <PageLoader onComplete={() => setLoaded(true)} />}
      {loaded && children}
    </>
  );
}
