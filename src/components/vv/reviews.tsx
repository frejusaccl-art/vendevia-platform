"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Icon } from "./icons";
import { fmtAverage, roleLabel, submitReview, summarize, TEXT_MAX, TEXT_MIN, useReviews, validateReview } from "@/lib/reviews";
import type { Review, ReviewErrors, ReviewRole } from "@/lib/reviews";

const STAR = "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5z";
const ratingWords = ["Décevant", "Moyen", "Correct", "Très bien", "Excellent"];

export function StarRow({ value, size = 18 }: { value: number; size?: number }) {
  const full = Math.round(value);
  return (
    <span className="vv-stars" role="img" aria-label={`Note : ${fmtAverage(value)} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path className={n <= full ? "on" : "off"} d={STAR} /></svg>
      ))}
    </span>
  );
}

const initialsOf = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("") || "?";
const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

type Shown = Pick<Review, "name" | "text" | "rating" | "role"> & { createdAt?: string; example?: boolean };

export function ReviewCard({ review }: { review: Shown }) {
  return (
    <figure className="vv-quote vv-review">
      <div className="vv-review-top">
        <StarRow value={review.rating} size={16} />
        {review.example && <span className="vv-review-badge">Exemple</span>}
      </div>
      <blockquote style={{ margin: 0 }}><p>{review.text}</p></blockquote>
      <figcaption className="vv-person">
        <span className="vv-avatar">{initialsOf(review.name)}</span>
        <div>
          <strong>{review.name}</strong>
          <span>{roleLabel[review.role]}{review.createdAt ? ` · ${fmtDate(review.createdAt)}` : ""}</span>
        </div>
      </figcaption>
    </figure>
  );
}

function StarInput({ value, onChange, describedBy, invalid }: { value: number; onChange: (n: number) => void; describedBy?: string; invalid?: boolean }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div>
      <div className="vv-star-input" role="radiogroup" aria-label="Votre note" aria-describedby={describedBy} aria-invalid={invalid || undefined} onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} sur 5 : ${ratingWords[n - 1]}`}
            tabIndex={value === n || (value === 0 && n === 1) ? 0 : -1}
            className="vv-star-btn"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
              e.preventDefault();
              const dir = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : -1;
              const next = Math.min(5, Math.max(1, n + dir));
              onChange(next);
              (e.currentTarget.parentElement?.children[next - 1] as HTMLElement | undefined)?.focus();
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true"><path className={n <= shown ? "on" : "off"} d={STAR} /></svg>
          </button>
        ))}
      </div>
      <span className="vv-star-word" aria-live="polite">{shown ? ratingWords[shown - 1] : "Touchez une étoile"}</span>
    </div>
  );
}

