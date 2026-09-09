import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

type Props = { theme: "light" | "dark"; onToggle: () => void };

export function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <Button variant="ghost" size="icon" onClick={onToggle} aria-label="Toggle theme">
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
