import Link from "next/link";
import "./(site)/vv.css";

export default function NotFound() {
  return (
    <div className="vv" style={{ display: "grid", minHeight: "100vh", placeItems: "center", padding: 32, textAlign: "center" }}>
      <div>
        <p className="vv-eyebrow">Erreur 404</p>
        <h1 style={{ fontSize: 40, margin: "8px 0 12px" }}>Cette page n’existe pas</h1>
        <p className="vv-muted" style={{ marginBottom: 22 }}>Le lien est peut-être ancien ou incorrect.</p>
        <Link className="vv-btn vv-btn--primary" href="/">Retour à l’accueil</Link>
      </div>
    </div>
  );
}
