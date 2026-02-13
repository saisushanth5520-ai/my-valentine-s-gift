import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const emojis = ["💕", "🌹", "✨", "💖", "🦋", "💝", "🌸", "💗", "🥰", "💘", "🌺", "💞", "❤️", "🌷", "💑", "😘", "💐", "🫶", "💓", "🤍", "💜", "🩷", "🧸", "💌", "🎀", "❣️"];
const cards = [...emojis, ...emojis];

// Heart-shaped grid mask (13 columns x 12 rows = 156 cells, 52 active)
// Each row specifies which column indices are active
const heartMask: number[][] = [
  [2, 3, 8, 9],             // row 0: top bumps
  [1, 2, 3, 4, 7, 8, 9, 10], // row 1
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // row 2: wide
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // row 3
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // row 4
  [2, 3, 4, 5, 6, 7, 8, 9],   // row 5
  [3, 4, 5, 6, 7, 8],         // row 6
  [4, 5, 6, 7],               // row 7
  [5, 6],                     // row 8: bottom point
];

const COLS = 12;

// Build the list of active positions
const activePositions: { row: number; col: number }[] = [];
heartMask.forEach((cols, row) => {
  cols.forEach((col) => {
    activePositions.push({ row, col });
  });
});

const totalCards = activePositions.length; // should be ~52
const pairedEmojis = emojis.slice(0, Math.floor(totalCards / 2));
const deck = [...pairedEmojis, ...pairedEmojis];

const shuffleArray = <T,>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MemoryGame = () => {
  const [shuffled, setShuffled] = useState(() => shuffleArray(deck));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (matched.length === shuffled.length) setWon(true);
  }, [matched, shuffled.length]);

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
    setShuffled(shuffleArray(deck));
    setFlipped([]);
    setMatched([]);
    setWon(false);
  };

  // Build the grid: map each active position to its card index
  let cardIndex = 0;
  const grid: (number | null)[][] = [];
  for (let r = 0; r < heartMask.length; r++) {
    const row: (number | null)[] = [];
    const activeCols = new Set(heartMask[r]);
    for (let c = 0; c < COLS; c++) {
      if (activeCols.has(c) && cardIndex < shuffled.length) {
        row.push(cardIndex);
        cardIndex++;
      } else {
        row.push(null);
      }
    }
    grid.push(row);
  }

  return (
    <section className="min-h-screen px-4 py-20 flex flex-col items-center justify-center bg-background relative overflow-hidden">
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
        <>
          {/* Heart grid */}
          <div className="relative w-full max-w-[600px] mx-auto">
            {grid.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1 md:gap-1.5 mb-1 md:mb-1.5">
                {row.map((ci, cIdx) => {
                  if (ci === null) {
                    return <div key={cIdx} className="w-[40px] h-[40px] md:w-[46px] md:h-[46px]" />;
                  }
                  const isFlipped = flipped.includes(ci) || matched.includes(ci);
                  return (
                    <motion.div
                      key={cIdx}
                      onClick={() => handleFlip(ci)}
                      whileTap={{ scale: 0.9 }}
                      className={`w-[40px] h-[40px] md:w-[46px] md:h-[46px] rounded-lg flex items-center justify-center text-lg md:text-xl cursor-pointer border transition-all duration-300 ${
                        isFlipped
                          ? "bg-card border-primary/50"
                          : "bg-secondary/80 border-border hover:border-primary/30"
                      }`}
                    >
                      {isFlipped ? (
                        <motion.span initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} transition={{ duration: 0.3 }}>
                          {shuffled[ci]}
                        </motion.span>
                      ) : (
                        <span className="text-primary/30 text-sm">♥</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Caption text */}
          <div className="flex justify-between w-full max-w-[600px] mt-8 px-2">
            <p className="font-script text-xl md:text-2xl text-foreground/70">
              <span className="text-primary italic">Match</span><br />
              the photo pairs
            </p>
            <p className="font-script text-xl md:text-2xl text-foreground/70 text-right">
              <span className="text-primary italic">to reveal</span><br />
              the surprise
            </p>
          </div>
        </>
      )}
    </section>
  );
};

export default MemoryGame;
