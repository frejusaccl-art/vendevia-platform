import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const queue = [
  { name: "Sophie Marchand", action: "Premier contact", reason: "Disponible aujourd’hui · 12 min", tone: "lime" },
  { name: "Dossier Martin", action: "Rendez-vous à confirmer", reason: "Demain · 10:30 · Paris 11e", tone: "cobalt" },
  { name: "Maison Rivoli", action: "Pièce à vérifier", reason: "Attestation manquante · 2 jours", tone: "terra" },
];

export default function DeskPage() {
  return (
    <main className="experience desk-surface">
      <SiteHeader active="desk" />
      <div className="desk-shell">
        <div className="desk-context motion-reveal"><p className="kicker"><b /> Vendevia Desk / lundi 14 juin</p><h1>Les opportunités qui<br /><em>méritent une action aujourd’hui.</em></h1><p>Votre zone, votre équipe, votre prochaine décision.</p></div>
        <section className="attention-queue motion-reveal motion-delay-1" aria-labelledby="queue-title"><div className="queue-heading"><div><span className="mono-label">01 / priorité opérationnelle</span><h2 id="queue-title">À faire maintenant</h2></div><span className="queue-count">03</span></div><div className="queue-list">{queue.map((item, index) => <article className="queue-item" key={item.name}><span className="queue-index">0{index + 1}</span><div className="queue-copy"><span className={`queue-status ${item.tone}`}>{item.action}</span><strong>{item.name}</strong><p>{item.reason}</p></div><button className="queue-action" type="button">Ouvrir <span>→</span></button></article>)}</div></section>
        <section className="desk-foundation-grid"><div className="desk-sheet"><span className="mono-label">02 / dossier actif</span><h2>Un dossier ouvert<br /><em>à côté du flux.</em></h2><p>La fiche Projet Vendeur prendra ici la forme d’une feuille de travail : contexte, prochaine action, historique, consentement et résultat.</p><Link href="/desk" className="text-button">Explorer la structure <span>↗</span></Link></div><div className="pipeline-preview"><span className="mono-label">03 / progression commerciale</span><div className="pipeline-line"><span>Nouveau</span><span>Contact</span><span>Rendez-vous</span><span>Mandat</span></div><p>Chaque étape dira ce qui vient d’arriver, ce qui avance et ce qui produit du mandat.</p></div></section>
      </div>
      <div className="desk-footer"><span>Desk / table de pilotage</span><span>Donnée de démonstration — historique réel à remplacer.</span></div>
    </main>
  );
}
