"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "./icons";
import { Scene } from "./scenes";

const stepLabels = [
  "Informations générales",
  "Type de bien",
  "Localisation",
  "Budget",
  "Délai de vente",
  "Disponibilité",
  "Description",
  "Vos coordonnées",
  "Confirmation",
];

const propertyTypes: { id: string; label: string; icon: IconName }[] = [
  { id: "Maison", label: "Maison", icon: "home" },
  { id: "Appartement", label: "Appartement", icon: "building" },
  { id: "Terrain", label: "Terrain", icon: "terrain" },
  { id: "Autre", label: "Autre", icon: "expand" },
];

const subtypes: Record<string, string[]> = {
  Maison: ["Villa", "Maison de ville", "Maison de village", "Longère / ferme"],
  Appartement: ["Studio", "2–3 pièces", "4 pièces et plus", "Duplex / loft"],
  Terrain: ["Constructible", "À bâtir en lotissement", "Agricole", "Autre terrain"],
  Autre: ["Immeuble", "Local commercial", "Parking / garage", "Autre bien"],
};

const budgets = ["Moins de 150 000 €", "150 000 – 300 000 €", "300 000 – 500 000 €", "500 000 – 800 000 €", "800 000 € – 1,2 M€", "Plus de 1,2 M€", "Je ne sais pas encore"];
const delays = ["Dès que possible", "Dans les 3 mois", "Dans 3 à 6 mois", "Dans 6 à 12 mois", "Dans plus d’un an", "Je me renseigne"];
const weekdays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const slots = ["Matin", "Après-midi", "Début de soirée"];
const highlights = ["Jardin", "Piscine", "Garage", "Terrasse", "Vue dégagée", "Très lumineux", "Calme", "Proche transports"];
const conditions = ["À rénover", "Bon état", "Rénové ou neuf"];

type Data = {
  type: string; note: string;
  subtype: string; surface: string; rooms: string; condition: string;
  address: string; zip: string; city: string;
  budget: string; delay: string;
  days: string[]; slots: string[];
  story: string; highlights: string[];
  firstName: string; lastName: string; email: string; phone: string; consent: boolean;
};

const empty: Data = {
  type: "", note: "", subtype: "", surface: "", rooms: "", condition: "",
  address: "", zip: "", city: "", budget: "", delay: "", days: [], slots: [],
  story: "", highlights: [], firstName: "", lastName: "", email: "", phone: "", consent: false,
};

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function validate(step: number, d: Data): Record<string, string> {
  const e: Record<string, string> = {};
  if (step === 0 && !d.type) e.type = "Choisissez le type de bien pour continuer.";
  if (step === 2) {
    if (!/^\d{5}$/.test(d.zip.trim())) e.zip = "Indiquez un code postal à 5 chiffres.";
    if (!d.city.trim()) e.city = "Indiquez la ville du bien.";
  }
  if (step === 3 && !d.budget) e.budget = "Sélectionnez une tranche, ou « Je ne sais pas encore ».";
  if (step === 4 && !d.delay) e.delay = "Sélectionnez un délai, même approximatif.";
  if (step === 7) {
    if (!d.firstName.trim()) e.firstName = "Votre prénom est nécessaire.";
    if (!d.lastName.trim()) e.lastName = "Votre nom est nécessaire.";
    if (!/^\S+@\S+\.\S+$/.test(d.email.trim())) e.email = "Saisissez une adresse e-mail valide.";
    if (d.phone.replace(/\D/g, "").length < 9) e.phone = "Saisissez un numéro de téléphone valide.";
    if (!d.consent) e.consent = "Votre accord est nécessaire pour transmettre votre demande.";
  }
  return e;
}