export function ReviewForm({ defaultRole, lockRole = false }: { defaultRole?: ReviewRole; lockRole?: boolean }) {
  const uid = useId();
  const [role, setRole] = useState<ReviewRole | null>(defaultRole ?? null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [done, setDone] = useState<{ name: string; role: ReviewRole; pending: boolean } | null>(null);
  const [website, setWebsite] = useState(""); // champ piège anti-robots, invisible
  const [submitting, setSubmitting] = useState(false);
  const [failure, setFailure] = useState("");

  const clear = (k: keyof ReviewErrors) => setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const errs = validateReview({ role, name, rating, text, consent });
    setErrors(errs);
    setFailure("");
    if (Object.keys(errs).length > 0 || !role) return;
    setSubmitting(true);
    try {
      const res = await submitReview({ role, name, rating, text, consent }, website);
      setDone({ name: name.trim(), role, pending: res.status === "pending" });
      setName(""); setRating(0); setText(""); setConsent(false);
    } catch (err) {
      setFailure(err instanceof Error && err.message === "rate"
        ? "Vous avez envoyé plusieurs avis récemment. Réessayez dans une heure."
        : "L’envoi a échoué. Vérifiez votre connexion et réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="vv-form-ok" role="status">
        <strong>{done.pending ? `Merci ${done.name}, votre avis est bien reçu.` : `Merci ${done.name}, votre avis est publié.`}</strong>
        <p>Il aide d’autres {done.role === "agence" ? "agences" : "propriétaires"} à choisir en confiance.</p>
        <p className="vv-form-ok-note">{done.pending
          ? "Notre équipe le relit rapidement (contenu respectueux, pas de coordonnées) avant de le rendre visible par tous."
          : "Démonstration : l’avis est enregistré sur cet appareil. Il sera visible par tous les visiteurs dès que la base de données partagée sera branchée."}</p>
        <div className="vv-form-ok-actions">
          <Link className="vv-btn vv-btn--primary vv-btn--sm" href="/avis">Voir les avis</Link>
          <button type="button" className="vv-btn vv-btn--outline vv-btn--sm" onClick={() => setDone(null)}>Écrire un autre avis</button>
        </div>
      </div>
    );
  }

  const count = text.trim().length;
  return (
    <form className="vv-review-form" onSubmit={submit} noValidate>
      {failure && <p className="vv-error" role="alert">{failure}</p>}
      <div aria-hidden="true" style={{ height: 0, left: -9999, overflow: "hidden", position: "absolute" }}>
        <label>Ne pas remplir<input autoComplete="off" name="website" onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} value={website} /></label>
      </div>
      {Object.keys(errors).filter((k) => errors[k as keyof ReviewErrors]).length > 0 && <p className="vv-error" role="alert">Corrigez les champs signalés pour publier votre avis.</p>}

      {!lockRole && (
        <div className="vv-field">
          <span className="vv-label" id={`${uid}-role`}>Vous êtes</span>
          <div className="vv-tiles vv-tiles--2" role="radiogroup" aria-labelledby={`${uid}-role`}>
            {(["proprietaire", "agence"] as const).map((r) => (
              <button key={r} type="button" role="radio" aria-checked={role === r} className="vv-tile" style={{ minHeight: 72 }} onClick={() => { setRole(r); clear("role"); }}>
                <Icon name={r === "agence" ? "building" : "user"} size={22} />{roleLabel[r]}
              </button>
            ))}
          </div>
          {errors.role && <span className="vv-error">{errors.role}</span>}
        </div>
      )}

      <div className="vv-field">
        <span className="vv-label" id={`${uid}-rating`}>Votre note</span>
        <StarInput value={rating} onChange={(n) => { setRating(n); clear("rating"); }} describedBy={`${uid}-rating`} invalid={!!errors.rating} />
        {errors.rating && <span className="vv-error">{errors.rating}</span>}
      </div>

      <div className="vv-field">
        <label className="vv-label" htmlFor={`${uid}-text`}>Votre avis</label>
        <textarea
          id={`${uid}-text`}
          className="vv-textarea"
          maxLength={TEXT_MAX + 50}
          placeholder={role === "agence" ? "Ex. : des demandes bien qualifiées, un suivi clair, des rendez-vous réellement tenus…" : "Ex. : un projet décrit en quelques minutes, une agence trouvée rapidement, des échanges clairs…"}
          value={text}
          aria-invalid={!!errors.text}
          aria-describedby={`${uid}-text-help`}
          onChange={(e) => { setText(e.target.value); clear("text"); }}
        />
        <span className="vv-counter" id={`${uid}-text-help`}>{count}/{TEXT_MAX} · {TEXT_MIN} minimum</span>
        {errors.text && <span className="vv-error">{errors.text}</span>}
      </div>

      <div className="vv-field">
        <label className="vv-label" htmlFor={`${uid}-name`}>Prénom affiché <small>(ex. Sophie L.)</small></label>
        <input id={`${uid}-name`} className="vv-input" autoComplete="given-name" maxLength={40} value={name} aria-invalid={!!errors.name} onChange={(e) => { setName(e.target.value); clear("name"); }} />
        {errors.name && <span className="vv-error">{errors.name}</span>}
      </div>

      <div className="vv-field">
        <label className="vv-consent">
          <input type="checkbox" checked={consent} aria-invalid={!!errors.consent} onChange={(e) => { setConsent(e.target.checked); clear("consent"); }} />
          <span>J’autorise la publication de mon avis avec le prénom indiqué. Mon e-mail et mon téléphone ne sont jamais affichés.</span>
        </label>
        {errors.consent && <span className="vv-error">{errors.consent}</span>}
      </div>

      <button type="submit" className="vv-btn vv-btn--primary vv-btn--block" disabled={submitting}>{submitting ? "Envoi…" : "Publier mon avis"}</button>
    </form>
  );
}

