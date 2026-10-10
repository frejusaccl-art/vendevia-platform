"use client";

import Link from "next/link";
import { useState } from "react";

type AddressStatus = "empty" | "error" | "loading" | "success";

export function MaisonAddressForm() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<AddressStatus>("empty");

  function continueProject() {
    if (address.trim().length < 5 || city.trim().length < 2) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 620);
  }

  if (status === "success") {
    return (
      <div className="maison-form address-success" role="status">
        <div className="state-symbol">✓</div>
        <p className="form-label">Étape 02 / repère enregistré</p>
        <h2>Votre bien a maintenant un point sur la carte.</h2>
        <div className="address-confirmation"><span>⌖</span><strong>{address}</strong><small>{city}</small></div>
        <p>Nous ne cherchons pas à vous localiser davantage. Ce repère sert uniquement à donner du contexte à la suite.</p>
        <Link className="lime-button form-submit" href="/maison/projet/bien">Continuer vers le bien <span>↗</span></Link>
      </div>
    );
  }

  return (
    <div className="maison-form address-form" aria-labelledby="address-title">
      <div className="form-topline"><span className="form-label">Étape 02 / le repère du bien</span><span className="form-duration">1 minute</span></div>
      <h2 id="address-title">Où se trouve le bien ?</h2>
      <p className="form-explanation">Une adresse suffit. Elle nous aide à lire le contexte, pas à vous pousser vers une agence.</p>
      <label className="field-label" htmlFor="address">Adresse du bien</label>
      <div className="address-input-wrap"><span>⌖</span><input id="address" value={address} onChange={(event) => { setAddress(event.target.value); setStatus("empty"); }} placeholder="12, rue des Tilleuls" autoComplete="street-address" /></div>
      <label className="field-label" htmlFor="city">Ville</label>
      <input className="plain-input" id="city" value={city} onChange={(event) => { setCity(event.target.value); setStatus("empty"); }} placeholder="Bordeaux" autoComplete="address-level2" />
      {status === "error" && <p className="form-error" role="alert">Indiquez au moins une adresse et une ville pour continuer.</p>}
      <button className="lime-button form-submit" type="button" onClick={continueProject} disabled={status === "loading"}>{status === "loading" ? "Lecture du contexte…" : "Continuer"} <span>{status === "loading" ? "·" : "↗"}</span></button>
      <p className="form-privacy"><span>⌁</span> Adresse utilisée pour le contexte du dossier. Jamais pour du démarchage automatique.</p>
    </div>
  );
}
