import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPage, type Section } from "@/components/vv/info-page";

type LegalPage = { title: string; updated?: string; intro?: string; sections: Section[]; draft: boolean };

const pages: Record<string, LegalPage> = {
  confidentialite: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : 14 octobre 2026",
    intro: "Votre projet de vente est une information personnelle. Voici, simplement, ce que nous en faisons.",
    draft: true,
    sections: [
      { title: "Collecte des données", body: ["Nous collectons les informations que vous saisissez : description du bien, localisation, budget, délai, disponibilités et coordonnées.", "Nous ne collectons rien dont nous n’avons pas besoin pour qualifier votre demande."] },
      { title: "Utilisation des données", body: ["Vos données servent à qualifier votre projet, à choisir des agences adaptées et à vous informer de l’avancement de votre demande."] },
      { title: "Partage des données", body: ["Vos coordonnées ne sont transmises qu’aux agences sélectionnées pour votre projet, et uniquement après votre accord explicite.", "Nous ne vendons pas vos données."] },
      { title: "Sécurité des données", body: ["Les données sont protégées par des mesures techniques et organisationnelles adaptées. Les accès sont limités aux personnes qui en ont besoin."] },
      { title: "Vos droits", body: ["Vous pouvez demander l’accès, la rectification, l’effacement ou la portabilité de vos données, et vous opposer à leur traitement, conformément au RGPD.", "Vous pouvez aussi retirer votre accord à tout moment."] },
      { title: "Contact", body: ["Pour toute question sur vos données, utilisez la page Contact."] },
    ],
  },
  "mentions-legales": {
    title: "Mentions légales",
    intro: "Informations légales relatives au site Vendevia.",
    draft: true,
    sections: [
      { title: "Éditeur du site", body: ["Raison sociale : [à compléter]", "Adresse : [à compléter] · SIREN : [à compléter]", "Directeur de la publication : [à compléter]"] },
      { title: "Hébergement", body: ["Hébergeur : [à compléter]"] },
      { title: "Propriété intellectuelle", body: ["La marque, le nom, les textes et les éléments graphiques de Vendevia sont protégés. Toute reproduction non autorisée est interdite."] },
      { title: "Responsabilité", body: ["Vendevia met tout en œuvre pour fournir des informations exactes, sans garantir l’absence d’erreur ou d’interruption du service."] },
    ],
  },
  cgv: {
    title: "Conditions générales de vente",
    intro: "Conditions applicables à l’achat de crédits par les agences.",
    draft: true,
    sections: [
      { title: "Objet", body: ["Les présentes conditions encadrent l’achat et l’utilisation de crédits sur la plateforme Vendevia."] },
      { title: "Crédits et tarifs", body: ["Un crédit donne accès à un contact vérifié, à un lead vendeur qualifié ou à un rendez-vous confirmé, selon l’offre choisie. Les tarifs sont ceux affichés sur la page Tarifs.", "Les crédits sont valables 12 mois."] },
      { title: "Paiement", body: ["Le paiement s’effectue en ligne par carte bancaire, Apple Pay ou Google Pay."] },
      { title: "Remboursement", body: ["Les crédits non utilisés sont remboursables sous 14 jours."] },
      { title: "Qualité et remplacements", body: ["Si un lead ne correspond pas aux critères annoncés, l’agence peut demander son remplacement."] },
    ],
  },
  faq: {
    title: "Questions fréquentes",
    intro: "Les réponses aux questions les plus courantes.",
    draft: false,
    sections: [
      { title: "Est-ce gratuit pour un propriétaire ?", body: ["Décrire votre projet et suivre votre demande est gratuit et sans engagement."] },
      { title: "Qui voit mes informations ?", body: ["Seules les agences sélectionnées pour votre projet, et uniquement après votre accord."] },
      { title: "Suis-je obligé de signer avec une agence ?", body: ["Non. Vous restez libre de ne donner aucune suite."] },
      { title: "Comment une agence achète-t-elle des crédits ?", body: ["Depuis la page Tarifs, à l’unité ou en pack. Les crédits sont valables 12 mois."] },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  return page ? { title: `${page.title} — Vendevia`, description: page.intro } : {};
}

export default async function LegalPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();
  return <InfoPage currentSlug={slug} draftNotice={page.draft} intro={page.intro} sections={page.sections} title={page.title} updated={page.updated} />;
}
