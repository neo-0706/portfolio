import { personal } from '../data/nav'

export default function Footer() {
  return (
    <footer className="border-t border-ink-line px-6 py-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-bone-faint sm:flex-row sm:text-left">
        <span>&copy; {new Date().getFullYear()} {personal.name}</span>
        <span>{personal.location}</span>
      </div>
    </footer>
  )
}
