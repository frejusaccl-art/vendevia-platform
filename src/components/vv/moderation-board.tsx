"use client";

import { useState } from "react";
import { roleLabel, type StoredReview } from "@/lib/reviews";
import { StarRow } from "./reviews";

export function ModerationBoard() {
  const [token, setToken] = useState("");
  const [pending, setPending] = useState<StoredReview[] | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const headers = () => ({ authorization: `Bearer ${token}`, "content-type": "application/json" });

  async function load() {
    setBusy(true); setMessage("");
    try {
      const res = await fetch("/api/avis/moderation", { headers: headers(), cache: "no-store" });
      if (res.status === 503) setMessage("La modération n’est pas configurée (variables AVIS_ADMIN_TOKEN et Redis).");
      else if (res.status === 401) setMessage("Jeton refusé.");
      else if (!res.ok) setMessage("Erreur du serveur.");
      else setPending(((await res.json()) as { pending: StoredReview[] }).pending);
    } catch { setMessage("Serveur injoignable."); }
    setBusy(false);
  }

  async function act(id: string, action: "approve" | "reject") {
    setBusy(true);
    const res = await fetch("/api/avis/moderation", { method: "POST", headers: headers(), body: JSON.stringify({ id, action }) });
    if (res.ok) setPending((p) => (p ?? []).filter((r) => r.id !== id));
    else setMessage("Action impossible.");
    setBusy(false);
  }

  return (
    <div>
      <form className="vv-a-form vv-panel" onSubmit={(e) => { e.preventDefault(); void load(); }}>
        <label className="vv-label">Jeton administrateur
          <input autoComplete="off" className="vv-input" onChange={(e) => setToken(e.target.value)} type="password" value={token} />
        </label>
        <button className="vv-btn vv-btn--sm" disabled={busy || !token} type="submit">Charger les avis en attente</button>
      </form>
      {message && <p className="vv-error" role="alert" style={{ marginTop: 12 }}>{message}</p>}
      {pending && pending.length === 0 && <p className="vv-empty">Aucun avis en attente.</p>}
      <div className="vv-a-list">
        {pending?.map((r) => (
          <article className="vv-panel vv-a-card" key={r.id}>
            <div className="vv-a-card-top"><StarRow value={r.rating} /><small className="vv-muted">{roleLabel[r.role]} · {new Date(r.createdAt).toLocaleDateString("fr-FR")}</small></div>
            <h2>{r.name}</h2>
            <p>{r.text}</p>
            <div className="vv-a-actions">
              <button className="vv-btn vv-btn--outline vv-btn--sm" disabled={busy} onClick={() => void act(r.id, "reject")} type="button">Refuser</button>
              <button className="vv-btn vv-btn--sm" disabled={busy} onClick={() => void act(r.id, "approve")} type="button">Publier</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
