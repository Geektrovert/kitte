"use client";

import { useRef, useEffect } from "react";

import { createShader } from "@/components/shaders/paper";

interface PosterCardProps {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  accentColor?: string;
  imageUrl?: string;
}

export default function PosterCard({
  title = "CODE CHEETAHS",
  subtitle,
  backgroundColor = "bg-[#e8e3d9]",
  accentColor = "from-blue-600 to-red-500",
  imageUrl = "/render.jpg",
}: PosterCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const shader = createShader(canvasRef.current, {
        type: "noise",
        density: 0.05,
        speed: 0,
        color: "#f0f0f0",
      });

      return () => {
        shader.destroy();
      };
    }
  }, []);

  return (
    <div
      className={`relative ${backgroundColor} rounded-2xl overflow-hidden`}
      style={{
        width: "100%",
        maxWidth: "800px",
        aspectRatio: "4/3",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      }}
    >
      {/* Background texture */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none"
      />

      <div className="absolute inset-0 p-8 md:p-12 flex">
        {/* Left side - Title */}
        <div className="w-1/3 flex flex-col justify-center">
          {/* Gradient accent line */}
          <div
            className={`w-2 h-32 mb-4 bg-gradient-to-b ${accentColor} rounded-full`}
          ></div>

          {/* Title text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-black">
            {title.split(" ").map((word, i) => (
              <div key={i} className="block">
                {word}
              </div>
            ))}
          </h1>

          {/* Optional subtitle */}
          {subtitle && <p className="mt-4 text-sm text-gray-700">{subtitle}</p>}
        </div>

        {/* Right side - Shapes */}
        <div className="w-2/3 relative">
          {/* Orange rounded square */}
          <div className="absolute top-0 left-0 w-1/3 aspect-square bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl">
            <div className="absolute inset-[3px] rounded-3xl border border-white/20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Center image area */}
          <div className="absolute top-1/4 left-1/6 w-2/3 aspect-square rounded-3xl overflow-hidden">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Decorative glass objects"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Black circle */}
          <div className="absolute top-0 right-0 w-1/4 aspect-square bg-black rounded-full">
            <div className="absolute inset-[6px] border-2 border-white/20 rounded-full"></div>
          </div>

          {/* Pink shape */}
          <div className="absolute bottom-0 right-0 w-1/3 h-2/5 bg-gradient-to-br from-pink-400 to-red-400 rounded-t-3xl rounded-br-3xl">
            <div className="absolute inset-[3px] rounded-t-3xl rounded-br-3xl border border-white/20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute w-[80%] h-[70%] top-[15%] left-[10%] border border-white/30 rounded-t-3xl"></div>
            </div>
          </div>

          {/* Attention-grabbing icon/element */}
          <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
