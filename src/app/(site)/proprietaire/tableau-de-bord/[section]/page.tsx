import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/vv/app-shell";
import { OwnerScreen } from "@/components/vv/owner-screens";
import { ownerItems, ownerSections, ownerTabs, ownerTitles, ownerTopLinks, ownerUser, type OwnerSection } from "@/components/vv/owner-nav";

export function generateStaticParams() {
  return ownerSections.map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  const t = ownerTitles[section as OwnerSection];
  return t ? { title: `${t.title} — Vendevia`, description: t.lead, robots: { index: false } } : {};
}

export default async function OwnerSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!(ownerSections as readonly string[]).includes(section)) notFound();
  const key = section as OwnerSection;
  return (
    <AppShell items={ownerItems(key)} tabs={ownerTabs(key)} topLinks={ownerTopLinks} user={ownerUser}>
      <main id="top">
        <div className="vv-greet"><h1>{ownerTitles[key].title}</h1><p>{ownerTitles[key].lead}</p></div>
        <OwnerScreen section={key} />
      </main>
    </AppShell>
  );
}
