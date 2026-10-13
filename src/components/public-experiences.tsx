import Link from "next/link";
import { ArchitecturalSketch } from "./architectural-sketch";
import { DemoNotice } from "./demo-notice";
import { DemoRequestForm } from "./demo-request-form";
import { PublicFooter } from "./public-footer";
import { SiteHeader } from "./site-header";
import { UiIcon } from "./ui-icon";

export function HomeLanding() {
  return (
    <main className="public-page home-page">
      <SiteHeader />
      <section className="home-hero page-gutter">
        <div className="home-hero-copy">
          <p className="eyebrow"><span className="eyebrow-rule" /> Vendevia · le projet vendeur, mieux suivi</p>
          <h1>Avant de vendre,<br /><em>comprenez votre projet.</em></h1>
          <p className="home-hero-lede">Une première lecture de votre bien, des prochaines étapes claires et la liberté de choisir si vous souhaitez être accompagné.</p>
          <div className="home-actions">
            <Link className="button button-primary" href="/maison">Je prépare un projet <UiIcon name="arrow" /></Link>
            <Link className="button button-quiet" href="/agences">Je pilote une agence <UiIcon name="arrow" /></Link>
          </div>
          <div className="home-reassurance"><span><UiIcon name="clock" size={16} /> Environ 4 minutes</span><span><UiIcon name="shield" size={16} /> Aucun contact automatique</span></div>
        </div>
        <div className="home-hero-visual" aria-label="Extrait du dossier Vendevia">
          <div className="visual-coordinate">DOSSIER · V / 01</div>
          <ArchitecturalSketch />
          <div className="blueprint-note"><span className="note-index">01</span><span>Une première lecture<br />avant la prochaine décision.</span><UiIcon name="arrow" size={17} /></div>
          <div className="visual-side-label">MAISON / PROJET VENDEUR</div>
        </div>
      </section>

      <section className="audience-section page-gutter" aria-labelledby="audience-title">
        <div className="section-heading-row"><div><p className="eyebrow">Deux expériences · une même exigence</p><h2 id="audience-title">Vous êtes propriétaire<br />ou professionnel ?</h2></div><p>Le projet reste au centre. L’expérience s’adapte à la personne qui doit agir.</p></div>
        <div className="audience-grid">
          <Link href="/maison" className="audience-panel audience-owner">
            <div className="audience-panel-top"><span>01 / MAISON</span><span>Pour les propriétaires</span></div>
            <div className="audience-panel-content"><div className="mini-plan"><ArchitecturalSketch variant="facade" /></div><h3>Votre projet avance<br /><em>à votre rythme.</em></h3><p>Clarifiez votre situation sans vous engager à vendre ni à être rappelé.</p></div>
            <span className="panel-link">Faire le point sur mon projet <UiIcon name="arrow" /></span>
          </Link>
          <Link href="/agences" className="audience-panel audience-agency">
            <div className="audience-panel-top"><span>02 / DESK</span><span>Pour les agences</span></div>
            <div className="audience-panel-content"><div className="mini-ledger"><span>À FAIRE MAINTENANT</span><i /><i /><i /><strong>Une prochaine action.<br />Jamais un dossier perdu.</strong></div><h3>Votre acquisition<br /><em>devient lisible.</em></h3><p>De l’intention du propriétaire au rendez-vous, puis au mandat : chaque étape a son contexte.</p></div>
            <span className="panel-link">Découvrir Vendevia Desk <UiIcon name="arrow" /></span>
          </Link>
        </div>
      </section>

      <section className="method-section page-gutter">
        <div className="method-intro"><p className="eyebrow">Une méthode qui respecte le projet</p><h2>Moins de formulaires.<br /><em>Plus de clarté.</em></h2><p>Vendevia organise l’information utile sans demander au propriétaire de tout savoir dès le départ.</p><Link className="inline-link" href="/comment-ca-marche">Voir comment ça marche <UiIcon name="arrow" size={16} /></Link></div>
        <ol className="method-list"><li><span>01</span><div><strong>Comprendre</strong><p>Le bien, le moment et ce qui compte pour son propriétaire.</p></div><span className="method-state">Sans pression</span></li><li><span>02</span><div><strong>Éclairer</strong><p>Ce qui est déjà clair, ce qui manque et ce qui peut attendre.</p></div><span className="method-state">Une lecture utile</span></li><li><span>03</span><div><strong>Choisir</strong><p>Continuer seul, demander un avis ou organiser un échange.</p></div><span className="method-state">À son rythme</span></li></ol>
      </section>

      <section className="public-promise-band page-gutter"><div><p className="eyebrow">La promesse Vendevia</p><h2>Un projet vendeur<br /><em>ne devrait jamais disparaître.</em></h2></div><p>Une intention devient un dossier compréhensible. Un dossier devient une prochaine action explicable. Et chaque échange reste choisi.</p><Link className="button button-lime" href="/maison">Commencer sans décider <UiIcon name="arrow" /></Link></section>
      <PublicFooter />
    </main>
  );
}

