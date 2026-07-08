import React from "react";
import { RefreshCw, XCircle, Brain, CheckCircle2 } from "lucide-react";

interface DiagnosticsStepProps {
  diagnosticStep: number;
}

export const DiagnosticsStep: React.FC<DiagnosticsStepProps> = ({ diagnosticStep }) => {
  return (
    <div className="py-6 space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-pink-950/50 rounded-full flex items-center justify-center mx-auto text-pink-400 border border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.3)] animate-spin">
          <RefreshCw className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]">Running Diagnostics...</h2>
        <p className="text-xs text-zinc-500">Analyzing system logs and brain activity</p>
      </div>

      {/* Diagnostic Cat GIF with Neon Pink Glow */}
      <div className="w-48 h-48 rounded-2xl overflow-hidden border-2 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.4)] bg-zinc-950 mx-auto flex items-center justify-center">
        <img 
          src="/4.gif" 
          alt="Diagnostic Cat"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      <div className="space-y-4 bg-zinc-950 p-4 rounded-2xl border border-pink-500/20 font-mono text-xs shadow-[inset_0_0_10px_rgba(0,0,0,0.6)]">
        {/* Diagnostic Item 1 */}
        <div className={`flex items-start justify-between gap-2 transition-all duration-500 ${
          diagnosticStep >= 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
        }`}>
          <span className="text-zinc-400">🔍 Searching for excuses...</span>
          {diagnosticStep >= 1 && (
            <span className="text-red-400 font-bold flex items-center gap-1 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
              <XCircle className="w-3.5 h-3.5" /> None found
            </span>
          )}
        </div>

        {/* Diagnostic Item 2 */}
        <div className={`flex items-start justify-between gap-2 transition-all duration-500 ${
          diagnosticStep >= 2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
        }`}>
          <span className="text-zinc-400">🧠 Searching for Vinay's brain...</span>
          {diagnosticStep >= 2 && (
            <span className="text-red-400 font-bold flex items-center gap-1 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
              <Brain className="w-3.5 h-3.5" /> Offline during incident
            </span>
          )}
        </div>

        {/* Diagnostic Item 3 */}
        <div className={`flex items-start justify-between gap-2 transition-all duration-500 ${
          diagnosticStep >= 3 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
        }`}>
          <span className="text-zinc-400">💡 Searching for solution...</span>
          {diagnosticStep >= 3 && (
            <span className="text-green-400 font-bold flex items-center gap-1 drop-shadow-[0_0_5px_rgba(34,197,94,0.5)]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Say Sorry ASAP
            </span>
          )}
        </div>
      </div>
    </div>
  );
};