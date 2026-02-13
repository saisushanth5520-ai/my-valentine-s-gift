import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface BaseQuestion {
  question: string;
  reaction: string;
}

interface TextQuestion extends BaseQuestion {
  type: "text";
  answer: string;
}

interface ChoiceQuestion extends BaseQuestion {
  type: "choice";
  options: string[];
  correctIndex: number;
}

interface DateQuestion extends BaseQuestion {
  type: "date";
  answer: string; // "YYYY-MM-DD"
}

type Question = TextQuestion | ChoiceQuestion | DateQuestion;

const questions: Question[] = [
  {
    type: "text",
    question: "What was the name of the place that we talked about going to for our honeymoon? 🌍✈️",
    answer: "paris",
    reaction: "Yesss! Paris it is, my love! 🗼💕",
  },
  {
    type: "date",
    question: "By chance, when was our online date? 📱💕",
    answer: "2025-01-27",
    reaction: "Jan 27 — a date I'll never forget! 🥰",
  },
  {
    type: "choice",
    question: "Who do I love more? 🤔💕",
    options: ["You 💕", "Mangoes 🥭"],
    correctIndex: 0,
    reaction: "Obviously YOU! No mango could ever compete! 😤💝",
  },
  {
    type: "choice",
    question: "Just to remind... I'm asking you, who kissed first? 😘",
    options: ["You 😏", "Me 🙈"],
    correctIndex: 1,
    reaction: "Hehe yesss it was me! No regrets! 😘💕",
  },
  {
    type: "text",
    question: "What were the two emojis we used with each other as a way of saying bye but we ain't using it now just so you know? 🤔",
    answer: "monkey and elephant",
    reaction: "🐒🐘 Those were our things! Miss that! 💕",
  },
];

const Quiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [showReaction, setShowReaction] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const checkAnswer = (correct: boolean) => {
    setAnswered(true);
    setIsCorrect(correct);
    setShowReaction(true);
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
        setAnswered(false);
        setShowReaction(false);
        setTextInput("");
        setSelectedDate(undefined);
        setSelectedChoice(null);
        setIsCorrect(false);
      } else {
        setFinished(true);
      }
    }, 2500);
  };

  const handleTextSubmit = () => {
    if (!textInput.trim() || answered) return;
    const q = questions[currentQ] as TextQuestion;
    const correct = textInput.trim().toLowerCase() === q.answer.toLowerCase();
    checkAnswer(correct);
  };

  const handleDateSubmit = () => {
    if (!selectedDate || answered) return;
    const q = questions[currentQ] as DateQuestion;
    const correct = format(selectedDate, "yyyy-MM-dd") === q.answer;
    checkAnswer(correct);
  };

  const handleChoiceSelect = (index: number) => {
    if (answered) return;
    setSelectedChoice(index);
    const q = questions[currentQ] as ChoiceQuestion;
    checkAnswer(index === q.correctIndex);
  };

  const q = questions[currentQ];

  return (
    <section className="min-h-screen px-6 py-20 flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-gradient-rose glow-text mb-4 text-center"
      >
        Quiz Time! 📝
      </motion.h2>
      <p className="text-muted-foreground mb-10 text-center">Let's see how well you know us 💕</p>

      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {finished ? (
            <motion.div
              key="result"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-center"
            >
              <p className="text-5xl mb-4">
                {score === questions.length ? "🏆" : score >= 3 ? "🌟" : "💕"}
              </p>
              <p className="text-3xl md:text-4xl font-bold text-gradient-rose glow-text font-script mb-3">
                {score === questions.length
                  ? "Perfect Score!"
                  : "So close! 😘"}
              </p>
              <p className="text-xl text-foreground/80 mb-2">
                You got {score}/{questions.length} right!
              </p>
              <p className="text-foreground/60">
                {score === questions.length
                  ? "You know me so well, Almas! 🥰"
                  : "But it doesn't matter... I love you anyway! 💝"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-2">
                <span className="text-sm text-muted-foreground">
                  {currentQ + 1} / {questions.length}
                </span>
              </div>

              <div className="bg-card/60 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 md:p-8 mb-6">
                <p className="text-xl md:text-2xl font-semibold text-foreground text-center font-script">
                  {q.question}
                </p>
              </div>

              {/* Text input question */}
              {q.type === "text" && (
                <div className="space-y-3">
                  <Input
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Type your answer here... 💭"
                    disabled={answered}
                    onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                    className={cn(
                      "text-lg p-4 h-14 rounded-xl border-2 border-primary/20 bg-secondary transition-all",
                      answered && isCorrect && "border-green-500 bg-green-500/10",
                      answered && !isCorrect && "border-rose-500 bg-rose-500/10"
                    )}
                  />
                  {!answered && (
                    <Button
                      onClick={handleTextSubmit}
                      className="w-full rounded-xl h-12 text-lg"
                      disabled={!textInput.trim()}
                    >
                      Submit Answer 💌
                    </Button>
                  )}
                </div>
              )}

              {/* Date picker question */}
              {q.type === "date" && (
                <div className="space-y-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={answered}
                        className={cn(
                          "w-full h-14 text-lg rounded-xl border-2 border-primary/20 bg-secondary justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground",
                          answered && isCorrect && "border-green-500 bg-green-500/10",
                          answered && !isCorrect && "border-rose-500 bg-rose-500/10"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date... 📅"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  {!answered && (
                    <Button
                      onClick={handleDateSubmit}
                      className="w-full rounded-xl h-12 text-lg"
                      disabled={!selectedDate}
                    >
                      Submit Answer 💌
                    </Button>
                  )}
                </div>
              )}

              {/* Choice question */}
              {q.type === "choice" && (
                <div className="grid grid-cols-1 gap-3">
                  {(q as ChoiceQuestion).options.map((opt, i) => {
                    const isSelected = selectedChoice === i;
                    const isCorrectOpt = i === (q as ChoiceQuestion).correctIndex;

                    return (
                      <motion.button
                        key={i}
                        whileHover={!answered ? { scale: 1.02 } : {}}
                        whileTap={!answered ? { scale: 0.98 } : {}}
                        onClick={() => handleChoiceSelect(i)}
                        className={`w-full p-4 rounded-xl border-2 text-left text-lg transition-all duration-300 ${
                          answered
                            ? isCorrectOpt
                              ? "border-green-500 bg-green-500/10 text-green-300"
                              : isSelected
                              ? "border-rose-500 bg-rose-500/10 text-rose-300"
                              : "border-border/30 opacity-40"
                            : "border-primary/20 bg-secondary hover:border-primary/50 cursor-pointer"
                        }`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              <AnimatePresence>
                {showReaction && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center mt-4 text-lg text-foreground/80 font-script"
                  >
                    {q.reaction}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Quiz;