export function MaisonLanding() {
  return (
    <main className="public-page maison-landing">
      <SiteHeader active="maison" />
      <section className="maison-landing-hero page-gutter">
        <div className="maison-landing-copy">
          <p className="eyebrow"><span className="eyebrow-rule" /> Vendevia Maison · un dossier à votre rythme</p>
          <h1>Vous n’avez pas besoin<br />d’avoir décidé pour<br /><em>commencer à comprendre.</em></h1>
          <p className="home-hero-lede">Faites le point sur votre bien, votre calendrier et les prochaines étapes possibles. Vous choisirez ensuite si vous souhaitez parler à un professionnel.</p>
          <Link className="button button-primary" href="/maison/projet/intention">Faire le point sur mon projet <UiIcon name="arrow" /></Link>
          <Link className="quiet-underlink" href="/estimation">Je veux seulement comprendre la valeur de mon bien <UiIcon name="arrow" size={15} /></Link>
          <div className="maison-promise"><UiIcon name="shield" size={18} /><span><strong>Vous gardez la main.</strong><small>Aucun contact automatique. Le choix d’échanger vient après.</small></span></div>
        </div>
        <div className="maison-paper" aria-label="Exemple du dossier vivant Vendevia">
          <div className="paper-head"><span>VENDEVIA MAISON / DOSSIER 01</span><span>EXEMPLE</span></div>
          <div className="paper-plan"><ArchitecturalSketch variant="facade" /><span className="paper-annotation">une maison,<br />une histoire,<br />un prochain pas.</span></div>
          <div className="paper-address"><span>REPÈRE DU BIEN</span><strong>Une première lecture, pas une expertise.</strong><small>Le contexte se construit avec vous, question après question.</small></div>
          <div className="paper-progress"><span>Intention</span><i className="complete" /><span>Bien</span><i /><span>Rythme</span><i /></div>
          <span className="paper-foot">Dossier de démonstration · aucune donnée réelle</span>
        </div>
      </section>
      <section className="maison-steps page-gutter"><div className="section-heading-row"><div><p className="eyebrow">Un chemin court et expliqué</p><h2>Une question à la fois.</h2></div><p>Environ quatre minutes pour poser les premiers repères. Vous pouvez revenir en arrière à tout moment.</p></div><div className="step-columns"><article><span>01</span><h3>Votre projet</h3><p>Ce qui vous amène, même si vous n’avez pas de date.</p></article><article><span>02</span><h3>Votre bien</h3><p>Un lieu et quelques caractéristiques utiles, sans dossier complet.</p></article><article><span>03</span><h3>Votre rythme</h3><p>La suite s’adapte au moment où vous pouvez avancer.</p></article><article><span>04</span><h3>Votre choix</h3><p>Continuer seul ou demander une conversation, si vous le souhaitez.</p></article></div></section>
      <section className="quiet-cta page-gutter"><div><p className="eyebrow">Le premier pas reste le vôtre</p><h2>Commencez par<br /><em>faire le point.</em></h2></div><Link className="button button-primary" href="/maison/projet/intention">Commencer mon analyse <UiIcon name="arrow" /></Link></section>
      <PublicFooter />
    </main>
  );
}

export type MarketingPageKind = "agency" | "how" | "pricing" | "zones" | "valuation" | "faq" | "contact" | "legal" | "privacy" | "terms";

