import { motion } from 'framer-motion'

const foundations = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'Responsive Design',
  'Tailwind CSS',
  'Bootstrap',
  'Flexbox',
  'CSS Grid',
]

export default function Intro() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-6"
            >
              About
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-bone sm:text-5xl md:text-[3.4rem]"
            >
              I build interfaces that feel{' '}
              <span className="text-bone-faint">as good as they work.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim"
            >
              I'm a Computer Engineering student and aspiring Frontend Developer focused on
              React, modern JavaScript and responsive interface development. I enjoy turning
              ideas into clean, interactive and user-friendly digital experiences.
            </motion.p>
          </div>

          <div className="flex flex-col justify-end lg:col-span-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-bone-faint"
            >
              Frontend foundation
            </motion.p>
            <ul className="flex flex-wrap gap-x-4 gap-y-3 border-t border-ink-line pt-6">
              {foundations.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="font-display text-base text-bone-dim transition-colors hover:text-signal"
                >
                  {item}
                  {i !== foundations.length - 1 && (
                    <span className="ml-4 text-ink-line">/</span>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
