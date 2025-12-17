"use client";
import React from "react";
import dynamic from "next/dynamic";
import { GLOBE_CONFIG, SAMPLE_ARCS } from "@/lib/constants";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  }
);

export default function GlobeSection() {

  return (
    <div
      className="h-[400px] md:h-screen w-screen bg-transparent relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 60%, transparent 100%)",
      }}
    >
      {/* Globe - 95% width on mobile, 80% on desktop, positioned to show only upper half */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[95%] md:w-[80%] aspect-square absolute bottom-0 translate-y-1/2">
          <World data={SAMPLE_ARCS} globeConfig={GLOBE_CONFIG} />
        </div>
      </div>
    </div>
  );
}
