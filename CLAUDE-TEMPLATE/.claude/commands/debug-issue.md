# /debug-issue [description] - Systematic Debugging

## Description
Systematic approach to debug issues efficiently.

## Arguments
- `$ARGUMENTS` : Issue description e.g., `form not submitting`, `auth redirect loop`, `data not loading`

## Instructions

### 1. GATHER CONTEXT (minimal reading)
```bash
# Find related files
Grep: "$ARGUMENTS" in src/

# Check recent changes (if git)
git log --oneline -10
git diff HEAD~3
```

### 2. CLASSIFY ISSUE TYPE

| Type | Symptoms | Likely Cause |
|------|----------|--------------|
| **Runtime Error** | Console error, crash | Code bug, null reference |
| **Build Error** | npm run build fails | TypeScript, import issue |
| **Data Issue** | Wrong/missing data | Query, RLS, schema |
| **Auth Issue** | Redirect loop, 401 | Session, middleware |
| **UI Issue** | Wrong rendering | State, props, CSS |
| **Performance** | Slow, freeze | N+1, memory leak |

### 3. QUICK DIAGNOSTICS

**For Runtime Errors:**
```bash
# Find error source
Grep: "error|Error|throw" in src/
# Check error boundaries
Grep: "ErrorBoundary|error\.tsx" in src/
```

**For Data Issues:**
```bash
# Check query
Grep: "from\('table_name'\)" in src/
# Check RLS
Grep: "CREATE POLICY.*table_name" in supabase/
```

**For Auth Issues:**
```bash
# Check middleware
Read: src/middleware.ts
# Check auth flow
Grep: "getUser|getSession" in src/
```

### 4. ISOLATION STRATEGY

```markdown
## Isolation Steps

1. **Reproduce** - Minimal steps to trigger issue
2. **Isolate** - Find smallest code causing issue
3. **Hypothesize** - What should happen vs what happens
4. **Test** - Verify hypothesis
5. **Fix** - Apply minimal fix
6. **Verify** - Confirm fix, no regressions
```

### 5. COMMON ISSUES & FIXES

#### Auth Redirect Loop
```typescript
// Problem: Middleware redirecting infinitely
// Check: Middleware matcher excludes auth routes
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|register|api/auth).*)',
  ],
}
```

#### Data Not Loading
```typescript
// Problem: useEffect not fetching
// Check 1: Dependencies array
useEffect(() => {
  fetchData()
}, [orgId]) // Missing dependency?

// Check 2: Conditional rendering
if (!orgId) return null // Component unmounts before fetch?

// Check 3: RLS policy
// User might not have access to the row
```

#### Form Not Submitting
```typescript
// Problem: Button click does nothing
// Check 1: Event handler attached
<form onSubmit={handleSubmit}> // Not onClick on button

// Check 2: Prevent default
async function handleSubmit(e: FormEvent) {
  e.preventDefault() // Prevents page reload
  // ...
}

// Check 3: Button type
<button type="submit"> // Not type="button"
```

#### Hydration Mismatch
```typescript
// Problem: Server/client HTML mismatch
// Fix 1: Use suppressHydrationWarning for dynamic content
<time suppressHydrationWarning>{new Date().toLocaleString()}</time>

// Fix 2: useEffect for client-only code
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return <Skeleton />
```

#### TypeScript Error
```typescript
// Problem: Type 'X' is not assignable to type 'Y'
// Check 1: Regenerate Supabase types
npx supabase gen types typescript --local > src/types/database.ts

// Check 2: Explicit typing
const data = result as ExpectedType[]

// Check 3: Null check
if (!data) return null
```

### 6. DEBUGGING TOOLS

```typescript
// Console debugging (remove before commit)
console.log('[DEBUG]', { variable, state, props })

// Breakpoint in VS Code
debugger; // Pauses execution

// Network inspection
// Check browser DevTools > Network tab

// React DevTools
// Check component props and state

// Supabase Studio
// Check actual data in database
```

### 7. LOG ANALYSIS

```bash
# Check server logs
npm run dev 2>&1 | grep -i error

# Check browser console
# Open DevTools > Console

# Check network requests
# DevTools > Network > Filter: Fetch/XHR
```

### 8. FIX VALIDATION

```markdown
## Before Committing Fix

- [ ] Issue is actually fixed (test scenario)
- [ ] No new console errors
- [ ] No TypeScript errors
- [ ] Related tests pass
- [ ] No regression in related features
- [ ] Fix is minimal (no over-engineering)
```

### 9. DOCUMENT IF RECURRING

```markdown
## Issue: [Description]

**Symptoms:**
- [What user sees]

**Root Cause:**
- [Why it happened]

**Fix:**
- [What was changed]

**Prevention:**
- [How to avoid in future]
```

### 10. ESCALATION PATH

```markdown
If stuck after 15 minutes:
1. Summarize what you've tried
2. Share exact error message
3. Share minimal reproduction
4. Ask for help (user/team)
```
