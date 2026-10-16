import type { SideItem, TabItem } from "./app-shell";

export const agencySections = [
  "leads", "a-traiter", "pipeline", "rendez-vous", "equipes", "credits", "qualite", "rapports", "documents", "parametres",
] as const;
export type AgencySection = (typeof agencySections)[number];

export const agencyTitles: Record<AgencySection, { title: string; lead: string }> = {
  leads: { title: "Mes leads", lead: "Chaque dossier garde son contexte : intention, prochaine action et consentement." },
  "a-traiter": { title: "À traiter", lead: "Relancer pour une raison, pas par réflexe : qui, pourquoi, et ce qui peut se perdre." },
  pipeline: { title: "Pipeline", lead: "Voir ce qui avance, et ce qui attend." },
  "rendez-vous": { title: "Rendez-vous", lead: "Chaque créneau reste relié au dossier qui l’a déclenché." },
  equipes: { title: "Mes équipes", lead: "La capacité fait partie de l’attribution." },
  credits: { title: "Crédits et offres", lead: "Votre solde et vos offres, sans paiement dans cette démo." },
  qualite: { title: "Qualité et remplacements", lead: "Un lead qui ne correspond pas aux critères annoncés peut être remplacé." },
  rapports: { title: "Rapports", lead: "Reliez la dépense aux leads, aux rendez-vous puis aux mandats." },
  documents: { title: "Contrat et documents", lead: "Vos documents contractuels et légaux au même endroit." },
  parametres: { title: "Paramètres", lead: "Territoire, disponibilités et notifications." },
};

export function agencyItems(current?: AgencySection | "overview"): SideItem[] {
  const it = (label: string, icon: SideItem["icon"], href: string, key: string): SideItem => ({ label, icon, href, current: current === key });
  return [
    it("Vue d’ensemble", "grid", "/agence", "overview"),
    it("Mes leads", "users", "/agence/leads", "leads"),
    it("À traiter", "inbox", "/agence/a-traiter", "a-traiter"),
    it("Pipeline", "list", "/agence/pipeline", "pipeline"),
    it("Rendez-vous", "calendar", "/agence/rendez-vous", "rendez-vous"),
    it("Mes équipes", "user", "/agence/equipes", "equipes"),
    it("Crédits et offres", "card", "/agence/credits", "credits"),
    it("Qualité et remplacements", "refresh", "/agence/qualite", "qualite"),
    it("Rapports", "chart", "/agence/rapports", "rapports"),
    it("Contrat et documents", "file", "/agence/documents", "documents"),
    it("Paramètres", "sliders", "/agence/parametres", "parametres"),
    { label: "Aide", icon: "help", href: "/legal/faq" },
  ];
}

export function agencyTabs(current?: AgencySection | "overview"): TabItem[] {
  return [
    { label: "Accueil", icon: "grid", href: "/agence", current: current === "overview" },
    { label: "Leads", icon: "users", href: "/agence/leads", current: current === "leads" },
    { label: "À traiter", icon: "inbox", href: "/agence/a-traiter", current: current === "a-traiter" },
    { label: "RDV", icon: "calendar", href: "/agence/rendez-vous", current: current === "rendez-vous" },
    { label: "Plus", icon: "list", href: "/agence/credits", current: ["credits", "pipeline", "equipes", "qualite", "rapports", "documents", "parametres"].includes(current ?? "") },
  ];
}

export const agencyTopLinks = [
  { label: "Mes leads", href: "/agence/leads" },
  { label: "Pipeline", href: "/agence/pipeline" },
  { label: "Agence Horizon", href: "/agence" },
];
export const agencyUser = { name: "Agence Horizon", role: "Responsable", initials: "AH" };
