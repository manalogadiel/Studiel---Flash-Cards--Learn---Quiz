import { useEffect, useMemo, useRef, useState, useCallback } from "react";
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
  const [shuffled, setShuffled] = useState(false);
  const [stack, setStack] = useState<Flashcard[]>(() => (shuffled ? shuffle(cards) : [...cards]));
  const [known, setKnown] = useState(0);
  const [unknown, setUnknown] = useState(0);
  const [finished, setFinished] = useState(false);
  const [cardStep, setCardStep] = useState(0);

  useEffect(() => {
    rebuild(shuffled);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  const rebuild = (shuffleCards: boolean) => {
    setStack(shuffleCards ? shuffle(cards) : [...cards]);
    setKnown(0);
    setUnknown(0);
    setFinished(false);
    setCardStep(0);
  };

  const onToggleShuffle = (checked: boolean) => {
    setShuffled(checked);
    rebuild(checked);
  };

  const handleDecision = (isKnown: boolean) => {
    setCardStep((s) => s + 1);

    if (isKnown) {
      setKnown((k) => k + 1);
      setStack((prev) => {
        const next = prev.slice(1);
        if (next.length === 0) setFinished(true);
        return next;
      });
    } else {
      // Swiped left / unknown: move card to the END of the deck so it repeats later
      setUnknown((u) => u + 1);
      setStack((prev) => {
        if (prev.length <= 1) return [...prev];
        const [currentCard, ...rest] = prev;
        return [...rest, currentCard];
      });
    }
  };

  const total = cards.length;
  const current = stack[0];
  const remaining = stack.length;
  const mastered = Math.max(0, total - remaining);
  const progress = useMemo(() => (mastered / Math.max(total, 1)) * 100, [mastered, total]);

  if (finished || !current) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 p-8 text-center min-h-[60vh]">
        <div className="rounded-full bg-green-500/10 p-6 text-green-500">
          <Check className="h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">All Cards Mastered! 🎉</h2>
          <p className="text-muted-foreground">
            You successfully completed all <span className="font-semibold text-foreground">{total}</span> terms.
          </p>
          {unknown > 0 ? (
            <p className="text-sm text-muted-foreground">
              You reviewed repeated cards <span className="text-amber-500 font-semibold">{unknown}</span> times until you got every single one correct. Great persistence!
            </p>
          ) : (
            <p className="text-sm text-emerald-500 font-medium">
              Flawless! You mastered every card on the first try!
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
            Mastered: <strong className="text-foreground">{mastered}</strong> / {total}
            {remaining > 0 && <span className="ml-1 text-xs">({remaining} left)</span>}
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-500 font-medium">✓ {known}</span>
            {unknown > 0 && (
              <span className="text-amber-500 text-xs font-medium" title="Cards sent to back for review">
                ↺ {unknown} repeated
              </span>
            )}
          </span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Card area — touch-action:none tells the browser we handle ALL touches */}
      <div
        className="relative h-[60vh] max-h-[480px] min-h-[320px] flex items-center justify-center"
        style={{ touchAction: "none" }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <SwipeCard
            key={`${current.id}-${cardStep}`}
            card={current}
            definitionFirst={definitionFirst}
            onDecision={handleDecision}
          />
        </AnimatePresence>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Tap to flip · Swipe right if known · Swipe left to repeat later
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
// Uses native addEventListener with { passive: false } so that preventDefault()
// actually works on Android & iOS.  React's synthetic onTouchMove is PASSIVE
// by default — calling preventDefault() on it is silently ignored, which is
// why the previous implementation failed on mobile.
//
// touch-action: none on both the container AND this element tells the browser
// not to handle any touch gestures (scroll, back-swipe, etc.) itself.
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

  const cardRef = useRef<HTMLDivElement>(null);
  const decidedRef = useRef(false);
  const gestureRef = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    startTime: number;
  } | null>(null);

  // ── helpers ────────────────────────────────────────────────────────────────

  const snapBack = useCallback(
    () => animate(x, 0, { type: "spring", stiffness: 500, damping: 38, mass: 0.6 }),
    [x],
  );

  const flyOut = useCallback(
    (dir: 1 | -1, known: boolean) => {
      if (decidedRef.current) return;
      decidedRef.current = true;
      setExitDir(dir);
      onDecision(known);
    },
    [onDecision],
  );

  const settle = useCallback(
    (dx: number, vx: number) => {
      const DIST = 72;
      const VEL  = 280;
      if      (dx >  DIST || (dx >  18 && vx >  VEL)) flyOut( 1, true);
      else if (dx < -DIST || (dx < -18 && vx < -VEL)) flyOut(-1, false);
      else snapBack();
    },
    [flyOut, snapBack],
  );

  // ── Native touch listeners with { passive: false } ────────────────────────
  // This is the ONLY way to make preventDefault() work on mobile browsers.
  // React's synthetic onTouchMove is always passive → preventDefault is a no-op.

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleStart = (e: TouchEvent) => {
      if (decidedRef.current || e.touches.length !== 1) return;
      const t = e.touches[0];
      gestureRef.current = {
        startX: t.clientX,
        startY: t.clientY,
        lastX: t.clientX,
        startTime: performance.now(),
      };
    };

    const handleMove = (e: TouchEvent) => {
      if (!gestureRef.current || decidedRef.current || e.touches.length !== 1) return;
      const t = e.touches[0];
      const dx = t.clientX - gestureRef.current.startX;

      // Prevent ALL default browser behaviour (scroll, back-swipe, etc.)
      e.preventDefault();

      // 1:1 finger → card position
      x.set(dx);
      gestureRef.current.lastX = t.clientX;
    };

    const handleEnd = (e: TouchEvent) => {
      if (!gestureRef.current || decidedRef.current) return;
      const g = gestureRef.current;
      gestureRef.current = null;

      const touch = e.changedTouches[0];
      const endX = touch?.clientX ?? g.lastX;
      const endY = touch?.clientY ?? g.startY;
      const dx = endX - g.startX;
      const dy = endY - g.startY;
      const dt = Math.max(performance.now() - g.startTime, 1);

      // Tap → flip card
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10 && dt < 350) {
        setFlipped((f) => !f);
        return;
      }

      settle(dx, (dx / dt) * 1000);
    };

    const handleCancel = () => {
      gestureRef.current = null;
      if (!decidedRef.current) snapBack();
    };

    // CRITICAL: { passive: false } makes preventDefault() actually work
    el.addEventListener("touchstart",  handleStart,  { passive: false });
    el.addEventListener("touchmove",   handleMove,   { passive: false });
    el.addEventListener("touchend",    handleEnd,    { passive: false });
    el.addEventListener("touchcancel", handleCancel, { passive: false });

    return () => {
      el.removeEventListener("touchstart",  handleStart);
      el.removeEventListener("touchmove",   handleMove);
      el.removeEventListener("touchend",    handleEnd);
      el.removeEventListener("touchcancel", handleCancel);
    };
  }, [x, settle, snapBack]);

  // ── Pointer handlers (mouse / stylus — desktop only) ──────────────────────

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || decidedRef.current) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    gestureRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      startTime: performance.now(),
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || !gestureRef.current || decidedRef.current) return;
    const dx = e.clientX - gestureRef.current.startX;
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
    settle(dx, (dx / dt) * 1000);
  };

  const onPointerCancel = () => {
    gestureRef.current = null;
    if (!decidedRef.current) snapBack();
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-0 select-none cursor-grab active:cursor-grabbing"
      style={{ x, rotate, touchAction: "none" }}
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
    >
      {/* Verdict stamps */}
      <motion.div
        className="absolute top-6 left-6 z-20 rounded-md border-2 border-amber-400 px-3 py-1 text-amber-100 bg-amber-500/40 font-bold rotate-[-12deg] pointer-events-none"
        style={{ opacity: nopeOpacity }}
      >
        REPEAT LATER
      </motion.div>
      <motion.div
        className="absolute top-6 right-6 z-20 rounded-md border-2 border-green-300 px-3 py-1 text-green-50 bg-green-500/30 font-bold rotate-[12deg] pointer-events-none"
        style={{ opacity: likeOpacity }}
      >
        KNOWN
      </motion.div>

      {/* Card flip container — pointer-events:none on children so they can't steal touches */}
      <div className="relative w-full h-full [perspective:1200px] pointer-events-none">
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
      className={`absolute inset-0 rounded-2xl shadow-xl p-5 flex flex-col text-white bg-gradient-to-br ${gradient} [backface-visibility:hidden] overflow-hidden pointer-events-none`}
      style={back ? { transform: "rotateY(180deg)" } : undefined}
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)]" />
      <div className="relative text-xs uppercase tracking-wider text-white/80">{label}</div>
      <div className="relative flex-1 flex items-center justify-center text-center overflow-hidden py-3">
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
