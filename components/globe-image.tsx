"use client";

import React, { useState, useCallback } from "react";
import { type Pin, PINS } from "@/lib/constants";

// PinMarker component - shows pin image and card on hover
const PinMarker = React.memo(function PinMarker({
  pin,
  isActive,
  isExiting,
  onHoverStart,
  onHoverEnd,
}: {
  pin: Pin;
  isActive: boolean;
  isExiting: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  // Track hover state for pin scaling
  const [isHovered, setIsHovered] = useState(false);

  // Carousel state - track current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Show card when active (hovered) or exiting (animating out)
  const showCard = isActive || isExiting;

  // Pin scale logic:
  // - Active (card open): 1.4x (persists even without hover)
  // - Hover (not active): 1.2x
  // - Default: 1x
  const pinScale = isActive ? 1.4 : isHovered ? 1.2 : 1;

  // Carousel navigation handlers
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent pin click
    setCurrentImageIndex((prev) =>
      prev === 0 ? pin.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent pin click
    setCurrentImageIndex((prev) =>
      prev === pin.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent pin click
    setCurrentImageIndex(index);
  };

  return (
    <div
      className="absolute cursor-pointer"
      style={{
        left: `${pin.x}%`,
        top: `${pin.y}%`,
        transform: "translate(-50%, -50%)",
        // Pin size relative to container width (3% of container width)
        width: "3%",
        aspectRatio: "1",
        // Active or exiting pin stays above others (z-40), inactive pins behind (z-10)
        // This ensures the card maintains its z-index during exit animation
        zIndex: isActive || isExiting ? 40 : 10,
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverStart();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverEnd();
      }}
    >
      <style jsx>{`
        @keyframes content-stagger {
          0% {
            opacity: 0;
            transform: translateY(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .content-item {
          animation: content-stagger 280ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .content-delay-1 {
          animation-delay: 80ms;
          opacity: 0;
        }

        .content-delay-2 {
          animation-delay: 160ms;
          opacity: 0;
        }

        .content-delay-3 {
          animation-delay: 240ms;
          opacity: 0;
        }
      `}</style>

      {/* Card - appears on hover */}
      <div
        className="absolute bottom-full left-1/2 mb-1 pointer-events-none"
        style={{ zIndex: 30 }}
      >
        {/* Card container with interruptible CSS transition */}
        <div
          className="relative"
          style={{
            transformOrigin: "bottom right",
            transform: isActive
              ? "translate(-85%, 10px) scale(1) rotate(-10deg)"
              : "translate(-85%, 0) scale(0) rotate(15deg)",
            opacity: isActive ? 1 : 0,
            transition:
              "transform 480ms cubic-bezier(0.4, 0, 0.2, 1), opacity 480ms cubic-bezier(0.4, 0, 0.2, 1)",
            width: "220%", // Card width as percentage of container
            pointerEvents: isActive ? "auto" : "none",
          }}
        >
          {/* Main card body */}
          <div className="bg-[#1a1a1a] rounded-lg shadow-2xl border border-gray-800 w-full">
            {/* Image carousel - with navigation and indicators */}
            <div style={{ padding: "0.25vw" }} className="relative">
              {/* Image display */}
              <img
                src={pin.images[currentImageIndex]}
                alt={pin.name}
                className="w-full aspect-square rounded-lg content-item content-delay-1 object-cover transition-opacity duration-300"
              />

              {/* Left navigation button - overflows card edge */}
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 -translate-y-1/2 bg-[#1a1a1a] hover:bg-[#252525] rounded-full transition-all duration-200 hover:scale-105 pointer-events-auto border-1 border-white/40"
                style={{
                  width: "2vw",
                  height: "2vw",
                  left: "-1vw", // Half the button width - overflows left edge
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "1vw", height: "1vw" }}
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Right navigation button - overflows card edge */}
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 -translate-y-1/2 bg-[#1a1a1a] hover:bg-[#252525] rounded-full transition-all duration-200 hover:scale-105 pointer-events-auto border-1 border-white/40"
                style={{
                  width: "2vw",
                  height: "2vw",
                  right: "-1vw", // Half the button width - overflows right edge
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "1vw", height: "1vw" }}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              {/* Dot indicators */}
              <div
                className="absolute bottom-[0.5vw] left-1/2 -translate-x-1/2 flex gap-[0.3vw]"
                style={{ pointerEvents: "auto" }}
              >
                {pin.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => handleDotClick(index, e)}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: currentImageIndex === index ? "0.6vw" : "0.4vw",
                      height: "0.4vw",
                      backgroundColor:
                        currentImageIndex === index ? "#F97316" : "#ffffff80",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Text content - responsive padding and text sizes */}
            <div style={{ padding: "0.6vw 0.8vw" }}>
              {/* Name */}
              <h3
                className="text-white font-semibold content-item content-delay-2"
                style={{ fontSize: "0.9vw", marginBottom: "0.2vw" }}
              >
                {pin.name}
              </h3>

              {/* Description */}
              <p
                className="text-gray-400 content-item content-delay-2"
                style={{ fontSize: "0.7vw", marginBottom: "0.5vw" }}
              >
                {pin.description}
              </p>

              {/* Country with icon */}
              <div
                className="flex items-center text-gray-400 content-item content-delay-3"
                style={{ gap: "0.4vw", fontSize: "0.65vw" }}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "0.8vw", height: "0.8vw" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{pin.country}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pin image with rotation and scaling */}
      <div
        className="relative w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `rotate(${pin.rotation}deg) scale(${pinScale})`,
          zIndex: 50, // Pin always appears above card (which is at z-index 30)
        }}
      >
        <img
          src="/alt-pin.png"
          alt="Pin"
          className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        />
      </div>
    </div>
  );
});

export default function GlobeImage() {
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [exitingPinId, setExitingPinId] = useState<string | null>(null);

  const handlePinHoverStart = useCallback(
    (pinId: string) => {
      // If there's already an active pin that's different, set it as exiting
      if (activePinId && activePinId !== pinId) {
        setExitingPinId(activePinId);
        // Clear exiting state after animation completes (matches card-exit duration)
        setTimeout(() => {
          setExitingPinId(null);
        }, 480);
      }
      // Set the new pin as active
      setActivePinId(pinId);
    },
    [activePinId]
  );

  const handlePinHoverEnd = useCallback(
    (pinId: string) => {
      // Only clear if this pin is still the active one
      if (activePinId === pinId) {
        setExitingPinId(pinId);
        setActivePinId(null);
        // Clear exiting state after animation completes
        setTimeout(() => {
          setExitingPinId(null);
        }, 480);
      }
    },
    [activePinId]
  );

  return (
    <section className="w-full relative">
      {/* 16:9 Container with background image */}
      <div
        className="w-full aspect-video bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        {/* Pins positioned absolutely within the container */}
        {PINS.map((pin) => (
          <PinMarker
            key={pin.id}
            pin={pin}
            isActive={activePinId === pin.id}
            isExiting={exitingPinId === pin.id}
            onHoverStart={() => handlePinHoverStart(pin.id)}
            onHoverEnd={() => handlePinHoverEnd(pin.id)}
          />
        ))}
      </div>
    </section>
  );
}
