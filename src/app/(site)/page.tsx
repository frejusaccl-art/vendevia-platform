import type { Metadata } from "next";
import Link from "next/link";
import { VvFooter, VvHeader } from "@/components/vv/chrome";
import { Icon } from "@/components/vv/icons";
import { ProtectBanner } from "@/components/vv/protect-banner";
import { HomeReviews } from "@/components/vv/reviews";
import { Scene } from "@/components/vv/scenes";

export const metadata: Metadata = {
  title: "Vendevia — Des rendez-vous immobiliers qualifiés",
  description:
    "Vendevia vous accompagne pour vendre votre bien en toute confiance, en vous mettant en relation avec des agences immobilières sélectionnées et prêtes à vous accompagner.",
};

const steps = [
  { icon: "clipboard", title: "1. Vous décrivez votre projet", text: "Quelques minutes suffisent pour nous donner les informations essentielles." },
  { icon: "handshake", title: "2. Votre demande est qualifiée", text: "Nous la transmettons aux agences les mieux adaptées à votre profil." },
  { icon: "user", title: "3. Vous êtes accompagné", text: "Vous êtes informé à chaque étape, jusqu’à la concrétisation." },
] as const;

export default function HomePage() {
  return (
    <main>
      <VvHeader active="home" />

      <section aria-labelledby="hero-title" className="vv-hero">
        <div className="vv-hero-copy">
          <h1 id="hero-title">Des rendez-vous immobiliers qualifiés.</h1>
          <p className="vv-hero-lede">
            Vendevia vous accompagne pour vendre votre bien en toute confiance, en vous mettant en relation avec des agences immobilières sélectionnées et prêtes à vous accompagner.
          </p>
          <div className="vv-hero-cta">
            <Link className="vv-btn vv-btn--primary vv-btn--pill" href="/proprietaire/projet">
              Décrire mon projet <Icon name="arrow" size={16} />
            </Link>
            <Link className="vv-btn vv-btn--outline vv-btn--pill" href="/agence">
              Je suis une agence immobilière
            </Link>
          </div>
          <ul className="vv-trust">
            <li><Icon name="building" size={26} /> Agences sélectionnées et vérifiées</li>
            <li><Icon name="user" size={26} /> Accompagnement personnalisé</li>
            <li><Icon name="lock" size={26} /> Vos données sont protégées</li>
          </ul>
        </div>
        <div className="vv-hero-visual">
          <Scene kind="villa" label="Illustration d’une villa contemporaine avec piscine" />
          <div className="vv-property-chip">
            <div className="thumb"><Scene kind="facade" label="Miniature du bien" /></div>
            <div>
              <strong>Maison à vendre</strong>
              <span>Saint-Tropez</span>
              <b>1 250 000 €</b>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" className="vv-section" id="comment-ca-marche">
        <p className="vv-eyebrow">Comment ça marche ?</p>
        <h2 className="vv-section-title" id="how-title">Un processus simple et efficace</h2>
        <div className="vv-steps">
          {steps.map((step) => (
            <div className="vv-step" key={step.title}>
              <span className="vv-step-icon"><Icon name={step.icon} size={24} /></span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="vv-audiences">
          <article className="vv-audience">
            <div className="vv-audience-copy">
              <h3>Vous êtes propriétaire&nbsp;?</h3>
              <p>Vendez votre bien avec des agences sélectionnées et motivées.</p>
              <Link className="vv-btn vv-btn--primary vv-btn--sm" href="/proprietaire/projet">
                Décrire mon projet <Icon name="arrow" size={14} />
              </Link>
            </div>
            <div className="vv-audience-art"><Scene kind="interior" label="Illustration d’un salon lumineux" /></div>
          </article>
          <article className="vv-audience">
            <div className="vv-audience-copy">
              <h3>Vous êtes une agence&nbsp;?</h3>
              <p>Accédez à des leads qualifiés et développez votre activité.</p>
              <Link className="vv-btn vv-btn--outline vv-btn--sm" href="/agence">
                Accéder à mon espace <Icon name="arrow" size={14} />
              </Link>
            </div>
            <div className="vv-audience-art"><Scene kind="office" label="Illustration d’un bureau d’agence" /></div>
          </article>
        </div>

        <ProtectBanner />
      </section>

      <HomeReviews />

      <VvFooter withBanner />
    </main>
  );
}
