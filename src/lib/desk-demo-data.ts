export type StageId = "nouveau" | "contact" | "confirme" | "rendezvous" | "estimation" | "mandat";

export type DemoOpportunity = {
  id: string;
  name: string;
  city: string;
  property: string;
  stage: StageId;
  intention: string;
  nextAction: string;
  timing: string;
  source: string;
  contact: string;
  consent: string;
};

export const stageOrder: StageId[] = ["nouveau", "contact", "confirme", "rendezvous", "estimation", "mandat"];

export const stageLabels: Record<StageId, string> = {
  nouveau: "Nouveau projet",
  contact: "Contact en cours",
  confirme: "Projet confirmé",
  rendezvous: "Rendez-vous",
  estimation: "Estimation",
  mandat: "Mandat",
};

export const stageReads: Record<StageId, string> = {
  nouveau: "Ce qui vient d’arriver",
  contact: "Ce qui avance après le premier échange",
  confirme: "Ce qui a été confirmé avec le propriétaire",
  rendezvous: "Ce qui est déjà dans l’agenda",
  estimation: "Ce qui demande une lecture du bien",
  mandat: "Ce qui produit le résultat commercial",
};

export const demoOpportunities: DemoOpportunity[] = [
  { id: "PV-0248", name: "Sophie Marchand", city: "Bordeaux", property: "Maison · 4 pièces", stage: "nouveau", intention: "Je pense vendre dans les six mois", nextAction: "Premier contact aujourd’hui", timing: "Reçu il y a 12 min", source: "Campagne locale · exemple", contact: "Réponse écrite souhaitée", consent: "Mise en relation choisie · démo" },
  { id: "PV-0241", name: "Léa Bernard", city: "Pessac", property: "Appartement · 3 pièces", stage: "rendezvous", intention: "Je prépare quelque chose", nextAction: "Confirmer le créneau de demain", timing: "Créneau proposé · 10 h 30", source: "Recherche locale · exemple", contact: "Rendez-vous demandé", consent: "Accord versionné · démo" },
  { id: "PV-0236", name: "Nicolas Martin", city: "Talence", property: "Maison · 5 pièces", stage: "contact", intention: "Je me renseigne", nextAction: "Répondre à sa question sur le calendrier", timing: "En attente depuis 1 jour", source: "Contenu local · exemple", contact: "Premier échange en cours", consent: "Accord versionné · démo" },
  { id: "PV-0229", name: "Camille Dubois", city: "Bordeaux", property: "Appartement · 2 pièces", stage: "confirme", intention: "Je pense vendre dans les six mois", nextAction: "Préparer la visite du bien", timing: "Projet confirmé · hier", source: "Campagne locale · exemple", contact: "Appel convenu", consent: "Accord versionné · démo" },
  { id: "PV-0214", name: "Alexandre Petit", city: "Mérignac", property: "Maison · 4 pièces", stage: "estimation", intention: "Je veux avancer bientôt", nextAction: "Partager la première lecture du bien", timing: "Visite effectuée · 2 jours", source: "Recherche locale · exemple", contact: "Suivi par e-mail", consent: "Accord versionné · démo" },
  { id: "PV-0198", name: "Inès Laurent", city: "Bègles", property: "Maison · 3 pièces", stage: "mandat", intention: "Projet confirmé", nextAction: "Consigner le résultat du mandat", timing: "Mandat signé · exemple", source: "Recommandation · exemple", contact: "Échange terminé", consent: "Dossier clos · démo" },
];

export const demoQueue = [
  { id: "PV-0248", label: "Premier contact", reason: "Le propriétaire a demandé une première réponse écrite et indique un horizon de six mois.", risk: "Répondre aujourd’hui maintient le contexte du projet.", age: "Reçu il y a 12 min", action: "Répondre" },
  { id: "PV-0241", label: "Rendez-vous à confirmer", reason: "Un créneau a été proposé pour demain à 10 h 30 ; il manque votre confirmation.", risk: "Le créneau peut être repris par le propriétaire.", age: "En attente depuis 2 h", action: "Confirmer" },
  { id: "PV-0236", label: "Question sans réponse", reason: "Nicolas attend des repères sur les étapes avant de prendre une décision.", risk: "Une réponse utile vaut mieux qu’une relance automatique.", age: "En attente depuis 1 jour", action: "Ouvrir le dossier" },
];

export const demoPipelineCounts: Record<StageId, number> = {
  nouveau: 5,
  contact: 5,
  confirme: 4,
  rendezvous: 2,
  estimation: 1,
  mandat: 1,
};

export const demoPerformance = {
  period: "Période exemple · 30 jours",
  acquisitionSpend: 1200,
  activeProjects: 18,
  appointments: 8,
  mandates: 2,
  costPerAppointment: 150,
  costPerMandate: 600,
  source: "Simulation interne — données non réelles",
};
