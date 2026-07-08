import React from "react";
import { HelpCircle, CheckCircle2, XCircle } from "lucide-react";

interface QuizStepProps {
  quizAnswer: string | null;
  quizMessage: string;
  onChoice: (choice: string) => void;
}

export const QuizStep: React.FC<QuizStepProps> = ({ quizAnswer, quizMessage, onChoice }) => {
  const options = [
    { id: "Someone Else", label: "Someone Else 🤷‍♀️", color: "hover:bg-amber-950/20 hover:border-amber-500/50 border-zinc-800 text-zinc-300" },
    { id: "Bad Luck", label: "Bad Luck 🍀", color: "hover:bg-blue-950/20 hover:border-blue-500/50 border-zinc-800 text-zinc-300" },
    { id: "Vinay", label: "Vinay 😭 (The Idiot)", color: "hover:bg-pink-950/20 hover:border-pink-500/50 border-pink-500/30 bg-pink-950/10 text-pink-300" }
  ];

  return (
    <div className="py-4 space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-purple-950/50 rounded-full flex items-center justify-center mx-auto text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">Who made Saniya angry?</h2>
        <p className="text-xs text-zinc-500">Select the prime suspect to proceed</p>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = quizAnswer === option.id;
          const isVinay = option.id === "Vinay";
          
          return (
            <button
              key={option.id}
              disabled={quizAnswer !== null}
              onClick={() => onChoice(option.id)}
              className={`w-full p-4 text-left rounded-2xl border-2 transition-all duration-200 flex items-center justify-between font-medium ${option.color} ${
                isSelected 
                  ? isVinay 
                    ? "border-green-500 bg-green-950/30 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
                    : "border-red-500 bg-red-950/30 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                  : "bg-zinc-900"
              }`}
            >
              <span>{option.label}</span>
              {isSelected && (
                isVinay ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                )
              )}
            </button>
          );
        })}
      </div>

      {quizMessage && (
        <div className={`p-3 rounded-xl text-center text-sm font-semibold animate-pulse ${
          quizAnswer === "Vinay" 
            ? "bg-green-950/50 text-green-400 border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]" 
            : "bg-red-950/50 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
        }`}>
          {quizMessage}
        </div>
      )}
    </div>
  );
};