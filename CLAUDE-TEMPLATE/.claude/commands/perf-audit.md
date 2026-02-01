# /perf-audit - Performance Audit

## Description
Comprehensive performance audit for Next.js applications.

## Instructions

### 1. BUNDLE ANALYSIS
```bash
# Install analyzer
npm install -D @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

**Check for:**
- [ ] Bundle size < 200KB first load
- [ ] No duplicate dependencies
- [ ] Tree shaking working
- [ ] Large dependencies identified

### 2. LOADING PERFORMANCE
```bash
# Check for blocking patterns
Grep: "import.*from 'lodash'" in src/
Grep: "import.*from 'moment'" in src/
Grep: "import.*Icon.*from '@heroicons" in src/
```

**Anti-patterns to fix:**
```typescript
// BAD: Full lodash import
import _ from 'lodash'

// GOOD: Named import (tree-shakeable)
import { debounce } from 'lodash-es'

// BAD: Full icon library
import { Icon } from '@heroicons/react/24/outline'

// GOOD: Specific icon
import { HomeIcon } from '@heroicons/react/24/outline'
```

### 3. IMAGE OPTIMIZATION
```bash
# Find image usage
Grep: "<img " in src/
Grep: "Image.*from.*next/image" in src/
Grep: "background-image" in src/
```

**Verify:**
- [ ] All images use next/image
- [ ] Width/height specified (no layout shift)
- [ ] priority on LCP images
- [ ] Lazy loading for below-fold
- [ ] WebP/AVIF formats
- [ ] Proper sizing (srcSet)

### 4. FONT OPTIMIZATION
```bash
# Check font loading
Grep: "next/font" in src/
Grep: "@import.*font|font-face" in src/
```

**Correct pattern:**
```typescript
// src/app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

### 5. DATABASE QUERIES
```bash
# Find N+1 queries
Grep: "\.from\(.*\)\.select\(" in src/
Grep: "for.*await.*supabase" in src/
Grep: "map.*async" in src/
```

**Anti-patterns:**
```typescript
// BAD: N+1 query
const members = await supabase.from('members').select('*')
for (const member of members) {
  const stats = await supabase.from('stats').select('*').eq('member_id', member.id)
}

// GOOD: Join in single query
const { data } = await supabase
  .from('members')
  .select(`
    *,
    stats:member_stats(*)
  `)
```

### 6. SERVER COMPONENTS
```bash
# Check client component usage
Grep: "'use client'" in src/app/
```

**Rules:**
- [ ] Pages are Server Components (no 'use client')
- [ ] Interactive parts extracted to Client Components
- [ ] Data fetching in Server Components
- [ ] No useState for server data

### 7. CACHING STRATEGY
```bash
# Check cache patterns
Grep: "revalidate|cache|unstable_cache" in src/
Grep: "generateStaticParams" in src/
```

**Implement:**
```typescript
// Static with revalidation
export const revalidate = 3600 // 1 hour

// Dynamic with caching
import { unstable_cache } from 'next/cache'

const getCachedData = unstable_cache(
  async (id: string) => {
    return await fetchData(id)
  },
  ['data-cache'],
  { revalidate: 60 }
)
```

### 8. CODE SPLITTING
```bash
# Check dynamic imports
Grep: "dynamic\(.*import" in src/
Grep: "React\.lazy" in src/
```

**Heavy components should be lazy:**
```typescript
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./Chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false, // if client-only
})
```

### 9. API OPTIMIZATION
```bash
# Check API response sizes
Grep: "\.select\('\*'\)" in src/
```

**Optimize:**
```typescript
// BAD: Select all columns
const { data } = await supabase.from('members').select('*')

// GOOD: Select only needed
const { data } = await supabase.from('members').select('id, name, avatar_url')
```

### 10. RENDER OPTIMIZATION
```bash
# Check memo usage
Grep: "useMemo|useCallback|memo\(" in src/
Grep: "React\.memo" in src/
```

**When to memo:**
- [ ] Expensive calculations (useMemo)
- [ ] Callbacks passed to child components (useCallback)
- [ ] Components receiving object/array props (memo)

### 11. CORE WEB VITALS

**LCP (Largest Contentful Paint) < 2.5s:**
- [ ] Preload critical resources
- [ ] Optimize hero images
- [ ] Server-render above fold

**FID (First Input Delay) < 100ms:**
- [ ] Split long tasks
- [ ] Defer non-critical JS
- [ ] Use Web Workers for heavy work

**CLS (Cumulative Layout Shift) < 0.1:**
- [ ] Image dimensions specified
- [ ] Font fallback matches
- [ ] No injected content

### 12. GENERATE REPORT

```markdown
# Performance Audit - [Date]

## Metrics
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| First Load JS | XXkb | <200kb | |
| LCP | X.Xs | <2.5s | |
| FID | XXms | <100ms | |
| CLS | X.XX | <0.1 | |

## Issues Found

### Critical
1. **[Issue]** - [Impact] - [Fix]

### Warnings
1. **[Issue]** - [Impact] - [Fix]

## Quick Wins
1. [ ] [Action 1]
2. [ ] [Action 2]

## Long-term Improvements
1. [ ] [Action 1]
2. [ ] [Action 2]
```
