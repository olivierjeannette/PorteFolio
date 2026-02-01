# Portfolio - Olivier Jeannette "Jackson"

Portfolio professionnel moderne et bilingue (EN/FR) construit avec Next.js 15, conçu pour impressionner les recruteurs et entrepreneurs tech en Alberta, Canada.

## 🎯 Caractéristiques Clés

- **Bilingue Complet**: Anglais par défaut + Français, avec routing basé sur l'URL (`/en/*`, `/fr/*`)
- **Dark Mode**: Détection automatique des préférences système + toggle manuel
- **Design Responsive**: Mobile-first avec animations fluides Framer Motion
- **Formulaire de Contact**: WhatsApp intégré + formulaire email
- **Visualiseur PDF**: Modal pour afficher diplômes et certifications
- **SEO Optimisé**: Meta tags configurés pour le marché canadien

## 🚀 Stack Technique

- **Framework**: Next.js 15 (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS v3.4
- **Animations**: Framer Motion
- **Internationalisation**: next-intl
- **UI Components**: Radix UI (primitives accessibles)
- **Theme**: next-themes
- **Icons**: Lucide React
- **Fonts**: Clash Display + Satoshi

## 📁 Structure du Projet

```
src/
├── app/
│   ├── [locale]/              # Pages localisées
│   │   ├── page.tsx           # Homepage
│   │   ├── projects/          # Page Projets
│   │   ├── cv/                # Page CV/Resume
│   │   ├── diplomas/          # Page Diplômes
│   │   ├── military/          # Page Service Militaire
│   │   └── contact/           # Page Contact
│   ├── layout.tsx             # Root layout (minimal)
│   └── globals.css            # Styles globaux
├── components/                # Composants réutilisables
│   ├── navigation.tsx         # Nav + language switcher + theme toggle
│   ├── footer.tsx             # Footer
│   ├── animations.tsx         # Composants d'animation
│   ├── pdf-modal.tsx          # Modal PDF fullscreen
│   └── ...
├── data/
│   └── content.ts             # ⚡ TOUTES LES DONNÉES PERSONNELLES ICI
├── i18n/
│   ├── config.ts              # Configuration i18n
│   ├── request.ts             # Setup serveur
│   └── messages/              # Fichiers de traduction
│       ├── en.json
│       └── fr.json
└── lib/
    └── utils.ts               # Utilitaires
```

## ⚡ Démarrage Rapide

```bash
# Installation
npm install

# Développement
npm run dev

# Build production
npm run build

# Servir le build
npm run start
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## ✏️ Personnalisation

### Données Personnelles

Éditer `src/data/content.ts` pour modifier:
- Nom, email, téléphone, liens sociaux
- Compétences et niveaux
- Projets (URLs, descriptions, technologies)
- Expériences professionnelles
- Diplômes et certifications
- Parcours militaire

### Ajouter des Diplômes/Certifications

1. Placer les fichiers PDF dans `public/diplomes/`
2. Ajouter une entrée dans le tableau `education` de `content.ts`:
   ```typescript
   {
     id: 'mon-diplome',
     title: 'Nom du Diplôme',
     institution: 'Institution',
     year: '2024',
     pdfUrl: '/diplomes/mon-diplome.pdf',
     category: 'tech', // fitness, medical, military, tech, business
   }
   ```

### Ajouter des Projets

1. (Optionnel) Ajouter des images dans `public/projects/`
2. Ajouter une entrée dans le tableau `projects` de `content.ts`:
   ```typescript
   {
     id: 'project-id',
     title: 'Nom du Projet',
     description: 'Description courte',
     longDescription: 'Description détaillée',
     stack: ['Next.js', 'TypeScript'],
     image: '/projects/project.jpg',
     liveUrl: 'https://project.vercel.app',
     featured: true,
     category: 'web', // web, app, automation, other
   }
   ```

### Ajouter une Photo de Profil

1. Placer la photo dans `public/photo.jpg`
2. Modifier le placeholder dans `src/app/[locale]/page.tsx` (section Bio)

### Modifier les Traductions

Éditer les fichiers JSON dans `src/i18n/messages/`:
- `en.json` - Anglais
- `fr.json` - Français

## 🌐 Déploiement

### Vercel (Recommandé)

1. Push sur GitHub
2. Connecter le repo à Vercel
3. Déployer (configuration auto pour Next.js)

### Variables d'Environnement

Aucune requise pour le déploiement basique.

## 📱 Contact

- **Email**: olive.jackson22@gmail.com
- **WhatsApp**: +33 6 16 87 54 37
- **LinkedIn**: linkedin.com/in/olivier-jeannette

## 📋 Checklist Avant Déploiement

- [ ] Modifier `personalInfo` dans `content.ts`
- [ ] Ajouter photo de profil (`public/photo.jpg`)
- [ ] Compléter les projets avec vraies données et URLs
- [ ] Ajouter les PDFs de diplômes (`public/diplomes/`)
- [ ] Créer `public/cv.pdf` (CV téléchargeable)
- [ ] Mettre à jour liens LinkedIn et GitHub
- [ ] Tester responsive (mobile/tablet/desktop)
- [ ] Vérifier dark mode
- [ ] Vérifier les deux langues (EN/FR)

## 🎨 Personnalisation Design

### Couleur d'Accent

Dans `tailwind.config.ts`, modifier la palette `accent`:
```typescript
accent: {
  500: '#14b8a6',  // Couleur principale (teal)
  // ...
}
```

### Fonts

Les fonts sont chargées dans `globals.css`. Pour changer:
1. Choisir des fonts sur [Fontshare](https://www.fontshare.com/)
2. Modifier l'import dans `globals.css`
3. Mettre à jour les variables CSS `--font-*`

---

Built with ❤️ using Next.js 15, Tailwind CSS, Framer Motion & next-intl

© 2026 Olivier Jeannette - All rights reserved
