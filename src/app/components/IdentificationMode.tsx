import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Check, RotateCcw, X, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { flashcards as ALL, type Flashcard } from "../data/flashcards";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isMatch(answer: string, target: string) {
  const a = normalize(answer);
  const t = normalize(target);
  if (!a) return false;
  if (a === t) return true;
  const tNoParen = normalize(target.replace(/\(.*?\)/g, ""));
  if (a === tNoParen) return true;
  return false;
}

type Result = { card: Flashcard; answer: string; correct: boolean; revealed: boolean };

type Props = {
  cards?: Flashcard[];
};

export function IdentificationMode({ cards = ALL }: Props) {
  const [deck, setDeck] = useState<Flashcard[]>(() => shuffle(cards));
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [state, setState] = useState<"input" | "correct" | "wrong" | "revealed">("input");
  const [results, setResults] = useState<Result[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDeck(shuffle(cards));
    setIdx(0);
    setAnswer("");
    setState("input");
    setResults([]);
    setDone(false);
  }, [cards]);

  const card = deck[idx];
  const total = deck.length;
  const correctCount = results.filter((r) => r.correct).length;
  const wrongCount = results.length - correctCount;
  const progress = useMemo(() => (results.length / Math.max(total, 1)) * 100, [results.length, total]);

  useEffect(() => {
    setAnswer("");
    setState("input");
  }, [idx]);

  const submit = () => {
    if (!card || state !== "input") return;
    const correct = isMatch(answer, card.term);
    setState(correct ? "correct" : "wrong");
  };

  const reveal = () => {
    if (!card) return;
    setAnswer(card.term);
    setState("revealed");
  };

  const next = () => {
    if (!card) return;
    const correct = state === "correct";
    setResults((r) => [
      ...r,
      { card, answer, correct, revealed: state === "revealed" },
    ]);
    if (idx + 1 >= total) setDone(true);
    else setIdx((i) => i + 1);
  };

  const restart = () => {
    setDeck(shuffle(cards));
    setIdx(0);
    setAnswer("");
    setState("input");
    setResults([]);
    setDone(false);
  };

  if (cards.length === 0) {
    return (
      <div className="px-6 pb-24 flex flex-col items-center text-center gap-4 pt-12">
        <div className="text-4xl">✍️</div>
        <h3 className="font-semibold text-lg">No cards in this subject</h3>
        <p className="text-sm text-muted-foreground">Add flashcards to test your identification recall!</p>
      </div>
    );
  }

  if (done) {
    const pct = Math.round((correctCount / total) * 100);
    return (
      <div className="px-4 pb-24 flex flex-col gap-4 pt-6">
        <div className="text-center flex flex-col gap-2 items-center">
          <div className="text-6xl">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}</div>
          <h2>Identification complete!</h2>
          <p className="text-muted-foreground">
            {correctCount} / {total} correct ({pct}%)
          </p>
          <Button onClick={restart} className="gap-2 mt-2">
            <RotateCcw className="h-4 w-4" /> Try again
          </Button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <h3 className="text-sm text-muted-foreground">Review your answers</h3>
          {results.map((r, i) => (
            <div
              key={i}
              className={`rounded-xl border p-3 ${
                r.correct ? "border-green-500/40 bg-green-500/5" : "border-red-500/40 bg-red-500/5"
              }`}
            >
              <div className="text-xs text-muted-foreground mb-1">{r.card.definition}</div>
              <div className="flex items-center justify-between gap-2">
                <div className="font-medium">{r.card.term}</div>
                {r.correct ? (
                  <Check className="h-4 w-4 text-green-500 shrink-0" />
                ) : (
                  <X className="h-4 w-4 text-red-500 shrink-0" />
                )}
              </div>
              {!r.correct && (
                <div className="text-xs text-muted-foreground mt-1">
                  Your answer: {r.answer || <em>(skipped)</em>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!card) return null;

  return (
    <div className="px-4 pb-24 flex flex-col gap-4">
      <div className="space-y-1">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {idx + 1} / {total}
          </span>
          <span>
            <span className="text-green-500">✓ {correctCount}</span> ·{" "}
            <span className="text-red-500">✗ {wrongCount}</span>
          </span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="rounded-2xl border bg-card p-5 shadow-sm">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Identify the term
        </div>
        <p className="text-lg leading-relaxed break-words">{card.definition}</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (state === "input") submit();
          else next();
        }}
        className="flex flex-col gap-3"
      >
        <Input
          placeholder="Type the term..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={state !== "input"}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />

        {state !== "input" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border p-3 ${
              state === "correct"
                ? "border-green-500/40 bg-green-500/10"
                : state === "wrong"
                ? "border-red-500/40 bg-red-500/10"
                : "border bg-card"
            }`}
          >
            <div className="flex items-center gap-2 text-sm">
              {state === "correct" && (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">Correct!</span>
                </>
              )}
              {state === "wrong" && (
                <>
                  <X className="h-4 w-4 text-red-500" />
                  <span className="text-red-500">Not quite.</span>
                </>
              )}
              {state === "revealed" && (
                <>
                  <Eye className="h-4 w-4" />
                  <span>Answer revealed</span>
                </>
              )}
            </div>
            <div className="mt-2">
              <div className="text-xs text-muted-foreground">Correct answer</div>
              <div className="text-lg font-medium break-words">{card.term}</div>
            </div>
          </motion.div>
        )}

        <div className="flex gap-2">
          {state === "input" ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  reveal();
                }}
                className="flex-1 gap-1"
              >
                <Eye className="h-4 w-4" /> Reveal
              </Button>
              <Button type="submit" className="flex-1" disabled={!answer.trim()}>
                Check
              </Button>
            </>
          ) : (
            <Button type="submit" className="w-full">
              {idx + 1 >= total ? "See results" : "Next"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
