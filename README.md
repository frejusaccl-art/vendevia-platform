# Vendevia Platform

Le nouveau produit Vendevia, construit à partir du document maître. Il organise le passage de l’intention d’un propriétaire au Projet Vendeur, puis au contact, rendez-vous, estimation et mandat.

## État

**Bloc 0 — socle technique, identité et séparation.**

Le prototype Webdev existant n’est pas la base de ce projet. Il reste séparé comme référence visuelle.

## Développement

```bash
pnpm dev
pnpm lint
pnpm build
```

## Routes du Bloc 0

- `/` — entrée publique et séparation des deux univers
- `/maison` — aperçu du dossier vivant propriétaire
- `/desk` — aperçu de la table de pilotage agence
- `/backoffice` — point d’entrée du back-office
- `/api/health` — état technique

Les données visibles sont explicitement des données de démonstration. Les flux métier, la base, l’authentification, l’attribution, les notifications et les intégrations seront construits dans les blocs suivants, après validation visuelle.
