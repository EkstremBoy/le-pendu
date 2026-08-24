import { cellsOf } from "@/lib/game/letters";
import { cn } from "@/lib/utils";

export function WordBoard({
  word,
  guessed,
  revealAll = false,
}: {
  word: string;
  guessed: string[];
  revealAll?: boolean;
}) {
  const cells = cellsOf(word);
  return (
    <p
      className="flex flex-wrap items-end justify-center gap-x-1.5 gap-y-2 px-1"
      aria-label="Mot à trouver"
    >
      {cells.map((cell, i) => {
        if (!cell.isLetter) {
          return (
            <span key={`${cell.raw}-${i}`} className="letter-cell is-punct is-gap">
              {cell.raw === " " ? "" : cell.raw}
            </span>
          );
        }
        const shown = revealAll || guessed.includes(cell.folded);
        return (
          <span
            key={`${cell.folded}-${i}`}
            className={cn("letter-cell", shown && "is-filled")}
          >
            {shown ? cell.raw : ""}
          </span>
        );
      })}
    </p>
  );
}
