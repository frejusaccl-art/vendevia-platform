"use client";

import Link from "next/link";
import { useState } from "react";

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="vv-form-ok" role="status">
        <strong>Demande enregistrée.</strong>
        <p>Si un compte existe pour {email}, vous recevrez un e-mail avec un lien pour choisir un nouveau mot de passe.</p>
        <p className="vv-form-ok-note">Version de démonstration : aucun e-mail n’est encore envoyé.</p>
        <Link className="vv-btn vv-btn--outline vv-btn--sm" href="/connexion">Retour à la connexion</Link>
      </div>
    );
  }
  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); if (!/^\S+@\S+\.\S+$/.test(email)) { setError("Saisissez une adresse e-mail valide."); return; } setSent(true); }}>
      <div className="vv-field">
        <label className="vv-label" htmlFor="fg-email">E-mail du compte</label>
        <input aria-invalid={!!error} autoComplete="email" className="vv-input" id="fg-email" inputMode="email" onChange={(e) => { setEmail(e.target.value); setError(""); }} type="email" value={email} />
        {error && <p className="vv-error" role="alert">{error}</p>}
      </div>
      <button className="vv-btn vv-btn--primary vv-btn--block" type="submit">Envoyer le lien</button>
    </form>
  );
}
