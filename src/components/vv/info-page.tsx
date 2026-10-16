import Link from "next/link";
import { VvFooter, VvHeader, type NavKey } from "./chrome";
import { Icon } from "./icons";

export type Section = { title: string; body: string[] };

export const legalLinks = [
  { slug: "confidentialite", label: "Confidentialité" },
  { slug: "mentions-legales", label: "Mentions légales" },
  { slug: "cgu", label: "CGU" },
  { slug: "cgv", label: "CGV" },
  { slug: "cookies", label: "Cookies" },
  { slug: "faq", label: "FAQ" },
] as const;

export function InfoPage({
  active,
  currentSlug,
  title,
  updated,
  intro,
  sections,
  draftNotice,
  children,
}: {
  active?: NavKey;
  currentSlug?: string;
  title: string;
  updated?: string;
  intro?: string;
  sections?: Section[];
  draftNotice?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <main>
      <VvHeader active={active} />
      <article className="vv-info">
        <p className="vv-eyebrow">{currentSlug ? "Pages légales" : "Vendevia"}</p>
        <h1>{title}</h1>
        {updated && <p className="updated">{updated}</p>}
        {intro && <p className="vv-muted" style={{ marginBottom: 22 }}>{intro}</p>}
        {draftNotice && (
          <p className="vv-demo-note">Les champs entre crochets (identité de l’éditeur) sont à renseigner dans src/lib/company.ts avant la mise en ligne.</p>
        )}
        {sections && (
          <div className="vv-accordion">
            {sections.map((section, i) => (
              <details key={section.title} open={i === 0}>
                <summary>
                  {i + 1}. {section.title}
                  <Icon name="down" size={18} />
                </summary>
                <div className="body">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} style={{ marginBottom: 8 }}>{paragraph}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        )}
        {children}
        {currentSlug && (
          <nav aria-label="Autres pages légales" className="vv-legal-links">
            {legalLinks.map((l) => (
              <Link aria-current={l.slug === currentSlug ? "page" : undefined} href={`/legal/${l.slug}`} key={l.slug}>{l.label}</Link>
            ))}
          </nav>
        )}
      </article>
      <VvFooter />
    </main>
  );
}
