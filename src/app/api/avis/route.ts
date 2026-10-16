import type { NextRequest } from "next/server";
import { createPendingReview, isConfigured, listReviews, underRateLimit } from "@/lib/reviews-server";
import { validateReview } from "@/lib/reviews-shared";
import type { ReviewRole } from "@/lib/reviews-shared";

const noStore = { "cache-control": "no-store" };

/** Avis publiés. `configured: false` indique au site de rester en mode local. */
export async function GET(request: NextRequest) {
  void request.headers; // lecture de la requête : la réponse n'est jamais figée au build
  if (!isConfigured()) return Response.json({ configured: false, reviews: [] }, { headers: noStore });
  try {
    const published = await listReviews("published");
    return Response.json({ configured: true, reviews: published.map(({ status, ...r }) => (void status, r)) }, { headers: noStore });
  } catch {
    return Response.json({ configured: false, reviews: [] }, { headers: noStore });
  }
}

/** Dépôt d'un avis : il part en modération et n'est visible qu'une fois approuvé. */
export async function POST(request: NextRequest) {
  if (!isConfigured()) return Response.json({ error: "not_configured" }, { status: 503, headers: noStore });

  let body: Record<string, unknown>;
  try { body = (await request.json()) as Record<string, unknown>; } catch { return Response.json({ error: "bad_json" }, { status: 400, headers: noStore }); }

  // Champ piège invisible pour les humains : un robot le remplit. On répond « ok » sans rien enregistrer.
  if (typeof body.website === "string" && body.website.trim() !== "") return Response.json({ ok: true, status: "pending" }, { status: 201, headers: noStore });

  const input = {
    role: (body.role === "proprietaire" || body.role === "agence" ? body.role : null) as ReviewRole | null,
    name: typeof body.name === "string" ? body.name : "",
    rating: typeof body.rating === "number" ? body.rating : 0,
    text: typeof body.text === "string" ? body.text : "",
    consent: body.consent === true,
  };
  const errors = validateReview(input);
  if (Object.keys(errors).length > 0) return Response.json({ error: "invalid", errors }, { status: 422, headers: noStore });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "inconnue";
  try {
    if (!(await underRateLimit(ip))) return Response.json({ error: "rate_limited" }, { status: 429, headers: noStore });
    await createPendingReview(input);
    return Response.json({ ok: true, status: "pending" }, { status: 201, headers: noStore });
  } catch {
    return Response.json({ error: "server" }, { status: 502, headers: noStore });
  }
}
