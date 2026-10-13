"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDemoProject } from "@/lib/demo-project-context";
import type { MaisonProject } from "@/lib/demo-project-context";
import { ArchitecturalSketch } from "./architectural-sketch";
import { DemoNotice } from "./demo-notice";
import { SiteHeader } from "./site-header";
import { UiIcon } from "./ui-icon";

type Step = "intention" | "adresse" | "bien" | "details" | "horizon" | "motivation" | "disponibilite" | "restitution" | "mise-en-relation" | "coordonnees" | "consentements" | "confirmation" | "suivi";

const steps: Step[] = ["intention", "adresse", "bien", "details", "horizon", "motivation", "disponibilite", "restitution", "mise-en-relation", "coordonnees", "consentements", "confirmation", "suivi"];
const stepMeta: Record<Step, { number: string; eyebrow: string; title: string; intro: string; question: string }> = {
  intention: { number: "01", eyebrow: "Commençons simplement", title: "Vous n’avez pas à avoir décidé.", intro: "On va remettre quelques repères dans le bon ordre. Vous gardez le contrôle de la suite.", question: "Où en est votre réflexion ?" },
  adresse: { number: "02", eyebrow: "Le lieu donne du contexte", title: "Un projet commence quelque part.", intro: "Une ville suffit pour cette première lecture. L’adresse exacte peut attendre.", question: "Dans quelle ville se trouve le bien ?" },
  bien: { number: "03", eyebrow: "Un premier repère sur le bien", title: "Pas besoin de tout décrire.", intro: "La bonne catégorie nous aide à poser les bonnes questions, pas à vous classer.", question: "De quel type de bien parle-t-on ?" },
  details: { number: "04", eyebrow: "Quelques repères utiles", title: "Ce que vous savez déjà suffit.", intro: "Une approximation est acceptable. Vous pourrez compléter ou corriger plus tard.", question: "Quels éléments connaissez-vous ?" },
  horizon: { number: "05", eyebrow: "Votre calendrier", title: "Le bon moment, c’est le vôtre.", intro: "Cette réponse permet de distinguer ce qui est utile maintenant de ce qui peut attendre.", question: "À quel horizon envisagez-vous la suite ?" },
  motivation: { number: "06", eyebrow: "Ce qui compte pour vous", title: "Un projet a souvent plusieurs raisons.", intro: "Choisissez les sujets que vous souhaitez éclaircir. Vous pouvez en retenir plusieurs.", question: "Qu’aimeriez-vous mieux comprendre ?" },
  disponibilite: { number: "07", eyebrow: "Votre rythme", title: "Une bonne expérience sait attendre.", intro: "Le parcours ne déclenche pas de relance. Votre préférence sert à préparer une suite adaptée.", question: "Quel rythme vous convient aujourd’hui ?" },
  restitution: { number: "08", eyebrow: "Votre première lecture", title: "Pas un score. Des repères pour décider.", intro: "Cette lecture s’appuie uniquement sur les éléments que vous venez de saisir. Elle n’est ni une estimation ni un avis professionnel.", question: "Voici ce qui ressort de votre dossier." },
  "mise-en-relation": { number: "09", eyebrow: "Vous choisissez la suite", title: "Un bon contact n’arrive pas par surprise.", intro: "Vous pouvez demander un échange ou continuer seul. Aucun dossier ne part vers une agence depuis cette démonstration.", question: "Comment souhaitez-vous continuer ?" },
  coordonnees: { number: "10", eyebrow: "Seulement si vous le demandez", title: "Préparons un échange utile.", intro: "Ces coordonnées ne sont demandées qu’après votre choix d’être accompagné. Dans cette démo, ne saisissez pas de données réelles.", question: "Comment vous joindre si le produit était connecté ?" },
  consentements: { number: "11", eyebrow: "Avant toute transmission", title: "Vous voyez ce qui serait partagé.", intro: "Le contact avec une agence et la prospection sont deux choix distincts. La prospection reste facultative.", question: "Confirmez uniquement les choix qui vous conviennent." },
  confirmation: { number: "12", eyebrow: "Votre choix est posé", title: "La suite reste entre vos mains.", intro: "Votre parcours est terminé dans la démonstration. Rien n’a été enregistré ni transmis à une agence.", question: "Votre dossier de démonstration est prêt." },
  suivi: { number: "13", eyebrow: "Le dossier vivant", title: "Retrouvez les repères du projet.", intro: "Dans le produit final, cette page conservera la chronologie et les prochaines étapes après votre choix.", question: "Un suivi clair, sans repartir de zéro." },
};

