# CLAUDE-TEMPLATE - Ultimate Dev Process

> Template universel pour développer avec Claude AI de manière professionnelle et autonome.

## Quick Start

### 1. Copier dans votre projet

```bash
# Option A: Copier tout le dossier
cp -r CLAUDE-TEMPLATE/* /votre-projet/

# Option B: Copier fichier par fichier
cp CLAUDE-TEMPLATE/CLAUDE.md /votre-projet/
cp -r CLAUDE-TEMPLATE/.claude /votre-projet/
mkdir -p /votre-projet/docs
cp CLAUDE-TEMPLATE/docs/* /votre-projet/docs/
```

### 2. Personnaliser

1. **Modifier `CLAUDE.md`** - Ajuster selon votre méthodologie
2. **Modifier `.claude/settings.json`** - Configurer votre stack
3. **Modifier `.claude/instructions.md`** - Règles spécifiques au projet
4. **Initialiser `docs/PAUSE-STATE.md`** - Premier état

### 3. Commencer à développer

```bash
# Dans Claude Code
/continue-dev   # Reprendre le développement
/dev-status     # Voir l'état actuel
/pause-dev      # Sauvegarder avant de quitter
```

## Contenu du Template

```
CLAUDE-TEMPLATE/
├── CLAUDE.md                     # Process principal (Agents, Phases, Règles)
├── README.md                     # Ce fichier
├── .claude/
│   ├── settings.json             # Configuration projet
│   ├── settings.local.json       # Permissions (personnaliser)
│   ├── instructions.md           # Règles spécifiques projet
│   ├── README.md                 # Documentation .claude
│   └── commands/                 # 14 commandes personnalisées
│       ├── continue-dev.md
│       ├── dev-status.md
│       ├── pause-dev.md
│       ├── create-component.md
│       ├── create-page.md
│       ├── create-action.md
│       ├── create-form.md
│       ├── create-hook.md
│       ├── create-store.md
│       ├── create-migration.md
│       ├── create-api-route.md
│       ├── create-test.md
│       ├── create-animation.md
│       ├── security-audit.md
│       ├── perf-audit.md
│       ├── arch-review.md
│       └── debug-issue.md
└── docs/
    ├── PAUSE-STATE.md            # État du développement
    └── DECISIONS-LOG.md          # Log des décisions techniques
```

## Fonctionnalités

### 🤖 Agents Spécialisés

| Agent | Rôle |
|-------|------|
| @ANALYST | Brainstorming, Research, Project Brief |
| @PM | PRD, Requirements, User Stories |
| @ARCH | Architecture, Data Model, API Design |
| @UX | Design System, Wireframes, User Flows |
| @SM | Stories détaillées, Sprint Planning |
| @DEV | Implémentation, Code Quality |
| @QA | Tests, Code Review, Sécurité |
| @DOC | Documentation, Guides |

### 📊 Phases de Développement

1. **Analysis** (Optionnel) - Brainstorming, Project Brief
2. **Planning** (Requis) - PRD, Requirements
3. **Solutioning** (Recommandé) - Architecture, UX Specs
4. **Implementation** - Stories, Code, Tests

### 🛠️ Commandes Disponibles

#### Session Management
- `/continue-dev` - Reprendre le développement
- `/dev-status` - État actuel
- `/pause-dev` - Sauvegarder l'état

#### Code Generation
- `/create-component [Name]` - Composant React
- `/create-page [name]` - Page Next.js
- `/create-action [name]` - Server Action
- `/create-form [Name]` - Formulaire
- `/create-hook [name]` - Custom Hook
- `/create-store [name]` - Store Zustand
- `/create-migration [name]` - Migration SQL
- `/create-api-route [name]` - Route API
- `/create-test [name]` - Tests
- `/create-animation [name]` - Animations GSAP

#### Audits
- `/security-audit` - Audit OWASP
- `/perf-audit` - Audit performance
- `/arch-review` - Review architecture
- `/debug-issue [desc]` - Debugging

### ✅ Règles de Qualité

- **KISS** - Keep It Simple Stupid
- **YAGNI** - You Ain't Gonna Need It
- **DRY** - Don't Repeat Yourself
- **Anti-Doublons** - Toujours chercher avant de créer
- **Documentation** - Mettre à jour PAUSE-STATE.md après chaque feature

## Personnalisation par Type de Projet

### Web App (Next.js + Supabase)

```json
// .claude/settings.json
{
  "conventions": {
    "framework": "nextjs-14",
    "database": "supabase",
    "styling": "tailwind"
  }
}
```

### API Backend

```json
{
  "conventions": {
    "framework": "hono",
    "database": "postgresql",
    "runtime": "bun"
  }
}
```

### Mobile App

```json
{
  "conventions": {
    "framework": "react-native",
    "database": "supabase"
  }
}
```

## Workflow Recommandé

### Nouvelle Session

```
1. Ouvrir le projet dans Claude Code
2. /continue-dev → Claude lit PAUSE-STATE.md
3. Claude propose les prochaines tâches
4. Développer avec les commandes /create-*
5. /pause-dev avant de quitter
```

### Nouvelle Feature

```
1. Vérifier PAUSE-STATE.md (module existe déjà?)
2. /create-[type] pour générer le code
3. Implémenter la logique
4. Mettre à jour PAUSE-STATE.md
5. Logger décisions dans DECISIONS-LOG.md
```

### Debug

```
1. /debug-issue [description]
2. Suivre le process systématique
3. Documenter si problème récurrent
```

## Support

- Claude Code CLI: Compatible
- VS Code Extension: Compatible
- API: Compatible

## License

MIT - Utilisez librement pour vos projets.

---

*Template v3.0 - Basé sur BMAD v6*
*Optimisé pour Next.js, Supabase, TypeScript*
