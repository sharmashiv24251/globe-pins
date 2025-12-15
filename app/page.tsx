"use client";
import GlobeSection from "@/components/globe-section";
import EcosystemCarousel from "@/components/ecosystem-carousel";

export default function Home() {
  return (
    <main className="bg-black">
      <GlobeSection />
      <EcosystemCarousel />
    </main>
  );
}
