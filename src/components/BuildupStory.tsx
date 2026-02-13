import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const messages = [
  "It's Valentine's Day! 💕",
  "I was going to send you a regular wish...",
  "But then I stopped.",
  "I wanted to do something special.",
  "Something that shows how much you mean to me.",
  "Because YOU are FKING special,",
  "Almas ✨",
];

const MessageLine = ({ text, index }: { text: string; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isName = index === messages.length - 1;
  const isSpecial = index === messages.length - 2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`py-8 md:py-16 text-center ${isName ? "py-12 md:py-24" : ""}`}
    >
      <p
        className={
          isName
            ? "text-4xl md:text-7xl font-bold text-gradient-rose glow-text font-script"
            : isSpecial
            ? "text-2xl md:text-4xl font-bold text-primary"
            : "text-xl md:text-3xl text-foreground/80"
        }
      >
        {text}
      </p>
    </motion.div>
  );
};

const BuildupStory = () => {
  return (
    <section className="min-h-screen px-6 py-20 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full space-y-4">
        {messages.map((msg, i) => (
          <MessageLine key={i} text={msg} index={i} />
        ))}
      </div>
    </section>
  );
};

export default BuildupStory;
