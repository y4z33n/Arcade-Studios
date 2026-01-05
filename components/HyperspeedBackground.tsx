"use client";

import Aurora from "@/components/Aurora";

export default function HyperspeedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Aurora
        colorStops={['#DC2626', '#000000', '#DC2626']}
        amplitude={1.2}
        blend={0.5}
        speed={0.8}
      />
    </div>
  );
}
