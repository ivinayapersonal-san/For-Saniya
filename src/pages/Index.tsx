import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { playClickSound, playErrorSound, playSuccessSound, playPopSound } from "@/utils/sounds";

// Import modular step components
import { LoadingStep } from "@/components/LoadingStep";
import { ResultStep } from "@/components/ResultStep";
import { QuizStep } from "@/components/QuizStep";
import { DiagnosticsStep } from "@/components/DiagnosticsStep";
import { FinalStep } from "@/components/FinalStep";
import { ForgivenStep } from "@/components/ForgivenStep";

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

    // Both options are Vinay and both are correct!
    setQuizMessage("🎯 Correct! Vinay is 100% responsible.");
    setTimeout(() => {
      playSuccessSound();
      setStep("diagnostics");
    }, 2000);
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
        
        {/* Render Modular Steps */}
        {step === "loading" && (
          <LoadingStep progress={progress} loadingText={loadingText} />
        )}

        {step === "result" && (
          <ResultStep onNext={() => { playClickSound(); setStep("quiz"); }} />
        )}

        {step === "quiz" && (
          <QuizStep 
            quizAnswer={quizAnswer} 
            quizMessage={quizMessage} 
            onChoice={handleQuizChoice} 
          />
        )}

        {step === "diagnostics" && (
          <DiagnosticsStep diagnosticStep={diagnosticStep} />
        )}

        {step === "final" && (
          <FinalStep onForgive={handleForgive} />
        )}

        {step === "forgiven" && (
          <ForgivenStep />
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