const intentions = ["Je me renseigne", "Je prépare quelque chose", "Je pense vendre dans les six mois", "J’ai besoin d’un avis rapidement"];
const propertyTypes = ["Maison", "Appartement", "Terrain", "Autre bien"];
const horizons = ["Je prends le temps", "Dans les 6 à 12 mois", "Dans les 3 à 6 mois", "Dans les 3 mois", "Je ne sais pas encore"];
const motivations = ["Comprendre la valeur", "Préparer un déménagement", "Connaître les étapes", "Faire le point sur des travaux", "Parler à un professionnel", "Autre chose"];
const rhythms = ["Je préfère avancer seul pour le moment", "Je souhaite une réponse par écrit", "Je préfère choisir un créneau", "Je peux être rappelé plus tard"];
const contactModes = [
  { id: "message", title: "Recevoir une première réponse", detail: "Un échange écrit, sans appel surprise." },
  { id: "rappel", title: "Être rappelé au bon moment", detail: "Vous précisez ensuite une fenêtre qui vous convient." },
  { id: "rendez-vous", title: "Préparer un rendez-vous", detail: "Un professionnel local pourra reprendre le contexte du projet." },
  { id: "seul", title: "Continuer seul pour le moment", detail: "Votre dossier ne serait pas transmis à une agence." },
];

