import { useEffect, useState } from "react";
import { BookOpen, Layers, ListChecks, Pencil } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ThemeToggle } from "./components/ThemeToggle";
import { TableMode } from "./components/TableMode";
import { FlashcardMode } from "./components/FlashcardMode";
import { QuizMode } from "./components/QuizMode";
import { InstallButton } from "./components/InstallButton";
import { IdentificationMode } from "./components/IdentificationMode";
import { SubjectManager } from "./components/SubjectManager";
import {
  type Subject,
  loadStoredSubjects,
  saveStoredSubjects,
  getActiveSubjectId,
  setActiveSubjectId,
} from "./data/subjects";

type Theme = "light" | "dark";

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
  }, [theme]);

  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function useInstallablePWA() {
  useEffect(() => {
    const manifest = {
      name: "Studiel — Flashcards & Quizzes",
      short_name: "Studiel",
      start_url: ".",
      display: "standalone",
      background_color: "#0f172a",
      theme_color: "#4f46e5",
      icons: [
        {
          src:
            "data:image/svg+xml;utf8," +
            encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect width='192' height='192' rx='44' fill='%234f46e5'/><text x='50%' y='63%' font-size='105' text-anchor='middle' fill='white' font-family='system-ui, -apple-system, sans-serif' font-weight='800'>S</text></svg>`
            ),
          sizes: "192x192",
          type: "image/svg+xml",
          purpose: "any maskable",
        },
      ],
    };
    const blob = new Blob([JSON.stringify(manifest)], { type: "application/manifest+json" });
    const url = URL.createObjectURL(blob);
    let link = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "manifest";
      document.head.appendChild(link);
    }
    link.href = url;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="apple-mobile-web-app-capable"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "apple-mobile-web-app-capable";
      meta.content = "yes";
      document.head.appendChild(meta);
    }

    let vp = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (!vp) {
      vp = document.createElement("meta");
      vp.name = "viewport";
      vp.content = "width=device-width, initial-scale=1, viewport-fit=cover";
      document.head.appendChild(vp);
    }

    if ("serviceWorker" in navigator) {
      const swCode = `
        const CACHE = 'studiel-v2';
        self.addEventListener('install', (e) => { self.skipWaiting(); });
        self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });
        self.addEventListener('fetch', (event) => {
          const req = event.request;
          if (req.method !== 'GET') return;
          event.respondWith(
            caches.open(CACHE).then(async (cache) => {
              const cached = await cache.match(req);
              const fetchPromise = fetch(req).then((res) => {
                if (res && res.status === 200 && res.type === 'basic') {
                  cache.put(req, res.clone());
                }
                return res;
              }).catch(() => cached);
              return cached || fetchPromise;
            })
          );
        });
      `;
      const swBlob = new Blob([swCode], { type: "application/javascript" });
      const swUrl = URL.createObjectURL(swBlob);
      navigator.serviceWorker.register(swUrl).catch(() => {});
    }

    return () => URL.revokeObjectURL(url);
  }, []);
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  useInstallablePWA();

  const [subjects, setSubjects] = useState<Subject[]>(() => loadStoredSubjects());
  const [activeSubjectId, setActiveSubjectIdState] = useState<string>(() =>
    getActiveSubjectId(subjects)
  );

  const activeSubject =
    subjects.find((s) => s.id === activeSubjectId) || subjects[0];

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
        <header className="sticky top-0 z-20 bg-background/90 backdrop-blur border-b px-4 py-2.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                S
              </div>
              <div>
                <div className="font-bold text-base leading-tight tracking-tight flex items-center gap-1.5">
                  Studiel
                  <span className="text-[10px] uppercase font-semibold tracking-wider bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                    PWA
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground leading-tight">
                  Smart Flashcards & Quizzes
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <InstallButton />
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

        <Tabs defaultValue="flashcards" className="flex flex-col flex-1">
          <main className="flex-1 pt-4">
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

          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-background/95 backdrop-blur border-t z-20">
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
