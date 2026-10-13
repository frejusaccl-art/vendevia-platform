# Vendevia — livraison du front-end

## Ce qui a été livré

Cette passe transforme le dépôt en prototype front-end complet et navigable pour les deux publics, à partir du document maître Vendevia. Le site présente le produit et ses parcours sans prétendre connecter une API, authentifier un compte ou transmettre des données.

### Site public

- Accueil de marque avec une proposition claire, deux entrées (propriétaire/agence), une illustration architecturale originale en SVG et les principaux repères de confiance.
- Présentation Maison, page agences, méthode, tarifs indicatifs sans prix inventé, zones pilotes, estimation, FAQ, contact, connexion/inscription, mentions légales, confidentialité et CGV.
- Navigation mobile accessible, pied de page cohérent, formulaires de démonstration explicitement locaux.

### Vendevia Maison

- Parcours propriétaire en 12 étapes numérotées, puis écran de suivi : intention, ville, type de bien, caractéristiques, horizon, motivations, rythme, restitution qualitative, choix de mise en relation, coordonnées conditionnelles, consentements séparés, confirmation et suivi.
- Validation de chaque étape, retour en arrière, progression, persistance uniquement en mémoire pendant la navigation.
- Coordonnées demandées seulement après le choix d’être accompagné. L’accord de mise en relation est distinct du consentement facultatif à la prospection.
- Pas de prix immobilier inventé, pas de contact automatique ni de transmission réelle.

### Vendevia Desk

- Navigation agence persistante : vue du jour, projets, pipeline, agenda, relances, performance, équipe, territoire, abonnement, paramètres et mise en route.
- File priorisée avec motif, échéance et action suivante ; dossier détaillé avec contexte, historique, consentement, maturité explicable et export CSV d’exemple.
- Filtres de projets, déplacements de pipeline, proposition de créneau, relances locales, capacité d’équipe réglable et configuration de territoire.
- Reporting avec définitions de calcul. Les noms, volumes et montants du tableau sont des données de démonstration, marquées comme telles.
- Back-office de démonstration orienté attribution, consentement, incidents, facturation et audit.

## Direction visuelle et références

La direction propre à Vendevia privilégie une mise en page éditoriale, des accents cobalt/lime, des tons papier/obsidienne, des repères architecturaux originaux et une hiérarchie produit lisible. Les références consultées ont servi de repères de qualité, pas de modèles à recopier :

- [Apple](https://www.apple.com/) — récit produit maîtrisé et retenue éditoriale.
- [Linear](https://linear.app/) — précision de l’interface et vocabulaire d’action.
- [Airbnb](https://www.airbnb.com/) — entrée par publics, confiance et action compréhensible.
- [Notion](https://www.notion.com/) et [Figma](https://www.figma.com/) — clarté de présentation d’un produit polyvalent.
- [Stripe](https://stripe.com/) et [Ramp](https://ramp.com/) — articulation de la preuve, du produit et des résultats.
- [Lemonade](https://www.lemonade.com/) — ton accessible pour un parcours où l’utilisateur peut hésiter.

Aucun asset externe n’a été repris : le motif architectural et les pictogrammes sont conçus en SVG dans le projet.

## Vérifications effectuées

- `pnpm lint` — succès.
- `pnpm build` — succès, routes pré-générées.
- Contrôle HTTP local des routes `/`, `/desk` et `/maison/projet/intention` — réponses 200.
- Contrôle navigateur de la page publique, du tableau Desk et du parcours Maison ; test de sélection d’intention puis navigation vers l’adresse.
- Captures Chromium à 390 × 844 px : tunnel propriétaire et tableau d’agence. Les blocs s’empilent, la navigation agence se replie et les actions gardent une largeur tactile.

## À brancher avant l’ouverture réelle

Le dépôt constitue un front-end de démonstration, pas un service prêt à collecter des informations réelles. Avant mise en production :

1. Ajouter une authentification, des rôles et contrôles d’accès côté serveur.
2. Brancher une API/base de données, la validation serveur, le chiffrement, la conservation et la suppression des dossiers.
3. Versionner, horodater et journaliser les consentements ; définir et tester l’attribution agence/zone/capacité.
4. Connecter l’agenda, les notifications, les exports sécurisés, les sources de campagnes et les résultats réels.
5. Définir l’offre, la facturation et les tarifs avec les agences pilotes — aucun paiement n’est possible ici.
6. Faire compléter et valider les mentions légales, la politique de confidentialité, les CGU/CGV et les textes de consentement avant collecte.
7. Remplacer les données et identités d’exemple par des données de test synthétiques contrôlées, puis vérifier les performances/accessibilité sur les appareils cibles.

Les formulaires de contact, coordonnées et préférences sont explicitement signalés comme non transmis. Ne pas inviter d’utilisateurs à saisir des coordonnées réelles dans cette version.
