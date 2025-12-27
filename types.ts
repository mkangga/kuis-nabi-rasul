export type Category = 'Sejarah' | 'Mukjizat' | 'Keluarga' | 'Sifat' | 'Dakwah';

export interface Question {
  id: number;
  category: Category;
  question: string;
  answer: string;
}

export interface QuizSettings {
  questionCount: 10 | 20;
  useTimer: boolean;
  timerDuration: number; // in minutes
  selectedCategory: Category | 'Semua';
}

export type ScreenState = 'setup' | 'quiz' | 'result';
