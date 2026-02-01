// ============================================
// DONNÉES PERSONNELLES - Olivier Jeannette "Jackson"
// ============================================

export const personalInfo = {
  name: 'Olivier',
  surname: 'Jeannette',
  alias: 'Jackson',
  title: 'Web Developer • AI & Automation Specialist • Process Architect',
  location: 'France → Calgary, Alberta, Canada',
  email: 'olive.jackson22@gmail.com',
  whatsapp: '+33616875437',
  linkedin: 'https://linkedin.com/in/olivier-jeannette',
  github: 'https://github.com/olivier-jeannette',

  // Bio courte pour le hero
  tagline: 'I build systems that run themselves.',
}

// ============================================
// COMPÉTENCES HIÉRARCHIQUES
// ============================================

export interface SkillItem {
  key: string
  level: number // 0-100
}

export interface SkillSubCategory {
  titleKey: string
  items: SkillItem[]
}

export interface SkillCategory {
  id: string
  titleKey: string
  icon: string
  color: string
  subcategories: SkillSubCategory[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'dev',
    titleKey: 'dev',
    icon: 'Code2',
    color: 'blue',
    subcategories: [
      {
        titleKey: 'aiCoding',
        items: [
          { key: 'claudeCode', level: 95 },
          { key: 'cursorAI', level: 90 },
          { key: 'apiIntegration', level: 85 },
          { key: 'mcpServers', level: 80 },
        ],
      },
      {
        titleKey: 'frontend',
        items: [
          { key: 'react', level: 85 },
          { key: 'nextjs', level: 85 },
          { key: 'typescript', level: 80 },
          { key: 'tailwind', level: 90 },
          { key: 'html', level: 90 },
        ],
      },
      {
        titleKey: 'backend',
        items: [
          { key: 'supabase', level: 85 },
          { key: 'postgresql', level: 80 },
          { key: 'neon', level: 75 },
          { key: 'nodejs', level: 75 },
        ],
      },
      {
        titleKey: 'deployment',
        items: [
          { key: 'vercel', level: 90 },
          { key: 'netlify', level: 85 },
          { key: 'vps', level: 70 },
          { key: 'github', level: 85 },
        ],
      },
      {
        titleKey: 'automation',
        items: [
          { key: 'make', level: 85 },
          { key: 'n8n', level: 80 },
          { key: 'zapier', level: 75 },
        ],
      },
      {
        titleKey: 'tools',
        items: [
          { key: 'vscode', level: 95 },
          { key: 'notion', level: 90 },
          { key: 'discord', level: 85 },
          { key: 'msOffice', level: 85 },
          { key: 'davinci', level: 70 },
        ],
      },
    ],
  },
  {
    id: 'business',
    titleKey: 'business',
    icon: 'TrendingUp',
    color: 'green',
    subcategories: [
      {
        titleKey: 'marketing',
        items: [
          { key: 'digitalMarketing', level: 85 },
          { key: 'seo', level: 80 },
          { key: 'metaAds', level: 75 },
          { key: 'googleAds', level: 70 },
          { key: 'contentStrategy', level: 80 },
        ],
      },
      {
        titleKey: 'sales',
        items: [
          { key: 'salesStrategy', level: 90 },
          { key: 'negotiation', level: 85 },
          { key: 'salesFunnels', level: 85 },
          { key: 'conversionOpt', level: 80 },
        ],
      },
      {
        titleKey: 'operations',
        items: [
          { key: 'processOpt', level: 95 },
          { key: 'businessAudit', level: 90 },
          { key: 'plManagement', level: 90 },
          { key: 'projectMgmt', level: 85 },
        ],
      },
      {
        titleKey: 'events',
        items: [
          { key: 'eventPlanning', level: 80 },
          { key: 'teamBuilding', level: 85 },
          { key: 'communityMgmt', level: 80 },
        ],
      },
    ],
  },
  {
    id: 'leadership',
    titleKey: 'leadership',
    icon: 'Users',
    color: 'purple',
    subcategories: [
      {
        titleKey: 'softSkills',
        items: [
          { key: 'autonomy', level: 95 },
          { key: 'adaptability', level: 95 },
          { key: 'stressManagement', level: 95 },
          { key: 'problemSolving', level: 95 },
          { key: 'decisionMaking', level: 90 },
          { key: 'systemsThinking', level: 90 },
        ],
      },
    ],
  },
  {
    id: 'health',
    titleKey: 'health',
    icon: 'Heart',
    color: 'red',
    subcategories: [
      {
        titleKey: 'medical',
        items: [
          { key: 'combatParamedic', level: 95 },
          { key: 'tccc', level: 95 },
          { key: 'civilFirstAid', level: 90 },
          { key: 'militaryFirstAid', level: 95 },
        ],
      },
      {
        titleKey: 'fitness',
        items: [
          { key: 'crossfitL1', level: 90 },
          { key: 'nutritionCoaching', level: 75 },
        ],
      },
    ],
  },
]

