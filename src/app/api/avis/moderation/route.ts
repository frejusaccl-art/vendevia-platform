import type { NextRequest } from "next/server";
import { isAdmin, isModerationConfigured, listReviews, moderate } from "@/lib/reviews-server";

const noStore = { "cache-control": "no-store" };

function guard(request: Request): Response | null {
  if (!isModerationConfigured()) return Response.json({ error: "not_configured" }, { status: 503, headers: noStore });
  if (!isAdmin(request)) return Response.json({ error: "unauthorized" }, { status: 401, headers: noStore });
  return null;
}

/** Avis en attente de validation (jeton administrateur requis). */
export async function GET(request: NextRequest) {
  const denied = guard(request);
  if (denied) return denied;
  try {
    return Response.json({ pending: await listReviews("pending") }, { headers: noStore });
  } catch {
    return Response.json({ error: "server" }, { status: 502, headers: noStore });
  }
}

/** Approuver ou refuser un avis : { id, action: "approve" | "reject" }. */
export async function POST(request: NextRequest) {
  const denied = guard(request);
  if (denied) return denied;
  let body: { id?: unknown; action?: unknown };
  try { body = (await request.json()) as typeof body; } catch { return Response.json({ error: "bad_json" }, { status: 400, headers: noStore }); }
  if (typeof body.id !== "string" || (body.action !== "approve" && body.action !== "reject")) return Response.json({ error: "invalid" }, { status: 422, headers: noStore });
  try {
    const result = await moderate(body.id, body.action);
    return result ? Response.json({ ok: true, status: result.status }, { headers: noStore }) : Response.json({ error: "not_found" }, { status: 404, headers: noStore });
  } catch {
    return Response.json({ error: "server" }, { status: 502, headers: noStore });
  }
}
