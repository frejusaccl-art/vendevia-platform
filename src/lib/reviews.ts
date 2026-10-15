import { useSyncExternalStore } from "react";

/*
 * Avis des propriétaires et des agences.
 * Stockage provisoire dans le navigateur (localStorage) tant que la base de données n'est pas branchée.
 * Pour passer en base partagée, il suffit de remplacer load() / persist() par des appels API :
 * les composants n'utilisent que useReviews() et addReview().
 */

export type ReviewRole = "proprietaire" | "agence";
export type Review = { id: string; role: ReviewRole; name: string; rating: number; text: string; createdAt: string };
export type ReviewInput = { role: ReviewRole | null; name: string; rating: number; text: string; consent: boolean };

export const TEXT_MIN = 20;
export const TEXT_MAX = 500;
export const roleLabel: Record<ReviewRole, string> = { proprietaire: "Propriétaire", agence: "Agence immobilière" };

const KEY = "vendevia.avis.v1";
const EMPTY: Review[] = [];
const listeners = new Set<() => void>();
let current: Review[] | null = null;

function isReview(v: unknown): v is Review {
  if (!v || typeof v !== "object") return false;
  const r = v as Record<string, unknown>;
  return typeof r.id === "string" && (r.role === "proprietaire" || r.role === "agence") && typeof r.name === "string"
    && typeof r.rating === "number" && r.rating >= 1 && r.rating <= 5 && typeof r.text === "string" && typeof r.createdAt === "string";
}

function load(): Review[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter(isReview) : [];
  } catch {
    return [];
  }
}

function persist(list: Review[]) {
  try { window.localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* navigation privée : l'avis reste en mémoire pour la session */ }
}

function getSnapshot(): Review[] {
  if (current === null) current = load();
  return current;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) { current = load(); cb(); } };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(cb); window.removeEventListener("storage", onStorage); };
}

export function useReviews(): Review[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

export type ReviewErrors = Partial<Record<"role" | "name" | "rating" | "text" | "consent", string>>;

export function validateReview(i: ReviewInput): ReviewErrors {
  const e: ReviewErrors = {};
  const name = i.name.trim();
  const text = i.text.trim();
  if (!i.role) e.role = "Indiquez si vous êtes propriétaire ou agence.";
  if (name.length < 2) e.name = "Indiquez votre prénom (2 caractères minimum).";
  else if (name.length > 40) e.name = "40 caractères maximum.";
  else if (name.includes("@")) e.name = "N’indiquez pas d’adresse e-mail : elle serait visible par tous.";
  if (i.rating < 1) e.rating = "Choisissez une note de 1 à 5 étoiles.";
  if (text.length < TEXT_MIN) e.text = `Écrivez au moins ${TEXT_MIN} caractères (il en manque ${TEXT_MIN - text.length}).`;
  else if (text.length > TEXT_MAX) e.text = `${TEXT_MAX} caractères maximum.`;
  if (!i.consent) e.consent = "Cochez la case pour autoriser la publication de votre avis.";
  return e;
}

export function addReview(i: ReviewInput): Review {
  const review: Review = {
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role: i.role as ReviewRole,
    name: i.name.trim(),
    rating: i.rating,
    text: i.text.trim(),
    createdAt: new Date().toISOString(),
  };
  current = [review, ...getSnapshot()];
  persist(current);
  listeners.forEach((l) => l());
  return review;
}

export function summarize(list: Review[]) {
  const count = list.length;
  const dist = [5, 4, 3, 2, 1].map((stars) => ({ stars, n: list.filter((r) => r.rating === stars).length }));
  const average = count ? list.reduce((s, r) => s + r.rating, 0) / count : 0;
  return { count, average, dist };
}

export const fmtAverage = (n: number) => n.toFixed(1).replace(".", ",");
