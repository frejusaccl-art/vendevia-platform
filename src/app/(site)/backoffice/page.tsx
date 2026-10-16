import type { Metadata } from "next";
import { InfoPage } from "@/components/vv/info-page";

export const metadata: Metadata = { title: "Back-office — Vendevia", robots: { index: false } };

export default function BackofficePage() {
  return (
    <InfoPage
      title="Back-office"
      intro="Espace interne : agences, leads, attributions, incidents, avis et journaux d’audit. Il sera relié au serveur sécurisé (Bloc 9)."
    />
  );
}
