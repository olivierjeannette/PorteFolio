# Portfolio Olivier

Portfolio professionnel moderne construit avec Next.js 15, Tailwind CSS et Framer Motion.

## 🚀 Stack Technique

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v3.4
- **Animations**: Framer Motion
- **UI Components**: Radix UI (primitives accessibles)
- **Theme**: next-themes (dark/light mode)
- **Icons**: Lucide React
- **Fonts**: Clash Display + Satoshi (via Fontshare)
- **Hosting**: Vercel

## 📁 Structure du Projet

```
src/
├── app/
│   ├── page.tsx          # Page d'accueil (Hero + Bio + Skills)
│   ├── projets/          # Galerie de projets
│   ├── cv/               # CV format canadien (FR/EN)
│   ├── diplomes/         # Diplômes & certifications
│   ├── armee/            # Parcours militaire
│   ├── layout.tsx        # Layout principal
│   └── globals.css       # Styles globaux
├── components/
│   ├── navigation.tsx    # Nav + theme toggle
│   ├── footer.tsx        # Footer
│   ├── animations.tsx    # Composants d'animation réutilisables
│   ├── pdf-modal.tsx     # Modal PDF fullscreen
│   ├── theme-provider.tsx
│   └── noise-overlay.tsx
├── data/
│   └── content.ts        # ⚡ TOUTES LES DONNÉES ICI
└── lib/
    └── utils.ts          # Utilitaires (cn function)
```

## ⚡ Personnalisation Rapide

### 1. Modifier le contenu

Toutes les données sont dans **`src/data/content.ts`** :

```typescript
// Informations personnelles
export const personalInfo = {
  name: 'Olivier',
  surname: 'VOTRE_NOM',  // ← À modifier
  email: 'votre@email.com',  // ← À modifier
  // ...
}

// Ajouter des projets
export const projects: Project[] = [
  {
    id: 'mon-projet',
    title: 'Mon Super Projet',
    // ...
  },
]

// Ajouter des expériences, diplômes, etc.
```

### 2. Ajouter votre photo

1. Placer votre photo dans `public/photo.jpg`
2. Dans `src/app/page.tsx`, décommenter le composant `<Image>` dans la section Bio

### 3. Ajouter des PDFs (diplômes)

1. Placer vos PDFs dans `public/diplomes/`
2. Dans `src/data/content.ts`, ajouter le chemin :
```typescript
{
  id: 'mon-diplome',
  title: 'Mon Diplôme',
  pdfUrl: '/diplomes/mon-diplome.pdf',  // ← Chemin
  // ...
}
```

### 4. Ajouter des images de projets

1. Placer les screenshots dans `public/projects/`
2. Décommenter les composants `<Image>` dans les pages projets

## 🎨 Personnalisation du Design

### Couleur d'accent

Dans `tailwind.config.ts`, modifier la palette `accent` :

```typescript
accent: {
  500: '#14b8a6',  // ← Couleur principale
  // ...
}
```

### Fonts

Les fonts sont chargées dans `globals.css`. Pour changer :

1. Choisir des fonts sur [Fontshare](https://www.fontshare.com/) ou Google Fonts
2. Modifier l'import dans `globals.css`
3. Mettre à jour les variables CSS `--font-*`

## 🚀 Déploiement

### Vercel (Recommandé)

1. Push le projet sur GitHub
2. Connecter le repo à [Vercel](https://vercel.com)
3. Déployer automatiquement

```bash
# Ou via CLI
npm i -g vercel
vercel
```

### Build local

```bash
npm run build
npm run start
```

## 📋 Checklist Avant Déploiement

- [ ] Modifier `personalInfo` dans `content.ts`
- [ ] Ajouter votre photo (`public/photo.jpg`)
- [ ] Compléter les projets avec vraies données
- [ ] Ajouter les PDFs de diplômes
- [ ] Remplir le parcours militaire
- [ ] Créer `public/cv.pdf` (votre CV téléchargeable)
- [ ] Mettre à jour les liens sociaux (LinkedIn, GitHub)
- [ ] Tester le responsive (mobile/tablet/desktop)
- [ ] Vérifier dark mode

## 🛠️ Commandes

```bash
npm run dev      # Développement (localhost:3000)
npm run build    # Build production
npm run start    # Servir le build
npm run lint     # Linter
```

## 📝 Notes Techniques

- **SEO**: Metadata configurée dans `layout.tsx`
- **Performance**: Images optimisées via Next.js Image
- **Accessibilité**: Composants Radix UI (keyboard nav, ARIA)
- **Animations**: Optimisées avec `will-change` et GPU acceleration
- **Dark Mode**: Persisté via `next-themes` (localStorage)

## 🤝 Support

Des questions ? Ouvre une issue ou contacte-moi directement.

---

Built with ❤️ using Next.js, Tailwind CSS & Framer Motion
