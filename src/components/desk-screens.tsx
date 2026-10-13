"use client";

import Link from "next/link";
import { useState } from "react";
import { demoOpportunities, demoPerformance, demoPipelineCounts, demoQueue, stageLabels, stageOrder } from "@/lib/desk-demo-data";
import type { DemoOpportunity, StageId } from "@/lib/desk-demo-data";
import { DemoNotice } from "./demo-notice";
import { SiteHeader } from "./site-header";
import { UiIcon } from "./ui-icon";

type Screen = "today" | "projects" | "pipeline" | "agenda" | "followups" | "analytics" | "team" | "territory" | "subscription" | "settings" | "onboarding";
const titles: Record<Screen, { eyebrow: string; title: string; description: string }> = {
  today: { eyebrow: "VUE DU JOUR · BORDEAUX · EXEMPLE", title: "Les opportunités qui méritent une action aujourd’hui.", description: "Votre zone, votre équipe, votre prochaine décision." },
  projects: { eyebrow: "PROJETS VENDEURS · DONNÉES DE DÉMO", title: "Chaque dossier garde son contexte.", description: "Retrouvez l’intention, la prochaine action et le consentement dans la même lecture." },
  pipeline: { eyebrow: "PIPELINE VENDEUR · EXEMPLE", title: "Voir ce qui avance. Et ce qui attend.", description: "Les étapes expliquent la progression du projet, pas seulement son statut." },
  agenda: { eyebrow: "AGENDA · ESPACE DE DÉMONSTRATION", title: "Le prochain échange est déjà dans la suite.", description: "Rendez-vous et créneaux proposés restent reliés au dossier qui les a déclenchés." },
  followups: { eyebrow: "RELANCES · ACTIONS À JUSTIFIER", title: "Relancer pour une raison, pas par réflexe.", description: "Chaque rappel doit avoir un contexte, une échéance et une issue possible." },
  analytics: { eyebrow: "PERFORMANCE · SIMULATION", title: "Votre acquisition produit quoi, concrètement ?", description: "Reliez la dépense aux projets, aux rendez-vous puis aux mandats — avec une définition par chiffre." },
  team: { eyebrow: "ÉQUIPE · EXEMPLE", title: "La capacité fait partie de l’attribution.", description: "Une opportunité ne devrait pas arriver à une équipe qui n’a pas de place pour agir." },
  territory: { eyebrow: "TERRITOIRE · CONFIGURATION NON CONNECTÉE", title: "Une zone doit être vérifiée, pas supposée.", description: "Définissez la couverture et les capacités avant de recevoir de nouveaux projets." },
  subscription: { eyebrow: "ABONNEMENT · APERÇU", title: "Une offre claire, sans paiement dans cette démo.", description: "Les offres et montants restent à confirmer avec les agences pilotes." },
  settings: { eyebrow: "PARAMÈTRES · ENREGISTREMENT LOCAL", title: "Un Desk réglé sur votre façon de travailler.", description: "Ces préférences ne sont pas enregistrées sur un serveur dans cette version." },
  onboarding: { eyebrow: "MISE EN ROUTE · 01 / 04", title: "Votre zone, votre équipe, votre prochaine action.", description: "Quatre repères pour préparer l’espace avant de recevoir le premier Projet Vendeur." },
};

export function DeskScreen({ screen }: { screen: Screen }) {
  switch (screen) {
    case "today": return <TodayScreen />;
    case "projects": return <ProjectsScreen />;
    case "pipeline": return <PipelineScreen />;
    case "agenda": return <AgendaScreen />;
    case "followups": return <FollowUpsScreen />;
    case "analytics": return <AnalyticsScreen />;
    case "team": return <TeamScreen />;
    case "territory": return <TerritoryScreen />;
    case "subscription": return <SubscriptionScreen />;
    case "settings": return <SettingsScreen />;
    case "onboarding": return <OnboardingScreen />;
  }
}

function PageHeading({ screen, action }: { screen: Screen; action?: React.ReactNode }) {
  const item = titles[screen];
  return <div className="desk-page-heading"><div><p className="desk-eyebrow"><span />{item.eyebrow}</p><h1>{item.title}</h1><p className="desk-page-description">{item.description}</p></div>{action && <div className="desk-heading-action">{action}</div>}</div>;
}

