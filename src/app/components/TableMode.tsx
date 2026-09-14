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
    <div className="flex flex-col gap-3 px-4 md:px-6 pb-24 max-w-4xl mx-auto w-full">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search terms or definitions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-11 md:h-12 text-sm md:text-base"
        />
      </div>
      <div className="text-sm text-muted-foreground">
        Showing {filtered.length} of {cards.length} terms
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((c) => (
          <li
            key={c.id}
            className="rounded-xl border bg-card p-4 md:p-5 flex flex-col gap-2 break-words hover:border-primary/40 transition-colors shadow-xs"
          >
            <div className="font-semibold text-primary text-base md:text-lg break-words">{c.term}</div>
            <div className="text-sm md:text-base text-muted-foreground leading-relaxed break-words whitespace-normal">
              {c.definition}
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="col-span-full text-center text-sm text-muted-foreground py-12">
            No matches found.
          </li>
        )}
      </ul>
    </div>
  );
}
