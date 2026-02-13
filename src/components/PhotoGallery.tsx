import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ourMemory from "@/assets/our-memory.png";

const PhotoGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="min-h-screen px-6 py-20 flex flex-col items-center justify-center" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold text-gradient-rose glow-text mb-12 text-center"
      >
        Our Memory 📸
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: -3 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{ rotate: 0, scale: 1.05 }}
        className="bg-white p-4 pb-16 rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.4)] max-w-xs md:max-w-sm cursor-pointer transition-transform duration-500"
      >
        {/* Photo area */}
        <div className="aspect-[4/5] bg-secondary rounded-sm overflow-hidden">
          <img src={ourMemory} alt="Us together on August 25, 2025" className="w-full h-full object-cover" />
        </div>

        {/* Caption & date — handwriting style */}
        <div className="mt-4 text-center">
          <p className="font-script text-xl text-foreground/90">I really love this pic of us 💕</p>
          <p className="font-script text-sm text-muted-foreground mt-1">August 25, 2025</p>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="text-muted-foreground mt-8 text-center text-sm"
      >
        Our favorite moment, frozen in time ✨
      </motion.p>
    </section>
  );
};

export default PhotoGallery;
