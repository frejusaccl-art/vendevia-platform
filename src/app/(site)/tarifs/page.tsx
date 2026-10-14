import type { Metadata } from "next";
import Link from "next/link";
import { VvFooter, VvHeader } from "@/components/vv/chrome";
import { Icon, type IconName } from "@/components/vv/icons";

export const metadata: Metadata = {
  title: "Tarifs — Vendevia",
  description: "Des offres claires et sans surprise pour les agences : contact vérifié, lead vendeur qualifié, rendez-vous confirmé, et packs de crédits.",
};

const LEAD_PRICE = 35;

const offers = [
  { name: "Contact vérifié", price: 15, features: ["Contact téléphonique vérifié", "Informations de base", "Accès 7 jours"], featured: false },
  { name: "Lead vendeur qualifié", price: 35, features: ["Projet confirmé", "Critères détaillés", "Accès 30 jours"], featured: true },
  { name: "Rendez-vous confirmé", price: 79, features: ["Rendez-vous planifié", "Agent disponible", "Accès 30 jours"], featured: false },
];

const packs = [
  { name: "Pack 5", price: 165, credits: 5 },
  { name: "Pack 10", price: 310, credits: 10 },
  { name: "Pack 20", price: 590, credits: 20 },
].map((p) => ({ ...p, saving: Math.round((1 - p.price / (p.credits * LEAD_PRICE)) * 100) }));

const assurances: { icon: IconName; title: string; text: string }[] = [
  { icon: "lock", title: "Paiement sécurisé", text: "CB, Apple Pay, Google Pay" },
  { icon: "card", title: "Crédits uniques", text: "Valables 12 mois" },
  { icon: "refresh", title: "Remboursement sous 14 jours", text: "Si non utilisé" },
  { icon: "headset", title: "Support dédié", text: "7j/7" },
];

export default function PricingPage() {
  return (
    <main>
      <VvHeader active="pricing" />
      <div className="vv-pricing-head">
        <p className="vv-eyebrow">Tarifs</p>
        <h1>Des offres claires et sans surprise</h1>
        <p>Choisissez l’offre qui correspond à vos besoins. Tous nos tarifs incluent l’accès à la plateforme, le suivi des leads et un accompagnement de qualité.</p>
      </div>

      <section aria-label="Offres à l’unité" className="vv-wrap">
        <div className="vv-plans">
          {offers.map((offer) => (
            <article className={`vv-plan${offer.featured ? " vv-plan--featured" : ""}`} key={offer.name}>
              {offer.featured && <span className="vv-tag">Le plus choisi</span>}
              <h3>{offer.name}</h3>
              <p className="price">{offer.price}&nbsp;€ <small>/ 1 crédit</small></p>
              <ul>
                {offer.features.map((f) => (
                  <li key={f}><Icon name="check" size={15} /> {f}</li>
                ))}
              </ul>
              <Link className="vv-btn vv-btn--primary" href="/connexion">Acheter</Link>
            </article>
          ))}
        </div>

        <div className="vv-plans" role="list" aria-label="Packs de crédits">
          {packs.map((pack) => (
            <article className="vv-plan" key={pack.name} role="listitem">
              <h3>{pack.name}</h3>
              <p className="price">{pack.price}&nbsp;€ <small>({pack.credits} crédits)</small></p>
              <span className="vv-tag">Économisez {pack.saving}&nbsp;%</span>
              <Link className="vv-btn vv-btn--primary" href="/connexion">Acheter</Link>
            </article>
          ))}
        </div>

        <div className="vv-assurances">
          {assurances.map((a) => (
            <div className="vv-assurance" key={a.title}>
              <Icon name={a.icon} size={24} />
              <div><strong>{a.title}</strong><span>{a.text}</span></div>
            </div>
          ))}
        </div>
      </section>

      <VvFooter />
    </main>
  );
}
