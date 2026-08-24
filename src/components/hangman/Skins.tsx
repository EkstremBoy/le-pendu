"use client";

import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SKIN_IDS } from "@/lib/game/types";
import { SKIN_META, isSkinUnlocked, skinName } from "@/lib/game/skins";
import { useGame } from "@/store/game-store";
import { cn } from "@/lib/utils";
import { skinBlurb, t } from "@/lib/i18n";

export function Skins() {
  const { stats, setSkin, backToMenu } = useGame();
  const locale = stats.locale;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pb-10 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <header className="mb-8 flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label={t(locale, "menu")} onClick={backToMenu}>
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <h1 className="font-display text-3xl">{t(locale, "characters")}</h1>
          <p className="text-sm text-ink-soft">{t(locale, "skinsLead")}</p>
        </div>
      </header>

      <ul className="grid grid-cols-2 gap-3">
        {SKIN_IDS.map((id) => {
          const meta = SKIN_META[id];
          const open = isSkinUnlocked(id, stats.wins);
          const selected = stats.skin === id;
          return (
            <li key={id}>
              <button
                type="button"
                disabled={!open}
                onClick={() => setSkin(id)}
                className={cn(
                  "flex h-full w-full flex-col items-start rounded-[20px] border p-4 text-left transition-colors duration-150",
                  selected ? "border-ink bg-paper-2" : "border-line bg-paper",
                  !open && "opacity-70",
                )}
              >
                <span className={`skin-${id} mb-3 grid size-14 place-items-center rounded-full bg-paper-3`}>
                  <span
                    className="block size-9 rounded-full"
                    style={{ background: "var(--puppet-skin, #f0c9a8)" }}
                  />
                </span>
                <span className="flex items-center gap-1.5 font-display text-xl">
                  {skinName(id, locale)}
                  {!open ? <Lock className="size-3.5 text-muted" /> : null}
                </span>
                <span className="mt-1 text-sm text-ink-soft">
                  {open ? skinBlurb(locale, id) : t(locale, "winsNeeded", { n: meta.winsNeeded })}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}