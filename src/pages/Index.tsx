import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  Heart, 
  Sparkles, 
  AlertTriangle, 
  Search, 
  Brain, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Activity,
  RefreshCw
} from "lucide-react";
import { playClickSound, playErrorSound, playSuccessSound, playPopSound } from "@/utils/sounds";

type Step = "loading" | "result" | "quiz" | "diagnostics" | "final" | "forgiven";

const Index = () => {
  const [step, setStep] = useState<Step>("loading");
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing Mood Scanner...");
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizMessage, setQuizMessage] = useState("");
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  const [hearts, setHearts] = useState<{ id: number; left: number; delay: number; size: number }[]>([]);

  // 1. Loading Screen Progress (Configured to take exactly 10 seconds)
  useEffect(() => {
    if (step !== "loading") return;

    const texts = [
      "Initializing Mood Scanner...",
      "Connecting to Saniya's vibe database...",
      "Analyzing facial micro-expressions...",
      "Measuring silence decibels...",
      "Scanning WhatsApp reply speed...",
      "Checking eye-roll frequency...",
      "Warning: High levels of anger detected...",
      "Checking if Vinay did something stupid (99.9% probability)...",
      "Analyzing sigh decibels...",
      "Calibrating apology parameters...",
      "Calculating chocolate compensation requirements...",
      "Finalizing diagnostic report..."
    ];

    const duration = 10000; // 10 seconds
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      
      setProgress(currentProgress);

      // Update text based on progress
      const textIndex = Math.min(
        Math.floor((currentProgress / 100) * texts.length),
        texts.length - 1
      );
      setLoadingText(texts[textIndex]);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          playErrorSound();
          setStep("result");
        }, 800);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [step]);

  // 2. Diagnostics Step Auto-advancing
  useEffect(() => {
    if (step !== "diagnostics") return;

    const interval = setInterval(() => {
      setDiagnosticStep((prev) => {
        if (prev < 3) {
          playClickSound();
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            playSuccessSound();
            setStep("final");
          }, 1500);
          return prev;
        }
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [step]);

  // Handle Quiz Button Clicks
  const handleQuizChoice = (choice: string) => {
    playClickSound();
    setQuizAnswer(choice);

    if (choice === "Vinay") {
      setQuizMessage("🎯 Correct! Vinay is 100% responsible.");
      setTimeout(() => {
        playSuccessSound();
        setStep("diagnostics");
      }, 2000);
    } else {
      playErrorSound();
      setQuizMessage(`❌ Incorrect! "${choice}" is innocent. Try again!`);
      // Reset after a short delay to let them choose again
      setTimeout(() => {
        setQuizAnswer(null);
        setQuizMessage("");
      }, 1800);
    }
  };

  // Handle Forgive Button Click
  const handleForgive = () => {
    playPopSound();
    setTimeout(() => {
      playSuccessSound();
    }, 200);
    
    setStep("forgiven");

    // Trigger beautiful confetti
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff007f", "#ff66b2", "#ff00ff", "#b300b3"]
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff007f", "#ff66b2", "#ff00ff", "#b300b3"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Generate floating hearts
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 20 + 15
    }));
    setHearts(newHearts);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans selection:bg-pink-500 selection:text-white">
      
      {/* Neon Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full filter blur-[120px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full filter blur-[120px] animate-pulse delay-1000 pointer-events-none"></div>

      {/* Main Container with Neon Pink Glow */}
      <div className="w-full max-w-md bg-zinc-900/90 backdrop-blur-xl border-2 border-pink-500 rounded-3xl shadow-[0_0_30px_rgba(236,72,153,0.3)] p-6 md:p-8 relative z-10 transition-all duration-500 transform hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)]">
        
        {/* Header / Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-pink-950/50 p-2 rounded-full border border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.2)]">
            <Activity className="w-5 h-5 text-pink-400 animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-widest text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">
            Scanner by Idiot Vinay 😅
          </span>
        </div>

        {/* STEP 1: LOADING SCREEN */}
        {step === "loading" && (
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
        )}

        {/* STEP 2: RESULT CARD */}
        {step === "result" && (
          <div className="text-center py-6 space-y-6 animate-fade-in">
            <div className="w-24 h-24 bg-red-950/30 rounded-full flex items-center justify-center mx-auto border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-bounce">
              <span className="text-5xl">😐</span>
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
              onClick={() => {
                playClickSound();
                setStep("quiz");
              }}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 text-white font-bold rounded-2xl shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Run Investigation
            </button>
          </div>
        )}

        {/* STEP 3: FUNNY QUIZ */}
        {step === "quiz" && (
          <div className="py-4 space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-950/50 rounded-full flex items-center justify-center mx-auto text-purple-400 border border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">Who made Saniya angry?</h2>
              <p className="text-xs text-zinc-500">Select the prime suspect to proceed</p>
            </div>

            <div className="space-y-3">
              {[
                { id: "Someone Else", label: "Someone Else 🤷‍♀️", color: "hover:bg-amber-950/20 hover:border-amber-500/50 border-zinc-800 text-zinc-300" },
                { id: "Bad Luck", label: "Bad Luck 🍀", color: "hover:bg-blue-950/20 hover:border-blue-500/50 border-zinc-800 text-zinc-300" },
                { id: "Vinay", label: "Vinay 😭 (The Idiot)", color: "hover:bg-pink-950/20 hover:border-pink-500/50 border-pink-500/30 bg-pink-950/10 text-pink-300" }
              ].map((option) => {
                const isSelected = quizAnswer === option.id;
                const isVinay = option.id === "Vinay";
                
                return (
                  <button
                    key={option.id}
                    disabled={quizAnswer !== null}
                    onClick={() => handleQuizChoice(option.id)}
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
        )}

        {/* STEP 4: DIAGNOSTICS */}
        {step === "diagnostics" && (
          <div className="py-6 space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-pink-950/50 rounded-full flex items-center justify-center mx-auto text-pink-400 border border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.3)] animate-spin">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]">Running Diagnostics...</h2>
              <p className="text-xs text-zinc-500">Analyzing system logs and brain activity</p>
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
        )}

        {/* STEP 5: FINAL CARD */}
        {step === "final" && (
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

            <button
              onClick={handleForgive}
              className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 text-white font-extrabold rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 text-lg animate-pulse"
            >
              <Heart className="w-6 h-6 fill-current" />
              Forgive Vinay
            </button>
          </div>
        )}

        {/* STEP 6: FORGIVEN STATE */}
        {step === "forgiven" && (
          <div className="text-center py-8 space-y-6 animate-fade-in">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-pink-500/20 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.6)]">
                <Heart className="w-12 h-12 text-white fill-current animate-bounce" />
              </div>
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
              onClick={() => {
                playClickSound();
                setStep("loading");
                setProgress(0);
                setQuizAnswer(null);
                setQuizMessage("");
                setDiagnosticStep(0);
              }}
              className="text-xs text-zinc-500 hover:text-pink-400 underline transition-colors"
            >
              Restart Scanner
            </button>
          </div>
        )}

      </div>

      {/* Floating Hearts Animation */}
      {step === "forgiven" && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute bottom-0 text-pink-500/40 animate-float"
              style={{
                left: `${heart.left}%`,
                animationDelay: `${heart.delay}s`,
                fontSize: `${heart.size}px`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Index;