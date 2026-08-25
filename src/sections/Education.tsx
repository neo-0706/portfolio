import { motion } from 'framer-motion'

export default function Education() {
  return (
    <section className="relative px-6 pb-28 md:px-10 md:pb-40">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 border-t border-ink-line pt-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="eyebrow">Education</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-9"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
              <h3 className="font-display text-xl font-medium text-bone sm:text-2xl">
                B.Sc. Computer Engineering
              </h3>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
                2025 — Present
              </span>
            </div>
            <p className="mt-2 text-bone-dim">University of Tehran — Farabi Campus</p>

            <div className="mt-8 flex items-center gap-3 border-t border-ink-line pt-6">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-faint">
                English
              </span>
              <span className="h-1 w-1 rounded-full bg-ink-line" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-bone-dim">
                Upper-Intermediate
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
