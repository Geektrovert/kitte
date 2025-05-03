"use client";
import { useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import Image from "next/image";

import { createShader } from "@/components/shaders/paper";

interface PosterCardProps {
  name?: string;
  image?: string;
  tagline?: string;
  taglineColor?: string;
  backgroundColor?: string;
  accentColor?: string;
  badgeText?: string;
  badgeColor?: string;
}

export default function PosterCard({
  name = "CIARA CASTRO",
  image = "/theo.png",
  tagline = "Shuffle Evolution",
  taglineColor = "bg-orange-500",
  backgroundColor = "bg-purple-400",
  accentColor = "bg-yellow-400",
  badgeText = "NEW!",
  badgeColor,
}: PosterCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const shader = createShader(canvasRef.current, {
        type: "noise",
        density: 0.5,
        speed: 0,
        color: accentColor,
      });

      return () => {
        shader.destroy();
      };
    }
  }, [accentColor]);

  return (
    <div
      className={`relative ${backgroundColor} rounded-2xl overflow-hidden p-6`}
      style={{
        width: "100%",
        maxWidth: "600px",
        aspectRatio: "4/3",
      }}
    >
      {/* Background canvas for shader effect */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
      />

      {/* Tagline badge */}
      <div className="relative z-10 flex justify-between items-start mb-4">
        <div
          className={`${taglineColor} px-4 py-2 rounded-lg font-bold text-black text-xl transform rotate-1`}
        >
          {tagline}
        </div>

        {/* Attention-grabbing starburst */}
        <div className="relative">
          <div className="absolute -top-2 -right-2 w-16 h-16">
            <div className="absolute inset-0 bg-yellow-400 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Repeated name background */}
      <div className="relative z-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="text-6xl font-extrabold text-white/90 tracking-tight leading-none my-2"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Circular image */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="relative flex items-center justify-center">
          <div className="w-[50%] h-auto rounded-full overflow-hidden border-4 border-black">
            <Image
              src={image}
              width={300}
              height={300}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Accent elements */}
          <div
            className={`absolute -bottom-4 -left-6 w-16 h-8 ${accentColor} transform rotate-12`}
          ></div>

          {/* Star decoration */}
          <div className="absolute -top-8 right-4 transform rotate-12">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#FFD700"
                stroke="black"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Badge if provided */}
          {badgeText && (
            <div
              className={`absolute -bottom-2 right-0 ${
                badgeColor || "bg-yellow-400"
              } px-3 py-1 rounded-lg transform rotate-6 font-bold text-black border-2 border-black`}
            >
              {badgeText}
            </div>
          )}

          {/* Extra decorative elements */}
          <div className="absolute -left-10 top-1/2 transform -translate-y-1/2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="#FF6B6B"
                stroke="black"
                strokeWidth="1"
              />
              <circle cx="12" cy="12" r="5" fill="#FFD700" />
            </svg>
          </div>
        </div>
      </div>

      {/* Footer logo */}
      <div className="absolute bottom-4 right-4 z-30">
        <div className="flex items-center">
          <div className="w-6 h-6 mr-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" />
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                fill="black"
              />
              <path d="M12 6l-4 4h8l-4-4z" fill="black" />
              <path d="M12 18l4-4h-8l4 4z" fill="black" />
            </svg>
          </div>
          <span className="font-bold text-black">TinyTalks</span>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-10 left-4 z-10">
        <div className={`w-20 h-4 ${accentColor} transform -rotate-12`}></div>
      </div>

      <div className="absolute top-20 right-10 z-10">
        <div
          className={`w-6 h-6 ${accentColor} rounded-full border-2 border-black`}
        ></div>
      </div>
    </div>
  );
}