function TodayScreen() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const pending = demoQueue.filter((item) => !completed.includes(item.id));
  function complete(id: string, label: string) {
    setCompleted((current) => [...current, id]);
    setNotice(`${label} · action enregistrée localement pour la démo.`);
  }
  return <div className="desk-screen desk-today-screen">
    <PageHeading screen="today" action={<Link className="desk-primary-button" href="/desk/projets"><UiIcon name="file" size={16} /> Tous les projets</Link>} />
    {notice && <div className="desk-inline-success" role="status"><UiIcon name="check" size={16} />{notice}<button type="button" aria-label="Fermer" onClick={() => setNotice("")}><UiIcon name="close" size={15} /></button></div>}
    <div className="desk-overview-grid">
      <section className="attention-queue-panel" aria-labelledby="attention-heading"><div className="desk-section-heading"><div><span className="section-index">01 / FILE D’ACTIONS</span><h2 id="attention-heading">À faire maintenant</h2><p>Chaque priorité montre qui, pourquoi et ce qui peut se perdre.</p></div><span className="queue-number">{String(pending.length).padStart(2, "0")}</span></div>
        {pending.length ? <div className="desk-action-list">{demoQueue.filter((item) => !completed.includes(item.id)).map((item, index) => {
          const project = demoOpportunities.find((record) => record.id === item.id)!;
          return <article className="desk-action-row" key={item.id}><span className="action-ordinal">0{index + 1}</span><div className="action-main"><div className="action-meta"><span className={`status-line status-${project.stage}`}>{item.label}</span><span>{item.age}</span></div><Link className="action-name" href="/desk/dossier">{project.name} <small>· {project.city}</small></Link><p>{item.reason}</p><div className="action-risk"><span>À SURVEILLER</span>{item.risk}</div><div className="action-controls"><Link href="/desk/dossier" className="text-action">Ouvrir le dossier <UiIcon name="arrow" size={15} /></Link><button type="button" className="quiet-action" onClick={() => complete(item.id, item.action)}>{item.action} <UiIcon name="check" size={15} /></button></div></div></article>;
        })}</div> : <EmptyState title="Tout est à jour." detail="La file se remplira quand de nouveaux projets demanderont une action." action={<Link href="/desk/projets">Voir les dossiers <UiIcon name="arrow" size={15} /></Link>} />}
      </section>
      <aside className="active-project-sheet"><div className="sheet-topline"><span>02 / DOSSIER ACTIF</span><span>EXEMPLE</span></div><p className="project-id">PV-0248 <span>· PROJET VENDEUR</span></p><h2>Sophie Marchand</h2><p className="project-location"><UiIcon name="pin" size={15} /> Bordeaux · Maison · 4 pièces</p><div className="project-context-quote">« Je pense vendre dans les six mois et souhaite d’abord comprendre les prochaines étapes. »</div><div className="stage-definition"><span className="stage-symbol" /><div><small>ÉTAPE ACTUELLE</small><strong>Nouveau projet</strong><p>Reçu, consentement de mise en relation choisi dans cette donnée de démonstration.</p></div></div><div className="next-action-block"><span>PROCHAINE ACTION</span><strong>Répondre par écrit aujourd’hui</strong><small>La préférence de contact du dossier est respectée.</small></div><div className="active-sheet-footer"><span><UiIcon name="shield" size={15} /> Accord versionné · démo</span><Link href="/desk/dossier">Ouvrir la fiche <UiIcon name="arrow" size={15} /></Link></div></aside>
    </div>
    <section className="pipeline-reading"><div className="desk-section-heading"><div><span className="section-index">03 / PROGRESSION COMMERCIALE</span><h2>Le pipeline vendeur en mouvement.</h2><p>18 projets d’exemple · chiffres de démonstration à remplacer par l’historique réel.</p></div><Link className="text-action" href="/desk/pipeline">Voir les étapes <UiIcon name="arrow" size={15} /></Link></div><div className="pipeline-stage-ribbon">{stageOrder.map((stage, index) => <div className="pipeline-stage" key={stage}><div className="stage-ribbon-top"><span>{String(index + 1).padStart(2, "0")}</span><strong>{demoPipelineCounts[stage]}</strong></div><span className="stage-ribbon-label">{stageLabels[stage]}</span><i><span style={{ width: `${(demoPipelineCounts[stage] / 5) * 100}%` }} /></i></div>)}</div></section>
    <section className="desk-bottom-grid"><div className="quality-signal"><span className="section-index">04 / QUALITÉ & CAPACITÉ</span><h2>Une attribution n’est pas un hasard.</h2><p>La zone, la spécialité, les préférences de contact et la capacité disponible doivent être vérifiées avant toute réception.</p><div className="capacity-line"><span className="capacity-light" />2 créneaux de démonstration · Bordeaux</div><Link className="text-action" href="/desk/territoire">Vérifier le territoire <UiIcon name="arrow" size={15} /></Link></div><PerformanceExcerpt /></section>
  </div>;
}

function PerformanceExcerpt() {
  const perf = demoPerformance;
  return <div className="performance-excerpt"><div className="performance-heading"><span className="section-index">05 / RÉSULTAT ÉCONOMIQUE · DÉMO</span><Link href="/desk/analytics">Voir le détail <UiIcon name="arrow" size={15} /></Link></div><div className="performance-main"><div><small>COÛT PAR RENDEZ-VOUS</small><strong>{perf.costPerAppointment} €</strong><span>{perf.acquisitionSpend} € / {perf.appointments} rendez-vous confirmés</span></div><div className="performance-divider" /><div><small>COÛT PAR MANDAT</small><strong>{perf.costPerMandate} €</strong><span>{perf.acquisitionSpend} € / {perf.mandates} mandats d’exemple</span></div></div><p className="calculation-note">Période et définition : 30 jours de simulation. Source : données de démonstration, non réelles.</p></div>;
}

function ProjectsScreen() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<"all" | StageId>("all");
  const filtered = demoOpportunities.filter((item) => (stageFilter === "all" || item.stage === stageFilter) && `${item.name} ${item.city} ${item.id}`.toLowerCase().includes(search.toLowerCase()));
  return <div className="desk-screen"><PageHeading screen="projects" action={<button className="desk-secondary-button" type="button" onClick={() => exportProjects(filtered)}><UiIcon name="download" size={16} /> Exporter en CSV</button>} /><div className="project-toolbar"><label className="desk-search-field"><UiIcon name="search" size={17} /><input aria-label="Rechercher un projet" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nom, ville, référence…" /></label><label className="filter-select-label"><UiIcon name="filter" size={16} /><select aria-label="Filtrer par étape" value={stageFilter} onChange={(event) => setStageFilter(event.target.value as "all" | StageId)}><option value="all">Toutes les étapes</option>{stageOrder.map((stage) => <option value={stage} key={stage}>{stageLabels[stage]}</option>)}</select></label><span className="result-count">{filtered.length} dossiers · exemple</span></div>
    <div className="project-list" role="list">{filtered.map((project) => <ProjectListRow project={project} key={project.id} />)}{filtered.length === 0 && <EmptyState title="Aucun dossier correspondant." detail="Essayez une autre recherche ou retirez le filtre d’étape." action={<button type="button" onClick={() => { setSearch(""); setStageFilter("all"); }}>Réinitialiser les filtres</button>} />}</div>
    <p className="desk-footnote">Les identités, références, statuts et consentements affichés sont des exemples. Aucune donnée réelle n’est connectée.</p>
  </div>;
}

