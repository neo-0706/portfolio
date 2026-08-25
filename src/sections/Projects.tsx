import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { projects, type Project } from '../data/projects'
import ProjectVisual from '../components/ProjectVisual'
import ProjectDetail from './ProjectDetail'
import SectionHeading from '../components/SectionHeading'

function ProjectRow({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative border-t border-ink-line py-10 first:border-t-0 md:py-16"
    >
      <button
        onClick={() => onOpen(project)}
        data-cursor="View"
        className="grid w-full grid-cols-1 gap-8 text-left md:grid-cols-12 md:items-center md:gap-10"
      >
        <div className="md:col-span-1">
          <span className="font-mono text-sm text-bone-faint">{project.index}</span>
        </div>

        <div className="md:col-span-5">
          <h3 className="font-display text-3xl font-semibold tracking-tight text-bone transition-colors duration-300 group-hover:text-signal sm:text-4xl">
            {project.name}
          </h3>
          {project.label && (
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint">
              {project.label}
            </p>
          )}
          <p className="mt-4 max-w-md text-sm leading-relaxed text-bone-dim md:text-base">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-ink-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-bone-faint transition-colors duration-300 group-hover:border-signal/40 group-hover:text-bone-dim"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-1 py-1 font-mono text-[10px] text-bone-faint">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="h-44 w-full overflow-hidden rounded-2xl transition-transform duration-500 ease-out group-hover:scale-[1.02] md:h-52">
            <ProjectVisual visual={project.visual} name={project.name} />
          </div>
        </div>

        <div className="flex items-center justify-between md:col-span-1 md:flex-col md:items-end md:gap-4">
          {project.status && (
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-signal">
              {project.status}
            </span>
          )}
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-line text-bone-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-signal group-hover:text-signal">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </button>

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint transition-colors hover:text-signal md:ml-[calc(8.33%+0px)]"
        >
          <Github size={13} />
          Repository
        </a>
      )}
    </motion.article>
  )
}

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="work" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected work"
          title="Building products, one interface at a time."
          description="A handful of projects exploring component architecture, state management and the line between frontend and backend."
        />

        <div className="mt-16">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} onOpen={setActive} />
          ))}
        </div>
      </div>

      <ProjectDetail project={active} onClose={() => setActive(null)} />
    </section>
  )
}
