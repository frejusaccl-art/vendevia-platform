"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "./icons";

function PasswordField({ id, label, value, onChange, error, placeholder, autoComplete }: {
  id: string; label: string; value: string; onChange: (v: string) => void; error?: string; placeholder: string; autoComplete: string;
}) {
  const [shown, setShown] = useState(false);
  return (
    <div className="vv-field">
      <label className="vv-label" htmlFor={id}>{label}</label>
      <div className="vv-pw">
        <input aria-invalid={!!error} autoComplete={autoComplete} className="vv-input" id={id} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type={shown ? "text" : "password"} value={value} />
        <button aria-label={shown ? "Masquer le mot de passe" : "Afficher le mot de passe"} aria-pressed={shown} className="vv-icon-btn" onClick={() => setShown((s) => !s)} type="button">
          <Icon name="eye" size={18} />
        </button>
      </div>
      {error && <p className="vv-error" role="alert">{error}</p>}
    </div>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<"owner" | "agency">("owner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const found: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) found.email = "Saisissez une adresse e-mail valide.";
    if (password.length < 1) found.password = "Saisissez votre mot de passe.";
    setErrors(found);
    if (Object.keys(found).length === 0) router.push(role === "owner" ? "/proprietaire/tableau-de-bord" : "/agence");
  }

  return (
    <form noValidate onSubmit={submit}>
      <div aria-label="Type de compte" className="vv-tabs" role="tablist">
        <button aria-selected={role === "owner"} className="vv-tab" onClick={() => setRole("owner")} role="tab" type="button">Propriétaire</button>
        <button aria-selected={role === "agency"} className="vv-tab" onClick={() => setRole("agency")} role="tab" type="button">Agence</button>
      </div>
      <div className="vv-field">
        <label className="vv-label" htmlFor="login-email">E-mail</label>
        <input aria-invalid={!!errors.email} autoComplete="email" className="vv-input" id="login-email" inputMode="email" onChange={(e) => setEmail(e.target.value)} placeholder="exemple@email.com" type="email" value={email} />
        {errors.email && <p className="vv-error" role="alert">{errors.email}</p>}
      </div>
      <PasswordField autoComplete="current-password" error={errors.password} id="login-password" label="Mot de passe" onChange={setPassword} placeholder="Votre mot de passe" value={password} />
      <div className="vv-inline">
        <label className="vv-check"><input checked={remember} onChange={(e) => setRemember(e.target.checked)} type="checkbox" /> Se souvenir de moi</label>
        <Link className="vv-link" href="/mot-de-passe-oublie">Mot de passe oublié&nbsp;?</Link>
      </div>
      <button className="vv-btn vv-btn--primary vv-btn--block" type="submit">Se connecter <Icon name="arrow" size={16} /></button>
      <p className="vv-demo-note" style={{ marginTop: 16 }}>Version de démonstration : aucun compte réel n’est vérifié.</p>
      <p className="vv-muted" style={{ fontSize: 13, marginTop: 14, textAlign: "center" }}>
        Pas encore de compte&nbsp;? <Link className="vv-link" href="/inscription">S’inscrire</Link>
      </p>
    </form>
  );
}

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const found: Record<string, string> = {};
    if (!name.trim()) found.name = "Indiquez votre nom complet.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) found.email = "Saisissez une adresse e-mail valide.";
    if (password.length < 8) found.password = "Le mot de passe doit contenir au moins 8 caractères.";
    if (!terms) found.terms = "Veuillez accepter les conditions pour continuer.";
    setErrors(found);
    if (Object.keys(found).length === 0) router.push("/proprietaire/tableau-de-bord");
  }

  return (
    <form noValidate onSubmit={submit}>
      <div className="vv-field">
        <label className="vv-label" htmlFor="su-name">Nom complet</label>
        <input aria-invalid={!!errors.name} autoComplete="name" className="vv-input" id="su-name" onChange={(e) => setName(e.target.value)} placeholder="Votre nom et prénom" value={name} />
        {errors.name && <p className="vv-error" role="alert">{errors.name}</p>}
      </div>
      <div className="vv-field">
        <label className="vv-label" htmlFor="su-email">E-mail</label>
        <input aria-invalid={!!errors.email} autoComplete="email" className="vv-input" id="su-email" inputMode="email" onChange={(e) => setEmail(e.target.value)} placeholder="exemple@email.com" type="email" value={email} />
        {errors.email && <p className="vv-error" role="alert">{errors.email}</p>}
      </div>
      <PasswordField autoComplete="new-password" error={errors.password} id="su-password" label="Mot de passe" onChange={setPassword} placeholder="Minimum 8 caractères" value={password} />
      <div className="vv-field">
        <label className="vv-check">
          <input checked={terms} onChange={(e) => { setTerms(e.target.checked); setErrors((p) => ({ ...p, terms: "" })); }} type="checkbox" />
          <span>J’accepte les <Link className="vv-link" href="/legal/cgu">conditions d’utilisation</Link> (et les <Link className="vv-link" href="/legal/cgv">CGV</Link> pour les agences) et la <Link className="vv-link" href="/legal/confidentialite">politique de confidentialité</Link></span>
        </label>
        {errors.terms && <p className="vv-error" role="alert">{errors.terms}</p>}
      </div>
      <button className="vv-btn vv-btn--primary vv-btn--block" type="submit">Créer mon compte <Icon name="arrow" size={16} /></button>
      <p className="vv-demo-note" style={{ marginTop: 16 }}>Version de démonstration : aucun compte n’est réellement créé.</p>
    </form>
  );
}
