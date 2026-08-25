import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * A minimal ring cursor that grows and labels itself over interactive
 * surfaces (project cards, buttons). Falls back to the native cursor
 * on touch devices and when reduced motion is requested.
 */
export default function CustomCursor() {
  const reduced = useReducedMotion()
  const [label, setLabel] = useState<string | null>(null)
  const [isTouch, setIsTouch] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { stiffness: 400, damping: 40, mass: 0.4 })
  const springY = useSpring(mouseY, { stiffness: 400, damping: 40, mass: 0.4 })

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches)

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      const target = e.target as HTMLElement
      const cursorTarget = target.closest<HTMLElement>('[data-cursor]')
      setLabel(cursorTarget?.dataset.cursor ?? null)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  if (isTouch || reduced) return null

  return (
    <motion.div
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[90] hidden mix-blend-difference md:flex"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        animate={{
          width: label ? 88 : 14,
          height: label ? 88 : 14,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex items-center justify-center rounded-full bg-bone"
      >
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
