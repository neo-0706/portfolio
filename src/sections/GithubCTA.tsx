import { motion } from 'framer-motion'
import { Github, ArrowUpRight } from 'lucide-react'
import MagneticButton from '../components/MagneticButton'
import { personal } from '../data/nav'

export default function GithubCTA() {
  return (
    <section className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink-panel/50 px-8 py-16 sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-signal/10 blur-3xl"
          />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="eyebrow mb-5 flex items-center gap-2"
              >
                <Github size={13} />
                Open source
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7 }}
                className="text-balance font-display text-4xl font-semibold tracking-tight text-bone sm:text-5xl"
              >
                More code. More experiments.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-5 max-w-md text-bone-dim"
              >
                Explore my projects, experiments and ongoing work on GitHub.
              </motion.p>
            </div>

            <MagneticButton href={personal.github} target="_blank" variant="solid" cursorLabel="GitHub">
              Visit GitHub
              <ArrowUpRight size={14} />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
