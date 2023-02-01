# Headless Gatsby front

## Installation des dépendances (nécéssite nodeJS)

Lancer la commande suivante :

```bash
npm install
```

## Compilation (!! Les fichiers compilés ne sont pas gittés !!!)

Les commandes sont listées dans le [package.json](package.json) dans la propriété "scripts"

### Commandes

-   **Watcher**

    -   Compile le scss au moindre changement

    -   Compile le js au moindre changement

    -   Recharge le navigateur à la fin de chaque compilation

    -   ```bash
        npm run start
        ```

-   **Clean**

    -   Supprime le dossier de build (public)

    -   ```bash
        npm run clean
        ```

-   **Build**

    -   Génère un build pour la production dans le dossier public, pensez à bien clean ce dossier avant de build

    -   ```bash
        npm run clean && npm run build
        ```

-   **Format**

    -   Lint & Prettier les assets à compiler (js & scss)

    -   ```bash
        npm run format
        ```

