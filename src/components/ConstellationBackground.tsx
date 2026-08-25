import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  radius: number
  baseAlpha: number
  twinklePhase: number
  twinkleSpeed: number
  color: string
  glow: boolean
  connectionsCount: number
}

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0
    let dpr = 1

    let particles: Particle[] = []

    // Mouse tracking state
    let mouseX = -1000
    let mouseY = -1000
    let mouseActive = false

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseX = e.clientX - rect.left
        mouseY = e.clientY - rect.top
        mouseActive = true
      } else {
        mouseActive = false
      }
    }

    const handleMouseLeave = () => {
      mouseActive = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    const colors = [
      'rgba(237, 234, 226, ', // bone white (60%)
      'rgba(237, 234, 226, ',
      'rgba(237, 234, 226, ',
      'rgba(124, 108, 255, ', // signal purple (25%)
      'rgba(156, 143, 255, ', // signal glow (15%)
    ]

    const initParticles = (w: number, h: number) => {
      const isMobile = w < 768
      const isTablet = w >= 768 && w < 1024
      const count = isMobile ? 35 : isTablet ? 60 : 95

      particles = []
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        const radius = Math.random() * 1.4 + 0.8
        const colorPrefix = colors[Math.floor(Math.random() * colors.length)]

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() > 0.85 ? radius * 1.5 : radius,
          baseAlpha: Math.random() * 0.5 + 0.35,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.025 + 0.01,
          color: colorPrefix,
          glow: Math.random() > 0.75,
          connectionsCount: 0,
        })
      }
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = parent.clientWidth
      height = parent.clientHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.scale(dpr, dpr)
      initParticles(width, height)
    }

    resize()

    const handleResize = () => {
      resize()
    }
    window.addEventListener('resize', handleResize)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      const isMobile = width < 768
      const connectionDist = isMobile ? 85 : 125
      const mouseRadius = isMobile ? 120 : 190

      // Reset particle connection counts
      for (let i = 0; i < particles.length; i++) {
        particles[i].connectionsCount = 0
      }

      // Update positions and render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update velocity drift
        p.x += p.vx
        p.y += p.vy

        // Screen boundary wrapping with padding
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10

        // Mouse attraction & subtle pull
        if (mouseActive) {
          const dx = mouseX - p.x
          const dy = mouseY - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseRadius && dist > 0) {
            const force = (1 - dist / mouseRadius) * 0.08
            p.x += (dx / dist) * force * 1.5
            p.y += (dy / dist) * force * 1.5
          }
        }

        // Twinkle calculation
        p.twinklePhase += p.twinkleSpeed
        const currentAlpha = Math.min(
          1,
          Math.max(0.15, p.baseAlpha + Math.sin(p.twinklePhase) * 0.25)
        )

        // Draw soft outer glow if particle is highlighted
        if (p.glow) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2)
          ctx.fillStyle = `${p.color}${currentAlpha * 0.15})`
          ctx.fill()
        }

        // Draw core star particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color}${currentAlpha})`
        ctx.fill()
      }

      // Star-to-star proximity line connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        if (p1.connectionsCount >= 3) continue

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          if (p2.connectionsCount >= 3) continue

          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDist) {
            p1.connectionsCount++
            p2.connectionsCount++

            const alpha = (1 - dist / connectionDist) * 0.22
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(124, 108, 255, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Dynamic Mouse Interaction Connections
      if (mouseActive) {
        // Collect stars inside interaction radius
        const nearbyStars: { particle: Particle; dist: number }[] = []

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const dx = mouseX - p.x
          const dy = mouseY - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseRadius) {
            nearbyStars.push({ particle: p, dist })
          }
        }

        // Sort by distance to mouse
        nearbyStars.sort((a, b) => a.dist - b.dist)

        // Select closest stars to connect to mouse
        const maxMouseConnections = isMobile ? 4 : 7
        const activeStars = nearbyStars.slice(0, maxMouseConnections)

        // Draw connections from cursor to closest stars
        for (let i = 0; i < activeStars.length; i++) {
          const { particle: p, dist } = activeStars[i]
          const alpha = (1 - dist / mouseRadius) * 0.55

          ctx.beginPath()
          ctx.moveTo(mouseX, mouseY)
          ctx.lineTo(p.x, p.y)
          ctx.strokeStyle = `rgba(156, 143, 255, ${alpha})`
          ctx.lineWidth = 0.95
          ctx.stroke()
        }

        // Interconnect nearby stars around the cursor to complete the dynamic constellation cluster
        for (let i = 0; i < activeStars.length; i++) {
          for (let j = i + 1; j < activeStars.length; j++) {
            const p1 = activeStars[i].particle
            const p2 = activeStars[j].particle
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < connectionDist * 1.1) {
              const alpha = (1 - dist / (connectionDist * 1.1)) * 0.35
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `rgba(124, 108, 255, ${alpha})`
              ctx.lineWidth = 0.75
              ctx.stroke()
            }
          }
        }

        // Subtle focal point highlight at cursor center in canvas
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(156, 143, 255, 0.7)'
        ctx.fill()

        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 8, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(124, 108, 255, 0.15)'
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
  )
}
