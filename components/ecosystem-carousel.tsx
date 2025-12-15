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
    text: "Empowering creators and players worldwide with seamless interoperability across virtual worlds and innovative digital ecosystems",
  },
  {
    id: 3,
    text: "Building the future of digital ownership through innovative blockchain technology and immersive gaming experiences worldwide",
  },
  {
    id: 4,
    text: "Connecting global communities through shared digital assets and collaborative gaming experiences across multiple platforms",
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
    <div className="h-auto md:min-h-screen w-screen bg-transparent relative flex items-center justify-center px-4 md:px-8 lg:px-16 py-12 md:py-0">
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

          {/* Carousel Content with inline nav buttons */}
          <div className="relative w-full flex items-end justify-between gap-4">
            {/* Animated Text Content */}
            <div className="flex-1 min-h-fit md:min-h-[250px] flex items-end">
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

            {/* Navigation Buttons - Fixed, no animation, hidden on mobile */}
            <div className="hidden md:flex items-center flex-shrink-0 mb-1">
              <button
                onClick={handlePrevious}
                className={`group h-12 w-12 md:h-14 md:w-14 flex items-center justify-center border transition-all duration-300 ${
                  currentIndex > 0
                    ? "border-white bg-transparent"
                    : "border-neutral-800 bg-transparent"
                }`}
                aria-label="Previous slide"
              >
                <svg
                  className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                    currentIndex > 0
                      ? "text-white group-hover:text-neutral-300"
                      : "text-neutral-600"
                  }`}
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
                className={`group h-12 w-12 md:h-14 md:w-14 flex items-center justify-center border transition-all duration-300 ${
                  currentIndex < carouselData.length - 1
                    ? "border-white bg-transparent"
                    : "border-neutral-800 bg-transparent"
                }`}
                aria-label="Next slide"
              >
                <svg
                  className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                    currentIndex < carouselData.length - 1
                      ? "text-white group-hover:text-neutral-300"
                      : "text-neutral-600"
                  }`}
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
          </div>

          {/* Mobile Navigation Buttons - Centered below text, only visible on mobile */}
          <div className="flex md:hidden items-center justify-center gap-0 w-full">
            <button
              onClick={handlePrevious}
              className={`group h-12 w-12 flex items-center justify-center border transition-all duration-300 ${
                currentIndex > 0
                  ? "border-white bg-transparent"
                  : "border-neutral-800 bg-transparent"
              }`}
              aria-label="Previous slide"
            >
              <svg
                className={`w-5 h-5 transition-colors duration-300 ${
                  currentIndex > 0
                    ? "text-white group-hover:text-neutral-300"
                    : "text-neutral-600"
                }`}
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
              className={`group h-12 w-12 flex items-center justify-center border transition-all duration-300 ${
                currentIndex < carouselData.length - 1
                  ? "border-white bg-transparent"
                  : "border-neutral-800 bg-transparent"
              }`}
              aria-label="Next slide"
            >
              <svg
                className={`w-5 h-5 transition-colors duration-300 ${
                  currentIndex < carouselData.length - 1
                    ? "text-white group-hover:text-neutral-300"
                    : "text-neutral-600"
                }`}
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