function ProjectListRow({ project }: { project: DemoOpportunity }) {
  return <article className="project-list-row" role="listitem"><span className="project-ref">{project.id}<small>{project.source}</small></span><div className="project-person"><strong>{project.name}</strong><span>{project.city} · {project.property}</span></div><div className="project-intention"><small>INTENTION</small><span>{project.intention}</span></div><div className="project-stage-column"><small>ÉTAPE</small><StageBadge stage={project.stage} /></div><div className="project-next-action"><small>PROCHAINE ACTION</small><strong>{project.nextAction}</strong><span>{project.timing}</span></div><Link className="project-open-link" href="/desk/dossier" aria-label={`Ouvrir le dossier ${project.name}`}><UiIcon name="arrow" size={17} /></Link></article>;
}

function PipelineScreen() {
  const [stages, setStages] = useState<Record<string, StageId>>(() => Object.fromEntries(demoOpportunities.map((item) => [item.id, item.stage])) as Record<string, StageId>);
  const [counts, setCounts] = useState<Record<StageId, number>>({ ...demoPipelineCounts });
  const [notice, setNotice] = useState("");
  function moveForward(item: DemoOpportunity) {
    const current = stages[item.id];
    const index = stageOrder.indexOf(current);
    if (index >= stageOrder.length - 1) return setNotice(`${item.id} est déjà à l’étape finale de la démo.`);
    const next = stageOrder[index + 1];
    setStages((currentStages) => ({ ...currentStages, [item.id]: next }));
    setCounts((currentCounts) => ({ ...currentCounts, [current]: currentCounts[current] - 1, [next]: currentCounts[next] + 1 }));
    setNotice(`${item.id} déplacé vers « ${stageLabels[next]} » localement.`);
  }
  return <div className="desk-screen"><PageHeading screen="pipeline" action={<span className="demo-data-pill">Démo · déplacements non enregistrés</span>} />{notice && <div className="desk-inline-success" role="status"><UiIcon name="check" size={16} />{notice}<button type="button" aria-label="Fermer" onClick={() => setNotice("")}><UiIcon name="close" size={15} /></button></div>}
    <div className="pipeline-board" aria-label="Pipeline vendeur d’exemple">{stageOrder.map((stage) => {
      const items = demoOpportunities.filter((item) => stages[item.id] === stage);
      return <section className="pipeline-lane" key={stage}><div className="pipeline-lane-header"><div><span>{stageLabels[stage]}</span><small>{items.length} exemple{items.length > 1 ? "s" : ""} nominatif{items.length > 1 ? "s" : ""} affiché{items.length > 1 ? "s" : ""} · {stageReadsFor(stage)}</small></div><strong>{counts[stage]}</strong></div><div className="pipeline-lane-items">{items.map((item) => <article className="pipeline-item" key={item.id}><div className="pipeline-item-top"><span>{item.id}</span><UiIcon name="more" size={17} /></div><Link href="/desk/dossier" className="pipeline-item-name">{item.name}</Link><span className="pipeline-item-place"><UiIcon name="pin" size={13} />{item.city} · {item.property}</span><div className="pipeline-item-next"><small>PROCHAINE ACTION</small><span>{item.nextAction}</span></div><button className="pipeline-move" type="button" onClick={() => moveForward(item)} disabled={stage === "mandat"}>{stage === "mandat" ? "Résultat consigné" : "Avancer d’une étape"}<UiIcon name="arrow" size={14} /></button></article>)}{items.length === 0 && <div className="pipeline-empty-lane">Aucun dossier exemple dans cette étape.</div>}</div></section>;
    })}</div><p className="desk-footnote">Les changements de statut restent dans la mémoire de l’écran et disparaissent en quittant la page.</p>
  </div>;
}
function stageReadsFor(stage: StageId) { return stage === "nouveau" ? "Ce qui vient d’arriver" : stage === "rendezvous" ? "Déjà dans l’agenda" : stage === "mandat" ? "Résultat commercial" : "Ce qui avance maintenant"; }

function AgendaScreen() {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [selectedProject, setSelectedProject] = useState("PV-0241");
  const [day, setDay] = useState("Demain");
  const [time, setTime] = useState("10:30");
  const [newAppointment, setNewAppointment] = useState<{ name: string; city: string; project: string; day: string; time: string } | null>(null);
  function addAppointment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const project = demoOpportunities.find((item) => item.id === selectedProject);
    if (project) setNewAppointment({ name: project.name, city: project.city, project: project.id, day, time });
    setAdded(true);
    setAdding(false);
  }
  return <div className="desk-screen"><PageHeading screen="agenda" action={<button className="desk-primary-button" type="button" onClick={() => setAdding((value) => !value)}><UiIcon name="plus" size={16} /> Proposer un créneau</button>} />{added && <div className="desk-inline-success" role="status"><UiIcon name="check" size={16} />Créneau d’exemple ajouté à la vue locale. Aucun message n’a été envoyé au propriétaire.<button type="button" aria-label="Fermer" onClick={() => setAdded(false)}><UiIcon name="close" size={15} /></button></div>}
    {adding && <form className="appointment-form" onSubmit={addAppointment}><div><span className="section-index">NOUVEAU CRÉNEAU · DÉMO</span><h2>Proposer un échange</h2></div><label>Dossier<select value={selectedProject} onChange={(event) => setSelectedProject(event.target.value)}>{demoOpportunities.slice(0, 4).map((project) => <option key={project.id} value={project.id}>{project.name} · {project.city}</option>)}</select></label><label>Jour<input type="text" value={day} onChange={(event) => setDay(event.target.value)} /></label><label>Heure<input type="time" value={time} onChange={(event) => setTime(event.target.value)} /></label><button className="desk-primary-button" type="submit">Ajouter à la démo <UiIcon name="check" size={15} /></button></form>}
    <div className="agenda-layout"><section className="agenda-list"><div className="agenda-date-heading"><span>DEMAIN</span><strong>Prochains échanges</strong><small>Fuseau local · exemple</small></div>{newAppointment && <div className="new-appointment-demo"><span className="section-index">CRÉNEAU LOCAL · {newAppointment.day.toUpperCase()} · NON ENVOYÉ</span><AppointmentRow time={newAppointment.time} name={newAppointment.name} city={newAppointment.city} purpose="Nouvelle proposition enregistrée dans cette vue de démonstration" status="Brouillon local" project={newAppointment.project} /></div>}<AppointmentRow time="10:30" name="Léa Bernard" city="Pessac" purpose="Premier rendez-vous · projet confirmé" status="À confirmer par l’agence" project="PV-0241" /><AppointmentRow time="14:00" name="Camille Dubois" city="Bordeaux" purpose="Préparation de visite" status="Créneau convenu" project="PV-0229" /><div className="agenda-date-heading agenda-next-date"><span>JEUDI</span><strong>À préparer</strong><small>Exemples de la semaine</small></div><AppointmentRow time="11:15" name="Alexandre Petit" city="Mérignac" purpose="Retour sur la première lecture" status="À préparer" project="PV-0214" /></section><aside className="agenda-side-note"><span className="section-index">UN CRÉNEAU A DU CONTEXTE</span><h2>Pourquoi ce rendez-vous ?</h2><p>Chaque créneau est relié au projet, à la préférence de contact et à ce qui reste à éclaircir.</p><div className="agenda-context"><UiIcon name="calendar" /><span>Les événements ci-contre sont des exemples, pas un agenda connecté.</span></div><Link href="/desk/dossier" className="text-action">Ouvrir le dossier exemple <UiIcon name="arrow" size={15} /></Link></aside></div>
  </div>;
}
function AppointmentRow({ time, name, city, purpose, status, project }: { time: string; name: string; city: string; purpose: string; status: string; project: string }) { return <article className="appointment-row"><time>{time}</time><span className="appointment-rule" /><div><div className="appointment-person"><strong>{name}</strong><span>{city}</span></div><p>{purpose}</p><small>{project} · {status}</small></div><Link href="/desk/dossier" aria-label={`Ouvrir le dossier ${name}`}><UiIcon name="arrow" size={16} /></Link></article>; }

