import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const SESSION_COOKIE_NAME = 'admin-session'
const SESSION_SECRET = process.env.ADMIN_PASSWORD_HASH || ''

// Verify password against stored hash
export async function verifyPassword(password: string): Promise<boolean> {
  const storedHash = process.env.ADMIN_PASSWORD_HASH
  if (!storedHash) {
    console.error('ADMIN_PASSWORD_HASH not configured')
    return false
  }
  return bcrypt.compareSync(password, storedHash)
}

// Create a simple session token (using timestamp + hash portion for verification)
export function createSessionToken(): string {
  const timestamp = Date.now()
  const payload = `${timestamp}-${SESSION_SECRET.slice(0, 20)}`
  const token = Buffer.from(payload).toString('base64')
  return token
}

// Verify session token
export function verifySessionToken(token: string): boolean {
  try {
    const payload = Buffer.from(token, 'base64').toString('utf-8')
    const [timestamp, hashPortion] = payload.split('-')

    // Check if token is not too old (24 hours)
    const tokenAge = Date.now() - parseInt(timestamp, 10)
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    if (tokenAge > maxAge) {
      return false
    }

    // Verify hash portion matches
    return hashPortion === SESSION_SECRET.slice(0, 20)
  } catch {
    return false
  }
}

// Set session cookie
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  })
}

// Get session from cookie
export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE_NAME)
  return session?.value || null
}

// Clear session cookie
export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  if (!session) return false
  return verifySessionToken(session)
}

// Helper to generate password hash (run this once to generate your hash)
export function generatePasswordHash(password: string): string {
  return bcrypt.hashSync(password, 10)
}
