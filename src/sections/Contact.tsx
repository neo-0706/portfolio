import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Mail } from 'lucide-react'
import MagneticButton from '../components/MagneticButton'
import { personal } from '../data/nav'

export default function Contact() {
  return (
    <section id="contact" className="relative flex min-h-[85svh] flex-col justify-center overflow-hidden px-6 py-28 md:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(124,108,255,0.12),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-8"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[13vw] font-semibold leading-[0.95] tracking-tightest text-bone sm:text-[9vw] lg:text-8xl"
        >
          Let's build
          <br />
          something.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-8 max-w-md text-lg text-bone-dim"
        >
          Have a project, idea, or opportunity in mind?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href={`mailto:${personal.email}`} variant="solid" cursorLabel="Email">
            <Mail size={14} />
            Email me
          </MagneticButton>
          <MagneticButton href={personal.github} target="_blank" variant="outline" cursorLabel="GitHub">
            <Github size={14} />
            GitHub
            <ArrowUpRight size={13} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
