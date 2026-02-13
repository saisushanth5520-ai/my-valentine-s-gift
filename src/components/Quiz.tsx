import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  reaction: string;
}

const questions: Question[] = [
  {
    question: "What's my favorite thing about you?",
    options: ["Your smile 😊", "Your eyes 👀", "Your laugh 😂", "Everything 💕"],
    correctIndex: 3,
    reaction: "Yes! Literally EVERYTHING about you! 🥰",
  },
  {
    question: "What was the first thing I noticed about you?",
    options: ["Your voice 🎶", "Your smile 😊", "Your vibe ✨", "Your beauty 💫"],
    correctIndex: 1,
    reaction: "That smile hit different! 😍",
  },
  {
    question: "What do I miss the most when you're not around?",
    options: ["Your texts 💬", "Your presence 🤗", "Your voice 🎵", "All of the above 💝"],
    correctIndex: 3,
    reaction: "Every single bit of you! 😭💕",
  },
  {
    question: "How much do I love you?",
    options: ["A lot ❤️", "More than food 🍕", "To the moon 🌙", "Beyond infinity ♾️"],
    correctIndex: 3,
    reaction: "There's no limit to how much I love you! 🚀💕",
  },
  {
    question: "What would I choose — sleep or talking to you at 3AM?",
    options: ["Sleep 😴", "Talking to you 📱", "Both somehow 😂", "You, always you 💕"],
    correctIndex: 3,
    reaction: "Sleep is temporary, you are forever! 😤💝",
  },
];

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showReaction, setShowReaction] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setShowReaction(true);
    if (index === questions[currentQ].correctIndex) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setShowReaction(false);
      } else {
        setFinished(true);
      }
    }, 2000);
  };

  const q = questions[currentQ];

  return (
    <section className="min-h-screen px-6 py-20 flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-gradient-rose glow-text mb-4 text-center"
      >
        Quiz Time! 📝
      </motion.h2>
      <p className="text-muted-foreground mb-10 text-center">Let's see how well you know us 💕</p>

      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div
              key="result"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center"
            >
              <p className="text-5xl mb-4">
                {score === questions.length ? "🏆" : score >= 3 ? "🌟" : "💕"}
              </p>
              <p className="text-3xl md:text-4xl font-bold text-gradient-rose glow-text font-script mb-3">
                {score === questions.length
                  ? "Perfect Score!"
                  : score >= 3
                  ? "So close!"
                  : "You'll learn more about us! 😘"}
              </p>
              <p className="text-xl text-foreground/80 mb-2">
                You got {score}/{questions.length} right!
              </p>
              <p className="text-foreground/60">
                {score === questions.length
                  ? "You know me so well, Almas! 🥰"
                  : "But it doesn't matter... I love you anyway! 💝"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-2">
                <span className="text-sm text-muted-foreground">
                  {currentQ + 1} / {questions.length}
                </span>
              </div>

              <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 md:p-8 mb-6">
                <p className="text-xl md:text-2xl font-semibold text-foreground text-center font-script">
                  {q.question}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {q.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrect = i === q.correctIndex;
                  const showResult = selected !== null;

                  return (
                    <motion.button
                      key={i}
                      whileHover={selected === null ? { scale: 1.02 } : {}}
                      whileTap={selected === null ? { scale: 0.98 } : {}}
                      onClick={() => handleSelect(i)}
                      className={`w-full p-4 rounded-xl border-2 text-left text-lg transition-all duration-300 ${
                        showResult
                          ? isCorrect
                            ? "border-green-500 bg-green-500/10 text-green-300"
                            : isSelected
                            ? "border-rose-500 bg-rose-500/10 text-rose-300"
                            : "border-border/30 opacity-40"
                          : "border-primary/20 bg-secondary hover:border-primary/50 cursor-pointer"
                      }`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showReaction && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center mt-4 text-lg text-foreground/80 font-script"
                  >
                    {q.reaction}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Quiz;
