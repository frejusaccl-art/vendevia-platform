"use client";

import Link from "next/link";
import { useState } from "react";

const propertyTypes = [
  ["Maison", "Une maison individuelle ou mitoyenne"],
  ["Appartement", "Un appartement dans un immeuble"],
  ["Terrain", "Un terrain nu ou à bâtir"],
  ["Autre bien", "Un bien qui ne rentre pas dans ces cases"],
] as const;

export function MaisonPropertyForm() {
  const [selected, setSelected] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  if (saved) {
    return <div className="maison-form success-state property-success" role="status"><div className="state-symbol">✓</div><p className="form-label">Étape 03 / bien identifié</p><h2>Le dossier commence à vous ressembler.</h2><p>Nous avons le lieu et la nature du bien. La prochaine étape servira à comprendre ce que vous voulez vraiment éclaircir.</p><Link className="lime-button form-submit" href="/maison/projet/rythme">Continuer vers votre rythme <span>↗</span></Link></div>;
  }

  return <div className="maison-form property-form" aria-labelledby="property-title"><div className="form-topline"><span className="form-label">Étape 03 / le bien</span><span className="form-duration">1 minute</span></div><h2 id="property-title">De quel type de bien parle-t-on ?</h2><p className="form-explanation">Une catégorie suffit pour commencer. Les détails viendront quand ils seront utiles.</p><div className="property-options" role="radiogroup" aria-label="Type de bien">{propertyTypes.map(([label, detail]) => <button type="button" role="radio" aria-checked={selected === label} className={selected === label ? "property-option is-selected" : "property-option"} key={label} onClick={() => setSelected(label)}><span className="property-glyph">{label === "Maison" ? "⌂" : label === "Appartement" ? "▦" : label === "Terrain" ? "⌁" : "＋"}</span><span><strong>{label}</strong><small>{detail}</small></span><span className="option-arrow">↗</span></button>)}</div><button className="lime-button form-submit" type="button" disabled={!selected} onClick={() => setSaved(true)}>Enregistrer le bien <span>↗</span></button><p className="form-privacy"><span>⌁</span> Pas de jargon technique. Vous pourrez préciser plus tard.</p></div>;
}
