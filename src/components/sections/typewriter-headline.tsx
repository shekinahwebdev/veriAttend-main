"use client";

import { useEffect, useState } from "react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const WORDS = [
  { text: "Attendance.", className: "text-foreground" },
  {
    text: "Verified.",
    className:
      "bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent",
  },
  { text: "Smarter.", className: "text-foreground" },
  { text: "Simpler.", className: "text-muted-foreground" },
] as const;

const TYPE_SPEED = 85;
const DELETE_SPEED = 50;
const PAUSE_MS = 1800;

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function TypewriterHeadline({ className }: { className?: string }) {
  const mounted = useMounted();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!mounted) return;

    let charIndex = 0;
    let deleting = false;
    let activeWord = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = WORDS[activeWord].text;

      if (!deleting) {
        charIndex += 1;
        setDisplayText(word.slice(0, charIndex));
        setWordIndex(activeWord);

        if (charIndex >= word.length) {
          deleting = true;
          timeoutId = setTimeout(tick, PAUSE_MS);
          return;
        }

        timeoutId = setTimeout(tick, TYPE_SPEED);
        return;
      }

      charIndex -= 1;
      setDisplayText(word.slice(0, charIndex));

      if (charIndex <= 0) {
        deleting = false;
        activeWord = (activeWord + 1) % WORDS.length;
        timeoutId = setTimeout(tick, TYPE_SPEED);
        return;
      }

      timeoutId = setTimeout(tick, DELETE_SPEED);
    };

    timeoutId = setTimeout(tick, TYPE_SPEED);

    return () => clearTimeout(timeoutId);
  }, [mounted]);

  const activeClass = WORDS[wordIndex]?.className ?? WORDS[0].className;

  return (
    <h1
      className={cn(
        "flex min-h-[1.2em] flex-wrap items-center justify-center gap-x-2 text-5xl font-bold tracking-normal sm:text-6xl lg:text-7xl",
        className
      )}
    >
      {mounted ? (
        <>
          <span className={cn("inline-block whitespace-nowrap", activeClass)}>
            {displayText}
          </span>
          <span
            className="inline-block h-[0.9em] w-[3px] translate-y-[0.05em] animate-pulse rounded-full bg-primary"
            aria-hidden="true"
          />
        </>
      ) : (
        <span className="text-foreground">Attendance.</span>
      )}
    </h1>
  );
}
