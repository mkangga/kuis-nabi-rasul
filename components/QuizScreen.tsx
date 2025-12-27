import React, { useState, useEffect, useRef } from 'react';
import { Question, QuizSettings } from '../types';
import Flashcard from './Flashcard';
import { ArrowLeft, ArrowRight, Clock, PauseCircle, PlayCircle, CheckSquare, Home } from 'lucide-react';

interface QuizScreenProps {
  questions: Question[];
  settings: QuizSettings;
  onFinish: () => void;
  onHome: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, settings, onFinish, onHome }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.useTimer ? settings.timerDuration * 60 : 0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Ref for audio context to prevent multiple instances or garbage collection issues
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context on user interaction (first render logic handled in effect)
  const playBeep = () => {
    if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    
    // Resume if suspended (browser policy)
    if (ctx.state === 'suspended') {
        ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5
    oscillator.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.15);
  };

  // Timer Logic
  useEffect(() => {
    if (!settings.useTimer || isPaused) return;

    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        // Sound effect logic for last 15 seconds
        if (prev <= 16 && prev > 1) { 
            // Play sound at the start of the second (prev is about to decrement)
             playBeep();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [settings.useTimer, timeLeft, isPaused, onFinish]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((prev) => prev + 1), 150); // Slight delay for flip reset visually
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((prev) => prev - 1), 150);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;

  // Warning color for timer
  const timerColor = timeLeft <= 15 ? 'text-red-600 animate-pulse' : 'text-emerald-700';

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col h-full min-h-[90vh]">
      {/* Header: Progress & Timer */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
        
        {/* Home Button */}
        <button 
          onClick={onHome} 
          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
          title="Kembali ke Menu Utama"
        >
          <Home size={24} />
        </button>

        {/* Progress Bar */}
        <div className="w-full flex-grow">
          <div className="flex justify-between text-sm font-semibold text-gray-500 mb-1">
            <span>Soal {currentIndex + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Timer Control */}
        {settings.useTimer && (
          <div className="flex items-center gap-4 min-w-fit mt-2 md:mt-0">
             <button 
              onClick={() => setIsPaused(!isPaused)}
              className="text-gray-400 hover:text-emerald-600 transition-colors"
              title={isPaused ? "Resume" : "Pause"}
            >
              {isPaused ? <PlayCircle size={28} /> : <PauseCircle size={28} />}
            </button>
            <div className={`flex items-center gap-2 text-2xl font-mono font-bold ${timerColor}`}>
              <Clock size={24} />
              {formatTime(timeLeft)}
            </div>
           
          </div>
        )}
      </div>

      {/* Main Flashcard Area */}
      <div className="flex-grow flex flex-col justify-center items-center relative">
         {/* Pause Overlay */}
         {isPaused && (
            <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl">
                <h3 className="text-3xl font-bold text-emerald-800 mb-2">Terjeda</h3>
                <button 
                    onClick={() => setIsPaused(false)}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                    Lanjutkan
                </button>
            </div>
        )}

        <Flashcard
          data={questions[currentIndex]}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />
      </div>

      {/* Navigation Controls */}
      <div className="mt-8 flex justify-between items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            currentIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 shadow-sm'
          }`}
        >
          <ArrowLeft size={20} />
          <span className="hidden md:inline">Sebelumnya</span>
        </button>

        <button
            onClick={handleNext}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white shadow-lg transform active:scale-95 transition-all ${
                isLastQuestion 
                ? 'bg-gold-500 hover:bg-gold-600' 
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
        >
            <span className="hidden md:inline">{isLastQuestion ? 'Selesai' : 'Lanjut'}</span>
            <span className="md:hidden">{isLastQuestion ? 'Selesai' : 'Lanjut'}</span>
            {isLastQuestion ? <CheckSquare size={20} /> : <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;