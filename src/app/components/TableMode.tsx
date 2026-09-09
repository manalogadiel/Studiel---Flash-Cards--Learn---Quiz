import { useMemo, useState } from "react";
import { Input } from "./ui/input";
import { Flashcard, flashcards as defaultCards } from "../data/flashcards";
import { Search } from "lucide-react";

type Props = {
  cards?: Flashcard[];
};

export function TableMode({ cards = defaultCards }: Props) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter(
      (c) => c.term.toLowerCase().includes(q) || c.definition.toLowerCase().includes(q)
    );
  }, [query, cards]);

  return (
    <div className="flex flex-col gap-3 px-4 pb-24">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search terms or definitions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="text-sm text-muted-foreground">
        Showing {filtered.length} of {cards.length} terms
      </div>
      <ul className="flex flex-col gap-2">
        {filtered.map((c) => (
          <li
            key={c.id}
            className="rounded-xl border bg-card p-4 flex flex-col gap-1.5 break-words"
          >
            <div className="font-medium text-primary break-words">{c.term}</div>
            <div className="text-sm text-muted-foreground leading-relaxed break-words whitespace-normal">
              {c.definition}
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-center text-sm text-muted-foreground py-8">
            No matches found.
          </li>
        )}
      </ul>
    </div>
  );
}
