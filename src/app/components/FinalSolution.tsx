import { useState } from 'react';
import { Lock, Trophy, X } from 'lucide-react';

interface FinalSolutionProps {
  isUnlocked: boolean;
  correctSentence: string;
  onSuccess: () => void;
}

export function FinalSolution({ isUnlocked, correctSentence, onSuccess }: FinalSolutionProps) {
  const [userSentence, setUserSentence] = useState('');
  const [error, setError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userSentence.trim().toLowerCase() === correctSentence.toLowerCase()) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-lg p-8 opacity-50">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="size-6 text-purple-500" />
          <span className="text-purple-600">Final Solution</span>
        </div>
        <p className="text-purple-400">Complete all sections to unlock the final challenge.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-500 rounded-lg p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-500 rounded-full p-2">
          <Trophy className="size-6 text-white" />
        </div>
        <span className="text-purple-700">Final Solution</span>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-800 text-lg mb-4">
          You've solved all the riddles! Now, decode the final message:
        </p>
        <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
          <p className="text-gray-700 mb-2">Code:</p>
          <p className="text-gray-600 font-mono text-sm">1I-3II-16II-4III-1IV-3V-16II-4VI</p>
        </div>
        
        <button
          type="button"
          onClick={() => setShowHint(!showHint)}
          className="text-sm text-purple-600 hover:text-purple-800 underline mb-4"
        >
          {showHint ? 'Hide hint' : 'Need a hint?'}
        </button>
        
        {showHint && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded text-sm text-gray-700">
            💡 You might want to look at the introduction again.
          </div>
        )}
        
        <p className="text-gray-500 text-sm italic">
          Enter the final message below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={userSentence}
            onChange={(e) => setUserSentence(e.target.value)}
            placeholder="Enter your answer..."
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            autoFocus
          />
          {error && (
            <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
              <X className="size-4" />
              <span>Not quite right. Check your answers again!</span>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Submit Final Answer
        </button>
      </form>
    </div>
  );
}