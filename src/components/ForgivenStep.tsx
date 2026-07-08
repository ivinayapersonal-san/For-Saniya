import React from "react";

interface ForgivenStepProps {
  onRestart: () => void;
}

export const ForgivenStep: React.FC<ForgivenStepProps> = ({ onRestart }) => {
  return (
    <div className="text-center py-8 space-y-6 animate-fade-in">
      {/* Celebration Cat GIF with Neon Pink Glow replacing the heart icon */}
      <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.4)] bg-zinc-950 mx-auto flex items-center justify-center">
        <img 
          src="/6.gif" 
          alt="Friendship Restored Celebration"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-extrabold text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">
          Friendship Restored Successfully ❤️
        </h2>
        <p className="text-sm text-zinc-300 px-4">
          The system is back to 100% harmony. Vinay has been successfully forgiven and is officially out of the doghouse!
        </p>
      </div>

      <div className="bg-pink-950/30 border border-pink-500/30 p-4 rounded-2xl shadow-[0_0_15px_rgba(236,72,153,0.1)]">
        <p className="text-lg font-bold text-pink-300 drop-shadow-[0_0_5px_rgba(236,72,153,0.4)]">
          Thank you, Saniya. ❤️
        </p>
        <p className="text-xs text-pink-400/80 mt-1">
          You are the absolute best best-friend ever!
        </p>
      </div>

      <button
        onClick={onRestart}
        className="text-xs text-zinc-500 hover:text-pink-400 underline transition-colors"
      >
        Restart Scanner
      </button>
    </div>
  );
};