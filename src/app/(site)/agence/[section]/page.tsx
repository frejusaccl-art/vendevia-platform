import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/vv/app-shell";
import { AgencyScreen } from "@/components/vv/agency-screens";
import { agencyItems, agencySections, agencyTabs, agencyTitles, agencyTopLinks, agencyUser, type AgencySection } from "@/components/vv/agency-nav";

export function generateStaticParams() {
  return agencySections.map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  const t = agencyTitles[section as AgencySection];
  return t ? { title: `${t.title} — Espace agence Vendevia`, description: t.lead } : {};
}

export default async function AgencySectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!(agencySections as readonly string[]).includes(section)) notFound();
  const key = section as AgencySection;
  return (
    <AppShell items={agencyItems(key)} tabs={agencyTabs(key)} topLinks={agencyTopLinks} user={agencyUser}>
      <main id="top">
        <div className="vv-greet"><h1>{agencyTitles[key].title}</h1><p>{agencyTitles[key].lead}</p></div>
        <AgencyScreen section={key} />
      </main>
    </AppShell>
  );
}
