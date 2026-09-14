"use client";

import React from "react";

const AudioWave = ({ isPlaying }) => {
  // We've moved the styles to a standard <style> tag to ensure they work in any React setup
  return (
    <div className="flex items-center justify-center" style={{ width: '32px', height: '32px' }}>
      <svg
        viewBox="0 0 50 38.05"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        <style>
          {`
            .wave-bar {
              transform-origin: center;
              transition: fill 0.3s ease;
            }
            @keyframes pulse-wave {
              0%, 100% { transform: scaleY(1); }
              50% { transform: scaleY(0.4); }
            }
            .animate-pulse-wave {
              animation: pulse-wave 1s infinite ease-in-out;
            }
          `}
        </style>
        {[...Array(9)].map((_, i) => (
          <path
            key={i}
            d={getPathData(i + 1)}
            fill={isPlaying ? "#cdb98e" : "#6f6659"}
            className={`wave-bar ${isPlaying ? "animate-pulse-wave" : ""}`}
            style={{
              animationDelay: isPlaying ? `${(i + 1) * 0.1}s` : "0s",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const getPathData = (id) => {
  const paths = {
    1: "M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0V16a1,1,0,0,0-1-1H0.91Z",
    2: "M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0V10A1,1,0,0,0,7,9H6.91Z",
    3: "M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0V1a1,1,0,0,0-1-1H12.91Z",
    4: "M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0V11a1,1,0,0,0-1-1H18.91Z",
    5: "M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0V16a1,1,0,0,0-1-1H24.91Z",
    6: "M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0V11a1,1,0,0,0-1-1H30.91Z",
    7: "M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0V1a1,1,0,0,0-1-1H36.91Z",
    8: "M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0V10a1,1,0,0,0-1-1H42.91Z",
    9: "M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0V16a1,1,0,0,0-1-1H48.91Z",
  };
  return paths[id];
};

export default AudioWave;