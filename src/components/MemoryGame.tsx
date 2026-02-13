import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import photo1 from "@/assets/memory/photo1.jpeg";
import photo2 from "@/assets/memory/photo2.jpeg";
import photo3 from "@/assets/memory/photo3.jpeg";
import photo4 from "@/assets/memory/photo4.jpeg";
import photo5 from "@/assets/memory/photo5.jpeg";
import photo6 from "@/assets/memory/photo6.jpeg";
import photo7 from "@/assets/memory/photo7.jpeg";
import photo8 from "@/assets/memory/photo8.jpeg";
import photo9 from "@/assets/memory/photo9.jpeg";
import photo10 from "@/assets/memory/photo10.jpeg";

const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10];
const deckCards = [...photos, ...photos]; // 20 cards = 10 pairs

// Heart grid: 7 columns, rows define which columns are active
// Total active cells = 20
const heartRows: number[][] = [
  [1, 2, 4, 5],             // row 0: two bumps (4)
  [0, 1, 2, 3, 4, 5, 6],    // row 1: full wide (7) → 4+7=11
  [1, 2, 3, 4, 5],          // row 2: narrowing (5) → 16
  [2, 3, 4],                // row 3: (3) → 19
  [3],                      // row 4: point (1) → 20 ✓
];
const COLS = 7;

const shuffleArray = <T,>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MemoryGame = () => {
  const [shuffled, setShuffled] = useState(() => shuffleArray(deckCards));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (matched.length === shuffled.length && matched.length > 0) setWon(true);
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
    setShuffled(shuffleArray(deckCards));
    setFlipped([]);
    setMatched([]);
    setWon(false);
  };

  // Build grid mapping
  let cardIndex = 0;
  const grid: (number | null)[][] = [];
  for (let r = 0; r < heartRows.length; r++) {
    const row: (number | null)[] = [];
    const activeCols = new Set(heartRows[r]);
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

  const cardSize = "w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px]";

  return (
    <section className="min-h-screen px-4 py-20 flex flex-col items-center justify-center bg-background relative overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-gradient-rose glow-text font-script mb-10"
      >
        Fun game my love 💕
      </motion.h2>

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
          <div className="mx-auto">
            {grid.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-2 md:gap-3 mb-2 md:mb-3">
                {row.map((ci, cIdx) => {
                  if (ci === null) {
                    return <div key={cIdx} className={cardSize} />;
                  }
                  const isFlipped = flipped.includes(ci) || matched.includes(ci);
                  return (
                    <motion.div
                      key={cIdx}
                      onClick={() => handleFlip(ci)}
                      whileTap={{ scale: 0.9 }}
                      className={`${cardSize} rounded-xl cursor-pointer border-2 transition-all duration-300 overflow-hidden ${
                        isFlipped
                          ? "border-primary"
                          : "bg-secondary border-border hover:border-primary/30"
                      }`}
                    >
                      {isFlipped ? (
                        <motion.img
                          src={shuffled[ci]}
                          alt="Memory card"
                          initial={{ rotateY: 90 }}
                          animate={{ rotateY: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary/80">
                          <span className="text-primary/40 text-2xl md:text-3xl">♥</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex justify-between w-full max-w-[550px] mt-8 px-2">
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
