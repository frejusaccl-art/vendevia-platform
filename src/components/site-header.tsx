"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandMark } from "./brand-mark";
import { UiIcon } from "./ui-icon";

type Active = "home" | "maison" | "agences" | "desk" | "backoffice" | "how" | "pricing";

const links = [
  { href: "/comment-ca-marche", label: "Notre méthode", key: "how" },
  { href: "/agences", label: "Pour les agences", key: "agences" },
  { href: "/tarifs", label: "Tarifs", key: "pricing" },
] as const;

export function SiteHeader({ active = "home" }: { active?: Active }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Vendevia, accueil">
        <BrandMark />
        <span className="brand-copy"><strong>vendevia</strong><small>le projet vendeur, mieux suivi</small></span>
      </Link>
      <nav className={open ? "public-nav is-open" : "public-nav"} aria-label="Navigation principale">
        {links.map((item) => <Link key={item.href} className={active === item.key ? "nav-item is-active" : "nav-item"} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <Link className="nav-item nav-login" href="/connexion" onClick={() => setOpen(false)}>Connexion</Link>
        <Link className="header-cta" href="/maison" onClick={() => setOpen(false)}>Faire le point <UiIcon name="arrow" size={16} /></Link>
      </nav>
      <button className="mobile-menu-toggle" type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <UiIcon name={open ? "close" : "menu"} size={21} />
      </button>
    </header>
  );
}
