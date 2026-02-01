# /create-hook [name] - Generate Custom React Hook

## Description
Creates a custom React hook following best practices.

## Arguments
- `$ARGUMENTS` : Hook name (camelCase, starts with "use") e.g., `useMembers`, `useWorkoutTimer`

## Instructions

### 1. VALIDATE FIRST
```bash
Grep: "export function $ARGUMENTS" in src/hooks/
```

### 2. DETERMINE HOOK TYPE

- **Data Hook** (fetching, caching) → uses React Query or SWR
- **State Hook** (local state) → uses useState, useReducer
- **Behavior Hook** (side effects) → uses useEffect, useCallback
- **Utility Hook** (helpers) → uses various hooks

### 3. DATA HOOK TEMPLATE

```typescript
// src/hooks/$ARGUMENTS.ts
'use client'

import { useState, useEffect, useCallback } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database'

type TableRow = Database['public']['Tables']['table_name']['Row']

interface Use$ARGUMENTSOptions {
  orgId?: string
  enabled?: boolean
}

interface Use$ARGUMENTSReturn {
  data: TableRow[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

export function $ARGUMENTS(options: Use$ARGUMENTSOptions = {}): Use$ARGUMENTSReturn {
  const { orgId, enabled = true } = options

  const [data, setData] = useState<TableRow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const supabase = createBrowserClient()

  const fetchData = useCallback(async () => {
    if (!orgId || !enabled) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase
        .from('table_name')
        .select('*')
        .eq('org_id', orgId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setData(data || [])
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch'))
    } finally {
      setIsLoading(false)
    }
  }, [orgId, enabled, supabase])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  }
}
```

### 4. STATE HOOK TEMPLATE

```typescript
// src/hooks/$ARGUMENTS.ts
'use client'

import { useState, useCallback } from 'react'

interface Use$ARGUMENTSOptions {
  initialValue?: string
  maxLength?: number
}

interface Use$ARGUMENTSReturn {
  value: string
  setValue: (value: string) => void
  reset: () => void
  isValid: boolean
}

export function $ARGUMENTS(options: Use$ARGUMENTSOptions = {}): Use$ARGUMENTSReturn {
  const { initialValue = '', maxLength = 100 } = options

  const [value, setValueInternal] = useState(initialValue)

  const setValue = useCallback((newValue: string) => {
    if (newValue.length <= maxLength) {
      setValueInternal(newValue)
    }
  }, [maxLength])

  const reset = useCallback(() => {
    setValueInternal(initialValue)
  }, [initialValue])

  const isValid = value.length > 0 && value.length <= maxLength

  return {
    value,
    setValue,
    reset,
    isValid,
  }
}
```

### 5. BEHAVIOR HOOK TEMPLATE

```typescript
// src/hooks/$ARGUMENTS.ts
'use client'

import { useEffect, useCallback, useRef } from 'react'

interface Use$ARGUMENTSOptions {
  interval?: number
  enabled?: boolean
  onTick?: () => void
}

interface Use$ARGUMENTSReturn {
  start: () => void
  stop: () => void
  isRunning: boolean
}

export function $ARGUMENTS(options: Use$ARGUMENTSOptions = {}): Use$ARGUMENTSReturn {
  const { interval = 1000, enabled = false, onTick } = options

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [isRunning, setIsRunning] = useState(enabled)

  const start = useCallback(() => {
    if (intervalRef.current) return

    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      onTick?.()
    }, interval)
  }, [interval, onTick])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }, [])

  useEffect(() => {
    if (enabled) {
      start()
    }

    return () => {
      stop()
    }
  }, [enabled, start, stop])

  return {
    start,
    stop,
    isRunning,
  }
}
```

### 6. EXPORT FROM INDEX
Add to `src/hooks/index.ts`:
```typescript
export { $ARGUMENTS } from './$ARGUMENTS'
```

### 7. CHECKLIST
- [ ] Proper TypeScript types for options and return
- [ ] useCallback for functions to prevent re-renders
- [ ] Cleanup in useEffect return
- [ ] Error handling
- [ ] Default values for options
- [ ] Documented parameters
- [ ] Follows React hooks rules (no conditional hooks)
