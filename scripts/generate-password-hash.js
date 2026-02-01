/**
 * Generate a bcrypt hash for your admin password
 *
 * Usage:
 *   node scripts/generate-password-hash.js "your-password"
 *
 * Then copy the output to your .env.local file:
 *   ADMIN_PASSWORD_HASH=<output>
 */

const bcrypt = require('bcryptjs')

const password = process.argv[2]

if (!password) {
  console.error('Usage: node scripts/generate-password-hash.js "your-password"')
  process.exit(1)
}

const hash = bcrypt.hashSync(password, 10)
console.log('\nYour password hash:')
console.log(hash)
console.log('\nAdd this to your .env.local file:')
console.log(`ADMIN_PASSWORD_HASH=${hash}`)
