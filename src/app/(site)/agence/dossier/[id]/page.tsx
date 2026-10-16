import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/vv/app-shell";
import { agencyItems, agencyTabs, agencyTopLinks, agencyUser } from "@/components/vv/agency-nav";
import { demoOpportunities, stageLabels } from "@/lib/agency-demo";

export const metadata: Metadata = { title: "Dossier — Espace agence Vendevia" };

export function generateStaticParams() {
  return demoOpportunities.map((o) => ({ id: o.id }));
}

export default async function DossierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const o = demoOpportunities.find((x) => x.id === id);
  if (!o) notFound();
  const rows: [string, string][] = [
    ["Bien", o.property], ["Localisation", o.city], ["Intention", o.intention], ["Étape", stageLabels[o.stage]],
    ["Prochaine action", `${o.nextAction} (${o.timing})`], ["Contact souhaité", o.contact], ["Consentement", o.consent], ["Origine", o.source],
  ];
  return (
    <AppShell items={agencyItems("leads")} tabs={agencyTabs("leads")} topLinks={agencyTopLinks} user={agencyUser}>
      <main id="top">
        <div className="vv-greet"><h1>{o.name}</h1><p>{o.id} · dossier d’exemple</p></div>
        <section className="vv-panel">
          <div className="vv-a-dl">
            {rows.map(([k, v]) => <div className="vv-kv" key={k}><span className="vv-muted">{k}</span><strong>{v}</strong></div>)}
          </div>
          <p style={{ marginTop: 18 }}><Link className="vv-btn vv-btn--outline vv-btn--sm" href="/agence/leads">← Retour aux leads</Link></p>
        </section>
        <p className="vv-demo-note" style={{ marginTop: 18 }}>Identités, références et consentements sont des exemples. Aucune donnée réelle n’est connectée.</p>
      </main>
    </AppShell>
  );
}
