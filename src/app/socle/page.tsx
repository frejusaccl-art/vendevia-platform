import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const foundationRows = [
  ["Identité", "Dossier vivant", "Maison calme / Desk opératoire"],
  ["Couleur", "Tokens stricts", "Lime = action · Cobalt = donnée"],
  ["Rythme", "Une décision", "Pas de grille de KPI décorative"],
  ["Données", "Démonstration", "Historique réel à brancher au Bloc 9"],
];

export default function Home() {
  return (
    <main className="public-canvas">
      <SiteHeader />
      <section className="public-hero shell">
        <div className="hero-rail"><span>00</span><i /><span>fondations</span></div>
        <div className="public-hero-copy">
          <p className="kicker"><b /> Vendevia / nouveau produit</p>
          <h1>Le pipeline vendeur<br /><em>en mouvement.</em></h1>
          <p className="hero-lede">Une même promesse. Deux expériences pensées pour deux réalités : comprendre son projet côté propriétaire, décider vite côté agence.</p>
          <div className="hero-note"><span>Bloc 0 — socle validé</span><span className="note-rule" /><span>Mobile + desktop</span></div>
        </div>
        <aside className="hero-index"><span>V / 00</span><strong>2</strong><p>mondes<br />coordonnés</p></aside>
      </section>

      <section className="worlds shell" aria-labelledby="worlds-title">
        <div className="section-intro"><p className="kicker">01 / Deux entrées, pas une interface clonée</p><h2 id="worlds-title">À qui parle-t-on<br /><em>ici, maintenant ?</em></h2></div>
        <div className="worlds-layout">
          <Link className="world-entry maison-entry" href="/maison">
            <div className="entry-top"><span className="entry-number">01</span><span className="entry-audience">propriétaires vendeurs</span></div>
            <div className="entry-body"><span className="entry-overline">Vendevia Maison</span><h3>Un dossier personnel<br /><em>pour avancer sans pression.</em></h3><p>Comprendre son bien, son rythme et ses prochaines étapes sans être capturé par un formulaire.</p></div>
            <div className="entry-bottom"><span>Voir le socle Maison</span><span className="arrow">↗</span></div>
          </Link>
          <Link className="world-entry desk-entry" href="/desk">
            <div className="entry-top"><span className="entry-number">02</span><span className="entry-audience">agences immobilières</span></div>
            <div className="entry-body"><span className="entry-overline">Vendevia Desk</span><h3>Une salle de pilotage<br /><em>qui sait quoi faire.</em></h3><p>Prioriser les opportunités, ouvrir le bon dossier et relier chaque action au mandat.</p></div>
            <div className="entry-bottom"><span>Voir le socle Desk</span><span className="arrow">↗</span></div>
          </Link>
        </div>
      </section>

      <section className="foundation shell" aria-labelledby="foundation-title">
        <div className="foundation-heading"><p className="kicker">02 / Règles de construction</p><h2 id="foundation-title">Une signature avant<br /><em>une accumulation.</em></h2><p>Les éléments ci-dessous sont les garde-fous du nouveau produit. Ils remplacent les conventions d’un SaaS générique.</p></div>
        <div className="foundation-table" role="table" aria-label="Fondations du design Vendevia">
          {foundationRows.map(([label, value, detail]) => <div className="foundation-row" role="row" key={label}><span role="cell">{label}</span><strong role="cell">{value}</strong><span role="cell">{detail}</span></div>)}
        </div>
      </section>

      <footer className="public-footer shell"><span>Vendevia / Prototype indépendant</span><span>Bloc suivant : entrée propriétaire</span></footer>
    </main>
  );
}
