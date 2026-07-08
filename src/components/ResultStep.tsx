import React from "react";
import { AlertTriangle, Sparkles } from "lucide-react";

interface ResultStepProps {
  onNext: () => void;
}

export const ResultStep: React.FC<ResultStepProps> = ({ onNext }) => {
  return (
    <div className="text-center py-6 space-y-6 animate-fade-in">
      {/* Angry Mochi Peach Cat GIF with Neon Red Glow */}
      <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] bg-zinc-950 mx-auto flex items-center justify-center">
        <img 
          src="https://media.tenor.com/y265Rt6S76wAAAAC/mochi-peach-cat-angry.gif" 
          alt="Angry Mochi Peach Cat"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-red-950/50 text-red-400 px-3 py-1 rounded-full text-xs font-semibold border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
          <AlertTriangle className="w-3.5 h-3.5" />
          Critical Alert
        </div>
        <h2 className="text-2xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">Angry Detected.</h2>
        <p className="text-sm text-zinc-400 px-4">
          Saniya's mood levels are currently in the danger zone. Immediate investigation is required to restore peace.
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3.5 px-6 bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 text-white font-bold rounded-2xl shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        Run Investigation
      </button>
    </div>
  );
};