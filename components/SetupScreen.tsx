import React, { useState } from 'react';
import { QuizSettings, Category } from '../types';
import { Clock, BookOpen, Play, Layers, History, Stars, Users, Heart, MapPin } from 'lucide-react';

interface SetupScreenProps {
  onStart: (settings: QuizSettings) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [questionCount, setQuestionCount] = useState<10 | 20>(10);
  const [useTimer, setUseTimer] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<number>(5);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Semua'>('Semua');

  const handleStart = () => {
    onStart({
      questionCount,
      useTimer,
      timerDuration,
      selectedCategory
    });
  };

  // Mapping existing IDs to new Labels for General Prophets Theme
  const categories: { id: Category | 'Semua'; label: string; icon: React.ReactNode }[] = [
    { id: 'Semua', label: 'Semua', icon: <Layers size={24} /> },
    { id: 'Sejarah', label: 'Kisah Nabi', icon: <History size={24} /> },
    { id: 'Mukjizat', label: 'Mukjizat', icon: <Stars size={24} /> },
    { id: 'Keluarga', label: 'Keluarga', icon: <Users size={24} /> },
    { id: 'Sifat', label: 'Gelar Nabi', icon: <Heart size={24} /> },
    { id: 'Dakwah', label: 'Kaum & Negeri', icon: <MapPin size={24} /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-4xl mx-auto p-4 md:p-6 animate-fade-in py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-2 font-serif">Kuis Para Nabi</h1>
        <p className="text-emerald-600 text-lg">Kisah, Mukjizat, dan Perjuangan 25 Nabi</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full border border-emerald-100 flex flex-col">
        
        {/* Category Selection */}
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Layers className="text-emerald-600" />
                Pilih Kategori
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                            selectedCategory === cat.id
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md transform scale-[1.02]'
                                : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-emerald-200 hover:bg-white'
                        }`}
                    >
                        <div className={`mb-2 ${selectedCategory === cat.id ? 'text-emerald-600' : 'text-gray-400'}`}>
                            {cat.icon}
                        </div>
                        <span className="font-semibold">{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
             {/* Question Count */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen className="text-emerald-600" />
                    Jumlah Soal
                </h2>
                <div className="flex gap-4">
                    <button
                    onClick={() => setQuestionCount(10)}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all font-semibold ${
                        questionCount === 10
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-500 hover:border-emerald-200'
                    }`}
                    >
                    10 Soal
                    </button>
                    <button
                    onClick={() => setQuestionCount(20)}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all font-semibold ${
                        questionCount === 20
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 text-gray-500 hover:border-emerald-200'
                    }`}
                    >
                    20 Soal
                    </button>
                </div>
            </div>

            {/* Timer Toggle */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <Clock className="text-emerald-600" />
                        Timer
                    </h2>
                    <button
                    onClick={() => setUseTimer(!useTimer)}
                    className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                        useTimer ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                    >
                    <div
                        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${
                        useTimer ? 'translate-x-6' : ''
                        }`}
                    ></div>
                    </button>
                </div>

                {/* Timer Duration Input */}
                {useTimer ? (
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 animate-slide-down flex items-center justify-between">
                    <label className="text-sm text-emerald-800 font-medium">
                        Durasi (Menit):
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="60"
                        value={timerDuration}
                        onChange={(e) => setTimerDuration(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 p-2 border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-center font-bold text-emerald-700"
                    />
                    </div>
                ) : (
                    <div className="h-[58px] bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-sm">
                        Timer tidak aktif
                    </div>
                )}
            </div>
        </div>

        <button
          onClick={handleStart}
          className="mt-auto w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-[1.01] transition-all flex items-center justify-center gap-2 text-lg"
        >
          <Play fill="currentColor" />
          Mulai Kuis
        </button>
      </div>

      <div className="mt-8 text-center text-emerald-800 opacity-70 text-sm font-medium">
        Dibuat untuk Pengajian Akhir Tahun 2025 - Desa Cikampek Barat
      </div>
    </div>
  );
};

export default SetupScreen;