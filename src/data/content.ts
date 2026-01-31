// ============================================
// DONNÉES PERSONNELLES - À MODIFIER
// ============================================

export const personalInfo = {
  name: 'Olivier',
  surname: 'VOTRE_NOM', // À compléter
  title: 'Ops Architect • General Manager • AI-Augmented Builder',
  location: 'France → Calgary, Canada',
  email: 'votre@email.com', // À compléter
  linkedin: 'https://linkedin.com/in/votre-profil', // À compléter
  github: 'https://github.com/votre-profil', // À compléter
  
  // Bio courte pour le hero
  tagline: 'Je construis des systèmes qui tournent seuls.',
  
  // Bio complète
  bio: [
    "Entrepreneur et architecte opérationnel avec 5 ans d'expérience à la tête de La Skàli, une salle CrossFit/HYROX en France. J'ai transformé un concept en business rentable : de la construction physique à l'automatisation complète des opérations.",
    "Ma force : connecter les pièces. Backend, frontend, infrastructure, IA — je ne code pas \"pur\", je construis des systèmes qui fonctionnent. Chaque projet est une opportunité d'éliminer la friction et de créer de la valeur durable.",
    "Actuellement en transition vers Calgary, Canada. Je cherche des opportunités où mon profil hybride tech/business peut avoir un impact réel.",
  ],
}

// ============================================
// COMPÉTENCES
// ============================================

export const skills = {
  tech: {
    title: 'Tech & Ops',
    icon: 'Code2',
    items: [
      { name: 'Next.js / React', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'PostgreSQL / Supabase / Neon', level: 80 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Vercel / VPS Deployment', level: 85 },
      { name: 'API Integration', level: 85 },
      { name: 'AI/LLM Integration (Claude, GPT)', level: 90 },
    ],
  },
  business: {
    title: 'Business & Strategy',
    icon: 'TrendingUp',
    items: [
      { name: 'P&L Management', level: 90 },
      { name: 'Operations & Process Design', level: 95 },
      { name: 'Marketing Digital & SEO', level: 85 },
      { name: 'Sales & Negotiation', level: 80 },
      { name: 'Project Management', level: 90 },
      { name: 'Team Leadership', level: 85 },
    ],
  },
  soft: {
    title: 'Leadership',
    icon: 'Users',
    items: [
      { name: 'Problem Solving', level: 95 },
      { name: 'Decision Making Under Pressure', level: 90 },
      { name: 'Autonomous Execution', level: 95 },
      { name: 'Systems Thinking', level: 90 },
      { name: 'Adaptability', level: 90 },
    ],
  },
}

// ============================================
// PROJETS
// ============================================

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  stack: string[]
  image: string // chemin vers l'image dans /public/projects/
  liveUrl?: string
  githubUrl?: string
  metrics?: string[]
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'laskali-website',
    title: 'La Skàli - Site Web & Système de Réservation',
    description: 'Site vitrine + système de réservation intégré pour une salle CrossFit/HYROX',
    longDescription: 'Refonte complète du site web avec système de réservation temps réel, gestion des abonnements, et intégration SEO. Performance optimisée pour la conversion locale.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    image: '/projects/laskali.jpg',
    liveUrl: 'https://laskali.fr',
    metrics: ['Top 3 Google "CrossFit Laval"', '+40% conversion', '< 1s load time'],
    featured: true,
  },
  {
    id: 'scally-prog',
    title: 'Scally Prog - Gym Management App',
    description: 'Application de gestion de salle de sport avec programmation et suivi des membres',
    longDescription: 'Application custom développée pour remplacer les solutions SaaS coûteuses. Gestion des membres, programmation des WODs, tracking des performances, et facturation automatisée.',
    stack: ['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'Stripe'],
    image: '/projects/scallyprog.jpg',
    metrics: ['250€/mois économisés', '100% custom', 'Zero downtime'],
    featured: true,
  },
  {
    id: 'automation-suite',
    title: 'Suite d\'Automatisation Business',
    description: 'Ensemble de scripts et workflows pour automatiser les opérations quotidiennes',
    longDescription: 'Collection d\'outils d\'automatisation : facturation, relances email, reporting, synchronisation données. Intégration avec Claude AI pour les tâches complexes.',
    stack: ['Python', 'Node.js', 'Claude API', 'Make/Zapier', 'Google Sheets API'],
    image: '/projects/automation.jpg',
    metrics: ['10h/semaine gagnées', '0 erreur facturation', 'ROI 6 mois'],
    featured: true,
  },
  // Ajouter d'autres projets ici
]

// ============================================
// EXPÉRIENCE PROFESSIONNELLE (CV)
// ============================================

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string[]
  skills: string[]
}

export const experiences: Experience[] = [
  {
    id: 'laskali',
    title: 'Founder & General Manager',
    company: 'La Skàli - CrossFit/HYROX Gym',
    location: 'Laval, France',
    period: '2020 - Present',
    description: [
      'Built and scaled a CrossFit/HYROX gym from ground up to €120K annual revenue',
      'Managed full P&L, operations, marketing, and team of 5 coaches',
      'Developed custom management software replacing €3K/year SaaS solutions',
      'Achieved top 3 Google ranking for local CrossFit searches through SEO optimization',
      'Established partnerships with Gymlib, Wellpass, and HYROX affiliation',
      'Preparing business for sale with documented turnkey operations',
    ],
    skills: ['P&L Management', 'Team Leadership', 'Digital Marketing', 'Software Development', 'Sales'],
  },
  // Ajouter expériences précédentes
]

// ============================================
// ÉDUCATION & CERTIFICATIONS
// ============================================

export interface Education {
  id: string
  title: string
  institution: string
  year: string
  description?: string
  pdfUrl?: string // chemin vers le PDF dans /public/diplomes/
}

export const education: Education[] = [
  {
    id: 'crossfit-l2',
    title: 'CrossFit Level 2 Trainer',
    institution: 'CrossFit Inc.',
    year: '2021',
    pdfUrl: '/diplomes/crossfit-l2.pdf',
  },
  {
    id: 'crossfit-l1',
    title: 'CrossFit Level 1 Trainer',
    institution: 'CrossFit Inc.',
    year: '2020',
    pdfUrl: '/diplomes/crossfit-l1.pdf',
  },
  // Ajouter autres diplômes
]

// ============================================
// ARMÉE
// ============================================

export interface MilitaryItem {
  id: string
  type: 'service' | 'medal' | 'diploma'
  title: string
  description: string
  year: string
  pdfUrl?: string
  imageUrl?: string // pour les médailles
}

export const militaryRecord: MilitaryItem[] = [
  {
    id: 'service',
    type: 'service',
    title: 'Service Militaire',
    description: 'À compléter avec vos informations', // Détails de votre service
    year: '20XX - 20XX',
  },
  // Ajouter médailles et diplômes militaires
]

// ============================================
// NAVIGATION
// ============================================

export const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Projets', href: '/projets' },
  { name: 'CV', href: '/cv' },
  { name: 'Diplômes', href: '/diplomes' },
  { name: 'Armée', href: '/armee' },
]
