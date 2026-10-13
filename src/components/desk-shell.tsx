"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "./brand-mark";
import { DemoNotice } from "./demo-notice";
import { UiIcon } from "./ui-icon";

const navGroups = [
  { label: "PILOTER", items: [
    { href: "/desk", label: "Aujourd’hui", icon: "chart" as const },
    { href: "/desk/projets", label: "Projets vendeurs", icon: "file" as const },
    { href: "/desk/pipeline", label: "Pipeline", icon: "arrow" as const },
    { href: "/desk/agenda", label: "Agenda", icon: "calendar" as const },
    { href: "/desk/relances", label: "Relances", icon: "clock" as const },
    { href: "/desk/analytics", label: "Performance", icon: "chart" as const },
  ] },
  { label: "ORGANISER", items: [
    { href: "/desk/equipe", label: "Équipe", icon: "users" as const },
    { href: "/desk/territoire", label: "Territoire", icon: "pin" as const },
  ] },
  { label: "COMPTE", items: [
    { href: "/desk/abonnement", label: "Abonnement", icon: "file" as const },
    { href: "/desk/parametres", label: "Paramètres", icon: "settings" as const },
  ] },
];

const routeTitles: Record<string, string> = {
  "/desk": "Vue du jour", "/desk/projets": "Projets vendeurs", "/desk/dossier": "Dossier actif", "/desk/pipeline": "Pipeline vendeur", "/desk/agenda": "Agenda", "/desk/relances": "Relances", "/desk/analytics": "Performance", "/desk/equipe": "Équipe", "/desk/territoire": "Territoire", "/desk/abonnement": "Abonnement", "/desk/parametres": "Paramètres", "/desk/onboarding": "Mise en route",
};

export function DeskShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pageTitle = routeTitles[pathname] ?? "Vendevia Desk";

  return (
    <div className="desk-app">
      <aside className={`desk-sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="desk-brand-row"><Link className="brand desk-brand" href="/desk"><BrandMark inverted /><span className="brand-copy"><strong>vendevia</strong><small>DESK / PILOTAGE</small></span></Link><button className="desk-mobile-close" type="button" aria-label="Fermer la navigation" onClick={() => setMobileOpen(false)}><UiIcon name="close" /></button></div>
        <div className="desk-workspace-switch"><span className="workspace-mark">B</span><span><strong>Agence de démonstration</strong><small>Espace pilote · exemple</small></span><UiIcon name="chevron" size={15} /></div>
        <nav className="desk-navigation" aria-label="Navigation Vendevia Desk">
          {navGroups.map((group) => <div className="desk-nav-group" key={group.label}><span className="desk-nav-label">{group.label}</span>{group.items.map((item) => {
            const active = item.href === "/desk" ? pathname === "/desk" : pathname === item.href || (item.href === "/desk/projets" && pathname === "/desk/dossier");
            return <Link key={item.href} href={item.href} className={`desk-nav-link ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined} onClick={() => setMobileOpen(false)}><UiIcon name={item.icon} size={17} /><span>{item.label}</span>{item.href === "/desk" && <i className="nav-count">03</i>}</Link>;
          })}</div>)}
        </nav>
        <div className="desk-sidebar-bottom"><div className="desk-capacity"><span className="capacity-light" /><span><strong>Capacité de démonstration</strong><small>2 créneaux disponibles · exemple</small></span></div><Link href="/desk/onboarding" className="desk-help-link"><UiIcon name="spark" size={16} /> Terminer la mise en route <UiIcon name="arrow" size={14} /></Link></div>
      </aside>
      {mobileOpen && <button type="button" className="desk-scrim" aria-label="Fermer le menu" onClick={() => setMobileOpen(false)} />}
      <div className="desk-main-column">
        <header className="desk-topbar"><button className="desk-mobile-menu" type="button" aria-label="Ouvrir la navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}><UiIcon name="menu" /></button><div className="desk-breadcrumb"><span>VENDEVIA DESK</span><i>/</i><strong>{pageTitle}</strong></div><div className="desk-topbar-actions"><DemoNotice compact /><Link className="desk-user-button" href="/desk/parametres" aria-label="Paramètres de l’agence"><span>AD</span><UiIcon name="chevron" size={14} /></Link></div></header>
        <div className="desk-mobile-demo"><DemoNotice compact /></div>
        <main className="desk-main-content">{children}</main>
        <footer className="desk-app-footer"><span>Vendevia Desk / espace pilote</span><span>Données de démonstration · aucun dossier réel</span></footer>
      </div>
    </div>
  );
}
