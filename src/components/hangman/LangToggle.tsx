"use client";

import { LOCALES, t } from "@/lib/i18n";
import { useGame } from "@/store/game-store";
import { cn } from "@/lib/utils";

export function LangToggle({ compact = false }: { compact?: boolean }) {
  const locale = useGame((s) => s.stats.locale);
  const setLocale = useGame((s) => s.setLocale);

  return (
    <div
      className={cn(
        "inline-flex rounded-full border border-line bg-paper-2 p-0.5",
        compact ? "h-9" : "h-11",
      )}
      role="group"
      aria-label={t(locale, "language")}
    >
      {LOCALES.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => setLocale(id)}
          className={cn(
            "rounded-full px-2.5 text-xs font-semibold tracking-wide transition-colors duration-150",
            compact ? "min-w-9" : "min-w-10 px-3",
            locale === id ? "bg-ink text-paper" : "text-ink-soft hover:text-ink",
          )}
          aria-pressed={locale === id}
        >
          {id === "fr" ? t(locale, "langFr") : t(locale, "langEn")}
        </button>
      ))}
    </div>
  );
}
