import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../lib/utils'

type SharedProps = {
  children: ReactNode
  variant?: 'solid' | 'outline' | 'ghost'
  className?: string
  cursorLabel?: string
}

type AsAnchor = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type AsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type MagneticButtonProps = AsAnchor | AsButton

/**
 * A button that pulls gently toward the cursor when hovered, and snaps
 * back on release. Disabled entirely under prefers-reduced-motion.
 * Renders as an <a> when `href` is supplied, otherwise a <button>.
 */
export default function MagneticButton(props: MagneticButtonProps) {
  const { children, variant = 'solid', className, cursorLabel, href, ...rest } = props
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const reduced = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * 0.35)
    y.set(relY * 0.35)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const styles = {
    solid: 'bg-bone text-ink hover:bg-signal hover:text-bone',
    outline: 'border border-ink-line text-bone hover:border-signal hover:text-signal',
    ghost: 'text-bone hover:text-signal',
  }[variant]

  const sharedClassName = cn(
    'group inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300',
    styles,
    className,
  )

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        (() => {
          const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>
          return (
            <a
              ref={ref as React.Ref<HTMLAnchorElement>}
              href={href}
              data-cursor={cursorLabel}
              className={sharedClassName}
              rel={anchorRest.target === '_blank' ? 'noreferrer' : undefined}
              {...anchorRest}
            >
              {children}
            </a>
          )
        })()
      ) : (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          data-cursor={cursorLabel}
          className={sharedClassName}
          {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {children}
        </button>
      )}
    </motion.div>
  )
}
