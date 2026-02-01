# /dev-status - Development Status

Affiche l'état actuel du développement du projet.

## Instructions

### 1. Lire les fichiers d'état

```bash
Read: docs/PAUSE-STATE.md
Read: docs/DECISIONS-LOG.md
```

### 2. Générer le rapport

```markdown
# 📊 Status Développement - [Date]

## ✅ Modules Complets
[Liste des modules marqués comme COMPLET dans PAUSE-STATE.md]

## 🚧 En Cours
[Module/feature actuellement en développement]

## 📋 À Faire
[Liste des prochaines tâches par priorité]

## 🔧 Décisions Récentes
[3-5 dernières décisions de DECISIONS-LOG.md]

## ⚠️ Blocages
[Éventuels blocages ou questions en attente]

## 📈 Stats
- Sessions complétées: X
- Fichiers créés cette session: X
- Dernière modification: [date]
```

### 3. Suggestions

Propose les prochaines actions recommandées basées sur :
- Les priorités du PRD
- Les dépendances entre modules
- Ce qui est bloquant

## Output

Afficher le rapport formaté dans la conversation.
