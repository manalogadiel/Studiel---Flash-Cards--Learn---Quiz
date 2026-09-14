import { useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { flashcards as ALL, type Flashcard } from "../data/flashcards";
import { Check, RotateCcw, X } from "lucide-react";
import { motion } from "motion/react";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Question = {
  card: Flashcard;
  choices: Flashcard[];
};

function buildQuestions(deck: Flashcard[]): Question[] {
  const order = shuffle(deck);
  return order.map((card) => {
    const distractors = shuffle(deck.filter((c) => c.id !== card.id)).slice(
      0,
      Math.min(3, deck.length - 1)
    );
    const choices = shuffle([card, ...distractors]);
    return { card, choices };
  });
}

type Props = {
  cards?: Flashcard[];
};

export function QuizMode({ cards = ALL }: Props) {
  const [questions, setQuestions] = useState<Question[]>(() => buildQuestions(cards));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setQuestions(buildQuestions(cards));
    setIdx(0);
    setSelected(null);
    setScore(0);
    setWrong(0);
    setDone(false);
  }, [cards]);

  const total = questions.length;
  const safeIdx = Math.min(idx, Math.max(0, total - 1));
  const q = questions[safeIdx];
  const progress = useMemo(() => (safeIdx / Math.max(total, 1)) * 100, [safeIdx, total]);

  useEffect(() => {
    setSelected(null);
  }, [safeIdx]);

  const onSelect = useCallback((cardId: number) => {
    if (!q) return;
    setSelected((prev) => {
      if (prev !== null) return prev;
      if (cardId === q.card.id) setScore((s) => s + 1);
      else setWrong((w) => w + 1);
      return cardId;
    });
  }, [q]);

  const next = useCallback(() => {
    if (safeIdx + 1 >= total) setDone(true);
    else setIdx((i) => i + 1);
  }, [safeIdx, total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      if (selected === null && q?.choices) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= q.choices.length) {
          e.preventDefault();
          onSelect(q.choices[num - 1].id);
        }
      } else if (selected !== null) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          next();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, q, next, onSelect]);

  const restart = () => {
    setQuestions(buildQuestions(cards));
    setIdx(0);
    setSelected(null);
    setScore(0);
    setWrong(0);
    setDone(false);
  };

  if (cards.length < 2) {
    return (
      <div className="px-6 pb-24 flex flex-col items-center text-center gap-4 pt-12">
        <div className="text-4xl">📝</div>
        <h3 className="font-semibold text-lg">Not enough cards for a quiz</h3>
        <p className="text-sm text-muted-foreground">
          This subject needs at least 2 cards to generate multiple-choice questions.
        </p>
      </div>
    );
  }

  if (!q) return null;

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="px-6 pb-24 flex flex-col items-center text-center gap-6 pt-12 max-w-xl mx-auto">
        <div className="text-6xl">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}</div>
        <h2 className="text-2xl font-bold">Quiz complete!</h2>
        <p className="text-muted-foreground text-base">
          {score} / {total} correct ({pct}%)
        </p>
        <Button onClick={restart} className="gap-2">
          <RotateCcw className="h-4 w-4" /> Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 pb-24 flex flex-col gap-4 max-w-3xl mx-auto w-full">
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Question {safeIdx + 1} / {total}
          </span>
          <span>
            <span className="text-green-500 font-medium">✓ {score}</span> ·{" "}
            <span className="text-red-500 font-medium">✗ {wrong}</span>
          </span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
          Definition
        </div>
        <p className="text-lg md:text-xl leading-relaxed">{q.card.definition}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {q.choices.map((choice, choiceIdx) => {
          const isCorrect = choice.id === q.card.id;
          const isSelected = selected === choice.id;
          const showState = selected !== null;
          let cls = "border bg-card hover:bg-accent";
          if (showState && isCorrect) cls = "border-green-500 bg-green-500/10";
          else if (showState && isSelected && !isCorrect)
            cls = "border-red-500 bg-red-500/10";
          else if (showState) cls = "border bg-card opacity-60";

          return (
            <motion.button
              key={choice.id}
              whileTap={{ scale: 0.98 }}
              disabled={showState}
              onClick={() => onSelect(choice.id)}
              className={`text-left rounded-xl p-4 md:p-5 transition-colors flex items-center justify-between gap-3 ${cls}`}
            >
              <span className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground hidden md:inline-block w-4">
                  {choiceIdx + 1}.
                </span>
                <span className="text-sm md:text-base font-medium">{choice.term}</span>
              </span>
              {showState && isCorrect && <Check className="h-5 w-5 text-green-500 shrink-0" />}
              {showState && isSelected && !isCorrect && (
                <X className="h-5 w-5 text-red-500 shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>

      {selected !== null && (
        <Button onClick={next} size="lg" className="mt-2 h-12 text-base font-medium">
          {safeIdx + 1 >= total ? "See results" : "Next question"}
          <span className="hidden md:inline ml-1 text-xs opacity-75">(Enter)</span>
        </Button>
      )}
    </div>
  );
}