export function MaisonJourney({ step }: { step: Step }) {
  const { project, updateProject } = useDemoProject();
  const router = useRouter();
  const [error, setError] = useState("");
  const meta = stepMeta[step];
  const currentIndex = steps.indexOf(step);
  const priorStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const progress = step === "suivi" ? 100 : Math.round(((currentIndex + 1) / 12) * 100);

  function go(next: Step) { setError(""); router.push(`/maison/projet/${next}`); }
  function update<K extends keyof MaisonProject>(key: K, value: MaisonProject[K]) { updateProject(key, value); setError(""); }

  function advance() {
    if (step === "intention" && !project.intention) return setError("Choisissez la réponse qui vous ressemble le plus.");
    if (step === "adresse" && !project.city.trim()) return setError("Indiquez au moins la ville du bien.");
    if (step === "bien" && !project.propertyType) return setError("Choisissez une catégorie pour continuer.");
    if (step === "details" && !project.surface && !project.rooms && !project.condition) return setError("Vous pouvez indiquer un repère ou choisir « Je ne sais pas encore ».");
    if (step === "horizon" && !project.horizon) return setError("Choisissez un horizon, même approximatif.");
    if (step === "motivation" && project.motivations.length === 0) return setError("Choisissez au moins un sujet, ou « Autre chose ».");
    if (step === "disponibilite" && !project.availability) return setError("Choisissez le rythme qui vous convient.");
    if (step === "restitution") return go("mise-en-relation");
    if (step === "mise-en-relation") {
      if (!project.relationMode) return setError("Choisissez une option. Vous pourrez encore revenir en arrière.");
      if (project.relationMode === "seul") { updateProject("submitted", true); return go("confirmation"); }
      return go("coordonnees");
    }
    if (step === "coordonnees") {
      if (!project.fullName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(project.email.trim())) return setError("Indiquez un nom et une adresse e-mail valide pour préparer cet échange.");
      return go("consentements");
    }
    if (step === "consentements") {
      if (!project.contactConsent) return setError("Pour une mise en relation, l’accord de partage doit être explicite. Vous pouvez aussi revenir et continuer seul.");
      updateProject("submitted", true);
      return go("confirmation");
    }
    if (step === "confirmation") return go("suivi");
    if (step === "suivi") return router.push("/maison");
    const next = steps[currentIndex + 1];
    if (next) go(next);
  }

  const isTerminal = step === "confirmation" || step === "suivi";
  return (
    <main className="maison-journey-page">
      <SiteHeader active="maison" />
      <div className="journey-demo-strip"><DemoNotice compact /></div>
      <div className="journey-shell">
        <aside className="journey-narrative">
          <Link className="journey-back" href={priorStep ? `/maison/projet/${priorStep}` : "/maison"}><UiIcon name="back" size={15} /> {priorStep ? "Étape précédente" : "Revenir à la présentation"}</Link>
          <p className="eyebrow"><span className="eyebrow-rule" /> {meta.eyebrow}</p>
          <h1>{meta.title}</h1>
          <p className="journey-narrative-copy">{meta.intro}</p>
          <div className="journey-art"><ArchitecturalSketch /><span className="journey-art-label">DOSSIER V / {meta.number}</span></div>
          <p className="journey-trust"><UiIcon name="shield" size={17} /><span><strong>Pas de transmission automatique.</strong><small>Dans cette démo, les réponses restent en mémoire pendant la navigation.</small></span></p>
        </aside>

        <section className="journey-form-panel" aria-labelledby="journey-question">
          <div className="journey-form-top"><div><span className="form-kicker">VENDEVIA MAISON · {step === "suivi" ? "SUIVI DU DOSSIER" : `${meta.number} / 12`}</span><span className="form-time">Une étape à la fois</span></div><span className="progress-label">{progress}%</span></div>
          <div className="journey-progress" aria-label={`Progression du parcours : ${progress}%`}><span style={{ width: `${progress}%` }} /></div>
          <div className="journey-form-body">
            <h2 id="journey-question">{meta.question}</h2>
            <StepContent step={step} project={project} update={update} />
            {error && <p className="form-error-message" role="alert">{error}</p>}
            {step === "consentements" && <div className="transmission-summary"><span>Ce qui serait partagé avec l’agence choisie</span><p>Votre prénom et nom, votre e-mail, la ville et les repères du bien, votre intention, votre calendrier et votre demande.</p><small>La prospection Vendevia est séparée et désactivée par défaut.</small></div>}
            {step === "restitution" && <DemoNotice compact />}
            <div className="journey-actions">
              {priorStep && !isTerminal && <Link className="journey-secondary-action" href={`/maison/projet/${priorStep}`}>Retour</Link>}
              <button className="button button-primary journey-submit" type="button" onClick={advance}>
                {step === "restitution" ? "Choisir la suite" : step === "mise-en-relation" ? (project.relationMode === "seul" ? "Terminer sans transmission" : "Continuer avec ce choix") : step === "coordonnees" ? "Continuer vers mes choix" : step === "consentements" ? "Confirmer mon choix" : step === "confirmation" ? "Voir le suivi de démonstration" : step === "suivi" ? "Revenir à Vendevia Maison" : "Continuer"}
                <UiIcon name="arrow" size={17} />
              </button>
            </div>
            <p className="journey-privacy">Ne saisissez pas de données personnelles réelles : ce prototype n’est pas relié à un service sécurisé.</p>
          </div>
        </section>
      </div>
      <footer className="journey-footer"><span>VENDEVIA MAISON / DOSSIER EN PRÉPARATION</span><span>{isTerminal ? "VOS CHOIX RESTENT LES VÔTRES" : `ÉTAPE ${meta.number} · SANS PRESSION`}</span></footer>
    </main>
  );
}

