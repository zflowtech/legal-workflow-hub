import React from 'react';

interface ZFlowLogoProps {
  collapsed?: boolean;
}

export const ZFlowLogo: React.FC<ZFlowLogoProps> = ({ collapsed = false }) => {
  return (
    <div className="flex items-center gap-3 select-none transition-all duration-300">
      {/* Dynamic Z Logo Badge */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Geometric Background Shapes (Angular Z) */}
        <div className="absolute w-full h-full bg-[#1A1A1A] rounded-md shadow-lg overflow-hidden border border-white/10 group-hover:border-[#39FF14]/50 transition-colors">
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full p-1.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top Bar of Z */}
            <path
              d="M6 8H18"
              stroke="#39FF14"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]"
            />
            {/* Diagonal of Z */}
            <path
              d="M18 8L6 16"
              stroke="#39FF14"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]"
            />
            {/* Bottom Bar of Z */}
            <path
              d="M6 16H18"
              stroke="#39FF14"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]"
            />
          </svg>
        </div>
      </div>

      {/* Brand Name Text */}
      {!collapsed && (
        <div className="flex flex-col">
          <span className="text-xl font-bold text-white tracking-widest leading-none">
            Z<span className="text-[#39FF14]">FLOW</span>
          </span>
          <span className="text-[10px] font-medium text-white/50 tracking-[0.2em] uppercase mt-0.5">
            Legal Technology
          </span>
        </div>
      )}
    </div>
  );
};
