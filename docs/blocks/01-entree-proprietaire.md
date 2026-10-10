# Bloc 1 — Entrée propriétaire / Vendevia Maison

## Intention

Permettre à un propriétaire de commencer sans avoir décidé de vendre. La première expérience doit être calme, éditoriale et sans pression commerciale.

## Livré

- Landing Maison dédiée au propriétaire vendeur.
- Promesse : comprendre avant de décider.
- CTA principal : « Faire le point sur mon projet ».
- CTA secondaire : « Je veux seulement comprendre la valeur de mon bien ».
- Dossier vivant de démonstration avec adresse, contexte, première lecture et progression.
- Phrase de confiance : aucun contact automatique à cette étape.
- Durée estimée visible : environ 4 minutes.
- Route de première question : `/maison/projet/intention`.
- Question conversationnelle : « Où en est votre réflexion ? ».
- Quatre intentions avec explication de chacune.
- États fonctionnels : vide, erreur si aucune réponse, chargement court, succès enregistré.
- Respect de `prefers-reduced-motion` via le système global.
- Responsive mobile-first et composition desktop dédiée.

## Non livré volontairement

Le Bloc 1 ne contient pas encore l’adresse, le bien, la motivation, les coordonnées, les consentements, la recommandation d’agence, la persistance serveur ou le Desk agence. Ces éléments appartiennent aux blocs suivants.

## Critères de validation

Le propriétaire doit comprendre en moins de cinq secondes qu’il peut commencer sans avoir décidé de vendre. Il doit comprendre qu’aucun contact n’est déclenché sur cette première étape. Il doit pouvoir sélectionner une intention, obtenir une confirmation et modifier son choix. Aucun vocabulaire de lead, scoring, pipeline ou conversion ne doit apparaître.
