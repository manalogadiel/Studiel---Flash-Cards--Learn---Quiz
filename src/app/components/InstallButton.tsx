import { useEffect, useState } from "react";
import { Download, Check } from "lucide-react";
import { Button } from "./ui/button";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallButton() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-ignore iOS Safari
      window.navigator.standalone === true;
    if (standalone) setInstalled(true);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const onClick = async () => {
    if (deferred) {
      await deferred.prompt();
      await deferred.userChoice;
      setDeferred(null);
    } else {
      setShowHint((s) => !s);
    }
  };

  if (installed) {
    return (
      <Button variant="ghost" size="sm" className="gap-1.5 text-green-500" disabled>
        <Check className="h-4 w-4" /> Installed
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={onClick} className="gap-1.5">
        <Download className="h-4 w-4" /> Install
      </Button>
      {showHint && !deferred && (
        <div className="absolute right-0 top-full mt-2 w-64 z-30 rounded-md border bg-popover text-popover-foreground text-xs p-3 shadow-md">
          <div className="font-medium mb-1">Install this app</div>
          <p className="text-muted-foreground leading-relaxed">
            On iOS: tap the Share button, then "Add to Home Screen".
            On Android/Chrome: open the browser menu and tap "Install app".
          </p>
        </div>
      )}
    </div>
  );
}
