"use client";

import { t } from "@/lib/i18n";
import { useGame } from "@/store/game-store";
import { cn } from "@/lib/utils";

export function LangToggle() {
  const locale = useGame((s) => s.stats.locale);
  const setLocale = useGame((s) => s.setLocale);

  return (
    <div
      className="inline-flex h-11 items-center rounded-[var(--radius-md)] p-0.5"
      role="group"
      aria-label={t(locale, "language")}
    >
      {(["fr", "en"] as const).map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => setLocale(id)}
          className={cn(
            "h-9 min-w-9 rounded-[10px] px-2 text-xs font-semibold tracking-wide transition-colors duration-150",
            locale === id ? "bg-ink text-paper" : "text-ink-soft hover:bg-paper-2 hover:text-ink",
          )}
          aria-pressed={locale === id}
        >
          {id === "fr" ? t(locale, "langFr") : t(locale, "langEn")}
        </button>
      ))}
    </div>
  );
}
