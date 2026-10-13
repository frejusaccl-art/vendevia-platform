import Link from "next/link";
import { BrandMark } from "./brand-mark";

export function PublicFooter() {
  return (
    <footer className="public-footer-v2">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link className="brand" href="/" aria-label="Vendevia, accueil"><BrandMark /><span className="brand-copy"><strong>vendevia</strong><small>Le projet vendeur, mieux suivi</small></span></Link>
          <p>Une relation plus claire entre le projet d’un propriétaire et le travail d’une agence locale.</p>
        </div>
        <div className="footer-link-group"><span>Découvrir</span><Link href="/comment-ca-marche">Comment ça marche</Link><Link href="/zones">Zones pilotes</Link><Link href="/faq">Questions fréquentes</Link></div>
        <div className="footer-link-group"><span>Pour vous</span><Link href="/maison">Je prépare un projet</Link><Link href="/agences">Je pilote une agence</Link><Link href="/tarifs">Offres agence</Link></div>
        <div className="footer-link-group"><span>Cadre</span><Link href="/confidentialite">Confidentialité</Link><Link href="/mentions-legales">Mentions légales</Link><Link href="/cgv">Conditions générales</Link></div>
      </div>
      <div className="footer-bottom"><span>© Vendevia · Une expérience de démonstration.</span><span>Les données affichées ne représentent pas un historique réel.</span></div>
    </footer>
  );
}
