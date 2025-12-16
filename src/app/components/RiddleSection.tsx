import { useState } from 'react';
import { Lock, Check, X } from 'lucide-react';

interface RiddleSectionProps {
  sectionNumber: number;
  sectionName: string;
  riddle: string;
  answer: string;
  hint?: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  onComplete: () => void;
}

// Convert number to Roman numerals
const toRoman = (num: number): string => {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  return romanNumerals[num - 1] || num.toString();
};

export function RiddleSection({
  sectionNumber,
  sectionName,
  riddle,
  answer,
  hint,
  isUnlocked,
  isCompleted,
  onComplete,
}: RiddleSectionProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userAnswer.trim().toLowerCase() === answer.toLowerCase()) {
      setError(false);
      onComplete();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-8 opacity-50">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="size-6 text-gray-500" />
          <span className="text-gray-500">Section {toRoman(sectionNumber)}</span>
        </div>
        <p className="text-gray-400">Complete the previous section to unlock this riddle.</p>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-500 rounded-full p-1">
            <Check className="size-5 text-white" />
          </div>
          <span className="text-green-700">{toRoman(sectionNumber)}. {sectionName} - Completed!</span>
        </div>
        <p className="text-gray-700 mb-3 whitespace-pre-line">{riddle}</p>
        <p className="text-green-700">Answer: <span className="font-mono">{answer}</span></p>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-blue-500 rounded-lg p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-500 rounded-full size-8 flex items-center justify-center text-white text-sm">
          {toRoman(sectionNumber)}
        </div>
        <span className="text-blue-700">{toRoman(sectionNumber)}. {sectionName}</span>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-800 text-lg mb-4 whitespace-pre-line">{riddle}</p>
        
        {hint && (
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            {showHint ? 'Hide hint' : 'Need a hint?'}
          </button>
        )}
        
        {showHint && hint && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded text-sm text-gray-700">
            💡 {hint}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            autoFocus
          />
          {error && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <X className="size-4" />
              <span>Incorrect answer. Try again!</span>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Answer
        </button>
      </form>
    </div>
  );
}