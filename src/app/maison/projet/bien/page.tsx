import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { MaisonPropertyForm } from "@/components/maison-property-form";

export default function PropertyPage() {
  return <main className="maison-surface maison-question-page property-page"><SiteHeader active="maison" /><div className="question-shell property-shell"><div className="question-rail"><span>MAISON / 03</span><i /><span>la nature du bien</span></div><div className="question-copy"><Link className="back-link" href="/maison/projet/adresse">← étape précédente</Link><p className="kicker"><b /> Le dossier devient concret</p><h1>Pas besoin de<br />tout décrire pour<br /><em>être compris.</em></h1><p className="question-lede">Nous cherchons juste le bon niveau de précision pour la suite. Un mot juste vaut mieux qu’un long formulaire.</p><div className="property-notation" aria-hidden="true"><span className="notation-number">03</span><span className="notation-line" /><span className="notation-copy">type de bien<br />sans estimation<br />sans pression</span></div></div><MaisonPropertyForm /></div><footer className="maison-footer"><span>Vendevia Maison / dossier en préparation</span><span>03 / 04 · bien identifié</span></footer></main>;
}
