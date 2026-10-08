# Bloc 0 — socle technique, identité et séparation

## Périmètre livré

Ce bloc installe le nouveau produit Vendevia dans un dépôt séparé du prototype Webdev. Il ne contient pas encore le tunnel propriétaire, l’authentification, la persistance métier, l’attribution, les paiements ou les intégrations.

La surface livrée pose :

- un socle Next.js App Router + TypeScript strict ;
- les routes publiques initiales `/`, `/maison`, `/desk` et `/backoffice` ;
- une route `/api/health` ;
- la marque et les tokens du dossier vivant ;
- une composition Maison éditoriale et non-dashboard ;
- une composition Desk orientée file d’action ;
- des données explicitement présentées comme démonstration ;
- les états et conventions qui seront étendus dans les prochains blocs.

## Critères de sortie

Le Bloc 0 est prêt pour validation lorsque les deux univers sont lisibles dès l’entrée, ne partagent pas la même composition, respectent la palette maître et fonctionnent sur mobile et desktop sans devenir une version empilée du même écran.

## Suite proposée

Après validation visuelle, le Bloc 1 construira l’entrée propriétaire réelle : landing de confiance, CTA unique, indication du temps, micro-texte de confidentialité et première étape du parcours.
