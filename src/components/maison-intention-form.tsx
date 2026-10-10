"use client";

import Link from "next/link";
import { useState } from "react";

const intentions = [
  { id: "observe", label: "Je me renseigne", detail: "Je veux comprendre avant d’agir." },
  { id: "prepare", label: "Je prépare quelque chose", detail: "Je commence à mettre mon projet au clair." },
  { id: "soon", label: "Je pense vendre dans les six mois", detail: "J’ai besoin de voir les prochaines étapes." },
  { id: "advice", label: "J’ai besoin d’un avis rapidement", detail: "Je préfère parler à quelqu’un maintenant." },
];

type Status = "empty" | "error" | "loading" | "success";

export function MaisonIntentionForm() {
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("empty");

  function continueProject() {
    if (!selected) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 520);
  }

  if (status === "success") {
    return (
      <div className="maison-form success-state" role="status">
        <div className="state-symbol">✓</div>
        <p className="form-label">Étape 01 / enregistrée</p>
        <h2>Votre point de départ est posé.</h2>
        <p>Nous allons maintenant regarder le bien et son contexte. Vous pourrez toujours revenir en arrière.</p>
        <Link className="lime-button form-submit" href="/maison/projet/adresse">Continuer vers le bien <span>↗</span></Link>
        <button className="outline-button" onClick={() => setStatus("empty")}>Modifier ma réponse <span>↺</span></button>
      </div>
    );
  }

  return (
    <div className="maison-form" aria-labelledby="intention-title">
      <div className="form-topline"><span className="form-label">Étape 01 / votre intention</span><span className="form-duration">environ 4 min</span></div>
      <h2 id="intention-title">Où en est votre réflexion ?</h2>
      <p className="form-explanation">Il n’est pas nécessaire d’avoir une date de vente. Cette réponse nous aide à vous montrer les bonnes prochaines étapes.</p>
      <div className="intention-options" role="radiogroup" aria-label="Votre intention">
        {intentions.map((intention) => (
          <button
            type="button"
            role="radio"
            aria-checked={selected === intention.id}
            className={selected === intention.id ? "intention-option is-selected" : "intention-option"}
            key={intention.id}
            onClick={() => { setSelected(intention.id); setStatus("empty"); }}
          >
            <span className="option-marker" />
            <span><strong>{intention.label}</strong><small>{intention.detail}</small></span>
            <span className="option-arrow">↗</span>
          </button>
        ))}
      </div>
      {status === "error" && <p className="form-error" role="alert">Choisissez une réponse pour continuer. Vous pourrez la modifier ensuite.</p>}
      <button className="lime-button form-submit" type="button" onClick={continueProject} disabled={status === "loading"}>
        {status === "loading" ? "Enregistrement…" : "Continuer"} <span>{status === "loading" ? "·" : "↗"}</span>
      </button>
      <p className="form-privacy"><span>⌁</span> Vos réponses restent à vous. Aucun contact n’est déclenché à cette étape.</p>
    </div>
  );
}
