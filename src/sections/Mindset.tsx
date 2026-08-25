import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

const flow = ['UI', 'React', 'API', 'Backend', 'Database']

export default function Mindset() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Engineering mindset"
          title="From interface to API."
          description="My main focus is frontend development, but my experience with Python, FastAPI, databases and REST APIs gives me a broader understanding of how modern web applications work behind the interface."
        />

        <div className="mt-20 flex flex-col gap-0 sm:flex-row sm:items-center">
          {flow.map((step, i) => (
            <div key={step} className="flex items-center sm:flex-1 sm:flex-col sm:items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex sm:justify-center"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-ink-line font-mono text-[11px] uppercase tracking-[0.08em] text-bone-dim transition-colors duration-500 hover:border-signal hover:text-signal">
                  {step}
                </span>
              </motion.div>

              {i < flow.length - 1 && (
                <div className="mx-4 h-10 w-px bg-ink-line sm:mx-0 sm:mt-8 sm:h-px sm:w-full sm:flex-1">
                  <motion.div
                    initial={{ scaleY: 0, scaleX: 0 }}
                    whileInView={{ scaleY: 1, scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: 'easeInOut' }}
                    className="h-full w-full origin-top bg-signal sm:origin-left"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_20%_50%,rgba(124,108,255,0.08),transparent_70%)]"
      />
    </section>
  )
}
