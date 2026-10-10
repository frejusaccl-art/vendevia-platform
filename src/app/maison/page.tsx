import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function MaisonPage() {
  return (
    <main className="experience maison-surface">
      <SiteHeader active="maison" />
      <div className="experience-shell">
        <div className="experience-rail"><span>MAISON / 00</span><i /><span>carnet de projet</span></div>
        <section className="maison-intro">
          <p className="kicker"><b /> Vendevia Maison / votre dossier commence ici</p>
          <h1>Vous n’avez pas besoin<br />d’avoir décidé pour<br /><em>commencer à comprendre.</em></h1>
          <p className="experience-lede">Un point de départ simple pour regarder votre bien, votre calendrier et les prochaines étapes possibles. Vous choisirez ensuite si vous souhaitez parler à un professionnel.</p>
          <div className="maison-cta-row"><Link className="lime-button" href="/maison/projet/intention">Faire le point sur mon projet <span>↗</span></Link><Link className="text-button dark-text-button" href="/maison/projet/intention">Je veux seulement comprendre la valeur de mon bien <span>→</span></Link></div>
          <div className="maison-trust"><span className="trust-mark">⌁</span><div><strong>Pas de contact automatique.</strong><span>Vous avancez à votre rythme. Le choix d’échanger vient après.</span></div></div>
        </section>
        <aside className="dossier-stub dossier-stub-large"><div className="dossier-stamp">DOSSIER<br />01 / 04</div><span className="mono-label">Carnet de projet / exemple</span><div className="address-line">12, rue des Tilleuls</div><div className="dossier-context"><span>Maison · Bordeaux</span><span>Première lecture</span></div><div className="dossier-rule" /><p>Une première indication n’est pas une expertise définitive. C’est le début d’une conversation plus claire avec votre bien.</p><div className="dossier-line-list"><span><b /> intention</span><span><i /> adresse</span><span><i /> bien</span><span><i /> rythme</span></div><span className="dossier-date">14.06.2026 / dossier de démonstration</span></aside>
      </div>
      <div className="maison-reassurance"><span>Ce que vous allez obtenir</span><strong>Une lecture utile, même si vous ne demandez aucun rappel.</strong><span>Durée estimée · 4 minutes</span></div>
      <div className="maison-footer"><span>Vendevia Maison / dossier en préparation</span><span>Les données affichées sont une démonstration.</span></div>
    </main>
  );
}
