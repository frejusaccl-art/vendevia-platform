import type { Metadata } from "next";
import { VvHeader } from "@/components/vv/chrome";
import { ModerationBoard } from "@/components/vv/moderation-board";

export const metadata: Metadata = { title: "Modération des avis — Vendevia", robots: { index: false } };

export default function ModerationPage() {
  return (
    <main>
      <VvHeader />
      <div className="vv-wrap" style={{ maxWidth: 820, padding: "40px 32px 80px" }}>
        <h1 style={{ fontSize: 34, marginBottom: 8 }}>Modération des avis</h1>
        <p className="vv-muted" style={{ marginBottom: 22 }}>Relisez chaque avis avant publication : contenu respectueux, aucune coordonnée personnelle.</p>
        <ModerationBoard />
      </div>
    </main>
  );
}
