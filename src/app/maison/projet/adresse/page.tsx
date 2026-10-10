import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { MaisonAddressForm } from "@/components/maison-address-form";

export default function AddressPage() {
  return (
    <main className="maison-surface maison-question-page address-page">
      <SiteHeader active="maison" />
      <div className="question-shell address-shell">
        <div className="question-rail"><span>MAISON / 02</span><i /><span>le repère du bien</span></div>
        <div className="question-copy">
          <Link className="back-link" href="/maison/projet/intention">← étape précédente</Link>
          <p className="kicker"><b /> Le dossier prend une adresse</p>
          <h1>Un lieu change<br />la manière de<br /><em>lire un projet.</em></h1>
          <p className="question-lede">Pas besoin d’un dossier complet. Une adresse donne déjà une première texture : un quartier, un rythme, une réalité autour de votre bien.</p>
          <div className="address-map-visual" aria-hidden="true"><span className="map-line map-line-a" /><span className="map-line map-line-b" /><span className="map-line map-line-c" /><span className="map-pin">⌖</span><span className="map-label">votre bien</span><span className="map-street">rue des tilleuls</span></div>
        </div>
        <MaisonAddressForm />
      </div>
      <footer className="maison-footer"><span>Vendevia Maison / dossier en préparation</span><span>02 / 04 · adresse lisible</span></footer>
    </main>
  );
}
