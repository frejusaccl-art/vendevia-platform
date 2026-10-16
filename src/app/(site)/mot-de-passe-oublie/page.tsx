import type { Metadata } from "next";
import { ForgotForm } from "@/components/vv/forgot-form";
import { Logo } from "@/components/vv/chrome";
import { Scene } from "@/components/vv/scenes";

export const metadata: Metadata = { title: "Mot de passe oublié — Vendevia", robots: { index: false } };

export default function ForgotPage() {
  return (
    <main className="vv-auth">
      <div className="vv-auth-art"><Scene kind="door" label="Illustration d’une porte d’entrée en bois" /></div>
      <div className="vv-auth-panel">
        <div className="vv-auth-box">
          <Logo />
          <h1>Mot de passe oublié</h1>
          <p className="lede">Indiquez l’e-mail de votre compte, nous vous enverrons un lien.</p>
          <ForgotForm />
        </div>
      </div>
    </main>
  );
}
