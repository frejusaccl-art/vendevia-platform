/*
 * Identité légale de l'éditeur. Renseignez ces champs UNE FOIS : mentions légales, CGU, CGV et politique de
 * confidentialité les reprennent automatiquement. Tant qu'un champ contient « [ », le bandeau
 * « à compléter » reste affiché sur les pages légales (il disparaît tout seul une fois tout rempli).
 */
export const COMPANY = {
  name: "[Dénomination sociale]",
  legalForm: "[forme juridique : SAS, SASU, SARL…]",
  capital: "[capital social] €",
  siren: "[SIREN]",
  rcs: "[ville du greffe]",
  vat: "[n° de TVA intracommunautaire]",
  address: "[adresse du siège social]",
  email: "[adresse e-mail de contact]",
  phone: "[téléphone]",
  director: "[nom du directeur de la publication]",
  host: "[nom, adresse et contact de l’hébergeur]",
  dpoContact: "[adresse e-mail dédiée aux demandes RGPD]",
  mediator: "[nom et coordonnées du médiateur de la consommation]",
  court: "[tribunal de commerce du siège]",
} as const;

export const BRAND = "Vendevia";
export const hasPlaceholders = Object.values(COMPANY).some((v) => v.includes("["));
