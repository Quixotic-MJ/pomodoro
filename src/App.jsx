import React, { useState, useRef, useEffect } from "react";

function MidnightEspressoPomodoro() {
    const [activeMode, setActiveMode] = useState("focus");
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [photo, setPhoto] = useState(null);
    const fileInputRef = useRef(null);

    //Settings Timer seconds
    const [focus, setFocus] = useState(25);
    const [short, setShort] = useState(5);
    const [long, setLong] = useState(15);

    //Temp timer seconds
    const [tempFocus, setTempFocus] = useState(focus);
    const [tempShort, setTempShort] = useState(short);
    const [tempLong, setTempLong] = useState(long);

    const [timeLeft, setTimeLeft] = useState(focus * 60);
    const [refresh, setRefresh] = useState(timeLeft);
    const [mode, setMode] = useState("focus");

    //Trigger
    const [start, setStart] = useState(false);

    //useEffect
    useEffect(() => {
        if (!start) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    setStart(false);
                    setTimeLeft(0);
                    return;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [start]);

    //Time Format Conversion
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formatTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    // SVG Circle Math
    const circleRadius = 90;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const progressOffset = circleCircumference - circleCircumference * 1;

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file));
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-[#0c0a09] flex items-center justify-center font-sans text-stone-200 overflow-hidden selection:bg-amber-900">
            {/* 1. AMBIENT CAFE GLOW */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-amber-600 rounded-full blur-[120px] opacity-20 pointer-events-none z-0"></div>

            {/* ========================================= */}
            {/* 2. BACKGROUND DECORATIONS (CATS & COFFEE) */}
            {/* ========================================= */}
            {/* Top Left: Peeking Cat */}
            <div className="absolute -top-8 -left-12 w-[22rem] h-[22rem] text-stone-800/30 -rotate-12 pointer-events-none hidden md:block z-0">
                <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M272.5 137.4c-22.3-10.4-53.5-12.2-83.3.4-30.8 13.1-55.8 41.6-67 80.2l-37.4 20.3c-14.7 8-19.6 26.5-10.6 40.2l12.9 19.5c8.3 12.6 25 16.4 38 8.6l31.4-18.8c18.5 25.4 47.9 44.2 82.5 50.1l.3 15.6c.3 16.8 14.1 30.2 30.9 30.2h16c16.8 0 30.4-13.6 30.4-30.4v-16.1c38.1-6 70.8-27.1 90.6-56.2l30.8 18.5c13 7.8 29.7 4 38-8.6l12.9-19.5c9-13.7 4.1-32.2-10.6-40.2l-36.8-20c-11.4-37.5-36.2-65.1-66.5-77.8-29.8-12.4-60.8-10.4-83 0zm-53.1 92.5c-11.3 0-20.4-9.1-20.4-20.4s9.1-20.4 20.4-20.4 20.4 9.1 20.4 20.4-9.1 20.4-20.4 20.4zm115.3 0c-11.3 0-20.4-9.1-20.4-20.4s9.1-20.4 20.4-20.4 20.4 9.1 20.4 20.4-9.1 20.4-20.4 20.4z" />
                </svg>
            </div>
            {/* Bottom Right: Coffee Cup */}
            <div className="absolute -bottom-10 -right-10 w-[24rem] h-[24rem] text-amber-900/20 rotate-12 pointer-events-none hidden md:block z-0">
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M19 8H5V14C5 17.31 7.69 20 11 20H13C16.31 20 19 17.31 19 14V8ZM21 8H20V14C20 18.42 16.42 22 12 22C7.58 22 4 18.42 4 14V8H3C2.45 8 2 7.55 2 7V5C2 4.45 2.45 4 3 4H21C21.55 4 22 4.45 22 5V7C22 7.55 21.55 8 21 8ZM18 2H6C5.45 2 5 2.45 5 3C5 3.55 5.45 4 6 4H18C18.55 4 19 3.55 19 3C19 2.45 18.55 2 18 2Z" />
                    <path d="M8 2.5C8 1.67 8.67 1 9.5 1C10.33 1 11 1.67 11 2.5V3.5C11 4.33 10.33 5 9.5 5C8.67 5 8 4.33 8 3.5V2.5ZM13 2.5C13 1.67 13.67 1 14.5 1C15.33 1 16 1.67 16 2.5V3.5C16 4.33 15.33 5 14.5 5C13.67 5 13 4.33 13 3.5V2.5Z" />
                </svg>
            </div>
            {/* Floating Beans */}
            <div className="absolute top-32 right-32 w-10 h-14 text-amber-800/30 rotate-45 z-0 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-br from-amber-800/40 to-amber-900/30 rounded-[50%] rounded-tl-[60%] rounded-br-[60%] shadow-inner relative">
                    <div className="absolute inset-0 m-auto w-full h-[2px] bg-[#0c0a09] rounded-full rotate-12 opacity-60"></div>
                </div>
            </div>
            <div className="absolute bottom-40 left-40 w-12 h-16 text-amber-800/30 -rotate-12 z-0 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-br from-amber-800/40 to-amber-900/30 rounded-[50%] rounded-tl-[60%] rounded-br-[60%] shadow-inner relative">
                    <div className="absolute inset-0 m-auto w-full h-[2px] bg-[#0c0a09] rounded-full -rotate-12 opacity-60"></div>
                </div>
            </div>

            {/* ========================================= */}
            {/* 3. MAIN APP CARD                          */}
            {/* ========================================= */}
            <div className="relative z-10 w-[22rem] h-[36rem] bg-[#110e0d] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-stone-800/80 p-6 flex flex-col overflow-hidden">
                {/* --- TIMER VIEW --- */}
                <div
                    className={`flex flex-col h-full w-full transition-opacity duration-300 ${isSettingsOpen ? "opacity-30 blur-sm pointer-events-none" : "opacity-100"}`}
                >
                    {/* Top Mode Selectors */}
                    <div className="flex w-full bg-[#1c1715] p-1 rounded-xl mb-6 border border-stone-800/50">
                        <button
                            onClick={() => {
                                setActiveMode("focus");
                                setMode("focus");
                                setTimeLeft(focus * 60);
                                setStart(false);
                            }}
                            className={`flex-1 text-[10px] py-2 rounded-lg font-bold uppercase tracking-wider transition-all ${activeMode === "focus" ? "bg-amber-600/20 text-amber-500 shadow-sm border border-amber-500/30" : "text-stone-500 hover:text-stone-300"}`}
                        >
                            Focus
                        </button>
                        <button
                            onClick={() => {
                                setActiveMode("shortBreak");
                                setMode("short");
                                setTimeLeft(short * 60);
                                setStart(false);
                            }}
                            className={`flex-1 text-[10px] py-2 rounded-lg font-bold uppercase tracking-wider transition-all ${activeMode === "shortBreak" ? "bg-amber-600/20 text-amber-500 shadow-sm border border-amber-500/30" : "text-stone-500 hover:text-stone-300"}`}
                        >
                            Short
                        </button>
                        <button
                            onClick={() => {
                                setActiveMode("longBreak");
                                setMode("long");
                                setTimeLeft(long * 60);
                                setStart(false);
                            }}
                            className={`flex-1 text-[10px] py-2 rounded-lg font-bold uppercase tracking-wider transition-all ${activeMode === "longBreak" ? "bg-amber-600/20 text-amber-500 shadow-sm border border-amber-500/30" : "text-stone-500 hover:text-stone-300"}`}
                        >
                            Long
                        </button>
                    </div>

                    {/* Separated Photo Uploader & Premium Placeholder */}
                    <div
                        onClick={() => fileInputRef.current.click()}
                        className="w-full h-32 mb-6 rounded-2xl bg-[#1c1715] flex flex-col items-center justify-center cursor-pointer group overflow-hidden border border-stone-800/80 relative shrink-0 transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(255,107,74,0.05)] hover:shadow-[0_0_30px_rgba(255,107,74,0.15)]"
                    >
                        {photo ? (
                            <>
                                <img
                                    src={photo}
                                    alt="background blur"
                                    className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-110 pointer-events-none"
                                />
                                <img
                                    src={photo}
                                    alt="Focus motivation"
                                    className="relative z-10 w-full h-full object-contain opacity-90 drop-shadow-lg"
                                />
                                <div className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-amber-500 text-[9px] uppercase tracking-widest font-bold drop-shadow-md">
                                        Swap Image
                                    </span>
                                </div>
                            </>
                        ) : (
                            /* NEW ABSTRACT SUNSET/MOUNTAIN PLACEHOLDER */
                            <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-[#ff6b4a] via-[#f84c4c] to-[#1a1210]">
                                {/* Intense glowing mesh behind the sun */}
                                <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-300 rounded-full blur-[40px] opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"></div>

                                {/* The Sun / Light Orb */}
                                <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.8)] z-10 group-hover:shadow-[0_0_40px_rgba(255,255,255,1)] transition-shadow duration-500"></div>

                                {/* Abstract Mountains (CSS Geometric Shapes) */}
                                <div className="absolute -bottom-10 left-0 right-0 h-24 flex justify-center z-20">
                                    <div className="w-24 h-24 bg-[#2a1d1a] rotate-45 translate-x-6 shadow-[-5px_-5px_15px_rgba(0,0,0,0.4)] group-hover:-translate-y-1 transition-transform duration-700 ease-out"></div>
                                    <div className="w-28 h-28 bg-[#160f0d] rotate-45 -translate-x-6 shadow-[-10px_-10px_20px_rgba(0,0,0,0.5)] group-hover:-translate-y-2 transition-transform duration-700 ease-out delay-75"></div>
                                </div>

                                {/* Subtle overlay text on hover */}
                                <div className="absolute inset-0 z-30 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
                                    <span className="text-white text-[9px] uppercase tracking-[0.2em] font-bold drop-shadow-md">
                                        Add Inspiration
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />

                    {/* Middle / Timer Ring */}
                    <div className="relative flex-1 flex items-center justify-center w-full mb-6 mt-2">
                        <svg className="absolute w-[200px] h-[200px] transform -rotate-90 z-10 pointer-events-none">
                            <circle
                                cx="100"
                                cy="100"
                                r={circleRadius}
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="transparent"
                                className="text-stone-800/30"
                            />
                            <circle
                                cx="100"
                                cy="100"
                                r={circleRadius}
                                stroke="currentColor"
                                strokeWidth="5"
                                fill="transparent"
                                strokeDasharray={circleCircumference}
                                strokeDashoffset={progressOffset}
                                strokeLinecap="round"
                                className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] transition-all duration-1000 ease-in-out"
                            />
                        </svg>

                        <div className="relative z-20 flex flex-col items-center">
                            <h1 className="text-5xl font-semibold text-stone-100 tracking-tight drop-shadow-md">
                                {formatTime}
                            </h1>
                        </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="flex items-center justify-between w-full px-1 mt-auto z-30 gap-2">
                        <button
                            onClick={() => {
                                setTimeLeft(refresh);
                                setStart(false);
                            }}
                            className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-stone-300 hover:bg-stone-800 transition-all active:scale-95"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                            </svg>
                        </button>

                        <div className="flex gap-2 flex-1">
                            <button
                                onClick={() => setStart((prev) => !prev)}
                                className="flex-1 bg-amber-600/10 text-amber-500 py-3 rounded-2xl text-xs font-bold tracking-widest uppercase hover:bg-amber-600/20 transition-all border border-amber-600/30 shadow-[0_0_15px_rgba(217,119,6,0.1)] active:scale-95"
                            >
                                {start ? "Pause" : "Play"}
                            </button>
                        </div>

                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="w-12 h-12 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 hover:text-stone-300 hover:bg-stone-800 transition-all active:scale-95"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* --- SETTINGS MODAL OVERLAY --- */}
                {isSettingsOpen && (
                    <div className="absolute inset-0 z-50 flex items-end justify-center p-2 animate-slide-up">
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                            onClick={() => setIsSettingsOpen(false)}
                        ></div>
                        <div className="relative w-full bg-[#161211] border border-stone-800 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[90%] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-stone-100 font-bold tracking-tight text-lg">
                                    Settings (Version 1 by JM)
                                </h2>
                                <button
                                    onClick={() => setIsSettingsOpen(false)}
                                    className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-500 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="flex bg-stone-950 p-1 rounded-xl mb-6 border border-stone-800/50">
                                <button className="flex-1 bg-stone-800 text-stone-200 text-[10px] uppercase tracking-widest py-2 rounded-lg font-bold shadow-sm">
                                    Duration
                                </button>
                                <button className="flex-1 text-stone-500 text-[10px] uppercase tracking-widest py-2 rounded-lg font-bold hover:text-stone-300 transition-colors">
                                    Alerts (Not yet implemented)
                                </button>
                            </div>

                            {/* Input Fields */}
                            <div className="flex flex-col space-y-4">
                                {/* Focus Time Input */}
                                <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/50 border border-stone-800/30">
                                    <span className="text-xs font-medium text-stone-400 uppercase tracking-tighter">
                                        Focus Time
                                    </span>
                                    <div className="flex items-center bg-stone-900 rounded-lg px-2 border border-stone-800">
                                        <input
                                            type="number"
                                            defaultValue={focus}
                                            onChange={(e) =>
                                                setTempFocus(
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="w-10 bg-transparent py-1 text-center text-stone-100 font-mono focus:outline-none text-sm"
                                        />
                                        <span className="text-[10px] text-stone-600 font-bold uppercase">
                                            m
                                        </span>
                                    </div>
                                </div>

                                {/* Short Break Input */}
                                <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/50 border border-stone-800/30">
                                    <span className="text-xs font-medium text-stone-400 uppercase tracking-tighter">
                                        Short Break
                                    </span>
                                    <div className="flex items-center bg-stone-900 rounded-lg px-2 border border-stone-800">
                                        <input
                                            type="number"
                                            defaultValue={short}
                                            onChange={(e) =>
                                                setTempShort(
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="w-10 bg-transparent py-1 text-center text-stone-100 font-mono focus:outline-none text-sm"
                                        />
                                        <span className="text-[10px] text-stone-600 font-bold uppercase">
                                            m
                                        </span>
                                    </div>
                                </div>

                                {/* Long Break Input */}
                                <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950/50 border border-stone-800/30">
                                    <span className="text-xs font-medium text-stone-400 uppercase tracking-tighter">
                                        Long Break
                                    </span>
                                    <div className="flex items-center bg-stone-900 rounded-lg px-2 border border-stone-800">
                                        <input
                                            type="number"
                                            defaultValue={long}
                                            onChange={(e) =>
                                                setTempLong(
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="w-10 bg-transparent py-1 text-center text-stone-100 font-mono focus:outline-none text-sm"
                                        />
                                        <span className="text-[10px] text-stone-600 font-bold uppercase">
                                            m
                                        </span>
                                    </div>
                                </div>

                                <hr className="border-stone-800/50 my-2" />

                                {/* Sound Notification Toggle */}
                                <div className="flex items-center justify-between p-3">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-stone-200 uppercase tracking-widest">
                                            Alert Sounds
                                        </span>
                                        <span className="text-[10px] text-stone-500">
                                            COMING SOON
                                        </span>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            defaultChecked
                                        />
                                        <div className="w-9 h-5 bg-stone-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-stone-400 after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600 peer-checked:after:bg-white"></div>
                                    </label>
                                </div>
                            </div>

                            {/* Save Button */}
                            <button
                                onClick={() => {
                                    setFocus(tempFocus ? tempFocus : focus);
                                    setShort(tempShort ? tempShort : short);
                                    setLong(tempLong ? tempLong : long);

                                    let newTime;
                                    if (activeMode === "focus") {
                                        newTime = tempFocus * 60;
                                    } else if (activeMode === "shortBreak") {
                                        newTime = tempShort * 60;
                                    } else {
                                        newTime = tempLong * 60;
                                    }

                                    setTimeLeft(newTime);
                                    setRefresh(newTime);

                                    setStart(false);
                                    setIsSettingsOpen(false);
                                }}
                                className="mt-8 w-full bg-amber-600 text-[#161211] py-3 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-amber-900/20 active:scale-95 transition-transform"
                            >
                                Apply Changes
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
        </div>
    );
}

export default MidnightEspressoPomodoro;
