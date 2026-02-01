# /pause-dev - Pause Development

Sauvegarde l'état du développement avant de quitter la session.

## Instructions

### 1. Collecter l'état actuel

- Quels fichiers ont été créés/modifiés cette session ?
- Quelles features sont maintenant complètes ?
- Y a-t-il des tâches en cours non terminées ?
- Y a-t-il des blocages ?

### 2. Mettre à jour PAUSE-STATE.md

```markdown
# PAUSE-STATE - [Date] Session [N]

## ⚠️ MODULES COMPLETS - NE PAS REFAIRE

| Module | Status | Fichiers Clés |
|--------|--------|---------------|
| [Module 1] | ✅ COMPLET | `chemin/vers/fichiers` |
| [Module 2] | ✅ COMPLET | `chemin/vers/fichiers` |

## Contexte Actuel

[Description de l'état actuel du projet]

## Tâches Complétées (Session [N])

- [x] Tâche 1
- [x] Tâche 2
- [x] Tâche 3

## Fichiers Créés/Modifiés Session [N]

```
projet/
├── src/
│   ├── [fichier1]     # NEW/MOD - Description
│   └── [fichier2]     # NEW/MOD - Description
```

## Tâches Restantes

### Priorité Haute
- [ ] Tâche A
- [ ] Tâche B

### Priorité Moyenne
- [ ] Tâche C

## Point de Reprise

Pour reprendre le développement:
1. Lire ce fichier
2. Continuer avec [prochaine tâche]

## Notes Importantes

- [Notes spécifiques pour la reprise]
```

### 3. Mettre à jour DECISIONS-LOG.md si nécessaire

Si des décisions techniques ont été prises cette session, les documenter :

```markdown
## [Date] - [Titre de la décision]

### Contexte
[Pourquoi cette décision était nécessaire]

### Options Considérées
1. **Option A** - Avantages / Inconvénients
2. **Option B** - Avantages / Inconvénients

### Décision
**[Option choisie]**

### Conséquences
- [Impact de cette décision]
```

### 4. Confirmer la sauvegarde

Afficher un résumé :
- Nombre de modules complets
- Fichiers modifiés cette session
- Prochaine tâche recommandée

## Output

État sauvegardé. La session peut être reprise avec `/continue-dev`.