const marketingCopy: Record<MarketingPageKind, { kicker: string; title: string; intro: string }> = {
  agency: { kicker: "Vendevia Desk · pour les agences", title: "Chaque projet vendeur mérite une prochaine action.", intro: "Attirez, qualifiez et accompagnez les projets vendeurs avec une visibilité complète — du premier clic au rendez-vous, puis au mandat." },
  how: { kicker: "La méthode Vendevia", title: "De l’intention à la prochaine étape.", intro: "Un parcours lisible pour le propriétaire. Un dossier actionnable pour l’agence. Une relation qui ne commence jamais par une transmission silencieuse." },
  pricing: { kicker: "Offres agence · phase pilote", title: "Une tarification qui suit votre façon de travailler.", intro: "Les offres se construisent autour de votre territoire, de votre capacité et des résultats que vous souhaitez piloter. Aucun tarif public n’est encore confirmé." },
  zones: { kicker: "Déploiement local", title: "Une expérience pensée pour le terrain.", intro: "Vendevia ouvre ses zones avec des agences pilotes. Indiquez votre code postal pour préparer une vérification — cette démo ne consulte pas une couverture réelle." },
  valuation: { kicker: "Première lecture du bien", title: "Une estimation automatique ne raconte pas toute l’histoire.", intro: "Le contexte, l’état du bien et votre calendrier comptent. Vendevia commence par les comprendre avant de proposer une prochaine étape." },
  faq: { kicker: "Questions fréquentes", title: "Des réponses avant de commencer.", intro: "Le fonctionnement, les données et la mise en relation : tout doit être clair avant votre premier pas." },
  contact: { kicker: "Nous écrire", title: "Parlons de votre projet.", intro: "Propriétaire, agence ou partenaire local : dites-nous ce que vous cherchez à éclaircir." },
  legal: { kicker: "Informations juridiques", title: "Mentions légales à compléter avant ouverture commerciale.", intro: "Cette version de présentation ne constitue pas un document juridique final. Les coordonnées de l’éditeur et les informations d’immatriculation doivent être renseignées et vérifiées par Vendevia." },
  privacy: { kicker: "Données & confidentialité", title: "La confiance commence par le contrôle.", intro: "Le parcours est conçu pour séparer la demande d’information, la mise en relation et la prospection. Cette page décrit les principes de la démo, pas encore une politique juridique publiée." },
  terms: { kicker: "Conditions d’utilisation", title: "Conditions générales à valider avant lancement.", intro: "Les conditions contractuelles doivent être rédigées avec les informations exactes de l’éditeur, des offres et des responsabilités avant tout usage commercial." },
};

const faqs = [
  ["Dois-je avoir décidé de vendre ?", "Non. Vous pouvez commencer simplement pour clarifier votre situation. Le parcours ne déclenche aucun contact automatique."],
  ["Une estimation est-elle garantie ?", "Non. Une première indication n’est pas une expertise définitive. La valeur d’un bien dépend de son état, de son emplacement, du marché et d’une visite."],
  ["Mes réponses sont-elles envoyées à une agence ?", "Pas dans cette version de démonstration. Dans le produit final, une transmission ne devrait intervenir qu’après un choix explicite et affiché."],
  ["Comment une agence reçoit-elle un projet ?", "Le modèle prévoit une attribution expliquable selon la zone, le type de bien, la spécialité, la disponibilité et la capacité. Cette démo n’effectue aucune attribution réelle."],
  ["Vendevia garantit-il un mandat ?", "Non. Vendevia organise et rend visible le suivi des projets vendeurs. La décision de vendre et la signature d’un mandat restent celles du propriétaire et de l’agence."],
];