export function ReviewsBoard() {
  const reviews = useReviews();
  const [filter, setFilter] = useState<"all" | ReviewRole>("all");
  const sum = summarize(reviews);
  const shown = filter === "all" ? reviews : reviews.filter((r) => r.role === filter);
  const filters: { id: "all" | ReviewRole; label: string }[] = [{ id: "all", label: "Tous" }, { id: "proprietaire", label: "Propriétaires" }, { id: "agence", label: "Agences" }];

  return (
    <div className="vv-avis-grid">
      <div>
        <section className="vv-rating-card" aria-label="Note moyenne">
          {sum.count > 0 ? (
            <>
              <div className="vv-rating-line"><strong>{fmtAverage(sum.average)}</strong><StarRow value={sum.average} size={20} /><span>sur {sum.count} avis</span></div>
              <ul className="vv-bars">
                {sum.dist.map((d) => (
                  <li key={d.stars}><span>{d.stars} ★</span><i><b style={{ width: `${(d.n / sum.count) * 100}%` }} /></i><span>{d.n}</span></li>
                ))}
              </ul>
            </>
          ) : (
            <p className="vv-muted">Pas encore de note : elle apparaîtra dès le premier avis.</p>
          )}
        </section>

        <div className="vv-filter" role="group" aria-label="Filtrer les avis">
          {filters.map((f) => <button key={f.id} type="button" className="vv-chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>)}
        </div>

        {shown.length > 0 ? (
          <div className="vv-review-list">{shown.map((r) => <ReviewCard key={r.id} review={r} />)}</div>
        ) : (
          <div className="vv-empty">
            <h2>{reviews.length === 0 ? "Aucun avis pour le moment" : "Aucun avis dans cette catégorie"}</h2>
            <p>{reviews.length === 0 ? "Vous avez utilisé Vendevia ? Soyez le premier à partager votre expérience : cela aide les prochains propriétaires et agences à choisir en confiance." : "Changez de filtre ou donnez le vôtre."}</p>
            <a className="vv-btn vv-btn--primary vv-btn--sm" href="#donner-mon-avis">Donner mon avis</a>
          </div>
        )}
      </div>

      <aside className="vv-avis-side" id="donner-mon-avis" aria-labelledby="donner-title">
        <h2 id="donner-title">Donnez votre avis</h2>
        <p className="vv-muted">Moins d’une minute. Votre expérience aide d’autres personnes à choisir en confiance.</p>
        <ReviewForm />
      </aside>
    </div>
  );
}

const examples: Shown[] = [
  { name: "Sophie L.", role: "proprietaire", rating: 5, text: "Service très professionnel, j’ai trouvé une agence en moins d’une semaine.", example: true },
  { name: "Thomas D.", role: "agence", rating: 5, text: "Des leads de qualité et un suivi impeccable. Vendevia fait vraiment la différence.", example: true },
  { name: "Julie N.", role: "proprietaire", rating: 4, text: "Très simple d’utilisation et un vrai accompagnement. Je recommande.", example: true },
];

export function HomeReviews() {
  const reviews = useReviews();
  const sum = summarize(reviews);
  const real = reviews.slice(0, 3);
  return (
    <section aria-labelledby="quotes-title" className="vv-section" id="avis">
      <div className="vv-reviews-head">
        <div>
          <h2 className="vv-section-title" id="quotes-title">Ils nous font confiance</h2>
          {sum.count > 0 && <div className="vv-rating-line"><strong>{fmtAverage(sum.average)}</strong><StarRow value={sum.average} /><span>sur {sum.count} avis</span></div>}
        </div>
        {sum.count > 0 && <Link className="vv-btn vv-btn--outline vv-btn--sm" href="/avis">Voir tous les avis</Link>}
      </div>
      <div className="vv-quotes">
        {(real.length > 0 ? real : examples).map((r, i) => <ReviewCard key={"id" in r ? (r as Review).id : i} review={r} />)}
      </div>
      {real.length === 0 && <p className="vv-example-note">Ces trois témoignages sont des exemples. Ils laisseront la place aux vrais avis dès qu’ils seront publiés.</p>}

      <div className="vv-invite">
        <div>
          <h3>Vous avez utilisé Vendevia&nbsp;?</h3>
          <p>Votre avis aide d’autres propriétaires et agences à choisir en confiance. Il vous prend moins d’une minute, et c’est vous qui décidez de ce qui est publié.</p>
        </div>
        <div className="vv-invite-actions">
          <Link className="vv-btn vv-btn--light" href="/avis#donner-mon-avis">Donner mon avis</Link>
          <Link className="vv-btn vv-btn--ghost-light" href="/avis">Lire les avis</Link>
        </div>
      </div>
    </section>
  );
}

export function ReviewNudge({ role }: { role: ReviewRole }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const who = role === "agence" ? "agences" : "propriétaires";
  return (
    <section className="vv-panel vv-nudge" aria-labelledby={`${id}-t`} style={{ marginTop: 18 }}>
      <div className="vv-nudge-head">
        <span className="vv-nudge-ico" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24"><path d={STAR} fill="currentColor" /></svg></span>
        <div>
          <h2 id={`${id}-t`}>Partagez votre expérience</h2>
          <p>Votre avis aide d’autres {who} à choisir en confiance. Moins d’une minute, et il sera visible sur la page des avis.</p>
        </div>
        {!open && <button type="button" className="vv-btn vv-btn--primary vv-btn--sm" aria-expanded={false} onClick={() => setOpen(true)}>Donner mon avis</button>}
      </div>
      {open && <div className="vv-nudge-form"><ReviewForm defaultRole={role} lockRole /></div>}
    </section>
  );
}
