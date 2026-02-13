import { motion } from "framer-motion";

const EndingMessage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-2xl text-center space-y-8"
      >
        <p className="text-4xl mb-4">🌙</p>

        <p className="text-xl md:text-2xl leading-relaxed text-foreground/80 font-script">
          I wish after asking you out for Valentine's, I want to kiss your soft sexy lips and whisper...
        </p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-gradient-rose glow-text font-script py-4"
        >
          I fucking love you, Almas Kamarwajith
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="space-y-6"
        >
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/80 font-script">
            Also, show you the room that I booked to have amazing sex with you after all this!!!
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-foreground/60 font-script italic">
            I know I'm here and you're there, but will you please imagine this before you sleep today?
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-5xl pt-6"
        >
          💋✨
        </motion.p>
      </motion.div>
    </section>
  );
};

export default EndingMessage;
