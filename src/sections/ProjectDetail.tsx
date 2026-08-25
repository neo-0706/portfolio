import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Github, X } from 'lucide-react'
import { useEffect } from 'react'
import type { Project } from '../data/projects'
import ProjectVisual from '../components/ProjectVisual'
import MagneticButton from '../components/MagneticButton'

interface ProjectDetailProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} project details`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/80 backdrop-blur-md sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 32, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-ink-line bg-ink-soft p-8 sm:rounded-3xl sm:p-12"
          >
            <button
              aria-label="Close project details"
              onClick={onClose}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-ink-line text-bone-dim transition-colors hover:border-signal hover:text-signal"
            >
              <X size={18} />
            </button>

            <p className="eyebrow mb-4">Project {project.index}</p>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-bone sm:text-4xl">
              {project.name}
            </h3>
            {project.label && <p className="mt-2 text-bone-faint">{project.label}</p>}

            <div className="mt-8 h-56 w-full sm:h-72">
              <ProjectVisual visual={project.visual} name={project.name} />
            </div>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-bone-dim">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-ink-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-bone-dim"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {project.github && (
                <MagneticButton href={project.github} target="_blank" variant="solid" cursorLabel="Open">
                  <Github size={14} />
                  View repository
                  <ArrowUpRight size={13} />
                </MagneticButton>
              )}
              {project.status && (
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                  {project.status}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
