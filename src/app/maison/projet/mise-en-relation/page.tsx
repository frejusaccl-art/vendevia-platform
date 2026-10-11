import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { MaisonContactChoice } from "@/components/maison-contact-choice";

export default function ContactPage() {
  return <main className="maison-surface maison-question-page contact-page"><SiteHeader active="maison" /><div className="question-shell contact-shell"><div className="question-rail"><span>MAISON / 06</span><i /><span>la conversation choisie</span></div><div className="question-copy"><Link className="back-link" href="/maison/projet/restitution">← revenir à ma lecture</Link><p className="kicker"><b /> La relation commence par un choix</p><h1>Un bon contact<br />n’arrive pas<br /><em>par surprise.</em></h1><p className="question-lede">Vous avez pris le temps de clarifier votre projet. Si vous souhaitez une aide humaine, nous transmettons le contexte qui rendra cette conversation utile dès le début.</p><div className="contact-principles"><span><b>01</b> vous choisissez</span><span><b>02</b> vous voyez</span><span><b>03</b> vous confirmez</span></div></div><MaisonContactChoice /></div><footer className="maison-footer"><span>Vendevia Maison / mise en relation choisie</span><span>06 / 06 · transmission transparente</span></footer></main>;
}
