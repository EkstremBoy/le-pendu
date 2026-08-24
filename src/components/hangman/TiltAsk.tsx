"use client";

import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { enableTilt, useTiltPermission } from "@/lib/game/gravity";
import { t, type Locale } from "@/lib/i18n";

export function TiltAsk({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const perm = useTiltPermission();
  if (perm !== "ask" && perm !== "denied") return null;

  return (
    <div className={compact ? "mt-2" : "mb-6"}>
      <Button
        type="button"
        variant="secondary"
        className="h-auto w-full justify-start gap-3 rounded-[16px] px-3 py-3 text-left"
        onClick={() => {
          void enableTilt();
        }}
      >
        <Compass className="size-5 shrink-0 text-accent" />
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-ink">{t(locale, "tiltAsk")}</span>
          <span className="block text-xs text-ink-soft">
            {perm === "denied" ? t(locale, "tiltDenied") : t(locale, "tiltHint")}
          </span>
        </span>
      </Button>
    </div>
  );
}
