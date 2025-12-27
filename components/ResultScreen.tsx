import React from 'react';
import { Home, RefreshCw } from 'lucide-react';

interface ResultScreenProps {
  onRetry: () => void;
  onHome: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ onRetry, onHome }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full p-6 text-center animate-fade-in">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-2xl w-full border-t-8 border-emerald-500">
        
        <div className="mb-8">
            <span className="text-6xl mb-4 block">🎉</span>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Kuis Selesai!</h2>
            <p className="text-gray-500">Masya Allah, Tabarakallah</p>
        </div>

        <div className="bg-emerald-50 rounded-xl p-6 mb-8 border border-emerald-100">
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-700 font-serif leading-relaxed">
            Alhamdulillahi Jaza Kumullohu Khoiro
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetry}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
          >
            <RefreshCw size={20} />
            Main Lagi
          </button>
          
          <button
             onClick={onHome} 
             className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-emerald-700 border border-emerald-200 rounded-xl font-bold hover:bg-emerald-50 transition-all"
          >
            <Home size={20} />
            Menu Utama
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;