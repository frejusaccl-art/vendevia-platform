import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://vendeviaa.com"),
  openGraph: { siteName: "Vendevia", locale: "fr_FR", type: "website" },
  title: "Vendevia — Vendez sereinement, avec les bonnes agences",
  description:
    "Vendevia met en relation les propriétaires avec des agences immobilières sélectionnées, avec leur accord et sans engagement.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
