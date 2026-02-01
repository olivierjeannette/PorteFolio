# /arch-review - Architecture Review & Recommendations

## Description
Reviews current architecture and provides recommendations for improvements.

## Instructions

### 1. PROJECT STRUCTURE ANALYSIS
```bash
# Get folder structure
ls -la src/
ls -la src/app/
ls -la src/components/
ls -la src/lib/
```

**Expected Next.js 14+ Structure:**
```
src/
├── app/                    # App Router
│   ├── (auth)/             # Auth group (login, register)
│   ├── (dashboard)/        # Protected routes
│   │   ├── layout.tsx      # Dashboard layout with sidebar
│   │   ├── page.tsx        # Dashboard home
│   │   ├── members/
│   │   ├── settings/
│   │   └── ...
│   ├── (marketing)/        # Public pages
│   ├── api/                # API routes (if needed)
│   ├── layout.tsx          # Root layout
│   └── globals.css
├── components/
│   ├── ui/                 # Reusable UI (buttons, inputs)
│   ├── features/           # Domain components
│   ├── layout/             # Layout components (Sidebar)
│   └── providers/          # Context providers
├── lib/
│   ├── supabase/           # Supabase clients
│   │   ├── client.ts       # Browser client
│   │   ├── server.ts       # Server client
│   │   └── middleware.ts   # Auth middleware
│   └── utils.ts            # Utility functions
├── actions/                # Server Actions
├── hooks/                  # Custom hooks
├── types/                  # TypeScript types
│   ├── database.ts         # Generated Supabase types
│   └── index.ts            # App-specific types
└── stores/                 # Zustand stores
```

### 2. DATA FLOW ANALYSIS

**Verify patterns:**

| Pattern | Good | Bad |
|---------|------|-----|
| Data fetching | Server Components | useEffect + fetch |
| Mutations | Server Actions | API routes |
| Auth | Middleware + Server | Client-only |
| State | Zustand (client) | Context everywhere |

```bash
# Check for anti-patterns
Grep: "useEffect.*fetch" in src/
Grep: "'use client'" in src/app/**/page.tsx
Grep: "useState.*\[\].*setData" in src/
```

### 3. COMPONENT HIERARCHY

**Analyze:**
```bash
# Find all components
Glob: src/components/**/*.tsx
# Check for prop drilling
Grep: "props\." in src/components/ --count
```

**Rules:**
- [ ] Components < 200 lines
- [ ] Single responsibility
- [ ] Props interface defined
- [ ] No prop drilling > 2 levels (use context/store)
- [ ] Server vs Client components correctly chosen

### 4. STATE MANAGEMENT

```bash
# Find state patterns
Grep: "useState|useReducer" in src/
Grep: "createContext|useContext" in src/
Grep: "create\(" in src/stores/
```

**Recommendation:**
| State Type | Solution |
|------------|----------|
| Server data | Server Components |
| UI state | useState (local) |
| Global UI | Zustand |
| Forms | React Hook Form |
| URL state | nuqs / searchParams |

### 5. API DESIGN

```bash
# Check API patterns
Grep: "export async function" in src/actions/
ls src/app/api/
```

**Server Actions best practices:**
- [ ] Validation with Zod
- [ ] Auth check in each action
- [ ] Error handling with typed results
- [ ] Revalidation after mutations
- [ ] No sensitive logic exposed

### 6. DATABASE PATTERNS

```bash
# Check Supabase usage
Grep: "supabase\." in src/
Grep: "\.from\(|\.rpc\(" in src/
```

**Verify:**
- [ ] Using server client for Server Components
- [ ] Using browser client only in Client Components
- [ ] RLS policies in place
- [ ] Indexes on frequently queried columns
- [ ] No N+1 queries (use joins)

### 7. PERFORMANCE PATTERNS

```bash
# Check for performance issues
Grep: "import.*from 'lodash'" in src/
Grep: "moment|dayjs" in src/
Grep: "bundle-analyzer" in package.json
```

**Checklist:**
- [ ] Images use next/image
- [ ] Dynamic imports for heavy components
- [ ] Route segments properly split
- [ ] No full library imports (tree-shake)
- [ ] Fonts optimized (next/font)

### 8. GENERATE REPORT

```markdown
# Architecture Review - [Date]

## Current State
- Framework: Next.js [version]
- Database: Supabase
- Styling: Tailwind CSS
- State: [current solution]

## Strengths
1. [What's working well]
2. [Good patterns found]

## Issues Found

### Critical
1. **[Issue]** - [Location] - [Impact]

### Warnings
1. **[Issue]** - [Location] - [Impact]

### Suggestions
1. **[Improvement]** - [Benefit]

## Recommended Refactors
1. [ ] [Task 1] - Priority: High
2. [ ] [Task 2] - Priority: Medium
3. [ ] [Task 3] - Priority: Low

## Architecture Decisions to Document
| Decision | Context | Options | Choice | Rationale |
|----------|---------|---------|--------|-----------|
| | | | | |
```

### 9. PATTERNS TO ENFORCE

```typescript
// GOOD: Server Component with data fetching
// src/app/(dashboard)/members/page.tsx
export default async function MembersPage() {
  const supabase = await createServerClient()
  const { data } = await supabase.from('members').select('*')
  return <MemberList members={data} />
}

// GOOD: Client Component for interactivity
// src/components/features/MemberCard.tsx
'use client'
export function MemberCard({ member }: { member: Member }) {
  // interactive logic
}

// GOOD: Server Action for mutations
// src/actions/members.ts
'use server'
export async function createMember(input: CreateMemberInput) {
  // validation, auth, mutation
}

// BAD: useEffect for data fetching
useEffect(() => {
  fetch('/api/members').then(res => res.json()).then(setData)
}, [])
```
