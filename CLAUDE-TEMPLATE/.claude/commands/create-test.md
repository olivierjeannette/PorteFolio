# /create-test [name] - Generate Test File

## Description
Creates test files using Vitest for components, hooks, or server actions.

## Arguments
- `$ARGUMENTS` : Test target name e.g., `MemberCard`, `useMembers`, `createMember`

## Instructions

### 1. DETERMINE TEST TYPE

```bash
# Find what we're testing
Grep: "export.*$ARGUMENTS" in src/
```

- **Component Test** → Testing React components
- **Hook Test** → Testing custom hooks
- **Action Test** → Testing server actions
- **Utility Test** → Testing pure functions

### 2. COMPONENT TEST TEMPLATE

```typescript
// src/components/features/__tests__/$ARGUMENTS.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { $ARGUMENTS } from '../$ARGUMENTS'

// Mock dependencies
vi.mock('@/lib/supabase/client', () => ({
  createBrowserClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => Promise.resolve({ data: [], error: null })),
    })),
  })),
}))

describe('$ARGUMENTS', () => {
  // Setup
  const defaultProps = {
    id: '123',
    name: 'Test Item',
  }

  // Render helper
  const renderComponent = (props = {}) => {
    return render(<$ARGUMENTS {...defaultProps} {...props} />)
  }

  // Tests
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByText('Test Item')).toBeInTheDocument()
  })

  it('handles click event', async () => {
    const onClick = vi.fn()
    renderComponent({ onClick })

    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('displays loading state', () => {
    renderComponent({ isLoading: true })
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument()
  })

  it('displays error state', () => {
    renderComponent({ error: 'Something went wrong' })
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('handles empty state', () => {
    renderComponent({ items: [] })
    expect(screen.getByText('No items found')).toBeInTheDocument()
  })
})
```

### 3. HOOK TEST TEMPLATE

```typescript
// src/hooks/__tests__/$ARGUMENTS.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { $ARGUMENTS } from '../$ARGUMENTS'

// Mock Supabase
vi.mock('@/lib/supabase/client', () => ({
  createBrowserClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => Promise.resolve({
        data: [{ id: '1', name: 'Test' }],
        error: null,
      })),
    })),
  })),
}))

describe('$ARGUMENTS', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns initial state', () => {
    const { result } = renderHook(() => $ARGUMENTS())

    expect(result.current.data).toEqual([])
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(null)
  })

  it('fetches data successfully', async () => {
    const { result } = renderHook(() =>
      $ARGUMENTS({ orgId: 'org-123', enabled: true })
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.data).toHaveLength(1)
    expect(result.current.error).toBe(null)
  })

  it('handles fetch error', async () => {
    // Override mock for this test
    vi.mocked(createBrowserClient).mockReturnValueOnce({
      from: vi.fn(() => ({
        select: vi.fn(() => Promise.resolve({
          data: null,
          error: { message: 'Failed to fetch' },
        })),
      })),
    } as any)

    const { result } = renderHook(() =>
      $ARGUMENTS({ orgId: 'org-123', enabled: true })
    )

    await waitFor(() => {
      expect(result.current.error).toBeTruthy()
    })
  })

  it('refetches on call', async () => {
    const { result } = renderHook(() =>
      $ARGUMENTS({ orgId: 'org-123', enabled: true })
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    await act(async () => {
      await result.current.refetch()
    })

    // Verify refetch was called
    expect(result.current.data).toBeDefined()
  })
})
```

### 4. SERVER ACTION TEST TEMPLATE

```typescript
// src/actions/__tests__/$ARGUMENTS.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { $ARGUMENTS } from '../actions'

// Mock Supabase server client
vi.mock('@/lib/supabase/server', () => ({
  createServerClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn(() => Promise.resolve({
        data: { user: { id: 'user-123' } },
        error: null,
      })),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({
            data: { current_org_id: 'org-123', role: 'admin' },
            error: null,
          })),
        })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({
            data: { id: 'new-123' },
            error: null,
          })),
        })),
      })),
    })),
  })),
}))

// Mock Next.js cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('$ARGUMENTS', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('validates input', async () => {
    const result = await $ARGUMENTS({
      name: '', // Invalid: empty
    })

    expect(result.success).toBe(false)
    expect(result.error).toContain('requis')
  })

  it('requires authentication', async () => {
    vi.mocked(createServerClient).mockReturnValueOnce({
      auth: {
        getUser: vi.fn(() => Promise.resolve({
          data: { user: null },
          error: null,
        })),
      },
    } as any)

    const result = await $ARGUMENTS({ name: 'Test' })

    expect(result.success).toBe(false)
    expect(result.error).toBe('Non authentifié')
  })

  it('creates item successfully', async () => {
    const result = await $ARGUMENTS({
      name: 'Test Item',
      description: 'Test description',
    })

    expect(result.success).toBe(true)
    expect(result.data?.id).toBe('new-123')
  })

  it('handles database error', async () => {
    vi.mocked(createServerClient).mockReturnValueOnce({
      auth: {
        getUser: vi.fn(() => Promise.resolve({
          data: { user: { id: 'user-123' } },
          error: null,
        })),
      },
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({
              data: { current_org_id: 'org-123', role: 'admin' },
              error: null,
            })),
          })),
        })),
        insert: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => Promise.resolve({
              data: null,
              error: { message: 'Database error' },
            })),
          })),
        })),
      })),
    } as any)

    const result = await $ARGUMENTS({ name: 'Test' })

    expect(result.success).toBe(false)
  })
})
```

### 5. TEST SETUP FILE

```typescript
// vitest.setup.ts
import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  redirect: vi.fn(),
}))

// Mock environment variables
vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'http://localhost:54321')
vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'test-key')
```

### 6. RUN TESTS

```bash
# Run all tests
npm run test

# Run specific test file
npm run test -- $ARGUMENTS.test

# Run with coverage
npm run test -- --coverage

# Watch mode
npm run test -- --watch
```

### 7. CHECKLIST
- [ ] Test file created in `__tests__` folder
- [ ] All dependencies mocked
- [ ] Happy path tested
- [ ] Error cases tested
- [ ] Edge cases tested
- [ ] Loading states tested
- [ ] User interactions tested
- [ ] Test descriptions are clear
