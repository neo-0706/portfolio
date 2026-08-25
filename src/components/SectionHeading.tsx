import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
}

const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <motion.p
        variants={revealVariants}
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="eyebrow mb-5"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={revealVariants}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-bone sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.div
          variants={revealVariants}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-bone-dim md:text-lg"
        >
          {description}
        </motion.div>
      )}
    </div>
  )
}
