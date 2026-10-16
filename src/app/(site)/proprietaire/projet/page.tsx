import type { Metadata } from "next";
import { VvHeader } from "@/components/vv/chrome";
import { OwnerFlow } from "@/components/vv/owner-flow";

export const metadata: Metadata = {
  title: "Décrire mon projet — Vendevia",
  description: "Décrivez votre projet de vente en 9 étapes courtes. Vous restez libre à chaque étape.",
};

export default function OwnerProjectPage() {
  return (
    <main>
      <VvHeader active="owners" />
      <OwnerFlow />
    </main>
  );
}
