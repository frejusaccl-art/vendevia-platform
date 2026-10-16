import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "@/components/vv/info-page";

export const metadata: Metadata = {
  title: "Contact — Vendevia",
  description: "Une question sur Vendevia ? Consultez la FAQ ou décrivez votre projet.",
};

export default function ContactPage() {
  return (
    <InfoPage active="contact" title="Nous contacter" intro="Le formulaire de contact arrive bientôt. En attendant, voici les chemins les plus rapides.">
      <div className="vv-hero-cta">
        <Link className="vv-btn vv-btn--primary" href="/legal/faq">Lire la FAQ</Link>
        <Link className="vv-btn vv-btn--outline" href="/proprietaire/projet">Décrire mon projet</Link>
      </div>
    </InfoPage>
  );
}
