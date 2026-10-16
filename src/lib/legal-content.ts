import { BRAND, COMPANY as C } from "./company";
import { CREDIT_VALUE_EUR, offers, packs } from "./pricing";

export type LegalSection = { title: string; body: string[] };
export type LegalPage = { title: string; intro?: string; sections: LegalSection[]; legal: boolean };

export const LEGAL_UPDATED = "Version du 16 octobre 2026";

const has = (v: string) => v.trim().length > 0;
const rcsPart = has(C.siren) ? `, immatriculée${has(C.rcs) ? ` au RCS de ${C.rcs}` : " au RCS"} sous le numéro ${C.siren}` : "";
const seat = has(C.address) ? `, dont le siège social est situé ${C.address}` : "";
const id = `${C.name}, ${C.legalForm} au capital de ${C.capital}${rcsPart}${seat} (ci-après « ${BRAND} »)`;
const compact = (list: (string | false)[]) => list.filter((x): x is string => Boolean(x));

export const legalPages: Record<string, LegalPage> = {
  "mentions-legales": {
    title: "Mentions légales",
    intro: `Informations d’identification de l’éditeur du site ${BRAND}, conformément à l’article 1-1 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique (LCEN).`,
    legal: true,
    sections: [
      { title: "Éditeur du site", body: compact([`${id}.`, has(C.vat) && `N° de TVA intracommunautaire : ${C.vat}.`, `Contact : ${C.email}${has(C.phone) ? ` · ${C.phone}` : ""}.`, `Directeur de la publication : ${C.director}.`]) },
      ...(has(C.host) ? [{ title: "Hébergement", body: [`Le site est hébergé par : ${C.host}.`] }] : []),
      { title: "Nature du service", body: [`${BRAND} est une plateforme logicielle (SaaS) de mise en relation entre des propriétaires qui envisagent de vendre un bien et des agences immobilières. ${BRAND} n’est pas une agence immobilière : elle ne négocie pas, ne reçoit aucun mandat, ne détient aucun fonds pour le compte de tiers et n’est pas rémunérée en fonction de la conclusion d’une vente.`] },
      { title: "Propriété intellectuelle", body: [`La marque, le logo, les textes, l’interface, les bases de données et le code du site sont protégés par le Code de la propriété intellectuelle. Toute reproduction, représentation ou extraction non autorisée est interdite.`] },
      { title: "Responsabilité et liens", body: [`${BRAND} s’efforce de fournir des informations exactes et à jour, sans garantir l’absence d’erreur ou d’interruption du service. Les liens vers des sites tiers n’engagent pas la responsabilité de ${BRAND} quant à leur contenu.`] },
      { title: "Données personnelles et cookies", body: [`Le traitement des données personnelles est décrit dans la politique de confidentialité ; l’usage des traceurs dans la politique relative aux cookies.`] },
      ...(has(C.mediator) ? [{ title: "Médiation de la consommation", body: [`Pour tout litige de consommation non résolu après une réclamation écrite auprès de ${BRAND}, le consommateur peut recourir gratuitement au médiateur : ${C.mediator}.`] }] : []),
      { title: "Droit applicable", body: ["Le site est soumis au droit français."] },
    ],
  },

  confidentialite: {
    title: "Politique de confidentialité",
    intro: "Votre projet de vente est une information personnelle. Voici, simplement et complètement, ce que nous en faisons (règlement (UE) 2016/679 « RGPD » et loi n° 78-17 du 6 janvier 1978 « Informatique et Libertés »).",
    legal: true,
    sections: [
      { title: "Responsable du traitement", body: [`${id}, est responsable du traitement des données collectées sur la plateforme. Contact pour toute question ou demande : ${C.dpoContact}.`, "Lorsqu’une agence reçoit votre projet avec votre accord, elle devient responsable, pour son propre compte, du traitement des données qui lui sont transmises."] },
      { title: "Données collectées", body: [
        "Propriétaires : description du bien (type, adresse, surface, pièces, état), projet et délai de vente, disponibilités, nom, e-mail, téléphone, préférences et choix de consentement.",
        "Agences : identité du représentant, coordonnées professionnelles, dénomination, SIREN, zone d’intervention, données de facturation et historique d’achats de crédits.",
        "Avis : prénom affiché, note et texte de l’avis.",
        "Données techniques : adresse IP (utilisée uniquement pour limiter les abus, conservée environ une heure) et données de sécurité.",
        "Nous ne collectons pas de données sensibles au sens de l’article 9 du RGPD et nous ne vous demandons rien dont nous n’avons pas besoin.",
      ] },
      { title: "Finalités et bases légales", body: [
        "Qualifier votre projet et le suivre : exécution de mesures précontractuelles prises à votre demande (art. 6.1.b).",
        "Transmettre vos coordonnées aux agences sélectionnées : votre consentement explicite, donné séparément et retirable à tout moment (art. 6.1.a).",
        "Gérer les comptes agences, vendre et facturer les crédits : exécution du contrat (art. 6.1.b) et obligations comptables (art. 6.1.c).",
        "Publier et modérer les avis : votre consentement (art. 6.1.a).",
        "Sécurité, prévention de la fraude et des abus : intérêt légitime (art. 6.1.f).",
        "Information sur notre service et envoi de nouveautés : uniquement si vous l’avez accepté, ou, pour les agences, dans le cadre de leur relation avec nous, avec possibilité de vous y opposer à chaque message.",
      ] },
      { title: "Destinataires", body: [
        "Les agences sélectionnées pour votre projet, et uniquement après votre accord.",
        "Nos sous-traitants, liés par contrat (art. 28 RGPD) : hébergeur, prestataire de base de données, prestataire de paiement, outils d’envoi d’e-mails.",
        "Les autorités habilitées, lorsque la loi l’exige. Nous ne vendons pas vos données.",
      ] },
      { title: "Transferts hors Union européenne", body: ["Nos prestataires peuvent être situés hors de l’Union européenne. Dans ce cas, le transfert est encadré par une décision d’adéquation (par ex. cadre de protection des données UE–États-Unis) ou par les clauses contractuelles types de la Commission européenne."] },
      { title: "Durées de conservation", body: [
        "Projet de vente non abouti : 3 ans à compter du dernier contact, puis suppression ou anonymisation.",
        "Compte agence : pendant la relation contractuelle, puis 3 ans à des fins de prospection ; pièces comptables et factures : durée légale de conservation (6 à 10 ans selon les cas).",
        "Avis publiés : tant que vous ne demandez pas leur retrait.",
        "Journaux techniques : 6 mois à 1 an au plus.",
      ] },
      { title: "Vos droits", body: [
        "Vous disposez des droits d’accès, de rectification, d’effacement, de limitation, de portabilité et d’opposition, du droit de retirer votre consentement à tout moment (sans effet sur le passé) et du droit de définir des directives sur le sort de vos données après votre décès.",
        `Écrivez à ${C.dpoContact} ; nous répondons dans un délai d’un mois (prorogeable de deux mois pour les demandes complexes). Une pièce d’identité peut être demandée en cas de doute raisonnable.`,
        "Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL (cnil.fr — 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07).",
      ] },
      { title: "Sécurité", body: ["Chiffrement des échanges (HTTPS), accès limités aux personnes qui en ont besoin, journalisation et séparation des environnements. Aucun mot de passe n’est stocké en clair."] },
      { title: "Mineurs et décisions automatisées", body: ["Le service s’adresse aux personnes majeures. Aucune décision produisant des effets juridiques à votre égard n’est prise de manière exclusivement automatisée."] },
      { title: "Cookies et traceurs", body: ["Voir la politique relative aux cookies. Le site n’utilise aucun traceur publicitaire."] },
      { title: "Évolution du texte", body: ["Cette politique peut évoluer ; la date de version figure en haut de page. Toute modification substantielle vous sera signalée."] },
    ],
  },

  cookies: {
    title: "Politique relative aux cookies",
    intro: "Ce que le site enregistre sur votre appareil, et pourquoi.",
    legal: true,
    sections: [
      { title: "Ce que nous utilisons", body: ["Le site n’utilise que des traceurs strictement nécessaires à son fonctionnement (par exemple la mémorisation locale de votre progression dans le formulaire ou d’un avis en cours de saisie). Ils sont exemptés de consentement (art. 82 de la loi « Informatique et Libertés »)."] },
      { title: "Ce que nous n’utilisons pas", body: ["Aucun cookie publicitaire, de profilage ou de réseau social n’est déposé."] },
      { title: "Mesure d’audience", body: ["Si nous activons un jour une mesure d’audience soumise à consentement, un bandeau vous permettra d’accepter ou de refuser aussi simplement, et votre choix sera conservé 6 mois au plus."] },
      { title: "Gérer vos choix", body: ["Vous pouvez supprimer à tout moment les données du site depuis les réglages de votre navigateur."] },
    ],
  },

  cgu: {
    title: "Conditions générales d’utilisation",
    intro: "Règles d’usage de la plateforme pour les visiteurs et les propriétaires.",
    legal: true,
    sections: [
      { title: "Objet", body: [`Les présentes conditions encadrent l’utilisation du site ${BRAND}, édité par ${id}.`, "Elles sont acceptées à l’ouverture d’un compte ou à l’envoi d’un projet."] },
      { title: "Un service gratuit pour les propriétaires", body: ["Décrire votre projet, suivre votre demande et consulter les informations du site est gratuit et sans engagement. Vous n’êtes jamais obligé de donner suite."] },
      { title: "Notre rôle", body: [
        `${BRAND} met en relation des propriétaires et des agences immobilières. ${BRAND} n’est pas une agence immobilière : elle n’estime pas votre bien à titre contractuel, ne négocie pas, ne reçoit aucun mandat, ne perçoit aucune commission sur votre vente et ne vous conseille ni juridiquement ni fiscalement.`,
        "Les agences sont des professionnels indépendants, seuls responsables de leurs propositions, de leurs honoraires et de leurs mandats. Vendevia leur demande de détenir la carte professionnelle exigée par la loi du 2 janvier 1970 (loi Hoguet).",
      ] },
      { title: "Votre accord de mise en relation", body: ["Vos coordonnées ne sont transmises à des agences qu’après votre accord explicite, recueilli séparément de l’envoi du projet. Vous pouvez le retirer à tout moment depuis votre espace ou en nous écrivant ; nous demanderons alors aux agences concernées de cesser tout contact."] },
      { title: "Vos engagements", body: ["Fournir des informations exactes et être en droit de vendre le bien ou d’en parler au nom de son propriétaire ; ne pas utiliser le service pour nuire, usurper une identité ou envoyer de faux projets ; ne pas tenter de perturber ou de contourner la sécurité du site."] },
      { title: "Avis et témoignages", body: [
        "Tout propriétaire ou agence peut publier un avis avec son prénom. Les avis ne sont pas vérifiés comme provenant d’une expérience de consommation et aucune contrepartie n’est offerte pour en publier (art. L111-7-2 du Code de la consommation).",
        "Chaque avis est relu avant publication pour écarter les contenus illicites, injurieux, publicitaires ou contenant des coordonnées personnelles. Les avis sont publiés dans l’ordre de leur validation, qu’ils soient positifs ou négatifs, et restent en ligne jusqu’à demande de retrait de leur auteur ou décision de modération motivée.",
      ] },
      { title: "Disponibilité et responsabilité", body: ["Le service est fourni en l’état et peut être interrompu pour maintenance. Dans les limites permises par la loi, la responsabilité de Vendevia ne peut être engagée pour les décisions prises par les agences ou les propriétaires, ni pour des dommages indirects."] },
      { title: "Propriété intellectuelle", body: ["Le site et ses contenus restent la propriété de leurs titulaires. Vous conservez vos droits sur vos contenus et nous concédez le droit de les afficher aux fins du service (par exemple un avis publié)."] },
      { title: "Modification, droit applicable, litiges", body: [`Nous pouvons modifier ces conditions ; la version en vigueur est celle affichée sur le site. Le droit français s’applique. En cas de litige, vous pouvez vous adresser à ${C.email}, puis, si vous êtes consommateur, ${has(C.mediator) ? `au médiateur : ${C.mediator}` : "à un médiateur de la consommation"}. À défaut, les tribunaux compétents sont ceux déterminés par le Code de procédure civile.`] },
    ],
  },

  cgv: {
    title: "Conditions générales de vente",
    intro: `Conditions applicables à l’achat et à l’utilisation de crédits ${BRAND} par les agences immobilières (professionnels, relations B2B).`,
    legal: true,
    sections: [
      { title: "Objet et parties", body: [`Les présentes conditions régissent la vente de crédits donnant accès aux services de mise en relation ${BRAND}, entre ${id}, et toute personne agissant à titre professionnel (« l’Agence »).`, "L’ouverture d’un compte ou l’achat de crédits vaut acceptation sans réserve des présentes conditions."] },
      { title: "Compte et conditions d’accès", body: ["L’Agence déclare être régulièrement immatriculée et, pour l’activité de transaction, titulaire de la carte professionnelle en cours de validité délivrée en application de la loi n° 70-9 du 2 janvier 1970 (et garantie financière et assurance de responsabilité civile professionnelle requises). Elle fournit son SIREN et s’engage à tenir ses informations à jour.", "Les identifiants sont personnels ; l’Agence répond de l’usage de son compte."] },
      { title: "Crédits : un seul crédit, une seule valeur", body: [
        `Un crédit a une valeur unique de ${CREDIT_VALUE_EUR} € HT, quel que soit le service auquel il est utilisé. Chaque service consomme un nombre de crédits différent :`,
        ...offers.map((o) => `${o.name} : ${o.credits} crédits (${o.credits * CREDIT_VALUE_EUR} € HT).`),
        "Le solde et les débits sont consultables à tout moment dans l’espace agence.",
      ] },
      { title: "Packs et prix", body: [
        "Les crédits s’achètent à l’unité (au tarif de base) ou en packs, qui incluent des crédits offerts :",
        ...packs.map((p) => `${p.name} : ${p.price} € HT pour ${p.credits} crédits (soit ${p.bonus} crédits offerts, ${p.saving} % d’économie).`),
        "Les prix sont exprimés en euros hors taxes ; la TVA au taux en vigueur s’ajoute. Les tarifs applicables sont ceux affichés sur la page Tarifs au moment de la commande.",
      ] },
      { title: "Paiement et facturation", body: ["Le paiement est exigible à la commande, par carte bancaire, Apple Pay ou Google Pay, via un prestataire de paiement sécurisé. Les crédits sont crédités après confirmation du paiement.", "Une facture est émise pour chaque achat et mise à disposition dans l’espace agence. En cas de retard de paiement de toute somme due, des pénalités sont exigibles de plein droit au taux de trois fois le taux d’intérêt légal, ainsi qu’une indemnité forfaitaire de 40 € pour frais de recouvrement (art. L441-10 et D441-5 du Code de commerce)."] },
      { title: "Validité et remboursement", body: [
        "Les crédits sont valables 12 mois à compter de l’achat ; passé ce délai, les crédits non utilisés sont perdus.",
        "Le droit légal de rétractation ne s’applique pas aux achats entre professionnels. À titre commercial, ${BRAND} rembourse néanmoins l’intégralité des crédits non utilisés d’un achat, sur simple demande écrite dans les 14 jours suivant celui-ci.".replace("${BRAND}", BRAND),
      ] },
      { title: "Qualité et remplacement", body: [
        "L’Agence peut demander le remplacement d’un lead dans les 7 jours suivant sa réception si : le contact est injoignable après plusieurs tentatives documentées sur au moins 3 jours ouvrés ; le bien est hors de la zone ou du type annoncé ; le projet est un doublon ; ou le propriétaire indique ne pas avoir consenti à la mise en relation.",
        "La demande est examinée sous 5 jours ouvrés. Si elle est acceptée, les crédits correspondants sont recrédités sur le compte (jamais remboursés en numéraire). Un projet jugé non conforme n’ouvre pas droit à remplacement lorsque l’Agence n’a pas tenté de le contacter.",
      ] },
      { title: "Obligations de l’Agence", body: [
        "Utiliser les coordonnées reçues uniquement pour le projet concerné, dans le respect du consentement du propriétaire, sans les céder ni les revendre.",
        "Agir comme responsable de traitement pour les données reçues (RGPD) : informer le propriétaire, respecter ses droits et son opposition, observer les règles de prospection (art. L34-5 du CPE, listes d’opposition au démarchage téléphonique).",
        "Contacter le propriétaire dans un délai raisonnable, loyalement, et ne lui facturer aucune somme pour la mise en relation. Ses honoraires éventuels relèvent de son seul mandat, conformément à la loi Hoguet.",
        "Ne pas détourner, copier ou extraire de manière automatisée les contenus de la plateforme.",
      ] },
      { title: "Nature du service et absence de garantie de résultat", body: [`${BRAND} fournit un service de mise en relation et de qualification, rémunéré par la vente de crédits, indépendamment de la conclusion de tout mandat ou de toute vente. ${BRAND} ne garantit ni un volume de projets, ni un taux de transformation, ni l’obtention d’un mandat.`] },
      { title: "Responsabilité", body: ["La responsabilité de Vendevia est limitée aux dommages directs et plafonnée au montant hors taxes effectivement payé par l’Agence au cours des 12 derniers mois, sauf faute lourde ou dolosive. Aucune responsabilité n’est encourue pour les dommages indirects (perte de chiffre d’affaires, de clientèle, d’image)."] },
      { title: "Suspension et résiliation", body: ["Vendevia peut suspendre ou fermer un compte en cas de manquement grave (usage non conforme des données, absence de carte professionnelle valide, fraude), après mise en demeure restée sans effet sous 8 jours, sauf urgence. L’Agence peut fermer son compte à tout moment ; les crédits non utilisés restent soumis à la section « Validité et remboursement »."] },
      { title: "Force majeure", body: ["Aucune des parties n’est responsable d’un manquement dû à un événement de force majeure au sens de l’article 1218 du Code civil."] },
      { title: "Droit applicable et tribunal compétent", body: [`Les présentes conditions sont soumises au droit français. À défaut de résolution amiable, tout litige relève ${has(C.court) ? `de ${C.court}` : "du tribunal de commerce compétent"}.`] },
    ],
  },

  faq: {
    title: "Questions fréquentes",
    intro: "Les réponses aux questions les plus courantes.",
    legal: false,
    sections: [
      { title: "Est-ce gratuit pour un propriétaire ?", body: ["Oui. Décrire votre projet et suivre votre demande est gratuit et sans engagement."] },
      { title: "Qui voit mes informations ?", body: ["Seules les agences sélectionnées pour votre projet, et uniquement après votre accord explicite, que vous pouvez retirer à tout moment."] },
      { title: "Suis-je obligé de signer avec une agence ?", body: ["Non. Vendevia n’est pas une agence et ne perçoit aucune commission sur votre vente : vous restez libre de ne donner aucune suite."] },
      { title: "Comment fonctionnent les crédits pour une agence ?", body: [`Un crédit vaut ${CREDIT_VALUE_EUR} € HT, toujours. Un contact vérifié coûte ${offers[0].credits} crédits, un lead vendeur qualifié ${offers[1].credits} et un rendez-vous confirmé ${offers[2].credits}. Les packs incluent des crédits offerts.`] },
      { title: "Que se passe-t-il si un lead ne correspond pas ?", body: ["L’agence peut demander son remplacement sous 7 jours ; les crédits lui sont alors recrédités."] },
      { title: "Combien de temps les crédits sont-ils valables ?", body: ["12 mois. Les crédits non utilisés sont remboursables sur demande dans les 14 jours suivant l’achat."] },
    ],
  },
};
