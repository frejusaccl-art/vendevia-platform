"use client";

import { useState } from "react";

const contactModes = [
  ["message", "Recevoir une première réponse", "Un professionnel lit votre dossier et vous répond par écrit.", "calme"],
  ["call", "Être rappelé quand je le souhaite", "Vous choisissez une fenêtre. Aucun appel surprise.", "direct"],
  ["meeting", "Préparer un rendez-vous", "Nous vous aidons à arriver avec les bonnes questions.", "concret"],
] as const;

export function MaisonContactChoice() {
  const [mode, setMode] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) return <div className="maison-form contact-choice-success" role="status"><div className="state-symbol">✓</div><p className="form-label">Demande préparée</p><h2>Vous gardez la main sur la suite.</h2><p>Votre préférence et la lecture du dossier seront transmises ensemble. Vous pourrez modifier ce choix avant tout envoi.</p><div className="transmission-receipt"><span>Transmission prévue</span><strong>{contactModes.find(([id]) => id === mode)?.[1]}</strong><small>Intention · bien · rythme · question ouverte</small></div><button className="outline-button" type="button" onClick={() => setConfirmed(false)}>Modifier mon choix <span>↺</span></button></div>;

  return <div className="maison-form contact-choice-form" aria-labelledby="contact-choice-title"><div className="form-topline"><span className="form-label">Étape 06 / votre choix</span><span className="form-duration">sans engagement</span></div><h2 id="contact-choice-title">Comment voulez-vous être accompagné ?</h2><p className="form-explanation">Il n’y a pas de transmission silencieuse. Vous choisissez ce qui peut être partagé et comment la conversation commence.</p><div className="contact-mode-options" role="radiogroup" aria-label="Mode de contact">{contactModes.map(([id, label, detail, note]) => <button type="button" role="radio" aria-checked={mode === id} className={mode === id ? "contact-mode is-selected" : "contact-mode"} key={id} onClick={() => setMode(id)}><span className="mode-symbol">{id === "message" ? "↗" : id === "call" ? "⌁" : "＋"}</span><span><strong>{label}</strong><small>{detail}</small></span><em>{note}</em></button>)}</div><div className="transmission-preview"><span className="mono-label">Ce qui sera transmis</span><div><span>✓ votre intention</span><span>✓ le contexte du bien</span><span>✓ votre rythme</span><span>+ votre question</span></div></div><button className="lime-button form-submit" type="button" disabled={!mode} onClick={() => setConfirmed(true)}>Confirmer ma préférence <span>↗</span></button><p className="form-privacy"><span>⌁</span> Vous pouvez arrêter avant l’envoi. Aucun contact sans votre confirmation.</p></div>;
}
