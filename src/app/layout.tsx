import type { Metadata } from "next";
import "./globals.css";
import { MotionDirector } from "@/components/motion-director";

export const metadata: Metadata = {
  title: "Vendevia — Le pipeline vendeur en mouvement",
  description:
    "Vendevia transforme chaque projet vendeur en prochaine action claire, du premier clic au mandat.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body><MotionDirector />{children}</body>
    </html>
  );
}
