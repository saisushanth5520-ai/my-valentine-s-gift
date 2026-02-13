import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const placeholderPhotos = [
  { id: 1, caption: "Our first photo together 💕", date: "Add date" },
  { id: 2, caption: "That beautiful day ✨", date: "Add date" },
  { id: 3, caption: "Making memories 🌹", date: "Add date" },
  { id: 4, caption: "Forever favorites 💖", date: "Add date" },
  { id: 5, caption: "Us being us 😊", date: "Add date" },
  { id: 6, caption: "Best moments 💝", date: "Add date" },
];

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
        Our Memories 📸
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl w-full">
        {placeholderPhotos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="group relative aspect-square rounded-xl overflow-hidden bg-secondary border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <div className="text-center p-3">
                <span className="text-4xl block mb-2">💕</span>
                <p className="text-xs">Upload photo</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm text-foreground font-medium">{photo.caption}</p>
              <p className="text-xs text-muted-foreground">{photo.date}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
        className="text-muted-foreground mt-8 text-center text-sm"
      >
        Photos coming soon... 💕
      </motion.p>
    </section>
  );
};

export default PhotoGallery;
