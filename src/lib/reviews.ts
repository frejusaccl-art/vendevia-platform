import { useSyncExternalStore } from "react";
import { isReview, validateReview } from "./reviews-shared";
import type { Review, ReviewInput } from "./reviews-shared";

export * from "./reviews-shared";

/*
 * Store côté navigateur.
 * - Mode « shared » : l'API /api/avis est configurée (Redis). Les avis publiés sont lus depuis le serveur et
 *   chaque nouvel avis part en modération (statut « pending »).
 * - Mode « local » : pas de base configurée. Les avis sont gardés dans le navigateur (démonstration).
 */

type Mode = "unknown" | "shared" | "local";
type State = { mode: Mode; reviews: Review[] };

const KEY = "vendevia.avis.v1";
const SERVER_STATE: State = { mode: "unknown", reviews: [] };
const listeners = new Set<() => void>();
let state: State | null = null;
let initPromise: Promise<void> | null = null;

function loadLocal(): Review[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isReview) : [];
  } catch {
    return [];
  }
}

function persistLocal(list: Review[]) {
  try { window.localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* navigation privée : l'avis reste en mémoire */ }
}

function set(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

function init(): Promise<void> {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    try {
      const res = await fetch("/api/avis", { cache: "no-store" });
      const data: unknown = await res.json();
      const d = data as { configured?: boolean; reviews?: unknown };
      if (d && d.configured === true && Array.isArray(d.reviews)) {
        set({ mode: "shared", reviews: d.reviews.filter(isReview) });
        return;
      }
    } catch { /* API injoignable : on retombe en mode local */ }
    set({ mode: "local", reviews: loadLocal() });
  })();
  return initPromise;
}

function getSnapshot(): State {
  if (state === null) state = { mode: "unknown", reviews: [] };
  return state;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  void init();
  const onStorage = (e: StorageEvent) => { if (e.key === KEY && state?.mode === "local") set({ mode: "local", reviews: loadLocal() }); };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(cb); window.removeEventListener("storage", onStorage); };
}

export function useReviewState(): State {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER_STATE);
}

export function useReviews(): Review[] {
  return useReviewState().reviews;
}

export type SubmitResult = { status: "published" | "pending"; review?: Review };

export async function submitReview(input: ReviewInput, website = ""): Promise<SubmitResult> {
  const errors = validateReview(input);
  if (Object.keys(errors).length > 0) throw new Error("invalid");
  await init();

  if (getSnapshot().mode === "shared") {
    const res = await fetch("/api/avis", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role: input.role, name: input.name.trim(), rating: input.rating, text: input.text.trim(), consent: input.consent, website }),
    });
    if (res.status === 429) throw new Error("rate");
    if (!res.ok) throw new Error("server");
    return { status: "pending" };
  }

  const review: Review = {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role: input.role as Review["role"],
    name: input.name.trim(),
    rating: input.rating,
    text: input.text.trim(),
    createdAt: new Date().toISOString(),
  };
  const next = [review, ...getSnapshot().reviews];
  persistLocal(next);
  set({ mode: "local", reviews: next });
  return { status: "published", review };
}
