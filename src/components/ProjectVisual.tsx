import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  ListChecks,
  CloudSun,
  Newspaper,
  CheckSquare,
} from 'lucide-react'
import type { Project } from '../data/projects'

const visualConfig: Record<
  Project['visual'],
  { icon: typeof LayoutDashboard; gradient: string; chips: string[] }
> = {
  devflow: {
    icon: LayoutDashboard,
    gradient: 'from-signal/25 via-ink-panel to-ink',
    chips: ['Tasks', 'Issues', 'Activity'],
  },
  taskmanager: {
    icon: ListChecks,
    gradient: 'from-emerald-400/15 via-ink-panel to-ink',
    chips: ['To do', 'In progress', 'Done'],
  },
  climaglass: {
    icon: CloudSun,
    gradient: 'from-sky-400/20 via-ink-panel to-ink',
    chips: ['22°C', 'Qom', 'Clear'],
  },
  miniblog: {
    icon: Newspaper,
    gradient: 'from-amber-400/15 via-ink-panel to-ink',
    chips: ['Post', 'API', 'Render'],
  },
  taskflow: {
    icon: CheckSquare,
    gradient: 'from-violet-400/15 via-ink-panel to-ink',
    chips: ['DOM', 'Events', 'State'],
  },
}

export default function ProjectVisual({ visual, name }: { visual: Project['visual']; name: string }) {
  const config = visualConfig[visual]
  const Icon = config.icon

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${config.gradient} border border-ink-line/70`}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(237,234,226,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(237,234,226,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative flex w-[82%] flex-col gap-4 rounded-xl border border-ink-line/70 bg-ink/70 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-signal" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-faint">
              {name}
            </span>
          </div>
          <Icon size={16} className="text-bone-faint" />
        </div>

        <div className="flex flex-wrap gap-2">
          {config.chips.map((chip, i) => (
            <motion.span
              key={chip}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-full border border-ink-line/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-bone-dim"
            >
              {chip}
            </motion.span>
          ))}
        </div>

        <div className="space-y-2">
          {[0, 1, 2].map((row) => (
            <div key={row} className="h-2 rounded-full bg-ink-line/60" style={{ width: `${88 - row * 18}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
