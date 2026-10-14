import Link from "next/link";
import { Icon } from "./icons";
import { Scene } from "./scenes";

export const navItems = [
  { href: "/", label: "Accueil", key: "home" },
  { href: "/proprietaire/projet", label: "Propriétaires", key: "owners" },
  { href: "/agence", label: "Agences", key: "agencies" },
  { href: "/tarifs", label: "Tarifs", key: "pricing" },
  { href: "/a-propos", label: "À propos", key: "about" },
  { href: "/contact", label: "Contact", key: "contact" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link aria-label="Vendevia, accueil" className="vv-logo" href="/" style={light ? { color: "#f6f2e8" } : undefined}>
      vendevia
    </Link>
  );
}

export function VvHeader({ active }: { active?: NavKey }) {
  return (
    <header className="vv-header">
      <Logo />
      <nav aria-label="Navigation principale" className="vv-nav">
        {navItems.map((item) => (
          <Link aria-current={active === item.key ? "page" : undefined} href={item.href} key={item.key}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="vv-header-actions">
        <Link aria-label="Rechercher" className="vv-icon-btn" href="/legal/faq">
          <Icon name="search" size={18} />
        </Link>
        <Link className="vv-btn vv-btn--outline vv-btn--pill vv-btn--sm" href="/connexion">
          Se connecter
        </Link>
        <Link className="vv-btn vv-btn--primary vv-btn--pill vv-btn--sm" href="/proprietaire/projet">
          Décrire mon projet
        </Link>
      </div>
      <details className="vv-menu">
        <summary aria-label="Ouvrir le menu">
          <Icon name="list" />
        </summary>
        <div className="vv-menu-panel">
          {navItems.map((item) => (
            <Link href={item.href} key={item.key}>
              {item.label}
            </Link>
          ))}
          <Link className="vv-btn vv-btn--outline vv-btn--sm" href="/connexion">
            Se connecter
          </Link>
          <Link className="vv-btn vv-btn--primary vv-btn--sm" href="/proprietaire/projet">
            Décrire mon projet
          </Link>
        </div>
      </details>
    </header>
  );
}

export function VvFooter({ withBanner = false }: { withBanner?: boolean }) {
  return (
    <>
      {withBanner && (
        <section aria-label="Passer à l’action" className="vv-cta vv-wrap" style={{ padding: 0 }}>
          <div className="vv-cta-banner">
            <Scene className="vv-scene" kind="skyline" label="Silhouette de pins et de toits" />
          </div>
          <div className="vv-cta-bar">
            <div>
              <h2>Prêt à concrétiser votre projet&nbsp;?</h2>
              <p>Rejoignez les particuliers et les agences qui font confiance à Vendevia.</p>
            </div>
            <Link className="vv-btn vv-btn--light" href="/proprietaire/projet">
              Décrire mon projet <Icon name="arrow" size={16} />
            </Link>
          </div>
        </section>
      )}
      <footer className="vv-footer">
        <div className="vv-wrap">
          <div className="vv-footer-grid">
            <div>
              <Logo light />
              <p>Les rendez-vous immobiliers qualifiés.</p>
            </div>
            <div>
              <h4>Navigation</h4>
              <ul>
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Informations</h4>
              <ul>
                <li><Link href="/legal/mentions-legales">Mentions légales</Link></li>
                <li><Link href="/legal/confidentialite">Politique de confidentialité</Link></li>
                <li><Link href="/legal/cgv">CGV</Link></li>
                <li><Link href="/legal/faq">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4>Pour qui&nbsp;?</h4>
              <ul>
                <li><Link href="/proprietaire/projet">Particuliers vendeurs</Link></li>
                <li><Link href="/agence">Agences immobilières</Link></li>
                <li><Link href="/connexion">Se connecter</Link></li>
              </ul>
            </div>
          </div>
          <div className="vv-footer-bottom">
            <span>© 2026 Vendevia. Tous droits réservés.</span>
            <span>France entière · Particuliers &amp; agences immobilières</span>
          </div>
        </div>
      </footer>
    </>
  );
}
