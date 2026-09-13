import { useEffect, useState } from "react";
import { BookOpen, Layers, ListChecks, Pencil } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ThemeToggle } from "./components/ThemeToggle";
import { TableMode } from "./components/TableMode";
import { FlashcardMode } from "./components/FlashcardMode";
import { QuizMode } from "./components/QuizMode";
import { IdentificationMode } from "./components/IdentificationMode";
import { SubjectManager } from "./components/SubjectManager";
import {
  type Subject,
  DEFAULT_SUBJECTS,
  loadStoredSubjects,
  saveStoredSubjects,
  getActiveSubjectId,
  setActiveSubjectId,
} from "./data/subjects";

type Theme = "light" | "dark";
type Mode = "flashcards" | "quiz" | "identify" | "table";

function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem("fc-theme") as Theme | null;
    if (saved) return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("fc-theme", theme);
    const themeColorMetas = document.querySelectorAll('meta[name="theme-color"]');
    themeColorMetas.forEach((meta) => {
      meta.setAttribute("content", theme === "dark" ? "#18181b" : "#ffffff");
    });
  }, [theme]);

  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function useInstallablePWA() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.log("SW registration failed", err));
    }
  }, []);
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  useInstallablePWA();

  const [subjects, setSubjects] = useState<Subject[]>(() => loadStoredSubjects());
  const [activeSubjectId, setActiveSubjectIdState] = useState<string>(() =>
    getActiveSubjectId(subjects)
  );

  // Sync active subject when subjects change
  const activeSubject =
    subjects.find((s) => s.id === activeSubjectId) ?? subjects[0] ?? DEFAULT_SUBJECTS[0];

  const [mode, setMode] = useState<Mode>("flashcards");

  const handleSelectSubject = (id: string) => {
    setActiveSubjectIdState(id);
    setActiveSubjectId(id);
  };

  const handleAddSubject = (newSubject: Subject) => {
    const updated = [...subjects, newSubject];
    setSubjects(updated);
    saveStoredSubjects(updated);
    handleSelectSubject(newSubject.id);
  };

  const handleDeleteSubject = (id: string) => {
    const updated = subjects.filter((s) => s.id !== id);
    setSubjects(updated);
    saveStoredSubjects(updated);
    if (activeSubjectId === id) {
      handleSelectSubject(updated[0]?.id ?? "it-321");
    }
  };

  return (
    <div className="size-full bg-background text-foreground min-h-screen flex justify-center">
      <div className="w-full max-w-md flex flex-col">
        <header className="sticky top-0 z-20 bg-background/90 backdrop-blur border-b px-4 pb-2.5 ios-header flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="/app-logo.png"
                alt="Studiel Logo"
                className="h-10 w-10 shrink-0"
              />
              <div>
                <div className="font-bold text-base leading-tight tracking-tight flex items-center gap-1.5">
                  Studiel
                </div>
                <div className="text-[11px] text-muted-foreground leading-tight">
                  Smart Flashcards & Quizzes
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          </div>

          {/* Active Subject Selector Bar */}
          <div className="pt-0.5">
            <SubjectManager
              subjects={subjects}
              activeSubject={activeSubject}
              onSelectSubject={handleSelectSubject}
              onAddSubject={handleAddSubject}
              onDeleteSubject={handleDeleteSubject}
            />
          </div>
        </header>

        <Tabs
          value={mode}
          onValueChange={(v) => setMode(v as Mode)}
          className="flex flex-col flex-1"
        >
          <main className="flex-1 pt-4 pb-[calc(5rem+env(safe-area-inset-bottom,0px))]">
            <TabsContent value="flashcards" className="mt-0">
              <FlashcardMode cards={activeSubject.cards} />
            </TabsContent>
            <TabsContent value="quiz" className="mt-0">
              <QuizMode cards={activeSubject.cards} />
            </TabsContent>
            <TabsContent value="identify" className="mt-0">
              <IdentificationMode cards={activeSubject.cards} />
            </TabsContent>
            <TabsContent value="table" className="mt-0">
              <TableMode cards={activeSubject.cards} />
            </TabsContent>
          </main>

          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background/95 backdrop-blur border-t z-20 ios-nav">
            <TabsList className="grid grid-cols-4 w-full h-16 bg-transparent p-0 rounded-none">
              <TabsTrigger
                value="flashcards"
                className="flex-col gap-1 h-full rounded-none data-[state=active]:bg-accent"
              >
                <Layers className="h-5 w-5" />
                <span className="text-xs">Cards</span>
              </TabsTrigger>
              <TabsTrigger
                value="quiz"
                className="flex-col gap-1 h-full rounded-none data-[state=active]:bg-accent"
              >
                <ListChecks className="h-5 w-5" />
                <span className="text-xs">Quiz</span>
              </TabsTrigger>
              <TabsTrigger
                value="identify"
                className="flex-col gap-1 h-full rounded-none data-[state=active]:bg-accent"
              >
                <Pencil className="h-5 w-5" />
                <span className="text-xs">Identify</span>
              </TabsTrigger>
              <TabsTrigger
                value="table"
                className="flex-col gap-1 h-full rounded-none data-[state=active]:bg-accent"
              >
                <BookOpen className="h-5 w-5" />
                <span className="text-xs">Review</span>
              </TabsTrigger>
            </TabsList>
          </nav>
        </Tabs>
      </div>
    </div>
  );
}
