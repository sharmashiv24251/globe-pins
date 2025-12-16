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
  images: string[]; // Array of image URLs for carousel
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
    images: [
      "https://images.unsplash.com/photo-1544765773-a8dce1f272f6?q=80&w=1297&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1685231505216-720690ca7cc9?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1614170059029-3b7422659b37?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "pin-2",
    x: 43,
    y: 64,
    rotation: -25,
    name: "Lionel Messi",
    description: "Inter Miami",
    country: "Argentina",
    images: [
      "https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1488474739786-757973c2dff6?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1685231505284-4867f25dabba?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "pin-3",
    x: 78,
    y: 48,
    rotation: 20,
    name: "Son Heung-min",
    description: "Tottenham",
    country: "South Korea",
    images: [
      "https://images.unsplash.com/photo-1544765773-a8dce1f272f6?q=80&w=1297&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1685231505216-720690ca7cc9?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1614170059029-3b7422659b37?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "pin-4",
    x: 13,
    y: 70,
    rotation: -70,
    name: "Vinicius Jr",
    description: "Real Madrid",
    country: "Brazil",
    images: [
      "https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1488474739786-757973c2dff6?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1685231505284-4867f25dabba?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "pin-5",
    x: 46,
    y: 54,
    rotation: 0,
    name: "Erling Haaland",
    description: "Manchester City",
    country: "Norway",
    images: [
      "https://images.unsplash.com/photo-1544765773-a8dce1f272f6?q=80&w=1297&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1685231505216-720690ca7cc9?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1614170059029-3b7422659b37?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  },
  {
    id: "pin-6",
    x: 50,
    y: 54,
    rotation: -15,
    name: "Kylian Mbappé",
    description: "Real Madrid",
    country: "France",
    images: [
      "https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1488474739786-757973c2dff6?q=80&w=1315&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1685231505284-4867f25dabba?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
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

  // Carousel state - track current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Show card only when clicked active (not on hover)
  const showCard = isActive;

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
        // Active pin appears above card (z-40), inactive pins behind card (z-10)
        zIndex: isActive ? 40 : 10,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style jsx>{`
        @keyframes smooth-pop {
          0% {
            transform: translate(-85%, 0) scale(0) rotate(15deg);
            opacity: 0;
          }
          100% {
            transform: translate(-85%, 10px) scale(1) rotate(-10deg);
            opacity: 1;
          }
        }

        @keyframes smooth-pop-reverse {
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
          animation: smooth-pop 480ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .card-exit {
          animation: smooth-pop-reverse 240ms cubic-bezier(0.4, 0, 0.2, 1)
            forwards;
        }

        .card-hover-enter {
          animation: smooth-pop 480ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

        /* Only animate when active (clicked) */
        .card-active {
          animation: smooth-pop 480ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .card-active .content-item {
          animation: content-stagger 280ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