function FollowUpsScreen() {
  const [done, setDone] = useState<string[]>([]);
  const [filter, setFilter] = useState("À faire");
  const list = demoQueue.filter((item) => filter === "Terminées" ? done.includes(item.id) : filter === "Toutes" || !done.includes(item.id));
  return <div className="desk-screen"><PageHeading screen="followups" action={<Link className="desk-secondary-button" href="/desk/parametres"><UiIcon name="settings" size={16} /> Règles de rappel</Link>} /><div className="followup-filter" role="group" aria-label="Filtrer les actions">{["À faire", "Terminées", "Toutes"].map((value) => <button key={value} type="button" className={filter === value ? "is-active" : ""} onClick={() => setFilter(value)}>{value}</button>)}</div>
    <div className="followup-list">{list.map((item, index) => { const project = demoOpportunities.find((record) => record.id === item.id)!; const isDone = done.includes(item.id); return <article className={`followup-card ${isDone ? "is-done" : ""}`} key={item.id}><div className="followup-number">0{index + 1}</div><div className="followup-copy"><div className="followup-meta"><StageBadge stage={project.stage} /><span>{item.age}</span></div><h2>{project.name} <small>· {project.city}</small></h2><strong>{item.label}</strong><p>{item.reason}</p><div className="followup-risk"><span>POURQUOI MAINTENANT</span>{item.risk}</div><div className="followup-card-actions"><Link href="/desk/dossier">Relire le contexte <UiIcon name="arrow" size={14} /></Link><button type="button" onClick={() => setDone((current) => isDone ? current.filter((id) => id !== item.id) : [...current, item.id])}>{isDone ? "Réouvrir" : "Marquer comme fait"} <UiIcon name={isDone ? "back" : "check"} size={14} /></button></div></div></article>; })}{list.length === 0 && <EmptyState title="Aucune relance dans cette vue." detail="Les actions terminées apparaîtront ici après votre première décision." />}</div><p className="desk-footnote">Aucune relance automatique n’est envoyée depuis cette démonstration.</p>
  </div>;
}

function AnalyticsScreen() {
  const p = demoPerformance;
  const bars = [{ label: "Projets vendeurs", value: p.activeProjects, width: "100%" }, { label: "Rendez-vous confirmés", value: p.appointments, width: `${(p.appointments / p.activeProjects) * 100}%` }, { label: "Mandats", value: p.mandates, width: `${(p.mandates / p.activeProjects) * 100}%` }];
  return <div className="desk-screen"><PageHeading screen="analytics" action={<span className="demo-data-pill">{p.period}</span>} /><div className="analytics-scope"><UiIcon name="shield" size={16} /> {p.source}. Les valeurs servent à démontrer les définitions et ne décrivent pas une agence réelle.</div>
    <section className="outcome-ledger"><div className="outcome-heading"><span className="section-index">DE LA DÉPENSE AU MANDAT</span><span>Source : simulation interne · période : 30 jours</span></div><div className="outcome-flow"><div><small>DÉPENSE D’ACQUISITION</small><strong>{p.acquisitionSpend.toLocaleString("fr-FR")} €</strong><span>Investissement exemple</span></div><i /><div><small>PROJETS VENDEURS</small><strong>{p.activeProjects}</strong><span>Créés sur la période</span></div><i /><div><small>RENDEZ-VOUS</small><strong>{p.appointments}</strong><span>Confirmés dans l’exemple</span></div><i /><div><small>MANDATS</small><strong>{p.mandates}</strong><span>Résultat final exemple</span></div></div></section>
    <div className="analytics-detail-grid"><section className="conversion-section"><div className="desk-section-heading"><div><span className="section-index">LECTURE DU FLUX</span><h2>Où le projet avance.</h2><p>Volumes de démonstration · pas de taux de conversion réel.</p></div></div><div className="conversion-bars">{bars.map((bar) => <div className="conversion-bar-row" key={bar.label}><div><span>{bar.label}</span><strong>{bar.value}</strong></div><i><b style={{ width: bar.width }} /></i></div>)}</div><p className="calculation-note">Le flux aide à repérer l’étape à examiner. Pour comparer deux périodes, chaque résultat doit être attribué à une source vérifiable.</p></section><section className="metric-decision"><span className="section-index">MÉTRIQUES LIÉES À UNE DÉCISION</span><h2>Un chiffre n’est utile que s’il guide une action.</h2><div className="decision-metric"><span>Coût d’un rendez-vous</span><strong>{p.costPerAppointment} €</strong><small>{p.acquisitionSpend} € ÷ {p.appointments} rendez-vous confirmés</small><p>À vérifier : le délai de premier contact et le taux de confirmation.</p></div><div className="decision-metric"><span>Coût par mandat</span><strong>{p.costPerMandate} €</strong><small>{p.acquisitionSpend} € ÷ {p.mandates} mandats d’exemple</small><p>À comparer : marge et renouvellement sur la même période.</p></div></section></div>
  </div>;
}

