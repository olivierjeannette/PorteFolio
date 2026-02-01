# /create-animation [name] - Generate GSAP Animation

## Description
Creates professional GSAP animations for React components.

## Arguments
- `$ARGUMENTS` : Animation name e.g., `fadeIn`, `slideUp`, `staggerCards`, `pageTransition`

## Instructions

### 1. VALIDATE FIRST
```bash
Grep: "$ARGUMENTS|gsap" in src/lib/
Grep: "$ARGUMENTS" in src/hooks/
```

### 2. ANIMATION UTILITY TEMPLATE

```typescript
// src/lib/animations.ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ========================================
// FADE ANIMATIONS
// ========================================
export const fadeIn = (element: Element | null, options?: gsap.TweenVars) => {
  if (!element) return

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      ...options,
    }
  )
}

export const fadeOut = (element: Element | null, options?: gsap.TweenVars) => {
  if (!element) return

  return gsap.to(element, {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: 'power2.in',
    ...options,
  })
}

// ========================================
// SLIDE ANIMATIONS
// ========================================
export const slideUp = (element: Element | null, options?: gsap.TweenVars) => {
  if (!element) return

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options,
    }
  )
}

export const slideIn = (
  element: Element | null,
  direction: 'left' | 'right' = 'left',
  options?: gsap.TweenVars
) => {
  if (!element) return

  const x = direction === 'left' ? -100 : 100

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: 'power2.out',
      ...options,
    }
  )
}

// ========================================
// STAGGER ANIMATIONS
// ========================================
export const staggerIn = (
  elements: Element[] | NodeListOf<Element> | null,
  options?: gsap.TweenVars
) => {
  if (!elements || (elements as Element[]).length === 0) return

  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      ...options,
    }
  )
}

export const staggerCards = (
  container: Element | null,
  cardSelector: string = '.card',
  options?: gsap.TweenVars
) => {
  if (!container) return

  const cards = container.querySelectorAll(cardSelector)

  return gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'back.out(1.2)',
      ...options,
    }
  )
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
export const scrollFadeIn = (
  element: Element | null,
  options?: ScrollTrigger.Vars
) => {
  if (!element) return

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...options,
      },
    }
  )
}

// ========================================
// MICRO-INTERACTIONS
// ========================================
export const pulse = (element: Element | null) => {
  if (!element) return

  return gsap.to(element, {
    scale: 1.05,
    duration: 0.15,
    yoyo: true,
    repeat: 1,
    ease: 'power1.inOut',
  })
}

export const shake = (element: Element | null) => {
  if (!element) return

  return gsap.to(element, {
    x: [-10, 10, -10, 10, 0],
    duration: 0.4,
    ease: 'power1.inOut',
  })
}

export const bounce = (element: Element | null) => {
  if (!element) return

  return gsap.fromTo(
    element,
    { y: 0 },
    {
      y: -15,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: 'power1.out',
    }
  )
}

// ========================================
// LOADING ANIMATIONS
// ========================================
export const shimmer = (element: Element | null) => {
  if (!element) return

  return gsap.fromTo(
    element,
    {
      backgroundPosition: '-200% 0',
    },
    {
      backgroundPosition: '200% 0',
      duration: 1.5,
      repeat: -1,
      ease: 'linear',
    }
  )
}

// ========================================
// CLEANUP UTILITY
// ========================================
export const killAnimations = (element?: Element | null) => {
  if (element) {
    gsap.killTweensOf(element)
  } else {
    gsap.killTweensOf('*')
  }
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}
```

### 3. ANIMATION HOOK TEMPLATE

```typescript
// src/hooks/useAnimation.ts
'use client'

import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { fadeIn, staggerIn, killAnimations } from '@/lib/animations'

export function useAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        killAnimations(containerRef.current)
      }
    }
  }, [])

  const animateIn = useCallback(() => {
    if (!containerRef.current) return

    const elements = containerRef.current.querySelectorAll('[data-animate]')
    staggerIn(elements)
  }, [])

  const animateElement = useCallback(
    (selector: string, animation: 'fadeIn' | 'slideUp' = 'fadeIn') => {
      if (!containerRef.current) return

      const element = containerRef.current.querySelector(selector)
      if (!element) return

      switch (animation) {
        case 'fadeIn':
          fadeIn(element)
          break
        case 'slideUp':
          slideUp(element)
          break
      }
    },
    []
  )

  return {
    containerRef,
    animateIn,
    animateElement,
  }
}
```

### 4. COMPONENT USAGE EXAMPLE

```typescript
// src/components/features/AnimatedSection.tsx
'use client'

import { useEffect, useRef } from 'react'
import { staggerCards, killAnimations } from '@/lib/animations'

interface AnimatedSectionProps {
  children: React.ReactNode
}

export function AnimatedSection({ children }: AnimatedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Delay to ensure DOM is ready
    const timer = setTimeout(() => {
      staggerCards(containerRef.current)
    }, 100)

    return () => {
      clearTimeout(timer)
      killAnimations(containerRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} className="grid gap-4 md:grid-cols-3">
      {children}
    </div>
  )
}
```

### 5. PAGE TRANSITION HOOK

```typescript
// src/hooks/usePageTransition.ts
'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function usePageTransition() {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Animate in on route change
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }
    )
  }, [pathname])

  return containerRef
}
```

### 6. CHECKLIST
- [ ] GSAP registered with plugins
- [ ] Cleanup on unmount (killAnimations)
- [ ] SSR safe (typeof window check)
- [ ] Ref-based targeting
- [ ] Configurable via options
- [ ] Performance optimized (will-change)
- [ ] Respects reduced motion preferences
