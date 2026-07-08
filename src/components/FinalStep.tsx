import React, { useState } from "react";
import { Heart } from "lucide-react";

interface FinalStepProps {
  onForgive: () => void;
}

export const FinalStep: React.FC<FinalStepProps> = ({ onForgive }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveButton = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent any default click behavior
    e.preventDefault();
    
    // Generate a much larger random offset so it jumps completely out of reach instantly
    const rangeX = 180;
    const rangeY = 120;
    
    // Generate new coordinates
    let newX = (Math.random() - 0.5) * rangeX * 2;
    let newY = (Math.random() - 0.5) * rangeY * 2;
    
    // Ensure a minimum jump distance so it doesn't just wiggle in place
    if (Math.abs(newX - position.x) < 80) {
      newX += newX > 0 ? 100 : -100;
    }
    if (Math.abs(newY - position.y) < 60) {
      newY += newY > 0 ? 80 : -80;
    }

    setPosition({ x: newX, y: newY });
  };

  return (
    <div className="text-center py-6 space-y-6 animate-fade-in">
      <div className="w-20 h-20 bg-amber-950/30 rounded-full flex items-center justify-center mx-auto border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
        <span className="text-4xl">🤦‍♂️</span>
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1 bg-amber-950/50 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
          Investigation Complete
        </div>
        <h2 className="text-2xl font-extrabold text-white drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]">Verdict</h2>
        <p className="text-lg font-bold text-pink-400 bg-pink-950/40 border border-pink-500/30 py-2 px-4 rounded-xl inline-block shadow-[0_0_15px_rgba(236,72,153,0.2)]">
          "Vinay is the biggest idiot."
        </p>
        <p className="text-sm text-zinc-400 px-4 pt-2">
          He is extremely sorry for being a dummy and promises to make it up to you with infinite chocolates and smiles.
        </p>
      </div>

      {/* Two Buttons Container */}
      <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[120px] w-full mt-6 pt-2">
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
          onMouseMove={moveButton}
          onTouchStart={moveButton}
          onClick={(e) => e.preventDefault()}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: "transform 0.05s ease-out", // Ultra-fast transition to prevent hover/click
          }}
          className="w-full sm:w-auto flex-1 py-4 px-6 bg-zinc-900/90 hover:bg-zinc-800/90 text-zinc-300 font-extrabold rounded-2xl border-2 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)] select-none cursor-default z-20 transition-all duration-200"
        >
          No 😢
        </button>
      </div>
    </div>
  );
};