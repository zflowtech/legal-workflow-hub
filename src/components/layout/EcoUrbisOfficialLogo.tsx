import React from 'react';

export const EcoUrbisOfficialLogo: React.FC<{ collapsed?: boolean }> = ({ collapsed = false }) => {
    return (
        <div className={`flex items-center select-none transition-all duration-300 ${collapsed ? 'justify-center' : ''}`}>
            <div className="relative flex items-center shrink-0">
                <svg
                    viewBox="0 0 400 160"
                    className={`transition-all duration-300 ${collapsed ? 'w-10 h-10' : 'w-52'}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* ECO - Top Left */}
                    {!collapsed && (
                        <text
                            x="20"
                            y="65"
                            fontFamily="Arial Black, Arial, sans-serif"
                            fontSize="64"
                            fontWeight="900"
                            fill="black"
                        >
                            ECO
                        </text>
                    )}

                    {/* The Official Wave / Swoosh */}
                    <path
                        d="M20 120 C 150 120, 200 40, 380 40"
                        stroke="url(#officialGradient)"
                        strokeWidth="32"
                        fill="none"
                        strokeLinecap="butt"
                    />

                    <defs>
                        <linearGradient id="officialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1B6DB3" /> {/* Blue */}
                            <stop offset="45%" stopColor="#1B6DB3" />
                            <stop offset="55%" stopColor="#69B43F" /> {/* Green */}
                            <stop offset="100%" stopColor="#69B43F" />
                        </linearGradient>
                    </defs>

                    {/* URBIS - Bottom Right */}
                    {!collapsed && (
                        <text
                            x="200"
                            y="135"
                            fontFamily="Arial Black, Arial, sans-serif"
                            fontSize="64"
                            fontWeight="900"
                            fill="black"
                        >
                            URBIS
                        </text>
                    )}
                </svg>
            </div>
        </div>
    );
};