function TeamScreen() {
  const [capacity, setCapacity] = useState<Record<string, number>>({ "Conseiller A": 3, "Conseiller B": 2 });
  const [message, setMessage] = useState("");
  return <div className="desk-screen"><PageHeading screen="team" action={<button className="desk-secondary-button" type="button" onClick={() => setMessage("L’invitation ne partira qu’après la connexion du service d’équipe.")}><UiIcon name="plus" size={16} /> Inviter un membre</button>} />{message && <div className="desk-inline-success" role="status">{message}<button type="button" aria-label="Fermer" onClick={() => setMessage("")}><UiIcon name="close" size={15} /></button></div>}
    <div className="team-overview"><div><span className="section-index">CAPACITÉ TOTALE · EXEMPLE</span><strong>{Object.values(capacity).reduce((total, value) => total + value, 0)} dossiers</strong><small>Capacité déclarée par les membres de l’équipe</small></div><div><span className="section-index">À ATTRIBUER</span><strong>2 dossiers</strong><small>Seuil illustratif, non connecté</small></div></div>
    <div className="team-list">{Object.entries(capacity).map(([name, value], index) => <article className="team-row" key={name}><span className="team-index">0{index + 1}</span><div className="team-name"><strong>{name}</strong><small>{index === 2 ? "Capacité collective · démonstration" : "Conseiller · rôle de démonstration"}</small></div><div className="team-workload"><span>Capacité / mois</span><strong>{value} projets</strong></div><div className="capacity-adjust"><button type="button" aria-label={`Réduire la capacité de ${name}`} disabled={value <= 0} onClick={() => setCapacity((current) => ({ ...current, [name]: Math.max(0, current[name] - 1) }))}>−</button><button type="button" aria-label={`Augmenter la capacité de ${name}`} onClick={() => setCapacity((current) => ({ ...current, [name]: current[name] + 1 }))}>+</button></div></article>)}</div><p className="desk-footnote">Les rôles, identités et capacités ci-dessus sont fictifs. Le contrôle d’accès et l’attribution doivent être gérés côté serveur dans le produit final.</p>
  </div>;
}

function TerritoryScreen() {
  const [postal, setPostal] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  function check(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); if (!/^\d{5}$/.test(postal)) { setError("Un code postal français comporte 5 chiffres."); setChecked(false); return; } setError(""); setChecked(true); }
  return <div className="desk-screen"><PageHeading screen="territory" action={<span className="unconnected-pill"><span /> Couverture non connectée</span>} /><div className="territory-layout"><section className="territory-config"><span className="section-index">01 / PRÉPARER UNE ZONE</span><h2>La capacité précède l’attribution.</h2><p>Vérifiez que la zone est couverte, que la spécialité correspond et que l’équipe peut agir avant de recevoir des projets vendeurs.</p><form className="territory-check-form" onSubmit={check}><label htmlFor="territory-postal">Code postal à vérifier</label><div><input id="territory-postal" inputMode="numeric" maxLength={5} placeholder="Ex. 33000" value={postal} onChange={(event) => { setPostal(event.target.value.replace(/\D/g, "")); setChecked(false); }} /><button className="desk-primary-button" type="submit">Vérifier le format <UiIcon name="arrow" size={15} /></button></div>{error && <p className="form-error-message" role="alert">{error}</p>}{checked && <div className="zone-check-result" role="status"><UiIcon name="clock" size={17} /><span><strong>Format valide · couverture à confirmer.</strong><small>La vérification réelle de la zone et des agences n’est pas connectée.</small></span></div>}</form></section><aside className="territory-readiness"><span className="section-index">AVANT D’OUVRIR UNE ZONE</span><ul><li><UiIcon name="check" /> Zone et communes validées</li><li><UiIcon name="check" /> Spécialités de l’agence définies</li><li><UiIcon name="check" /> Capacité de l’équipe à jour</li><li><UiIcon name="check" /> Délais de première réponse établis</li><li><UiIcon name="check" /> Règles de pause et de débordement définies</li></ul><p>État de démonstration · aucune zone active n’est déclarée.</p></aside></div><div className="territory-empty"><UiIcon name="pin" size={19} /><div><strong>Aucune carte de couverture fictive.</strong><span>Les zones ne seront affichées qu’après validation opérationnelle.</span></div></div>
  </div>;
}

function SubscriptionScreen() {
  const [selected, setSelected] = useState("");
  return <div className="desk-screen"><PageHeading screen="subscription" action={<span className="demo-data-pill">Aucun paiement · démo</span>} /><div className="subscription-intro"><UiIcon name="shield" size={20} /><p>Ni carte bancaire, ni achat, ni facturation ne sont disponibles dans cette version. Les plans ci-dessous illustrent des périmètres fonctionnels ; leurs montants sont à définir.</p></div><div className="subscription-options">{[{ id: "pilotage", label: "Pilotage", detail: "Le socle opérationnel pour suivre les projets et la file d’actions.", points: ["Projets vendeurs et dossiers", "Pipeline et agenda", "Capacité et prochaines actions"] }, { id: "performance", label: "Performance", detail: "La lecture de l’acquisition, des rendez-vous et des mandats.", points: ["Attribution par source", "Coût par rendez-vous", "Coût par mandat et période"] }].map((plan, index) => <article className={`subscription-option ${selected === plan.id ? "is-selected" : ""}`} key={plan.id}><span className="section-index">0{index + 1} / OFFRE DE DÉMONSTRATION</span><h2>{plan.label}</h2><p>{plan.detail}</p><ul>{plan.points.map((point) => <li key={point}><UiIcon name="check" size={15} />{point}</li>)}</ul><button className="desk-secondary-button" type="button" onClick={() => setSelected(plan.id)}>{selected === plan.id ? "Périmètre choisi pour la démo" : "Explorer ce périmètre"}<UiIcon name={selected === plan.id ? "check" : "arrow"} size={15} /></button></article>)}</div><p className="desk-footnote">Les offres, prix, quotas, factures, renouvellements et webhooks ne sont pas connectés. Aucun engagement financier n’est créé.</p>
  </div>;
}

