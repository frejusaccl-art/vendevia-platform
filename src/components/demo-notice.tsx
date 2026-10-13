export function DemoNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "demo-notice demo-notice-compact" : "demo-notice"} role="note">
      <span className="demo-notice-mark" aria-hidden="true" />
      <span>{compact ? "Démo · aucune donnée n’est envoyée" : "Environnement de démonstration · les actions restent locales, aucune donnée n’est envoyée."}</span>
    </div>
  );
}
