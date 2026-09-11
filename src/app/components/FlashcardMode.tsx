import { useEffect, useMemo, useRef, useState } from "react";
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
    rebuild(shuffled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const rebuild = (shuffleCards: boolean) => {
    setStack(shuffleCards ? shuffle(cards) : [...cards]);
    setKnown(0);
    setUnknown(0);
    setFinished(false);
  };

  const onToggleShuffle = (checked: boolean) => {
    setShuffled(checked);
    rebuild(checked);
  };

  const handleDecision = (isKnown: boolean) => {
    if (isKnown) setKnown((k) => k + 1);
    else setUnknown((u) => u + 1);

    setStack((prev) => {
      const next = prev.slice(1);
      if (next.length === 0) setFinished(true);
      return next;
    });
  };

  const total = cards.length;
  const current = stack[0];
  const seen = total - stack.length;
  const progress = useMemo(() => (seen / Math.max(total, 1)) * 100, [seen, total]);

  if (finished || !current) {
    const pct = Math.round((known / Math.max(total, 1)) * 100);
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8 text-center min-h-[60vh]">
        <div className="rounded-full bg-primary/10 p-6">
          <Check className="h-12 w-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Deck Completed!</h2>
          <p className="text-muted-foreground">
            You remembered <span className="font-semibold text-green-500">{known}</span> out of{" "}
            {total} terms ({pct}%).
          </p>
          {unknown > 0 && (
            <p className="text-sm text-muted-foreground">
              {unknown} terms were marked as needing more practice.
            </p>
          )}
        </div>
        <Button onClick={() => rebuild(shuffled)} className="gap-2">
          <RotateCcw className="h-4 w-4" /> Study Again
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

  return (
    <div className="flex flex-col gap-4 px-4 pb-20 select-none">
      {/* Controls Bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Switch
              id="def-first"
              checked={definitionFirst}
              onCheckedChange={setDefinitionFirst}
            />
            <Label htmlFor="def-first" className="cursor-pointer">
              {definitionFirst ? "Definition first" : "Term first"}
            </Label>
          </div>
          <div className="flex items-center gap-1.5">
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

      <div className="relative h-[60vh] max-h-[480px] min-h-[320px] flex items-center justify-center touch-none">
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
  const rotate = useTransform(x, [-200, 200], [-16, 16]);
  const likeOpacity = useTransform(x, [0, 80], [0, 1]);
  const nopeOpacity = useTransform(x, [-80, 0], [1, 0]);

  const front = definitionFirst ? card.definition : card.term;
  const back = definitionFirst ? card.term : card.definition;
  const gradient = gradientFor(card.id);

  const decidedRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const triggerDecision = (known: boolean) => {
    if (decidedRef.current) return;
    decidedRef.current = true;
    setExitDir(known ? 1 : -1);
    onDecision(known);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (decidedRef.current) return;
    const SWIPE_THRESHOLD = 65;
    const VELOCITY_THRESHOLD = 220;

    if (info.offset.x > SWIPE_THRESHOLD || (info.offset.x > 25 && info.velocity.x > VELOCITY_THRESHOLD)) {
      triggerDecision(true);
    } else if (info.offset.x < -SWIPE_THRESHOLD || (info.offset.x < -25 && info.velocity.x < -VELOCITY_THRESHOLD)) {
      triggerDecision(false);
    } else {
      x.set(0);
    }
  };

  // Direct touch handlers for seamless mobile touch responsiveness
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1 || decidedRef.current) return;
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.touches.length !== 1 || decidedRef.current) return;
    const dx = e.touches[0].clientX - touchStartRef.current.x;
    const dy = e.touches[0].clientY - touchStartRef.current.y;

    // Follow finger horizontally when horizontal movement is evident
    if (Math.abs(dx) > Math.abs(dy)) {
      x.set(dx);
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || decidedRef.current) return;
    const start = touchStartRef.current;
    touchStartRef.current = null;

    const endTouch = e.changedTouches[0];
    const endX = endTouch ? endTouch.clientX : start.x;
    const endY = endTouch ? endTouch.clientY : start.y;
    const dx = endX - start.x;
    const dy = endY - start.y;
    const elapsed = Math.max(Date.now() - start.time, 1);
    const velocityX = (dx / elapsed) * 1000;

    // Tap detected
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && elapsed < 350) {
      setFlipped((f) => !f);
      return;
    }

    // Swipe detected
    if (dx > 65 || (dx > 25 && velocityX > 220)) {
      triggerDecision(true);
    } else if (dx < -65 || (dx < -25 && velocityX < -220)) {
      triggerDecision(false);
    } else {
      x.set(0);
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing select-none touch-none"
      style={{ x, rotate, touchAction: "none" }}
      drag="x"
      dragElastic={0.8}
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      initial={{ scale: 0.92, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{
        x: exitDir === 0 ? 0 : exitDir * 550,
        opacity: 0,
        transition: { duration: 0.22 },
      }}
      onClick={() => {
        if (Math.abs(x.get()) < 6) setFlipped((f) => !f);
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
