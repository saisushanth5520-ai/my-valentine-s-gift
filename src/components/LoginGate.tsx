import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoginGateProps {
  onUnlock: () => void;
}

const LoginGate = ({ onUnlock }: LoginGateProps) => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [shaking, setShaking] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const handleSubmit = () => {
    if (month.toLowerCase() === "september" && day === "15") {
      onUnlock();
    } else {
      setError(true);
      setAttempts((a) => a + 1);
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background relative overflow-hidden">
      <motion.div
        animate={shaking ? { x: [0, -15, 15, -10, 10, -5, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-card/80 backdrop-blur-md border border-primary/20 rounded-2xl p-8 md:p-10 text-center shadow-[0_0_60px_rgba(244,63,94,0.15)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-5xl mb-6"
          >
            🔒
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-bold text-gradient-rose glow-text font-script mb-2">
            Before you enter...
          </h1>
          <p className="text-foreground/80 text-lg md:text-xl mb-8 font-script">
            "When did U and I turned into Us?" 💕
          </p>

          <div className="flex gap-3 mb-4">
            <select
              value={month}
              onChange={(e) => { setMonth(e.target.value); setError(false); }}
              className="flex-1 h-12 rounded-xl border border-primary/30 bg-secondary text-foreground px-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
            >
              <option value="">Month</option>
              {months.map((m) => (
                <option key={m} value={m.toLowerCase()}>{m}</option>
              ))}
            </select>

            <select
              value={day}
              onChange={(e) => { setDay(e.target.value); setError(false); }}
              className="w-24 h-12 rounded-xl border border-primary/30 bg-secondary text-foreground px-3 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer"
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={String(d)}>{d}</option>
              ))}
            </select>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-rose-400 text-sm mb-3"
              >
                {attempts >= 2
                  ? "Hint: Think about September... 🤔💕"
                  : "Nope! Try again, love... think harder! 💭"}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-lg shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-[0_0_30px_rgba(244,63,94,0.6)] transition-shadow animate-pulse-glow"
          >
            Unlock 💝
          </motion.button>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginGate;
