import { motion } from "framer-motion";
import { useState } from "react";

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="min-h-screen px-6 py-20 flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-gradient-rose glow-text mb-12 text-center"
      >
        A Letter For You 💌
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative max-w-md w-full"
      >
        {!isOpen ? (
          <motion.div
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer bg-card border-2 border-primary/30 rounded-2xl p-12 text-center glow-rose hover:border-primary/60 transition-colors"
          >
            <span className="text-6xl block mb-4">💌</span>
            <p className="text-lg text-muted-foreground">Tap to open...</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-br from-card to-secondary border border-primary/20 rounded-2xl p-8 md:p-10"
            style={{ perspective: "1000px" }}
          >
            <div className="font-script text-lg md:text-xl leading-relaxed text-foreground/90 space-y-4">
              <p>My Dearest Almas,</p>
              <p>
                Every day with you feels like a gift I never knew I needed. You make my world brighter, 
                warmer, and infinitely more beautiful just by being in it.
              </p>
              <p>
                Your smile is my favorite sight, your laugh is my favorite sound, and your happiness 
                is my biggest priority. I hope you know that.
              </p>
              <p>
                Thank you for being you — for being patient, kind, loving, and absolutely incredible. 
                I'm the luckiest person in the world because I get to call you mine.
              </p>
              <p>
                This Valentine's Day, I just want you to know — I love you more than words could ever say, 
                and I'll spend every day showing you that. 💕
              </p>
              <p className="text-right mt-6 text-primary">
                Forever yours ❤️
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default LoveLetter;
