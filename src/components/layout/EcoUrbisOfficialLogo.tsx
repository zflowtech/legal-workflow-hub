import React from 'react';

export const EcoUrbisOfficialLogo: React.FC<{ collapsed?: boolean }> = ({ collapsed = false }) => {
    return (
        <div className="flex items-center gap-3 select-none">
            <div className="relative h-10 flex items-center shrink-0">
                {/* Official Swoosh Logo */}
                <svg
                    viewBox="0 0 240 80"
                    className={`transition-all duration-300 ${collapsed ? 'w-12' : 'w-44'}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* The Teal Swoosh */}
                    <path
                        d="M10 45 C 10 30, 40 10, 100 20 S 160 50, 230 40"
                        stroke="url(#tealGradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <defs>
                        <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00A99D" />
                            <stop offset="100%" stopColor="#7AC943" />
                        </linearGradient>
                    </defs>

                    {/* URBIS Text */}
                    {!collapsed && (
                        <text
                            x="50"
                            y="60"
                            fontFamily="Arial, sans-serif"
                            fontSize="44"
                            fontWeight="900"
                            fill="#4D4D4D"
                            letterSpacing="-2"
                        >
                            URBIS
                        </text>
                    )}
                </svg>
            </div>

            {!collapsed && (
                <div className="flex flex-col border-l border-border pl-3 h-8 justify-center">
                    <span className="text-[10px] font-bold text-[#009640] leading-none uppercase tracking-tighter">
                        Jurídico
                    </span>
                    <span className="text-[10px] font-bold text-[#F68B1E] leading-none uppercase tracking-tighter mt-0.5">
                        Estratégico
                    </span>
                </div>
            )}
        </div>
    );
};