function SettingsScreen() {
  const [alerts, setAlerts] = useState(true);
  const [digest, setDigest] = useState(false);
  const [saved, setSaved] = useState(false);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("18:00");
  return <div className="desk-screen"><PageHeading screen="settings" action={<button className="desk-primary-button" type="button" onClick={() => setSaved(true)}><UiIcon name="check" size={16} /> Enregistrer la démo</button>} />{saved && <div className="desk-inline-success" role="status"><UiIcon name="check" size={16} />Préférences mises à jour dans cet écran uniquement.<button type="button" aria-label="Fermer" onClick={() => setSaved(false)}><UiIcon name="close" size={15} /></button></div>}
    <div className="settings-sections"><section className="settings-block"><div><span className="section-index">01 / NOTIFICATIONS</span><h2>Garder l’équipe informée.</h2><p>Les notifications réelles ne sont pas connectées dans cette démonstration.</p></div><div className="settings-options"><ToggleRow title="Nouvelle action prioritaire" detail="Quand un dossier nécessite une première réponse." checked={alerts} onChange={setAlerts} /><ToggleRow title="Synthèse hebdomadaire" detail="Un récapitulatif des projets, rendez-vous et mandats." checked={digest} onChange={setDigest} /></div></section><section className="settings-block"><div><span className="section-index">02 / DISPONIBILITÉ</span><h2>Des horaires lisibles.</h2><p>Indiquez quand un premier contact peut être pris en charge.</p></div><div className="availability-fields"><label>Début de journée<input type="time" value={start} onChange={(event) => setStart(event.target.value)} /></label><label>Fin de journée<input type="time" value={end} onChange={(event) => setEnd(event.target.value)} /></label></div></section><section className="settings-block"><div><span className="section-index">03 / DONNÉES</span><h2>Exporter ou supprimer.</h2><p>Les droits et opérations réels doivent être exécutés par le backend sécurisé.</p></div><div className="settings-action-stack"><button type="button" className="desk-secondary-button" onClick={() => exportProjects(demoOpportunities)}><UiIcon name="download" size={16} /> Exporter les données exemple</button><button type="button" className="danger-outline-button" onClick={() => setSaved(true)}>Voir le parcours de suppression <UiIcon name="arrow" size={15} /></button></div></section></div>
  </div>;
}
function ToggleRow({ title, detail, checked, onChange }: { title: string; detail: string; checked: boolean; onChange: (value: boolean) => void }) { return <label className="setting-toggle-row"><span><strong>{title}</strong><small>{detail}</small></span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} /><i aria-hidden="true" /></label>; }

function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [zone, setZone] = useState("Bordeaux");
  const [speciality, setSpeciality] = useState("Maisons et appartements");
  const [capacity, setCapacity] = useState("4");
  const [complete, setComplete] = useState(false);
  const prompts = ["Votre zone", "Vos spécialités", "Votre capacité", "Vos règles de contact"];
  function advance() { if (step < 3) setStep((current) => current + 1); else setComplete(true); }
  return <div className="desk-screen"><PageHeading screen="onboarding" action={<span className="demo-data-pill">Progression locale</span>} />{complete ? <section className="onboarding-complete"><span className="completion-mark"><UiIcon name="check" size={23} /></span><p className="section-index">MISE EN ROUTE · TERMINÉE POUR LA DÉMO</p><h2>Votre Desk a ses premiers repères.</h2><p>Dans le produit final, ces paramètres devront être validés avant l’activation de toute attribution.</p><Link className="desk-primary-button" href="/desk">Voir la salle de pilotage <UiIcon name="arrow" size={15} /></Link></section> : <div className="onboarding-layout"><nav className="onboarding-steps" aria-label="Étapes de mise en route">{prompts.map((prompt, index) => <button type="button" key={prompt} className={step === index ? "is-active" : step > index ? "is-done" : ""} onClick={() => setStep(index)}><span>{step > index ? <UiIcon name="check" size={13} /> : `0${index + 1}`}</span>{prompt}</button>)}</nav><section className="onboarding-form"><span className="section-index">ÉTAPE 0{step + 1} / 04 · {prompts[step].toUpperCase()}</span>{step === 0 && <><h2>Où votre agence peut-elle agir ?</h2><p>Zone exemple uniquement. Elle ne sera pas publiée ni vérifiée.</p><label className="field-label" htmlFor="onboarding-zone">Ville ou territoire</label><input className="field-control" id="onboarding-zone" value={zone} onChange={(event) => setZone(event.target.value)} /></>}{step === 1 && <><h2>Quels biens accompagnez-vous ?</h2><p>Déclarez vos spécialités pour préparer une attribution pertinente.</p><label className="field-label" htmlFor="speciality">Spécialités</label><select className="field-control" id="speciality" value={speciality} onChange={(event) => setSpeciality(event.target.value)}><option>Maisons et appartements</option><option>Maisons uniquement</option><option>Appartements uniquement</option><option>Biens atypiques</option></select></>}{step === 2 && <><h2>Combien de nouveaux projets pouvez-vous suivre ?</h2><p>La capacité est une règle d’attribution, pas une promesse de volume.</p><label className="field-label" htmlFor="capacity">Capacité mensuelle de démonstration</label><input className="field-control" id="capacity" type="number" min="0" value={capacity} onChange={(event) => setCapacity(event.target.value)} /></>}{step === 3 && <><h2>Quand pouvez-vous répondre ?</h2><p>Le premier contact doit respecter la préférence exprimée par le propriétaire.</p><div className="onboarding-rule"><UiIcon name="shield" /><span><strong>Contact choisi par la personne</strong><small>Aucun appel automatique. La prochaine action reste visible à l’équipe.</small></span></div><div className="onboarding-rule"><UiIcon name="clock" /><span><strong>Réponse attendue : sous un jour ouvré</strong><small>Valeur indicative à confirmer par l’agence pilote.</small></span></div></>}
      <div className="onboarding-controls"><button className="desk-secondary-button" type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>Retour</button><button className="desk-primary-button" type="button" onClick={advance}>{step === 3 ? "Terminer la mise en route" : "Continuer"}<UiIcon name="arrow" size={15} /></button></div></section></div>}
  </div>;
}

