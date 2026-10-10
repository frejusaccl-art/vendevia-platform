import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { MaisonIntentionForm } from "@/components/maison-intention-form";

export default function IntentionPage() {
  return (
    <main className="maison-surface maison-question-page">
      <SiteHeader active="maison" />
      <div className="question-shell">
        <div className="question-rail"><span>MAISON / 01</span><i /><span>une question à la fois</span></div>
        <div className="question-copy">
          <Link className="back-link" href="/maison">← revenir au dossier</Link>
          <p className="kicker"><b /> Votre projet commence ici</p>
          <h1>On ne va pas vous<br />demander de <em>décider.</em></h1>
          <p className="question-lede">On va simplement remettre les bonnes informations dans le bon ordre. À la fin, vous saurez ce qui est clair, ce qui mérite un regard et ce qui peut attendre.</p>
          <div className="quiet-proof"><span>01</span><span>Votre rythme</span><span>Vos réponses</span><span>Votre choix</span></div>
        </div>
        <MaisonIntentionForm />
      </div>
      <footer className="maison-footer"><span>Vendevia Maison / dossier en préparation</span><span>Confidentialité lisible · contact jamais automatique</span></footer>
    </main>
  );
}
