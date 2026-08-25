import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

const tech = ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'REST APIs']

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Experience" title="Experience" />

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-ink-line pt-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <span className="font-mono text-sm uppercase tracking-[0.15em] text-bone-faint">
              Backend Development Intern
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-9"
          >
            <h3 className="font-display text-2xl font-semibold text-bone sm:text-3xl">
              Basalam
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-bone-dim">
              Gained practical experience with backend development workflows and RESTful API
              structures. Worked with PostgreSQL and Redis data storage while collaborating
              within a software development team environment.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-ink-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-bone-dim"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
