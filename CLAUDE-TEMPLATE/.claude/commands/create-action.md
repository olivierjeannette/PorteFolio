# /create-action [name] - Generate Server Action

## Description
Creates a type-safe Server Action with validation and error handling.

## Arguments
- `$ARGUMENTS` : Action name (camelCase) e.g., `createMember`, `updateWorkout`, `deletePR`

## Instructions

### 1. VALIDATE FIRST
```bash
Grep: "export async function $ARGUMENTS" in src/actions/
```

### 2. DETERMINE ACTION CATEGORY
- **Auth Actions** → `src/actions/auth.ts`
- **Member Actions** → `src/actions/members.ts`
- **[Domain] Actions** → `src/actions/[domain].ts`

### 3. GENERATE ACTION

```typescript
// src/actions/[category].ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/server'
import { ActionResult } from '@/types/actions'

// ========================================
// VALIDATION SCHEMA
// ========================================
const $ARGUMENTSSchema = z.object({
  // Define fields with proper validation
  name: z.string().min(1, 'Le nom est requis').max(100),
  email: z.string().email('Email invalide').optional(),
  // Add more fields...
})

type $ARGUMENTSInput = z.infer<typeof $ARGUMENTSSchema>

// ========================================
// SERVER ACTION
// ========================================
export async function $ARGUMENTS(
  input: $ARGUMENTSInput
): Promise<ActionResult<{ id: string }>> {
  // 1. Validate input
  const validated = $ARGUMENTSSchema.safeParse(input)

  if (!validated.success) {
    return {
      success: false,
      error: validated.error.errors[0]?.message || 'Données invalides',
    }
  }

  // 2. Auth check
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return {
      success: false,
      error: 'Non authentifié',
    }
  }

  // 3. Get org context & permissions
  const { data: profile } = await supabase
    .from('profiles')
    .select('current_org_id, role')
    .eq('id', user.id)
    .single()

  if (!profile?.current_org_id) {
    return {
      success: false,
      error: 'Aucune organisation sélectionnée',
    }
  }

  // 4. Permission check (if needed)
  if (!['owner', 'admin'].includes(profile.role || '')) {
    return {
      success: false,
      error: 'Permission refusée',
    }
  }

  try {
    // 5. Execute database operation
    const { data, error } = await supabase
      .from('table_name')
      .insert({
        ...validated.data,
        org_id: profile.current_org_id,
        created_by: user.id,
      })
      .select('id')
      .single()

    if (error) throw error

    // 6. Revalidate cache
    revalidatePath('/dashboard/relevant-path')

    // 7. Return success
    return {
      success: true,
      data: { id: data.id },
    }
  } catch (error) {
    console.error('[$ARGUMENTS] Error:', error)

    return {
      success: false,
      error: error instanceof Error
        ? error.message
        : 'Une erreur est survenue',
    }
  }
}
```

### 4. ACTION RESULT TYPE

```typescript
// src/types/actions.ts
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string }
```

### 5. FORM USAGE EXAMPLE

```typescript
// In client component
'use client'

import { useTransition } from 'react'
import { $ARGUMENTS } from '@/actions/category'
import { toast } from 'sonner'

function MyForm() {
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await $ARGUMENTS({
        name: formData.get('name') as string,
        // ...
      })

      if (result.success) {
        toast.success('Succès!')
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <form action={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={isPending}>
        {isPending ? 'En cours...' : 'Envoyer'}
      </button>
    </form>
  )
}
```

### 6. CHECKLIST
- [ ] Zod validation schema
- [ ] Auth check
- [ ] Org/Tenant context check
- [ ] Permission check (role-based)
- [ ] Try/catch error handling
- [ ] Meaningful error messages (user's language)
- [ ] Cache revalidation
- [ ] TypeScript return type
- [ ] Logs for debugging
