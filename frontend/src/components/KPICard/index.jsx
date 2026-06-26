import React from 'react';

export default function KPICard({ title, value }) {
    //to generate gradient based on the title string length
    const accents = [
        { bg: "from-[#4F46E5] to-[#06B6D4]", icon: "text-[#4F46E5] dark:text-[#22D3EE]" },   // Indigo -> Cyan
        { bg: "from-[#7C3AED] to-[#22D3EE]", icon: "text-[#7C3AED] dark:text-[#22D3EE]" },  // Purple -> Cyan
        { bg: "from-[#3B82F6] to-[#8B5CF6]", icon: "text-[#3B82F6] dark:text-[#A855F7]" },  // Blue -> Violet
        { bg: "from-[#06B6D4] to-[#4F46E5]", icon: "text-[#06B6D4] dark:text-[#4F46E5]" }    // Cyan -> Indigo
    ];
    
    const styleIndex = (title?.length || 0) % accents.length;
    const currentAccent = accents[styleIndex];

    return (
        <div className="relative group flex-1 min-w-[200px] max-h-[220px]">
            {/*Hover Glow behind the card */}
            <div 
                className={`absolute -inset-0.5 bg-gradient-to-r ${currentAccent.bg} rounded-[1.5rem] blur-md opacity-0 group-hover:opacity-25 dark:group-hover:opacity-40 transition duration-500 ease-in-out pointer-events-none`} 
            />

            {/* Main Glass Container */}
            <div className="relative h-full bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(20,25,35,0.65)] backdrop-blur-[40px] border border-blue-500 shadow-sm dark:border-blue-400/30 rounded-[1.5rem] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.15)] group-hover:-translate-y-1 transition-transform duration-500 overflow-hidden">
                
                {/* Subtle top-left highlight*/}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-6">
                    
                    {/*Header Row: Icon Container */}
                    <div className="flex items-center justify-between">
                        {/*Icon Container */}
                        <div className={`relative w-12 h-12 rounded-[1rem] bg-gradient-to-br ${currentAccent.bg} p-[1px] shadow-sm`}>
                            <div className="w-full h-full bg-white dark:bg-[#0A0B0F] rounded-[15px] flex items-center justify-center relative overflow-hidden">
                                {/*inner tint */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${currentAccent.bg} opacity-[0.08] dark:opacity-20`} />
                                
                                {/*analytics icon */}
                                <div className={`relative z-10 ${currentAccent.icon}`}>
                                    <svg className="w-5 h-5 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/*data display*/}
                    <div className="flex flex-col gap-1">
                        <h4 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: 'Inter, SF Pro Display, sans-serif' }}>
                            {value}
                        </h4>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-0.5">
                            {title}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}