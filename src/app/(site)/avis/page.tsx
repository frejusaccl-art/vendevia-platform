import type { Metadata } from "next";
import Link from "next/link";
import { VvFooter, VvHeader } from "@/components/vv/chrome";
import { ReviewsBoard } from "@/components/vv/reviews";

export const metadata: Metadata = {
  title: "Avis — Vendevia",
  description: "Les avis des propriétaires et des agences sur Vendevia, et la possibilité de donner le vôtre.",
};

export default function AvisPage() {
  return (
    <main>
      <VvHeader />
      <section className="vv-avis" aria-labelledby="avis-title">
        <p className="vv-eyebrow">Avis et témoignages</p>
        <h1 className="vv-section-title" id="avis-title" style={{ marginBottom: 12 }}>Ce que disent les propriétaires et les agences</h1>
        <p className="vv-muted" style={{ marginBottom: 30, maxWidth: 640 }}>Chaque avis est publié avec le prénom de son auteur. Vous avez utilisé Vendevia ? Votre retour aide les prochains à choisir en confiance.</p>
        <p className="vv-muted" style={{ fontSize: 12.5, marginBottom: 22, maxWidth: 640 }}>Les avis sont relus avant publication, ne sont pas vérifiés comme issus d’une expérience de consommation et ne donnent lieu à aucune contrepartie. <Link className="vv-link" href="/legal/cgu">Voir les règles de publication</Link>.</p>
        <ReviewsBoard />
      </section>
      <VvFooter />
    </main>
  );
}
