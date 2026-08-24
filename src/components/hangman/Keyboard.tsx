import { ALPHABET, wordHasLetter } from "@/lib/game/letters";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { t, type Locale } from "@/lib/i18n";

const ROWS = ["ABCDEFG", "HIJKLMN", "OPQRSTU", "VWXYZ"];

export function Keyboard({
  guessed,
  word,
  disabled,
  onGuess,
  locale = "fr",
}: {
  guessed: string[];
  word: string;
  disabled: boolean;
  onGuess: (letter: string) => void;
  locale?: Locale;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-1.5" role="group" aria-label={t(locale, "keyboard")}>
      {ROWS.map((row) => (
        <div key={row} className="flex justify-center gap-1.5">
          {row.split("").map((letter) => {
            const used = guessed.includes(letter);
            const hit = used && wordHasLetter(word, letter);
            return (
              <Button
                key={letter}
                variant="key"
                size="key"
                disabled={disabled || used}
                aria-label={t(locale, "letter", { letter })}
                onClick={() => onGuess(letter)}
                className={cn(
                  "flex-1 max-w-11 touch-manipulation",
                  used && hit && "key-hit",
                  used && !hit && "key-miss",
                )}
              >
                {letter}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export { ALPHABET };