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
        colors: ["#ff6b8b", "#ff8da1", "#feb2b2", "#fbb6ce"]
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff6b8b", "#ff8da1", "#feb2b2", "#fbb6ce"]
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-100 flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans selection:bg-pink-200 selection:text-pink-900">
      
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>

      {/* Main Container */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-pink-100 rounded-3xl shadow-xl p-6 md:p-8 relative z-10 transition-all duration-500 transform hover:scale-[1.01]">
        
        {/* Header / Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-pink-100 p-2 rounded-full">
            <Activity className="w-5 h-5 text-pink-500 animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-widest text-pink-400 uppercase">
            Saniya-Scanner v2.0
          </span>
        </div>

        {/* STEP 1: LOADING SCREEN */}
        {step === "loading" && (
          <div className="text-center py-4 space-y-5 animate-fade-in">
            {/* Weird Cat Meme GIF Embed with Scanner Overlay */}
            <div className="w-full max-w-[320px] aspect-[1.79/1] rounded-2xl overflow-hidden border-2 border-pink-200 shadow-lg bg-pink-50/50 relative mx-auto">
              <iframe 
                src="https://tenor.com/embed/9753705227395230753" 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen
                className="pointer-events-none scale-[1.02]"
              ></iframe>
              {/* Scanning line effect */}
              <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-80 animate-scan shadow-[0_0_8px_rgba(236,72,153,0.8)]"></div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
                <Search className="w-5 h-5 text-pink-500 animate-bounce" />
                Scanning Saniya's Mood...
              </h2>
              <p className="text-sm text-gray-500 min-h-[48px] px-4 transition-all duration-300">
                {loadingText}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-pink-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-pink-400 to-pink-600 h-full rounded-full transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="text-right text-xs font-bold text-pink-500">
                {progress}%
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: RESULT CARD */}
        {step === "result" && (
          <div className="text-center py-6 space-y-6 animate-fade-in">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto border-2 border-red-200 animate-bounce">
              <span className="text-5xl">😐</span>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold border border-red-100">
                <AlertTriangle className="w-3.5 h-3.5" />
                Critical Alert
              </div>
              <h2 className="text-2xl font-extrabold text-gray-800">Angry Detected.</h2>
              <p className="text-sm text-gray-500 px-4">
                Saniya's mood levels are currently in the danger zone. Immediate investigation is required to restore peace.
              </p>
            </div>

            <button
              onClick={() => {
                playClickSound();
                setStep("quiz");
              }}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 hover:shadow-xl transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2"
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
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto text-purple-600">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Who made Saniya angry?</h2>
              <p className="text-xs text-gray-400">Select the prime suspect to proceed</p>
            </div>

            <div className="space-y-3">
              {[
                { id: "Someone Else", label: "Someone Else 🤷‍♀️", color: "hover:bg-amber-50 hover:border-amber-200" },
                { id: "Bad Luck", label: "Bad Luck 🍀", color: "hover:bg-blue-50 hover:border-blue-200" },
                { id: "Vinay", label: "Vinay 😭 (The Idiot)", color: "hover:bg-pink-50 hover:border-pink-200 border-pink-200 bg-pink-50/30" }
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
                          ? "border-green-500 bg-green-50 text-green-800" 
                          : "border-red-500 bg-red-50 text-red-800"
                        : "border-gray-100 text-gray-700 bg-white"
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      isVinay ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )
                    )}
                  </button>
                );
              })}
            </div>

            {quizMessage && (
              <div className={`p-3 rounded-xl text-center text-sm font-semibold animate-pulse ${
                quizAnswer === "Vinay" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
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
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto text-pink-500 animate-spin">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Running Diagnostics...</h2>
              <p className="text-xs text-gray-400">Analyzing system logs and brain activity</p>
            </div>

            <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-100 font-mono text-xs">
              {/* Diagnostic Item 1 */}
              <div className={`flex items-start justify-between gap-2 transition-all duration-500 ${
                diagnosticStep >= 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              }`}>
                <span className="text-gray-600">🔍 Searching for excuses...</span>
                {diagnosticStep >= 1 && (
                  <span className="text-red-500 font-bold flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> None found
                  </span>
                )}
              </div>

              {/* Diagnostic Item 2 */}
              <div className={`flex items-start justify-between gap-2 transition-all duration-500 ${
                diagnosticStep >= 2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              }`}>
                <span className="text-gray-600">🧠 Searching for Vinay's brain...</span>
                {diagnosticStep >= 2 && (
                  <span className="text-red-500 font-bold flex items-center gap-1">
                    <Brain className="w-3.5 h-3.5" /> Offline during incident
                  </span>
                )}
              </div>

              {/* Diagnostic Item 3 */}
              <div className={`flex items-start justify-between gap-2 transition-all duration-500 ${
                diagnosticStep >= 3 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              }`}>
                <span className="text-gray-600">💡 Searching for solution...</span>
                {diagnosticStep >= 3 && (
                  <span className="text-green-600 font-bold flex items-center gap-1">
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
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto border-2 border-amber-200">
              <span className="text-4xl">🤦‍♂️</span>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-100">
                Investigation Complete
              </div>
              <h2 className="text-2xl font-extrabold text-gray-800">Verdict</h2>
              <p className="text-lg font-bold text-pink-600 bg-pink-50 py-2 px-4 rounded-xl inline-block">
                "Vinay is the biggest idiot."
              </p>
              <p className="text-sm text-gray-500 px-4 pt-2">
                He is extremely sorry for being a dummy and promises to make it up to you with infinite chocolates and smiles.
              </p>
            </div>

            <button
              onClick={handleForgive}
              className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold rounded-2xl shadow-lg shadow-rose-200 hover:shadow-xl transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 text-lg animate-pulse"
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
              <div className="absolute inset-0 bg-pink-100 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-200">
                <Heart className="w-12 h-12 text-white fill-current animate-bounce" />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-extrabold text-pink-600">
                Friendship Restored Successfully ❤️
              </h2>
              <p className="text-sm text-gray-600 px-4">
                The system is back to 100% harmony. Vinay has been successfully forgiven and is officially out of the doghouse!
              </p>
            </div>

            <div className="bg-pink-50/50 border border-pink-100 p-4 rounded-2xl">
              <p className="text-lg font-bold text-pink-700">
                Thank you, Saniya. ❤️
              </p>
              <p className="text-xs text-pink-400 mt-1">
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
              className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
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