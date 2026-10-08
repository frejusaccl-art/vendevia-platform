import Link from "next/link";
import { BrandMark } from "./brand-mark";

type Active = "home" | "maison" | "desk" | "backoffice";

export function SiteHeader({ active = "home" }: { active?: Active }) {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Vendevia, accueil">
        <BrandMark />
        <span className="brand-copy">
          <strong>vendevia</strong>
          <small>le dossier vendeur en mouvement</small>
        </span>
      </Link>
      <nav className="public-nav" aria-label="Navigation principale">
        <Link className={active === "maison" ? "nav-item is-active maison-link" : "nav-item maison-link"} href="/maison">Maison</Link>
        <Link className={active === "desk" ? "nav-item is-active desk-link" : "nav-item desk-link"} href="/desk">Desk</Link>
      </nav>
      <div className="header-state"><span className="state-dot" /> Prototype Bloc 0</div>
    </header>
  );
}
