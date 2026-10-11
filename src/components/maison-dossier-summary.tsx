"use client";

import { useState } from "react";
import Link from "next/link";

const dossierItems = [
  ["Votre intention", "Je prépare la suite", "clair", "lime"],
  ["Votre bien", "Maison · Bordeaux", "repère posé", "terra"],
  ["Votre rythme", "Je prends le temps", "respecté", "cobalt"],
] as const;

export function MaisonDossierSummary() {
  const [contactRequested, setContactRequested] = useState(false);

  return <div className="dossier-summary motion-reveal"><div className="summary-topline"><span className="form-label">Votre lecture / version 01</span><span className="form-duration">mise à jour maintenant</span></div><div className="summary-score"><div><span className="mono-label">Niveau de clarté du dossier</span><strong>72<span>%</span></strong></div><div className="clarity-ring"><span>72</span></div></div><div className="clarity-bar"><span /></div><p className="summary-caption">Votre dossier est suffisamment clair pour comprendre la prochaine question. Il n’a pas besoin d’être complet pour être utile.</p><div className="dossier-item-list">{dossierItems.map(([label, value, note, tone]) => <div className="dossier-summary-item" key={label}><span className={`summary-dot ${tone}`} /><div><span className="mono-label">{label}</span><strong>{value}</strong></div><small>{note}</small></div>)}</div><div className="summary-next"><span className="mono-label">La prochaine bonne question</span><h3>Qu’aimeriez-vous éclaircir avant de parler à quelqu’un ?</h3><p>La réponse servira à préparer un échange utile — pas à vous classer.</p></div>{contactRequested ? <div className="contact-confirmation" role="status"><span>✓</span><div><strong>Votre choix est enregistré.</strong><small>Nous vous montrons maintenant comment choisir le bon interlocuteur.</small><Link href="/maison/projet/mise-en-relation">Choisir le mode de contact <span>↗</span></Link></div></div> : <button className="lime-button summary-cta" type="button" onClick={() => setContactRequested(true)}>Préparer une mise en relation <span>↗</span></button>}<p className="summary-privacy">Vous pouvez fermer ce dossier maintenant. Il restera compréhensible quand vous reviendrez.</p></div>;
}
