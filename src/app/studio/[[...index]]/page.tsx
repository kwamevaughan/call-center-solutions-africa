"use client";

import dynamic from "next/dynamic";

const StudioComponent = dynamic(() => import("@/shared/components/SanityStudio"), { ssr: false });

export default function StudioPage() {
  return (
    <div style={{ height: "100vh" }}>
      <StudioComponent />
    </div>
  );
}
