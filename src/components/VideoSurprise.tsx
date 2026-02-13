import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const VideoSurprise = () => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <section ref={ref} className="min-h-screen px-6 py-20 flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-gradient-rose glow-text mb-12 text-center"
      >
        A Surprise For You 🎬
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-2xl w-full rounded-2xl overflow-hidden glow-rose"
      >
        <video
          ref={videoRef}
          src="/video-surprise.mp4"
          muted={isMuted}
          loop
          playsInline
          className="w-full rounded-2xl"
        />
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if (videoRef.current) videoRef.current.muted = !isMuted;
          }}
          className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm border border-border hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {isMuted ? "🔇 Unmute" : "🔊 Mute"}
        </button>
      </motion.div>
    </section>
  );
};

export default VideoSurprise;
