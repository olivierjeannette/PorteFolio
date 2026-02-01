# /create-store [name] - Generate Zustand Store

## Description
Creates a Zustand store with TypeScript and persist middleware.

## Arguments
- `$ARGUMENTS` : Store name (camelCase) e.g., `userStore`, `workoutStore`, `uiStore`

## Instructions

### 1. VALIDATE FIRST
```bash
Grep: "create$ARGUMENTS|$ARGUMENTSStore" in src/stores/
```

### 2. BASIC STORE TEMPLATE

```typescript
// src/stores/$ARGUMENTS.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// ========================================
// TYPES
// ========================================
interface Item {
  id: string
  name: string
  // ... other fields
}

interface $ARGUMENTSState {
  // Data
  items: Item[]
  selectedId: string | null
  isLoading: boolean
  error: string | null
}

interface $ARGUMENTSActions {
  // Actions
  setItems: (items: Item[]) => void
  addItem: (item: Item) => void
  updateItem: (id: string, updates: Partial<Item>) => void
  removeItem: (id: string) => void
  setSelectedId: (id: string | null) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

type $ARGUMENTSStore = $ARGUMENTSState & $ARGUMENTSActions

// ========================================
// INITIAL STATE
// ========================================
const initialState: $ARGUMENTSState = {
  items: [],
  selectedId: null,
  isLoading: false,
  error: null,
}

// ========================================
// STORE
// ========================================
export const use$ARGUMENTS = create<$ARGUMENTSStore>()(
  devtools(
    (set, get) => ({
      // State
      ...initialState,

      // Actions
      setItems: (items) =>
        set({ items }, false, 'setItems'),

      addItem: (item) =>
        set(
          (state) => ({ items: [...state.items, item] }),
          false,
          'addItem'
        ),

      updateItem: (id, updates) =>
        set(
          (state) => ({
            items: state.items.map((item) =>
              item.id === id ? { ...item, ...updates } : item
            ),
          }),
          false,
          'updateItem'
        ),

      removeItem: (id) =>
        set(
          (state) => ({
            items: state.items.filter((item) => item.id !== id),
            selectedId: state.selectedId === id ? null : state.selectedId,
          }),
          false,
          'removeItem'
        ),

      setSelectedId: (id) =>
        set({ selectedId: id }, false, 'setSelectedId'),

      setLoading: (isLoading) =>
        set({ isLoading }, false, 'setLoading'),

      setError: (error) =>
        set({ error }, false, 'setError'),

      reset: () =>
        set(initialState, false, 'reset'),
    }),
    { name: '$ARGUMENTS' }
  )
)
```

### 3. STORE WITH PERSISTENCE

```typescript
// src/stores/$ARGUMENTS.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface $ARGUMENTSState {
  theme: 'light' | 'dark' | 'system'
  sidebarOpen: boolean
  locale: string
}

interface $ARGUMENTSActions {
  setTheme: (theme: $ARGUMENTSState['theme']) => void
  toggleSidebar: () => void
  setLocale: (locale: string) => void
}

type $ARGUMENTSStore = $ARGUMENTSState & $ARGUMENTSActions

export const use$ARGUMENTS = create<$ARGUMENTSStore>()(
  devtools(
    persist(
      (set) => ({
        // State
        theme: 'system',
        sidebarOpen: true,
        locale: 'fr',

        // Actions
        setTheme: (theme) => set({ theme }),
        toggleSidebar: () =>
          set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        setLocale: (locale) => set({ locale }),
      }),
      {
        name: '$ARGUMENTS-storage', // localStorage key
        partialize: (state) => ({
          theme: state.theme,
          sidebarOpen: state.sidebarOpen,
          locale: state.locale,
        }),
      }
    ),
    { name: '$ARGUMENTS' }
  )
)
```

### 4. STORE WITH ASYNC ACTIONS

```typescript
// src/stores/$ARGUMENTS.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createBrowserClient } from '@/lib/supabase/client'

interface $ARGUMENTSState {
  items: Item[]
  isLoading: boolean
  error: string | null
}

interface $ARGUMENTSActions {
  fetchItems: (orgId: string) => Promise<void>
  createItem: (item: Omit<Item, 'id'>) => Promise<void>
  deleteItem: (id: string) => Promise<void>
}

type $ARGUMENTSStore = $ARGUMENTSState & $ARGUMENTSActions

export const use$ARGUMENTS = create<$ARGUMENTSStore>()(
  devtools(
    (set, get) => ({
      // State
      items: [],
      isLoading: false,
      error: null,

      // Async Actions
      fetchItems: async (orgId) => {
        set({ isLoading: true, error: null })

        try {
          const supabase = createBrowserClient()
          const { data, error } = await supabase
            .from('table_name')
            .select('*')
            .eq('org_id', orgId)

          if (error) throw error
          set({ items: data || [] })
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'Error' })
        } finally {
          set({ isLoading: false })
        }
      },

      createItem: async (item) => {
        set({ isLoading: true, error: null })

        try {
          const supabase = createBrowserClient()
          const { data, error } = await supabase
            .from('table_name')
            .insert(item)
            .select()
            .single()

          if (error) throw error
          set((state) => ({ items: [...state.items, data] }))
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'Error' })
        } finally {
          set({ isLoading: false })
        }
      },

      deleteItem: async (id) => {
        try {
          const supabase = createBrowserClient()
          const { error } = await supabase
            .from('table_name')
            .delete()
            .eq('id', id)

          if (error) throw error
          set((state) => ({
            items: state.items.filter((item) => item.id !== id),
          }))
        } catch (err) {
          set({ error: err instanceof Error ? err.message : 'Error' })
        }
      },
    }),
    { name: '$ARGUMENTS' }
  )
)
```

### 5. SELECTORS (OPTIONAL)

```typescript
// Selectors for computed values
export const selectItemById = (id: string) =>
  use$ARGUMENTS((state) => state.items.find((item) => item.id === id))

export const selectItemCount = () =>
  use$ARGUMENTS((state) => state.items.length)

export const selectSelectedItem = () =>
  use$ARGUMENTS((state) =>
    state.items.find((item) => item.id === state.selectedId)
  )
```

### 6. USAGE EXAMPLE

```typescript
// In component
import { use$ARGUMENTS } from '@/stores/$ARGUMENTS'

function MyComponent() {
  // Subscribe to specific state
  const items = use$ARGUMENTS((state) => state.items)
  const isLoading = use$ARGUMENTS((state) => state.isLoading)

  // Get actions (doesn't cause re-render)
  const addItem = use$ARGUMENTS((state) => state.addItem)
  const fetchItems = use$ARGUMENTS((state) => state.fetchItems)

  // Or destructure everything (causes re-render on any change)
  const { items, addItem, isLoading } = use$ARGUMENTS()

  return (...)
}
```

### 7. EXPORT FROM INDEX
Add to `src/stores/index.ts`:
```typescript
export { use$ARGUMENTS } from './$ARGUMENTS'
```

### 8. CHECKLIST
- [ ] Proper TypeScript types for state and actions
- [ ] Devtools middleware for debugging
- [ ] Persist middleware if needed
- [ ] Initial state defined
- [ ] Reset action for cleanup
- [ ] Selectors for computed values
- [ ] Action names for devtools
