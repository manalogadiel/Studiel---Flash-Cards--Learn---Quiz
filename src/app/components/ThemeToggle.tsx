import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

type Props = { theme: "light" | "dark"; onToggle: () => void };

export function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className="h-8 px-2.5 gap-1.5 rounded-full text-xs font-medium border-border/80 bg-background/50 hover:bg-accent transition-colors shadow-none"
      aria-label="Toggle light or dark theme"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-3.5 w-3.5 text-amber-400" />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5 text-slate-700" />
          <span>Dark</span>
        </>
      )}
    </Button>
  );
}

