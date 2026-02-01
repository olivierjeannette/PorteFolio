# /create-component [name] - Generate React/Next.js Component

## Description
Creates a production-ready React component following project patterns.

## Arguments
- `$ARGUMENTS` : Component name (PascalCase) e.g., `MemberCard`, `WorkoutTimer`

## Instructions

### 1. VALIDATE FIRST
```bash
# Check if component already exists
Glob: **/components/**/$ARGUMENTS*.tsx
Grep: "export.*$ARGUMENTS" in src/components/
```

If exists, ASK user: "Component exists at [path]. Modify existing or create variant?"

### 2. DETERMINE TYPE
Ask if not clear:
- **UI Component** (buttons, cards, inputs) → `src/components/ui/`
- **Feature Component** (domain-specific) → `src/components/features/`
- **Layout Component** (page structure) → `src/components/layout/`

### 3. GENERATE COMPONENT

```typescript
// src/components/[type]/$ARGUMENTS.tsx
'use client'

import { cn } from '@/lib/utils'

// ========================================
// TYPES
// ========================================
interface $ARGUMENTSProps {
  className?: string
  children?: React.ReactNode
}

// ========================================
// COMPONENT
// ========================================
export function $ARGUMENTS({ className, children }: $ARGUMENTSProps) {
  return (
    <div className={cn(
      // Base styles - use CSS variables
      'bg-[var(--glass-bg)] rounded-lg border border-white/10',
      'backdrop-blur-md',
      className
    )}>
      {children}
    </div>
  )
}

// ========================================
// VARIANTS (if needed)
// ========================================
$ARGUMENTS.Skeleton = function Skeleton() {
  return (
    <div className="animate-pulse bg-white/5 rounded-lg h-24" />
  )
}
```

### 4. CREATE INDEX EXPORT
Add to `src/components/[type]/index.ts`:
```typescript
export { $ARGUMENTS } from './$ARGUMENTS'
```

### 5. CHECKLIST
- [ ] Component uses CSS variables (`var(--*)`)
- [ ] Proper TypeScript types
- [ ] Supports className prop for customization
- [ ] Mobile-first responsive design
- [ ] No hardcoded colors
- [ ] Skeleton/loading state if async data
- [ ] Follows existing patterns in codebase

## Patterns to Follow
- Glass morphism: `bg-[var(--glass-bg)] backdrop-blur-md`
- Borders: `border border-white/10`
- Text: `text-[var(--text-primary)]`
- Spacing: Compact (`p-2 gap-2` not `p-8 gap-8`)
- Mobile: `text-sm` default, `md:text-base` for desktop
