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

// PinMarker component - shows pin image and hover card
function PinMarker({
  pin,
  isActive,
  onClick,
}: {
  pin: Pin;
  isActive: boolean;
  onClick: () => void;
}) {
  // Show card when hovering OR when clicked active
  const showCard = isActive;

  return (
    <div
      className="absolute group cursor-pointer z-10 hover:z-30"
      style={{
        left: `${pin.x}%`,
        top: `${pin.y}%`,
        transform: "translate(-50%, -50%)",
        // Pin size relative to container width (3% of container width)
        width: "3%",
        aspectRatio: "1",
      }}
      onClick={onClick}
    >
      {/* Hover card - appears behind the pin with rotation animation */}
      <div className="absolute bottom-full left-1/2 -mb-2 z-20 pointer-events-none">
        <div
          className={`bg-[#1a1a1a] rounded-lg shadow-2xl min-w-[200px] border border-gray-800
                     transition-all duration-300 ease-out origin-bottom-right
                     -translate-x-[85%]
                     ${
                       showCard || false
                         ? "rotate-0 opacity-100"
                         : "rotate-[15deg] opacity-0"
                     }
                     group-hover:rotate-0 group-hover:opacity-100`}
        >
          {/* Blue rounded box - minimal padding, square aspect */}
          <div className="p-1">
            <div className="w-full aspect-square bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg"></div>
          </div>

          {/* Text content - reduced padding */}
          <div className="px-3 pb-3 pt-2">
            {/* Name */}
            <h3 className="text-white font-semibold text-base mb-1">
              {pin.name}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-2">{pin.description}</p>

            {/* Country with icon */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
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

      {/* Pin image with rotation - always on top (z-30) */}
      <div
        className="relative w-full h-full transition-transform hover:scale-110 z-30"
        style={{
          transform: `rotate(${pin.rotation}deg)`,
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
