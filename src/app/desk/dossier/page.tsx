import { SiteHeader } from "@/components/site-header";
import { DeskOpportunityDetail } from "@/components/desk-opportunity-detail";

export default function DeskDossierPage() {
  return <main className="experience desk-surface"><SiteHeader active="desk" /><div className="desk-shell opportunity-shell"><div className="desk-context motion-reveal"><p className="kicker"><b /> Vendevia Desk / dossier reçu</p><h1>Lire avant<br /><em>d’agir.</em></h1><p>Une opportunité n’est pas un formulaire. C’est une histoire qui arrive avec son contexte.</p></div><DeskOpportunityDetail /></div><div className="desk-footer"><span>Desk / fiche opportunité</span><span>Donnée de démonstration — action manuelle.</span></div></main>;
}
