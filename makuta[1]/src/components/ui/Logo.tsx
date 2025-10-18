"use client";

import React from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", width, height }) => {
  return (
    <div className={className} style={{ width, height }}>
      <svg 
        viewBox="0 0 420 152" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
      >
        <text x="10" y="100" fontSize="42" fontFamily="Arial, sans-serif" fontWeight="bold" fill="currentColor">
          MAKUTA
        </text>
        <text x="10" y="130" fontSize="16" fontFamily="Arial, sans-serif" fill="currentColor">
          Admin Portal
        </text>
      </svg>
    </div>
  );
};

export default Logo;
