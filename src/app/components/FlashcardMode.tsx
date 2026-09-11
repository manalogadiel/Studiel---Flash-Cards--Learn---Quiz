import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";
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
          <span>{seen} / {total}</span>
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

// ─── SwipeCard ────────────────────────────────────────────────────────────────
// Pure native-touch driven card — NO Framer Motion drag.
// The motion value `x` is updated directly by touch/pointer events so the card
// follows the finger at 1:1 with zero latency.  Framer's spring animation is
// used only for the snap-back and exit fly-out.
// ─────────────────────────────────────────────────────────────────────────────

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
  const rotate = useTransform(x, [-220, 220], [-18, 18]);
  const likeOpacity = useTransform(x, [20, 100], [0, 1], { clamp: true });
  const nopeOpacity = useTransform(x, [-100, -20], [1, 0], { clamp: true });

  const front = definitionFirst ? card.definition : card.term;
  const back  = definitionFirst ? card.term : card.definition;
  const gradient = gradientFor(card.id);

  // All gesture state lives in refs — mutating them never re-renders
  const decidedRef = useRef(false);
  const gestureRef = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    startTime: number;
    axis: "h" | "v" | null; // locked gesture axis
  } | null>(null);

  // ── helpers ────────────────────────────────────────────────────────────────

  const snapBack = () =>
    animate(x, 0, { type: "spring", stiffness: 500, damping: 38, mass: 0.6 });

  const flyOut = (dir: 1 | -1, known: boolean) => {
    if (decidedRef.current) return;
    decidedRef.current = true;
    setExitDir(dir);
    onDecision(known);
  };

  const settle = (dx: number, vx: number) => {
    const DIST = 72;  // px
    const VEL  = 280; // px/s
    if      (dx >  DIST || (dx >  18 && vx >  VEL)) flyOut( 1, true);
    else if (dx < -DIST || (dx < -18 && vx < -VEL)) flyOut(-1, false);
    else snapBack();
  };

  // ── touch handlers (mobile) ────────────────────────────────────────────────

  const onTouchStart = (e: React.TouchEvent) => {
    if (decidedRef.current || e.touches.length !== 1) return;
    const t = e.touches[0];
    gestureRef.current = { startX: t.clientX, startY: t.clientY, lastX: t.clientX, startTime: performance.now(), axis: null };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!gestureRef.current || decidedRef.current || e.touches.length !== 1) return;
    const t = e.touches[0];
    const dx = t.clientX - gestureRef.current.startX;
    const dy = t.clientY - gestureRef.current.startY;

    // Determine axis after first 6 px of movement
    if (gestureRef.current.axis === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        gestureRef.current.axis = Math.abs(dx) >= Math.abs(dy) ? "h" : "v";
      }
      return;
    }

    if (gestureRef.current.axis !== "h") return; // vertical — let browser scroll

    // Block page scroll while we own this horizontal gesture
    e.preventDefault();

    // 1:1 finger → card
    x.set(dx);
    gestureRef.current.lastX = t.clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!gestureRef.current || decidedRef.current) return;
    const g = gestureRef.current;
    gestureRef.current = null;

    const touch = e.changedTouches[0];
    const endX  = touch?.clientX ?? g.lastX;
    const endY  = touch?.clientY ?? g.startY;
    const dx = endX - g.startX;
    const dy = endY - g.startY;
    const dt = Math.max(performance.now() - g.startTime, 1);

    // Tap → flip
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8 && dt < 300) {
      setFlipped((f) => !f);
      return;
    }

    if (g.axis !== "h") return; // pure vertical gesture — ignore
    settle(dx, (dx / dt) * 1000);
  };

  const onTouchCancel = () => {
    gestureRef.current = null;
    if (!decidedRef.current) snapBack();
  };

  // ── pointer handlers (mouse / stylus on desktop) ──────────────────────────

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || decidedRef.current) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    gestureRef.current = { startX: e.clientX, startY: e.clientY, lastX: e.clientX, startTime: performance.now(), axis: null };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || !gestureRef.current || decidedRef.current) return;
    const dx = e.clientX - gestureRef.current.startX;
    const dy = e.clientY - gestureRef.current.startY;
    if (gestureRef.current.axis === null) {
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4)
        gestureRef.current.axis = Math.abs(dx) >= Math.abs(dy) ? "h" : "v";
      return;
    }
    if (gestureRef.current.axis !== "h") return;
    x.set(dx);
    gestureRef.current.lastX = e.clientX;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || !gestureRef.current || decidedRef.current) return;
    const g = gestureRef.current;
    gestureRef.current = null;
    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    const dt = Math.max(performance.now() - g.startTime, 1);
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8 && dt < 300) {
      setFlipped((f) => !f);
      return;
    }
    if (g.axis !== "h") return;
    settle(dx, (dx / dt) * 1000);
  };

  const onPointerCancel = () => {
    gestureRef.current = null;
    if (!decidedRef.current) snapBack();
  };

  return (
    <motion.div
      className="absolute inset-0 select-none cursor-grab active:cursor-grabbing"
      style={{ x, rotate }}
      drag={false}
      initial={{ scale: 0.93, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{
        x: exitDir === 0 ? 0 : exitDir * 600,
        opacity: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
    >
      {/* Verdict stamps */}
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

      {/* Card flip container */}
      <div className="relative w-full h-full [perspective:1200px]">
        <motion.div
          className="absolute inset-0 [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <CardFace label={definitionFirst ? "Definition" : "Term"} content={front} gradient={gradient} />
          <CardFace label={definitionFirst ? "Term" : "Definition"} content={back} gradient={gradient} back />
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
