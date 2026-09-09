import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { Check, RotateCcw, Shuffle, ArrowDownUp, X } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
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

const GRADIENTS = [
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-amber-400 via-orange-500 to-rose-500",
  "from-sky-500 via-blue-500 to-indigo-600",
  "from-fuchsia-500 via-pink-500 to-rose-500",
  "from-lime-400 via-green-500 to-emerald-600",
];
const gradientFor = (id: number) => GRADIENTS[Math.floor(id) % GRADIENTS.length];

type Props = {
  cards?: Flashcard[];
};

export function FlashcardMode({ cards = ALL }: Props) {
  const [definitionFirst, setDefinitionFirst] = useState(false);
  const [shuffled, setShuffled] = useState(true);
  const [stack, setStack] = useState<Flashcard[]>(() => shuffle(cards));
  const [known, setKnown] = useState(0);
  const [unknown, setUnknown] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setStack(shuffled ? shuffle(cards) : [...cards]);
    setKnown(0);
    setUnknown(0);
    setFinished(false);
  }, [cards, shuffled]);

  const current = stack[0];
  const total = cards.length;
  const seen = known + unknown;

  const rebuild = (useShuffle: boolean) => {
    setStack(useShuffle ? shuffle(cards) : [...cards]);
    setKnown(0);
    setUnknown(0);
    setFinished(false);
  };

  const onToggleShuffle = (v: boolean) => {
    setShuffled(v);
    rebuild(v);
  };

  const handleDecision = (isKnown: boolean) => {
    if (!current) return;
    if (isKnown) {
      setKnown((n) => n + 1);
      setStack((s) => {
        const next = s.slice(1);
        if (next.length === 0) setFinished(true);
        return next;
      });
    } else {
      setUnknown((n) => n + 1);
      setStack((s) => {
        const [first, ...rest] = s;
        const insertAt = Math.min(rest.length, 3 + Math.floor(Math.random() * 3));
        return [...rest.slice(0, insertAt), first, ...rest.slice(insertAt)];
      });
    }
  };

  const progress = useMemo(() => (seen / Math.max(total, 1)) * 100, [seen, total]);

  if (finished) {
    return (
      <div className="px-6 pb-24 flex flex-col items-center text-center gap-6 pt-12">
        <div className="text-6xl">🎉</div>
        <h2>You finished the deck!</h2>
        <p className="text-muted-foreground">
          Known: {known} · Marked unknown: {unknown}
        </p>
        <Button onClick={() => rebuild(shuffled)} className="gap-2">
          <RotateCcw className="h-4 w-4" /> Restart deck
        </Button>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="px-6 pb-24 flex flex-col items-center text-center gap-4 pt-12">
        <div className="text-4xl">📚</div>
        <h3 className="font-semibold text-lg">No flashcards in this subject</h3>
        <p className="text-sm text-muted-foreground">Add flashcards to start practicing!</p>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="px-4 pb-24 flex flex-col gap-3">
      <div className="rounded-xl border bg-card p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Switch
              id="def-first"
              checked={definitionFirst}
              onCheckedChange={setDefinitionFirst}
            />
            <Label htmlFor="def-first" className="cursor-pointer">
              Definition first
            </Label>
          </div>
          <div className="flex items-center gap-2">
            {shuffled ? (
              <Shuffle className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
            )}
            <Switch id="shuffle" checked={shuffled} onCheckedChange={onToggleShuffle} />
            <Label htmlFor="shuffle" className="cursor-pointer">
              {shuffled ? "Shuffle" : "In order"}
            </Label>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => rebuild(shuffled)} className="gap-1 self-end">
          <RotateCcw className="h-4 w-4" /> Restart
        </Button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {seen} / {total}
          </span>
          <span>
            <span className="text-green-500">✓ {known}</span> ·{" "}
            <span className="text-red-500">✗ {unknown}</span>
          </span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="relative h-[60vh] max-h-[480px] min-h-[320px] flex items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <SwipeCard
            key={current.id}
            card={current}
            definitionFirst={definitionFirst}
            onDecision={handleDecision}
          />
        </AnimatePresence>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Tap to flip · Swipe right if known, left if unknown
      </p>

      <div className="flex justify-center gap-6">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full h-16 w-16 border-red-500/40 text-red-500 hover:bg-red-500/10 hover:text-red-500"
          onClick={() => handleDecision(false)}
        >
          <X className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded-full h-16 w-16 border-green-500/40 text-green-500 hover:bg-green-500/10 hover:text-green-500"
          onClick={() => handleDecision(true)}
        >
          <Check className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

function SwipeCard({
  card,
  definitionFirst,
  onDecision,
}: {
  card: Flashcard;
  definitionFirst: boolean;
  onDecision: (known: boolean) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [exitDir, setExitDir] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const likeOpacity = useTransform(x, [0, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, 0], [1, 0]);

  const front = definitionFirst ? card.definition : card.term;
  const back = definitionFirst ? card.term : card.definition;
  const gradient = gradientFor(card.id);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 120) {
      setExitDir(1);
      onDecision(true);
    } else if (info.offset.x < -120) {
      setExitDir(-1);
      onDecision(false);
    } else {
      x.set(0);
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing select-none"
      style={{ x, rotate, touchAction: "pan-y" }}
      drag="x"
      dragDirectionLock
      dragElastic={0.7}
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      initial={{ scale: 0.92, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{
        x: exitDir === 0 ? 0 : exitDir * 500,
        opacity: 0,
        transition: { duration: 0.25 },
      }}
      onTap={() => {
        if (Math.abs(x.get()) < 5) setFlipped((f) => !f);
      }}
    >
      <motion.div
        className="absolute top-6 left-6 z-20 rounded-md border-2 border-red-400 px-3 py-1 text-red-100 bg-red-500/30 font-bold rotate-[-12deg] pointer-events-none"
        style={{ opacity: nopeOpacity }}
      >
        UNKNOWN
      </motion.div>
      <motion.div
        className="absolute top-6 right-6 z-20 rounded-md border-2 border-green-300 px-3 py-1 text-green-50 bg-green-500/30 font-bold rotate-[12deg] pointer-events-none"
        style={{ opacity: likeOpacity }}
      >
        KNOWN
      </motion.div>

      <div className="relative w-full h-full [perspective:1200px]">
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardFace
            label={definitionFirst ? "Definition" : "Term"}
            content={front}
            gradient={gradient}
          />
          <CardFace
            label={definitionFirst ? "Term" : "Definition"}
            content={back}
            gradient={gradient}
            back
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function CardFace({
  label,
  content,
  gradient,
  back = false,
}: {
  label: string;
  content: string;
  gradient: string;
  back?: boolean;
}) {
  const isLong = content.length > 160;
  return (
    <div
      className={`absolute inset-0 rounded-2xl shadow-xl p-5 flex flex-col text-white bg-gradient-to-br ${gradient} [backface-visibility:hidden] overflow-hidden`}
      style={back ? { transform: "rotateY(180deg)" } : undefined}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
      <div className="relative text-xs uppercase tracking-wider text-white/80">{label}</div>
      <div className="relative flex-1 flex items-center justify-center text-center overflow-y-auto py-3">
        <p
          className={`leading-snug ${isLong ? "text-sm sm:text-base" : "text-xl"}`}
          style={{ wordBreak: "break-word" }}
        >
          {content}
        </p>
      </div>
      <div className="relative text-xs text-center text-white/70">Tap to flip</div>
    </div>
  );
}
