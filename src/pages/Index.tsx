import { useState } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import BuildupStory from "@/components/BuildupStory";
import PhotoGallery from "@/components/PhotoGallery";
import Timeline from "@/components/Timeline";
import LoveLetter from "@/components/LoveLetter";
import VideoSurprise from "@/components/VideoSurprise";
import MemoryGame from "@/components/MemoryGame";
import GrandFinale from "@/components/GrandFinale";

const Index = () => {
  const [started, setStarted] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <FloatingHearts />

      {!started ? (
        <HeroSection onContinue={() => setStarted(true)} />
      ) : (
        <div className="relative z-10">
          <BuildupStory />
          <PhotoGallery />
          <Timeline />
          <LoveLetter />
          <VideoSurprise />
          <MemoryGame />
          <GrandFinale />
        </div>
      )}
    </main>
  );
};

export default Index;
