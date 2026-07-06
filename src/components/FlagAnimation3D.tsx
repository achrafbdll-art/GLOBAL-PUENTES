import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../LanguageContext";
import { Shield, Sparkles, Navigation, Globe } from "lucide-react";

interface FlagData {
  id: string;
  name: string;
  description: string;
  details: string;
  svg: React.ReactNode;
}

export default function FlagAnimation3D() {
  const { language } = useLanguage();
  const [activeFlag, setActiveFlag] = useState<number | null>(null);
  const [rotationY, setRotationY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Automatic slow 3D rotation when not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setRotationY((prev) => (prev + 0.3) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, [isHovered]);

  const flags: FlagData[] = [
    {
      id: "es",
      name: "Spain",
      description: "Gateway to Europe",
      details: "Strategic logistical connection platform with the European single market and high-security regulation.",
      svg: (
        <svg viewBox="0 0 750 500" className="w-full h-full object-cover">
          {/* Spain Flag */}
          <rect width="750" height="125" fill="#C60B1E" />
          <rect y="125" width="750" height="250" fill="#FBE122" />
          <rect y="375" width="750" height="125" fill="#C60B1E" />
          {/* Simplified Coat of Arms for premium aesthetic */}
          <g transform="translate(250, 250) scale(1.1)">
            {/* Crown */}
            <path d="M -30 -50 L -15 -35 L 0 -55 L 15 -35 L 30 -50 L 20 -20 L -20 -20 Z" fill="#C60B1E" stroke="#D4AF37" strokeWidth="3" />
            {/* Shield base */}
            <path d="M -25 -20 L 25 -20 L 25 15 C 25 35, -25 35, -25 15 Z" fill="#D4AF37" stroke="#000" strokeWidth="2" />
            {/* Columns on sides */}
            <rect x="-42" y="-35" width="10" height="60" fill="#FFF" stroke="#D4AF37" strokeWidth="2" rx="2" />
            <rect x="32" y="-35" width="10" height="60" fill="#FFF" stroke="#D4AF37" strokeWidth="2" rx="2" />
            <path d="M -48 -35 L -26 -35 M 26 -35 L 48 -35" stroke="#C60B1E" strokeWidth="4" />
          </g>
        </svg>
      )
    },
    {
      id: "uae",
      name: "United Arab Emirates",
      description: "Global Business Hub",
      details: "Intercontinental flow of capital and commodities. Strategic financial epicenter in Dubai.",
      svg: (
        <svg viewBox="0 0 600 300" className="w-full h-full object-cover">
          {/* UAE Flag */}
          <rect width="150" height="300" fill="#FF0000" />
          <rect x="150" width="450" height="100" fill="#00732F" />
          <rect x="150" y="100" width="450" height="100" fill="#FFFFFF" />
          <rect x="150" y="200" width="450" height="100" fill="#000000" />
        </svg>
      )
    },
    {
      id: "ma",
      name: "Morocco",
      description: "Gateway to Africa & Manufacturing",
      details: "Agile and dynamic trade and industrial corridor linking the Atlantic, Mediterranean, and Sub-Saharan Africa.",
      svg: (
        <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
          {/* Morocco Flag */}
          <rect width="900" height="600" fill="#C1272D" />
          {/* Green Star (Pentagram) with Gold Outline */}
          <g transform="translate(450, 300) scale(1.6)">
            <path
              d="M 0,-60 L 18,-15 L 60,-15 L 26,10 L 40,55 L 0,25 L -40,55 L -26,10 L -60,-15 L -18,-15 Z"
              fill="none"
              stroke="#006233"
              strokeWidth="9"
              strokeLinejoin="round"
            />
            <path
              d="M 0,-60 L 18,-15 L 60,-15 L 26,10 L 40,55 L 0,25 L -40,55 L -26,10 L -60,-15 L -18,-15 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      )
    },
    {
      id: "eu",
      name: "European Union",
      description: "Common Investment Framework",
      details: "Legal stability, free trade circulation, and compliance standards of the highest caliber.",
      svg: (
        <svg viewBox="0 0 810 540" className="w-full h-full object-cover">
          {/* EU Flag */}
          <rect width="810" height="540" fill="#003399" />
          {/* 12 Gold Stars */}
          <g transform="translate(405, 270)">
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const r = 140;
              const x = r * Math.sin(angle);
              const y = -r * Math.cos(angle);
              return (
                <path
                  key={i}
                  d="M 0,-15 L 4.5,-4.5 L 15,-4.5 L 6.5,2.5 L 10.5,13 L 0,6.5 L -10.5,13 L -6.5,2.5 L -15,-4.5 L -4.5,-4.5 Z"
                  fill="#FFCC00"
                  transform={`translate(${x}, ${y}) scale(0.9)`}
                />
              );
            })}
          </g>
        </svg>
      )
    }
  ];

  const handleFlagHover = (index: number | null) => {
    setActiveFlag(index);
    setIsHovered(index !== null);
  };

  return (
    <div className="w-full py-10 flex flex-col items-center">
      
      {/* Visual Header of the 3D block */}
      <div className="text-center mb-8 max-w-xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-[#D4AF37]/10 to-[#8B7355]/10 border border-[#D4AF37]/20 rounded-full mb-3">
          <Globe className="w-3 h-3 text-[#D4AF37]" />
          <span className="text-[9px] font-bold text-[#D4AF37] tracking-[0.25em] uppercase font-sans-ui">
            Strategic Investment Corridor
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif text-white italic tracking-wide">
          Connecting Regional Economic Influence
        </h3>
        <p className="text-[11px] text-[#F5E6D3]/50 font-light mt-1 uppercase tracking-widest">
          Spain • UAE • Morocco • European Union
        </p>
      </div>

      {/* 3D Ring Container */}
      <div 
        className="relative w-full h-[320px] flex items-center justify-center overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        {/* Dynamic Rotating 3D Carousel Floor / Shadow */}
        <div 
          className="absolute w-[280px] h-[30px] rounded-full bg-radial from-[#D4AF37]/15 to-transparent blur-md translate-y-[110px]"
          style={{ transform: "rotateX(75deg)" }}
        />

        {/* 3D Frame Rotation */}
        <div 
          className="relative w-[340px] h-[190px] flex items-center justify-center transition-transform duration-100 ease-out"
          style={{ 
            transformStyle: "preserve-3d",
            transform: `rotateX(-12deg) rotateY(${rotationY}deg)` 
          }}
        >
          {flags.map((flag, idx) => {
            // Distribute flags evenly along the circle
            const angle = (idx * 360) / flags.length;
            const radius = 150; // Distance from center
            const isSelected = activeFlag === idx;

            return (
              <div
                key={flag.id}
                className="absolute w-[110px] h-[75px] cursor-pointer"
                onMouseEnter={() => handleFlagHover(idx)}
                onMouseLeave={() => handleFlagHover(null)}
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) rotateY(${-angle - rotationY}deg) ${
                    isSelected ? "scale(1.2) translateY(-15px)" : "scale(1)"
                  }`,
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s",
                  backfaceVisibility: "visible",
                  zIndex: isSelected ? 50 : 10
                }}
              >
                {/* Premium Ring Frame Card with Gold Trim */}
                <div className={`relative w-full h-full rounded-lg overflow-hidden border transition-all duration-300 ${
                  isSelected 
                    ? "border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.45)] ring-1 ring-[#D4AF37]/50" 
                    : "border-neutral-800 shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                } bg-[#0b0b0b]`}>
                  {/* Flag image inside */}
                  <div className="w-full h-full relative overflow-hidden">
                    {flag.svg}
                    
                    {/* Dark gradient gloss overlay simulating a curved 3D glass shielding */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-white/10" />
                    
                    {/* Waving flag physical effect animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent mix-blend-overlay animate-pulse" style={{ animationDuration: "2.5s" }} />

                    {/* Subtle outer gold inner-border */}
                    <div className="absolute inset-0.5 border border-white/5 rounded-md pointer-events-none" />
                  </div>

                  {/* Micro label bottom badge inside flag card */}
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/80 border border-neutral-900 rounded px-1.5 py-0.5 flex items-center justify-between">
                    <span className="text-[8px] font-bold text-[#F5E6D3] uppercase tracking-wide truncate">
                      {flag.name}
                    </span>
                    <Sparkles className="w-2 h-2 text-[#D4AF37] flex-shrink-0 ml-1" />
                  </div>
                </div>

                {/* Pedestal style pin helper */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-gradient-to-b from-neutral-800 to-transparent border-x border-neutral-900 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Descriptive Tooltip / Strategic Corridor Details */}
      <div className="w-full max-w-xl px-4 min-h-[110px]">
        <div className="bg-[#0b0b0b] border border-neutral-900/90 rounded-xl p-5 shadow-[0_4px_30px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col justify-center">
          {/* Subtle luxurious gold framing */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D4AF37]" />
          
          {activeFlag !== null ? (
            <motion.div
              key={activeFlag}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5"
            >
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <Navigation className="w-3.5 h-3.5 animate-bounce" />
                <h4 className="text-xs font-bold uppercase tracking-[0.18em]">
                  {flags[activeFlag].name} — {flags[activeFlag].description}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#F5E6D3]/85 font-serif italic leading-relaxed">
                {flags[activeFlag].details}
              </p>
            </motion.div>
          ) : (
            <div className="text-center py-2 space-y-1">
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-sans-ui flex items-center justify-center space-x-2">
                <Shield className="w-3 h-3 text-[#D4AF37]/50" />
                <span>
                  Hover over a country to analyze its strategic corridor
                </span>
              </p>
              <p className="text-xs text-neutral-600 font-light italic">
                Trustworthy intercontinental structuring to secure your elite capital.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
