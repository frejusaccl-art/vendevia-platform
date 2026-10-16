"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "./icons";
import { ReviewNudge } from "./reviews";
import {
  demoCredits, demoDocuments, demoOpportunities, demoPerformance, demoPipelineCounts, demoQueue, demoReplacements,
  projectsToCsv, stageLabels, stageOrder, type DemoOpportunity, type StageId,
} from "@/lib/agency-demo";
import type { AgencySection } from "./agency-nav";
import { CREDIT_VALUE_EUR, offers } from "@/lib/pricing";

const tone = (s: StageId) => (s === "nouveau" ? "todo" : s === "mandat" || s === "confirme" ? "ok" : "contact");
const Stage = ({ stage }: { stage: StageId }) => <span className={`vv-status vv-status--${tone(stage)}`}>{stageLabels[stage]}</span>;
const Note = ({ children }: { children: React.ReactNode }) => <p className="vv-demo-note" style={{ marginTop: 18 }}>{children}</p>;
const Notice = ({ text, onClose }: { text: string; onClose: () => void }) =>
  text ? (
    <div className="vv-a-notice" role="status">
      <Icon name="check" size={16} /> <span>{text}</span>
      <button aria-label="Fermer" onClick={onClose} type="button"><Icon name="x" size={14} /></button>
    </div>
  ) : null;

