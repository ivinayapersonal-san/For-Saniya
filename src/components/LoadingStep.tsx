import React from "react";
import { Search } from "lucide-react";

interface LoadingStepProps {
  progress: number;
  loadingText: string;
}

export const LoadingStep: React.FC<LoadingStepProps> = ({ progress, loadingText }) => {
  return (
    <div className="text-center py-4 space-y-5 animate-fade-in">
      {/* Fast-loading Direct Cat GIF with Neon Scanner Overlay */}
      <div className="w-full max-w-[320px] aspect-[1.79/1] rounded-2xl overflow-hidden border-2 border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)] bg-zinc-950 relative mx-auto flex items-center justify-center">
        <img 
          src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" 
          alt="Cute scanning cat"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Scanning line effect */}
        <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-90 animate-scan shadow-[0_0_12px_rgba(236,72,153,1)]"></div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2 drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">
          <Search className="w-5 h-5 text-pink-400 animate-bounce" />
          Scanning Saniya's Mood...
        </h2>
        <p className="text-sm text-zinc-400 min-h-[48px] px-4 transition-all duration-300">
          {loadingText}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden border border-pink-500/20">
          <div 
            className="bg-gradient-to-r from-pink-500 to-fuchsia-500 h-full rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(236,72,153,0.5)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right text-xs font-bold text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">
          {progress}%
        </div>
      </div>
    </div>
  );
};