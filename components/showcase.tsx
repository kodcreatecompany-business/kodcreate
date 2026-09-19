import { ArrowUpRight } from "lucide-react"
import { BrowserPreview } from "@/components/browser-preview"
import { BusinessShowcase } from "@/components/business-showcase"
import { SectionLabel } from "@/components/content-sections"
import { Reveal } from "@/components/reveal"

export function ShowcaseSection() {
  return (
    <section id="concepts" className="showcase-section section-padding" aria-labelledby="showcase-title">
      <div className="page-container">
        <SectionLabel number="02">A LITTLE INSPIRATION</SectionLabel>
        <div className="section-heading-row">
          <h2 id="showcase-title">
            Different businesses.<br />
            <span className="highlight-text">Distinct possibilities.</span>
          </h2>
          <p>
            A few creative directions to get you thinking.<br />
            Your website will have a story of its own.
          </p>
        </div>

        {/* Featured Business Concept Banner with 2 Running Pictures */}
        <Reveal>
          <BusinessShowcase />
        </Reveal>

        {/* Additional Architecture & Hospitality Concepts */}
        <div className="showcase-grid">
          <Reveal>
            <article className="concept-card architecture-card">
              <div className="concept-image-stage architecture-stage">
                <BrowserPreview />
              </div>
              <div className="concept-card-caption">
                <div>
                  <h3>forma<span>Architecture & interiors</span></h3>
                  <p>CONCEPT DESIGN — NOT CLIENT WORK</p>
                </div>
                <ArrowUpRight aria-hidden="true" size={20} />
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="concept-card retreat-card">
              <div className="concept-image-stage retreat-stage">
                <BrowserPreview theme="retreat" />
              </div>
              <div className="concept-card-caption">
                <div>
                  <h3>still<span>Nature & hospitality</span></h3>
                  <p>CONCEPT DESIGN — NOT CLIENT WORK</p>
                </div>
                <ArrowUpRight aria-hidden="true" size={20} />
              </div>
            </article>
          </Reveal>
        </div>
        <p className="concept-disclaimer">Explorations, not a portfolio of client projects. A starting point for what we could create together.</p>
      </div>
    </section>
  )
}