function download(name: string, content: string) {
  const url = URL.createObjectURL(new Blob(["﻿" + content], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function Leads() {
  const [q, setQ] = useState("");
  const [stage, setStage] = useState<"all" | StageId>("all");
  const rows = demoOpportunities.filter((o) => (stage === "all" || o.stage === stage) && `${o.name} ${o.city} ${o.id}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="vv-a-toolbar">
        <label className="vv-a-search"><Icon name="search" size={16} />
          <input aria-label="Rechercher un lead" onChange={(e) => setQ(e.target.value)} placeholder="Nom, ville, référence…" value={q} />
        </label>
        <select aria-label="Filtrer par étape" className="vv-input" onChange={(e) => setStage(e.target.value as "all" | StageId)} value={stage}>
          <option value="all">Toutes les étapes</option>
          {stageOrder.map((s) => <option key={s} value={s}>{stageLabels[s]}</option>)}
        </select>
        <button className="vv-btn vv-btn--outline vv-btn--sm" onClick={() => download("leads-vendevia.csv", projectsToCsv(rows))} type="button">Exporter en CSV</button>
      </div>
      <section className="vv-panel">
        <div className="vv-table-wrap">
          <table className="vv-table">
            <thead><tr><th>Réf.</th><th>Nom</th><th>Bien</th><th>Étape</th><th>Prochaine action</th><th><span className="vv-sr">Ouvrir</span></th></tr></thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td><td>{o.name}<br /><small className="vv-muted">{o.city}</small></td><td>{o.property}</td>
                  <td><Stage stage={o.stage} /></td><td>{o.nextAction}<br /><small className="vv-muted">{o.timing}</small></td>
                  <td><Link className="vv-link" href={`/agence/dossier/${o.id}`}>Voir</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <p className="vv-empty">Aucun lead correspondant. Modifiez la recherche ou le filtre.</p>}
        </div>
      </section>
      <Note>Données de démonstration : aucun lead réel n’est connecté.</Note>
    </>
  );
}

function Todo() {
  const [done, setDone] = useState<string[]>([]);
  const [filter, setFilter] = useState<"À faire" | "Terminées" | "Toutes">("À faire");
  const [notice, setNotice] = useState("");
  const list = demoQueue.filter((i) => (filter === "Toutes" ? true : filter === "Terminées" ? done.includes(i.id) : !done.includes(i.id)));
  return (
    <>
      <Notice onClose={() => setNotice("")} text={notice} />
      <div className="vv-chips" role="group" aria-label="Filtrer les actions">
        {(["À faire", "Terminées", "Toutes"] as const).map((f) => (
          <button aria-pressed={filter === f} className="vv-chip" key={f} onClick={() => setFilter(f)} type="button">{f}</button>
        ))}
      </div>
      <div className="vv-a-list">
        {list.map((i) => {
          const p = demoOpportunities.find((o) => o.id === i.id)!;
          const isDone = done.includes(i.id);
          return (
            <article className={`vv-panel vv-a-card${isDone ? " is-done" : ""}`} key={i.id}>
              <div className="vv-a-card-top"><Stage stage={p.stage} /><small className="vv-muted">{i.age}</small></div>
              <h2>{p.name} <small className="vv-muted">· {p.city}</small></h2>
              <strong>{i.label}</strong>
              <p>{i.reason}</p>
              <p className="vv-a-risk"><b>À surveiller</b> {i.risk}</p>
              <div className="vv-a-actions">
                <Link className="vv-link" href={`/agence/dossier/${p.id}`}>Ouvrir le dossier</Link>
                <button className="vv-btn vv-btn--sm" onClick={() => { setDone((d) => (isDone ? d.filter((x) => x !== i.id) : [...d, i.id])); if (!isDone) setNotice(`${i.action} · action enregistrée localement pour la démo.`); }} type="button">
                  {isDone ? "Réouvrir" : i.action}
                </button>
              </div>
            </article>
          );
        })}
        {list.length === 0 && <p className="vv-empty">Tout est à jour. La file se remplira avec de nouveaux leads.</p>}
      </div>
      <Note>Aucune relance automatique n’est envoyée depuis cette démonstration.</Note>
    </>
  );
}

function Pipeline() {
  const [stages, setStages] = useState<Record<string, StageId>>(() => Object.fromEntries(demoOpportunities.map((o) => [o.id, o.stage])));
  const [notice, setNotice] = useState("");
  const move = (o: DemoOpportunity) => {
    const next = stageOrder[stageOrder.indexOf(stages[o.id]) + 1];
    if (!next) return;
    setStages((s) => ({ ...s, [o.id]: next }));
    setNotice(`${o.id} déplacé vers « ${stageLabels[next]} » localement.`);
  };
  return (
    <>
      <Notice onClose={() => setNotice("")} text={notice} />
      <div className="vv-a-board">
        {stageOrder.map((st) => {
          const items = demoOpportunities.filter((o) => stages[o.id] === st);
          return (
            <section className="vv-a-lane" key={st}>
              <header><span>{stageLabels[st]}</span><strong>{demoPipelineCounts[st] - demoOpportunities.filter((o) => o.stage === st).length + items.length}</strong></header>
              {items.map((o) => (
                <article className="vv-a-item" key={o.id}>
                  <small className="vv-muted">{o.id}</small>
                  <Link href={`/agence/dossier/${o.id}`}>{o.name}</Link>
                  <span className="vv-muted">{o.city} · {o.property}</span>
                  <em>{o.nextAction}</em>
                  <button className="vv-btn vv-btn--outline vv-btn--sm" disabled={st === "mandat"} onClick={() => move(o)} type="button">
                    {st === "mandat" ? "Résultat consigné" : "Avancer d’une étape"}
                  </button>
                </article>
              ))}
              {items.length === 0 && <p className="vv-muted vv-a-emptylane">Aucun exemple ici.</p>}
            </section>
          );
        })}
      </div>
      <Note>Les déplacements restent dans l’écran et disparaissent en quittant la page. Les compteurs d’en-tête incluent les dossiers non affichés.</Note>
    </>
  );
}

type Slot = { time: string; name: string; city: string; purpose: string; status: string; ref: string };
function Agenda() {
  const [slots, setSlots] = useState<Slot[]>([
    { time: "10:30", name: "Léa Bernard", city: "Pessac", purpose: "Premier rendez-vous · projet confirmé", status: "À confirmer", ref: "PV-0241" },
    { time: "14:00", name: "Camille Dubois", city: "Bordeaux", purpose: "Préparation de visite", status: "Créneau convenu", ref: "PV-0229" },
    { time: "11:15", name: "Alexandre Petit", city: "Mérignac", purpose: "Retour sur la première lecture", status: "À préparer", ref: "PV-0214" },
  ]);
  const [open, setOpen] = useState(false);
  const [ref, setRef] = useState("PV-0241");
  const [time, setTime] = useState("10:30");
  const [notice, setNotice] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = demoOpportunities.find((o) => o.id === ref)!;
    setSlots((s) => [{ time, name: p.name, city: p.city, purpose: "Nouvelle proposition de créneau", status: "Brouillon local", ref: p.id }, ...s]);
    setNotice("Créneau ajouté à la vue locale. Aucun message n’a été envoyé au propriétaire.");
    setOpen(false);
  };
  return (
    <>
      <Notice onClose={() => setNotice("")} text={notice} />
      <div className="vv-a-toolbar">
        <button className="vv-btn vv-btn--sm" onClick={() => setOpen((v) => !v)} type="button">Proposer un créneau</button>
      </div>
      {open && (
        <form className="vv-panel vv-a-form" onSubmit={submit}>
          <label className="vv-label">Dossier
            <select className="vv-input" onChange={(e) => setRef(e.target.value)} value={ref}>
              {demoOpportunities.slice(0, 4).map((o) => <option key={o.id} value={o.id}>{o.name} · {o.city}</option>)}
            </select>
          </label>
          <label className="vv-label">Heure<input className="vv-input" onChange={(e) => setTime(e.target.value)} type="time" value={time} /></label>
          <button className="vv-btn vv-btn--sm" type="submit">Ajouter</button>
        </form>
      )}
      <section className="vv-panel">
        <ul className="vv-agenda">
          {slots.map((s, i) => (
            <li key={s.ref + s.time + i}>
              <span className="time">{s.time}</span>
              <div><strong>{s.name} · {s.city}</strong><span className="sub">{s.purpose} — {s.ref} · {s.status}</span></div>
              <Link className="vv-link" href={`/agence/dossier/${s.ref}`} style={{ marginLeft: "auto" }}>Voir</Link>
            </li>
          ))}
        </ul>
      </section>
      <Note>Ces événements sont des exemples, pas un agenda connecté.</Note>
    </>
  );
}

function Teams() {
  const [cap, setCap] = useState<Record<string, number>>({ "Conseiller A": 3, "Conseiller B": 2 });
  const [notice, setNotice] = useState("");
  return (
    <>
      <Notice onClose={() => setNotice("")} text={notice} />
      <div className="vv-kpis" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        <div className="vv-kpi"><span>Capacité totale · exemple</span><strong>{Object.values(cap).reduce((a, b) => a + b, 0)}</strong><small>dossiers déclarés</small></div>
        <div className="vv-kpi"><span>À attribuer</span><strong>2</strong><small>seuil illustratif</small></div>
      </div>
      <section className="vv-panel">
        <div className="vv-panel-head"><h2>Membres</h2>
          <button className="vv-btn vv-btn--outline vv-btn--sm" onClick={() => setNotice("L’invitation ne partira qu’après la connexion du service d’équipe.")} type="button">Inviter un membre</button>
        </div>
        {Object.entries(cap).map(([name, v]) => (
          <div className="vv-a-member" key={name}>
            <span className="vv-avatar">{name.slice(-1)}</span>
            <div><strong>{name}</strong><small className="vv-muted">Capacité / mois : {v} projets</small></div>
            <div className="vv-a-stepper">
              <button aria-label={`Réduire la capacité de ${name}`} disabled={v <= 0} onClick={() => setCap((c) => ({ ...c, [name]: v - 1 }))} type="button">−</button>
              <button aria-label={`Augmenter la capacité de ${name}`} onClick={() => setCap((c) => ({ ...c, [name]: v + 1 }))} type="button">+</button>
            </div>
          </div>
        ))}
      </section>
      <Note>Rôles, identités et capacités fictifs. Le contrôle d’accès et l’attribution relèveront du serveur.</Note>
    </>
  );
}

function Credits() {
  return (
    <>
      <div className="vv-kpis" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        <div className="vv-kpi"><span>Crédits restants</span><strong>{demoCredits.balance}</strong><small>{demoCredits.validity}</small></div>
        <div className="vv-kpi"><span>Utilisés (30 jours)</span><strong>{demoCredits.used30d}</strong><small>exemple</small></div>
      </div>
      <section className="vv-panel" style={{ marginBottom: 18 }}>
        <div className="vv-panel-head"><h2>Ce que vaut votre solde</h2></div>
        <div className="vv-table-wrap">
          <table className="vv-table">
            <thead><tr><th>Service</th><th>Crédits</th><th>Valeur</th><th>Avec {demoCredits.balance} crédits</th></tr></thead>
            <tbody>
              {offers.map((o) => (
                <tr key={o.name}><td>{o.name}</td><td>{o.credits}</td><td>{o.credits * CREDIT_VALUE_EUR} € HT</td><td>{Math.floor(demoCredits.balance / o.credits)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="vv-panel">
        <div className="vv-panel-head"><h2>Acheter des crédits</h2></div>
        <p>Consultez les offres et les packs sur la page Tarifs. Aucun paiement n’est disponible dans cette version de démonstration.</p>
        <p style={{ marginTop: 14 }}><Link className="vv-btn vv-btn--sm" href="/tarifs">Voir les tarifs</Link></p>
      </section>
    </>
  );
}

function Quality() {
  return (
    <section className="vv-panel">
      <div className="vv-panel-head"><h2>Demandes de remplacement</h2></div>
      <div className="vv-table-wrap">
        <table className="vv-table">
          <thead><tr><th>Réf.</th><th>Lead</th><th>Motif</th><th>Statut</th></tr></thead>
          <tbody>
            {demoReplacements.map((r) => (
              <tr key={r.id}><td>{r.id}</td><td>{r.name}</td><td>{r.reason}</td><td><span className={`vv-status vv-status--${r.tone}`}>{r.status}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <Note>Exemples. Les critères de remplacement figurent dans les conditions générales de vente.</Note>
    </section>
  );
}

function Reports() {
  const p = demoPerformance;
  const bars = [
    { label: "Leads", value: p.activeProjects, w: 100 },
    { label: "Rendez-vous confirmés", value: p.appointments, w: (p.appointments / p.activeProjects) * 100 },
    { label: "Mandats", value: p.mandates, w: (p.mandates / p.activeProjects) * 100 },
  ];
  return (
    <>
      <div className="vv-kpis">
        <div className="vv-kpi"><span>Dépense</span><strong>{p.acquisitionSpend.toLocaleString("fr-FR")} €</strong><small>30 jours</small></div>
        <div className="vv-kpi"><span>Coût / rendez-vous</span><strong>{p.costPerAppointment} €</strong><small>{p.acquisitionSpend} € ÷ {p.appointments}</small></div>
        <div className="vv-kpi"><span>Coût / mandat</span><strong>{p.costPerMandate} €</strong><small>{p.acquisitionSpend} € ÷ {p.mandates}</small></div>
        <div className="vv-kpi"><span>Leads</span><strong>{p.activeProjects}</strong><small>sur la période</small></div>
      </div>
      <section className="vv-panel">
        <div className="vv-panel-head"><h2>Où le projet avance</h2></div>
        {bars.map((b) => (
          <div className="vv-a-bar" key={b.label}><span>{b.label}</span><i><b style={{ width: `${b.w}%` }} /></i><strong>{b.value}</strong></div>
        ))}
      </section>
      <Note>{p.source}. Ces valeurs illustrent les définitions et ne décrivent pas une agence réelle.</Note>
    </>
  );
}

function Documents() {
  return (
    <section className="vv-panel">
      <ul className="vv-a-docs">
        {demoDocuments.map((d) => (
          <li key={d.name}>
            <Icon name="file" size={18} />
            <div><strong>{d.name}</strong><small className="vv-muted">{"href" in d ? "Page du site" : d.meta}</small></div>
            {"href" in d ? <Link className="vv-link" href={d.href}>Consulter</Link> : <span className="vv-muted">Bientôt</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Settings() {
  const [zip, setZip] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const [alerts, setAlerts] = useState(true);
  const [digest, setDigest] = useState(false);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("18:00");
  const [saved, setSaved] = useState("");
  return (
    <>
      <Notice onClose={() => setSaved("")} text={saved} />
      <div className="vv-a-grid2">
        <section className="vv-panel">
          <div className="vv-panel-head"><h2>Territoire</h2></div>
          <form onSubmit={(e) => { e.preventDefault(); setState(/^\d{5}$/.test(zip) ? "ok" : "err"); }}>
            <label className="vv-label" htmlFor="zip">Code postal à vérifier</label>
            <div className="vv-inline">
              <input className="vv-input" id="zip" inputMode="numeric" maxLength={5} onChange={(e) => { setZip(e.target.value.replace(/\D/g, "")); setState("idle"); }} placeholder="Ex. 33000" value={zip} />
              <button className="vv-btn vv-btn--sm" type="submit">Vérifier</button>
            </div>
            {state === "err" && <p className="vv-error" role="alert">Un code postal français comporte 5 chiffres.</p>}
            {state === "ok" && <p className="vv-demo-note" role="status">Format valide · la couverture réelle reste à confirmer (non connectée).</p>}
          </form>
        </section>
        <section className="vv-panel">
          <div className="vv-panel-head"><h2>Disponibilités</h2></div>
          <div className="vv-inline">
            <label className="vv-label">Début<input className="vv-input" onChange={(e) => setStart(e.target.value)} type="time" value={start} /></label>
            <label className="vv-label">Fin<input className="vv-input" onChange={(e) => setEnd(e.target.value)} type="time" value={end} /></label>
          </div>
        </section>
        <section className="vv-panel">
          <div className="vv-panel-head"><h2>Notifications</h2></div>
          <label className="vv-check"><input checked={alerts} onChange={(e) => setAlerts(e.target.checked)} type="checkbox" /> Nouveau lead prioritaire</label>
          <label className="vv-check"><input checked={digest} onChange={(e) => setDigest(e.target.checked)} type="checkbox" /> Synthèse hebdomadaire</label>
        </section>
        <section className="vv-panel">
          <div className="vv-panel-head"><h2>Données</h2></div>
          <button className="vv-btn vv-btn--outline vv-btn--sm" onClick={() => download("donnees-exemple.csv", projectsToCsv(demoOpportunities))} type="button">Exporter les données exemple</button>
        </section>
      </div>
      <p style={{ marginTop: 18 }}><button className="vv-btn vv-btn--sm" onClick={() => setSaved("Préférences mises à jour dans cet écran uniquement (démo).")} type="button">Enregistrer</button></p>
    </>
  );
}

const screens: Record<AgencySection, () => React.JSX.Element> = {
  leads: Leads, "a-traiter": Todo, pipeline: Pipeline, "rendez-vous": Agenda, equipes: Teams, credits: Credits,
  qualite: Quality, rapports: Reports, documents: Documents, parametres: Settings,
};

export function AgencyScreen({ section }: { section: AgencySection }) {
  const Screen = screens[section];
  return (
    <>
      <Screen />
      {section === "rapports" || section === "leads" ? <div style={{ marginTop: 18 }}><ReviewNudge role="agence" /></div> : null}
    </>
  );
}
