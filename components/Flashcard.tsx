import React from 'react';
import { Question } from '../types';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

interface FlashcardProps {
  data: Question;
  isFlipped: boolean;
  onFlip: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ data, isFlipped, onFlip }) => {
  return (
    <div 
      className="relative w-full max-w-xl h-64 md:h-80 cursor-pointer perspective-1000 group mx-auto mb-6"
      onClick={onFlip}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side (Question) */}
        <div className="absolute w-full h-full bg-white rounded-2xl shadow-xl border-b-4 border-emerald-600 backface-hidden flex flex-col items-center justify-center p-6 text-center">
          <div className="absolute top-4 left-4 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {data.category}
          </div>
          <HelpCircle className="text-emerald-200 w-16 h-16 mb-4" />
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug">
            {data.question}
          </h3>
          <p className="mt-6 text-sm text-gray-400 font-medium animate-pulse">
            Ketuk untuk melihat jawaban
          </p>
        </div>

        {/* Back Side (Answer) */}
        <div className="absolute w-full h-full bg-emerald-600 rounded-2xl shadow-xl border-b-4 border-emerald-800 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="absolute top-4 left-4 bg-emerald-700 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Jawaban
          </div>
          <CheckCircle2 className="text-emerald-300 w-16 h-16 mb-4" />
          <p className="text-xl md:text-2xl font-medium leading-relaxed">
            {data.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
