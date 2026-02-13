import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const milestones = [
  { date: "Add date", title: "When We First Met", description: "The moment everything changed...", emoji: "✨" },
  { date: "Add date", title: "Our First Conversation", description: "Hours flew by like minutes...", emoji: "💬" },
  { date: "Add date", title: "First Date", description: "Butterflies and smiles...", emoji: "🦋" },
  { date: "Add date", title: "When I Knew", description: "That you were the one...", emoji: "💕" },
  { date: "Add date", title: "Our First Trip", description: "Adventures with my favorite person...", emoji: "✈️" },
  { date: "Today", title: "This Valentine's Day", description: "Making you feel how special you are 💝", emoji: "🌹" },
];

const Timeline = () => {
  return (
    <section className="min-h-screen px-6 py-20 flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-gradient-rose glow-text mb-16 text-center"
      >
        Our Journey Together 💫
      </motion.h2>

      <div className="relative max-w-lg w-full">
        {/* Animated line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-rose-gold to-primary/30" />

        {milestones.map((milestone, i) => (
          <TimelineItem key={i} milestone={milestone} index={i} />
        ))}
      </div>
    </section>
  );
};

const TimelineItem = ({ milestone, index }: { milestone: typeof milestones[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`relative flex items-center mb-12 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Dot */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary glow-rose z-10" />

      {/* Card */}
      <div className={`ml-14 md:ml-0 md:w-5/12 ${isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
        <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors">
          <span className="text-2xl">{milestone.emoji}</span>
          <p className="text-xs text-primary mt-2 font-semibold">{milestone.date}</p>
          <h3 className="text-lg font-bold text-foreground mt-1">{milestone.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
