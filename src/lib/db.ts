import { neon, NeonQueryFunction } from '@neondatabase/serverless'

// Create SQL query function (lazy initialization to avoid build errors)
let sqlClient: NeonQueryFunction<false, false> | null = null

function getSql(): NeonQueryFunction<false, false> {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set')
  }
  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL)
  }
  return sqlClient
}

// Diploma type matching database schema
export interface Diploma {
  id: number
  title: string
  title_fr: string | null
  institution: string
  institution_fr: string | null
  year: string
  category: 'fitness' | 'medical' | 'military' | 'tech' | 'business'
  pdf_url: string | null
  created_at: Date
  updated_at: Date
}

// Create diploma input type (for inserts)
export interface CreateDiplomaInput {
  title: string
  title_fr?: string
  institution: string
  institution_fr?: string
  year: string
  category: 'fitness' | 'medical' | 'military' | 'tech' | 'business'
  pdf_url?: string
}

// Initialize database table
export async function initDatabase() {
  const sql = getSql()
  await sql`
    CREATE TABLE IF NOT EXISTS diplomas (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      title_fr VARCHAR(255),
      institution VARCHAR(255) NOT NULL,
      institution_fr VARCHAR(255),
      year VARCHAR(20) NOT NULL,
      category VARCHAR(50) NOT NULL CHECK (category IN ('fitness', 'medical', 'military', 'tech', 'business')),
      pdf_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `
}

// Get all diplomas
export async function getDiplomas(): Promise<Diploma[]> {
  const sql = getSql()
  const rows = await sql`
    SELECT * FROM diplomas
    ORDER BY
      CASE category
        WHEN 'fitness' THEN 1
        WHEN 'medical' THEN 2
        WHEN 'military' THEN 3
        WHEN 'tech' THEN 4
        WHEN 'business' THEN 5
      END,
      year DESC
  `
  return rows as unknown as Diploma[]
}

// Get diploma by ID
export async function getDiplomaById(id: number): Promise<Diploma | null> {
  const sql = getSql()
  const rows = await sql`SELECT * FROM diplomas WHERE id = ${id}`
  const result = rows as unknown as Diploma[]
  return result[0] || null
}

// Create diploma
export async function createDiploma(data: CreateDiplomaInput): Promise<Diploma> {
  const sql = getSql()
  const rows = await sql`
    INSERT INTO diplomas (title, title_fr, institution, institution_fr, year, category, pdf_url)
    VALUES (
      ${data.title},
      ${data.title_fr || null},
      ${data.institution},
      ${data.institution_fr || null},
      ${data.year},
      ${data.category},
      ${data.pdf_url || null}
    )
    RETURNING *
  `
  const result = rows as unknown as Diploma[]
  return result[0]
}

// Update diploma
export async function updateDiploma(id: number, data: Partial<CreateDiplomaInput>): Promise<Diploma | null> {
  const sql = getSql()
  const rows = await sql`
    UPDATE diplomas
    SET
      title = COALESCE(${data.title || null}, title),
      title_fr = COALESCE(${data.title_fr || null}, title_fr),
      institution = COALESCE(${data.institution || null}, institution),
      institution_fr = COALESCE(${data.institution_fr || null}, institution_fr),
      year = COALESCE(${data.year || null}, year),
      category = COALESCE(${data.category || null}, category),
      pdf_url = COALESCE(${data.pdf_url || null}, pdf_url),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `
  const result = rows as unknown as Diploma[]
  return result[0] || null
}

// Delete diploma
export async function deleteDiploma(id: number): Promise<boolean> {
  const sql = getSql()
  const result = await sql`DELETE FROM diplomas WHERE id = ${id}`
  return (result as unknown as Diploma[]).length > 0
}

export { getSql as sql }
