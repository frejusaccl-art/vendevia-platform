# Bloc 7 — unification du front-end et avis

- Un seul design (maquette) ; l’ancien style Maison/Desk (lime/noir/cobalt) est supprimé, ses pages utiles sont reprises dans `/proprietaire/*` et `/agence/*` avec les mêmes données de démonstration (`src/lib/agency-demo.ts`).
- Avis : `src/lib/reviews*.ts`, `/api/avis`, modération `/backoffice/avis`. Les exemples sont étiquetés « Exemple » tant qu’aucun vrai avis n’existe.
- Hors périmètre : paiement, authentification, textes juridiques définitifs (placeholders entre crochets), photos professionnelles (déposer `public/images/<slug>.jpg`).
- Tarifs : les montants de la maquette (15/35/79 €, packs 165/310/590 €) sont ceux du design ; à confirmer commercialement.
