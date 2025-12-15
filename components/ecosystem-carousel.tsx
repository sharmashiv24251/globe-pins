"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const carouselData = [
  {
    id: 1,
    text: "We bridge sports, gaming, and lifestyle by transforming collectibles into dynamic, cross-platform assets across mobile games",
  },
  {
    id: 2,
    text: "Empowering creators and players with seamless interoperability across virtual worlds and digital ecosystems",
  },
  {
    id: 3,
    text: "Building the future of digital ownership through innovative blockchain technology and immersive experiences",
  },
  {
    id: 4,
    text: "Connecting communities globally through shared digital assets and collaborative gaming experiences",
  },
];

export default function EcosystemCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouselData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === carouselData.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen w-screen bg-black relative flex items-center justify-center px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="flex flex-col items-start gap-6 md:gap-8"
        >
          {/* ECOSYSTEM Label */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-neutral-400 uppercase tracking-wide">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            ECOSYSTEM
          </div>

          {/* Carousel Content */}
          <div className="relative w-full min-h-[200px] md:min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-left text-3xl md:text-5xl lg:text-6xl font-semibold text-white max-w-4xl tracking-tight leading-[1.1]"
              >
                {carouselData[currentIndex].text}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevious}
              className="group h-12 w-12 md:h-14 md:w-14 flex items-center justify-center border border-neutral-800 hover:border-neutral-600 transition-all duration-300 bg-transparent"
              aria-label="Previous slide"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-neutral-400 group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="group h-12 w-12 md:h-14 md:w-14 flex items-center justify-center border border-neutral-800 hover:border-neutral-600 transition-all duration-300 bg-transparent"
              aria-label="Next slide"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-neutral-400 group-hover:text-white transition-colors duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
