"use client";

import Link from "next/link";
import { useState } from "react";

const rhythms = [
  { id: "observe", marker: "01", label: "Je prends le temps", detail: "Je veux regarder les choses sans pression." },
  { id: "prepare", marker: "02", label: "Je prépare la suite", detail: "J’ai besoin d’un cadre pour avancer." },
  { id: "soon", marker: "03", label: "Je veux avancer bientôt", detail: "Je cherche les prochaines décisions utiles." },
];

export function MaisonRhythmForm() {
  const [selected, setSelected] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  if (saved) return <div className="maison-form success-state rhythm-success" role="status"><div className="state-symbol">✓</div><p className="form-label">Étape 04 / rythme enregistré</p><h2>Le dossier suivra votre tempo.</h2><p>Vous n’aurez pas à recommencer ni à être relancé au mauvais moment. La suite s’adaptera à ce que vous venez de dire.</p><Link className="lime-button form-submit" href="/maison">Voir mon dossier <span>↗</span></Link></div>;

  return <div className="maison-form rhythm-form" aria-labelledby="rhythm-title"><div className="form-topline"><span className="form-label">Étape 04 / votre rythme</span><span className="form-duration">1 minute</span></div><h2 id="rhythm-title">À quel rythme voulez-vous avancer ?</h2><p className="form-explanation">Il n’y a pas de bonne réponse. Cette étape sert à éviter les conseils trop rapides ou les rappels mal placés.</p><div className="rhythm-options" role="radiogroup" aria-label="Votre rythme">{rhythms.map((rhythm) => <button type="button" role="radio" aria-checked={selected === rhythm.id} className={selected === rhythm.id ? "rhythm-option is-selected" : "rhythm-option"} key={rhythm.id} onClick={() => setSelected(rhythm.id)}><span className="rhythm-marker">{rhythm.marker}</span><span><strong>{rhythm.label}</strong><small>{rhythm.detail}</small></span><span className="option-arrow">↗</span></button>)}</div><button className="lime-button form-submit" type="button" disabled={!selected} onClick={() => setSaved(true)}>Garder ce rythme <span>↗</span></button><p className="form-privacy"><span>⌁</span> Votre rythme devient une règle du dossier, pas une donnée de relance.</p></div>;
}
