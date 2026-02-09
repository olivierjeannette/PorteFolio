// ============================================
// DONNÉES PERSONNELLES - Olivier Jeannette
// ============================================

export const personalInfo = {
  name: 'Olivier',
  surname: 'Jeannette',
  alias: 'Jackson',
  title: 'Digital Operations & Automation Specialist',
  location: 'Calgary, Alberta, Canada',
  email: 'olive.jackson22@gmail.com',
  whatsapp: '+33616875437',
  instagram: 'https://instagram.com/jackson.skali',
  linkedin: 'https://linkedin.com/in/olivier-jeannette',

  tagline: 'I build digital systems that drive measurable business growth.',
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
    id: 'digitalOperations',
    titleKey: 'digitalOperations',
    icon: 'Settings',
    color: 'blue',
    subcategories: [
      {
        titleKey: 'customSoftware',
        items: [
          { key: 'nextjs', level: 85 },
          { key: 'react', level: 85 },
          { key: 'typescript', level: 80 },
          { key: 'supabase', level: 85 },
          { key: 'tailwind', level: 90 },
        ],
      },
      {
        titleKey: 'processAutomation',
        items: [
          { key: 'make', level: 85 },
          { key: 'n8n', level: 80 },
          { key: 'apiIntegration', level: 85 },
          { key: 'webhooks', level: 80 },
        ],
      },
      {
        titleKey: 'aiIntegration',
        items: [
          { key: 'claudeCode', level: 95 },
          { key: 'cursorAI', level: 90 },
          { key: 'mcpServers', level: 80 },
        ],
      },
      {
        titleKey: 'cloudDeployment',
        items: [
          { key: 'vercel', level: 90 },
          { key: 'netlify', level: 85 },
          { key: 'github', level: 85 },
        ],
      },
    ],
  },
  {
    id: 'businessAutomation',
    titleKey: 'businessAutomation',
    icon: 'TrendingUp',
    color: 'green',
    subcategories: [
      {
        titleKey: 'digitalMarketing',
        items: [
          { key: 'seo', level: 80 },
          { key: 'metaAds', level: 75 },
          { key: 'googleAds', level: 70 },
          { key: 'contentStrategy', level: 80 },
        ],
      },
      {
        titleKey: 'revenueOps',
        items: [
          { key: 'salesFunnels', level: 85 },
          { key: 'conversionOpt', level: 80 },
          { key: 'crmAutomation', level: 85 },
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
    ],
  },
  {
    id: 'leadership',
    titleKey: 'leadership',
    icon: 'Users',
    color: 'purple',
    subcategories: [
      {
        titleKey: 'operationalLeadership',
        items: [
          { key: 'autonomousExecution', level: 95 },
          { key: 'crisisManagement', level: 95 },
          { key: 'systemsThinking', level: 90 },
          { key: 'crossFunctional', level: 90 },
          { key: 'adaptability', level: 95 },
          { key: 'decisionMaking', level: 90 },
        ],
      },
    ],
  },
]

// Simplified skills for CV display
export const skills = {
  digitalOperations: {
    title: 'Digital Operations & Development',
    icon: 'Settings',
    items: [
      { name: 'AI-Augmented Development (Claude Code)', level: 95 },
      { name: 'Next.js / React', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'Supabase / PostgreSQL', level: 85 },
      { name: 'Process Automation (Make, N8N)', level: 85 },
      { name: 'Cloud Deployment (Vercel, Netlify)', level: 90 },
    ],
  },
  businessAutomation: {
    title: 'Revenue & Growth Operations',
    icon: 'TrendingUp',
    items: [
      { name: 'Process Optimization', level: 95 },
      { name: 'P&L Management', level: 90 },
      { name: 'SEO & Digital Marketing', level: 85 },
      { name: 'CRM & Sales Automation', level: 85 },
      { name: 'Business Audit & Analysis', level: 90 },
    ],
  },
  leadership: {
    title: 'Operational Leadership',
    icon: 'Users',
    items: [
      { name: 'Autonomous Project Execution', level: 95 },
      { name: 'Crisis & High-Stakes Decision Making', level: 95 },
      { name: 'Systems Thinking & Strategic Planning', level: 90 },
      { name: 'Cross-functional Coordination', level: 90 },
      { name: 'Adaptability & Resourcefulness', level: 95 },
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
    title: 'SME Digital Transformation - La Skàli',
    description: 'End-to-end digital operations overhaul for a service-sector SME: custom software, automated workflows, and data-driven marketing.',
    longDescription: 'Complete digital transformation of a service-sector business from zero digital infrastructure to a fully automated operation generating €120K/year. Built custom management software (replacing €3K/year in SaaS), implemented automated billing and CRM workflows, developed SEO-optimized web presence achieving Top 3 Google ranking, and created data dashboards for real-time business intelligence.',
    stack: ['Next.js', 'Supabase', 'Tailwind CSS', 'Meta Ads', 'Make/N8N', 'SEO'],
    image: '/projects/laskali.jpg',
    liveUrl: 'https://laskali.eu',
    metrics: ['€120K annual revenue', 'Top 3 Google ranking', '€3K/year costs eliminated', '10h/week automated'],
    featured: true,
    category: 'web',
  },
  {
    id: 'scally-prog',
    title: 'Custom SaaS Replacement Platform',
    description: 'Bespoke business management application replacing expensive third-party SaaS subscriptions.',
    longDescription: 'Custom-built application that replaced multiple expensive SaaS subscriptions with a single tailored platform. Features member management, automated billing, performance tracking, and operational dashboards. Delivered €3K/year in direct cost savings with zero downtime.',
    stack: ['Next.js', 'React', 'Supabase', 'Tailwind CSS', 'Stripe'],
    image: '/projects/scallyprog.jpg',
    metrics: ['€250/month saved', '100% custom solution', 'Zero downtime'],
    featured: true,
    category: 'app',
  },
  {
    id: 'automation-suite',
    title: 'Business Process Automation Suite',
    description: 'Integrated automation workflows eliminating manual operational overhead across billing, CRM, and reporting.',
    longDescription: 'Comprehensive automation toolkit deployed across business operations: automated invoicing with zero-error billing, AI-powered follow-ups via Claude API integration, real-time reporting dashboards, and cross-platform data synchronization. Reduced manual operational time by 10+ hours per week.',
    stack: ['Make', 'N8N', 'Claude API', 'Google Sheets API', 'Webhooks'],
    image: '/projects/automation.jpg',
    metrics: ['10h/week recovered', 'Zero billing errors', '6-month ROI'],
    featured: true,
    category: 'automation',
  },
  {
    id: 'portfolio-v2',
    title: 'Professional Portfolio Platform',
    description: 'Modern bilingual web application with internationalization, dark mode, and PDF export capabilities.',
    longDescription: 'Full-stack web application built with Next.js 15 demonstrating modern development practices: bilingual internationalization (EN/FR), responsive design, smooth animations, PDF CV generation, and admin panel for content management.',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'next-intl'],
    image: '/projects/portfolio.jpg',
    liveUrl: 'https://joportefolio.vercel.app/',
    featured: true,
    category: 'web',
  },
  {
    id: 'nord-consulting',
    title: 'B2B Consulting Website',
    description: 'Performance-optimized corporate website designed for B2B client acquisition.',
    longDescription: 'Corporate web presence for a consulting firm, built with performance-first architecture, SEO optimization, and professional copywriting designed to convert B2B prospects into qualified leads.',
    stack: ['Next.js', 'Tailwind CSS', 'Netlify'],
    image: '/projects/nord.jpg',
    liveUrl: 'https://nordconsulting.netlify.app/',
    featured: false,
    category: 'web',
  },
  {
    id: 'hi-chrono',
    title: 'Specialized Timer Application',
    description: 'Multi-mode timer application designed for structured training environments.',
    longDescription: 'Professional-grade timer application with multiple operational modes (interval, countdown, circuit), customizable configurations, and session history tracking. Mobile-first responsive design with zero external dependencies.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    image: '/projects/hichrono.jpg',
    liveUrl: 'https://hi-chrono-x.vercel.app/',
    metrics: ['Multiple timer modes', 'Mobile-first design', 'Zero dependencies'],
    featured: false,
    category: 'app',
  },
  {
    id: 'sondage-skali',
    title: 'Customer Feedback & Analytics Tool',
    description: 'Data collection application for customer satisfaction tracking and service improvement.',
    longDescription: 'Custom survey and feedback tool designed to collect structured customer data, track satisfaction metrics, and generate actionable insights for service improvement. Data-driven approach to customer retention.',
    stack: ['React', 'Tailwind CSS', 'Netlify'],
    image: '/projects/sondage.jpg',
    liveUrl: 'https://sondageskali.netlify.app/',
    featured: false,
    category: 'app',
  },
]

// ============================================
// CASE STUDIES
// ============================================

export interface CaseStudy {
  id: string
  titleKey: string
  category: string
  industry: string
  duration: string
  metrics: {
    key: string
    value: string
    prefix?: string
    suffix?: string
  }[]
  featured: boolean
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'sme-digital-transformation',
    titleKey: 'smeTransformation',
    category: 'digital-transformation',
    industry: 'Service Sector',
    duration: '2021 - 2026',
    metrics: [
      { key: 'revenue', value: '120', suffix: 'K€' },
      { key: 'costSaved', value: '3', suffix: 'K€/yr' },
      { key: 'timeSaved', value: '10', suffix: 'h/wk' },
      { key: 'searchRanking', value: '3', prefix: 'Top ' },
    ],
    featured: true,
  },
  {
    id: 'automation-suite',
    titleKey: 'automationSuite',
    category: 'process-automation',
    industry: 'Cross-sector',
    duration: '2023 - 2026',
    metrics: [
      { key: 'timeSaved', value: '10', suffix: 'h/wk' },
      { key: 'errorRate', value: '0', suffix: '%' },
      { key: 'roi', value: '6', suffix: ' months' },
    ],
    featured: true,
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

// Experience IDs for i18n lookup
export const experienceIds = ['laskali', 'coaching-career', 'military'] as const

export const experiences: Experience[] = [
  {
    id: 'laskali',
    title: 'Digital Operations Manager & Founder',
    company: 'La Skàli (Service Sector SME)',
    location: 'Laval, France',
    period: '2021 - 2026',
    description: [],
    skills: ['Digital Infrastructure', 'Process Automation', 'Custom SaaS Development', 'SEO & Digital Marketing', 'Revenue Optimization', 'P&L Management'],
  },
  {
    id: 'coaching-career',
    title: 'Client Services & Business Development',
    company: 'Self-employed & Wakeup Form',
    location: 'Laval, France',
    period: '2018 - 2021',
    description: [],
    skills: ['Client Acquisition', 'Service Delivery', 'Business Development', 'Professional Certification'],
  },
  {
    id: 'military',
    title: 'Special Forces Operator - Combat Paramedic',
    company: '13ème RDP - French Army',
    location: 'France & Overseas',
    period: '2011 - 2018',
    description: [],
    skills: ['Crisis Operations Management', 'Medical Logistics', 'Leadership Under Pressure', 'High-Stakes Decision Making'],
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
export const educationIds = [
  'crossfit-l1',
  'bpjeps',
  'pilates',
  'sc-combat-2',
  'afgsu',
  'pse',
  'auxiliaire-ambulancier',
  'cte-auxiliaire-sanitaire',
  'brevet-para',
  'sc-combat-1',
  'sf-training',
  'staps',
  'bac'
] as const

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
    id: 'sc-combat-2',
    title: 'Sauvetage au Combat Niveau 2 (SC2)',
    institution: 'Armée de Terre - Forces Spéciales',
    year: '2015',
    category: 'military',
  },
  {
    id: 'afgsu',
    title: 'AFGSU Niveau 1 & 2',
    institution: 'Armée de Terre',
    year: '2014',
    description: 'Attestation de Formation aux Gestes et Soins d\'Urgence',
    category: 'medical',
  },
  {
    id: 'pse',
    title: 'PSE Niveau 1 & 2',
    institution: 'Armée de Terre',
    year: '2013',
    description: 'Premiers Secours en Équipe',
    category: 'medical',
  },
  {
    id: 'auxiliaire-ambulancier',
    title: 'Auxiliaire Ambulancier',
    institution: 'Armée de Terre',
    year: '2013',
    category: 'medical',
  },
  {
    id: 'cte-auxiliaire-sanitaire',
    title: 'Certificat Technique Élémentaire - Auxiliaire Sanitaire Spécialisé',
    institution: 'Armée de Terre',
    year: '2013',
    category: 'military',
  },
  {
    id: 'brevet-para',
    title: 'Brevet Militaire de Parachutisme',
    institution: 'Armée de Terre - Troupes Aéroportées',
    year: '2011',
    category: 'military',
  },
  {
    id: 'sc-combat-1',
    title: 'Sauvetage au Combat Niveau 1 (SC1)',
    institution: 'Armée de Terre',
    year: '2011',
    category: 'military',
  },
  {
    id: 'sf-training',
    title: 'Special Forces & Paratrooper Training',
    institution: 'French Army - 13ème RDP',
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
  {
    id: 'medal-outre-mer-afrique-1',
    type: 'medal',
    title: "Médaille d'Outre-Mer - Afrique (1)",
    description: 'Décoration pour service en opérations extérieures sur le théâtre africain',
  },
  {
    id: 'medal-outre-mer-afrique-2',
    type: 'medal',
    title: "Médaille d'Outre-Mer - Afrique (2)",
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
