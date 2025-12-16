import { useState, useEffect } from 'react';
import { RiddleSection } from './components/RiddleSection';
import { FinalSolution } from './components/FinalSolution';
import { SuccessModal } from './components/SuccessModal';
import { Scroll } from 'lucide-react';

// Riddle data structure
const riddles = [
  {
    name: "The Quiet Line",
    riddle: `Still water.
No force, no rush.
What you're waiting for can't be chased.
Sometimes you leave empty-handed,
and still feel steadier than when you arrived.`,
    answer: "Fishing",
    hint: "You usually catch trees while..."
  },
  {
    name: "The Frozen Board",
    riddle: `When the world turns white, survival becomes math and trust.
Heroes lead, others support.
Gathering decides who lasts.
Preparation matters more than strength.
The storm does not care — people do.`,
    answer: "Whiteout Survival",
    hint: "Molly is the best in what game?"
  },
  {
    name: "Who Stays",
    riddle: `They watch from warm places.
Very judgmental.
Strong opinions.
Comfort disguised as chaos.
Don´t fix anything.
Yet somehow, always stay close when you need quiet company.`,
    answer: "Cats",
    hint: "Plural of the princess."
  },
  {
    name: "Two Wheels, One Focus",
    riddle: `The world narrows to balance and motion.
Thoughts quiet under the helmet.
Every turn asks for presence.
You don't escape life —
you ride through it.`,
    answer: "Bike",
    hint: "That one should be obvious."
  },
  {
    name: "The Open Road",
    riddle: `The wind cuts past your face.
Every turn is a choice,
every mile a reminder that life moves even when it feels heavy.
Freedom isn't about escaping —
it's about showing up, eyes wide open, and keeping moving forward.`,
    answer: "Adventure",
    hint: "People who are free or restless want to go on a ..."
  },
  {
    name: "Built in Layers",
    riddle: `Nothing appears whole.
It rises slowly, layer by layer.
Mistakes aren't punished —
they're melted, adjusted, tried again.
Progress looks messy while it's happening.`,
    answer: "3D Printing",
    hint: "With resin it´s supposedly faster."
  }
];

const FINAL_SENTENCE = "I love you";

export default function App() {
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  // Auto-scroll to current section
  useEffect(() => {
    if (currentSection > 0) {
      const element = document.getElementById(`section-${currentSection}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentSection]);

  const handleSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections([...completedSections, sectionIndex]);
      setCurrentSection(sectionIndex + 1);
    }
  };

  const handleFinalSuccess = () => {
    setShowSuccess(true);
  };

  const handleRestart = () => {
    setCompletedSections([]);
    setCurrentSection(0);
    setShowSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allSectionsCompleted = completedSections.length === riddles.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scroll className="size-10 text-purple-600" />
          </div>
          <p className="text-xl text-gray-700 italic mb-3">A Riddle Made of Small Places of Rommy</p>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-2">
            Each part describes something familiar.<br />
            Each answer contains a letter for the final message.<br />
            <strong>Sometimes the truth walks three steps backwards before it can move forward.</strong>
          </p>
          <p className="text-lg text-gray-500">Take your time.</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-white rounded-full p-2 shadow-md">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
                style={{ width: `${(completedSections.length / riddles.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 min-w-[80px] text-right">
              {completedSections.length} / {riddles.length}
            </span>
          </div>
        </div>

        {/* Riddle Sections */}
        <div className="space-y-6">
          {riddles.map((riddle, index) => (
            <div key={index} id={`section-${index}`}>
              <RiddleSection
                sectionNumber={index + 1}
                sectionName={riddle.name}
                riddle={riddle.riddle}
                answer={riddle.answer}
                hint={riddle.hint}
                isUnlocked={index === 0 || completedSections.includes(index - 1)}
                isCompleted={completedSections.includes(index)}
                onComplete={() => handleSectionComplete(index)}
              />
            </div>
          ))}

          {/* Final Solution */}
          <div id="section-final">
            <FinalSolution
              isUnlocked={allSectionsCompleted}
              correctSentence={FINAL_SENTENCE}
              onSuccess={handleFinalSuccess}
            />
          </div>
        </div>

        {/* Reset Button */}
        {completedSections.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={handleRestart}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Start Over
            </button>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showSuccess && <SuccessModal onRestart={handleRestart} />}
    </div>
  );
}