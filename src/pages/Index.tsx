import { useState } from "react";
import LoginGate from "@/components/LoginGate";
import FloatingHearts from "@/components/FloatingHearts";
import BackgroundMusic from "@/components/BackgroundMusic";
import HeroSection from "@/components/HeroSection";
import BuildupStory from "@/components/BuildupStory";
import PhotoGallery from "@/components/PhotoGallery";

import LoveLetter from "@/components/LoveLetter";
import Quiz from "@/components/Quiz";
import MemoryGame from "@/components/MemoryGame";
import GrandFinale from "@/components/GrandFinale";
import EndingMessage from "@/components/EndingMessage";

const Index = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [started, setStarted] = useState(false);

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
        <FloatingHearts />
        <LoginGate onUnlock={() => setUnlocked(true)} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <FloatingHearts />
      <BackgroundMusic />
      {!started ? (
        <HeroSection onContinue={() => setStarted(true)} />
      ) : (
        <div className="relative z-10">
          <BuildupStory />
          <PhotoGallery />
          
          <LoveLetter />
          <Quiz />
          <MemoryGame />
          <GrandFinale />
          <EndingMessage />
        </div>
      )}
    </main>
  );
};

export default Index;