function StepContent({ step, project, update }: { step: Step; project: MaisonProject; update: <K extends keyof MaisonProject>(key: K, value: MaisonProject[K]) => void }) {
  if (step === "intention") return <OptionGroup ariaLabel="Votre intention" values={intentions} selected={project.intention} onChoose={(value) => update("intention", value)} />;
  if (step === "adresse") return <div className="field-stack"><label className="field-label" htmlFor="city">Ville ou commune</label><input className="field-control" id="city" autoComplete="address-level2" placeholder="Bordeaux" value={project.city} onChange={(event) => update("city", event.target.value)} /><label className="field-label" htmlFor="address">Adresse exacte <span>facultatif à ce stade</span></label><input className="field-control" id="address" autoComplete="street-address" placeholder="Vous pourrez l’ajouter plus tard" value={project.address} onChange={(event) => update("address", event.target.value)} /><p className="field-hint">La ville suffit pour continuer. Le repère exact n’est pas requis pour cette lecture.</p></div>;
  if (step === "bien") return <OptionGroup ariaLabel="Type de bien" values={propertyTypes} selected={project.propertyType} onChoose={(value) => update("propertyType", value)} />;
  if (step === "details") return <div className="field-stack"><div className="field-pair"><div><label className="field-label" htmlFor="surface">Surface approximative <span>m²</span></label><input className="field-control" id="surface" type="number" min="1" max="9999" inputMode="numeric" placeholder="Ex. 95" value={project.surface} onChange={(event) => update("surface", event.target.value)} /></div><div><label className="field-label" htmlFor="rooms">Nombre de pièces</label><input className="field-control" id="rooms" type="number" min="1" max="30" inputMode="numeric" placeholder="Ex. 4" value={project.rooms} onChange={(event) => update("rooms", event.target.value)} /></div></div><label className="field-label" htmlFor="condition">État général</label><select className="field-control" id="condition" value={project.condition} onChange={(event) => update("condition", event.target.value)}><option value="">Choisir si vous le savez</option><option>À rafraîchir</option><option>Bon état général</option><option>Récemment rénové</option><option>Je préfère en parler</option><option>Je ne sais pas encore</option></select><p className="field-hint">Les informations que vous ne connaissez pas peuvent rester vides.</p></div>;
  if (step === "horizon") return <OptionGroup ariaLabel="Votre horizon" values={horizons} selected={project.horizon} onChoose={(value) => update("horizon", value)} />;
  if (step === "motivation") return <div className="choice-list" role="group" aria-label="Sujets à éclaircir">{motivations.map((item) => { const active = project.motivations.includes(item); return <button className={`choice-row ${active ? "is-selected" : ""}`} type="button" key={item} aria-pressed={active} onClick={() => update("motivations", active ? project.motivations.filter((value) => value !== item) : [...project.motivations, item])}><span className="choice-check"><UiIcon name="check" size={14} /></span><strong>{item}</strong><UiIcon name="plus" size={15} /></button>; })}</div>;
  if (step === "disponibilite") return <OptionGroup ariaLabel="Votre préférence de rythme" values={rhythms} selected={project.availability} onChoose={(value) => update("availability", value)} />;
  if (step === "restitution") return <ResultNotes project={project} />;
  if (step === "mise-en-relation") return <div className="contact-mode-list" role="radiogroup" aria-label="Votre choix de suite">{contactModes.map((mode) => <button className={`contact-mode-option ${project.relationMode === mode.id ? "is-selected" : ""}`} type="button" role="radio" aria-checked={project.relationMode === mode.id} key={mode.id} onClick={() => update("relationMode", mode.id)}><span className="contact-mode-mark" /><span><strong>{mode.title}</strong><small>{mode.detail}</small></span><UiIcon name="arrow" size={15} /></button>)}</div>;
  if (step === "coordonnees") return <div className="field-stack"><label className="field-label" htmlFor="full-name">Nom et prénom</label><input className="field-control" id="full-name" autoComplete="name" placeholder="Votre nom" value={project.fullName} onChange={(event) => update("fullName", event.target.value)} /><label className="field-label" htmlFor="email">Adresse e-mail</label><input className="field-control" id="email" type="email" autoComplete="email" placeholder="vous@exemple.fr" value={project.email} onChange={(event) => update("email", event.target.value)} /><label className="field-label" htmlFor="phone">Téléphone <span>facultatif, selon votre choix</span></label><input className="field-control" id="phone" type="tel" autoComplete="tel" placeholder="06 00 00 00 00" value={project.phone} onChange={(event) => update("phone", event.target.value)} /></div>;
  if (step === "consentements") return <div className="consent-list"><label className="consent-option"><input type="checkbox" checked={project.contactConsent} onChange={(event) => update("contactConsent", event.target.checked)} /><span><strong>Partager mon dossier avec un professionnel de la zone</strong><small>Nécessaire uniquement pour la mise en relation que vous avez demandée. Vous verrez l’agence et le contenu avant tout envoi réel.</small></span></label><label className="consent-option consent-optional"><input type="checkbox" checked={project.marketingConsent} onChange={(event) => update("marketingConsent", event.target.checked)} /><span><strong>Recevoir des nouvelles de Vendevia</strong><small>Facultatif. Ce choix ne conditionne pas la mise en relation et reste décoché par défaut.</small></span></label></div>;
  if (step === "confirmation") return <div className="completion-card"><span className="completion-mark"><UiIcon name="check" size={23} /></span><p className="form-kicker">{project.relationMode === "seul" ? "CHOIX : CONTINUER SEUL" : "CHOIX DE CONTACT PRÉPARÉ"}</p><h3>{project.relationMode === "seul" ? "Vous pouvez reprendre ce dossier à votre rythme." : "Vous avez défini la façon dont vous souhaitez être accompagné."}</h3><p>{project.relationMode === "seul" ? "Aucune coordonnée n’a été demandée ni partagée." : "Votre préférence et vos accords sont résumés ci-dessous. Dans cette démo, aucune transmission n’a eu lieu."}</p><div className="completion-receipt"><span>VOTRE PRÉFÉRENCE</span><strong>{contactModes.find((mode) => mode.id === project.relationMode)?.title ?? "À préciser"}</strong><small>{project.city ? `${project.city} · ` : ""}Projet vendeur / démonstration</small></div></div>;
  if (step === "suivi") return <div className="followup-timeline"><p className="followup-lede">Voici à quoi ressemblerait un suivi clair. Les repères ci-dessous sont une démonstration, pas un historique réel.</p><div className="followup-event"><span className="timeline-dot is-current" /><div><small>MAINTENANT · DOSSIER CRÉÉ</small><strong>Votre intention et votre rythme sont posés.</strong><p>Le dossier reste disponible sans déclencher de relance.</p></div></div><div className="followup-event"><span className="timeline-dot" /><div><small>PROCHAINE ÉTAPE · SELON VOTRE CHOIX</small><strong>{project.relationMode === "seul" ? "Revenir quand vous le souhaitez" : "Préparer une réponse adaptée"}</strong><p>{project.availability || "Votre préférence de rythme sera respectée."}</p></div></div></div>;
  return null;
}

