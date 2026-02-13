import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const GrandFinale = () => {
  const [answered, setAnswered] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleNo = () => {
    if (!noButtonRef.current) return;
    const btn = noButtonRef.current;
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 60);
    btn.style.position = "fixed";
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
    btn.style.zIndex = "9999";
  };

  const handleYes = () => {
    setAnswered(true);
    // Fire confetti
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ["#e11d48", "#f43f5e", "#fb7185", "#fda4af", "#fecdd3"];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  if (answered) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="text-center"
        >
          <p className="text-6xl md:text-8xl mb-6">💕</p>
          <h2 className="text-4xl md:text-6xl font-bold text-gradient-rose glow-text font-script mb-4">
            I knew you'd say yes!
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80">
            Happy Valentine's Day, Almas! 🌹
          </p>
          <p className="text-lg text-muted-foreground mt-4">
            You just made me the happiest person in the world ❤️
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <p className="text-5xl mb-6">💍</p>
        <h2 className="text-3xl md:text-6xl font-bold text-gradient-rose glow-text mb-8">
          Almas, will you be my Valentine?
        </h2>

        <div className="flex gap-6 justify-center items-center flex-wrap">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYes}
            className="px-10 py-4 rounded-full bg-primary text-primary-foreground text-xl font-bold animate-pulse-glow hover:bg-primary/90 transition-colors"
          >
            Yes! 💕
          </motion.button>

          <button
            ref={noButtonRef}
            onMouseEnter={handleNo}
            onClick={handleNo}
            className="px-8 py-4 rounded-full bg-secondary text-secondary-foreground text-lg border border-border hover:border-primary/30 transition-all"
          >
            No
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default GrandFinale;
