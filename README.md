# Vendevia Platform

Le nouveau produit Vendevia, construit à partir du document maître. Il organise le passage de l’intention d’un propriétaire au Projet Vendeur, puis au contact, rendez-vous, estimation et mandat.

## État

Front-end unifié : **un seul style (celui de la maquette : vert profond, crème, titres en serif)** pour tout le site. Toutes les données sont des données de démonstration ; authentification, paiement et base de données relèvent du Bloc 9.

## Développement

```bash
pnpm dev
pnpm lint
pnpm build
```

## Routes

- `/` — accueil · `/tarifs` · `/a-propos` · `/contact` · `/legal/{confidentialite,mentions-legales,cgv,faq}`
- `/proprietaire/projet` — formulaire propriétaire en 9 étapes · `/proprietaire/tableau-de-bord`
- `/agence` — vue d’ensemble ; `/agence/{leads,a-traiter,pipeline,rendez-vous,equipes,credits,qualite,rapports,documents,parametres}` ; `/agence/dossier/[id]`
- `/connexion` · `/inscription`
- `/avis` — avis clients et agences (formulaire + liste)
- `/backoffice` · `/backoffice/avis` — modération (jeton `AVIS_ADMIN_TOKEN`)
- `/api/avis`, `/api/avis/moderation`, `/api/health`

Les anciennes routes (`/maison/*`, `/desk/*`, `/faq`, `/cgv`…) redirigent vers les nouvelles (voir `next.config.ts`).

## Avis partagés

Sans configuration, les avis restent dans le navigateur (démo). Pour qu’ils soient visibles par tous, définir `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` et `AVIS_ADMIN_TOKEN` (voir `.env.example`). Chaque avis est alors relu sur `/backoffice/avis` avant publication ; anti-spam : champ piège et 5 envois/heure/IP.
