import type { Metadata } from "next";
import { SignupForm } from "@/components/vv/auth-forms";
import { Logo } from "@/components/vv/chrome";
import { Icon } from "@/components/vv/icons";
import { Scene } from "@/components/vv/scenes";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Créer mon compte — Vendevia",
  description: "Créez votre compte propriétaire pour suivre votre projet de vente.",
};

export default function SignupPage() {
  return (
    <main className="vv-auth vv-auth--reverse">
      <div className="vv-auth-art">
        <Scene kind="facade" label="Illustration d’une maison avec piscine" />
        <div className="vv-auth-art-copy over">
          <Logo light />
          <h2>Rejoignez une nouvelle façon de vendre votre bien.</h2>
          <ul>
            <li><Icon name="check" size={16} /> Accès à des agences sélectionnées</li>
            <li><Icon name="check" size={16} /> Un accompagnement personnalisé</li>
            <li><Icon name="check" size={16} /> Suivi de votre demande en temps réel</li>
          </ul>
        </div>
      </div>
      <div className="vv-auth-panel">
        <div className="vv-auth-box">
          <div className="vv-eyebrow">Espace propriétaire</div>
          <h1>Créer mon compte</h1>
          <p className="lede">Déjà un compte&nbsp;? <Link className="vv-link" href="/connexion">Se connecter</Link></p>
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