export function MarketingPage({ page }: { page: MarketingPageKind }) {
  const copy = marketingCopy[page];
  const active = page === "agency" ? "agences" : page === "pricing" ? "pricing" : page === "how" ? "how" : undefined;
  const isLegal = ["legal", "privacy", "terms"].includes(page);
  return (
    <main className={`public-page marketing-page marketing-${page}`}>
      <SiteHeader active={active} />
      <section className="marketing-hero page-gutter">
        <div className="marketing-copy"><p className="eyebrow"><span className="eyebrow-rule" /> {copy.kicker}</p><h1>{copy.title}</h1><p className="marketing-lede">{copy.intro}</p>
          {page === "agency" && <div className="home-actions"><Link className="button button-lime" href="/comment-ca-marche">Voir comment ça fonctionne <UiIcon name="arrow" /></Link><Link className="button button-quiet" href="/zones">Rejoindre une zone pilote <UiIcon name="arrow" /></Link></div>}
          {page === "valuation" && <Link className="button button-primary" href="/maison/projet/intention">Commencer mon analyse <UiIcon name="arrow" /></Link>}
          {page === "pricing" && <Link className="button button-primary" href="/contact">Parler de mon agence <UiIcon name="arrow" /></Link>}
          {page === "contact" && <DemoRequestForm />}
          {page === "zones" && <DemoRequestForm mode="zone" />}
          {page === "legal" && <DemoNotice />}
          {page === "privacy" && <DemoNotice />}
          {page === "terms" && <DemoNotice />}
        </div>
        {page === "agency" ? <AgencyPreview /> : page === "valuation" ? <div className="valuation-sheet"><div className="paper-head"><span>V / 01 · LECTURE DU BIEN</span><UiIcon name="house" /></div><ArchitecturalSketch /><div className="valuation-caption"><span>Une valeur se comprend.</span><strong>Elle ne se devine pas.</strong><small>La première lecture tient compte de votre projet, pas seulement d’une adresse.</small></div></div> : <div className="marketing-visual"><div className="visual-grid-lines" /><ArchitecturalSketch variant="facade" /><div className="visual-caption"><span>VENDEVIA / PROJET VENDEUR</span><strong>Une intention.<br />Un dossier clair.<br />Une prochaine étape.</strong></div></div>}
      </section>

      {page === "agency" && <AgencyBenefits />}
      {page === "how" && <HowItWorks />}
      {page === "pricing" && <PricingSection />}
      {page === "zones" && <section className="plain-info-section page-gutter"><p className="eyebrow">Comment se construit une zone</p><h2>Une couverture annoncée<br /><em>doit être vérifiable.</em></h2><p>Vendevia n’affiche pas de carte de couverture fictive. Une zone pilote est préparée avec les agences participantes, leur spécialité, leur capacité et leurs horaires.</p></section>}
      {page === "valuation" && <section className="plain-info-section page-gutter"><p className="eyebrow">Une lecture utile, sans promesse magique</p><h2>Ce qui influence la valeur<br /><em>et la suite du projet.</em></h2><div className="factor-list"><span>Emplacement et contexte local</span><span>Type, surface et état du bien</span><span>Votre calendrier et vos priorités</span><span>Les références de marché à vérifier avec un professionnel</span></div></section>}
      {page === "faq" && <section className="faq-section page-gutter"><div><p className="eyebrow">Avant de commencer</p><h2>Ce qui doit être clair.</h2><p>La démo vous permet d’explorer les écrans. Elle ne transmet ni coordonnées ni projet.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<UiIcon name="plus" size={18} /></summary><p>{answer}</p></details>)}</div></section>}
      {isLegal && <section className="legal-content page-gutter"><h2>Principes de présentation</h2><p>Les informations de cette page sont des éléments de maquette et ne remplacent pas des mentions légales, une politique de confidentialité ou des conditions générales validées. Avant une mise en service, Vendevia devra renseigner les données exactes de l’éditeur, définir les durées de conservation et documenter les traitements et droits applicables.</p><h3>Dans cette démo</h3><p>Les formulaires ne sont pas reliés à un service externe. Les réponses du parcours restent dans la mémoire de la page pendant la navigation et ne sont ni enregistrées sur un serveur ni transmises à une agence.</p><Link className="inline-link" href="/contact">Contacter l’équipe <UiIcon name="arrow" size={16} /></Link></section>}
      {(page === "contact" || page === "zones") && <section className="plain-info-section page-gutter"><p className="eyebrow">Sans données inventées</p><h2>Cette demande est une démonstration.</h2><p>Le formulaire montre le parcours attendu. Il ne réserve pas une zone, n’ouvre pas de compte et n’envoie pas de message.</p></section>}
      <PublicFooter />
    </main>
  );
}

