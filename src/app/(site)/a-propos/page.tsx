import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/vv/info-page";

export const metadata: Metadata = {
  title: "À propos — Vendevia",
  description: "Vendevia met en relation des propriétaires et des agences immobilières pour des rendez-vous qualifiés.",
};

export default function AboutPage() {
  return (
    <InfoPage active="about" title="Des rendez-vous immobiliers qualifiés">
      <p style={{ marginBottom: 14 }}>Vendevia accompagne les propriétaires dans leur projet de vente et les met en relation avec des agences immobilières sélectionnées, prêtes à les accompagner.</p>
      <p style={{ marginBottom: 22 }}>Pour les agences, chaque contact est qualifié : un projet clair, des critères précis, et un rendez-vous quand le propriétaire est prêt.</p>
      <div className="vv-hero-cta">
        <Link className="vv-btn vv-btn--primary" href="/proprietaire/projet">Décrire mon projet</Link>
        <Link className="vv-btn vv-btn--outline" href="/tarifs">Voir les tarifs</Link>
      </div>
    </InfoPage>
  );
}