// Simplified skills for CV display
export const skills = {
  tech: {
    title: 'Development & Tech',
    icon: 'Code2',
    items: [
      { name: 'AI-Augmented Development (Claude Code)', level: 95 },
      { name: 'Next.js / React', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'Supabase / PostgreSQL', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Automation (Make, N8N)', level: 85 },
      { name: 'Deployment (Vercel, Netlify)', level: 90 },
    ],
  },
  business: {
    title: 'Business & Strategy',
    icon: 'TrendingUp',
    items: [
      { name: 'Process Optimization', level: 95 },
      { name: 'P&L Management', level: 90 },
      { name: 'Digital Marketing & SEO', level: 85 },
      { name: 'Sales & Funnels', level: 85 },
      { name: 'Business Audit', level: 90 },
    ],
  },
  leadership: {
    title: 'Leadership & Soft Skills',
    icon: 'Users',
    items: [
      { name: 'Autonomous Execution', level: 95 },
      { name: 'Stress Management (Combat-tested)', level: 95 },
      { name: 'Problem Solving', level: 95 },
      { name: 'Adaptability', level: 95 },
      { name: 'Decision Making Under Pressure', level: 90 },
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
  image: string
  liveUrl?: string
  githubUrl?: string
  metrics?: string[]
  featured: boolean
  category: 'web' | 'app' | 'automation' | 'other'
}

export const projects: Project[] = [
  {
    id: 'laskali-eu',
    title: 'La Skàli - CrossFit/HYROX Gym',
    description: 'Full business I built from scratch: website, booking system, marketing, and custom software',
    longDescription: 'Complete gym business I founded and scaled to €120K/year. Built the entire digital infrastructure: SEO-optimized website (Top 3 Google), booking system, member management app, Meta Ads campaigns, sales funnels, and automation workflows. All while coaching 72h/week for 6 years.',
    stack: ['Next.js', 'Supabase', 'Tailwind CSS', 'Meta Ads', 'Make/N8N', 'SEO'],
    image: '/projects/laskali.jpg',
    liveUrl: 'https://laskali.eu',
    metrics: ['€120K/year revenue', 'Top 3 Google "CrossFit Laval"', '€3K/year SaaS replaced', '6 years solo operation'],
    featured: true,
    category: 'web',
  },
  {
    id: 'portfolio-v2',
    title: 'Portfolio - Olivier Jeannette',
    description: 'Modern bilingual portfolio with i18n, dark mode, and professional design',
    longDescription: 'Personal portfolio built with Next.js 15, featuring full English/French internationalization, dark mode, smooth animations with Framer Motion, and professional copywriting targeted at Alberta recruiters.',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'next-intl'],
    image: '/projects/portfolio.jpg',
    liveUrl: 'https://joportefolio.vercel.app/',
    featured: true,
    category: 'web',
  },
  {
    id: 'hi-chrono',
    title: 'Hi-Chrono X',
    description: 'Advanced timer application for CrossFit and HYROX workouts',
    longDescription: 'Professional workout timer with multiple modes (AMRAP, EMOM, Tabata, For Time), customizable intervals, and workout history tracking. Built for athletes and coaches.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    image: '/projects/hichrono.jpg',
    liveUrl: 'https://hi-chrono-x.vercel.app/',
    metrics: ['Multiple timer modes', 'Mobile-first design', 'Zero dependencies'],
    featured: true,
    category: 'app',
  },
  {
    id: 'nord-consulting',
    title: 'Nord Consulting',
    description: 'Professional consulting website with modern design',
    longDescription: 'Corporate website for a consulting firm, featuring clean design, optimized performance, and professional copywriting to attract B2B clients.',
    stack: ['Next.js', 'Tailwind CSS', 'Netlify'],
    image: '/projects/nord.jpg',
    liveUrl: 'https://nordconsulting.netlify.app/',
    featured: true,
    category: 'web',
  },
  {
    id: 'sondage-skali',
    title: 'Sondage Skàli',
    description: 'Survey application for gym member feedback',
    longDescription: 'Custom survey tool built for La Skàli gym to collect member feedback, track satisfaction, and improve services based on data-driven insights.',
    stack: ['React', 'Tailwind CSS', 'Netlify'],
    image: '/projects/sondage.jpg',
    liveUrl: 'https://sondageskali.netlify.app/',
    featured: false,
    category: 'app',
  },
  {
    id: 'scally-prog',
    title: 'Scally Prog - Gym Management App',
    description: 'Custom gym management software with member tracking and billing',
    longDescription: 'Bespoke application developed to replace expensive SaaS solutions. Features member management, WOD programming, performance tracking, and automated billing.',
    stack: ['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'Stripe'],
    image: '/projects/scallyprog.jpg',
    metrics: ['€250/month saved', '100% custom', 'Zero downtime'],
    featured: true,
    category: 'app',
  },
  {
    id: 'automation-suite',
    title: 'Business Automation Suite',
    description: 'Collection of automation workflows for daily operations',
    longDescription: 'Comprehensive automation toolkit: invoicing, email follow-ups, reporting, data synchronization. Integrated with Claude AI for complex task handling.',
    stack: ['Make', 'N8N', 'Claude API', 'Google Sheets API', 'Webhooks'],
    image: '/projects/automation.jpg',
    metrics: ['10h/week saved', 'Zero billing errors', '6-month ROI'],
    featured: false,
    category: 'automation',
  },
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

// Experience IDs for i18n lookup - 3 main blocks: La Skàli, Coaching Career, Military
export const experienceIds = ['laskali', 'coaching-career', 'military'] as const

export const experiences: Experience[] = [
  {
    id: 'laskali',
    title: 'Founder & General Manager',
    company: 'La Skàli - CrossFit/HYROX Gym',
    location: 'Laval, France',
    period: '2021 - 2026',
    description: [],
    skills: ['Web Development', 'AI & Automation', 'Digital Marketing', 'Meta Ads', 'SEO', 'Sales Funnels', 'P&L Management', 'Process Optimization'],
  },
  {
    id: 'coaching-career',
    title: 'Sports Coach & Fitness Professional',
    company: 'Auto-entrepreneur & Wakeup Form Laval',
    location: 'Laval, France',
    period: '2018 - 2021',
    description: [],
    skills: ['Personal Training', 'Client Management', 'Program Design', 'BPJEPS Certification'],
  },
  {
    id: 'military',
    title: 'Special Forces Operator - Combat Paramedic',
    company: '13ème RDP - French Army',
    location: 'France',
    period: '2011 - 2018',
    description: [],
    skills: ['Combat Medical Care', 'Leadership Under Fire', 'Crisis Management', 'High-Stress Decision Making'],
  },
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
  pdfUrl?: string
  category: 'fitness' | 'medical' | 'tech' | 'business' | 'military'
}

// Education IDs for i18n lookup
export const educationIds = ['crossfit-l1', 'bpjeps', 'pilates', 'sf-training', 'psc-pse', 'sc-combat', 'staps', 'bac'] as const

export const education: Education[] = [
  {
    id: 'crossfit-l1',
    title: 'CrossFit Level 1 Trainer',
    institution: 'CrossFit Inc.',
    year: '2020',
    pdfUrl: '/diplomes/crossfit-l1.pdf',
    category: 'fitness',
  },
  {
    id: 'bpjeps',
    title: 'BPJEPS AF - Weightlifting/Bodybuilding',
    institution: 'Formation BPJEPS',
    year: '2019 - 2020',
    category: 'fitness',
  },
  {
    id: 'pilates',
    title: 'Pilates Certification',
    institution: 'Pilates Training',
    year: '2019',
    category: 'fitness',
  },
  {
    id: 'sf-training',
    title: 'Special Forces & Paratrooper Training',
    institution: 'French Army - 13ème RDP',
    year: '2011 - 2018',
    category: 'military',
  },
  {
    id: 'psc-pse',
    title: 'PSC1 / PSE1 / PSE2 / AFGSU 1 & 2',
    institution: 'French Army',
    year: '2011 - 2018',
    category: 'medical',
  },
  {
    id: 'sc-combat',
    title: 'Combat First Aid Level 1 & 2',
    institution: 'French Army - Special Forces',
    year: '2011 - 2018',
    category: 'military',
  },
  {
    id: 'staps',
    title: 'First Year STAPS (Sports Science)',
    institution: 'STAPS Font-Romeu',
    year: '2009 - 2010',
    category: 'fitness',
  },
  {
    id: 'bac',
    title: 'Scientific Baccalaureate - Biology',
    institution: 'Lycée Pablo Picasso, Perpignan',
    year: '2009',
    category: 'fitness',
  },
]

// ============================================
// ARMÉE / MILITARY RECORD
// ============================================

export interface MilitaryItem {
  id: string
  type: 'service' | 'medal' | 'diploma' | 'skill'
  title: string
  description: string
  year?: string
  pdfUrl?: string
  imageUrl?: string
}

export const militaryRecord: MilitaryItem[] = [
  {
    id: 'service-sf',
    type: 'service',
    title: 'French Special Forces',
    description: 'Served in an elite unit of the French Army, specializing in high-risk operations',
    year: 'Classified',
  },
  {
    id: 'role-paramedic',
    type: 'service',
    title: 'Combat Paramedic',
    description: 'Primary role as tactical medical specialist, responsible for team health and emergency care in hostile environments',
  },
  // Décorations françaises
  {
    id: 'medal-outre-mer-afrique',
    type: 'medal',
    title: "Médaille d'Outre-Mer - Afrique",
    description: 'Décoration pour service en opérations extérieures sur le théâtre africain',
  },
  {
    id: 'medal-outre-mer-moyen-orient',
    type: 'medal',
    title: "Médaille d'Outre-Mer - Moyen-Orient",
    description: 'Décoration pour service en opérations extérieures sur le théâtre moyen-oriental',
  },
  {
    id: 'medal-defense-nationale-argent',
    type: 'medal',
    title: 'Médaille de la Défense Nationale - Échelon Argent',
    description: 'Agrafe "Service de Santé" & "Missions d\'Opérations Extérieures"',
  },
]

// Skills acquired in military - for display
export const militarySkills = [
  'Tactical Combat Casualty Care (TCCC)',
  'High-Stress Decision Making',
  'Team Operations in Hostile Environments',
  'Emergency Response & Triage',
  'Physical & Mental Resilience',
  'Leadership Under Fire',
]

// ============================================
// PROJECT URLS - Easy addition
// ============================================

export const projectUrls = {
  portfolio: 'https://joportefolio.vercel.app/',
  hiChrono: 'https://hi-chrono-x.vercel.app/',
  nordConsulting: 'https://nordconsulting.netlify.app/',
  sondageSkali: 'https://sondageskali.netlify.app/',
}
