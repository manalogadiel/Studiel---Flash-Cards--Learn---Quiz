import { useEffect, useMemo, useState } from "react";
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

  const q = questions[idx];
  const total = questions.length;
  const progress = useMemo(() => (idx / Math.max(total, 1)) * 100, [idx, total]);

  useEffect(() => {
    setSelected(null);
  }, [idx]);

  const onSelect = (cardId: number) => {
    if (selected !== null) return;
    setSelected(cardId);
    if (cardId === q.card.id) setScore((s) => s + 1);
    else setWrong((w) => w + 1);
  };

  const next = () => {
    if (idx + 1 >= total) setDone(true);
    else setIdx((i) => i + 1);
  };

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
      <div className="px-6 pb-24 flex flex-col items-center text-center gap-6 pt-12">
        <div className="text-6xl">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}</div>
        <h2>Quiz complete!</h2>
        <p className="text-muted-foreground">
          {score} / {total} correct ({pct}%)
        </p>
        <Button onClick={restart} className="gap-2">
          <RotateCcw className="h-4 w-4" /> Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 pb-24 flex flex-col gap-4">
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Question {idx + 1} / {total}
          </span>
          <span>
            <span className="text-green-500">✓ {score}</span> ·{" "}
            <span className="text-red-500">✗ {wrong}</span>
          </span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Definition
        </div>
        <p className="text-lg leading-relaxed">{q.card.definition}</p>
      </div>

      <div className="flex flex-col gap-3">
        {q.choices.map((choice) => {
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
              className={`text-left rounded-xl p-4 transition-colors flex items-center justify-between gap-3 ${cls}`}
            >
              <span>{choice.term}</span>
              {showState && isCorrect && <Check className="h-5 w-5 text-green-500 shrink-0" />}
              {showState && isSelected && !isCorrect && (
                <X className="h-5 w-5 text-red-500 shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>

      {selected !== null && (
        <Button onClick={next} size="lg" className="mt-2">
          {idx + 1 >= total ? "See results" : "Next question"}
        </Button>
      )}
    </div>
  );
}