export function OwnerFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    heading.current?.focus();
  }, [step, done]);

  const set = <K extends keyof Data>(key: K, value: Data[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  function next() {
    const found = validate(step, data);
    setErrors(found);
    if (Object.keys(found).length === 0) setStep((s) => Math.min(s + 1, stepLabels.length - 1));
  }
  function back() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }
  function submit() {
    const found = validate(7, data);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStep(7);
      return;
    }
    setDone(true);
  }

  const pct = Math.round(((step + 1) / stepLabels.length) * 100);

  return (
    <div className="vv-flow">
      <nav aria-label="Étapes du projet" className="vv-stepper">
        {stepLabels.map((label, i) => (
          <div className={`vv-stepper-item${i === step && !done ? " is-current" : ""}${i < step || done ? " is-done" : ""}`} key={label} aria-current={i === step && !done ? "step" : undefined}>
            <span className="n">{i < step || done ? <Icon name="check" size={12} /> : i + 1}</span>
            {label}
          </div>
        ))}
      </nav>

      <div>
        {!done && (
          <div className="vv-flow-progress">
            <div aria-label="Progression" aria-valuemax={9} aria-valuemin={1} aria-valuenow={step + 1} className="bar" role="progressbar">
              <i style={{ width: `${pct}%` }} />
            </div>
            <p>Étape {step + 1} sur 9 · {stepLabels[step]}</p>
          </div>
        )}

        <section className="vv-flow-card">
          {done ? (
            <div className="vv-success">
              <span className="badge"><Icon name="check" size={30} /></span>
              <h1 ref={heading} tabIndex={-1}>Merci {data.firstName}, votre projet est prêt.</h1>
              <p className="lede" style={{ margin: "8px auto 20px", maxWidth: 440 }}>
                Une agence adaptée à votre bien et à votre calendrier pourra vous contacter. Vous restez libre de ne donner aucune suite.
              </p>
              <p className="vv-demo-note">Version de démonstration : aucune donnée n’a été envoyée.</p>
              <Link className="vv-btn vv-btn--primary" href="/proprietaire/tableau-de-bord">
                Voir mon espace <Icon name="arrow" size={16} />
              </Link>
            </div>
          ) : (
            <>
              <p className="vv-eyebrow">Étape {step + 1} sur 9</p>
              <h1 ref={heading} tabIndex={-1}>{step + 1}. {stepLabels[step]}</h1>
              <p className="lede">{ledes[step]}</p>

              {step === 0 && (
                <>
                  <div className="vv-field">
                    <span className="vv-label" id="type-label">Quel est le type de bien&nbsp;?</span>
                    <div aria-labelledby="type-label" className="vv-tiles" role="radiogroup">
                      {propertyTypes.map((t) => (
                        <button aria-checked={data.type === t.id} className="vv-tile" key={t.id} onClick={() => { set("type", t.id); set("subtype", ""); }} role="radio" type="button">
                          <Icon name={t.icon} size={26} />
                          {t.label}
                        </button>
                      ))}
                    </div>
                    {errors.type && <p className="vv-error" role="alert">{errors.type}</p>}
                  </div>
                  <div className="vv-field">
                    <label className="vv-label" htmlFor="note">Décrivez votre bien <small>(optionnel)</small></label>
                    <textarea className="vv-textarea" id="note" maxLength={500} onChange={(e) => set("note", e.target.value)} placeholder="Ex. : Maison de 120 m² avec jardin, 3 chambres…" value={data.note} />
                    <span className="vv-counter">{data.note.length}/500</span>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div className="vv-field">
                    <span className="vv-label" id="sub-label">Précisez le type de {data.type ? data.type.toLowerCase() : "bien"}</span>
                    <div aria-labelledby="sub-label" className="vv-tiles vv-tiles--2" role="radiogroup">
                      {(subtypes[data.type] ?? subtypes.Maison).map((s) => (
                        <button aria-checked={data.subtype === s} className="vv-tile" key={s} onClick={() => set("subtype", s)} role="radio" type="button" style={{ minHeight: 60 }}>{s}</button>
                      ))}
                    </div>
                  </div>
                  <div className="vv-row">
                    <div className="vv-field">
                      <label className="vv-label" htmlFor="surface">Surface <small>(m²)</small></label>
                      <input className="vv-input" id="surface" inputMode="numeric" onChange={(e) => set("surface", e.target.value.replace(/\D/g, ""))} placeholder="Ex. : 120" value={data.surface} />
                    </div>
                    <div className="vv-field">
                      <label className="vv-label" htmlFor="rooms">Nombre de pièces</label>
                      <select className="vv-select" id="rooms" onChange={(e) => set("rooms", e.target.value)} value={data.rooms}>
                        <option value="">Choisir</option>
                        {["1", "2", "3", "4", "5", "6 et plus"].map((r) => <option key={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="vv-field">
                    <span className="vv-label" id="cond-label">État général</span>
                    <div aria-labelledby="cond-label" className="vv-tiles vv-tiles--3" role="radiogroup">
                      {conditions.map((c) => (
                        <button aria-checked={data.condition === c} className="vv-tile" key={c} onClick={() => set("condition", c)} role="radio" type="button" style={{ minHeight: 60 }}>{c}</button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="vv-field">
                    <label className="vv-label" htmlFor="address">Adresse <small>(optionnel, jamais partagée sans votre accord)</small></label>
                    <input autoComplete="street-address" className="vv-input" id="address" onChange={(e) => set("address", e.target.value)} placeholder="Numéro et rue" value={data.address} />
                  </div>
                  <div className="vv-row">
                    <div className="vv-field">
                      <label className="vv-label" htmlFor="zip">Code postal</label>
                      <input aria-invalid={!!errors.zip} autoComplete="postal-code" className="vv-input" id="zip" inputMode="numeric" maxLength={5} onChange={(e) => set("zip", e.target.value.replace(/\D/g, ""))} placeholder="75008" value={data.zip} />
                      {errors.zip && <p className="vv-error" role="alert">{errors.zip}</p>}
                    </div>
                    <div className="vv-field">
                      <label className="vv-label" htmlFor="city">Ville</label>
                      <input aria-invalid={!!errors.city} autoComplete="address-level2" className="vv-input" id="city" onChange={(e) => set("city", e.target.value)} placeholder="Paris" value={data.city} />
                      {errors.city && <p className="vv-error" role="alert">{errors.city}</p>}
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="vv-field">
                  <span className="vv-label" id="budget-label">Quel prix imaginez-vous&nbsp;?</span>
                  <div aria-labelledby="budget-label" className="vv-tiles vv-tiles--2" role="radiogroup">
                    {budgets.map((b) => (
                      <button aria-checked={data.budget === b} className="vv-tile" key={b} onClick={() => set("budget", b)} role="radio" type="button" style={{ minHeight: 56 }}>{b}</button>
                    ))}
                  </div>
                  {errors.budget && <p className="vv-error" role="alert">{errors.budget}</p>}
                </div>
              )}

              {step === 4 && (
                <div className="vv-field">
                  <span className="vv-label" id="delay-label">Dans quel délai souhaitez-vous vendre&nbsp;?</span>
                  <div aria-labelledby="delay-label" className="vv-tiles vv-tiles--2" role="radiogroup">
                    {delays.map((d) => (
                      <button aria-checked={data.delay === d} className="vv-tile" key={d} onClick={() => set("delay", d)} role="radio" type="button" style={{ minHeight: 56 }}>{d}</button>
                    ))}
                  </div>
                  {errors.delay && <p className="vv-error" role="alert">{errors.delay}</p>}
                </div>
              )}

              {step === 5 && (
                <>
                  <div className="vv-field">
                    <span className="vv-label">Jours possibles <small>(optionnel)</small></span>
                    <div className="vv-chips">
                      {weekdays.map((w) => (
                        <button aria-pressed={data.days.includes(w)} className="vv-chip" key={w} onClick={() => set("days", toggle(data.days, w))} type="button">{w}</button>
                      ))}
                    </div>
                  </div>
                  <div className="vv-field">
                    <span className="vv-label">Créneaux préférés <small>(optionnel)</small></span>
                    <div className="vv-chips">
                      {slots.map((s) => (
                        <button aria-pressed={data.slots.includes(s)} className="vv-chip" key={s} onClick={() => set("slots", toggle(data.slots, s))} type="button">{s}</button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 6 && (
                <>
                  <div className="vv-field">
                    <span className="vv-label">Points forts du bien <small>(optionnel)</small></span>
                    <div className="vv-chips">
                      {highlights.map((h) => (
                        <button aria-pressed={data.highlights.includes(h)} className="vv-chip" key={h} onClick={() => set("highlights", toggle(data.highlights, h))} type="button">{h}</button>
                      ))}
                    </div>
                  </div>
                  <div className="vv-field">
                    <label className="vv-label" htmlFor="story">Votre projet en quelques mots <small>(optionnel)</small></label>
                    <textarea className="vv-textarea" id="story" maxLength={500} onChange={(e) => set("story", e.target.value)} placeholder="Pourquoi vendez-vous ? Qu’attendez-vous d’une agence ?" value={data.story} />
                    <span className="vv-counter">{data.story.length}/500</span>
                  </div>
                </>
              )}

              {step === 7 && (
                <>
                  <div className="vv-row">
                    <div className="vv-field">
                      <label className="vv-label" htmlFor="firstName">Prénom</label>
                      <input aria-invalid={!!errors.firstName} autoComplete="given-name" className="vv-input" id="firstName" onChange={(e) => set("firstName", e.target.value)} value={data.firstName} />
                      {errors.firstName && <p className="vv-error" role="alert">{errors.firstName}</p>}
                    </div>
                    <div className="vv-field">
                      <label className="vv-label" htmlFor="lastName">Nom</label>
                      <input aria-invalid={!!errors.lastName} autoComplete="family-name" className="vv-input" id="lastName" onChange={(e) => set("lastName", e.target.value)} value={data.lastName} />
                      {errors.lastName && <p className="vv-error" role="alert">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div className="vv-row">
                    <div className="vv-field">
                      <label className="vv-label" htmlFor="email">E-mail</label>
                      <input aria-invalid={!!errors.email} autoComplete="email" className="vv-input" id="email" inputMode="email" onChange={(e) => set("email", e.target.value)} placeholder="exemple@email.com" type="email" value={data.email} />
                      {errors.email && <p className="vv-error" role="alert">{errors.email}</p>}
                    </div>
                    <div className="vv-field">
                      <label className="vv-label" htmlFor="phone">Téléphone</label>
                      <input aria-invalid={!!errors.phone} autoComplete="tel" className="vv-input" id="phone" inputMode="tel" onChange={(e) => set("phone", e.target.value)} placeholder="06 12 34 56 78" type="tel" value={data.phone} />
                      {errors.phone && <p className="vv-error" role="alert">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="vv-field">
                    <label className="vv-check">
                      <input checked={data.consent} onChange={(e) => set("consent", e.target.checked)} type="checkbox" />
                      <span>J’accepte que ma demande soit transmise à des agences sélectionnées. <Link className="vv-link" href="/legal/confidentialite">Politique de confidentialité</Link></span>
                    </label>
                    {errors.consent && <p className="vv-error" role="alert">{errors.consent}</p>}
                  </div>
                </>
              )}

              {step === 8 && (
                <>
                  <dl className="vv-summary">
                    {[
                      ["Bien", [data.type, data.subtype].filter(Boolean).join(" · ") || "—"],
                      ["Surface · pièces", [data.surface && `${data.surface} m²`, data.rooms && `${data.rooms} p.`].filter(Boolean).join(" · ") || "—"],
                      ["Localisation", [data.zip, data.city].filter(Boolean).join(" ") || "—"],
                      ["Budget", data.budget || "—"],
                      ["Délai", data.delay || "—"],
                      ["Disponibilité", [...data.days, ...data.slots].join(", ") || "Non précisée"],
                      ["Contact", `${data.firstName} ${data.lastName} · ${data.email}`],
                    ].map(([k, v]) => (
                      <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                    ))}
                  </dl>
                  <p className="vv-demo-note">Version de démonstration : l’envoi n’est pas encore relié à un serveur.</p>
                </>
              )}

              <div className="vv-flow-nav">
                {step > 0 ? (
                  <button className="vv-btn vv-btn--outline" onClick={back} type="button"><Icon name="left" size={16} /> Retour</button>
                ) : <span />}
                {step < stepLabels.length - 1 ? (
                  <button className="vv-btn vv-btn--primary" onClick={next} type="button">Suivant <Icon name="arrow" size={16} /></button>
                ) : (
                  <button className="vv-btn vv-btn--primary" onClick={submit} type="button">Envoyer ma demande <Icon name="arrow" size={16} /></button>
                )}
              </div>
            </>
          )}
        </section>
      </div>

      <aside className="vv-flow-aside">
        <div className="vv-photo"><Scene kind="cabin" label="Illustration d’une maison en bois" /></div>
        <p className="vv-aside-note">
          <Icon name="lock" size={16} />
          Vos informations sont sécurisées et ne seront partagées qu’avec des agences sélectionnées.
        </p>
      </aside>
    </div>
  );
}

const ledes = [
  "Parlez-nous de votre bien en quelques mots.",
  "Quelques précisions pour mieux cibler les agences.",
  "L’adresse exacte reste facultative. La ville suffit pour démarrer.",
  "Une fourchette suffit, vous pourrez l’affiner avec l’agence.",
  "Un ordre de grandeur nous aide à choisir le bon accompagnement.",
  "Indiquez quand une agence peut vous joindre ou vous rencontrer.",
  "Ce que vous aimeriez que l’agence sache avant de vous appeler.",
  "Comment souhaitez-vous être contacté ?",
  "Relisez votre demande avant de l’envoyer.",
];
