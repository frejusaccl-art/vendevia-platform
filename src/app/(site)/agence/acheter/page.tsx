import type { Metadata } from "next";
import { Suspense } from "react";
import { AppShell } from "@/components/vv/app-shell";
import { Checkout } from "@/components/vv/checkout";
import { agencyItems, agencyTabs, agencyTopLinks, agencyUser } from "@/components/vv/agency-nav";

export const metadata: Metadata = { title: "Acheter des crédits — Vendevia", robots: { index: false } };

export default function BuyPage() {
  return (
    <AppShell items={agencyItems("credits")} tabs={agencyTabs("credits")} topLinks={agencyTopLinks} user={agencyUser}>
      <main id="top">
        <div className="vv-greet"><h1>Acheter des crédits</h1><p>1 crédit = 1 € HT. Choisissez une offre ou un pack.</p></div>
        <Suspense fallback={<p className="vv-muted">Chargement…</p>}><Checkout /></Suspense>
      </main>
    </AppShell>
  );
}
