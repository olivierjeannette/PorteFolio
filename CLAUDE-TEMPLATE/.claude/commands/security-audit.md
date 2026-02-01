# /security-audit - Complete Security Audit

## Description
Performs a comprehensive security audit of the codebase following OWASP guidelines.

## Instructions

### 1. AUTH & SESSION SECURITY
```bash
# Check auth patterns
Grep: "supabase.auth" in src/
Grep: "getUser|getSession" in src/
Grep: "signIn|signUp|signOut" in src/
```

**Verify:**
- [ ] Server-side auth validation (not just client)
- [ ] Session cookies are httpOnly, secure, sameSite
- [ ] Auth state checked on every protected route
- [ ] No auth tokens in URLs or localStorage
- [ ] Password requirements enforced
- [ ] Rate limiting on auth endpoints

### 2. INPUT VALIDATION
```bash
# Find form handlers
Grep: "formData|FormData" in src/
Grep: "z\.object|z\.string" in src/
Grep: "sanitize|escape|encode" in src/
```

**Verify:**
- [ ] All inputs validated with Zod schemas
- [ ] Server-side validation (never trust client)
- [ ] Proper type coercion
- [ ] Max length limits on strings
- [ ] Enum validation for status fields
- [ ] File upload validation (type, size)

### 3. SQL INJECTION
```bash
# Find raw SQL
Grep: "\.rpc\(|\.sql\(|raw\(" in src/
Grep: "\$\{.*\}" in src/ --glob "*.sql"
Grep: "execute|query" in src/
```

**Verify:**
- [ ] No string concatenation in queries
- [ ] Use parameterized queries only
- [ ] RPC functions use SECURITY DEFINER carefully
- [ ] Input sanitized before RPC calls

### 4. XSS (Cross-Site Scripting)
```bash
# Find dangerous patterns
Grep: "dangerouslySetInnerHTML|innerHTML" in src/
Grep: "document\.write" in src/
Grep: "eval\(|Function\(" in src/
```

**Verify:**
- [ ] No dangerouslySetInnerHTML with user input
- [ ] React auto-escapes by default (verify edge cases)
- [ ] No eval() or Function()
- [ ] CSP headers configured
- [ ] Sanitize any HTML rendering (DOMPurify)

### 5. AUTHORIZATION (BROKEN ACCESS CONTROL)
```bash
# Check RLS policies
Grep: "CREATE POLICY|ENABLE ROW LEVEL SECURITY" in supabase/
# Check role checks
Grep: "role.*===|role.*!==|\.role" in src/
```

**Verify:**
- [ ] RLS enabled on ALL tables
- [ ] Policies check org_id (multi-tenant isolation)
- [ ] Role-based permissions (owner > admin > member)
- [ ] No direct table access bypassing RLS
- [ ] API routes validate permissions

### 6. SENSITIVE DATA EXPOSURE
```bash
# Find potential leaks
Grep: "password|secret|token|key|api_key" in src/
Grep: "console\.log|console\.error" in src/
Grep: "\.env|process\.env" in src/
```

**Verify:**
- [ ] No secrets in code (use env vars)
- [ ] .env.local in .gitignore
- [ ] Passwords never logged
- [ ] API responses don't leak sensitive fields
- [ ] Error messages don't expose internals

### 7. CSRF PROTECTION
```bash
# Check form actions
Grep: "action=|method=\"post\"" in src/
Grep: "csrfToken|csrf" in src/
```

**Verify:**
- [ ] Server Actions have implicit CSRF (Next.js 14+)
- [ ] API routes validate origin
- [ ] SameSite cookie attribute set

### 8. RATE LIMITING & DOS
```bash
Grep: "rateLimit|throttle" in src/
```

**Verify:**
- [ ] Rate limiting on auth endpoints
- [ ] Rate limiting on API routes
- [ ] Pagination on list queries
- [ ] Max file upload size
- [ ] Query complexity limits

### 9. SECURITY HEADERS
```bash
# Check next.config.js
Read: next.config.js (headers section)
```

**Required headers:**
```javascript
// next.config.js
headers: [
  {
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
      },
    ],
  },
]
```

### 10. DEPENDENCIES
```bash
# Check for vulnerabilities
npm audit
# Check outdated packages
npm outdated
```

### 11. OUTPUT REPORT

Generate `SECURITY_AUDIT.md`:
```markdown
# Security Audit Report - [Date]

## Summary
- Critical: X issues
- High: X issues
- Medium: X issues
- Low: X issues

## Findings

### [CRITICAL] Issue Name
- **Location:** file:line
- **Description:** What's wrong
- **Impact:** What could happen
- **Remediation:** How to fix

### [HIGH] Issue Name
...

## Recommendations
1. Priority fixes
2. Best practices to implement
3. Ongoing security measures
```

### 12. CHECKLIST FINAL
- [ ] Auth properly implemented
- [ ] All inputs validated
- [ ] No SQL injection vectors
- [ ] No XSS vulnerabilities
- [ ] RLS enforces multi-tenancy
- [ ] No sensitive data exposed
- [ ] CSRF protected
- [ ] Rate limiting in place
- [ ] Security headers configured
- [ ] Dependencies up to date