function AgencyPreview() {
  return <div className="agency-preview" aria-label="Aperçu de l’espace agence Vendevia"><div className="preview-top"><span>VENDEVIA DESK / DÉMO</span><span>AUJOURD’HUI</span></div><div className="preview-title">À faire maintenant <strong>03</strong></div><div className="preview-row"><span>01</span><div><small>PREMIER CONTACT · AUJOURD’HUI</small><strong>Sophie M. · Bordeaux</strong><p>Elle souhaite une première lecture de son projet.</p></div><button type="button" aria-label="Aperçu de la prochaine action"><UiIcon name="arrow" size={16} /></button></div><div className="preview-row"><span>02</span><div><small>RENDEZ-VOUS · DEMAIN</small><strong>Confirmer l’horaire</strong><p>Créneau proposé · 10 h 30</p></div><button type="button" aria-label="Aperçu de la prochaine action"><UiIcon name="arrow" size={16} /></button></div><div className="preview-bottom"><span>LE DOSSIER RESTE ATTACHÉ À L’ACTION.</span><Link href="/desk">Explorer le Desk <UiIcon name="arrow" size={15} /></Link></div></div>;
}

function AgencyBenefits() {
  return <section className="benefits-section page-gutter"><div className="section-heading-row"><div><p className="eyebrow">L’agence voit la suite, pas seulement l’entrée</p><h2>Le contexte fait<br /><em>la différence.</em></h2></div><p>Chaque indicateur existe pour expliquer une action, un délai ou un résultat — jamais pour décorer le dashboard.</p></div><div className="benefit-rows"><article><span>01</span><div><h3>À faire maintenant</h3><p>Une file d’actions justifiée : qui appeler, pourquoi aujourd’hui et ce qui risque de se perdre.</p></div><UiIcon name="arrow" /></article><article><span>02</span><div><h3>Le dossier vendeur</h3><p>Intention, bien, rythme, préférence de contact et consentement réunis dans la même lecture.</p></div><UiIcon name="arrow" /></article><article><span>03</span><div><h3>De la source au mandat</h3><p>Reliez acquisition, rendez-vous et mandat pour comprendre ce que produit votre budget.</p></div><UiIcon name="arrow" /></article></div><div className="pilot-callout"><div><span className="eyebrow">Une zone, une équipe, une méthode</span><h2>Construisons le pilote<br /><em>avec votre réalité.</em></h2></div><Link className="button button-lime" href="/zones">Vérifier une zone pilote <UiIcon name="arrow" /></Link></div></section>;
}

function HowItWorks() {
  return <section className="how-section page-gutter"><div className="section-heading-row"><div><p className="eyebrow">Le dossier vivant</p><h2>De l’intention<br /><em>au mandat signé.</em></h2></div><p>Deux expériences distinctes se relient autour d’un Projet Vendeur commun. Le propriétaire garde le contrôle. L’agence sait quoi faire ensuite.</p></div><div className="process-track">{[["01","Le propriétaire se situe","Intention, lieu, type de bien et rythme."],["02","Le projet s’éclaire","Les éléments connus, manquants et utiles sont restitués."],["03","La suite est choisie","Avis, rappel, rendez-vous ou poursuite en autonomie."],["04","L’agence agit","La prochaine action, son motif et son résultat restent visibles."]].map(([number,title,detail])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{detail}</p><i /></article>)}</div><DemoNotice /></section>;
}

function PricingSection() {
  return <section className="pricing-section page-gutter"><div className="section-heading-row"><div><p className="eyebrow">Des offres à construire avec les pilotes</p><h2>Pas de tarif<br /><em>inventé.</em></h2></div><p>Les montants, quotas et conditions ne sont pas encore confirmés dans le document maître. La démo ne présente donc aucun prix fictif.</p></div><div className="pricing-ledger"><article><span>01 / BASE</span><h3>Le socle de pilotage</h3><p>Projet vendeur, file d’actions, suivi des étapes et visibilité des préférences.</p><Link href="/contact">Parler de l’offre <UiIcon name="arrow" size={16} /></Link></article><article><span>02 / ACQUISITION</span><h3>La zone en mouvement</h3><p>Lecture des sources, gestion des capacités et suivi des rendez-vous.</p><Link href="/contact">Parler de l’offre <UiIcon name="arrow" size={16} /></Link></article><article><span>03 / PERFORMANCE</span><h3>Le résultat mesurable</h3><p>Coûts par projet, rendez-vous et mandat, avec périodes et définitions.</p><Link href="/contact">Parler de l’offre <UiIcon name="arrow" size={16} /></Link></article></div><p className="pricing-note"><UiIcon name="shield" size={17} /> La tarification finale devra préciser la capacité, la période, les options, les crédits et les règles de pause.</p></section>;
}
