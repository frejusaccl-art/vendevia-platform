import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { MaisonDossierSummary } from "@/components/maison-dossier-summary";

export default function RestitutionPage() {
  return <main className="maison-surface maison-question-page restitution-page"><SiteHeader active="maison" /><div className="question-shell restitution-shell"><div className="question-rail"><span>MAISON / 05</span><i /><span>votre lecture</span></div><div className="question-copy"><Link className="back-link" href="/maison/projet/rythme">← étape précédente</Link><p className="kicker"><b /> Votre dossier a quelque chose à dire</p><h1>Pas un score.<br />Une lecture qui<br /><em>vous ressemble.</em></h1><p className="question-lede">Nous ne allons pas vous dire ce que vous devez faire. Nous allons vous montrer ce qui est déjà clair et la prochaine question qui mérite votre attention.</p><div className="restitution-index"><span>05</span><i /><span>intention · lieu · bien · rythme</span></div></div><MaisonDossierSummary /></div><footer className="maison-footer"><span>Vendevia Maison / lecture du dossier</span><span>05 / 05 · aucune décision imposée</span></footer></main>;
}
