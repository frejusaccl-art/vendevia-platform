"use client";

import { FormEvent, useState } from "react";
import { UiIcon } from "./ui-icon";

export function DemoRequestForm({ mode = "contact" }: { mode?: "contact" | "zone" }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [postalCode, setPostalCode] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (mode === "zone" && !/^\d{5}$/.test(postalCode.trim())) {
      setError("Saisissez un code postal français à 5 chiffres pour voir le parcours de vérification.");
      return;
    }
    setError("");
    setSubmitted(true);
    form.reset();
  }

  if (submitted) return <div className="form-demo-success" role="status"><span><UiIcon name="check" /></span><div><strong>La démonstration est prête.</strong><small>Aucun message n’a été envoyé. Une vérification réelle nécessite le service Vendevia connecté.</small></div></div>;

  return <form className="demo-request-form" onSubmit={submit} noValidate>
    {mode === "zone" ? <><label htmlFor="pilot-postal">Code postal à vérifier</label><div className="input-action-row"><input id="pilot-postal" inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="Ex. 33000" value={postalCode} onChange={(event) => setPostalCode(event.target.value.replace(/\D/g, ""))} /><button className="button button-primary" type="submit">Préparer la vérification <UiIcon name="arrow" size={16} /></button></div></> : <><label htmlFor="contact-email">Votre adresse e-mail</label><div className="input-action-row"><input id="contact-email" type="email" autoComplete="email" placeholder="vous@agence.fr" required /><button className="button button-primary" type="submit">Continuer <UiIcon name="arrow" size={16} /></button></div></>}
    {error && <p className="form-inline-error" role="alert">{error}</p>}
    <small className="form-demo-caption"><UiIcon name="shield" size={14} /> Formulaire de démonstration · aucune donnée envoyée</small>
  </form>;
}
