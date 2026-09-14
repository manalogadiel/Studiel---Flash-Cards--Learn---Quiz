import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  BookOpen,
  Check,
  ChevronDown,
  FileSpreadsheet,
  Layers,
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";
import type { Subject, Flashcard } from "../data/subjects";

type SubjectManagerProps = {
  subjects: Subject[];
  activeSubject: Subject;
  onSelectSubject: (subjectId: string) => void;
  onAddSubject: (newSubject: Subject) => void;
  onDeleteSubject: (subjectId: string) => void;
};

export function SubjectManager({
  subjects,
  activeSubject,
  onSelectSubject,
  onAddSubject,
  onDeleteSubject,
}: SubjectManagerProps) {
  const [openSelect, setOpenSelect] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  // Add Subject Form State
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [cards, setCards] = useState<Flashcard[]>([]);

  // Manual card entry
  const [currentTerm, setCurrentTerm] = useState("");
  const [currentDef, setCurrentDef] = useState("");

  // Bulk paste
  const [bulkText, setBulkText] = useState("");
  const [parseError, setParseError] = useState("");

  const resetAddForm = () => {
    setName("");
    setCode("");
    setDescription("");
    setCards([]);
    setCurrentTerm("");
    setCurrentDef("");
    setBulkText("");
    setParseError("");
  };

  const handleAddSingleCard = () => {
    if (!currentTerm.trim() || !currentDef.trim()) return;
    const newCard: Flashcard = {
      id: Date.now() + Math.random(),
      term: currentTerm.trim(),
      definition: currentDef.trim(),
    };
    setCards((prev) => [...prev, newCard]);
    setCurrentTerm("");
    setCurrentDef("");
  };

  const handleParseBulk = () => {
    setParseError("");
    if (!bulkText.trim()) return;

    const lines = bulkText.split(/\r?\n/);
    const parsedCards: Flashcard[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      let term = "";
      let def = "";

      if (line.includes("\t")) {
        const parts = line.split("\t");
        term = parts[0]?.trim();
        def = parts.slice(1).join(" ").trim();
      } else if (line.includes(" - ")) {
        const parts = line.split(" - ");
        term = parts[0]?.trim();
        def = parts.slice(1).join(" - ").trim();
      } else if (line.includes(" – ")) {
        const parts = line.split(" – ");
        term = parts[0]?.trim();
        def = parts.slice(1).join(" – ").trim();
      } else if (line.includes(":")) {
        const parts = line.split(":");
        term = parts[0]?.trim();
        def = parts.slice(1).join(":").trim();
      } else if (line.includes("=")) {
        const parts = line.split("=");
        term = parts[0]?.trim();
        def = parts.slice(1).join("=").trim();
      }

      if (term && def) {
        parsedCards.push({
          id: Date.now() + i + Math.random(),
          term,
          definition: def,
        });
      }
    }

    if (parsedCards.length === 0) {
      setParseError(
        "Could not detect terms and definitions. Use format 'Term - Definition' or 'Term: Definition' per line."
      );
      return;
    }

    setCards((prev) => [...prev, ...parsedCards]);
    setBulkText("");
  };

  const handleRemoveCard = (cardId: number) => {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  };

  const handleSaveSubject = () => {
    if (!name.trim()) return;
    if (cards.length === 0) {
      setParseError("Please add at least 1 flashcard for this subject.");
      return;
    }

    const id = "subj-" + Date.now();
    const newSubject: Subject = {
      id,
      name: name.trim(),
      code: code.trim() || undefined,
      description: description.trim() || undefined,
      isCustom: true,
      cards,
    };

    onAddSubject(newSubject);
    resetAddForm();
    setOpenAdd(false);
    setOpenSelect(false);
  };

  return (
    <>
      {/* Subject Trigger in Header */}
      <Dialog open={openSelect} onOpenChange={setOpenSelect}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 p-1.5 px-2.5 rounded-lg border bg-muted/40 hover:bg-muted/80 text-left transition max-w-[200px] sm:max-w-xs md:max-w-sm truncate"
            title="Switch subject"
          >
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                {activeSubject.code && (
                  <span className="text-[10px] font-semibold bg-primary/15 text-primary px-1.5 py-0.2 rounded">
                    {activeSubject.code}
                  </span>
                )}
                <span className="text-xs font-semibold truncate leading-none text-foreground">
                  {activeSubject.name}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                <Layers className="h-2.5 w-2.5" />
                {activeSubject.cards.length} cards
              </span>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-auto" />
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-md sm:max-w-lg md:max-w-xl p-5 md:p-6 max-h-[85vh] flex flex-col">
          <DialogHeader className="pb-2">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              Select Subject
            </DialogTitle>
            <DialogDescription>
              Switch between course review decks or create your own custom subject.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-2 py-1 pr-1">
            {subjects.map((subj) => {
              const isActive = subj.id === activeSubject.id;
              return (
                <div
                  key={subj.id}
                  className={`group relative rounded-xl border p-3 flex items-start justify-between cursor-pointer transition ${
                    isActive
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "hover:border-border/80 hover:bg-muted/40"
                  }`}
                  onClick={() => {
                    onSelectSubject(subj.id);
                    setOpenSelect(false);
                  }}
                >
                  <div className="space-y-1 flex-1 pr-2">
                    <div className="flex items-center gap-2">
                      {subj.code && (
                        <Badge variant="secondary" className="text-xs font-mono">
                          {subj.code}
                        </Badge>
                      )}
                      <h4 className="font-semibold text-sm leading-snug">
                        {subj.name}
                      </h4>
                    </div>
                    {subj.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {subj.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 pt-0.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Layers className="h-3 w-3" />
                        {subj.cards.length} flashcards
                      </span>
                      {subj.isCustom && (
                        <span className="text-[11px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded">
                          Custom
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-center">
                    {isActive && (
                      <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                    )}
                    {subj.isCustom && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:bg-destructive/10"
                        title="Delete custom subject"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            confirm(
                              `Are you sure you want to delete "${subj.name}"?`
                            )
                          ) {
                            onDeleteSubject(subj.id);
                          }
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t mt-2 flex justify-between items-center">
            <Button
              type="button"
              className="w-full gap-2"
              onClick={() => {
                resetAddForm();
                setOpenAdd(true);
              }}
            >
              <Plus className="h-4 w-4" /> Add New Subject
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Subject Dialog */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent className="max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl p-5 md:p-6 max-h-[90vh] flex flex-col">
          <DialogHeader className="pb-1">
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Add New Subject
            </DialogTitle>
            <DialogDescription>
              Create a custom subject and add flashcards manually or paste in bulk.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4 py-2 pr-1">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="subj-name" className="text-xs">
                  Subject Name *
                </Label>
                <Input
                  id="subj-name"
                  placeholder="e.g. Data Structures & Algorithms"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subj-code" className="text-xs">
                  Course Code
                </Label>
                <Input
                  id="subj-code"
                  placeholder="e.g. CS 201"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="h-9 text-sm font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="subj-desc" className="text-xs">
                Description (Optional)
              </Label>
              <Input
                id="subj-desc"
                placeholder="Brief notes or topics covered..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-9 text-sm"
              />
            </div>

            {/* Flashcard Input Options */}
            <div className="border rounded-xl p-3 bg-card/60 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  Flashcards ({cards.length})
                </h4>
                {cards.length > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs text-muted-foreground hover:text-destructive"
                    onClick={() => setCards([])}
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <Tabs defaultValue="manual" className="w-full">
                <TabsList className="grid grid-cols-2 w-full h-8 text-xs">
                  <TabsTrigger value="manual" className="text-xs gap-1.5">
                    <Plus className="h-3 w-3" /> One-by-One
                  </TabsTrigger>
                  <TabsTrigger value="bulk" className="text-xs gap-1.5">
                    <FileSpreadsheet className="h-3 w-3" /> Bulk Import
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-2 mt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Input
                      placeholder="Term or Concept (e.g. Polymorphism)"
                      value={currentTerm}
                      onChange={(e) => setCurrentTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleAddSingleCard();
                        }
                      }}
                      className="h-9 md:h-10 text-sm"
                    />
                    <Textarea
                      placeholder="Definition, explanation, or answer..."
                      value={currentDef}
                      onChange={(e) => setCurrentDef(e.target.value)}
                      rows={2}
                      className="text-sm resize-none"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleAddSingleCard}
                    disabled={!currentTerm.trim() || !currentDef.trim()}
                    className="w-full text-xs gap-1.5 h-8"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Card to Deck
                  </Button>
                </TabsContent>

                <TabsContent value="bulk" className="space-y-2 mt-2">
                  <Textarea
                    placeholder={`Paste lines of flashcards in any format:\nTerm - Definition\nTerm: Definition\nTerm [TAB] Definition`}
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    rows={4}
                    className="text-xs font-mono resize-none"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleParseBulk}
                    disabled={!bulkText.trim()}
                    className="w-full text-xs gap-1.5 h-8"
                  >
                    <Plus className="h-3.5 w-3.5" /> Parse & Add Cards
                  </Button>
                </TabsContent>
              </Tabs>

              {parseError && (
                <div className="text-xs text-destructive bg-destructive/10 p-2 rounded-lg leading-tight">
                  {parseError}
                </div>
              )}

              {/* Cards Preview List */}
              {cards.length > 0 && (
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 border-t pt-2">
                  {cards.map((c, idx) => (
                    <div
                      key={c.id}
                      className="text-xs p-2 rounded-lg bg-background border flex items-start justify-between gap-2"
                    >
                      <div className="truncate flex-1">
                        <span className="font-semibold text-foreground">
                          {idx + 1}. {c.term}
                        </span>
                        <span className="text-muted-foreground mx-1.5">—</span>
                        <span className="text-muted-foreground">{c.definition}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCard(c.id)}
                        className="text-muted-foreground hover:text-destructive shrink-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t mt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                resetAddForm();
                setOpenAdd(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSaveSubject}
              disabled={!name.trim() || cards.length === 0}
              className="gap-1.5"
            >
              <Check className="h-4 w-4" /> Save Subject
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