export function DeskDossierScreen() {
  const project = demoOpportunities[0];
  const [nextAction, setNextAction] = useState("Répondre par écrit aujourd’hui");
  const [saved, setSaved] = useState(false);
  const [note, setNote] = useState("");
  return <div className="desk-screen dossier-screen"><div className="dossier-back-row"><Link href="/desk/projets"><UiIcon name="back" size={15} /> Retour aux projets</Link><span>FICHE PROJET VENDEUR · EXEMPLE</span><button className="desk-secondary-button" type="button" onClick={() => exportProjects([project])}><UiIcon name="download" size={15} /> Exporter cette fiche</button></div><div className="dossier-page-heading"><div><p className="desk-eyebrow"><span />{project.id} · {project.city.toUpperCase()} · DOSSIER DE DÉMONSTRATION</p><h1>{project.name}</h1><p className="dossier-summary-line">{project.intention}. {project.property} · {project.city}.</p></div><StageBadge stage={project.stage} /></div>
    {saved && <div className="desk-inline-success" role="status"><UiIcon name="check" size={16} />Prochaine action mise à jour localement dans la démonstration.<button type="button" aria-label="Fermer" onClick={() => setSaved(false)}><UiIcon name="close" size={15} /></button></div>}
    <div className="dossier-layout"><div className="dossier-main-column"><section className="dossier-action-sheet"><div className="sheet-section-head"><div><span className="section-index">À FAIRE MAINTENANT · POURQUOI</span><h2>Le premier contact mérite une réponse claire.</h2></div><span className="priority-mark"><UiIcon name="clock" size={16} /> 12 min</span></div><p>Le propriétaire a demandé une première lecture de son projet et préfère une réponse écrite. Il évoque un horizon de six mois : une première réponse aujourd’hui permet de garder le contexte intact.</p><label className="field-label" htmlFor="next-action">Prochaine action assignée</label><select id="next-action" className="field-control" value={nextAction} onChange={(event) => setNextAction(event.target.value)}><option>Répondre par écrit aujourd’hui</option><option>Préparer les questions pour un appel</option><option>Proposer un créneau de rendez-vous</option><option>Revenir sur le dossier à la date choisie</option></select><div className="dossier-action-buttons"><button className="desk-primary-button" type="button" onClick={() => setSaved(true)}>Enregistrer la prochaine action <UiIcon name="check" size={15} /></button><button className="desk-secondary-button" type="button" onClick={() => setNextAction("Revenir sur le dossier à la date choisie")}>À maturer <UiIcon name="clock" size={15} /></button></div></section>
      <section className="dossier-timeline"><div className="desk-section-heading"><div><span className="section-index">CHRONOLOGIE · VERSION DÉMO</span><h2>Ce qui s’est passé.</h2></div><span className="demo-data-pill">4 événements exemple</span></div><div className="timeline-entry"><span className="timeline-dot is-current" /><div><small>AUJOURD’HUI · 09:14 · VENDEVIA</small><strong>Le Projet Vendeur a été créé</strong><p>Origine : campagne locale de démonstration. Aucun parcours réel connecté.</p></div></div><div className="timeline-entry"><span className="timeline-dot" /><div><small>AUJOURD’HUI · 09:15 · PROPRIÉTAIRE</small><strong>Une première réponse écrite a été choisie</strong><p>Le canal de contact exprimé dans le formulaire reste la référence de ce dossier.</p></div></div><div className="timeline-entry"><span className="timeline-dot" /><div><small>AUJOURD’HUI · 09:16 · SYSTÈME DE DÉMO</small><strong>La prochaine action a été suggérée</strong><p>Motif : horizon indiqué à six mois, première réponse demandée, action encore à faire.</p></div></div><div className="timeline-entry"><span className="timeline-dot" /><div><small>À VENIR · ÉQUIPE AGENCE</small><strong>{nextAction}</strong><p>À réaliser par une personne de l’équipe. Aucune relance ne part automatiquement.</p></div></div></section>
      <section className="dossier-note-section"><div><span className="section-index">NOTE INTERNE · DÉMO</span><h2>Garder une trace utile.</h2></div><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Une note de démonstration (non enregistrée)…" aria-label="Note interne de démonstration" /><small>Cette note reste dans la mémoire de l’écran et n’est pas transmise.</small></section>
    </div><aside className="dossier-aside"><section className="dossier-side-block"><span className="section-index">01 / REPÈRES DU PROJET</span><h2>Une première lecture, pas un score.</h2><div className="dossier-data-row"><span>Intention</span><strong>{project.intention}</strong></div><div className="dossier-data-row"><span>Type de bien</span><strong>{project.property}</strong></div><div className="dossier-data-row"><span>Zone</span><strong>{project.city}</strong></div><div className="dossier-data-row"><span>Source</span><strong>{project.source}</strong></div></section><section className="dossier-side-block dossier-consent"><span className="section-index">02 / CONSENTEMENT</span><h2>Ce qui autorise le contact.</h2><p>{project.consent}</p><small>Le produit final doit conserver le texte affiché, la version et l’horodatage du consentement.</small></section><section className="dossier-side-block"><span className="section-index">03 / RÉSULTAT</span><h2>Un mandat n’est pas encore un résultat.</h2><p>Le dossier est à l’étape « nouveau projet ». Le coût d’un mandat ne sera calculé qu’après une attribution vérifiable et un résultat consigné.</p><Link href="/desk/analytics" className="text-action">Voir les définitions économiques <UiIcon name="arrow" size={14} /></Link></section><div className="dossier-maturity"><span>ÉTAT DE MATURITÉ · EXPLICABLE</span><strong>À qualifier par un échange</strong><small>Pas de score opaque : le contact demandé et l’horizon sont connus, la compréhension du bien reste à compléter.</small></div></aside></div>
  </div>;
}

