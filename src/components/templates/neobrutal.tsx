/* eslint-disable @next/next/no-img-element */

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
  return (
    <div
      tw={`relative ${backgroundColor} overflow-hidden p-6 flex w-full max-w-[800px] max-h-[450px] flex-col items-center justify-center`}
    >
      {/* Tagline badge */}
      <div tw="relative z-10 flex flex-col w-full items-start justify-start mb-4">
        <div
          tw={`${taglineColor} px-4 py-2 font-bold text-black text-lg md:text-xl transform rotate-1 flex items-start font-sans`}
        >
          {tagline}
        </div>

        {/* Attention-grabbing starburst */}
        <div tw="relative flex items-center justify-center w-full">
          <div tw="absolute -top-2 -right-2 w-16 h-16 flex items-center justify-center">
            <div tw="absolute inset-0 bg-yellow-400 rounded-full flex"></div>
            <div tw="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-sparkles-icon lucide-sparkles flex"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
                <path d="M4 17v2" />
                <path d="M5 18H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Repeated name background */}
      <div tw="relative z-0 flex flex-col w-full items-start gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            tw="text-4xl md:text-5xl font-extrabold text-white/90 tracking-normal leading-tight my-2 flex items-start font-sans"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Circular image */}
      <div tw="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center">
        <div tw="relative flex flex-col items-center justify-center">
          <div tw="w-[50%] h-auto rounded-full overflow-hidden border-4 border-black flex items-center justify-center">
            <img src={image} alt={name} tw="w-full h-full object-cover flex" />
          </div>

          {/* Accent elements */}
          <div
            tw={`absolute -bottom-4 -left-6 w-16 h-8 ${accentColor} transform rotate-12 flex`}
          ></div>

          {/* Star decoration */}
          <div tw="absolute -top-8 right-4 transform rotate-12 flex items-center justify-center">
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
              tw={`absolute -bottom-2 right-0 ${
                badgeColor || "bg-yellow-400"
              } px-3 py-1 rounded-lg transform rotate-6 font-bold text-black border-2 border-black flex items-center justify-center`}
            >
              {badgeText}
            </div>
          )}

          {/* Extra decorative elements */}
          <div tw="absolute -left-10 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
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
      <div tw="absolute bottom-4 right-4 z-30 flex items-center justify-center">
        <div tw="flex items-center">
          <div tw="w-6 h-6 mr-1 flex items-center justify-center">
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
          <span tw="font-bold text-black flex items-center font-sans">
            TinyTalks
          </span>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div tw="absolute bottom-10 left-4 z-10 flex items-center justify-center">
        <div tw={`w-20 h-4 ${accentColor} transform -rotate-12 flex`}></div>
      </div>

      <div tw="absolute top-20 right-10 z-10 flex items-center justify-center">
        <div
          tw={`w-6 h-6 ${accentColor} rounded-full border-2 border-black flex`}
        ></div>
      </div>
    </div>
  );
}
