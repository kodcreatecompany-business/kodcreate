"use client"

import dynamic from "next/dynamic"
import { Component, useEffect, useRef, useState, type ReactNode } from "react"
import { CodeXml, MousePointer2, Smartphone, Sparkles } from "lucide-react"
import { BrowserPreview } from "@/components/browser-preview"
import { cn } from "@/lib/utils"

const BrowserScene = dynamic(() => import("@/components/browser-scene"), { ssr: false })

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onError() }
  render() { return this.state.failed ? null : this.props.children }
}

export function HeroVisual() {
  const container = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(true)
  const [ready, setReady] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const desktop = window.matchMedia("(min-width: 768px)")
    const update = () => setEnabled(!motion.matches && desktop.matches)
    const timer = window.setTimeout(update, 350)
    motion.addEventListener("change", update)
    desktop.addEventListener("change", update)
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "100px" })
    if (container.current) observer.observe(container.current)
    return () => { clearTimeout(timer); motion.removeEventListener("change", update); desktop.removeEventListener("change", update); observer.disconnect() }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!container.current) return
    const rect = container.current.getBoundingClientRect()
    const x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2))
    const y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2))
    setMouse({ x, y })
  }

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 })
  }

  return (
    <div
      ref={container}
      className="hero-visual"
      role="img"
      aria-label="Floating 3D browser and mobile website concept, showing an architectural website"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="visual-orbit orbit-one" aria-hidden="true" />
      <div className="visual-orbit orbit-two" aria-hidden="true" />
      <div
        aria-hidden="true"
        className={cn("hero-static-browser", enabled && ready && "visual-hidden")}
        style={{
          transform: `rotate(-5deg) rotateY(${-15 + mouse.x * 14}deg) rotateX(${5 - mouse.y * 12}deg) translate(${mouse.x * 12}px, ${mouse.y * 10}px)`,
          transition: "transform 200ms cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        <BrowserPreview />
      </div>
      {enabled && (
        <div className={cn("hero-canvas", !ready && "canvas-loading")} aria-hidden="true">
          <SceneBoundary onError={() => setEnabled(false)}>
            <BrowserScene
              active={active}
              onReady={() => setReady(true)}
              onFailure={() => setEnabled(false)}
              mouse={mouse}
            />
          </SceneBoundary>
        </div>
      )}
      <div
        className="floating-tag tag-design"
        aria-hidden="true"
        style={{
          transform: `rotate(-5deg) translate(${mouse.x * -12}px, ${mouse.y * -10}px)`,
          transition: "transform 240ms ease-out"
        }}
      >
        <span className="tag-icon"><Sparkles size={17} /></span>
        <span>Designed around <strong>you.</strong></span>
      </div>
      <div
        className="floating-code"
        aria-hidden="true"
        style={{
          transform: `rotate(11deg) translate(${mouse.x * 14}px, ${mouse.y * -12}px)`,
          transition: "transform 240ms ease-out"
        }}
      >
        <CodeXml size={33} strokeWidth={1.6} />
      </div>
      <div
        className="floating-tag tag-responsive"
        aria-hidden="true"
        style={{
          transform: `rotate(-5deg) translate(${mouse.x * -10}px, ${mouse.y * 10}px)`,
          transition: "transform 240ms ease-out"
        }}
      >
        <Smartphone size={17} />
        <span>Every screen. Every detail.</span>
      </div>
      <div
        className="visual-cursor"
        aria-hidden="true"
        style={{
          transform: `rotate(-5deg) translate(${mouse.x * 16}px, ${mouse.y * 14}px)`,
          transition: "transform 240ms ease-out"
        }}
      >
        <MousePointer2 size={28} fill="currentColor" />
        <span>Your next big idea</span>
      </div>
      <p className="visual-caption">A glimpse of what&apos;s possible <span>↗</span></p>
    </div>
  )
}