export function BackofficeScreen() {
  const [view, setView] = useState("Qualité");
  const [reviewed, setReviewed] = useState<string[]>([]);
  const data: Record<string, string[]> = {
    "Vue globale": ["Projets à attribuer", "Zones à vérifier", "Incidents à examiner"],
    Agences: ["Capacité déclarée", "Délai de réponse", "Accords de zone"],
    Projets: ["Consentements versionnés", "Prochaine action manquante", "Résultat à vérifier"],
    Attribution: ["Zone compatible", "Capacité disponible", "Motif d’attribution"],
    Qualité: ["Consentement absent", "Première réponse en retard", "Résultat de rendez-vous manquant"],
    Campagnes: ["Source à valider", "UTM incomplet", "Campagne sans résultat attribué"],
    Zones: ["Territoire non vérifié", "Agence pilote manquante", "Débordement à définir"],
    Facturation: ["Offre à confirmer", "Aucun paiement connecté", "Facture non émise"],
    Incidents: ["Aucun flux réel connecté", "Dernier test : démonstration", "Journalisation à relier"],
    Audit: ["Consentement", "Changement de capacité", "Export / suppression"],
  };
  return <main className="backoffice-app"><SiteHeader /><div className="backoffice-shell"><div className="backoffice-title"><div><p className="eyebrow"><span className="eyebrow-rule" /> VENDEVIA · BACK-OFFICE DE DÉMONSTRATION</p><h1>La qualité du pipeline<br /><em>se vérifie aussi en coulisses.</em></h1><p>Une vue interne doit rendre visibles les écarts, les permissions et la santé des attributions — sans exposer de vraies données ici.</p></div><span className="demo-data-pill">Données non réelles</span></div><div className="backoffice-workspace"><nav className="backoffice-nav" aria-label="Navigation back-office">{Object.keys(data).map((item) => <button type="button" key={item} className={view === item ? "is-active" : ""} onClick={() => setView(item)}>{item}<UiIcon name="arrow" size={14} /></button>)}</nav><section className="backoffice-quality"><div className="backoffice-view-heading"><span className="section-index">VUE INTERNE / {view.toUpperCase()}</span><h2>{view === "Qualité" ? "Ce qui mérite une vérification." : `Contrôles : ${view.toLowerCase()}.`}</h2><p>Liste de contrôle de démonstration · aucune agence ni personne réelle.</p></div><div className="backoffice-checklist">{data[view].map((item, index) => { const itemKey = `${view}:${item}`; const isReviewed = reviewed.includes(itemKey); return <article key={item}><span className="backoffice-index">0{index + 1}</span><div><strong>{item}</strong><small>{index === 0 ? "Priorité élevée · règle à configurer" : "À confirmer avant toute mise en service"}</small></div><button type="button" aria-pressed={isReviewed} onClick={() => setReviewed((current) => isReviewed ? current.filter((entry) => entry !== itemKey) : [...current, itemKey])}>{isReviewed ? "Noté" : "Examiner"} <UiIcon name={isReviewed ? "check" : "arrow"} size={14} /></button></article>; })}</div><p className="desk-footnote">Le contrôle des rôles, l’attribution, la facturation et les opérations sensibles doivent être exécutés côté serveur, journalisés et testés avant lancement.</p></section></div></div></main>;
}

export function AccessPage({ createAccount = false }: { createAccount?: boolean }) {
  return <main className="public-page access-page"><SiteHeader /><section className="access-content page-gutter"><div className="access-copy"><p className="eyebrow"><span className="eyebrow-rule" /> {createAccount ? "REJOINDRE VENDEVIA" : "ACCÈS VENDEVIA"}</p><h1>{createAccount ? "Un espace pensé pour avancer." : "Retrouvez votre espace."}</h1><p>{createAccount ? "La création de compte réel s’activera avec le service d’authentification sécurisé." : "La connexion réelle n’est pas encore reliée. Vous pouvez néanmoins explorer les deux espaces de démonstration."}</p><DemoNotice /></div><div className="access-options"><Link className="access-option" href="/desk"><span>01 / AGENCE</span><strong>Explorer Vendevia Desk</strong><small>Données d’exemple · aucune authentification réelle.</small><UiIcon name="arrow" /></Link><Link className="access-option" href="/maison"><span>02 / PROPRIÉTAIRE</span><strong>Explorer Vendevia Maison</strong><small>Parcours local · aucune transmission à une agence.</small><UiIcon name="arrow" /></Link><Link className="access-option access-option-muted" href="/desk/onboarding"><span>03 / ESPACE AGENCE</span><strong>Voir la mise en route</strong><small>Aucun compte ne sera créé dans cette démo.</small><UiIcon name="arrow" /></Link></div></section></main>;
}

function StageBadge({ stage }: { stage: StageId }) { return <span className={`stage-badge stage-${stage}`}><i />{stageLabels[stage]}</span>; }
function EmptyState({ title, detail, action }: { title: string; detail: string; action?: React.ReactNode }) { return <div className="desk-empty-state"><span><UiIcon name="file" size={19} /></span><strong>{title}</strong><p>{detail}</p>{action && <div>{action}</div>}</div>; }
function exportProjects(projects: DemoOpportunity[]) {
  const headers = ["Référence", "Nom exemple", "Ville exemple", "Bien exemple", "Étape", "Prochaine action", "Source exemple"];
  const rows = projects.map((project) => [project.id, project.name, project.city, project.property, stageLabels[project.stage], project.nextAction, project.source]);
  const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "vendevia-projets-demonstration.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}
