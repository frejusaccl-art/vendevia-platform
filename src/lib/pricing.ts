/*
 * Modèle de prix : UN seul crédit, une seule valeur. Chaque service consomme un nombre différent de crédits.
 * Les prix publics d'origine sont conservés : 15 € / 35 € / 79 € à l'unité ; packs 165 € / 310 € / 590 €.
 */
export const CREDIT_VALUE_EUR = 1;

export const offers = [
  { name: "Contact vérifié", credits: 15, features: ["Contact téléphonique vérifié", "Informations de base", "Accès 7 jours"], featured: false },
  { name: "Lead vendeur qualifié", credits: 35, features: ["Projet confirmé", "Critères détaillés", "Accès 30 jours"], featured: true },
  { name: "Rendez-vous confirmé", credits: 79, features: ["Rendez-vous planifié", "Agent disponible", "Accès 30 jours"], featured: false },
] as const;

export const packs = [
  { name: "Pack Essentiel", price: 165, credits: 175 },
  { name: "Pack Pro", price: 310, credits: 350 },
  { name: "Pack Expert", price: 590, credits: 700 },
].map((p) => ({
  ...p,
  bonus: p.credits - p.price,
  saving: Math.round((1 - p.price / (p.credits * CREDIT_VALUE_EUR)) * 100),
}));
