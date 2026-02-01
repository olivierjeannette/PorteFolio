# Configuration Claude AI

Ce dossier contient la configuration pour développer avec Claude AI de manière professionnelle et autonome.

## Structure

```
.claude/
├── settings.json          # Configuration projet (commandes, conventions, patterns)
├── settings.local.json    # Permissions locales (ne pas commit si sensible)
├── instructions.md        # Règles spécifiques au projet
├── README.md              # Ce fichier
└── commands/              # Commandes personnalisées
    ├── continue-dev.md    # Reprendre le développement
    ├── dev-status.md      # Afficher l'état
    ├── pause-dev.md       # Sauvegarder l'état
    ├── create-*.md        # Générateurs de code
    ├── *-audit.md         # Audits (sécurité, perf, archi)
    └── debug-issue.md     # Debugging systématique
```

## Utilisation

### Commandes Principales

| Commande | Description |
|----------|-------------|
| `/continue-dev` | Reprendre le développement depuis PAUSE-STATE.md |
| `/dev-status` | Afficher l'état actuel du développement |
| `/pause-dev` | Sauvegarder l'état avant de quitter |

### Générateurs de Code

| Commande | Génère |
|----------|--------|
| `/create-component [Name]` | Composant React |
| `/create-page [name]` | Page Next.js |
| `/create-action [name]` | Server Action |
| `/create-form [Name]` | Formulaire React Hook Form |
| `/create-hook [name]` | Custom Hook |
| `/create-store [name]` | Store Zustand |
| `/create-migration [name]` | Migration SQL |
| `/create-api-route [name]` | Route API |
| `/create-test [name]` | Tests Vitest |
| `/create-animation [name]` | Animation GSAP |

### Audits

| Commande | Description |
|----------|-------------|
| `/security-audit` | Audit OWASP complet |
| `/perf-audit` | Audit performance |
| `/arch-review` | Review architecture |

### Debugging

| Commande | Description |
|----------|-------------|
| `/debug-issue [desc]` | Process de debugging systématique |

## Configuration

### settings.json

- `projectName`: Nom du projet
- `conventions`: Règles de code (maxFileLines, framework, etc.)
- `patterns`: Chemins des différents types de fichiers
- `triggers`: Raccourcis de commandes

### instructions.md

Règles spécifiques au projet:
- Design system (couleurs, typographie)
- Structure de base de données
- Conventions de nommage
- Process de développement

## Intégration

### VS Code Extension

Les commandes sont automatiquement disponibles via Claude Code.

### CLI

```bash
# Dans le terminal
claude /create-component MemberCard
```

## Personnalisation

1. Modifier `settings.json` pour ajuster les conventions
2. Adapter `instructions.md` selon le projet
3. Ajouter/modifier les commandes dans `commands/`

## Bonnes Pratiques

1. **Toujours utiliser `/continue-dev`** pour reprendre le travail
2. **Toujours utiliser `/pause-dev`** avant de quitter
3. **Vérifier `PAUSE-STATE.md`** avant de créer une feature
4. **Logger les décisions** dans `DECISIONS-LOG.md`
5. **Ne jamais refaire un module COMPLET**
