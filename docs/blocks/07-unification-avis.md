# Bloc 7 — unification du front-end et avis

- Un seul design (maquette) ; l’ancien style Maison/Desk (lime/noir/cobalt) est supprimé, ses pages utiles sont reprises dans `/proprietaire/*` et `/agence/*` avec les mêmes données de démonstration (`src/lib/agency-demo.ts`).
- Avis : `src/lib/reviews*.ts`, `/api/avis`, modération `/backoffice/avis`. Les exemples sont étiquetés « Exemple » tant qu’aucun vrai avis n’existe.
- Hors périmètre : paiement, authentification, textes juridiques définitifs (placeholders entre crochets), photos professionnelles (déposer `public/images/<slug>.jpg`).
- Tarifs : les montants de la maquette (15/35/79 €, packs 165/310/590 €) sont ceux du design ; à confirmer commercialement.

## Commercialisation (SaaS)

- **Crédits** : `src/lib/pricing.ts`. 1 crédit = 1 € HT ; Contact vérifié 15, Lead qualifié 35, Rendez-vous 79 crédits ; packs 165/310/590 € → 175/350/700 crédits. Prix d’origine conservés.
- **Textes légaux** : `src/lib/legal-content.ts` (mentions légales LCEN art. 1-1, RGPD, CGU, CGV B2B, cookies). Identité de l’éditeur : à renseigner une fois dans `src/lib/company.ts`.
- **À faire valider par un avocat avant lancement** : (1) le modèle « crédits payés quel que soit le résultat » au regard de la loi Hoguet (aucune rémunération liée à la vente, aucun rôle de négociation) ; (2) la limitation de responsabilité et les délais de remplacement des CGV ; (3) le médiateur de la consommation.
- **Reste côté serveur (Bloc 9)** : authentification, paiement (Stripe), base de données, envoi d’e-mails, attribution des leads.
