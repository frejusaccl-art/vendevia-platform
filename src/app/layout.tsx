import type { Metadata } from "next";
import "./globals.css";
import { DemoProjectProvider } from "@/lib/demo-project-context";

export const metadata: Metadata = {
  title: {
    default: "Vendevia — Le projet vendeur, mieux suivi",
    template: "%s · Vendevia",
  },
  description: "Vendevia aide les propriétaires à comprendre leur projet de vente et les agences à piloter chaque prochaine action, du premier clic au mandat.",
  applicationName: "Vendevia",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body><DemoProjectProvider>{children}</DemoProjectProvider></body>
    </html>
  );
}
