import React from 'react';

export default function Navbar({ toggleTheme, isDarkMode }) {
    return (
        <nav className="sticky top-0 z-50 w-full h-[72px] flex items-center justify-between px-6 lg:px-8 bg-[#4F46E5]/10 dark:bg-[rgba(20,25,35,0.65)] backdrop-blur-[40px] border-b border-white/60 dark:border-[rgba(255,255,255,0.08)] shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-colors duration-500">
            
            {/*absolute top glow */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#4F46E5]/30 dark:via-[#7C3AED]/30 to-transparent pointer-events-none" />

            {/* Logo Area */}
            <div className="flex items-center gap-3 cursor-pointer group z-10">
                {/*logo Mark */}
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] dark:from-[#7C3AED] dark:to-[#22D3EE] p-[1.5px] shadow-lg group-hover:shadow-[0_0_15px_rgba(79,70,229,0.4)] dark:group-hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all duration-300">
                    <div className="w-full h-full bg-white dark:bg-[#0A0B0F] rounded-[10.5px] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] dark:from-[#7C3AED] dark:to-[#22D3EE] opacity-10 dark:opacity-20" />
                        <span className="text-[#4F46E5] dark:text-[#22D3EE] font-extrabold text-lg leading-none z-10 font-sans tracking-tighter group-hover:scale-110 transition-transform duration-300">
                            A
                        </span>
                    </div>
                </div>
                {/*application name*/}
                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5" style={{ fontFamily: 'Inter, SF Pro Display, sans-serif' }}>
                    Analytics
                    <span className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] dark:from-[#7C3AED] dark:to-[#22D3EE] bg-clip-text text-transparent">
                        Pro
                    </span>
                </span>
            </div>

            {/*theme toggle */}
            <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-[rgba(255,255,255,0.8)] dark:hover:bg-[rgba(255,255,255,0.1)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 dark:focus:ring-[#22D3EE]/50 shadow-sm"
                aria-label="Toggle Theme"
            >
                {isDarkMode ? (
                    <svg className="w-5 h-5 transition-transform hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                ) : (
                    <svg className="w-5 h-5 transition-transform hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                )}
            </button>
            
        </nav>
    );
}