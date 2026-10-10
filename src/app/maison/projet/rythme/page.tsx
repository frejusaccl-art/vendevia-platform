import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { MaisonRhythmForm } from "@/components/maison-rhythm-form";

export default function RhythmPage() {
  return <main className="maison-surface maison-question-page rhythm-page"><SiteHeader active="maison" /><div className="question-shell rhythm-shell"><div className="question-rail"><span>MAISON / 04</span><i /><span>le bon rythme</span></div><div className="question-copy"><Link className="back-link" href="/maison/projet/bien">← étape précédente</Link><p className="kicker"><b /> Le dossier s’adapte enfin à vous</p><h1>Une bonne expérience<br />sait aussi <em>attendre.</em></h1><p className="question-lede">Vendevia ne doit pas seulement comprendre votre bien. Il doit comprendre le moment auquel vous pouvez vraiment avancer.</p><div className="rhythm-orbit" aria-hidden="true"><span className="orbit-ring orbit-ring-one" /><span className="orbit-ring orbit-ring-two" /><span className="orbit-core">votre<br />tempo</span><span className="orbit-note orbit-note-one">sans pression</span><span className="orbit-note orbit-note-two">sans relance</span></div></div><MaisonRhythmForm /></div><footer className="maison-footer"><span>Vendevia Maison / dossier en préparation</span><span>04 / 04 · rythme choisi</span></footer></main>;
}
