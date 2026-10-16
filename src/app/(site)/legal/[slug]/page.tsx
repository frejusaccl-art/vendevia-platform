import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPage } from "@/components/vv/info-page";
import { LEGAL_UPDATED, legalPages } from "@/lib/legal-content";

export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = legalPages[slug];
  return page ? { title: `${page.title} — Vendevia`, description: page.intro } : {};
}

export default async function LegalPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = legalPages[slug];
  if (!page) notFound();
  return (
    <InfoPage
      currentSlug={slug}
      intro={page.intro}
      sections={page.sections}
      title={page.title}
      updated={page.legal ? LEGAL_UPDATED : undefined}
    />
  );
}
