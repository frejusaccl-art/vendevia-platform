import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/vv/app-shell";
import { agencyItems, agencyTabs, agencyTopLinks, agencyUser } from "@/components/vv/agency-nav";
import { ReviewNudge } from "@/components/vv/reviews";

export const metadata: Metadata = {
  title: "Espace agence — Vendevia",
  description: "Tableau de bord agence : nouveaux leads, leads à traiter, rendez-vous et crédits.",
};

const kpis = [
  { label: "Nouveaux leads", value: "12", delta: "+2 depuis hier" },
  { label: "À traiter", value: "8", delta: "+1 depuis hier" },
  { label: "Rendez-vous", value: "5", delta: "cette semaine" },
  { label: "Crédits restants", value: "34", delta: "valables 12 mois" },
];

const leads = [
  { name: "Thomas R.", type: "Maison", budget: "400 000 €", status: "À traiter", tone: "todo" },
  { name: "Sophie L.", type: "Appartement", budget: "250 000 €", status: "Contacté", tone: "contact" },
  { name: "Marc D.", type: "Appartement", budget: "600 000 €", status: "Qualifié", tone: "ok" },
  { name: "Julie P.", type: "Terrain", budget: "300 000 €", status: "À traiter", tone: "todo" },
  { name: "Lucas B.", type: "Appartement", budget: "350 000 €", status: "Rendez-vous", tone: "contact" },
] as const;

const agenda = [
  { time: "14:00", title: "Visite · Maison", place: "Saint-Germain" },
  { time: "16:00", title: "RDV · Appartement", place: "La Défense" },
  { time: "18:30", title: "Visite · Maison", place: "Boulogne" },
];

// Octobre 2026 : le 1er est un jeudi, la semaine commence le lundi.
const LEADING_BLANKS = 3;
const TODAY = 14;
const EVENT_DAYS = [14, 16, 20, 22];

export default function AgencyPage() {
  const cells = [
    ...Array.from({ length: LEADING_BLANKS }, (_, i) => ({ key: `b${i}`, day: 0 })),
    ...Array.from({ length: 31 }, (_, i) => ({ key: `d${i + 1}`, day: i + 1 })),
  ];

  return (
    <AppShell
      items={agencyItems("overview")}
      tabs={agencyTabs("overview")}
      topLinks={agencyTopLinks}
      user={agencyUser}
    >
      <main id="top">
        <div className="vv-greet">
          <h1>Bonjour, Agence Horizon</h1>
          <p>Voici un aperçu de votre activité aujourd’hui.</p>
        </div>

        <div className="vv-kpis">
          {kpis.map((k) => (
            <div className="vv-kpi" key={k.label}>
              <span>{k.label}</span>
              <strong>{k.value}</strong>
              <small>{k.delta}</small>
            </div>
          ))}
        </div>

        <ReviewNudge role="agence" />

        <div className="vv-panels">
          <section aria-labelledby="leads-title" className="vv-panel" id="leads">
            <div className="vv-panel-head">
              <h2 id="leads-title">Leads récents</h2>
              <Link href="/agence/leads">Voir tout</Link>
            </div>
            <div className="vv-table-wrap">
              <table className="vv-table">
                <thead>
                  <tr><th>Nom</th><th>Type de bien</th><th>Budget</th><th>Statut</th><th><span className="vv-sr">Action</span></th></tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.name}>
                      <td>{l.name}</td>
                      <td>{l.type}</td>
                      <td>{l.budget}</td>
                      <td><span className={`vv-status vv-status--${l.tone}`}>{l.status}</span></td>
                      <td><Link className="vv-link" href="/agence/leads">Voir</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="agenda-title" className="vv-panel" id="agenda">
            <div className="vv-panel-head">
              <h2 id="agenda-title">Mes rendez-vous</h2>
              <Link href="/agence/rendez-vous">Voir tout</Link>
            </div>
            <div className="vv-cal-head"><span>Octobre 2026</span></div>
            <div aria-label="Calendrier d’octobre 2026" className="vv-cal">
              {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => <b key={i}>{d}</b>)}
              {cells.map((c) =>
                c.day === 0 ? (
                  <i key={c.key} />
                ) : (
                  <span
                    aria-label={c.day === TODAY ? `${c.day} octobre, aujourd’hui` : undefined}
                    className={`${c.day === TODAY ? "today" : ""} ${EVENT_DAYS.includes(c.day) ? "has" : ""}`}
                    key={c.key}
                  >
                    {c.day}
                  </span>
                ),
              )}
            </div>
            <ul className="vv-agenda">
              {agenda.map((a) => (
                <li key={a.time}>
                  <span className="time">{a.time}</span>
                  <div><strong>{a.title}</strong><span className="sub">{a.place}</span></div>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <p className="vv-demo-note" style={{ marginTop: 18 }}>Données de démonstration : ce tableau de bord n’est pas encore relié à de vrais leads.</p>
      </main>
    </AppShell>
  );
}
