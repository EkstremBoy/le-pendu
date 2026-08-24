"use client";

import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseSecretWord } from "@/lib/game/validate-duo";
import { useGame } from "@/store/game-store";
import { t } from "@/lib/i18n";
import { enableTilt } from "@/lib/game/gravity";

export function Duo() {
  const startGame = useGame((s) => s.startGame);
  const backToMenu = useGame((s) => s.backToMenu);
  const locale = useGame((s) => s.stats.locale);
  const [value, setValue] = useState("");
  const [hide, setHide] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    const parsed = parseSecretWord(value, locale);
    if (!parsed.ok) {
      setError(parsed.reason);
      return;
    }
    setError(null);
    void enableTilt();
    startGame({ duoWord: parsed.word });
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pb-10 pt-[max(1.5rem,env(safe-area-inset-top))]">
      <header className="mb-8 flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label={t(locale, "menu")} onClick={backToMenu}>
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <h1 className="font-display text-3xl">{t(locale, "twoPlayers")}</h1>
          <p className="text-sm text-ink-soft">{t(locale, "duoLead")}</p>
        </div>
      </header>

      <label className="text-sm font-medium" htmlFor="secret-word">
        {t(locale, "secretWord")}
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="secret-word"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          type={hide ? "password" : "text"}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          className="h-12 min-w-0 flex-1 rounded-[14px] border border-line bg-paper-2 px-4 text-base text-ink outline-none ring-accent/50 focus:ring-2"
          placeholder={t(locale, "duoPlaceholder")}
        />
        <Button
          variant="secondary"
          size="icon"
          aria-label={hide ? t(locale, "showWord") : t(locale, "hideWord")}
          onClick={() => setHide((v) => !v)}
        >
          {hide ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
        </Button>
      </div>
      {error ? (
        <p className="mt-2 text-sm text-danger">{error}</p>
      ) : (
        <p className="mt-2 text-sm text-muted">{t(locale, "duoHint")}</p>
      )}

      <Button size="lg" className="mt-8 rounded-[18px]" onClick={submit}>
        {t(locale, "duoGo")}
      </Button>
    </div>
  );
}