import type { Metadata } from "next";
import { LoginForm } from "@/components/vv/auth-forms";
import { Logo } from "@/components/vv/chrome";
import { Scene } from "@/components/vv/scenes";

export const metadata: Metadata = {
  title: "Connexion — Vendevia",
  description: "Connectez-vous à votre espace propriétaire ou agence.",
};

export default function LoginPage() {
  return (
    <main className="vv-auth">
      <div className="vv-auth-art"><Scene kind="door" label="Illustration d’une porte d’entrée en bois" /></div>
      <div className="vv-auth-panel">
        <div className="vv-auth-box">
          <Logo />
          <h1>Bienvenue sur Vendevia</h1>
          <p className="lede">Connectez-vous pour accéder à votre espace.</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
