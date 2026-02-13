import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const emojis = ["💕", "🌹", "✨", "💖", "🦋", "💝"];
const cards = [...emojis, ...emojis];

const shuffleArray = <T,>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MemoryGame = () => {
  const [shuffled, setShuffled] = useState(() => shuffleArray(cards));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (matched.length === cards.length) setWon(true);
  }, [matched]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [a, b] = flipped;
      if (shuffled[a] === shuffled[b]) {
        setMatched((prev) => [...prev, a, b]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  }, [flipped, shuffled]);

  const handleFlip = (index: number) => {
    if (flipped.length >= 2 || flipped.includes(index) || matched.includes(index)) return;
    setFlipped((prev) => [...prev, index]);
  };

  const reset = () => {
    setShuffled(shuffleArray(cards));
    setFlipped([]);
    setMatched([]);
    setWon(false);
  };

  return (
    <section className="min-h-screen px-6 py-20 flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-gradient-rose glow-text mb-4 text-center"
      >
        Memory Game 🎮
      </motion.h2>
      <p className="text-muted-foreground mb-8 text-center">Match the pairs to reveal a surprise!</p>

      {won ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center"
        >
          <p className="text-4xl md:text-6xl font-bold text-gradient-rose glow-text font-script mb-4">
            You did it! 🎉
          </p>
          <p className="text-xl text-foreground/80 mb-6">Just like how you complete my heart 💕</p>
          <button onClick={reset} className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform">
            Play Again
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-w-md w-full">
          {shuffled.map((emoji, i) => {
            const isFlipped = flipped.includes(i) || matched.includes(i);
            return (
              <motion.div
                key={i}
                onClick={() => handleFlip(i)}
                whileTap={{ scale: 0.95 }}
                className={`aspect-square rounded-xl flex items-center justify-center text-3xl cursor-pointer border-2 transition-all duration-300 ${
                  isFlipped
                    ? "bg-card border-primary/50 rotate-0"
                    : "bg-secondary border-border hover:border-primary/30"
                }`}
              >
                {isFlipped ? (
                  <motion.span initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} transition={{ duration: 0.3 }}>
                    {emoji}
                  </motion.span>
                ) : (
                  <span className="text-primary/40">♥</span>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default MemoryGame;
