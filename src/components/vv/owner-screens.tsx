"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { ReviewNudge } from "./reviews";
import type { OwnerSection } from "./owner-nav";

const steps = [
  { label: "Projet créé", date: "12 oct.", detail: "Votre description a été reçue.", state: "done" },
  { label: "Qualifié", date: "13 oct.", detail: "Votre projet a été vérifié et complété.", state: "done" },
  { label: "En sélection", date: "14 oct.", detail: "Nous choisissons les agences adaptées à votre bien.", state: "current" },
  { label: "Rendez-vous", date: "19 oct.", detail: "Un premier échange sera proposé.", state: "todo" },
] as const;

function Suivi() {
  return (
    <>
      <section className="vv-panel">
        <ol className="vv-a-timeline">
          {steps.map((s) => (
            <li className={s.state} key={s.label}>
              <span className="dot">{s.state === "done" && <Icon name="check" size={14} />}</span>
              <div><strong>{s.label}</strong> <span className="vv-muted">· {s.date}</span><p>{s.detail}</p></div>
            </li>
          ))}
        </ol>
      </section>
      <div style={{ marginTop: 18 }}><ReviewNudge role="proprietaire" /></div>
    </>
  );
}

function Rdv() {
  const [state, setState] = useState<"pending" | "confirmed" | "change">("pending");
  return (
    <section className="vv-panel">
      <ul className="vv-agenda">
        <li>
          <span className="time">10:30</span>
          <div><strong>Premier échange · Agence Horizon</strong><span className="sub">Samedi 19 octobre · visite de votre bien</span></div>
        </li>
      </ul>
      <p style={{ margin: "16px 0 10px" }} role="status">
        {state === "pending" && "Ce créneau vous est proposé."}
        {state === "confirmed" && "Créneau confirmé. Vous recevrez un rappel la veille."}
        {state === "change" && "Demande envoyée : l’agence vous proposera un autre créneau."}
      </p>
      {state === "pending" && (
        <div className="vv-a-actions" style={{ justifyContent: "flex-start" }}>
          <button className="vv-btn vv-btn--sm" onClick={() => setState("confirmed")} type="button">Confirmer</button>
          <button className="vv-btn vv-btn--outline vv-btn--sm" onClick={() => setState("change")} type="button">Demander un autre créneau</button>
        </div>
      )}
      <p className="vv-demo-note" style={{ marginTop: 16 }}>Démonstration : aucune notification réelle n’est envoyée.</p>
    </section>
  );
}

type Msg = { from: "agence" | "moi"; text: string; at: string };
function Messages() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "agence", text: "Bonjour Sophie, merci pour votre projet. Seriez-vous disponible samedi à 10 h 30 ?", at: "14 oct. 16:02" },
  ]);
  const [text, setText] = useState("");
  return (
    <section className="vv-panel">
      <div className="vv-a-chat" aria-live="polite">
        {msgs.map((m, i) => (
          <p className={`bubble ${m.from}`} key={i}>{m.text}<small>{m.from === "agence" ? "Agence Horizon" : "Vous"} · {m.at}</small></p>
        ))}
      </div>
      <form className="vv-a-form" onSubmit={(e) => { e.preventDefault(); const t = text.trim(); if (!t) return; setMsgs((m) => [...m, { from: "moi", text: t, at: "à l’instant" }]); setText(""); }} style={{ marginTop: 14 }}>
        <label className="vv-label" style={{ flex: 1 }}>Votre message
          <input className="vv-input" maxLength={500} onChange={(e) => setText(e.target.value)} value={text} />
        </label>
        <button className="vv-btn vv-btn--sm" disabled={!text.trim()} type="submit">Envoyer</button>
      </form>
      <p className="vv-demo-note" style={{ marginTop: 14 }}>Démonstration : les messages restent dans cet écran.</p>
    </section>
  );
}

function Accords() {
  const [contact, setContact] = useState(true);
  const [news, setNews] = useState(false);
  const [msg, setMsg] = useState("");
  const mail = `mailto:contact@vendeviaa.com?subject=${encodeURIComponent("Demande RGPD")}&body=${encodeURIComponent("Bonjour,\n\nJe souhaite exercer mon droit : accès / rectification / effacement / portabilité (rayer les mentions inutiles).\n\nE-mail du compte :\n")}`;
  return (
    <>
      {msg && <div className="vv-a-notice" role="status"><Icon name="check" size={16} /> <span>{msg}</span></div>}
      <section className="vv-panel">
        <div className="vv-panel-head"><h2>Mes accords</h2></div>
        <label className="vv-check">
          <input checked={contact} onChange={(e) => { setContact(e.target.checked); setMsg(e.target.checked ? "Accord de mise en relation rétabli." : "Accord retiré : les agences ne pourront plus vous contacter."); }} type="checkbox" />
          <span>J’autorise Vendevia à transmettre mes coordonnées aux agences sélectionnées pour mon projet.</span>
        </label>
        <label className="vv-check" style={{ marginTop: 10 }}>
          <input checked={news} onChange={(e) => { setNews(e.target.checked); setMsg(e.target.checked ? "Vous recevrez nos nouveautés." : "Vous ne recevrez plus nos nouveautés."); }} type="checkbox" />
          <span>Je souhaite recevoir les nouveautés de Vendevia.</span>
        </label>
      </section>
      <section className="vv-panel" style={{ marginTop: 18 }}>
        <div className="vv-panel-head"><h2>Mes données</h2></div>
        <p>Accès, rectification, effacement, portabilité : écrivez-nous, nous répondons dans un délai d’un mois.</p>
        <p style={{ marginTop: 14 }}><a className="vv-btn vv-btn--outline vv-btn--sm" href={mail}>Exercer mes droits par e-mail</a></p>
      </section>
    </>
  );
}

export function OwnerScreen({ section }: { section: OwnerSection }) {
  return section === "suivi" ? <Suivi /> : section === "rendez-vous" ? <Rdv /> : section === "messages" ? <Messages /> : <Accords />;
}
