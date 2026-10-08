import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function MaisonPage() {
  return (
    <main className="experience maison-surface">
      <SiteHeader active="maison" />
      <div className="experience-shell">
        <div className="experience-rail"><span>MAISON / 00</span><i /><span>carnet de projet</span></div>
        <section className="maison-intro">
          <p className="kicker"><b /> Vendevia Maison</p>
          <h1>Vous n’avez pas besoin<br />d’avoir décidé pour<br /><em>commencer à comprendre.</em></h1>
          <p className="experience-lede">Faites le point sur votre bien, votre calendrier et les prochaines étapes possibles. Vous choisirez ensuite si vous souhaitez parler à un professionnel.</p>
          <Link className="lime-button" href="/maison">Faire le point sur mon projet <span>↗</span></Link>
          <p className="quiet-link">Je veux seulement comprendre la valeur de mon bien</p>
        </section>
        <aside className="dossier-stub"><span className="mono-label">Dossier / démonstration</span><div className="address-line">12, rue des Tilleuls</div><div className="dossier-rule" /><p>Une première indication n’est pas une expertise définitive.</p><span className="dossier-date">14.06.2026 / Bordeaux</span></aside>
      </div>
      <div className="maison-footer"><span>01 / une question à la fois</span><span>Les données affichées sont une démonstration.</span></div>
    </main>
  );
}
