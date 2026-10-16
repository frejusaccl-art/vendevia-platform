import type { Metadata } from "next";
import Link from "next/link";
import { VvFooter, VvHeader } from "@/components/vv/chrome";
import { Icon, type IconName } from "@/components/vv/icons";
import { CREDIT_VALUE_EUR, offers, packs } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Tarifs — Vendevia",
  description: "Des offres claires et sans surprise pour les agences : contact vérifié, lead vendeur qualifié, rendez-vous confirmé, et packs de crédits.",
};

const assurances: { icon: IconName; title: string; text: string }[] = [
  { icon: "lock", title: "Paiement sécurisé", text: "CB, Apple Pay, Google Pay" },
  { icon: "card", title: "1 crédit = 1 € HT", text: "Valables 12 mois" },
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
        <p>Un seul crédit, une seule valeur : 1 crédit = 1 € HT. Chaque service consomme un nombre de crédits, et les packs en offrent davantage. Prix hors taxes (TVA en sus), accès à la plateforme et suivi des leads inclus.</p>
      </div>

      <section aria-label="Offres à l’unité" className="vv-wrap">
        <div className="vv-plans">
          {offers.map((offer, idx) => (
            <article className={`vv-plan${offer.featured ? " vv-plan--featured" : ""}`} key={offer.name}>
              {offer.featured && <span className="vv-tag">Le plus choisi</span>}
              <h3>{offer.name}</h3>
              <p className="price">{offer.credits}&nbsp;crédits <small>= {offer.credits * CREDIT_VALUE_EUR}&nbsp;€ HT</small></p>
              <ul>
                {offer.features.map((f) => (
                  <li key={f}><Icon name="check" size={15} /> {f}</li>
                ))}
              </ul>
              <Link className="vv-btn vv-btn--primary" href={`/agence/acheter?produit=offre-${idx}`}>Acheter</Link>
            </article>
          ))}
        </div>

        <div className="vv-plans" role="list" aria-label="Packs de crédits">
          {packs.map((pack, idx) => (
            <article className="vv-plan" key={pack.name} role="listitem">
              <h3>{pack.name}</h3>
              <p className="price">{pack.price}&nbsp;€ HT <small>→ {pack.credits}&nbsp;crédits</small></p>
              <span className="vv-tag">{pack.bonus}&nbsp;crédits offerts · {pack.saving}&nbsp;% d’économie</span>
              <Link className="vv-btn vv-btn--primary" href={`/agence/acheter?produit=pack-${idx}`}>Acheter</Link>
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
