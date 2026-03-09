import React from 'react';

interface EcoUrbisLogoProps {
    collapsed?: boolean;
}

export const EcoUrbisLogo: React.FC<EcoUrbisLogoProps> = ({ collapsed = false }) => {
    return (
        <div className="flex items-center gap-3 select-none transition-all duration-300">
            {/* Icon Badge */}
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Stylized Sun/Leaf - Common in environmental logos */}
                    <path
                        d="M50 20C65 20 80 35 80 50C80 65 65 80 50 80C35 80 20 65 20 50C20 35 35 20 50 20Z"
                        fill="#F68B1E" /* EcoUrbis Orange */
                    />
                    <path
                        d="M50 30C40 30 30 45 30 60C30 70 40 80 50 80C60 80 70 70 70 60C70 45 60 30 50 30Z"
                        fill="#009640" /* EcoUrbis Green */
                    />
                    <path
                        d="M50 40C55 40 60 50 60 60C60 65 55 70 50 70C45 70 40 65 40 60C40 50 45 40 50 40Z"
                        fill="white"
                    />
                </svg>
            </div>

            {/* Text Branding */}
            {!collapsed && (
                <div className="flex flex-col">
                    <span className="text-xl font-black tracking-tight leading-none">
                        <span className="text-[#009640]">Eco</span>
                        <span className="text-[#F68B1E]">Urbis</span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                        Ambiental S.A.
                    </span>
                </div>
            )}
        </div>
    );
};
