"use client";

import React from "react";

const BackgroundBlobs = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/50 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/50 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-blue-500/50 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-10 right-1/3 w-[500px] h-[500px] bg-orange-500/30 rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-blob animation-delay-2000"></div>
    </div>
  );
};

export default BackgroundBlobs;
