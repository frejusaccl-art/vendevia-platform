import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
