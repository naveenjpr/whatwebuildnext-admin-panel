import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#08101f] overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 blur-[120px] rounded-full" />

            <div className="relative flex flex-col items-center">
                {/* Animated Rocket Icon Container */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-fuchsia-500 blur-2xl opacity-20 animate-pulse" />
                    <div className="relative w-20 h-20 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl">
                        <svg
                            className="w-10 h-10 text-white animate-bounce"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12.9 2.6c2.3.2 4.1 2 4.3 4.3.2 2.3-.8 5.2-3 7.4l-1.2 1.2-5.2-5.2 1.2-1.2c2.2-2.2 5.1-3.2 7.4-3Z"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.1 10.3l-3.6 1.2c-.6.2-1 .7-1.1 1.3L3 16.9l4.1-.4c.6-.1 1.1-.5 1.3-1.1l1.2-3.6"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Loading Text & Spinner */}
                <div className="flex flex-col items-center gap-3">
                    <div className="text-white text-xl font-bold tracking-[0.2em] uppercase opacity-90">
                        WWBN <span className="text-indigo-400">Admin</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full animate-bounce" />
                    </div>

                    <div className="text-white/40 text-[10px] font-mono tracking-widest mt-2">
                        SYSTEM INITIALIZING...
                    </div>
                </div>
            </div>

            {/* Decorative Progress Bar Background */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                <div className="h-full bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-500 w-1/3 animate-[loading_2s_infinite_ease-in-out]" />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}} />
        </div>
    );
};

export default Loading;
