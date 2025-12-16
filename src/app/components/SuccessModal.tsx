import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface SuccessModalProps {
  onRestart: () => void;
}

export function SuccessModal({ onRestart }: SuccessModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-full p-4">
            <Heart className="size-12 text-white fill-white" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="size-5 text-pink-500" />
            <h2 className="text-pink-600">Final Message</h2>
            <Sparkles className="size-5 text-pink-500" />
          </div>
          
          <div className="text-left space-y-4 mb-6 bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl border-2 border-pink-200">
            <p className="text-xl text-gray-800">"You weren't solving for words.</p>
            <p className="text-xl text-gray-800">You were solving for reassurance.</p>
            <p className="pt-2 text-2xl text-pink-600">I love you.</p>
            <p className="text-xl text-gray-800">Not conditionally. Not quietly.</p>
            <p className="text-xl text-gray-800">Not only when things are easy or impressive or finished.</p>
            <p className="pt-2 text-xl text-gray-800">I see you surviving storms, waiting patiently, rebuilding yourself, and accepting comfort—even when life feels heavy.</p>
            <p className="text-xl text-gray-800">And no matter what chapter you're in, I will be there for you."</p>
            <p className="text-right text-gray-600 italic mt-4">— RoboCoach</p>
          </div>

          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
          >
            Start New Journey
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}