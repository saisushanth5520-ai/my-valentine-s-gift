import { motion } from "framer-motion";
import { useState } from "react";

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="min-h-screen px-6 py-20 flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-gradient-rose glow-text mb-12 text-center"
      >
        A Letter For You 💌
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative max-w-md w-full"
      >
        {!isOpen ? (
          <motion.div
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer bg-card border-2 border-primary/30 rounded-2xl p-12 text-center glow-rose hover:border-primary/60 transition-colors"
          >
            <span className="text-6xl block mb-4">💌</span>
            <p className="text-lg text-muted-foreground">Tap to open...</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-br from-card to-secondary border border-primary/20 rounded-2xl p-8 md:p-10"
            style={{ perspective: "1000px" }}
          >
            <div className="font-script text-lg md:text-xl leading-relaxed text-foreground/90 space-y-4">
              <p className="font-bold text-primary">Dear Love,</p>
              <p>
                Here she is my gawddamn fking beautiful woman!!!!!! The love of my life!!!! The reason behind my happiness!!! 
                "Mere Rashq-e-Qamar" — go search this if u don't know what it means. ✨
              </p>
              <p>
                I'm writing this letter for our first Valentine's Day which is so special to me. Almas, right at this point 
                of my life, you are the only good thing that I have. I really can't express how happy u make me. I am seeing 
                the happiest version of myself when I'm with you Almas — that too for this long, which is new!!!
              </p>
              <p>
                Every time I look at you, I see everything that I dreamed for and prayed for — I really mean this Almas.
              </p>
              <p>
                I wanted to say this — when I say "I love you more," I actually meant that I love you more than u love me... 
                but not anymore. Now when I say I love u more, it is me loving u more than the imperfections that u think u 
                may have. I love you more than the hard days that may come where we both feel loving each other is tough. 
                I would still choose to sit with u and talk about it when these days come.
              </p>
              <p>
                I love you more than anything. I love you with my entire life. I love you more than my mind can define it. 
                I love listening to you always. I love looking at you even though it is thru screens. I love learning about you. 
                I love how much u love me. I love that such a love exists between us. I love loving you and maybe making ur day 
                better. I love making u and seeing u happy with that cute smile of urs. I love when u are vulnerable to me. 
                I love when u allow me to see you through you. I love that you are mine. I also love that I'm yours and beyond 
                that — I really don't care about much anymore. JUST YOU!!!! 💕
              </p>
              <p>
                I would always choose you over everyone Almas!!! By now, u should know that. No matter what happens, my love 
                for you will never change. I will always stand by you, love you with all my heart my darlingg.
              </p>
              <p>
                Even on the days when u hate urself and don't choose urself, I will still choose u and will make u feel loved 
                because u fking deserve all the happiness and love my dear Almas. I will love u when you feel low, sit with 
                you on ur bad days when you are crying and believe in you when u doubt urself.
              </p>
              <p>
                Please never hide what's going on in ur mind and heart. You will never be too much for me, you would never be 
                a burden for me. I just want to be the one you always come to. I will never get tired of listening to you, 
                because what u feel, what you think always matter to me — even if that's a same thing that u have always talked 
                about, I can listen it for another ten thousand times my love. ❤️
              </p>
              <p>
                I cannot describe it anymore — it is fkingg you, it is ALMAS KAMARWAJITH, the only one that I will ever want. 
                And somehow I can imagine ourselves growing old together, 50 years from now on... god knows what place it would 
                be, with all the wrinkles, u would still be the most prettiest woman in my eyes and I can see myself saying 
                "I love you gorgeous" in my old voice lolll!!!
              </p>
              <p>
                I need you Almas. You are the only thing that matters to me. I would choose you in every lifetime, in every 
                little dreams that I have, in every prayers.
              </p>
              <p className="text-xl font-bold text-primary text-center mt-4">
                YOU ARE MY PEACE, MY HOME, MY EVERYTHING. 🤍
              </p>
              <p className="text-right mt-6 text-primary italic">
                Forever Yours, ❤️
                <br />
                Sai Sushanth
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default LoveLetter;
