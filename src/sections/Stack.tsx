import { motion } from 'framer-motion'
import { stackGroups } from '../data/stack'
import SectionHeading from '../components/SectionHeading'

function TechRow({ item, index }: { item: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      whileHover={{ x: 10 }}
      className="group flex items-baseline justify-between border-b border-ink-line py-4 transition-colors hover:border-signal/50"
    >
      <span className="font-display text-2xl text-bone-dim transition-colors duration-300 group-hover:text-bone sm:text-3xl">
        {item}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        0{index + 1}
      </span>
    </motion.div>
  )
}

export default function Stack() {
  return (
    <section id="stack" className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Stack" title="The tools I build with" />

        <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10">
          {stackGroups.map((group) => (
            <div key={group.title}>
              <p className="eyebrow mb-2">{group.eyebrow}</p>
              <h3 className="mb-6 font-display text-xl font-medium text-bone">{group.title}</h3>
              <div>
                {group.items.map((item, i) => (
                  <TechRow key={item} item={item} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(124,108,255,0.08),transparent_70%)]"
      />
    </section>
  )
}
