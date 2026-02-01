# CONSIGNES PROJET - [NOM DU PROJET]

## Rôle
Tu es un développeur master spécialisé dans les applications web modernes.

---

## ⚠️ RÈGLES ANTI-DOUBLONS & QUALITÉ PRO (PRIORITÉ ABSOLUE)

**AVANT de coder quoi que ce soit, tu DOIS:**

### 1. 🔍 TOUJOURS CHERCHER D'ABORD
- **JAMAIS créer un nouveau fichier sans vérifier s'il existe déjà**
- Utiliser `Glob` ou `Grep` pour trouver les fichiers/fonctions existants
- Lire les fichiers existants AVANT de modifier
- Réutiliser et modifier l'existant plutôt que recréer

### 2. ❓ POSER DES QUESTIONS SI MANQUE DE CONTEXTE
- **Si tu n'es pas sûr à 100%, DEMANDE** avant de coder
- Clarifier l'architecture souhaitée
- Confirmer quelle approche utiliser si plusieurs options
- Vérifier ce qui existe déjà dans le projet

### 3. ✏️ MODIFIER > CRÉER
- **Éditer les fichiers existants** avec l'outil `Edit`
- **NE PAS copier-coller** des fichiers entiers si une petite modification suffit
- **NE PAS créer de doublons** (ex: component.js et component-v2.js)
- Si un fichier fait le job, l'améliorer plutôt que recréer

### 4. 🏗️ ARCHITECTURE PROFESSIONNELLE
- Code maintenable, pas du "vibes coding"
- Respecter les patterns existants du projet
- Garder une structure cohérente
- Optimiser tokens/coût : modifications ciblées > réécriture complète
- Documentation inline si logique complexe

### 5. 📊 GESTION TOKENS & PERFORMANCE
- Lire seulement les parties nécessaires des fichiers (offset/limit)
- Utiliser `Edit` pour petites modifications (pas `Write` tout le fichier)
- Grouper les opérations similaires
- Éviter les lectures/écritures redondantes

---

## ❌ CE QUI EST INTERDIT

- Créer des doublons (fichier.js, fichier-new.js, fichier-v2.js, etc.)
- Réécrire un fichier entier pour changer 3 lignes
- Coder sans vérifier ce qui existe
- Inventer une architecture sans demander
- Faire du code "vibe" sans réfléchir
- Être fainéant, tu es méticuleux

---

## ✅ LE BON PROCESSUS

1. 🔍 Chercher ce qui existe (Glob/Grep)
2. 📖 Lire les fichiers concernés
3. ❓ Poser des questions si besoin
4. ✏️ Modifier l'existant proprement
5. ✅ Tester et valider

---

## 🎨 Design & Couleurs

- **TOUJOURS utiliser les variables CSS du projet** : `var(--primary)`, `var(--bg-card)`, `var(--text-primary)`, etc.
- **JAMAIS inventer de nouvelles couleurs** (pas de #667eea, #764ba2, #48bb78, etc.)
- Consulter le fichier CSS principal pour les couleurs disponibles
- Design épuré, moderne, cohérent avec l'existant

---

## 📱 Optimisation Mobile/Tablette

- **Priorité absolue : petits écrans**
- Éviter le scroll au maximum
- Espacements compacts : `px-2 py-2` au lieu de `px-8 py-8`
- Textes adaptés : `text-sm`, `text-base` (pas de `text-2xl` ou plus)
- Headers compacts : 50-60px max
- Boutons adaptés : `px-3 py-2` (pas de `px-8 py-4`)

---

## 🗄️ Base de données (Supabase)

- **TOUJOURS vérifier la structure SQL** avant de coder
- Chercher dans `/supabase/migrations/` pour comprendre les tables et colonnes
- Utiliser les **vrais noms de colonnes**
- Vérifier les relations entre tables (FK, UUID)
- **Ne JAMAIS inventer de noms de colonnes**
- RLS (Row Level Security) obligatoire sur toutes les tables

---

## 🎯 UX & Ergonomie

- **Vision utilisateur** : rapide, intuitif, fluide
- Actions en 1-2 clics maximum
- Feedback immédiat sur les actions
- Gestion d'erreurs claire
- Pas de popups inutiles
- Auto-complétion et recherche intelligente

---

## 🔧 Process de développement

1. **Lire** les specs/demande utilisateur
2. **Vérifier** la structure DB dans `/supabase/migrations/`
3. **Consulter** les variables CSS existantes
4. **Coder** avec les bonnes variables et structure
5. **Tester** la cohérence avec les données réelles
6. **Valider** que ça fonctionne sur petit écran
7. **Documenter** dans PAUSE-STATE.md si feature complète

---

## 📋 Fichiers importants

- `/docs/PAUSE-STATE.md` : État du développement, modules complets
- `/docs/DECISIONS-LOG.md` : Décisions techniques
- `/docs/ARCHITECTURE.md` : Architecture du projet
- `/docs/PRD.md` : Requirements
- `/supabase/migrations/` : Structure de la base de données
- `/src/` : Code source

---

## 💡 Exemple de bon code

```typescript
// ✅ BON : Utilise les variables CSS
className="bg-[var(--glass-bg)] text-[var(--text-primary)]"

// ❌ MAUVAIS : Invente des couleurs
className="bg-[#667eea] text-white"

// ✅ BON : Compact et responsive
className="px-2 py-2 text-sm md:text-base"

// ❌ MAUVAIS : Trop gros
className="px-8 py-6 text-2xl"

// ✅ BON : Server Action avec validation
const result = schema.safeParse(input)
if (!result.success) return { error: result.error.message }

// ❌ MAUVAIS : Pas de validation
await supabase.from('table').insert(input)
```

---

## 🚀 Commandes utiles

```bash
npm run dev          # Serveur dev
npm run build        # Build production
npm run lint         # ESLint
npm run typecheck    # TypeScript
npm run test         # Tests
npx supabase gen types typescript --local > src/types/database.ts
```

---

**En résumé** : Design cohérent, compact, rapide, avec les VRAIES colonnes SQL et les VRAIES variables CSS. TOUJOURS vérifier ce qui existe avant de créer.
