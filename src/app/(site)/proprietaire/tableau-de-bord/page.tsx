import type { Metadata } from "next";
import Link from "next/link";
import { AppShell, type SideItem, type TabItem } from "@/components/vv/app-shell";
import { Icon } from "@/components/vv/icons";
import { ReviewNudge } from "@/components/vv/reviews";

export const metadata: Metadata = {
  title: "Mon espace — Vendevia",
  description: "Suivez l’avancement de votre projet de vente, votre agence et vos prochains rendez-vous.",
};

const base = "/proprietaire/tableau-de-bord";

const items: SideItem[] = [
  { label: "Tableau de bord", icon: "grid", href: base, current: true },
  { label: "Mon projet", icon: "home", href: "#projet" },
  { label: "Mes informations", icon: "user", href: "/proprietaire/projet" },
  { label: "Suivi de ma demande", icon: "chart", href: "#suivi" },
  { label: "Mes rendez-vous", icon: "calendar", href: "#rdv" },
  { label: "Mes messages", icon: "message" },
  { label: "Aide", icon: "help", href: "/legal/faq" },
];

const tabs: TabItem[] = [
  { label: "Accueil", icon: "grid", href: base, current: true },
  { label: "Projet", icon: "home", href: "#projet" },
  { label: "Rendez-vous", icon: "calendar", href: "#rdv" },
  { label: "Aide", icon: "help", href: "/legal/faq" },
];

const progress = [
  { label: "Projet créé", date: "12 oct.", state: "done" },
  { label: "Qualifié", date: "13 oct.", state: "done" },
  { label: "En sélection", date: "14 oct.", state: "current" },
  { label: "Rendez-vous", date: "19 oct.", state: "todo" },
] as const;

export default function OwnerDashboardPage() {
  return (
    <AppShell
      items={items}
      tabs={tabs}
      topLinks={[{ label: "Mon projet", href: "#projet" }, { label: "Suivi", href: "#suivi" }]}
      user={{ name: "Sophie L.", role: "Propriétaire", initials: "SL" }}
    >
      <main id="top">
        <div className="vv-greet">
          <h1>Bonjour, Sophie&nbsp;!</h1>
          <p>Voici l’état de votre demande.</p>
        </div>

        <section aria-labelledby="suivi-title" className="vv-panel" id="suivi">
          <div className="vv-panel-head"><h2 id="suivi-title">Suivi de ma demande</h2></div>
          <ol className="vv-progress">
            {progress.map((p) => (
              <li className={p.state} key={p.label}>
                <span className="dot">{p.state === "done" && <Icon name="check" size={14} />}</span>
                <strong>{p.label}</strong>
                <span>{p.date}</span>
              </li>
            ))}
          </ol>
        </section>

        <ReviewNudge role="proprietaire" />

        <div className="vv-owner-grid">
          <section aria-labelledby="projet-title" className="vv-panel" id="projet">
            <div className="vv-panel-head">
              <h2 id="projet-title">Mon projet</h2>
              <Link href="/proprietaire/projet">Modifier</Link>
            </div>
            <div className="vv-kv">
              <strong>Maison · 400 000 €</strong>
              <span className="vv-muted">Île-de-France · à vendre dans les 3 mois</span>
            </div>
          </section>

          <section aria-labelledby="agence-title" className="vv-panel">
            <div className="vv-panel-head"><h2 id="agence-title">Votre agence</h2></div>
            <div className="vv-person">
              <span className="vv-avatar">AH</span>
              <div>
                <strong>Agence Horizon</strong>
                <span>Responsable : Mme Lambert</span>
              </div>
              <Link className="vv-btn vv-btn--outline vv-btn--sm" href="/contact" style={{ marginLeft: "auto" }}>Contacter</Link>
            </div>
          </section>
        </div>

        <section aria-labelledby="rdv-title" className="vv-panel" id="rdv" style={{ marginTop: 18 }}>
          <div className="vv-panel-head"><h2 id="rdv-title">Prochain rendez-vous</h2></div>
          <ul className="vv-agenda" style={{ marginTop: 0 }}>
            <li>
              <span className="time">19 oct. · 14:00</span>
              <div><strong>Visite · Maison</strong><span className="sub">Saint-Germain</span></div>
            </li>
          </ul>
        </section>
        <p className="vv-demo-note" style={{ marginTop: 18 }}>Données de démonstration : cet espace n’est pas encore relié à un compte réel.</p>
      </main>
    </AppShell>
  );
}
