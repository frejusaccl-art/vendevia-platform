import { timingSafeEqual } from "node:crypto";
import { TEXT_MAX } from "./reviews-shared";
import type { ReviewInput, ReviewStatus, StoredReview } from "./reviews-shared";

/*
 * Stockage serveur des avis : Redis via l'API REST d'Upstash (compatible Vercel).
 * Variables d'environnement :
 *   UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN  → active le mode partagé
 *   AVIS_ADMIN_TOKEN                                  → active la modération (page /backoffice/avis)
 * Sans ces variables, l'API répond « non configuré » et le site garde le mode local de démonstration.
 */

const url = () => process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
const token = () => process.env.UPSTASH_REDIS_REST_TOKEN;
const HASH = "vendevia:avis";

export const isConfigured = () => Boolean(url() && token());
export const isModerationConfigured = () => isConfigured() && Boolean(process.env.AVIS_ADMIN_TOKEN);

async function redis<T = unknown>(cmd: (string | number)[]): Promise<T> {
  const res = await fetch(url() as string, {
    method: "POST",
    headers: { authorization: `Bearer ${token()}`, "content-type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const data = (await res.json()) as { result?: T; error?: string };
  if (data.error) throw new Error(data.error);
  return data.result as T;
}

function parse(raw: unknown): StoredReview | null {
  try {
    const v = JSON.parse(String(raw)) as StoredReview;
    return v && typeof v.id === "string" && typeof v.status === "string" ? v : null;
  } catch {
    return null;
  }
}

export async function listReviews(status: ReviewStatus): Promise<StoredReview[]> {
  const flat = await redis<string[]>(["HGETALL", HASH]);
  const out: StoredReview[] = [];
  for (let i = 1; i < (flat?.length ?? 0); i += 2) {
    const r = parse(flat[i]);
    if (r && r.status === status) out.push(r);
  }
  return out.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createPendingReview(input: ReviewInput): Promise<StoredReview> {
  const review: StoredReview = {
    id: crypto.randomUUID(),
    role: input.role as StoredReview["role"],
    name: input.name.trim().slice(0, 40),
    rating: input.rating,
    text: input.text.trim().slice(0, TEXT_MAX),
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  await redis(["HSET", HASH, review.id, JSON.stringify(review)]);
  return review;
}

export async function moderate(id: string, action: "approve" | "reject"): Promise<StoredReview | null> {
  const raw = await redis<string | null>(["HGET", HASH, id]);
  const current = raw ? parse(raw) : null;
  if (!current) return null;
  const next: StoredReview = { ...current, status: action === "approve" ? "published" : "rejected" };
  await redis(["HSET", HASH, id, JSON.stringify(next)]);
  return next;
}

/** Limite simple : 5 dépôts par heure et par adresse IP. */
export async function underRateLimit(ip: string): Promise<boolean> {
  const key = `vendevia:avis:rl:${ip}`;
  const n = await redis<number>(["INCR", key]);
  if (n === 1) await redis(["EXPIRE", key, 3600]);
  return n <= 5;
}

export function isAdmin(request: Request): boolean {
  const expected = process.env.AVIS_ADMIN_TOKEN;
  const given = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
