# Décision 0001 — nouveau produit indépendant

## Décision

Vendevia Maison / Desk est construit dans un dépôt GitHub privé distinct du prototype Webdev `/home/ubuntu/vendevia`. Le prototype reste une référence visuelle et ne partage ni code, ni données, ni configuration avec ce produit.

Le nouveau produit cible GitHub comme source de vérité et Vercel comme plateforme de Preview et de déploiement. Les environnements Development, Preview et Production sont séparés par leurs variables et leurs déploiements.

## Pourquoi

Le document maître demande une séparation durable entre le produit premium en construction et le prototype initial. Cette séparation permet de revenir à chaque version, de valider chaque bloc et d’éviter qu’une décision de démonstration ne devienne une dépendance métier.

## Conséquences

- Le nouveau dépôt peut évoluer indépendamment.
- Les routes Maison et Desk possèdent des compositions et des vocabulaires propres.
- Les données de démonstration ne sont pas confondues avec les données métier.
- Les choix backend et intégrations seront introduits au Bloc 9, après validation des flux.
