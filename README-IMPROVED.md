# AccessConfig - Version Améliorée

Une version améliorée du sélecteur de styles AccessConfig, avec des améliorations majeures pour une meilleure expérience utilisateur et une meilleure maintenabilité.

## Source Original

Ce projet est une version améliorée de [AccessConfig](https://github.com/access42/AccessConfig) de Access42.

## Améliorations Principales

### 1. Stockage des Préférences
- Utilisation de `localStorage` en priorité
- Fallback sur cookies si `localStorage` non disponible
- Meilleure persistance des données

### 2. Structure du Code
- Code organisé en petites fonctions spécialisées
- Meilleure séparation des responsabilités
- Code plus maintenable

### 3. Accessibilité
- Support multilingue (français/anglais)
- Meilleure gestion du focus
- Interface plus intuitive

### 4. Performances
- Code optimisé
- Chargement plus rapide
- Meilleure gestion des erreurs

## Installation

1. Copier le dossier `/js` à la racine de votre projet
2. Ajouter le script dans votre HTML :
```html
<script src="js/src/accessconfig.js"></script>
```

3. Initialiser AccessConfig avec le code suivant :
```html
<div data-accessconfig-params='{"Prefix":"ac"}'></div>
```

## Utilisation

Le module se charge automatiquement et crée un bouton "Paramètres d'accessibilité" qui ouvre une fenêtre modale avec les options suivantes :
- Contraste (par défaut, élevé, inversé)
- Taille du texte (par défaut, dyslexie)
- Images (par défaut, remplacement)
- Audio (par défaut)

## Documentation

Pour plus de détails sur les améliorations, consulter le fichier [IMPROVEMENTS.md](IMPROVEMENTS.md).

## Compatibilité

- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Navigateurs anciens avec polyfills
- Support multilingue

## Licences

Ce projet est sous licence MIT. Voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.
