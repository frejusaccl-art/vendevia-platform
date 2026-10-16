import type { SideItem, TabItem } from "./app-shell";

export const ownerBase = "/proprietaire/tableau-de-bord";
export const ownerSections = ["suivi", "rendez-vous", "messages", "accords"] as const;
export type OwnerSection = (typeof ownerSections)[number];

export const ownerTitles: Record<OwnerSection, { title: string; lead: string }> = {
  suivi: { title: "Suivi de ma demande", lead: "Chaque étape de votre projet, avec sa date." },
  "rendez-vous": { title: "Mes rendez-vous", lead: "Confirmez ou demandez un autre créneau." },
  messages: { title: "Mes messages", lead: "Échangez avec votre agence." },
  accords: { title: "Mes accords et mes données", lead: "Vous gardez la main : retirez votre accord ou demandez la suppression de vos données à tout moment." },
};

export function ownerItems(current?: OwnerSection | "home"): SideItem[] {
  return [
    { label: "Tableau de bord", icon: "grid", href: ownerBase, current: current === "home" },
    { label: "Mes informations", icon: "user", href: "/proprietaire/projet" },
    { label: "Suivi de ma demande", icon: "chart", href: `${ownerBase}/suivi`, current: current === "suivi" },
    { label: "Mes rendez-vous", icon: "calendar", href: `${ownerBase}/rendez-vous`, current: current === "rendez-vous" },
    { label: "Mes messages", icon: "message", href: `${ownerBase}/messages`, current: current === "messages" },
    { label: "Mes accords et données", icon: "shield", href: `${ownerBase}/accords`, current: current === "accords" },
    { label: "Aide", icon: "help", href: "/legal/faq" },
  ];
}

export function ownerTabs(current?: OwnerSection | "home"): TabItem[] {
  return [
    { label: "Accueil", icon: "grid", href: ownerBase, current: current === "home" },
    { label: "Suivi", icon: "chart", href: `${ownerBase}/suivi`, current: current === "suivi" },
    { label: "RDV", icon: "calendar", href: `${ownerBase}/rendez-vous`, current: current === "rendez-vous" },
    { label: "Messages", icon: "message", href: `${ownerBase}/messages`, current: current === "messages" },
    { label: "Accords", icon: "shield", href: `${ownerBase}/accords`, current: current === "accords" },
  ];
}

export const ownerTopLinks = [
  { label: "Mon projet", href: ownerBase },
  { label: "Suivi", href: `${ownerBase}/suivi` },
];
export const ownerUser = { name: "Sophie L.", role: "Propriétaire", initials: "SL" };
