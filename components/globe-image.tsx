"use client";

import { useState } from "react";

// Pin configuration type
type Pin = {
  id: string;
  x: number; // 0-100 (percentage from left)
  y: number; // 0-100 (percentage from top)
  rotation: number; // 0-360 degrees to rotate the pin image
  name: string;
  description: string;
  country: string;
};

// Configure your pins here - change x,y,rotation values to position them
const pins: Pin[] = [
  {
    id: "pin-1",
    x: 50,
    y: 65,
    rotation: 0,
    name: "Kalidou Koulibaly",
    description: "Al-Hilal",
    country: "Senegal",
  },
  {
    id: "pin-2",
    x: 43,
    y: 64,
    rotation: -25,
    name: "Lionel Messi",
    description: "Inter Miami",
    country: "Argentina",
  },
  {
    id: "pin-3",
    x: 78,
    y: 48,
    rotation: 20,
    name: "Son Heung-min",
    description: "Tottenham",
    country: "South Korea",
  },
  {
    id: "pin-4",
    x: 13,
    y: 70,
    rotation: -70,
    name: "Vinicius Jr",
    description: "Real Madrid",
    country: "Brazil",
  },
  {
    id: "pin-5",
    x: 46,
    y: 54,
    rotation: 0,
    name: "Erling Haaland",
    description: "Manchester City",
    country: "Norway",
  },
  {
    id: "pin-6",
    x: 50,
    y: 54,
    rotation: -15,
    name: "Kylian Mbappé",
    description: "Real Madrid",
    country: "France",
  },
];

// PinMarker component - shows pin image and card on click only
function PinMarker({
  pin,
  isActive,
  onClick,
}: {
  pin: Pin;
  isActive: boolean;
  onClick: () => void;
}) {
  // Track hover state for pin scaling
  const [isHovered, setIsHovered] = useState(false);

  // Show card only when clicked active (not on hover)
  const showCard = isActive;

  // Pin scale logic:
  // - Active (card open): 1.4x (persists even without hover)
  // - Hover (not active): 1.2x
  // - Default: 1x
  const pinScale = isActive ? 1.4 : isHovered ? 1.2 : 1;

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
        // Active pin appears above card (z-40), inactive pins behind card (z-10)
        zIndex: isActive ? 40 : 10,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style jsx>{`
        @keyframes spring-pop {
          0% {
            transform: translate(-85%, 0) scale(0) rotate(15deg);
            opacity: 0;
          }
          60% {
            transform: translate(-85%, 10px) scale(1.1) rotate(-12deg);
            opacity: 1;
          }
          100% {
            transform: translate(-85%, 10px) scale(1) rotate(-10deg);
            opacity: 1;
          }
        }

        @keyframes spring-pop-reverse {
          0% {
            transform: translate(-85%, 10px) scale(1) rotate(-10deg);
            opacity: 1;
          }
          100% {
            transform: translate(-85%, 0) scale(0) rotate(15deg);
            opacity: 0;
          }
        }

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

        .card-enter {
          animation: spring-pop 350ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .card-exit {
          animation: spring-pop-reverse 200ms cubic-bezier(0.4, 0, 1, 1)
            forwards;
        }

        .card-hover-enter {
          animation: spring-pop 350ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .content-item {
          animation: content-stagger 250ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .content-delay-1 {
          animation-delay: 50ms;
          opacity: 0;
        }

        .content-delay-2 {
          animation-delay: 100ms;
          opacity: 0;
        }

        .content-delay-3 {
          animation-delay: 150ms;
          opacity: 0;
        }

        /* Only animate when active (clicked) */
        .card-active {
          animation: spring-pop 350ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .card-active .content-item {
          animation: content-stagger 250ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      {/* Card - appears on click only */}
      <div
        className="absolute bottom-full left-1/2 mb-1 pointer-events-none"
        style={{ zIndex: 30 }}
      >
        {/* Card container with spring animation */}
        <div
          className={`relative ${showCard ? "card-active" : ""}`}
          style={{
            transformOrigin: "bottom right",
            transform: showCard
              ? "translate(-85%, 10px) scale(1) rotate(-10deg)"
              : "translate(-85%, 0) scale(0) rotate(15deg)",
            opacity: showCard ? 1 : 0,
            transition: showCard ? "none" : "none",
            width: "220%", // Card width as percentage of container
          }}
        >
          {/* Main card body */}
          <div className="bg-[#1a1a1a] rounded-lg shadow-2xl border border-gray-800 w-full">
            {/* Blue rounded box - minimal padding, square aspect */}
            <div style={{ padding: "0.25vw" }}>
              <div className="w-full aspect-square bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg content-item content-delay-1"></div>
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
}

export default function GlobeImage() {
  const [activePinId, setActivePinId] = useState<string | null>(null);

  const handlePinClick = (pinId: string) => {
    // Toggle: if clicking the active pin, deactivate it; otherwise activate the clicked pin
    setActivePinId((prev) => (prev === pinId ? null : pinId));
  };

  return (
    <section className="w-full relative">
      {/* 16:9 Container with background image */}
      <div
        className="w-full aspect-video bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        {/* Pins positioned absolutely within the container */}
        {pins.map((pin) => (
          <PinMarker
            key={pin.id}
            pin={pin}
            isActive={activePinId === pin.id}
            onClick={() => handlePinClick(pin.id)}
          />
        ))}
      </div>
    </section>
  );
}
