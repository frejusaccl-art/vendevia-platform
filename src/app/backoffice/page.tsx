import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function BackofficePage() {
  return <main className="backoffice-surface"><SiteHeader active="backoffice" /><section className="backoffice-shell"><p className="kicker"><b /> Vendevia / équipe interne</p><h1>La qualité du pipeline<br /><em>se vérifie aussi en coulisses.</em></h1><p>Le back-office regroupera les agences, projets, attributions, incidents, compensations et journaux d’audit.</p><Link className="text-button dark-text-button" href="/">Retour aux fondations <span>↗</span></Link></section></main>;
}
