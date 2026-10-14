import Link from "next/link";
import { Icon, type IconName } from "./icons";
import { Logo } from "./chrome";

export type SideItem = { label: string; icon: IconName; href?: string; current?: boolean };
export type TabItem = { label: string; icon: IconName; href: string; current?: boolean };

export function AppShell({
  items,
  tabs,
  topLinks,
  user,
  children,
}: {
  items: SideItem[];
  tabs: TabItem[];
  topLinks: { label: string; href: string }[];
  user: { name: string; role: string; initials: string };
  children: React.ReactNode;
}) {
  return (
    <div className="vv-app">
      <aside className="vv-side">
        <Logo />
        <nav aria-label="Navigation de l’espace" className="vv-side-nav">
          {items.map((item) =>
            item.href ? (
              <Link aria-current={item.current ? "page" : undefined} href={item.href} key={item.label}>
                <Icon name={item.icon} size={18} /> {item.label}
              </Link>
            ) : (
              <span aria-disabled="true" key={item.label} title="Bientôt disponible">
                <Icon name={item.icon} size={18} /> {item.label}
              </span>
            ),
          )}
        </nav>
        <Link className="vv-btn vv-btn--outline vv-btn--sm" href="/connexion" style={{ marginTop: "auto" }}>
          <Icon name="logout" size={16} /> Se déconnecter
        </Link>
      </aside>

      <div className="vv-main">
        <div className="vv-topbar">
          <nav aria-label="Raccourcis" className="vv-topnav">
            {topLinks.map((l) => (
              <Link href={l.href} key={l.label}>{l.label}</Link>
            ))}
          </nav>
          <div className="vv-user" style={{ marginLeft: "auto" }}>
            <Link aria-label="Notifications" className="vv-icon-btn" href="#top">
              <Icon name="bell" size={18} />
            </Link>
            <span className="vv-avatar">{user.initials}</span>
            <div>
              <strong>{user.name}</strong>
              <span>{user.role}</span>
            </div>
          </div>
        </div>
        {children}
      </div>

      <nav aria-label="Navigation mobile" className="vv-tabbar">
        {tabs.map((t) => (
          <Link aria-current={t.current ? "page" : undefined} href={t.href} key={t.label}>
            <Icon name={t.icon} size={20} />
            {t.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
