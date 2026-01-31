'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useAnimation, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

// ============================================
// FADE IN ANIMATION
// ============================================

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 24,
  once = true,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const controls = useAnimation()

  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, ...directions[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0.19, 1, 0.22, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// STAGGER CONTAINER
// ============================================

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// STAGGER ITEM
// ============================================

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function StaggerItem({ children, className, id }: StaggerItemProps) {
  return (
    <motion.div
      id={id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.19, 1, 0.22, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// TEXT REVEAL
// ============================================

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <span ref={ref} className={cn('inline-block overflow-hidden', className)}>
      <motion.span
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : { y: '100%' }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.19, 1, 0.22, 1],
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  )
}

// ============================================
// SCALE IN
// ============================================

interface ScaleInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export function ScaleIn({ children, className, delay = 0, once = true }: ScaleInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.19, 1, 0.22, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// MAGNETIC BUTTON
// ============================================

interface MagneticProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (clientX - left - width / 2) * strength
    const y = (clientY - top - height / 2) * strength
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// PARALLAX
// ============================================

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const { top } = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = top + ref.current.offsetHeight / 2
      const distanceFromCenter = elementCenter - windowHeight / 2
      setOffset(distanceFromCenter * speed * -0.1)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ y: offset }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ============================================
// HOVER CARD
// ============================================

interface HoverCardProps {
  children: React.ReactNode
  className?: string
}

export function HoverCard({ children, className }: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    const centerX = width / 2
    const centerY = height / 2
    setRotateX((y - centerY) / 10 * -1)
    setRotateY((x - centerX) / 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// COUNTER ANIMATION
// ============================================

interface CounterProps {
  from?: number
  to: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}

export function Counter({
  from = 0,
  to,
  duration = 2,
  className,
  suffix = '',
  prefix = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const tick = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(from + (to - from) * easeOut)
      setCount(current)

      if (now < endTime) {
        requestAnimationFrame(tick)
      } else {
        setCount(to)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, from, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}