function OptionGroup({ ariaLabel, values, selected, onChoose }: { ariaLabel: string; values: string[]; selected: string; onChoose: (value: string) => void }) {
  return <div className="journey-option-list" role="radiogroup" aria-label={ariaLabel}>{values.map((value, index) => <button type="button" role="radio" aria-checked={selected === value} className={`journey-option ${selected === value ? "is-selected" : ""}`} key={value} onClick={() => onChoose(value)}><span className="option-number">{String(index + 1).padStart(2, "0")}</span><strong>{value}</strong><span className="option-radio" /></button>)}</div>;
}

function ResultNotes({ project }: { project: MaisonProject }) {
  const known = [project.propertyType && `Un projet autour d’un ${project.propertyType.toLowerCase()}`, project.city && `Un bien situé à ${project.city}`, project.horizon && `Un horizon : ${project.horizon.toLowerCase()}`].filter(Boolean);
  const missing = [!project.surface && "La surface du bien", !project.condition && "Son état général", project.motivations.length === 0 && "Le sujet que vous souhaitez éclaircir"].filter(Boolean);
  return <div className="insight-list"><article className="insight-note"><span>01 / DÉJÀ CLAIR</span><strong>{known.length ? known.join(" · ") : "Votre projet est en train de se préciser."}</strong><p>Ces repères permettent de situer votre demande sans décider à votre place.</p></article><article className="insight-note"><span>02 / À PRÉCISER SI UTILE</span><strong>{missing.length ? missing.join(" · ") : "Vous avez posé les principaux repères du bien."}</strong><p>Les éléments inconnus peuvent attendre ou être complétés avec un professionnel.</p></article><article className="insight-note insight-next"><span>03 / PROCHAINE ÉTAPE POSSIBLE</span><strong>{project.horizon.includes("3 mois") ? "Préparer les questions à poser à un professionnel." : "Garder ces repères et avancer quand le moment vous convient."}</strong><p>Cette première lecture ne contient aucun prix ni estimation de marché.</p></article></div>;
}
