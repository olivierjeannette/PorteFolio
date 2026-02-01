# /create-page [name] - Generate Next.js Dashboard Page

## Description
Creates a complete dashboard page with layout, loading, and error states.

## Arguments
- `$ARGUMENTS` : Page route name (kebab-case) e.g., `members`, `workout-history`, `settings`

## Instructions

### 1. VALIDATE FIRST
```bash
Glob: src/app/(dashboard)/$ARGUMENTS/**/*
```

If exists, ask user what to do.

### 2. DETERMINE PAGE TYPE
- **List Page** (display data grid/table)
- **Detail Page** (single item view)
- **Form Page** (create/edit)
- **Dashboard Page** (stats/widgets)

### 3. GENERATE FILE STRUCTURE

```
src/app/(dashboard)/$ARGUMENTS/
├── page.tsx          # Main page component
├── loading.tsx       # Suspense loading state
├── error.tsx         # Error boundary
├── layout.tsx        # Optional nested layout
└── _components/      # Page-specific components
    └── index.ts
```

### 4. PAGE.TSX TEMPLATE

```typescript
// src/app/(dashboard)/$ARGUMENTS/page.tsx
import { Suspense } from 'react'
import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// Page-specific components
import { $ARGUMENTSList } from './_components'

// ========================================
// METADATA
// ========================================
export const metadata = {
  title: '$ARGUMENTS | Mon App',
  description: 'Description de la page',
}

// ========================================
// DATA FETCHING
// ========================================
async function get$ARGUMENTSData(orgId: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from('table_name')
    .select('*')
    .eq('org_id', orgId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// ========================================
// PAGE COMPONENT
// ========================================
export default async function $ARGUMENTSPage() {
  const supabase = await createServerClient()

  // Auth check
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Get org context
  const { data: profile } = await supabase
    .from('profiles')
    .select('current_org_id')
    .eq('id', user.id)
    .single()

  if (!profile?.current_org_id) redirect('/onboarding')

  // Fetch data
  const data = await get$ARGUMENTSData(profile.current_org_id)

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">
          $ARGUMENTS
        </h1>
        {/* Actions */}
      </header>

      {/* Content */}
      <Suspense fallback={<Loading />}>
        <$ARGUMENTSList data={data} />
      </Suspense>
    </div>
  )
}

function Loading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-32 animate-pulse rounded-lg bg-white/5" />
      ))}
    </div>
  )
}
```

### 5. LOADING.TSX

```typescript
// src/app/(dashboard)/$ARGUMENTS/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-4 p-4">
      <div className="h-8 w-48 animate-pulse rounded bg-white/5" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-lg bg-white/5" />
        ))}
      </div>
    </div>
  )
}
```

### 6. ERROR.TSX

```typescript
// src/app/(dashboard)/$ARGUMENTS/error.tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        Une erreur est survenue
      </h2>
      <p className="text-sm text-[var(--text-secondary)]">
        {error.message || 'Impossible de charger la page'}
      </p>
      <Button onClick={reset} variant="outline">
        Réessayer
      </Button>
    </div>
  )
}
```

### 7. CHECKLIST
- [ ] Server Component for data fetching
- [ ] Auth check with redirect
- [ ] Org/Tenant context validation
- [ ] Loading state with skeleton
- [ ] Error boundary
- [ ] Metadata for SEO
- [ ] Mobile-first layout
- [ ] Uses CSS variables
