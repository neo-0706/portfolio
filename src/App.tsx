import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Hero from './sections/Hero'
import Intro from './sections/Intro'
import Stack from './sections/Stack'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Education from './sections/Education'
import Mindset from './sections/Mindset'
import GithubCTA from './sections/GithubCTA'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-ink">
      <div aria-hidden className="grain-overlay" />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Stack />
        <Projects />
        <Experience />
        <Education />
        <Mindset />
        <GithubCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
