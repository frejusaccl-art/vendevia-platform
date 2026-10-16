/* Types, règles de validation et calculs communs au navigateur et au serveur. */

export type ReviewRole = "proprietaire" | "agence";
export type ReviewStatus = "pending" | "published" | "rejected";
export type Review = { id: string; role: ReviewRole; name: string; rating: number; text: string; createdAt: string };
export type StoredReview = Review & { status: ReviewStatus };
export type ReviewInput = { role: ReviewRole | null; name: string; rating: number; text: string; consent: boolean };

export const TEXT_MIN = 20;
export const TEXT_MAX = 500;
export const roleLabel: Record<ReviewRole, string> = { proprietaire: "Propriétaire", agence: "Agence immobilière" };

export function isReview(v: unknown): v is Review {
  if (!v || typeof v !== "object") return false;
  const r = v as Record<string, unknown>;
  return typeof r.id === "string" && (r.role === "proprietaire" || r.role === "agence") && typeof r.name === "string"
    && typeof r.rating === "number" && r.rating >= 1 && r.rating <= 5 && typeof r.text === "string" && typeof r.createdAt === "string";
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
  if (i.rating < 1 || i.rating > 5 || !Number.isInteger(i.rating)) e.rating = "Choisissez une note de 1 à 5 étoiles.";
  if (text.length < TEXT_MIN) e.text = `Écrivez au moins ${TEXT_MIN} caractères (il en manque ${TEXT_MIN - text.length}).`;
  else if (text.length > TEXT_MAX) e.text = `${TEXT_MAX} caractères maximum.`;
  if (!i.consent) e.consent = "Cochez la case pour autoriser la publication de votre avis.";
  return e;
}

export function summarize(list: Review[]) {
  const count = list.length;
  const dist = [5, 4, 3, 2, 1].map((stars) => ({ stars, n: list.filter((r) => r.rating === stars).length }));
  const average = count ? list.reduce((s, r) => s + r.rating, 0) / count : 0;
  return { count, average, dist };
}

export const fmtAverage = (n: number) => n.toFixed(1).replace(".", ",");
