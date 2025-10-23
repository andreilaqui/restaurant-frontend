import React from "react";

function CircleIcon({ id, label, iconSrc }) {
  const pathId = `circlePath-${id}`;

  // // Shared base styles
  // const baseClasses =
  //   "absolute inset-0 rounded-full flex items-center justify-center transition";

  // // Theme variants
  // const themeClasses = "bg-white/20 backdrop-blur-md border border-white/30 shadow-lg dark:bg-sunrice-cream dark:shadow-[6px_6px_12px_rgba(0,0,0,0.2),-6px_-6px_12px_rgba(255,255,255,0.7)]";

  const twClass = `absolute inset-0 rounded-full flex items-center justify-center transition
    bg-white/80 backdrop-blur-md 
    border border-white/30 shadow-lg
    dark:bg-white/10 
    dark:border-white/10
    dark:shadow-[6px_6px_30px_rgba(0,0,0,0.4),-6px_-6px_12px_rgba(255,255,255,0.1)]
  `;

  return (
    <div className="relative w-24 h-24">
      {/* Circle background */}
      <div className={`${twClass}`}>
        {iconSrc && <img src={iconSrc} alt={label} className="w-20 h-20" />}
      </div>

      {/* SVG for circular text */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <defs>
          <path
            id={pathId}
            d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          />
        </defs>
        <text
          fill="#A8D5BA"
          fontSize="10"
          fontWeight="bold"
          letterSpacing="1.5"
        >
          <textPath href={`#${pathId}`} startOffset="33%" textAnchor="middle">
            {label.toUpperCase()}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export default CircleIcon;