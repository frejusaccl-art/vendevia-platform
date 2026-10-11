# Système d’expérience Vendevia

## Règle directrice

Vendevia doit être premium par la qualité de ses décisions d’interface, pas par une accumulation d’effets. Chaque mouvement sert l’orientation, la compréhension, la confirmation ou le rythme.

## Contraintes non négociables

Le système n’altère pas la logique métier, la base de données, l’authentification, les paiements, les crédits, les API ou les intégrations existantes. Il ne supprime aucune fonctionnalité. Avant chaque modification importante, les composants concernés sont identifiés et les routes existantes restent vérifiées.

## Motion system

Les effets simples utilisent CSS et JavaScript avec `transform`, `opacity` et transitions courtes. Les transitions d’entrée restent entre 180 et 760 ms selon leur rôle. Les interactions de clic ont un retour immédiat. Les états de chargement et de succès indiquent toujours un résultat réel. `prefers-reduced-motion` désactive les animations non nécessaires. Motion/Framer Motion, GSAP et Lottie restent optionnels et ne sont ajoutés que si le bénéfice dépasse le coût et la complexité.

## Parcours Maison

Le parcours reste une progression de dossier : intention, adresse, bien, rythme, puis restitution. Les cartes et textes courts remplacent les formulaires monotones. Chaque étape précise pourquoi la question est posée et ce qui se passe ensuite.

## Espace Desk

Le Desk doit répondre à trois questions : quoi traiter maintenant, pourquoi, et quelle action est possible. Les statistiques restent lisibles, les états vides expliquent quoi faire et l’onboarding donne un premier chemin sans masquer l’interface.

## Qualité

Une animation ne doit jamais empêcher une action, masquer une erreur ou ralentir un écran mobile. Les pages doivent rester compréhensibles sans animation, au clavier et sur écran tactile. Toute régression de route ou de build bloque la mise en production.
