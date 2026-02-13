import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    lines: [
      { text: "Hi Love", className: "text-5xl md:text-7xl font-bold text-gradient-rose glow-text font-script" },
    ],
  },
  {
    lines: [
      { text: "Sorry I am disturbing your exam preparation,", className: "text-xl md:text-2xl text-foreground/90" },
      { text: "I just want 10mins of ur day... !", className: "text-xl md:text-2xl text-foreground/90 mt-2" },
    ],
  },
  {
    lines: [
      { text: "Now stop thinking about exams,", className: "text-xl md:text-2xl text-foreground/90" },
      { text: "focus here my darling,", className: "text-xl md:text-2xl text-foreground/90 mt-1" },
      { text: "sorry love! But please", className: "text-xl md:text-2xl text-foreground/90 mt-1" },
      { text: '"YAHAN DEKHU , ACHA KYAAAAA"', className: "text-2xl md:text-4xl font-bold text-primary mt-4 font-script" },
    ],
  },
];

interface Props {
  onContinue: () => void;
}

const HeroSection = ({ onContinue }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showLines, setShowLines] = useState(false);

  // Typewriter for first slide
  useEffect(() => {
    if (currentSlide === 0) {
      const text = slides[0].lines[0].text;
      let i = 0;
      setTypedText("");
      const interval = setInterval(() => {
        setTypedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 120);
      return () => clearInterval(interval);
    } else {
      setShowLines(false);
      setTimeout(() => setShowLines(true), 100);
    }
  }, [currentSlide]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onContinue();
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          {currentSlide === 0 ? (
            <h1 className={slides[0].lines[0].className}>
              {typedText}
              <span className="border-r-2 border-primary animate-typewriter-blink ml-1">&nbsp;</span>
            </h1>
          ) : (
            <div className="space-y-2">
              {slides[currentSlide].lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={showLines ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.4, duration: 0.5 }}
                  className={line.className}
                >
                  {line.text}
                </motion.p>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <motion.button
        onClick={handleNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-12 px-8 py-3 rounded-full bg-primary text-primary-foreground text-lg font-semibold animate-pulse-glow hover:scale-105 transition-transform"
      >
        {currentSlide < slides.length - 1 ? "Next 💕" : "Continue ✨"}
      </motion.button>
    </section>
  );
};

export default HeroSection;
