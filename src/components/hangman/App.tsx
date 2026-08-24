"use client";

import { lazy, Suspense, useEffect } from "react";
import { useGame } from "@/store/game-store";
import { TiltContext, useGravity } from "@/lib/game/gravity";
import { Menu } from "./Menu";
import { cn } from "@/lib/utils";

const Play = lazy(() => import("./Play").then((m) => ({ default: m.Play })));
const Duo = lazy(() => import("./Duo").then((m) => ({ default: m.Duo })));
const Skins = lazy(() => import("./Skins").then((m) => ({ default: m.Skins })));

export function App() {
  const view = useGame((s) => s.view);
  const hydrate = useGame((s) => s.hydrate);
  const { tilt, flipped } = useGravity();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    void import("./Play");
  }, []);

  return (
    <TiltContext.Provider value={{ tilt, flipped }}>
    <div
      className={cn("app-world", flipped && "is-flipped")}
      style={{ ["--hang-tilt" as string]: `${tilt}deg` }}
    >
      <main className="min-h-dvh bg-paper text-ink">
        {view === "menu" ? <Menu /> : null}
        <Suspense fallback={null}>
          {view === "play" ? <Play /> : null}
          {view === "duo" ? <Duo /> : null}
          {view === "skins" ? <Skins /> : null}
        </Suspense>
      </main>
    </div>
    </TiltContext.Provider>
  );
}