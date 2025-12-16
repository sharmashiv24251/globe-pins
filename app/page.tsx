"use client";
import GlobeSection from "@/components/globe-section";
import EcosystemCarousel from "@/components/ecosystem-carousel";
import GlobeImage from "@/components/globe-image";

export default function Home() {
  return (
    <main className="">
      <GlobeImage />
      {/* <GlobeSection /> */}
      <EcosystemCarousel />
    </main>
  );
}
