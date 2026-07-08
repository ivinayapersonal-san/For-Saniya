import React, { useState } from "react";
import { Heart } from "lucide-react";

interface FinalStepProps {
  onForgive: () => void;
}

export const FinalStep: React.FC<FinalStepProps> = ({ onForgive }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveButton = () => {
    // Generate random offsets to make the button jump away from the cursor
    const rangeX = 140;
    const rangeY = 80;
    
    let newX = (Math.random() - 0.5) * rangeX * 2;
    let newY = (Math.random() - 0.5) * rangeY * 2;
    
    // Ensure it moves a minimum distance so it feels like it's actively running away
    if (Math.abs(newX - position.x) < 50) {
      newX += newX > 0 ? 60 : -60;
    }
    if (Math.abs(newY - position.y) < 40) {
      newY += newY > 0 ? 50 : -50;
    }

    setPosition({ x: newX, y: newY });
  };

  return (
    <div className="text-center py-6 space-y-6 animate-fade-in">
      {/* Cute Cat GIF with Neon Pink Glow */}
      <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.4)] bg-zinc-950 mx-auto flex items-center justify-center">
        <img 
          src="/5.gif" 
          alt="Cute Cat Verdict"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      <div className="space-y-4">
        <p className="text-lg font-bold text-pink-400 bg-pink-950/40 border border-pink-500/30 py-2 px-4 rounded-xl inline-block shadow-[0_0_15px_rgba(236,72,153,0.2)]">
          "Vinay is the biggest idiot."
        </p>
        
        {/* Heartfelt Letter Container */}
        <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4 text-left space-y-2 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]">
          <p className="text-xs font-bold text-pink-400 uppercase tracking-wider">Dear Saniya,</p>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Vinay knows he made a mistake, and he's genuinely sorry. You aren't just his best friend—you are someone he cares about deeply. He promises to take care of you, stand by you through everything, make you smile whenever he can, and never take your friendship for granted again. 🥹
          </p>
        </div>
      </div>

      {/* Two Buttons Container */}
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[100px] w-full mt-6 pt-2">
        {/* Forgive Vinay Button */}
        <button
          onClick={onForgive}
          className="w-full sm:w-auto flex-1 py-4 px-6 bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 text-white font-extrabold rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 text-lg z-10"
        >
          <Heart className="w-6 h-6 fill-current" />
          Forgive Vinay
        </button>

        {/* Runaway No Button */}
        <button
          onMouseEnter={moveButton}
          onTouchStart={moveButton}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: "transform 0.15s ease-out",
          }}
          className="w-full sm:w-auto flex-1 py-4 px-6 bg-zinc-900/90 hover:bg-zinc-800/90 text-zinc-300 font-extrabold rounded-2xl border-2 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)] select-none cursor-default z-20 transition-all duration-200"
        >
          No 😢
        </button>
      </div>
    </div>
  );
};